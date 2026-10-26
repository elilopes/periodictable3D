import React, {useState, useMemo} from 'react';
import {ELEMENTS_118, ElementData, CATEGORY_COLORS} from '../data/elements';
import {Canvas} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';
import {BohrAtom, BohrLegend} from './BohrAtom';
import {useLanguage} from '../i18n/LanguageContext';
import {X, ArrowLeftRight, Search, Scale, RotateCw} from 'lucide-react';

interface ElementComparisonModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialElementA?: ElementData | null;
  initialElementB?: ElementData | null;
}

export function ElementComparisonModal({
  isOpen,
  onClose,
  initialElementA,
  initialElementB,
}: ElementComparisonModalProps) {
  const {t, getElementName, getCategoryLabel, getPhaseLabel, getOriginLabel} = useLanguage();
  const [numA, setNumA] = useState<number>(initialElementA?.number || 6); // Carbono
  const [numB, setNumB] = useState<number>(initialElementB?.number || 14); // Silício

  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');

  const elA = useMemo(() => ELEMENTS_118.find((e) => e.number === numA) || ELEMENTS_118[0], [numA]);
  const elB = useMemo(() => ELEMENTS_118.find((e) => e.number === numB) || ELEMENTS_118[1], [numB]);

  const filteredA = useMemo(() => {
    const q = searchA.toLowerCase().trim();
    if (!q) return ELEMENTS_118.slice(0, 8);
    return ELEMENTS_118.filter((e) => {
      const locName = getElementName(e.number).toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        locName.includes(q) ||
        e.symbol.toLowerCase().includes(q) ||
        e.number.toString() === q
      );
    }).slice(0, 10);
  }, [searchA, getElementName]);

  const filteredB = useMemo(() => {
    const q = searchB.toLowerCase().trim();
    if (!q) return ELEMENTS_118.slice(0, 8);
    return ELEMENTS_118.filter((e) => {
      const locName = getElementName(e.number).toLowerCase();
      return (
        e.name.toLowerCase().includes(q) ||
        locName.includes(q) ||
        e.symbol.toLowerCase().includes(q) ||
        e.number.toString() === q
      );
    }).slice(0, 10);
  }, [searchB, getElementName]);

  if (!isOpen) return null;

  const nameA = getElementName(elA.number) || elA.name;
  const nameB = getElementName(elB.number) || elB.name;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-3 sm:p-6">
      <div className="relative w-full max-w-6xl max-h-[92vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 text-indigo-400 rounded-xl border border-indigo-500/20">
              <Scale className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {t.compare.modalTitle}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  {t.compare.badge}
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                {t.compare.subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-6">
          {/* Seletor Duplo com Busca */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Seletor Elemento A */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t.compare.elementA}
              </span>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder={t.compare.searchAPlaceholder}
                  value={searchA}
                  onChange={(e) => setSearchA(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {filteredA.map((e) => (
                  <button
                    key={`a-${e.number}`}
                    onClick={() => setNumA(e.number)}
                    className={`px-2.5 py-1 rounded text-xs font-medium border transition ${
                      e.number === numA
                        ? 'bg-sky-500 text-white border-sky-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {e.number}. {e.symbol} ({getElementName(e.number) || e.name})
                  </button>
                ))}
              </div>
            </div>

            {/* Seletor Elemento B */}
            <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                {t.compare.elementB}
              </span>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
                <input
                  type="text"
                  placeholder={t.compare.searchBPlaceholder}
                  value={searchB}
                  onChange={(e) => setSearchB(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {filteredB.map((e) => (
                  <button
                    key={`b-${e.number}`}
                    onClick={() => setNumB(e.number)}
                    className={`px-2.5 py-1 rounded text-xs font-medium border transition ${
                      e.number === numB
                        ? 'bg-indigo-500 text-white border-indigo-400'
                        : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                    }`}
                  >
                    {e.number}. {e.symbol} ({getElementName(e.number) || e.name})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Modelos de Rutherford-Bohr 3D Lado a Lado com Rotação por Mouse/Dedo */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Átomo A */}
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{backgroundColor: CATEGORY_COLORS[elA.category]?.hex}}
                  />
                  <h3 className="text-xl font-bold text-white">
                    {nameA} <span className="text-sky-400 font-mono">({elA.symbol})</span>
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Z = {elA.number}
                </span>
              </div>
              <div
                className="w-full h-56 bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800/80 relative touch-none"
                style={{touchAction: 'none'}}
              >
                <Canvas camera={{position: [0, 0, 7.5], fov: 45}}>
                  <ambientLight intensity={1.5} />
                  <pointLight position={[0, 0, 6]} intensity={1.0} />
                  <BohrAtom element={elA} speed={0.8} />
                  <OrbitControls enableDamping dampingFactor={0.06} makeDefault />
                </Canvas>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-slate-950/70 px-2 py-0.5 rounded text-[10px] text-slate-400 pointer-events-none">
                  <RotateCw className="w-2.5 h-2.5 text-sky-400" />
                  <span>{t.models.rotateInstruction}</span>
                </div>
              </div>
              <div className="w-full mt-3">
                <BohrLegend element={elA} />
              </div>
            </div>

            {/* Átomo B */}
            <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-4 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className="w-4 h-4 rounded-full"
                    style={{backgroundColor: CATEGORY_COLORS[elB.category]?.hex}}
                  />
                  <h3 className="text-xl font-bold text-white">
                    {nameB} <span className="text-indigo-400 font-mono">({elB.symbol})</span>
                  </h3>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                  Z = {elB.number}
                </span>
              </div>
              <div
                className="w-full h-56 bg-slate-900/60 rounded-xl overflow-hidden border border-slate-800/80 relative touch-none"
                style={{touchAction: 'none'}}
              >
                <Canvas camera={{position: [0, 0, 7.5], fov: 45}}>
                  <ambientLight intensity={1.5} />
                  <pointLight position={[0, 0, 6]} intensity={1.0} />
                  <BohrAtom element={elB} speed={0.8} />
                  <OrbitControls enableDamping dampingFactor={0.06} makeDefault />
                </Canvas>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-slate-950/70 px-2 py-0.5 rounded text-[10px] text-slate-400 pointer-events-none">
                  <RotateCw className="w-2.5 h-2.5 text-indigo-400" />
                  <span>{t.models.rotateInstruction}</span>
                </div>
              </div>
              <div className="w-full mt-3">
                <BohrLegend element={elB} />
              </div>
            </div>
          </div>

          {/* Tabela Comparativa Detalhada */}
          <div className="bg-slate-950/90 rounded-2xl border border-slate-800 overflow-hidden">
            <div className="p-4 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
              <span className="font-bold text-slate-200 text-sm">
                {t.compare.tableTitle}
              </span>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-sky-400 font-bold">{elA.symbol} ({nameA})</span>
                <ArrowLeftRight className="w-3.5 h-3.5 text-slate-500" />
                <span className="text-indigo-400 font-bold">{elB.symbol} ({nameB})</span>
              </div>
            </div>

            <div className="divide-y divide-slate-800 text-xs">
              {/* Configuração Eletrônica */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="font-semibold text-sky-400 font-mono text-center sm:text-left">
                  {elA.electronicConfiguration}
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.electronConfig}</span>
                <span className="font-semibold text-indigo-400 font-mono text-center sm:text-right">
                  {elB.electronicConfiguration}
                </span>
              </div>

              {/* Massa Atômica */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="font-bold text-white text-center sm:text-left">
                  {elA.atomicMass} u
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.atomicMass}</span>
                <span className="font-bold text-white text-center sm:text-right">
                  {elB.atomicMass} u
                </span>
              </div>

              {/* Eletronegatividade */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="font-bold text-white text-center sm:text-left">
                  {elA.electronegativity ?? t.sidebar.notApplicable}
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.electronegativity}</span>
                <span className="font-bold text-white text-center sm:text-right">
                  {elB.electronegativity ?? t.sidebar.notApplicable}
                </span>
              </div>

              {/* Categoria */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="font-medium text-emerald-400 text-center sm:text-left">
                  {getCategoryLabel(elA.category)}
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.category}</span>
                <span className="font-medium text-emerald-400 text-center sm:text-right">
                  {getCategoryLabel(elB.category)}
                </span>
              </div>

              {/* Posição */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="font-medium text-white text-center sm:text-left">
                  {elA.group} • {elA.period}
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.position}</span>
                <span className="font-medium text-white text-center sm:text-right">
                  {elB.group} • {elB.period}
                </span>
              </div>

              {/* Estado Físico */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="font-medium text-cyan-300 text-center sm:text-left">
                  {getPhaseLabel(elA.phase)}
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.phase}</span>
                <span className="font-medium text-cyan-300 text-center sm:text-right">
                  {getPhaseLabel(elB.phase)}
                </span>
              </div>

              {/* Ponto de Fusão */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="font-medium text-white text-center sm:text-left">
                  {elA.meltingPoint !== undefined ? `${elA.meltingPoint} °C` : t.sidebar.unknown}
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.meltingPoint}</span>
                <span className="font-medium text-white text-center sm:text-right">
                  {elB.meltingPoint !== undefined ? `${elB.meltingPoint} °C` : t.sidebar.unknown}
                </span>
              </div>

              {/* Ponto de Ebulição */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="font-medium text-white text-center sm:text-left">
                  {elA.boilingPoint !== undefined ? `${elA.boilingPoint} °C` : t.sidebar.unknown}
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.boilingPoint}</span>
                <span className="font-medium text-white text-center sm:text-right">
                  {elB.boilingPoint !== undefined ? `${elB.boilingPoint} °C` : t.sidebar.unknown}
                </span>
              </div>

              {/* Origem */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="font-medium text-center sm:text-left">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      elA.origin === 'natural'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                    }`}
                  >
                    {getOriginLabel(elA.origin)}
                  </span>
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.origin}</span>
                <span className="font-medium text-center sm:text-right">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      elB.origin === 'natural'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                    }`}
                  >
                    {getOriginLabel(elB.origin)}
                  </span>
                </span>
              </div>

              {/* Descoberta */}
              <div className="grid grid-cols-3 p-3 items-center hover:bg-slate-900/40">
                <span className="text-slate-300 text-center sm:text-left">
                  {elA.discoverer} ({elA.discoveryYear})
                </span>
                <span className="text-center text-slate-400 font-medium">{t.compare.discovery}</span>
                <span className="text-slate-300 text-center sm:text-right">
                  {elB.discoverer} ({elB.discoveryYear})
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
