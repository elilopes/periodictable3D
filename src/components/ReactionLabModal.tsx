import React, {useState, useRef, useMemo, useEffect} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Billboard, Text} from '@react-three/drei';
import * as THREE from 'three';
import {
  CHEMICAL_REACTIONS_LIST,
  ChemicalReaction,
  WORKBENCH_AVAILABLE_ELEMENTS,
} from '../data/chemicalReactionsData';
import {exportSectionToPDF} from '../utils/pdfExport';
import {
  X,
  FlaskConical,
  Play,
  RotateCcw,
  Sparkles,
  Zap,
  Info,
  FileText,
  ExternalLink,
  Plus,
  Trash2,
  Atom,
  Flame,
  CheckCircle2,
  HelpCircle,
} from 'lucide-react';

interface ReactionLabModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// Renderização 3D dos átomos dos reagentes flutuando na câmara antes da reação
function ReactantsFloatingScene({
  atoms,
  isReacting,
  reactionProgress,
}: {
  atoms: Array<{
    symbol: string;
    name: string;
    color: string;
    radius: number;
    initialPos: [number, number, number];
  }>;
  isReacting: boolean;
  reactionProgress: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(({clock}) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    if (!isReacting) {
      // Flutuação orbital orgânica na câmara
      groupRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {atoms.map((atom, idx) => {
        // Quando está reagindo, os átomos se movem do initialPos para o centro (0, 0, 0)
        const currentPos: [number, number, number] = isReacting
          ? [
              THREE.MathUtils.lerp(atom.initialPos[0], 0, reactionProgress),
              THREE.MathUtils.lerp(atom.initialPos[1], 0, reactionProgress),
              THREE.MathUtils.lerp(atom.initialPos[2], 0, reactionProgress),
            ]
          : atom.initialPos;

        return (
          <group key={idx} position={currentPos}>
            <mesh>
              <sphereGeometry args={[atom.radius, 32, 32]} />
              <meshStandardMaterial
                color={atom.color}
                roughness={0.2}
                metalness={0.3}
                emissive={atom.color}
                emissiveIntensity={isReacting ? 0.8 : 0.2}
              />
            </mesh>

            {/* Rótulo Flutuante do Átomo */}
            <Billboard position={[0, atom.radius + 0.45, 0]}>
              <Text
                fontSize={0.28}
                color="#ffffff"
                anchorX="center"
                anchorY="middle"
                outlineWidth={0.03}
                outlineColor="#020617"
              >
                {atom.symbol}
              </Text>
            </Billboard>
          </group>
        );
      })}

      {/* Efeito de flash luminoso de alta energia no centro durante a colisão */}
      {isReacting && (
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[reactionProgress * 1.8, 32, 32]} />
          <meshBasicMaterial
            color="#fbbf24"
            transparent
            opacity={(1 - reactionProgress) * 0.85}
          />
        </mesh>
      )}
    </group>
  );
}

// Renderização 3D da molécula ou sal do produto final estabilizado após a reação
function ProductMoleculeScene({reaction}: {reaction: ChemicalReaction}) {
  const groupRef = useRef<THREE.Group>(null!);
  const {productMolecule} = reaction;

  useFrame(({clock}) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <group ref={groupRef}>
      {/* Átomos da Molécula */}
      {productMolecule.atoms.map((atom, idx) => (
        <group key={idx} position={atom.position}>
          <mesh>
            <sphereGeometry args={[atom.radius, 32, 32]} />
            <meshStandardMaterial
              color={atom.color}
              roughness={0.2}
              metalness={0.4}
              emissive={atom.color}
              emissiveIntensity={0.25}
            />
          </mesh>

          {/* Rótulo 3D WebGL (Billboard) */}
          <Billboard position={[0, atom.radius + 0.45, 0]}>
            <Text
              fontSize={0.26}
              color="#ffffff"
              anchorX="center"
              anchorY="bottom"
              outlineWidth={0.03}
              outlineColor="#020617"
            >
              {atom.elementSymbol} {atom.charge || ''}
            </Text>
            <Text
              position={[0, -0.22, 0]}
              fontSize={0.14}
              color="#94a3b8"
              anchorX="center"
              anchorY="top"
            >
              {atom.elementName}
            </Text>
          </Billboard>
        </group>
      ))}

      {/* Cilindros das Ligações Químicas */}
      {productMolecule.bonds.map((bond, idx) => {
        const atomA = productMolecule.atoms[bond.fromIndex];
        const atomB = productMolecule.atoms[bond.toIndex];
        if (!atomA || !atomB) return null;

        const posA = new THREE.Vector3(...atomA.position);
        const posB = new THREE.Vector3(...atomB.position);
        const midPoint = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);
        const distance = posA.distanceTo(posB);

        // Orientação do cilindro
        const direction = new THREE.Vector3().subVectors(posB, posA).normalize();
        const orientation = new THREE.Quaternion().setFromUnitVectors(
          new THREE.Vector3(0, 1, 0),
          direction
        );

        return (
          <group key={idx} position={midPoint} quaternion={orientation}>
            <mesh>
              <cylinderGeometry args={[0.07, 0.07, distance, 16]} />
              <meshStandardMaterial
                color={bond.type === 'ionica' ? '#f59e0b' : '#38bdf8'}
                roughness={0.3}
                metalness={0.5}
                emissive={bond.type === 'ionica' ? '#d97706' : '#0284c7'}
                emissiveIntensity={0.3}
              />
            </mesh>
          </group>
        );
      })}

      {/* Halo de estabilização orbital */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.5, 2.58, 64]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export function ReactionLabModal({isOpen, onClose}: ReactionLabModalProps) {
  // Elementos atualmente colocados na câmara de reação com contadores
  const [chamberElements, setChamberElements] = useState<Record<string, number>>({
    H: 2,
    O: 1,
  });

  const [activeReaction, setActiveReaction] = useState<ChemicalReaction | null>(
    CHEMICAL_REACTIONS_LIST[0] // Síntese da Água como demonstração inicial
  );

  const [isReacting, setIsReacting] = useState<boolean>(false);
  const [reactionProgress, setReactionProgress] = useState<number>(0);
  const [isReactionCompleted, setIsReactionCompleted] = useState<boolean>(false);

  // Verifica se a composição atual da câmara satisfaz alguma reação da lista
  const detectedReaction = useMemo(() => {
    return CHEMICAL_REACTIONS_LIST.find((rx) => {
      // Todos os elementos requeridos devem estar presentes na câmara
      return rx.requiredElements.every((req) => (chamberElements[req.symbol] || 0) >= 1);
    }) || null;
  }, [chamberElements]);

  // Se detectou uma reação válida e o usuário não está no meio da animação, sincroniza
  useEffect(() => {
    if (detectedReaction && !isReacting && !isReactionCompleted) {
      setActiveReaction(detectedReaction);
    }
  }, [detectedReaction, isReacting, isReactionCompleted]);

  // Adicionar elemento à câmara
  const handleAddElement = (symbol: string) => {
    setIsReactionCompleted(false);
    setChamberElements((prev) => ({
      ...prev,
      [symbol]: (prev[symbol] || 0) + 1,
    }));
  };

  // Remover elemento da câmara
  const handleRemoveElement = (symbol: string) => {
    setIsReactionCompleted(false);
    setChamberElements((prev) => {
      const next = {...prev};
      if (next[symbol] > 1) {
        next[symbol] -= 1;
      } else {
        delete next[symbol];
      }
      return next;
    });
  };

  // Limpar câmara de reação
  const handleClearChamber = () => {
    setChamberElements({});
    setActiveReaction(null);
    setIsReacting(false);
    setIsReactionCompleted(false);
  };

  // Carregar preset de reação rápida
  const handleLoadPreset = (reaction: ChemicalReaction) => {
    const newChamber: Record<string, number> = {};
    reaction.requiredElements.forEach((req) => {
      newChamber[req.symbol] = req.count;
    });
    setChamberElements(newChamber);
    setActiveReaction(reaction);
    setIsReacting(false);
    setIsReactionCompleted(false);
  };

  // Disparar animação da reação
  const handleTriggerReaction = () => {
    if (!activeReaction || isReacting) return;
    setIsReacting(true);
    setReactionProgress(0);

    const startTime = Date.now();
    const duration = 1600; // 1.6 segundos

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(1, elapsed / duration);
      setReactionProgress(progress);

      if (progress >= 1) {
        clearInterval(interval);
        setIsReacting(false);
        setIsReactionCompleted(true);
      }
    }, 16);
  };

  // Drag and Drop nativo HTML5
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const symbol = e.dataTransfer.getData('text/plain');
    if (symbol) {
      handleAddElement(symbol);
    }
  };

  const handleExportPDF = () => {
    if (!activeReaction) return;
    exportSectionToPDF(
      `Relatório de Reação Química - ${activeReaction.name}`,
      `Síntese Molecular e Estudo Termodinâmico da Reação ${activeReaction.equation}`,
      [
        { label: 'Reação Química', value: activeReaction.name },
        { label: 'Equação Química Balanceada', value: activeReaction.balancedEquation },
        { label: 'Classificação da Reação', value: activeReaction.categoryLabel },
        { label: 'Tipo de Ligação Formada', value: activeReaction.bondTypeLabel },
        { label: 'Variação de Entalpia (ΔH)', value: activeReaction.deltaH },
        { label: 'Geometria do Produto', value: activeReaction.productMolecule.geometry },
        { label: 'Fórmula Molecular', value: activeReaction.productMolecule.formula },
        { label: 'Mecanismo de Ligação', value: activeReaction.explanation },
      ],
      `
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin-top: 16px;">
          <h3 style="margin-top: 0; color: #0284c7;">Descrição Científica do Processo</h3>
          <p style="font-size: 13px; color: #334155; line-height: 1.6;">${activeReaction.description}</p>
          <p style="font-size: 12px; color: #64748b;"><strong>Como os elétrons interagem:</strong> ${activeReaction.explanation}</p>
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
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <FlaskConical className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-black text-white">
                  Laboratório 3D de Reações Químicas (Bancada Drag-and-Drop)
                </h2>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  Simulador Interativo
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Arraste ou clique nos elementos para a câmara central: veja a colisão atômica, transferência de elétrons e a formação de ligações em 3D
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {activeReaction && (
              <button
                onClick={handleExportPDF}
                className="py-1.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition"
                title="Salvar Relatório da Reação em PDF"
              >
                <FileText className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Salvar em PDF</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition"
              title="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Presets Rápidos de Reações Célebres */}
        <div className="px-6 py-2 bg-slate-900/70 border-b border-slate-800/80 flex items-center justify-between gap-3 shrink-0 overflow-x-auto">
          <span className="text-xs font-bold text-slate-400 whitespace-nowrap hidden sm:inline">
            Experimentos Prontos:
          </span>
          <div className="flex items-center gap-1.5 py-1">
            {CHEMICAL_REACTIONS_LIST.map((rx) => {
              const isSelected = activeReaction?.id === rx.id;
              return (
                <button
                  key={rx.id}
                  onClick={() => handleLoadPreset(rx)}
                  className={`py-1.5 px-3 rounded-xl text-xs font-semibold transition whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md font-bold'
                      : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-800'
                  }`}
                >
                  <Sparkles className="w-3 h-3 text-emerald-400" />
                  <span>{rx.name}</span>
                  <span className="text-[10px] font-mono opacity-80">({rx.equation})</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={handleClearChamber}
            className="py-1.5 px-3 rounded-xl bg-slate-800/80 hover:bg-rose-950/40 text-slate-400 hover:text-rose-300 border border-slate-700 text-xs font-medium flex items-center gap-1.5 shrink-0 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Limpar Câmara</span>
          </button>
        </div>

        {/* Corpo Principal: Câmara de Reação 3D + Painel de Reagentes e Resultados */}
        <div className="flex-1 flex flex-col lg:flex-row relative overflow-hidden">
          {/* Câmara de Reação Central 3D (Área de Drop) */}
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            className="flex-1 h-[55%] lg:h-full relative bg-radial-at-c from-slate-900 to-slate-950 select-none touch-none border-b lg:border-b-0 lg:border-r border-slate-800"
          >
            <Canvas camera={{position: [0, 0, 7.5], fov: 48}}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 10]} intensity={1.5} />
              <directionalLight position={[-10, -10, -5]} intensity={0.5} />
              <pointLight position={[0, 0, 6]} intensity={1.2} />

              {/* Se a reação já completou, renderiza o produto final 3D */}
              {isReactionCompleted && activeReaction ? (
                <ProductMoleculeScene reaction={activeReaction} />
              ) : activeReaction ? (
                /* Átomos dos reagentes em órbita ou colidindo */
                <ReactantsFloatingScene
                  atoms={activeReaction.reactantAtoms}
                  isReacting={isReacting}
                  reactionProgress={reactionProgress}
                />
              ) : (
                /* Estado Vazio */
                <group>
                  <mesh rotation={[Math.PI / 2, 0, 0]}>
                    <ringGeometry args={[2.0, 2.05, 48]} />
                    <meshBasicMaterial color="#334155" side={THREE.DoubleSide} />
                  </mesh>
                </group>
              )}

              <OrbitControls enableDamping dampingFactor={0.06} minDistance={3.5} maxDistance={18} />
            </Canvas>

            {/* Overlay com Elementos Colocados na Câmara */}
            <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 bg-slate-900/90 px-3 py-1.5 rounded-xl border border-slate-800">
                Na Câmara:
              </span>
              {Object.keys(chamberElements).length === 0 ? (
                <span className="text-xs text-slate-500 italic bg-slate-900/70 px-3 py-1.5 rounded-xl border border-dashed border-slate-800">
                  Vazia. Arraste elementos abaixo para cá!
                </span>
              ) : (
                Object.entries(chamberElements).map(([sym, count]) => (
                  <div
                    key={sym}
                    className="flex items-center gap-1.5 bg-slate-900/90 border border-slate-700 px-2.5 py-1 rounded-xl text-xs font-bold text-white shadow"
                  >
                    <span className="text-emerald-400">{sym}</span>
                    <span className="text-[10px] text-slate-400">×{count}</span>
                    <button
                      onClick={() => handleRemoveElement(sym)}
                      className="text-slate-500 hover:text-rose-400 ml-1"
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Botão de Disparar Reação Quimica */}
            {activeReaction && !isReactionCompleted && (
              <div className="absolute top-4 right-4 z-10">
                <button
                  onClick={handleTriggerReaction}
                  disabled={isReacting}
                  className="py-2.5 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 hover:from-emerald-400 hover:to-sky-400 text-slate-950 font-black text-xs flex items-center gap-2 shadow-xl shadow-emerald-500/25 transition transform active:scale-95 disabled:opacity-50"
                >
                  <Zap className="w-4 h-4 fill-slate-950" />
                  <span>{isReacting ? 'Reagindo e Transferindo Elétrons...' : '💥 Iniciar Reação Química 3D'}</span>
                </button>
              </div>
            )}

            {/* Dica ou Parabéns pós-reação */}
            {isReactionCompleted && activeReaction && (
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-emerald-950/90 border border-emerald-500/60 text-emerald-300 px-4 py-2 rounded-2xl shadow-xl backdrop-blur-md text-xs font-bold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Molécula Estabilizada! Gire com o mouse para inspecionar.</span>
                <button
                  onClick={() => setIsReactionCompleted(false)}
                  className="ml-2 px-2 py-0.5 rounded-lg bg-emerald-800/80 text-white text-[11px] hover:bg-emerald-700"
                >
                  Repetir
                </button>
              </div>
            )}

            {/* Dica Inferior */}
            <div className="absolute bottom-3 left-4 z-10 text-[11px] text-slate-400 flex items-center gap-2 bg-slate-950/70 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800 pointer-events-none">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Arraste com o mouse para girar o modelo 3D • Role para dar zoom</span>
            </div>
          </div>

          {/* Painel Lateral: Reagentes Disponíveis (Bandeja) & Análise da Reação */}
          <div className="w-full lg:w-96 bg-slate-900/90 flex flex-col p-5 overflow-y-auto gap-4 backdrop-blur-xl">
            {/* Status da Reação e Equação */}
            {activeReaction ? (
              <div className="bg-slate-950/80 border border-emerald-500/40 rounded-2xl p-4 shadow-xl flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                    <FlaskConical className="w-3.5 h-3.5" />
                    {activeReaction.categoryLabel}
                  </span>
                  <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                    {activeReaction.bondTypeLabel}
                  </span>
                </div>

                <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 font-mono text-sm text-emerald-300 font-bold leading-relaxed">
                  {activeReaction.balancedEquation}
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300 pt-1 border-t border-slate-800">
                  <span className="text-slate-400">Entalpia (ΔH):</span>
                  <span className="font-bold text-amber-400 flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" />
                    {activeReaction.deltaH}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-300">
                  <span className="text-slate-400">Geometria Molecular:</span>
                  <span className="font-semibold text-white">
                    {activeReaction.productMolecule.geometry}
                  </span>
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80">
                  {activeReaction.explanation}
                </p>

                <a
                  href={activeReaction.wikiUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 text-xs font-medium flex items-center justify-center gap-1.5 transition"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Veja mais na Wikipédia</span>
                </a>
              </div>
            ) : (
              <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 flex flex-col gap-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <HelpCircle className="w-4 h-4" />
                  <span>Nenhuma Reação Detectada</span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Combine elementos químicos conhecidos na câmara central (como <strong>H + O</strong>, <strong>Na + Cl</strong>, <strong>C + O</strong>, <strong>N + H</strong> ou <strong>Mg + O</strong>) ou clique em um dos "Experimentos Prontos" no topo.
                </p>
              </div>
            )}

            {/* Bandeja de Reagentes: Elementos Arrastáveis ou Clicáveis */}
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5 text-emerald-400" />
                Bandeja de Elementos Químicos
              </span>
              <p className="text-[11px] text-slate-400">
                Arraste para a câmara 3D ou clique em "+" para adicionar:
              </p>

              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                {WORKBENCH_AVAILABLE_ELEMENTS.map((el) => (
                  <div
                    key={el.symbol}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('text/plain', el.symbol);
                    }}
                    onClick={() => handleAddElement(el.symbol)}
                    className="p-2.5 rounded-xl bg-slate-950/80 hover:bg-slate-800/80 border border-slate-800 hover:border-emerald-500/50 flex items-center justify-between cursor-pointer transition group shadow-sm select-none"
                    title={`Arrastar ${el.name} para a câmara de reação 3D`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs border"
                        style={{
                          backgroundColor: `${el.color}25`,
                          borderColor: el.color,
                          color: el.color,
                        }}
                      >
                        {el.symbol}
                      </span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-white group-hover:text-emerald-300 leading-tight">
                          {el.name}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          Z = {el.number}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddElement(el.symbol);
                      }}
                      className="p-1 rounded-lg bg-slate-800 group-hover:bg-emerald-600 text-slate-400 group-hover:text-white transition"
                      title="Adicionar à câmara"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
