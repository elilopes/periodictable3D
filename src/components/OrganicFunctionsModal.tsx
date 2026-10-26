import React, {useState} from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Text, Billboard} from '@react-three/drei';
import * as THREE from 'three';
import {ORGANIC_OXYGEN_FUNCTIONS} from '../data/organicFunctions';
import {useLanguage} from '../i18n/LanguageContext';
import {exportSectionToPDF} from '../utils/pdfExport';
import {
  X,
  FlaskConical,
  Sparkles,
  Droplets,
  Flame,
  Atom,
  RotateCw,
  FileText,
  ExternalLink,
} from 'lucide-react';

interface OrganicFunctionsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function OrganicMoleculeAtom({
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

function OrganicMoleculeBond({
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
          <meshStandardMaterial color="#94a3b8" roughness={0.3} emissive="#475569" emissiveIntensity={0.2} />
        </mesh>
        <mesh position={[0.08, 0, 0]}>
          <cylinderGeometry args={[0.045, 0.045, length, 16]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.3} emissive="#475569" emissiveIntensity={0.2} />
        </mesh>
      </group>
    );
  }

  return (
    <group position={mid} quaternion={orientation}>
      <mesh>
        <cylinderGeometry args={[0.055, 0.055, length, 16]} />
        <meshStandardMaterial color="#94a3b8" roughness={0.3} emissive="#475569" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}

export function OrganicFunctionsModal({isOpen, onClose}: OrganicFunctionsModalProps) {
  const {language} = useLanguage();
  const [selectedId, setSelectedId] = useState<string>('alcoois');

  const selectedFunction =
    ORGANIC_OXYGEN_FUNCTIONS.find((f) => f.id === selectedId) || ORGANIC_OXYGEN_FUNCTIONS[0];

  if (!isOpen) return null;

  const titleText =
    language === 'pt'
      ? 'Funções Orgânicas Oxigenadas'
      : language === 'ru'
      ? 'Кислородсодержащие органические соединения'
      : 'Oxygenated Organic Functions';

  const subtitleText =
    language === 'pt'
      ? 'Álcoois, Fenóis, Éteres, Aldeídos, Cetonas, Ácidos Carboxílicos, Ésteres, Anidridos, Enóis e Sais Orgânicos'
      : language === 'ru'
      ? 'Спирты, Фенолы, Простые эфиры, Альдегиды, Кетоны, Карбоновые кислоты, Сложные эфиры, Ангидриды, Енолы и Соли'
      : 'Alcohols, Phenols, Ethers, Aldehydes, Ketones, Carboxylic Acids, Esters, Anhydrides, Enols, and Organic Salts';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6">
      <div className="relative w-full max-w-6xl h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/85 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-amber-500/20 to-red-500/20 text-amber-400 rounded-xl border border-amber-500/30">
              <FlaskConical className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {titleText}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  10 Funções Oxigenadas
                </span>
              </h2>
              <p className="text-xs text-slate-400">{subtitleText}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                exportSectionToPDF(
                  `Função Orgânica: ${selectedFunction.name[language] || selectedFunction.name.pt}`,
                  `Fórmula Geral: ${selectedFunction.generalFormula} | Grupo Funcional: ${selectedFunction.functionalGroup}`,
                  [
                    {label: 'Nome da Função', value: selectedFunction.name[language] || selectedFunction.name.pt},
                    {label: 'Grupo Funcional', value: selectedFunction.functionalGroup},
                    {label: 'Fórmula Estrutural', value: selectedFunction.structuralFormula},
                    {label: 'Fórmula Geral', value: selectedFunction.generalFormula},
                    {label: 'Sufixo IUPAC', value: selectedFunction.iupacSuffix},
                    {label: 'Descrição', value: selectedFunction.description[language] || selectedFunction.description.pt},
                    {label: 'Exemplo Representativo', value: `${selectedFunction.representativeExample.name} (${selectedFunction.representativeExample.formula})`},
                    {label: 'Aplicações / Usos', value: selectedFunction.representativeExample.uses},
                    {label: 'Polaridade', value: selectedFunction.properties.polarity},
                    {label: 'Ponto de Ebulição', value: selectedFunction.properties.boilingPointTrend},
                    {label: 'Forças Intermoleculares', value: selectedFunction.properties.intermolecularForces},
                  ]
                )
              }
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
              title="Salvar Função Orgânica em PDF"
            >
              <FileText className="w-4 h-4 text-amber-400" />
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
          {/* Navegação Lateral: 10 Funções */}
          <div className="w-full lg:w-80 bg-slate-950/70 p-5 border-r border-slate-800 flex flex-col gap-3 overflow-y-auto">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              {language === 'pt' ? 'Selecione a Função:' : language === 'ru' ? 'Выберите функцию:' : 'Select Function:'}
            </span>

            <div className="flex flex-col gap-2">
              {ORGANIC_OXYGEN_FUNCTIONS.map((fn) => {
                const isSelected = fn.id === selectedFunction.id;
                const displayName = fn.name[language] || fn.name.pt;

                return (
                  <button
                    key={fn.id}
                    onClick={() => setSelectedId(fn.id)}
                    className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-500/15 border-amber-500/60 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <div>
                      <div className="font-bold flex items-center gap-2">
                        <span>{displayName}</span>
                      </div>
                      <span className="text-[11px] font-mono text-amber-400 block mt-0.5">
                        {fn.structuralFormula}
                      </span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                      {fn.generalFormula}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Dica Didática */}
            <div className="mt-auto p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                {language === 'pt'
                  ? 'As funções orgânicas oxigenadas possuem pelo menos um átomo de Oxigênio (O) ligado à cadeia carbônica, influenciando diretamente a solubilidade e ponto de ebulição.'
                  : language === 'ru'
                  ? 'Кислородсодержащие органические вещества содержат минимум один атом кислорода (O), что определяет их полярность, растворимость и температуру кипения.'
                  : 'Oxygenated organic compounds contain at least one Oxygen atom (O) bonded to carbon, profoundly dictating polarity, solubility, and boiling points.'}
              </span>
            </div>
          </div>

          {/* Área Central: Visualizador 3D da Molécula Modelo */}
          <div className="flex-1 relative bg-radial from-slate-900 via-slate-950 to-black flex flex-col">
            <div className="absolute top-4 left-4 z-10 bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-800 shadow-xl flex items-center gap-2">
              <Atom className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-xs font-bold text-white block">
                  {selectedFunction.representativeExample.name}
                </span>
                <span className="text-[10px] text-amber-300 font-mono">
                  {selectedFunction.representativeExample.structure} ({selectedFunction.representativeExample.formula})
                </span>
              </div>
            </div>

            <Canvas camera={{position: [0, 0, 5], fov: 45}}>
              <ambientLight intensity={1.5} />
              <directionalLight position={[10, 10, 10]} intensity={1.5} />
              <directionalLight position={[-10, -10, -5]} intensity={0.6} />
              <pointLight position={[0, 0, 5]} intensity={1.0} />

              <group>
                {selectedFunction.molecule3D.atoms.map((atom, idx) => (
                  <OrganicMoleculeAtom key={idx} atom={atom} />
                ))}

                {selectedFunction.molecule3D.bonds.map((bond, idx) => (
                  <OrganicMoleculeBond
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
              <RotateCw className="w-3 h-3 text-amber-400 animate-spin" style={{animationDuration: '6s'}} />
              <span>
                {language === 'pt'
                  ? 'Gire com o mouse ou toque para inspecionar a molécula tridimensional'
                  : language === 'ru'
                  ? 'Вращайте мышью или пальцем для исследования 3D-молекулы'
                  : 'Rotate with mouse or touch to inspect the 3D molecule'}
              </span>
            </div>
          </div>

          {/* Painel Lateral Direito: Propriedades, Nomenclatura e Aplicações */}
          <div className="w-full lg:w-96 bg-slate-950/85 p-6 border-l border-slate-800 overflow-y-auto flex flex-col gap-4">
            <div>
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                {language === 'pt' ? 'Química Orgânica' : language === 'ru' ? 'Органическая химия' : 'Organic Chemistry'}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {selectedFunction.name[language] || selectedFunction.name.pt}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {selectedFunction.description[language] || selectedFunction.description.pt}
              </p>
            </div>

            {/* Fórmulas e Grupo Funcional */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Grupo Funcional:</span>
                <span className="font-bold text-amber-300 text-right">{selectedFunction.functionalGroup}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Fórmula Estrutural:</span>
                <span className="font-mono font-bold text-sky-300">{selectedFunction.structuralFormula}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">Fórmula Geral:</span>
                <span className="font-mono text-emerald-300">{selectedFunction.generalFormula}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Sufixo IUPAC:</span>
                <span className="font-bold text-fuchsia-300">{selectedFunction.iupacSuffix}</span>
              </div>
            </div>

            {/* Propriedades Físico-Químicas */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-2 text-xs">
              <span className="font-bold text-slate-200 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-400" />
                Propriedades Físicas:
              </span>
              <div className="text-[11px] text-slate-300">
                <strong>Polaridade:</strong> {selectedFunction.properties.polarity}
              </div>
              <div className="text-[11px] text-slate-300">
                <strong>Ponto de Ebulição:</strong> {selectedFunction.properties.boilingPointTrend}
              </div>
              <div className="text-[11px] text-slate-300">
                <strong>Forças Intermoleculares:</strong> {selectedFunction.properties.intermolecularForces}
              </div>
            </div>

            {/* Exemplo Representativo e Aplicações no Cotidiano */}
            <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs flex flex-col gap-2">
              <span className="font-bold text-amber-300 flex items-center gap-1.5">
                <Flame className="w-4 h-4" />
                Exemplo & Uso no Cotidiano:
              </span>
              <div className="font-bold text-white text-sm">
                {selectedFunction.representativeExample.name} ({selectedFunction.representativeExample.formula})
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {selectedFunction.representativeExample.uses}
              </p>
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
