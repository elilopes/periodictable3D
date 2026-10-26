import {useRef, useMemo} from 'react';
import {useFrame} from '@react-three/fiber';
import * as THREE from 'three';
import {ElementData} from '../data/elements';
import {useLanguage} from '../i18n/LanguageContext';

interface BohrAtomProps {
  element: ElementData;
  speed?: number;
  showTrails?: boolean;
}

// Cores das camadas de energia K, L, M, N, O, P, Q
const SHELL_COLORS = [
  '#38bdf8', // K - n=1 Azul celeste
  '#4ade80', // L - n=2 Verde lima
  '#facc15', // M - n=3 Amarelo
  '#fb923c', // N - n=4 Laranja
  '#f43f5e', // O - n=5 Rosa vivo
  '#c084fc', // P - n=6 Roxo
  '#e879f9', // Q - n=7 Magenta
];

const SHELL_NAMES = ['K', 'L', 'M', 'N', 'O', 'P', 'Q'];

export function BohrAtom({element, speed = 1, showTrails = true}: BohrAtomProps) {
  const nucleusGroupRef = useRef<THREE.Group>(null!);
  const electronsGroupRef = useRef<THREE.Group>(null!);

  const shells = useMemo(() => {
    // Se electronsPerShell existir, usa a distribuição real; caso contrário faz fallback
    if (element.electronsPerShell && element.electronsPerShell.length > 0) {
      return element.electronsPerShell;
    }
    return [1];
  }, [element]);

  // Criação dos dados de elétrons para cada camada
  const electronData = useMemo(() => {
    const list: Array<{
      shellIndex: number;
      electronIndex: number;
      initialAngle: number;
      radius: number;
      tiltX: number;
      tiltY: number;
      speedMultiplier: number;
      color: string;
    }> = [];

    shells.forEach((count, shellIdx) => {
      const radius = 1.0 + shellIdx * 0.65; // Raios crescentes para K, L, M, N, O, P, Q
      const color = SHELL_COLORS[shellIdx % SHELL_COLORS.length];
      const speedMultiplier = (1.8 / Math.sqrt(shellIdx + 1)) * (shellIdx % 2 === 0 ? 1 : -1);

      for (let i = 0; i < count; i++) {
        const initialAngle = (i / count) * Math.PI * 2;
        // Pequena inclinação para criar volume orbital tridimensional planetário
        const tiltX = (shellIdx * 0.18 + (i % 2 === 0 ? 0.15 : -0.15));
        const tiltY = (shellIdx * 0.12);

        list.push({
          shellIndex: shellIdx,
          electronIndex: i,
          initialAngle,
          radius,
          tiltX,
          tiltY,
          speedMultiplier,
          color,
        });
      }
    });

    return list;
  }, [shells]);

  // Prótons e Nêutrons do Núcleo
  const nucleusParticles = useMemo(() => {
    const particles: Array<{pos: [number, number, number]; color: string}> = [];
    const count = Math.min(element.number * 2, 42); // Representação proporcional e otimizada
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * i / goldenRatio;
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const r = 0.38 * Math.cbrt(i / count);
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      // Alterna entre prótons (vermelho carmim) e nêutrons (azul safira / ciano)
      const color = i % 2 === 0 ? '#ef4444' : '#38bdf8';
      particles.push({pos: [x, y, z], color});
    }
    return particles;
  }, [element.number]);

  // Animação dos elétrons e rotação do núcleo
  useFrame((state, delta) => {
    if (nucleusGroupRef.current) {
      nucleusGroupRef.current.rotation.y += delta * 0.5 * speed;
      nucleusGroupRef.current.rotation.x += delta * 0.3 * speed;
    }

    if (electronsGroupRef.current) {
      const time = state.clock.getElapsedTime() * speed;
      const children = electronsGroupRef.current.children;

      electronData.forEach((data, index) => {
        const mesh = children[index] as THREE.Mesh;
        if (mesh) {
          const angle = data.initialAngle + time * data.speedMultiplier;
          const x = Math.cos(angle) * data.radius;
          const z = Math.sin(angle) * data.radius;

          // Aplica inclinações orbitais
          const rotatedY = z * Math.sin(data.tiltX);
          const rotatedZ = z * Math.cos(data.tiltX);
          const finalX = x * Math.cos(data.tiltY) - rotatedY * Math.sin(data.tiltY);
          const finalY = x * Math.sin(data.tiltY) + rotatedY * Math.cos(data.tiltY);

          mesh.position.set(finalX, finalY, rotatedZ);
        }
      });
    }
  });

  return (
    <group>
      {/* Luz focal interna do núcleo */}
      <pointLight position={[0, 0, 0]} intensity={2.5} color={element.colorHex || '#38bdf8'} distance={10} />

      {/* Núcleo Atômico */}
      <group ref={nucleusGroupRef}>
        {/* Brilho de energia central */}
        <mesh>
          <sphereGeometry args={[0.42, 24, 24]} />
          <meshBasicMaterial color={element.colorHex || '#fbbf24'} transparent opacity={0.25} />
        </mesh>
        {nucleusParticles.map((p, idx) => (
          <mesh key={idx} position={p.pos}>
            <sphereGeometry args={[0.08, 12, 12]} />
            <meshStandardMaterial
              color={p.color}
              roughness={0.2}
              metalness={0.7}
              emissive={p.color}
              emissiveIntensity={0.3}
            />
          </mesh>
        ))}
      </group>

      {/* Anéis de Órbitas / Camadas de Energia (K, L, M, N, O, P, Q) */}
      {showTrails &&
        shells.map((count, shellIdx) => {
          const radius = 1.0 + shellIdx * 0.65;
          const color = SHELL_COLORS[shellIdx % SHELL_COLORS.length];
          const tiltX = shellIdx * 0.18;
          const tiltY = shellIdx * 0.12;

          return (
            <group key={`shell-ring-${shellIdx}`} rotation={[tiltX, tiltY, 0]}>
              <mesh>
                <torusGeometry args={[radius, 0.012, 16, 128]} />
                <meshBasicMaterial color={color} transparent opacity={0.45} />
              </mesh>
            </group>
          );
        })}

      {/* Elétrons Orbitando */}
      <group ref={electronsGroupRef}>
        {electronData.map((data, index) => (
          <mesh key={`electron-${index}`} position={[data.radius, 0, 0]}>
            <sphereGeometry args={[0.075, 16, 16]} />
            <meshStandardMaterial
              color={data.color}
              emissive={data.color}
              emissiveIntensity={0.8}
              roughness={0.1}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export const RutherfordBohrAtom = BohrAtom;

export function BohrLegend({element}: {element: ElementData}) {
  const {t} = useLanguage();
  return (
    <div className="bg-slate-900/90 backdrop-blur-md rounded-xl p-3 border border-slate-700/80 text-xs">
      <div className="flex items-center justify-between mb-2 pb-1 border-b border-slate-800">
        <span className="font-semibold text-slate-200">{t.sidebar.shellsLabel}</span>
        <span className="text-sky-400 font-mono">{element.number} {t.sidebar.electrons}</span>
      </div>
      <div className="grid grid-cols-4 sm:grid-cols-7 gap-1.5">
        {SHELL_NAMES.map((name, idx) => {
          const count = element.electronsPerShell[idx] || 0;
          const color = SHELL_COLORS[idx % SHELL_COLORS.length];
          const hasElectrons = count > 0;

          return (
            <div
              key={name}
              className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-all ${
                hasElectrons
                  ? 'bg-slate-800/80 border-slate-600/60 shadow-sm'
                  : 'bg-slate-950/40 border-slate-900 opacity-35'
              }`}
            >
              <span className="font-bold text-[11px]" style={{color: hasElectrons ? color : '#64748b'}}>
                Camada {name}
              </span>
              <span className="text-[13px] font-mono font-extrabold text-white">
                {count}
              </span>
              <span className="text-[9px] text-slate-400">e⁻</span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 text-[10px] text-slate-400 flex items-center justify-between">
        <span>K=1, L=2, M=3, N=4, O=5, P=6, Q=7</span>
        <span className="text-emerald-400">Config: {element.electronicConfiguration}</span>
      </div>
    </div>
  );
}
