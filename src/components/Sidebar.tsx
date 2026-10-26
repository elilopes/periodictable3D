import React, {useState} from 'react';
import {ElementData, CATEGORY_COLORS} from '../data/elements';
import {AtomicModelViewer} from './AtomicModelViewer';
import {useLanguage} from '../i18n/LanguageContext';
import {exportElementWith2DModelsToPDF} from '../utils/pdfExport';
import {
  X,
  ExternalLink,
  History,
  Sparkles,
  FlaskConical,
  Scale,
  Atom,
  FileText,
} from 'lucide-react';

interface SidebarProps {
  element: ElementData | null;
  onClose: () => void;
  onOpenComparison: (element: ElementData) => void;
  onOpenBonds: () => void;
}

type TabType = 'bohr' | 'propriedades' | 'historia' | 'aplicacoes';

export function Sidebar({
  element,
  onClose,
  onOpenComparison,
  onOpenBonds,
}: SidebarProps) {
  const {t, getElementName, getWikiUrl, getCategoryLabel, getPhaseLabel, getOriginLabel} = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('bohr');

  if (!element) {
    return (
      <div className="w-80 md:w-96 h-full bg-slate-950/90 backdrop-blur-xl border-l border-slate-800 p-6 flex flex-col justify-center items-center text-center text-slate-400 select-none">
        <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 mb-4 text-sky-400">
          <Atom className="w-10 h-10 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-white mb-1">{t.app.emptySelectionTitle}</h3>
        <p className="text-xs text-slate-400 leading-relaxed max-w-xs">
          {t.app.emptySelectionDesc}
        </p>
        <button
          onClick={onOpenBonds}
          className="mt-6 px-4 py-2.5 rounded-xl bg-sky-500/10 hover:bg-sky-500/20 text-sky-400 border border-sky-500/30 text-xs font-semibold flex items-center gap-2 transition"
        >
          <Sparkles className="w-4 h-4" />
          {t.app.btnExploreBonds}
        </button>
      </div>
    );
  }

  const catStyle = CATEGORY_COLORS[element.category] || CATEGORY_COLORS['metal-transicao'];
  const localizedName = getElementName(element.number) || element.name;
  const localizedWikiUrl = getWikiUrl(element);

  return (
    <div className="w-full sm:w-96 md:w-[420px] h-full bg-slate-950/95 backdrop-blur-2xl border-l border-slate-800 flex flex-col overflow-hidden shadow-2xl z-20">
      {/* Top Header do Elemento */}
      <div className="p-5 border-b border-slate-800 bg-slate-900/60 flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex flex-col items-center justify-center font-bold shadow-lg border"
            style={{
              backgroundColor: `${catStyle.hex}20`,
              borderColor: `${catStyle.hex}80`,
              color: '#ffffff',
            }}
          >
            <span className="text-[10px] text-slate-300 font-mono leading-none">
              {element.number}
            </span>
            <span className="text-2xl font-black">{element.symbol}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">{localizedName}</h2>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  element.origin === 'natural'
                    ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                    : 'bg-pink-500/20 text-pink-400 border-pink-500/30'
                }`}
              >
                {getOriginLabel(element.origin)}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span
                className="text-xs font-semibold px-2 py-0.5 rounded border"
                style={{
                  backgroundColor: `${catStyle.hex}15`,
                  borderColor: `${catStyle.hex}40`,
                  color: catStyle.hex,
                }}
              >
                {getCategoryLabel(element.category)}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                M: {element.atomicMass} u
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          title="Fechar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Abas de Navegação */}
      <div className="grid grid-cols-4 p-2 bg-slate-900/90 border-b border-slate-800 gap-1 text-xs">
        <button
          onClick={() => setActiveTab('bohr')}
          className={`py-2 px-1 rounded-lg font-medium flex flex-col items-center gap-1 transition ${
            activeTab === 'bohr'
              ? 'bg-sky-500 text-white font-bold shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Atom className="w-4 h-4" />
          <span>{t.sidebar.tabBohr}</span>
        </button>
        <button
          onClick={() => setActiveTab('propriedades')}
          className={`py-2 px-1 rounded-lg font-medium flex flex-col items-center gap-1 transition ${
            activeTab === 'propriedades'
              ? 'bg-sky-500 text-white font-bold shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <FlaskConical className="w-4 h-4" />
          <span>{t.sidebar.tabProps}</span>
        </button>
        <button
          onClick={() => setActiveTab('historia')}
          className={`py-2 px-1 rounded-lg font-medium flex flex-col items-center gap-1 transition ${
            activeTab === 'historia'
              ? 'bg-sky-500 text-white font-bold shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <History className="w-4 h-4" />
          <span>{t.sidebar.tabHistory}</span>
        </button>
        <button
          onClick={() => setActiveTab('aplicacoes')}
          className={`py-2 px-1 rounded-lg font-medium flex flex-col items-center gap-1 transition ${
            activeTab === 'aplicacoes'
              ? 'bg-sky-500 text-white font-bold shadow'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>{t.sidebar.tabApps}</span>
        </button>
      </div>

      {/* Conteúdo das Abas */}
      <div className="flex-1 p-5 overflow-y-auto">
        {/* ABA 1: MODELO RUTHERFORD-BOHR 3D */}
        {activeTab === 'bohr' && <AtomicModelViewer element={element} />}

        {/* ABA 2: PROPRIEDADES FÍSICO-QUÍMICAS */}
        {activeTab === 'propriedades' && (
          <div className="flex flex-col gap-3 text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col gap-2.5">
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.sidebar.atomicMass}</span>
                <span className="font-bold text-white font-mono">{element.atomicMass} u</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.sidebar.atomicNumber}</span>
                <span className="font-bold text-sky-400 font-mono">Z = {element.number}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.sidebar.groupPeriod}</span>
                <span className="font-bold text-slate-200">
                  Grupo {element.group} • Período {element.period}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.sidebar.phaseAt20}</span>
                <span className="font-bold text-emerald-400">{getPhaseLabel(element.phase)}</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.sidebar.meltingPoint}</span>
                <span className="font-bold text-slate-200 font-mono">
                  {element.meltingPoint ? `${element.meltingPoint} K` : t.sidebar.unknown}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.sidebar.boilingPoint}</span>
                <span className="font-bold text-slate-200 font-mono">
                  {element.boilingPoint ? `${element.boilingPoint} K` : t.sidebar.unknown}
                </span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.sidebar.electronegativity}</span>
                <span className="font-bold text-amber-300 font-mono">
                  {element.electronegativity ?? t.sidebar.notApplicable}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">{t.sidebar.density}</span>
                <span className="font-bold text-slate-200 font-mono">
                  {element.density ? `${element.density} g/cm³` : t.sidebar.unknown}
                </span>
              </div>
            </div>

            <div className="p-3.5 bg-sky-950/30 rounded-xl border border-sky-800/40 text-xs">
              <span className="font-bold text-sky-400 block mb-1">{t.sidebar.electronConfig}</span>
              <span className="font-mono text-white text-[11px] bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800 block">
                {element.electronicConfiguration}
              </span>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
              <span className="font-bold text-white block mb-1 text-xs">
                {t.sidebar.physChemFeatures}
              </span>
              {element.description}
            </div>
          </div>
        )}

        {/* ABA 3: HISTÓRIA E DESCOBERTA */}
        {activeTab === 'historia' && (
          <div className="flex flex-col gap-4 text-xs">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 flex flex-col gap-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.sidebar.discoverers}</span>
                <span className="font-bold text-white text-right">{element.discoverer}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-slate-400">{t.sidebar.discoveryYear}</span>
                <span className="font-bold text-sky-400">{element.discoveryYear}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">{t.sidebar.originClassification}</span>
                <span className="font-bold text-emerald-400">{getOriginLabel(element.origin)}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-slate-300 leading-relaxed">
              <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                <History className="w-4 h-4 text-indigo-400" />
                {t.sidebar.historicalContext}
              </h4>
              <p>{element.description}</p>
            </div>

            {/* Botão Saiba mais na Wikipédia com URL no idioma selecionado */}
            <a
              href={localizedWikiUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <span>{t.sidebar.wikiBtn}</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* ABA 4: APLICAÇÕES E ONDE É ENCONTRADO */}
        {activeTab === 'aplicacoes' && (
          <div className="flex flex-col gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-300 font-semibold mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>{t.sidebar.appsTitle}</span>
            </div>

            <div className="flex flex-col gap-2.5">
              {element.importantUses.map((use, idx) => (
                <div
                  key={idx}
                  className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 flex items-start gap-3 hover:border-slate-700 transition"
                >
                  <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center shrink-0 font-bold text-xs border border-sky-500/20">
                    {idx + 1}
                  </div>
                  <span className="text-slate-200 leading-relaxed">{use}</span>
                </div>
              ))}
            </div>

            {/* Botão de explorar ligações */}
            <button
              onClick={onOpenBonds}
              className="mt-3 w-full py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sky-300 text-xs font-semibold flex items-center justify-center gap-2 transition"
            >
              <FlaskConical className="w-4 h-4" />
              {t.sidebar.viewBondsForAtom}
            </button>
          </div>
        )}
      </div>

      {/* Footer com Ações Globais: Comparador & Salvar PDF */}
      <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center gap-2">
        <button
          onClick={() => onOpenComparison(element)}
          className="flex-1 py-2.5 px-3 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 border border-indigo-500/40 font-bold text-xs flex items-center justify-center gap-2 transition"
        >
          <Scale className="w-4 h-4" />
          <span>{t.sidebar.compareWithAnother}</span>
        </button>

        <button
          onClick={() =>
            exportElementWith2DModelsToPDF(
              element,
              [
                {label: 'Número Atômico (Z)', value: element.number.toString()},
                {label: 'Símbolo', value: element.symbol},
                {label: 'Nome', value: localizedName},
                {label: 'Massa Atômica', value: `${element.atomicMass} u`},
                {label: 'Categoria', value: getCategoryLabel(element.category)},
                {label: 'Configuração Eletrônica', value: element.electronicConfiguration},
                {label: 'Camadas de Energia (K, L, M...)', value: element.electronsPerShell.join(', ')},
                {label: 'Estado Físico a 20°C', value: getPhaseLabel(element.phase)},
                {label: 'Ponto de Fusão', value: element.meltingPoint ? `${element.meltingPoint} K` : 'Desconhecido'},
                {label: 'Ponto de Ebulição', value: element.boilingPoint ? `${element.boilingPoint} K` : 'Desconhecido'},
                {label: 'Eletronegatividade (Pauling)', value: element.electronegativity?.toString() || 'N/A'},
                {label: 'Descoberta', value: `${element.discoverer} (${element.discoveryYear})`},
                {label: 'Origem', value: getOriginLabel(element.origin)},
                {label: 'Aplicações Principais', value: element.importantUses.join('; ')},
              ]
            )
          }
          className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition"
          title="Salvar Ficha do Elemento em PDF com Modelos Atômicos 2D"
        >
          <FileText className="w-4 h-4 text-sky-400" />
          <span>PDF</span>
        </button>
      </div>
    </div>
  );
}
