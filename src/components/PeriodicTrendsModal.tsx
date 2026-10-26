import React, {useState, useRef, useMemo} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Billboard, Text} from '@react-three/drei';
import * as THREE from 'three';
import {ELEMENTS_118, ElementData, CATEGORY_COLORS} from '../data/elements';
import {
  PeriodicPropertyType,
  PERIODIC_PROPERTIES_INFO,
  getElementTrendValue,
} from '../data/periodicTrendsData';
import {exportSectionToPDF} from '../utils/pdfExport';
import {
  X,
  TrendingUp,
  Info,
  RotateCcw,
  Sliders,
  Eye,
  FileText,
  ExternalLink,
  Layers,
  Award,
  Compass,
} from 'lucide-react';

interface PeriodicTrendsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Converte um valor normalizado (0 a 1) em uma cor vibrante de mapa de calor (Cool-to-Warm Heatmap)
function getHeatmapColor(t: number): THREE.Color {
  const clamped = Math.max(0, Math.min(1, t));
  // 5 paradas: Azul profundo (0.0) -> Ciano (0.25) -> Verde limão (0.5) -> Amarelo ouro (0.75) -> Vermelho carmesim (1.0)
  if (clamped < 0.25) {
    const localT = clamped / 0.25;
    return new THREE.Color().lerpColors(new THREE.Color('#3b82f6'), new THREE.Color('#06b6d4'), localT);
  } else if (clamped < 0.5) {
    const localT = (clamped - 0.25) / 0.25;
    return new THREE.Color().lerpColors(new THREE.Color('#06b6d4'), new THREE.Color('#10b981'), localT);
  } else if (clamped < 0.75) {
    const localT = (clamped - 0.5) / 0.25;
    return new THREE.Color().lerpColors(new THREE.Color('#10b981'), new THREE.Color('#f59e0b'), localT);
  } else {
    const localT = (clamped - 0.75) / 0.25;
    return new THREE.Color().lerpColors(new THREE.Color('#f59e0b'), new THREE.Color('#ef4444'), localT);
  }
}

// Pilar 3D individual de um elemento na topografia
function ElementTopographyPillar({
  element,
  property,
  targetHeight,
  color,
  isSelected,
  isHovered,
  onSelect,
  onHover,
}: {
  element: ElementData;
  property: PeriodicPropertyType;
  targetHeight: number;
  color: THREE.Color;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: (hovered: boolean) => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const currentHeightRef = useRef<number>(Math.max(0.2, targetHeight));

  // Posição no grid da tabela periódica (X e Z)
  // GridX: 1 a 18 -> centralizar em 0 (-9 a +9)
  // GridY: 1 a 10 -> centralizar em 0 (-5 a +5)
  const posX = (element.gridX - 9.5) * 1.08;
  const posZ = (element.gridY - 4.8) * 1.08;

  // Animação suave (lerp) na transição de altura do pilar
  useFrame((_, delta) => {
    if (!meshRef.current) return;
    const clampedTarget = Math.max(0.15, targetHeight);
    currentHeightRef.current = THREE.MathUtils.damp(
      currentHeightRef.current,
      clampedTarget,
      8,
      delta
    );

    meshRef.current.scale.y = currentHeightRef.current;
    // Eleva a metade da altura para a base permanecer fixa no chão (Y = 0)
    meshRef.current.position.y = currentHeightRef.current / 2;
  });

  const value = getElementTrendValue(element.number, property, element);
  const metadata = PERIODIC_PROPERTIES_INFO[property];

  return (
    <group position={[posX, 0, posZ]}>
      {/* Base de apoio no chão */}
      <mesh position={[0, 0.02, 0]}>
        <boxGeometry args={[0.96, 0.04, 0.96]} />
        <meshStandardMaterial
          color={isSelected ? '#38bdf8' : isHovered ? '#64748b' : '#1e293b'}
          roughness={0.7}
        />
      </mesh>

      {/* Pilar Topográfico 3D Extrudado */}
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          onHover(true);
        }}
        onPointerOut={() => onHover(false)}
      >
        <boxGeometry args={[0.88, 1, 0.88]} />
        <meshStandardMaterial
          color={color}
          roughness={0.2}
          metalness={0.35}
          emissive={isSelected ? '#38bdf8' : isHovered ? color : '#000000'}
          emissiveIntensity={isSelected ? 0.6 : isHovered ? 0.35 : 0.05}
        />
      </mesh>

      {/* Rótulo Flutuante no topo do pilar se selecionado ou com mouse em cima */}
      {(isSelected || isHovered) && (
        <Billboard position={[0, currentHeightRef.current + 0.65, 0]}>
          <Text
            fontSize={0.32}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.03}
            outlineColor="#020617"
          >
            {element.symbol} ({value.toFixed(property === 'density' || property === 'electronegativity' ? 2 : 0)})
          </Text>
          <Text
            position={[0, -0.22, 0]}
            fontSize={0.16}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#020617"
          >
            {element.name}
          </Text>
        </Billboard>
      )}
    </group>
  );
}

export function PeriodicTrendsModal({isOpen, onClose}: PeriodicTrendsModalProps) {
  const [selectedProperty, setSelectedProperty] = useState<PeriodicPropertyType>('atomicRadius');
  const [selectedElement, setSelectedElement] = useState<ElementData>(ELEMENTS_118[0]); // Hidrogênio inicial
  const [hoveredElementNumber, setHoveredElementNumber] = useState<number | null>(null);
  const [heightMultiplier, setHeightMultiplier] = useState<number>(1.2);
  const controlsRef = useRef<any>(null);

  const activePropertyMeta = PERIODIC_PROPERTIES_INFO[selectedProperty];

  // Cálculo de min, max e normalização para cada elemento
  const elementsWithValues = useMemo(() => {
    const rawValues = ELEMENTS_118.map((el) => ({
      element: el,
      val: getElementTrendValue(el.number, selectedProperty, el),
    }));

    const vals = rawValues.map((r) => r.val).filter((v) => !isNaN(v));
    const min = Math.min(...vals);
    const max = Math.max(...vals);
    const range = max - min || 1;

    return rawValues.map(({element, val}) => {
      const normalized = (val - min) / range;
      // Altura em unidades 3D: base mínima de 0.25 até ~4.5 ajustado pelo slider
      const height = (0.25 + normalized * 4.2) * heightMultiplier;
      const color = getHeatmapColor(normalized);
      return {
        element,
        val,
        normalized,
        height,
        color,
      };
    });
  }, [selectedProperty, heightMultiplier]);

  // Ranking do elemento selecionado
  const rankingInfo = useMemo(() => {
    const sorted = [...elementsWithValues].sort((a, b) => b.val - a.val);
    const rank = sorted.findIndex((s) => s.element.number === selectedElement.number) + 1;
    return {
      rank,
      total: sorted.length,
      isTop10: rank <= 10,
    };
  }, [elementsWithValues, selectedElement]);

  const selectedElementValue = useMemo(() => {
    return getElementTrendValue(selectedElement.number, selectedProperty, selectedElement);
  }, [selectedElement, selectedProperty]);

  // Ângulos de câmera pré-configurados
  const setCameraPreset = (preset: 'isometric' | 'top' | 'front' | 'side') => {
    if (!controlsRef.current) return;
    switch (preset) {
      case 'isometric':
        controlsRef.current.object.position.set(0, 16, 18);
        controlsRef.current.target.set(0, 1, 0);
        break;
      case 'top':
        controlsRef.current.object.position.set(0, 24, 0.1);
        controlsRef.current.target.set(0, 0, 0);
        break;
      case 'front':
        controlsRef.current.object.position.set(0, 4, 20);
        controlsRef.current.target.set(0, 1.5, 0);
        break;
      case 'side':
        controlsRef.current.object.position.set(-20, 4, 0);
        controlsRef.current.target.set(0, 1.5, 0);
        break;
    }
    controlsRef.current.update();
  };

  const handleExportPDF = () => {
    exportSectionToPDF(
      `Mapa Topográfico 3D - ${activePropertyMeta.name}`,
      `Análise de Tendência Periódica e Dados do Elemento ${selectedElement.name} (${selectedElement.symbol})`,
      [
        { label: 'Propriedade Periódica', value: `${activePropertyMeta.name} (${activePropertyMeta.symbol})` },
        { label: 'Unidade de Medida', value: activePropertyMeta.unit },
        { label: 'Valor do Elemento Selecionado', value: `${selectedElementValue} ${activePropertyMeta.unit}` },
        { label: 'Posição no Ranking Geral', value: `${rankingInfo.rank}º lugar entre todos os 118 elementos` },
        { label: 'Regra de Variação no Grupo (Coluna)', value: activePropertyMeta.trendGroupRule },
        { label: 'Regra de Variação no Período (Linha)', value: activePropertyMeta.trendPeriodRule },
        { label: 'Explicação Físico-Química', value: activePropertyMeta.scientificWhy },
        { label: 'Maior Valor na Tabela', value: `${activePropertyMeta.highestElement.name} (${activePropertyMeta.highestElement.symbol}) com ${activePropertyMeta.highestElement.value}` },
        { label: 'Menor Valor na Tabela', value: `${activePropertyMeta.lowestElement.name} (${activePropertyMeta.lowestElement.symbol}) com ${activePropertyMeta.lowestElement.value}` },
      ],
      `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 16px;">
          <h3 style="margin-top: 0; color: #0284c7;">Regra da Tendência Topográfica 3D</h3>
          <p style="font-size: 13px; color: #334155; line-height: 1.6;">${activePropertyMeta.description}</p>
          <p style="font-size: 12px; color: #64748b;"><strong>Por que varia assim?</strong> ${activePropertyMeta.scientificWhy}</p>
        </div>
      `
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-7xl h-[94vh] bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Cabeçalho do Modal */}
        <div className="px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between backdrop-blur-md shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Visualizador Topográfico 3D de Tendências Periódicas
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  Relevo 3D
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Alturas volumétricas proporcionais que revelam como as propriedades atômicas mudam ao longo dos grupos e períodos
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-sky-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
              title="Salvar Relatório em PDF"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Salvar em PDF</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Barra de Seleção de Propriedades e Controles */}
        <div className="px-6 py-2.5 bg-slate-900/60 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Abas das Propriedades */}
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            {(
              [
                'atomicRadius',
                'electronegativity',
                'ionizationEnergy',
                'density',
                'meltingPoint',
                'electronAffinity',
              ] as PeriodicPropertyType[]
            ).map((propKey) => {
              const meta = PERIODIC_PROPERTIES_INFO[propKey];
              const isSelected = propKey === selectedProperty;
              return (
                <button
                  key={propKey}
                  onClick={() => setSelectedProperty(propKey)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-sky-500 text-white shadow-md shadow-sky-500/25 font-bold'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span>{meta.name}</span>
                  <span className="text-[10px] opacity-75 font-mono">({meta.symbol})</span>
                </button>
              );
            })}
          </div>

          {/* Atalhos de Câmera e Multiplicador de Altura */}
          <div className="flex items-center gap-3">
            {/* Slider de Altura do Relevo */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 bg-slate-950/70 px-3 py-1.5 rounded-xl border border-slate-800">
              <Sliders className="w-3.5 h-3.5 text-sky-400" />
              <span>Escala:</span>
              <input
                type="range"
                min="0.5"
                max="2.2"
                step="0.1"
                value={heightMultiplier}
                onChange={(e) => setHeightMultiplier(parseFloat(e.target.value))}
                className="w-20 accent-sky-400 cursor-pointer"
              />
              <span className="text-[11px] font-mono text-sky-300 w-8">{heightMultiplier.toFixed(1)}x</span>
            </div>

            {/* Presets de Câmera */}
            <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setCameraPreset('isometric')}
                className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-[11px]"
                title="Perspectiva 3D Isométrica"
              >
                Isométrica
              </button>
              <button
                onClick={() => setCameraPreset('top')}
                className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-[11px]"
                title="Vista Superior 2D (Tabela Plana)"
              >
                Planta 2D
              </button>
              <button
                onClick={() => setCameraPreset('front')}
                className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-[11px]"
                title="Vista Frontal (Perfil dos Grupos)"
              >
                Frontal
              </button>
              <button
                onClick={() => setCameraPreset('side')}
                className="px-2.5 py-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition text-[11px]"
                title="Vista Lateral (Perfil dos Períodos)"
              >
                Lateral
              </button>
            </div>
          </div>
        </div>

        {/* Corpo Principal: Cena 3D + Painel de Inspeção Científica */}
        <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
          {/* Canvas WebGL 3D com a Topografia dos 118 Elementos */}
          <div className="flex-1 h-[60%] lg:h-full relative bg-radial-at-c from-slate-900 to-slate-950 select-none touch-none">
            <Canvas camera={{position: [0, 16, 18], fov: 45}}>
              <ambientLight intensity={1.2} />
              <directionalLight position={[15, 25, 15]} intensity={1.5} castShadow />
              <directionalLight position={[-15, 15, -15]} intensity={0.5} />
              <pointLight position={[0, 12, 0]} intensity={1.0} distance={40} />

              {/* Grade de Pilares Topográficos dos 118 Elementos */}
              <group position={[0, 0, 0]}>
                {elementsWithValues.map(({element, height, color}) => (
                  <ElementTopographyPillar
                    key={element.number}
                    element={element}
                    property={selectedProperty}
                    targetHeight={height}
                    color={color}
                    isSelected={selectedElement.number === element.number}
                    isHovered={hoveredElementNumber === element.number}
                    onSelect={() => setSelectedElement(element)}
                    onHover={(hov) => setHoveredElementNumber(hov ? element.number : null)}
                  />
                ))}
              </group>

              {/* Plano de chão decorativo */}
              <gridHelper
                args={[28, 28, '#1e293b', '#0f172a']}
                position={[0, -0.01, 0]}
              />

              <OrbitControls
                ref={controlsRef}
                enableDamping
                dampingFactor={0.06}
                minDistance={5}
                maxDistance={35}
                maxPolarAngle={Math.PI / 2.05} // Não descer abaixo do chão
              />
            </Canvas>

            {/* Dica Flutuante Inferior */}
            <div className="absolute bottom-3 left-4 z-10 flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-800 text-xs text-slate-300 pointer-events-none">
              <Compass className="w-3.5 h-3.5 text-sky-400 animate-spin" style={{animationDuration: '10s'}} />
              <span>Gire livremente para ver os vales e picos • Clique em qualquer pilar</span>
            </div>

            {/* Barra de Gradiente de Calor */}
            <div className="absolute bottom-3 right-4 z-10 hidden sm:flex flex-col gap-1 bg-slate-900/90 backdrop-blur-md p-2.5 rounded-2xl border border-slate-800 text-[10px]">
              <span className="font-semibold text-slate-300 text-center">Gradiente de Intensidade</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400 font-mono">Baixo</span>
                <div className="w-32 h-3 rounded-full bg-gradient-to-r from-blue-500 via-emerald-400 via-amber-400 to-rose-500 border border-slate-700 shadow-inner" />
                <span className="text-rose-400 font-mono font-bold">Alto</span>
              </div>
            </div>
          </div>

          {/* Painel Lateral: Cartão Científico do Elemento Selecionado & Regra da Tendência */}
          <div className="w-full lg:w-96 bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col p-5 overflow-y-auto gap-4 backdrop-blur-xl">
            {/* Cartão do Elemento Selecionado */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center text-white font-bold text-lg shadow-lg border"
                    style={{
                      backgroundColor: `${CATEGORY_COLORS[selectedElement.category]?.hex}25`,
                      borderColor: CATEGORY_COLORS[selectedElement.category]?.hex,
                    }}
                  >
                    <span className="text-[10px] text-slate-400 font-mono">{selectedElement.number}</span>
                    <span>{selectedElement.symbol}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base leading-tight">
                      {selectedElement.name}
                    </h3>
                    <span className="text-[11px] text-slate-400">
                      Grupo {selectedElement.group} • Período {selectedElement.period}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Classificação</span>
                  <span className="text-xs font-bold text-sky-400 flex items-center gap-1 justify-end">
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    {rankingInfo.rank}º / 118
                  </span>
                </div>
              </div>

              {/* Valor da Propriedade em Destaque */}
              <div className="bg-slate-900 border border-sky-500/30 rounded-xl p-3 flex flex-col gap-0.5">
                <span className="text-[11px] text-slate-400 font-medium">
                  {activePropertyMeta.name} ({activePropertyMeta.symbol}):
                </span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-black text-sky-300 font-mono">
                    {selectedElementValue.toFixed(selectedProperty === 'density' || selectedProperty === 'electronegativity' ? 2 : 0)}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {activePropertyMeta.unit}
                  </span>
                </div>
              </div>

              {/* Ações: Wikipédia */}
              <div className="flex items-center gap-2 pt-1">
                <a
                  href={selectedElement.wikiLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                  <span>Veja mais na Wikipédia</span>
                </a>
              </div>
            </div>

            {/* Explicação da Regra Periódica */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2.5 text-xs">
              <div className="flex items-center gap-2 font-bold text-sky-400 text-sm">
                <Info className="w-4 h-4 text-sky-400" />
                <span>Como Varia o {activePropertyMeta.name}?</span>
              </div>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {activePropertyMeta.description}
              </p>

              {/* Vetores Direcionais */}
              <div className="grid grid-cols-1 gap-2 pt-1">
                <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800/80 flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    Na Família / Coluna (Grupo)
                  </span>
                  <span className="text-slate-200 font-semibold">{activePropertyMeta.trendGroupRule}</span>
                </div>
                <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800/80 flex flex-col gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-sky-400 tracking-wider">
                    Na Linha Horizontal (Período)
                  </span>
                  <span className="text-slate-200 font-semibold">{activePropertyMeta.trendPeriodRule}</span>
                </div>
              </div>

              {/* Por que ocorre fisicamente? */}
              <div className="p-2.5 bg-indigo-950/30 border border-indigo-800/40 rounded-xl text-[11px] text-indigo-300 leading-relaxed mt-1">
                <strong className="text-indigo-200 block mb-0.5">Fundamentação Científica:</strong>
                {activePropertyMeta.scientificWhy}
              </div>

              {/* Extremos na Tabela */}
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-1.5 text-[11px]">
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Pico Máximo:</span>
                  <span className="font-semibold text-rose-400">
                    {activePropertyMeta.highestElement.name} ({activePropertyMeta.highestElement.symbol}) • {activePropertyMeta.highestElement.value}
                  </span>
                </div>
                <div className="flex justify-between items-center text-slate-300">
                  <span className="text-slate-400">Vale Mínimo:</span>
                  <span className="font-semibold text-blue-400">
                    {activePropertyMeta.lowestElement.name} ({activePropertyMeta.lowestElement.symbol}) • {activePropertyMeta.lowestElement.value}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
