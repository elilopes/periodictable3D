import React, {useState, useRef, useMemo} from 'react';
import {Canvas, useFrame} from '@react-three/fiber';
import {OrbitControls, Text, Billboard} from '@react-three/drei';
import * as THREE from 'three';
import {MOLECULES_LIST} from '../data/molecules';
import {useLanguage} from '../i18n/LanguageContext';
import {exportSectionToPDF} from '../utils/pdfExport';
import {X, Play, RotateCcw, Atom, Sparkles, Info, FileText, ExternalLink} from 'lucide-react';

interface ChemicalBondVisualizerProps {
  isOpen: boolean;
  onClose: () => void;
}

function MoleculeAtom3D({
  atom,
  targetPos,
  separatedPos,
  progress,
}: {
  atom: any;
  targetPos: [number, number, number];
  separatedPos: [number, number, number];
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    const currentX = THREE.MathUtils.lerp(separatedPos[0], targetPos[0], progress);
    const currentY = THREE.MathUtils.lerp(separatedPos[1], targetPos[1], progress);
    const currentZ = THREE.MathUtils.lerp(separatedPos[2], targetPos[2], progress);
    groupRef.current.position.set(currentX, currentY, currentZ);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[atom.radius, 32, 32]} />
        <meshStandardMaterial
          color={atom.color}
          roughness={0.25}
          metalness={0.4}
          emissive={atom.color}
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Rótulo 3D WebGL (Billboard) em cima da esfera */}
      <Billboard position={[0, atom.radius + 0.4, 0]}>
        <Text
          fontSize={0.24}
          color="#ffffff"
          anchorX="center"
          anchorY="bottom"
          outlineWidth={0.02}
          outlineColor="#020617"
        >
          {atom.elementSymbol} {atom.charge || ''}
        </Text>
        <Text
          position={[0, -0.22, 0]}
          fontSize={0.11}
          color="#94a3b8"
          anchorX="center"
          anchorY="top"
        >
          {atom.elementName}
        </Text>
      </Billboard>
    </group>
  );
}

function BondCylinder3D({
  atomA,
  atomB,
  order,
  type,
  progress,
}: {
  atomA: any;
  atomB: any;
  order: 1 | 2 | 3;
  type: string;
  progress: number;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (!groupRef.current) return;
    const posA = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...atomA.separatedPos),
      new THREE.Vector3(...atomA.targetPos),
      progress
    );
    const posB = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...atomB.separatedPos),
      new THREE.Vector3(...atomB.targetPos),
      progress
    );

    const mid = new THREE.Vector3().addVectors(posA, posB).multiplyScalar(0.5);
    groupRef.current.position.copy(mid);

    const dir = new THREE.Vector3().subVectors(posB, posA);
    const length = dir.length();
    groupRef.current.scale.set(1, Math.max(0.001, length), 1);
    groupRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  });

  const isIonic = type === 'ionica';

  return (
    <group ref={groupRef}>
      {order === 1 ? (
        <mesh>
          <cylinderGeometry args={[isIonic ? 0.05 : 0.08, isIonic ? 0.05 : 0.08, 1, 16]} />
          <meshStandardMaterial
            color={isIonic ? '#eab308' : '#38bdf8'}
            roughness={0.3}
            transparent={isIonic}
            opacity={progress * 0.9}
            emissive={isIonic ? '#ca8a04' : '#0284c7'}
            emissiveIntensity={0.4}
          />
        </mesh>
      ) : (
        <group>
          <mesh position={[-0.12, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 1, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              opacity={progress}
              transparent
              emissive="#0284c7"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={[0.12, 0, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 1, 16]} />
            <meshStandardMaterial
              color="#38bdf8"
              opacity={progress}
              transparent
              emissive="#0284c7"
              emissiveIntensity={0.5}
            />
          </mesh>
        </group>
      )}
    </group>
  );
}

function SharedElectronsAnimation({
  atomA,
  atomB,
  progress,
  isIonic,
}: {
  atomA: any;
  atomB: any;
  progress: number;
  isIonic: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime() * 3.5;
    const posA = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...atomA.separatedPos),
      new THREE.Vector3(...atomA.targetPos),
      progress
    );
    const posB = new THREE.Vector3().lerpVectors(
      new THREE.Vector3(...atomB.separatedPos),
      new THREE.Vector3(...atomB.targetPos),
      progress
    );

    if (isIonic) {
      const t = Math.min(1, Math.max(0, (progress - 0.2) / 0.8));
      const pos = new THREE.Vector3().lerpVectors(posA, posB, t);
      meshRef.current.position.copy(pos);
    } else {
      const t = (Math.sin(time) + 1) * 0.5;
      const pos = new THREE.Vector3().lerpVectors(posA, posB, t);
      meshRef.current.position.copy(pos);
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.075, 16, 16]} />
      <meshBasicMaterial color="#facc15" />
    </mesh>
  );
}

export function ChemicalBondVisualizer({isOpen, onClose}: ChemicalBondVisualizerProps) {
  const {t} = useLanguage();
  const [selectedMoleculeId, setSelectedMoleculeId] = useState<string>('h2o');
  const [isBonded, setIsBonded] = useState<boolean>(true);
  const [progress, setProgress] = useState<number>(1);

  const baseMolecule = useMemo(() => {
    return MOLECULES_LIST.find((m) => m.id === selectedMoleculeId) || MOLECULES_LIST[0];
  }, [selectedMoleculeId]);

  const activeMolecule = useMemo(() => {
    const i18nData = t.bonds.molecules[baseMolecule.id];
    return {
      ...baseMolecule,
      name: i18nData?.name || baseMolecule.name,
      bondTypeLabel: i18nData?.bondTypeLabel || baseMolecule.bondTypeLabel,
      geometry: i18nData?.geometry || baseMolecule.geometry,
      description: i18nData?.description || baseMolecule.description,
      bondExplanation: i18nData?.explanation || baseMolecule.bondExplanation,
    };
  }, [baseMolecule, t]);

  const preparedAtoms = useMemo(() => {
    return activeMolecule.atoms.map((atom) => {
      const sepDist = 2.4;
      const targetVec = new THREE.Vector3(...atom.position);
      let sepVec: [number, number, number];

      if (targetVec.length() > 0.1) {
        const dir = targetVec.clone().normalize();
        sepVec = [dir.x * (targetVec.length() + sepDist), dir.y * (targetVec.length() + sepDist), dir.z * (targetVec.length() + sepDist)];
      } else {
        sepVec = [0, 0, 0];
      }

      return {
        ...atom,
        targetPos: atom.position,
        separatedPos: sepVec,
      };
    });
  }, [activeMolecule]);

  React.useEffect(() => {
    let animId: number;
    const target = isBonded ? 1 : 0;
    const step = () => {
      setProgress((prev) => {
        const diff = target - prev;
        if (Math.abs(diff) < 0.02) return target;
        return prev + diff * 0.12;
      });
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isBonded]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6">
      <div className="relative w-full max-w-6xl h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header Superior */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-sky-500/10 text-sky-400 rounded-xl border border-sky-500/20">
              <Atom className="w-6 h-6 animate-spin" style={{animationDuration: '10s'}} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {t.bonds.modalTitle}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {t.bonds.badgeOctet}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {t.bonds.subtitle}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                exportSectionToPDF(
                  `Molécula: ${activeMolecule.name} (${activeMolecule.formula})`,
                  `Simulador de Ligações Químicas 3D - ${activeMolecule.bondTypeLabel}`,
                  [
                    {label: 'Nome da Molécula', value: activeMolecule.name},
                    {label: 'Fórmula Molecular', value: activeMolecule.formula},
                    {label: 'Tipo de Ligação', value: activeMolecule.bondTypeLabel},
                    {label: 'Geometria Espacial', value: activeMolecule.geometry},
                    {label: 'Descrição', value: activeMolecule.description},
                    {label: 'Explicação da Estabilização', value: activeMolecule.bondExplanation},
                  ]
                )
              }
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-1.5 transition"
              title="Salvar Detalhes da Ligação em PDF"
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

        {/* Corpo: Seletor + 3D View + Painel Didático */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Coluna Esquerda: Seletor de Moléculas e Controles */}
          <div className="w-full lg:w-80 bg-slate-950/60 p-5 border-r border-slate-800 flex flex-col gap-4 overflow-y-auto">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                {t.bonds.selectMolecule}
              </span>
              <div className="flex flex-col gap-2">
                {MOLECULES_LIST.map((mol) => {
                  const isSel = mol.id === activeMolecule.id;
                  const localizedMol = t.bonds.molecules[mol.id];
                  const molName = localizedMol?.name || mol.name;
                  const molType = localizedMol?.bondTypeLabel || mol.bondTypeLabel;

                  return (
                    <button
                      key={mol.id}
                      onClick={() => {
                        setSelectedMoleculeId(mol.id);
                        setIsBonded(true);
                      }}
                      className={`text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                        isSel
                          ? 'bg-sky-500/15 border-sky-500/60 text-white shadow-md'
                          : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <div>
                        <div className="font-bold flex items-center gap-2">
                          <span>{molName}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-slate-800 font-mono text-sky-400 border border-slate-700">
                            {mol.formula}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-400 block mt-0.5">
                          {molType}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Controle de Formação da Ligação */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col gap-3">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {t.bonds.atomInteraction}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsBonded(false)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                    !isBonded
                      ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <RotateCcw className="w-3.5 h-3.5 inline mr-1" />
                  {t.bonds.btnSeparated}
                </button>
                <button
                  onClick={() => setIsBonded(true)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition ${
                    isBonded
                      ? 'bg-emerald-500/20 border-emerald-500/60 text-emerald-300'
                      : 'bg-slate-800 text-slate-400 border-slate-700 hover:text-white'
                  }`}
                >
                  <Play className="w-3.5 h-3.5 inline mr-1" />
                  {t.bonds.btnFormBond}
                </button>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-sky-400 h-full transition-all duration-300"
                  style={{width: `${progress * 100}%`}}
                />
              </div>
            </div>

            {/* Legenda dos Átomos */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 block mb-2">
                {t.bonds.atomsInMolecule}
              </span>
              <div className="flex flex-wrap gap-2">
                {activeMolecule.atoms.map((at, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs"
                  >
                    <span
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{backgroundColor: at.color}}
                    />
                    <span className="font-semibold text-slate-200">{at.elementSymbol}</span>
                    <span className="text-[10px] text-slate-400">({at.valenceElectrons} {t.bonds.valenceElectrons})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Área Central: Visualizador 3D com Three.js */}
          <div className="flex-1 relative bg-radial from-slate-900 via-slate-950 to-black">
            <Canvas camera={{position: [0, 0, 5.5], fov: 45}}>
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={1.5} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <pointLight position={[0, 0, 5]} intensity={1.0} />

              <group>
                {preparedAtoms.map((atom, idx) => (
                  <MoleculeAtom3D
                    key={idx}
                    atom={atom}
                    targetPos={atom.targetPos as [number, number, number]}
                    separatedPos={atom.separatedPos as [number, number, number]}
                    progress={progress}
                  />
                ))}

                {activeMolecule.bonds.map((bond, idx) => (
                  <BondCylinder3D
                    key={idx}
                    atomA={preparedAtoms[bond.fromIndex]}
                    atomB={preparedAtoms[bond.toIndex]}
                    order={bond.order}
                    type={bond.type}
                    progress={progress}
                  />
                ))}

                {progress > 0.3 &&
                  activeMolecule.bonds.map((bond, idx) => (
                    <SharedElectronsAnimation
                      key={`el-${idx}`}
                      atomA={preparedAtoms[bond.fromIndex]}
                      atomB={preparedAtoms[bond.toIndex]}
                      progress={progress}
                      isIonic={bond.type === 'ionica'}
                    />
                  ))}
              </group>

              <OrbitControls enableDamping dampingFactor={0.05} autoRotate autoRotateSpeed={1.0} />
            </Canvas>

            <div className="absolute bottom-3 left-4 text-[11px] text-slate-400 bg-slate-900/80 px-2.5 py-1 rounded-lg border border-slate-800">
              {t.bonds.orbitControlTip}
            </div>
          </div>

          {/* Coluna Direita: Explicação Química Didática */}
          <div className="w-full lg:w-96 bg-slate-950/80 p-6 border-l border-slate-800 overflow-y-auto flex flex-col gap-4">
            <div>
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                {t.bonds.molecularChemistry}
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                {activeMolecule.name} ({activeMolecule.formula})
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {activeMolecule.description}
              </p>
            </div>

            {/* Informações da Ligação */}
            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800 flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.bonds.bondType}</span>
                <span className="font-bold text-sky-300">{activeMolecule.bondTypeLabel}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.bonds.spatialGeometry}</span>
                <span className="font-bold text-slate-200">{activeMolecule.geometry}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{t.bonds.mechanism}</span>
                <span className="font-bold text-emerald-400">
                  {activeMolecule.bondType === 'ionica'
                    ? t.bonds.transferMechanism
                    : t.bonds.sharingMechanism}
                </span>
              </div>
            </div>

            {/* Explicação da Ligação e Regra do Octeto */}
            <div className="p-4 bg-sky-950/30 rounded-xl border border-sky-800/40 text-xs">
              <div className="flex items-center gap-2 text-sky-400 font-semibold mb-2">
                <Info className="w-4 h-4" />
                {t.bonds.howStabilizationWorks}
              </div>
              <p className="text-slate-300 leading-relaxed text-[12px]">
                {activeMolecule.bondExplanation}
              </p>
            </div>

            <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-[11px] text-amber-300 flex items-start gap-2">
              <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                <strong>{t.bonds.octetRuleTitle}</strong> {t.bonds.octetRuleText}
              </span>
            </div>

            {/* Botão Veja mais na Wikipédia */}
            <a
              href={activeMolecule.wikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>{t.sidebar.wikiBtn}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
