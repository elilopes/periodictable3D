import React, {useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Text, Billboard} from '@react-three/drei';
import * as THREE from 'three';
import {INORGANIC_FUNCTIONS} from '../data/inorganicFunctions';
import {useLanguage} from '../i18n/LanguageContext';
import {exportSectionToPDF} from '../utils/pdfExport';
import {
  X,
  Sparkles,
  Droplet,
  Beaker,
  Atom,
  RotateCw,
  CheckCircle2,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface InorganicFunctionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function InorganicMoleculeAtom({
  atom,
}: {
  atom: {
    symbol: string;
    name: string;
    pos: [number, number, number];
    color: string;
    radius: number;
  };
}) {
  return (
    <group position={atom.pos}>
      <mesh>
        <sphereGeometry args={[atom.radius, 32, 32]} />
        <meshStandardMaterial
          color={atom.color}
          roughness={0.25}
          metalness={0.3}
          emissive={atom.color}
          emissiveIntensity={0.2}
        />
      </mesh>
      <Billboard position={[0, atom.radius + 0.32, 0]}>
        <Text
          fontSize={0.22}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.02}
          outlineColor="#020617"
        >
          {atom.symbol}
        </Text>
        <Text
          position={[0, -0.2, 0]}
          fontSize={0.1}
          color="#94a3b8"
          anchorX="center"
          anchorY="top"
        >
          {atom.name}
        </Text>
      </Billboard>
    </group>
  );
}

function InorganicMoleculeBond({
  posA,
  posB,
  order = 1,
}: {
  posA: [number, number, number];
  posB: [number, number, number];
  order?: 1 | 2;
}) {
  const vA = new THREE.Vector3(...posA);
  const vB = new THREE.Vector3(...posB);
  const mid = new THREE.Vector3().addVectors(vA, vB).multiplyScalar(0.5);
  const dir = new THREE.Vector3().subVectors(vB, vA);
  const length = dir.length();
  const orientation = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    dir.clone().normalize()
  );

  if (order === 2) {
    return (
      <group position={mid} quaternion={orientation}>
        <mesh position={[-0.08, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, length, 16]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.3} emissive="#0284c7" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, length, 16]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.3} emissive="#0284c7" emissiveIntensity={0.2} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={mid} quaternion={orientation}>
      <mesh>
        <cylinderGeometry args={[0.06, 0.06, length, 16]} />
        <meshStandardMaterial color="#38bdf8" roughness={0.3} emissive="#0284c7" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export function InorganicFunctionsModal({isOpen, onClose}: InorganicFunctionsModalProps) {
  const {language} = useLanguage();
  const [selectedId, setSelectedId] = useState<string>('acidos');

  const selectedFunction =
    INORGANIC_FUNCTIONS.find((f) => f.id === selectedId) || INORGANIC_FUNCTIONS[0];

  if (!isOpen) return null;

  const titleText =
    language === 'pt'
      ? 'Funções Químicas Inorgânicas'
      : language === 'ru'
      ? 'Основные классы неорганических соединений'
      : 'Inorganic Chemical Functions';

  const subtitleText =
    language === 'pt'
      ? 'Álcoois, Bases (Hidróxidos), Óxidos e Sais segundo a teoria de Arrhenius e Lewis'
      : language === 'ru'
      ? 'Кислоты, Основания (Гидроксиды), Оксиды и Соли по теории Аррениуса'
      : 'Acids, Bases (Hydroxides), Oxides, and Salts according to Arrhenius Theory';

  const badgeColor = (() => {
    switch (selectedFunction.id) {
      case 'acidos':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'bases':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'oxidos':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'sais':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
    }
  })();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6">
      <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/85 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-cyan-500/20 via-sky-500/20 to-indigo-500/20 text-sky-400 rounded-xl border border-sky-500/30">
              <Beaker className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {titleText}
                <span className={`text-xs px-2.5 py-0.5 rounded-full border ${badgeColor}`}>
                  {selectedFunction.name[language] || selectedFunction.name.pt}
                </span>
              </h2>
              <p className="text-xs text-slate-400">{subtitleText}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                exportSectionToPDF(
                  `Função Inorgânica: ${selectedFunction.name[language] || selectedFunction.name.pt}`,
                  `Definição de Arrhenius: ${selectedFunction.arrheniusDefinition[language] || selectedFunction.arrheniusDefinition.pt}`,
                  [
                    {label: 'Classe', value: selectedFunction.name[language] || selectedFunction.name.pt},
                    {label: 'Definição de Arrhenius', value: selectedFunction.arrheniusDefinition[language] || selectedFunction.arrheniusDefinition.pt},
                    {label: 'Comportamento de pH', value: selectedFunction.phBehavior.phRange},
                    {label: 'Papel de Tornassol', value: selectedFunction.phBehavior.litmusPaper},
                    {label: 'Fenolftaleína', value: selectedFunction.phBehavior.phenolphthalein},
                    {label: 'Reação de Neutralização', value: `${selectedFunction.neutralizationReaction.equation} — ${selectedFunction.neutralizationReaction.description}`},
                    {label: 'Composto Modelo 3D', value: `${selectedFunction.molecule3D.name} (${selectedFunction.molecule3D.formula})`},
                    {label: 'Exemplos Principais', value: selectedFunction.examples.map((e) => `${e.name} (${e.formula}): ${e.application}`).join(' | ')},
                  ]
                )
              }
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
              title="Salvar Função Inorgânica em PDF"
            >
              <FileText className="w-4 h-4 text-sky-400" />
              <span>PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Conteúdo Principal */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Navegação Lateral: 4 Funções Inorgânicas */}
          <div className="w-full lg:w-80 bg-slate-950/70 p-5 border-r border-slate-800 flex flex-col gap-3 overflow-y-auto">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              {language === 'pt' ? 'Selecione a Função:' : language === 'ru' ? 'Выберите класс:' : 'Select Class:'}
            </span>

            <div className="flex flex-col gap-2">
              {INORGANIC_FUNCTIONS.map((fn) => {
                const isSelected = fn.id === selectedFunction.id;
                const displayName = fn.name[language] || fn.name.pt;

                return (
                  <button
                    key={fn.id}
                    onClick={() => setSelectedId(fn.id)}
                    className={`text-left p-3.5 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-sky-500/15 border-sky-500/60 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-2 text-sm">
                        <span>{displayName}</span>
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5 font-mono">
                        Exemplo: {fn.molecule3D.name} ({fn.molecule3D.formula})
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Dica da Reação de Neutralização */}
            <div className="mt-auto p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex flex-col gap-1.5">
              <span className="font-bold text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Neutralização Ácido-Base:
              </span>
              <p className="font-mono text-emerald-400 text-xs">
                Ácido + Base → Sal + Água
              </p>
              <p className="text-[10px] text-slate-400">
                Os íons H⁺ do ácido reagem com os íons OH⁻ da base gerando H₂O e liberando os íons do sal correspondente.
              </p>
            </div>
          </div>

          {/* Área Central: Visualizador 3D do Composto Modelo */}
          <div className="flex-1 relative bg-radial from-slate-900 via-slate-950 to-black flex flex-col">
            <div className="absolute top-4 left-4 z-10 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 shadow-xl flex items-center gap-2">
              <Atom className="w-4 h-4 text-sky-400" />
              <div>
                <span className="text-xs font-bold text-white block">
                  {selectedFunction.molecule3D.name}
                </span>
                <span className="text-[10px] text-sky-300 font-mono">
                  {selectedFunction.molecule3D.formula}
                </span>
              </div>
            </div>

            <Canvas camera={{position: [0, 0, 4.5], fov: 45}}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 10]} intensity={1.5} />
              <directionalLight position={[-10, -10, -5]} intensity={0.6} />
              <pointLight position={[0, 0, 5]} intensity={1.0} />

              <group>
                {selectedFunction.molecule3D.atoms.map((atom, idx) => (
                  <InorganicMoleculeAtom key={idx} atom={atom} />
                ))}

                {selectedFunction.molecule3D.bonds.map((bond, idx) => (
                  <InorganicMoleculeBond
                    key={idx}
                    posA={selectedFunction.molecule3D.atoms[bond.from].pos}
                    posB={selectedFunction.molecule3D.atoms[bond.to].pos}
                    order={bond.order || 1}
                  />
                ))}
              </group>

              <OrbitControls enableDamping dampingFactor={0.06} autoRotate autoRotateSpeed={1.0} />
            </Canvas>

            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800 flex items-center gap-1.5 pointer-events-none">
              <RotateCw className="w-3 h-3 text-sky-400 animate-spin" style={{animationDuration: '6s'}} />
              <span>
                {language === 'pt'
                  ? 'Gire com o mouse ou toque para inspecionar a molécula tridimensional'
                  : language === 'ru'
                  ? 'Вращайте мышью или пальцем для исследования 3D-молекулы'
                  : 'Rotate with mouse or touch to inspect the 3D molecule'}
              </span>
            </div>
          </div>

          {/* Painel Lateral Direito: Definição, Classificação, pH e Exemplos */}
          <div className="w-full lg:w-96 bg-slate-950/85 p-6 border-l border-slate-800 overflow-y-auto flex flex-col gap-4">
            <div>
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                {language === 'pt' ? 'Função Inorgânica' : language === 'ru' ? 'Неорганический класс' : 'Inorganic Function'}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {selectedFunction.name[language] || selectedFunction.name.pt}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedFunction.arrheniusDefinition[language] || selectedFunction.arrheniusDefinition.pt}
              </p>
            </div>

            {/* Escala e Comportamento de pH */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-2 text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Droplet className="w-3.5 h-3.5 text-cyan-400" />
                Comportamento em Solução & pH:
              </span>
              <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 font-mono text-[11px] text-sky-300">
                {selectedFunction.phBehavior.phRange}
              </div>
              <div className="text-[11px] text-slate-300">
                <strong>Papel de Tornassol:</strong> {selectedFunction.phBehavior.litmusPaper}
              </div>
              <div className="text-[11px] text-slate-300">
                <strong>Fenolftaleína:</strong> {selectedFunction.phBehavior.phenolphthalein}
              </div>
            </div>

            {/* Reação de Neutralização */}
            <div className="p-4 bg-sky-950/30 rounded-xl border border-sky-800/40 text-xs flex flex-col gap-1.5">
              <span className="font-bold text-sky-400">Reação Típica:</span>
              <div className="font-mono text-emerald-300 bg-slate-950/70 p-2 rounded-lg border border-slate-800 text-[11px]">
                {selectedFunction.neutralizationReaction.equation}
              </div>
              <p className="text-slate-300 text-[11px] mt-1 leading-relaxed">
                {selectedFunction.neutralizationReaction.description}
              </p>
            </div>

            {/* Classificações */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-2 text-xs">
              <span className="font-bold text-slate-200">{selectedFunction.classification.title}</span>
              <div className="flex flex-col gap-1.5">
                {selectedFunction.classification.types.map((type, idx) => (
                  <div key={idx} className="p-2 rounded-lg bg-slate-950/60 border border-slate-800 text-[11px]">
                    <div className="flex justify-between font-bold text-white">
                      <span>{type.name}</span>
                      <span className="font-mono text-sky-400">{type.example}</span>
                    </div>
                    <span className="text-slate-400 text-[10px] block mt-0.5">{type.desc}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Exemplos Práticos */}
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 text-xs flex flex-col gap-2">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Exemplos no Cotidiano & Indústria:
              </span>
              <div className="flex flex-col gap-1.5">
                {selectedFunction.examples.map((ex, idx) => (
                  <div key={idx} className="text-[11px] border-b border-slate-800/80 pb-1.5 last:border-b-0">
                    <span className="font-bold text-white">{ex.name}</span>{' '}
                    <span className="font-mono text-amber-400">({ex.formula}):</span>{' '}
                    <span className="text-slate-300">{ex.application}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botão Veja mais na Wikipédia */}
            <a
              href={selectedFunction.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>Saiba mais no artigo da Wikipédia</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
