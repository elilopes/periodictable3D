import React, {useRef, useMemo, useState} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import * as THREE from 'three';
import {ELEMENTS_118, ElementData, CATEGORY_COLORS} from '../data/elements';
import {useLanguage} from '../i18n/LanguageContext';
import {Language} from '../i18n/types';

export type ViewMode = 'table' | 'cylinder' | 'sphere';

interface PeriodicTableSceneProps {
  selectedElement: ElementData | null;
  onElementSelect: (element: ElementData) => void;
  searchQuery: string;
  selectedCategory: string;
  selectedPhase: string;
  selectedOrigin: string;
  viewMode: ViewMode;
}

// Gera textura rica de alta resolução para o cartão periódico no idioma ativo
function createCardTexture(
  element: ElementData,
  isHighlighted: boolean,
  isDimmed: boolean,
  elementName: string,
  originLabel: string,
  phaseLabel: string
) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 280;
  const ctx = canvas.getContext('2d')!;

  // Fundo do cartão
  const catColor = CATEGORY_COLORS[element.category]?.hex || '#6366f1';
  
  // Gradiente de fundo
  const grad = ctx.createLinearGradient(0, 0, 0, 280);
  if (isDimmed) {
    grad.addColorStop(0, '#0f172a');
    grad.addColorStop(1, '#020617');
  } else if (isHighlighted) {
    grad.addColorStop(0, '#1e293b');
    grad.addColorStop(1, '#0f172a');
  } else {
    grad.addColorStop(0, '#1e293b');
    grad.addColorStop(1, '#090d16');
  }
  ctx.fillStyle = grad;
  ctx.roundRect(4, 4, 248, 272, 16);
  ctx.fill();

  // Borda brilhante
  ctx.lineWidth = isHighlighted ? 8 : 3;
  ctx.strokeStyle = isDimmed ? '#334155' : catColor;
  ctx.stroke();

  // Barra de cor superior da categoria
  ctx.fillStyle = isDimmed ? '#475569' : catColor;
  ctx.beginPath();
  ctx.roundRect(8, 8, 240, 16, [10, 10, 0, 0]);
  ctx.fill();

  // Número atômico (canto superior esquerdo)
  ctx.fillStyle = isDimmed ? '#64748b' : '#94a3b8';
  ctx.font = 'bold 30px "Inter", "Segoe UI", sans-serif';
  ctx.textAlign = 'left';
  ctx.fillText(element.number.toString(), 22, 60);

  // Massa atômica (canto superior direito)
  ctx.fillStyle = isDimmed ? '#475569' : '#64748b';
  ctx.font = '500 22px "Inter", "Segoe UI", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(element.atomicMass.toFixed(element.atomicMass > 200 ? 0 : 2), 234, 58);

  // Símbolo Químico Central em grande destaque
  ctx.fillStyle = isDimmed ? '#64748b' : '#ffffff';
  ctx.font = 'bold 96px "Inter", "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(element.symbol, 128, 162);

  // Nome do Elemento (no idioma ativo: Português, Inglês ou Russo)
  ctx.fillStyle = isDimmed ? '#475569' : '#e2e8f0';
  ctx.font = '600 26px "Inter", "Segoe UI", sans-serif';
  ctx.textAlign = 'center';
  
  const displayName = elementName || element.name;
  if (displayName.length > 12) {
    ctx.font = '600 20px "Inter", "Segoe UI", sans-serif';
  }
  ctx.fillText(displayName, 128, 206);

  // Badge inferior: Origem e Estado
  ctx.fillStyle = isDimmed ? '#334155' : (element.origin === 'natural' ? '#047857' : '#9d174d');
  ctx.beginPath();
  ctx.roundRect(20, 226, 106, 32, 8);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px "Inter", sans-serif';
  ctx.fillText(originLabel, 73, 247);

  // Estado Físico
  ctx.fillStyle = isDimmed ? '#1e293b' : '#334155';
  ctx.beginPath();
  ctx.roundRect(130, 226, 106, 32, 8);
  ctx.fill();
  ctx.fillStyle = isDimmed ? '#64748b' : '#38bdf8';
  ctx.font = 'bold 15px "Inter", sans-serif';
  ctx.fillText(phaseLabel.toUpperCase(), 183, 247);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.generateMipmaps = false;
  return texture;
}

interface ElementCard3DProps {
  element: ElementData;
  position: [number, number, number];
  rotation?: [number, number, number];
  isSelected: boolean;
  isMatch: boolean;
  hasFilterActive: boolean;
  elementName: string;
  originLabel: string;
  phaseLabel: string;
  onSelect: (element: ElementData) => void;
}

function ElementCard3D({
  element,
  position,
  rotation = [0, 0, 0],
  isSelected,
  isMatch,
  hasFilterActive,
  elementName,
  originLabel,
  phaseLabel,
  onSelect,
}: ElementCard3DProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  const isDimmed = hasFilterActive && !isMatch;

  const texture = useMemo(() => {
    return createCardTexture(element, isSelected || hovered, isDimmed, elementName, originLabel, phaseLabel);
  }, [element, isSelected, hovered, isDimmed, elementName, originLabel, phaseLabel]);

  // Animação suave de elevação no hover e seleção
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const targetZ = position[2] + (isSelected ? 0.6 : hovered ? 0.4 : 0);
    const targetScale = isSelected ? 1.08 : hovered ? 1.05 : 1.0;

    meshRef.current.position.z = THREE.MathUtils.damp(meshRef.current.position.z, targetZ, 12, delta);
    meshRef.current.scale.setScalar(
      THREE.MathUtils.damp(meshRef.current.scale.x, targetScale, 12, delta)
    );
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(element);
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = 'default';
      }}
    >
      <boxGeometry args={[1.35, 1.48, 0.08]} />
      <meshStandardMaterial
        map={texture}
        metalness={0.2}
        roughness={0.4}
        transparent={isDimmed}
        opacity={isDimmed ? 0.28 : 1.0}
      />
    </mesh>
  );
}

export function PeriodicTableScene({
  selectedElement,
  onElementSelect,
  searchQuery,
  selectedCategory,
  selectedPhase,
  selectedOrigin,
  viewMode,
}: PeriodicTableSceneProps) {
  const {t, getElementName, getOriginLabel, getPhaseLabel} = useLanguage();
  const controlsRef = useRef<any>(null);

  // Checagem se algum filtro está ativo
  const hasFilterActive = useMemo(() => {
    return (
      searchQuery.trim().length > 0 ||
      selectedCategory !== 'todas' ||
      selectedPhase !== 'todas' ||
      selectedOrigin !== 'todas'
    );
  }, [searchQuery, selectedCategory, selectedPhase, selectedOrigin]);

  // Filtro de elementos
  const matchedElementNumbers = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();

    const matches = new Set<number>();
    ELEMENTS_118.forEach((el) => {
      const locName = getElementName(el.number).toLowerCase();
      const matchSearch =
        !q ||
        el.name.toLowerCase().includes(q) ||
        locName.includes(q) ||
        el.symbol.toLowerCase().includes(q) ||
        el.number.toString() === q ||
        el.atomicMass.toString().includes(q) ||
        el.group.toString() === q ||
        el.period.toString() === q;

      const matchCategory = selectedCategory === 'todas' || el.category === selectedCategory;
      const matchPhase = selectedPhase === 'todas' || el.phase === selectedPhase;
      const matchOrigin = selectedOrigin === 'todas' || el.origin === selectedOrigin;

      if (matchSearch && matchCategory && matchPhase && matchOrigin) {
        matches.add(el.number);
      }
    });

    return matches;
  }, [searchQuery, selectedCategory, selectedPhase, selectedOrigin, getElementName]);

  // Coordenadas 3D para cada elemento dependendo do modo de visualização
  const elementPositions = useMemo(() => {
    return ELEMENTS_118.map((element, index) => {
      if (viewMode === 'table') {
        const spacingX = 1.48;
        const spacingY = 1.62;
        const x = (element.gridX - 9.5) * spacingX;
        const y = -(element.gridY - 5.5) * spacingY;
        const z = 0;
        return {
          element,
          pos: [x, y, z] as [number, number, number],
          rot: [0, 0, 0] as [number, number, number],
        };
      } else if (viewMode === 'cylinder') {
        const radius = 9.0;
        const angle = ((element.number - 1) % 18) * ((Math.PI * 2) / 18);
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        const y = -(element.number / 18) * 2.4 + 7.5;
        const rotY = angle;
        return {
          element,
          pos: [x, y, z] as [number, number, number],
          rot: [0, rotY, 0] as [number, number, number],
        };
      } else {
        const radius = 9.8;
        const count = 118;
        const phi = Math.acos(-1 + (2 * index) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;

        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);

        const rotX = phi - Math.PI / 2;
        const rotY = theta;
        return {
          element,
          pos: [x, y, z] as [number, number, number],
          rot: [rotX, rotY, 0] as [number, number, number],
        };
      }
    });
  }, [viewMode]);

  return (
    <div className="w-full h-full relative bg-radial from-slate-900 via-slate-950 to-black select-none">
      <Canvas
        camera={{position: [0, 0, viewMode === 'table' ? 24 : 26], fov: 48}}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.4} />
        <directionalLight position={[10, 20, 15]} intensity={1.6} />
        <directionalLight position={[-10, -10, -10]} intensity={0.6} />
        <pointLight position={[0, 0, 15]} intensity={0.8} />

        <group>
          {elementPositions.map(({element, pos, rot}) => (
            <ElementCard3D
              key={element.number}
              element={element}
              position={pos}
              rotation={rot}
              isSelected={selectedElement?.number === element.number}
              isMatch={matchedElementNumbers.has(element.number)}
              hasFilterActive={hasFilterActive}
              elementName={getElementName(element.number)}
              originLabel={getOriginLabel(element.origin)}
              phaseLabel={getPhaseLabel(element.phase)}
              onSelect={onElementSelect}
            />
          ))}

          {/* Marcadores informativos na tabela para Lantanídeos e Actinídeos */}
          {viewMode === 'table' && (
            <group>
              <mesh position={[(3 - 9.5) * 1.48, -(6 - 5.5) * 1.62, 0]}>
                <boxGeometry args={[1.35, 1.48, 0.05]} />
                <meshStandardMaterial color="#d946ef" opacity={0.3} transparent wireframe />
              </mesh>
              <mesh position={[(3 - 9.5) * 1.48, -(7 - 5.5) * 1.62, 0]}>
                <boxGeometry args={[1.35, 1.48, 0.05]} />
                <meshStandardMaterial color="#db2777" opacity={0.3} transparent wireframe />
              </mesh>
            </group>
          )}
        </group>

        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.06}
          minDistance={6}
          maxDistance={45}
          maxPolarAngle={Math.PI / 1.05}
        />
      </Canvas>

      {/* Dica da Câmera Traduzida */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs text-slate-300 pointer-events-auto">
        <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span>{t.app.cameraTip}</span>
      </div>
    </div>
  );
}
