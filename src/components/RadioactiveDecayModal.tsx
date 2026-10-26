import React, {useState, useRef, useMemo, useEffect} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Billboard, Text, Trail} from '@react-three/drei';
import * as THREE from 'three';
import {
  RADIOACTIVE_ISOTOPES,
  RadioactiveIsotope,
  DECAY_PARTICLES_INFO,
  DecayType,
} from '../data/radioactiveIsotopesData';
import {exportSectionToPDF} from '../utils/pdfExport';
import {
  X,
  Radio,
  Play,
  RotateCcw,
  Sparkles,
  Info,
  FileText,
  ExternalLink,
  Zap,
  Activity,
  Layers,
  Clock,
  Shield,
} from 'lucide-react';

interface RadioactiveDecayModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Representação 3D de um aglomerado de núcleons (Prótons e Nêutrons)
function NucleonCluster({
  protonsCount,
  neutronsCount,
  isDecayed,
  decayType,
  daughterSymbol,
  parentSymbol,
  isEjecting,
  ejectionProgress,
}: {
  protonsCount: number;
  neutronsCount: number;
  isDecayed: boolean;
  decayType: DecayType;
  daughterSymbol: string;
  parentSymbol: string;
  isEjecting: boolean;
  ejectionProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);
  const particleGroupRef = useRef<THREE.Group>(null!);

  // Gera esferas de núcleons com base em um empacotamento pseudo-esférico de Fibonacci
  const nucleons = useMemo(() => {
    // Para renderização fluida, representamos até 70 núcleons visíveis compactados
    const totalRepresented = Math.min(68, protonsCount + neutronsCount);
    const ratio = protonsCount / (protonsCount + neutronsCount || 1);
    const list: Array<{
      pos: [number, number, number];
      isProton: boolean;
      id: number;
    }> = [];

    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden ratio angle

    for (let i = 0; i < totalRepresented; i++) {
      const y = 1 - (i / (totalRepresented - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Distância radial ligeiramente aleatória para dar textura orgânica de núcleo
      const radialDist = 1.35 * Math.cbrt((i + 1) / totalRepresented);

      // Determina se este núcleon é próton ou nêutron
      const isProton = (i % 2 === 0 && Math.random() < ratio * 1.2) || i < totalRepresented * ratio * 0.7;

      list.push({
        pos: [x * radialDist, y * radialDist, z * radialDist],
        isProton,
        id: i,
      });
    }

    return list;
  }, [protonsCount, neutronsCount]);

  // Vibração nuclear quântica contínua
  useFrame(({clock}) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    // Quando decai ou ejeta, há um tremor mais violento
    const jitter = isEjecting ? 0.08 : 0.015;
    groupRef.current.position.x = Math.sin(t * 25) * jitter;
    groupRef.current.position.y = Math.cos(t * 30) * jitter;
    groupRef.current.position.z = Math.sin(t * 20) * jitter;

    // Rotação suave do núcleo
    groupRef.current.rotation.y = t * 0.2;
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;

    // Animação da partícula ejetada
    if (particleGroupRef.current && isEjecting) {
      const dist = ejectionProgress * 12;
      particleGroupRef.current.position.set(dist, dist * 0.4, 0);
    }
  });

  return (
    <group>
      {/* Aglomerado Principal do Núcleo */}
      <group ref={groupRef}>
        {nucleons.map((nuc) => {
          // Na transmutação beta-, um nêutron vira próton; na alfa, perde núcleons
          const isProtonNow = isDecayed && decayType === 'beta-minus' && nuc.id === 1 ? true : nuc.isProton;

          return (
            <mesh key={nuc.id} position={nuc.pos}>
              <sphereGeometry args={[0.32, 24, 24]} />
              <meshStandardMaterial
                color={isProtonNow ? '#ef4444' : '#64748b'} // Vermelho = Próton (+), Cinza/Azul = Nêutron (0)
                roughness={0.25}
                metalness={0.4}
                emissive={isProtonNow ? '#b91c1c' : '#334155'}
                emissiveIntensity={isEjecting ? 0.7 : 0.25}
              />
            </mesh>
          );
        })}

        {/* Rótulo Flutuante do Núcleo */}
        <Billboard position={[0, 2.3, 0]}>
          <Text
            fontSize={0.42}
            color="#ffffff"
            anchorX="center"
            anchorY="bottom"
            outlineWidth={0.04}
            outlineColor="#020617"
          >
            {isDecayed ? daughterSymbol : parentSymbol}
          </Text>
          <Text
            position={[0, -0.28, 0]}
            fontSize={0.2}
            color={isDecayed ? '#38bdf8' : '#f59e0b'}
            anchorX="center"
            anchorY="top"
          >
            {isDecayed ? 'Núcleo Filho Transmutado' : 'Núcleo Pai Instável'}
          </Text>
        </Billboard>
      </group>

      {/* Partícula Ejetada em Alta Velocidade durante o Decaimento */}
      {isEjecting && (
        <group ref={particleGroupRef}>
          {decayType === 'alpha' && (
            // Partícula Alfa: 2 Prótons e 2 Nêutrons
            <group>
              <mesh position={[0.22, 0.22, 0]}>
                <sphereGeometry args={[0.25, 20, 20]} />
                <meshStandardMaterial color="#ef4444" emissive="#f59e0b" emissiveIntensity={1.5} />
              </mesh>
              <mesh position={[-0.22, 0.22, 0]}>
                <sphereGeometry args={[0.25, 20, 20]} />
                <meshStandardMaterial color="#64748b" emissive="#f59e0b" emissiveIntensity={1.2} />
              </mesh>
              <mesh position={[0.22, -0.22, 0]}>
                <sphereGeometry args={[0.25, 20, 20]} />
                <meshStandardMaterial color="#64748b" emissive="#f59e0b" emissiveIntensity={1.2} />
              </mesh>
              <mesh position={[-0.22, -0.22, 0]}>
                <sphereGeometry args={[0.25, 20, 20]} />
                <meshStandardMaterial color="#ef4444" emissive="#f59e0b" emissiveIntensity={1.5} />
              </mesh>

              <Billboard position={[0, 0.7, 0]}>
                <Text fontSize={0.28} color="#fbbf24" outlineWidth={0.02} outlineColor="#020617">
                  Partícula α (⁴₂He²⁺)
                </Text>
              </Billboard>
            </group>
          )}

          {decayType === 'beta-minus' && (
            // Partícula Beta Negativa (Elétron de Alta Energia) + Antineutrino
            <group>
              <mesh>
                <sphereGeometry args={[0.2, 24, 24]} />
                <meshStandardMaterial color="#06b6d4" emissive="#38bdf8" emissiveIntensity={2.5} />
              </mesh>
              <pointLight color="#38bdf8" intensity={3} distance={5} />
              <Billboard position={[0, 0.5, 0]}>
                <Text fontSize={0.26} color="#38bdf8" outlineWidth={0.02} outlineColor="#020617">
                  Elétron β⁻ (e⁻) + ν̄ₑ
                </Text>
              </Billboard>
            </group>
          )}

          {decayType === 'beta-plus' && (
            // Partícula Beta Positiva / Pósitron
            <group>
              <mesh>
                <sphereGeometry args={[0.2, 24, 24]} />
                <meshStandardMaterial color="#d946ef" emissive="#f472b6" emissiveIntensity={2.5} />
              </mesh>
              <pointLight color="#f472b6" intensity={3} distance={5} />
              <Billboard position={[0, 0.5, 0]}>
                <Text fontSize={0.26} color="#f472b6" outlineWidth={0.02} outlineColor="#020617">
                  Pósitron β⁺ (e⁺)
                </Text>
              </Billboard>
            </group>
          )}

          {decayType === 'gamma' && (
            // Pulso Eletromagnético Gama (Anel de Energia)
            <group>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.4, 0.65, 32]} />
                <meshBasicMaterial color="#a855f7" side={THREE.DoubleSide} transparent opacity={0.8} />
              </mesh>
              <Billboard position={[0, 0.7, 0]}>
                <Text fontSize={0.28} color="#c084fc" outlineWidth={0.02} outlineColor="#020617">
                  Fóton Gama γ (140 keV)
                </Text>
              </Billboard>
            </group>
          )}

          {decayType === 'fission' && (
            // Fissão: Núcleo filho secundário + 3 nêutrons ejetados
            <group>
              <mesh position={[0, 0, 0]}>
                <sphereGeometry args={[0.8, 24, 24]} />
                <meshStandardMaterial color="#ef4444" emissive="#dc2626" emissiveIntensity={0.8} />
              </mesh>
              {/* Nêutrons rápidos */}
              <mesh position={[1, 0.8, 0]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={1} />
              </mesh>
              <mesh position={[0.8, -0.9, 0.5]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={1} />
              </mesh>
              <mesh position={[1.2, -0.2, -0.6]}>
                <sphereGeometry args={[0.15, 16, 16]} />
                <meshStandardMaterial color="#f8fafc" emissive="#f8fafc" emissiveIntensity={1} />
              </mesh>

              <Billboard position={[0, 1.2, 0]}>
                <Text fontSize={0.28} color="#ef4444" outlineWidth={0.02} outlineColor="#020617">
                  Fragmento de Fissão + 3 nêutrons
                </Text>
              </Billboard>
            </group>
          )}
        </group>
      )}
    </group>
  );
}

export function RadioactiveDecayModal({isOpen, onClose}: RadioactiveDecayModalProps) {
  const [selectedIsotope, setSelectedIsotope] = useState<RadioactiveIsotope>(RADIOACTIVE_ISOTOPES[0]);
  const [isDecayed, setIsDecayed] = useState<boolean>(false);
  const [isEjecting, setIsEjecting] = useState<boolean>(false);
  const [ejectionProgress, setEjectionProgress] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'nucleus' | 'sample'>('nucleus');

  // Estado do simulador de amostra em massa (Grid de 64 núcleos)
  const [sampleElapsedHalfLives, setSampleElapsedHalfLives] = useState<number>(0); // 0 a 5 meias-vidas
  const [sampleSeed, setSampleSeed] = useState<number>(1);

  const particleInfo = DECAY_PARTICLES_INFO[selectedIsotope.decayType];

  // Disparar animação de decaimento
  const handleTriggerDecay = () => {
    if (isEjecting) return;
    setIsEjecting(true);
    setEjectionProgress(0);

    const startTime = Date.now();
    const duration = 1800; // 1.8 segundos de voo da partícula

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setEjectionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setIsDecayed(true);
        // Mantém a partícula visível por mais um instante antes de estabilizar
        setTimeout(() => {
          setIsEjecting(false);
        }, 1200);
      }
    }, 16);
  };

  const handleResetDecay = () => {
    setIsDecayed(false);
    setIsEjecting(false);
    setEjectionProgress(0);
  };

  // Quando trocar de isótopo, reseta a simulação
  useEffect(() => {
    handleResetDecay();
  }, [selectedIsotope.id]);

  // Simulação de Amostra Estatística (64 núcleos com probabilidade de decaimento exponencial)
  // Probabilidade de sobrevivência em t meias-vidas: P = (1/2)^t
  const sampleDecayStatus = useMemo(() => {
    const survivalProbability = Math.pow(0.5, sampleElapsedHalfLives);
    const totalNuclei = 64;
    // Usamos uma semente determinística pseudoaleatória baseada no sampleSeed
    const nucleiList = [];
    let decayedCount = 0;

    for (let i = 0; i < totalNuclei; i++) {
      // Gerador pseudoaleatório congruente
      const pseudoRand = ((i * 9301 + 49297 + sampleSeed * 233) % 233280) / 233280;
      const survived = pseudoRand < survivalProbability;
      if (!survived) decayedCount++;
      nucleiList.push({id: i, survived});
    }

    const remainingCount = totalNuclei - decayedCount;
    const remainingPct = Math.round((remainingCount / totalNuclei) * 100);

    return {
      nucleiList,
      remainingCount,
      decayedCount,
      remainingPct,
      survivalProbability,
    };
  }, [sampleElapsedHalfLives, sampleSeed]);

  const handleExportPDF = () => {
    exportSectionToPDF(
      `Relatório de Decaimento Radioativo - ${selectedIsotope.name}`,
      `Estabilidade Nuclear, Emissão de Partículas e Transmutação do Isótopo ${selectedIsotope.symbol}`,
      [
        { label: 'Isótopo Radioativo Pai', value: `${selectedIsotope.name} (${selectedIsotope.symbol})` },
        { label: 'Número Atômico (Z) / Massa (A)', value: `Z = ${selectedIsotope.atomicNumber} prótons, A = ${selectedIsotope.massNumber} (${selectedIsotope.neutrons} nêutrons)` },
        { label: 'Tipo de Decaimento', value: particleInfo.name },
        { label: 'Meia-Vida (T₁/₂)', value: selectedIsotope.halfLifeText },
        { label: 'Equação Nuclear Balanceada', value: selectedIsotope.nuclearEquation },
        { label: 'Elemento Filho Transmutado', value: `${selectedIsotope.daughterName} (${selectedIsotope.daughterSymbol})` },
        { label: 'Energia Liberada por Desintegração', value: `${selectedIsotope.decayEnergyMeV} MeV` },
        { label: 'Poder de Penetração da Radiação', value: `${particleInfo.penetrationPower.toUpperCase()} - Requer blindagem de ${particleInfo.shieldingMaterial}` },
        { label: 'Aplicações Práticas', value: selectedIsotope.practicalApplications.join(' • ') },
      ],
      `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 16px;">
          <h3 style="margin-top: 0; color: #dc2626;">Contexto Histórico & Físico</h3>
          <p style="font-size: 13px; color: #334155; line-height: 1.6;">${selectedIsotope.historicalContext}</p>
          <p style="font-size: 12px; color: #64748b;"><strong>Mecanismo de Emissão:</strong> ${particleInfo.description}</p>
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-rose-600 flex items-center justify-center shadow-lg shadow-amber-500/20">
              <Radio className="w-5 h-5 text-white animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Simulador 3D de Decaimento Radioativo & Transmutação Nuclear
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Física Nuclear
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Visualização interativa da ejeção de partículas alfa, beta, pósitrons, gama e fissão com transmutação atômica em tempo real
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportPDF}
              className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
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

        {/* Barra de Seleção de Isótopos Radioativos */}
        <div className="px-6 py-2 bg-slate-900/70 border-b border-slate-800/80 flex items-center justify-between gap-3 shrink-0 overflow-x-auto">
          <div className="flex items-center gap-1.5 py-1">
            {RADIOACTIVE_ISOTOPES.map((iso) => {
              const isSelected = iso.id === selectedIsotope.id;
              return (
                <button
                  key={iso.id}
                  onClick={() => setSelectedIsotope(iso)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-white shadow-md font-bold'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <span>{iso.name}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/40 font-mono">
                    {iso.decayType.toUpperCase()}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Alternador de Modo: Núcleo 3D vs Amostra de Meia-Vida */}
          <div className="flex items-center bg-slate-950/80 border border-slate-800 p-1 rounded-xl text-xs shrink-0">
            <button
              onClick={() => setActiveTab('nucleus')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                activeTab === 'nucleus' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Núcleo Atômico 3D
            </button>
            <button
              onClick={() => setActiveTab('sample')}
              className={`px-3 py-1 rounded-lg font-medium transition ${
                activeTab === 'sample' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Amostra & Meia-Vida
            </button>
          </div>
        </div>

        {/* Conteúdo Central */}
        <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
          {activeTab === 'nucleus' ? (
            /* Vista 1: Núcleo Atômico 3D com Ejeção e Transmutação */
            <div className="flex-1 h-[60%] lg:h-full relative bg-radial-at-c from-slate-900 to-slate-950 select-none touch-none">
              <Canvas camera={{position: [0, 0, 7.5], fov: 48}}>
                <ambientLight intensity={1.4} />
                <directionalLight position={[10, 10, 10]} intensity={1.5} />
                <directionalLight position={[-10, -10, -5]} intensity={0.6} />
                <pointLight position={[0, 0, 8]} intensity={1.2} />

                <NucleonCluster
                  protonsCount={selectedIsotope.atomicNumber}
                  neutronsCount={selectedIsotope.neutrons}
                  isDecayed={isDecayed}
                  decayType={selectedIsotope.decayType}
                  parentSymbol={selectedIsotope.symbol}
                  daughterSymbol={selectedIsotope.daughterSymbol}
                  isEjecting={isEjecting}
                  ejectionProgress={ejectionProgress}
                />

                <OrbitControls enableDamping dampingFactor={0.06} minDistance={3.5} maxDistance={20} />
              </Canvas>

              {/* Botões de Ação na Cena 3D */}
              <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
                <button
                  onClick={handleTriggerDecay}
                  disabled={isEjecting || isDecayed}
                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-rose-600 hover:from-amber-400 hover:to-rose-500 text-slate-950 font-black text-xs flex items-center gap-2 shadow-lg shadow-amber-500/25 transition disabled:opacity-40"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>{isDecayed ? 'Decaimento Concluído' : 'Disparar Decaimento Nuclear'}</span>
                </button>

                {isDecayed && (
                  <button
                    onClick={handleResetDecay}
                    className="py-2 px-3.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-white font-semibold text-xs flex items-center gap-1.5 border border-slate-700 transition"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Restaurar Núcleo Pai</span>
                  </button>
                )}
              </div>

              {/* Legenda de Cores dos Núcleons */}
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-3 bg-slate-900/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                  <span className="text-slate-300">Próton (p⁺)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-slate-400 shadow-sm" />
                  <span className="text-slate-300">Nêutron (n⁰)</span>
                </div>
                <div className="flex items-center gap-1.5 pl-2 border-l border-slate-700">
                  <span className="w-3 h-3 rounded-full" style={{backgroundColor: particleInfo.color}} />
                  <span className="text-amber-300 font-semibold">{particleInfo.name}</span>
                </div>
              </div>

              {/* Feedback de Transmutação em Tempo Real */}
              {isDecayed && (
                <div className="absolute top-4 right-4 z-10 p-3.5 bg-slate-900/95 border border-sky-500/50 rounded-2xl shadow-2xl backdrop-blur-md max-w-sm flex flex-col gap-1.5 animate-fadeIn">
                  <div className="flex items-center gap-2 text-sky-400 font-bold text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Transmutação Concluída!</span>
                  </div>
                  <p className="text-xs text-slate-200">
                    O elemento <strong className="text-amber-300">{selectedIsotope.name}</strong> decaiu e se transformou em{' '}
                    <strong className="text-sky-300">{selectedIsotope.daughterName}</strong>.
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Vista 2: Simulador de Amostra Estatística & Curva Exponencial de Meia-Vida */
            <div className="flex-1 h-[60%] lg:h-full relative bg-slate-950 p-6 flex flex-col gap-4 overflow-y-auto">
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                <div>
                  <h3 className="font-bold text-base text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>Lei Exponencial do Decaimento Radioativo</span>
                  </h3>
                  <p className="text-xs text-slate-400">
                    A cada meia-vida (T₁/₂ = {selectedIsotope.halfLifeText}), exatamente metade dos núcleos instáveis sobreviventes se desintegra.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSampleSeed((s) => s + 1)}
                    className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-medium border border-slate-700 flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Nova Amostra Aleatória</span>
                  </button>
                </div>
              </div>

              {/* Controle Deslizante de Meias-Vidas Transcorridas */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-300">Tempo Decorrido na Amostra:</span>
                  <span className="font-mono text-amber-400 font-bold text-sm">
                    {sampleElapsedHalfLives === 0
                      ? 't = 0 (Amostra Inicial 100%)'
                      : `t = ${sampleElapsedHalfLives} × Meia-Vida (${sampleElapsedHalfLives * (selectedIsotope.decayType === 'fission' ? 703 : 1)} períodos)`}
                  </span>
                </div>

                <input
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  value={sampleElapsedHalfLives}
                  onChange={(e) => setSampleElapsedHalfLives(parseInt(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />

                <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                  <span>0 T₁/₂ (100%)</span>
                  <span>1 T₁/₂ (50%)</span>
                  <span>2 T₁/₂ (25%)</span>
                  <span>3 T₁/₂ (12.5%)</span>
                  <span>4 T₁/₂ (6.25%)</span>
                  <span>5 T₁/₂ (3.12%)</span>
                </div>
              </div>

              {/* Grade de 64 Núcleos em Tempo Real */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    População de 64 Núcleos da Amostra
                  </span>
                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-amber-400 font-bold">
                      {sampleDecayStatus.remainingCount} Pais ({sampleDecayStatus.remainingPct}%)
                    </span>
                    <span className="text-sky-400 font-bold">
                      {sampleDecayStatus.decayedCount} Filhos ({100 - sampleDecayStatus.remainingPct}%)
                    </span>
                  </div>
                </div>

                {/* Grid Visual de Esferas dos Núcleos */}
                <div className="grid grid-cols-8 sm:grid-cols-16 gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800/80">
                  {sampleDecayStatus.nucleiList.map((nuc) => (
                    <div
                      key={nuc.id}
                      className={`h-8 rounded-lg flex items-center justify-center font-bold text-[10px] transition-all duration-300 ${
                        nuc.survived
                          ? 'bg-amber-500/20 border border-amber-500/60 text-amber-300 shadow'
                          : 'bg-sky-500/20 border border-sky-500/60 text-sky-300 opacity-80'
                      }`}
                      title={nuc.survived ? `Núcleo Pai ${selectedIsotope.symbol}` : `Transmutado em ${selectedIsotope.daughterSymbol}`}
                    >
                      {nuc.survived ? selectedIsotope.symbol.replace(/[0-9]/g, '') : selectedIsotope.daughterSymbol.replace(/[0-9]/g, '').slice(0, 2)}
                    </div>
                  ))}
                </div>
              </div>

              {/* Equação Matemática da Curva */}
              <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl text-xs text-slate-300 flex items-center justify-between">
                <div>
                  <span className="text-slate-400">Fórmula de Decaimento Exponencial:</span>
                  <div className="font-mono text-sm text-amber-300 font-bold mt-0.5">
                    N(t) = N₀ · (1/2)^(t / T₁/₂)
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-slate-400">Atividade Radioativa:</span>
                  <div className="font-mono text-sm text-sky-300 font-bold mt-0.5">
                    A = λ · N
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Painel Lateral: Dados Nucleares, Equação Balanceada e Aplicações */}
          <div className="w-full lg:w-96 bg-slate-900/90 border-t lg:border-t-0 lg:border-l border-slate-800 flex flex-col p-5 overflow-y-auto gap-4 backdrop-blur-xl">
            {/* Equação Nuclear Balanceada */}
            <div className="bg-slate-950/80 border border-amber-500/40 rounded-2xl p-4 shadow-xl flex flex-col gap-2.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" />
                Equação Nuclear de Desintegração
              </span>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-xs sm:text-sm text-amber-300 font-bold leading-relaxed break-all">
                {selectedIsotope.nuclearEquation}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <span>Energia Liberada:</span>
                <span className="font-bold text-white font-mono">{selectedIsotope.decayEnergyMeV} MeV</span>
              </div>
            </div>

            {/* Informações da Partícula Emitida */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sky-400" />
                  {particleInfo.name}
                </span>
                <span
                  className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase"
                  style={{backgroundColor: `${particleInfo.color}25`, color: particleInfo.color}}
                >
                  Poder {particleInfo.penetrationPower}
                </span>
              </div>

              <p className="text-slate-300 leading-relaxed text-[11px]">{particleInfo.description}</p>

              <div className="p-2.5 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-col gap-1 text-[11px]">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Blindagem Recomendada:</span>
                  <span className="font-semibold text-slate-200">{particleInfo.shieldingMaterial}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Velocidade de Ejeção:</span>
                  <span className="font-semibold text-amber-400">{(particleInfo.speedFractionOfLight * 100).toFixed(0)}% da velocidade da luz (c)</span>
                </div>
              </div>
            </div>

            {/* Aplicações Práticas no Mundo Real */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2.5 text-xs">
              <span className="font-bold text-white flex items-center gap-1.5 text-xs">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Aplicações Práticas & Medicina
              </span>
              <ul className="flex flex-col gap-1.5 list-disc list-inside text-slate-300 text-[11px] leading-relaxed">
                {selectedIsotope.practicalApplications.map((app, idx) => (
                  <li key={idx} className="marker:text-amber-400">
                    {app}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contexto Histórico e Link Wikipédia */}
            <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2 text-xs">
              <span className="font-bold text-slate-300 flex items-center gap-1.5 text-xs">
                <Info className="w-4 h-4 text-sky-400" />
                História & Descoberta
              </span>
              <p className="text-slate-400 leading-relaxed text-[11px]">{selectedIsotope.historicalContext}</p>
              <a
                href={selectedIsotope.wikiUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5 text-sky-400" />
                <span>Veja mais na Wikipédia</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
