import React from 'react';
import {CATEGORY_COLORS, ElementCategory, PhysicalState, ElementOrigin} from '../data/elements';
import {ViewMode} from './PeriodicTableScene';
import {LanguageSelector} from './LanguageSelector';
import {AnimatedBondsIcon} from './AnimatedBondsIcon';
import {useLanguage} from '../i18n/LanguageContext';
import {
  Search,
  Filter,
  Layers,
  Scale,
  Sparkles,
  RotateCw,
  Box,
  Globe,
  FlaskConical,
  Beaker,
  Brain,
  X
} from 'lucide-react';

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedPhase: string;
  setSelectedPhase: (phase: string) => void;
  selectedOrigin: string;
  setSelectedOrigin: (orig: string) => void;
  viewMode: ViewMode;
  setViewMode: (vm: ViewMode) => void;
  onOpenComparison: () => void;
  onOpenBonds: () => void;
  onOpenOrganic: () => void;
  onOpenInorganic: () => void;
  onOpenQuiz: () => void;
  matchedCount: number;
}

export function FilterBar({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedPhase,
  setSelectedPhase,
  selectedOrigin,
  setSelectedOrigin,
  viewMode,
  setViewMode,
  onOpenComparison,
  onOpenBonds,
  onOpenOrganic,
  onOpenInorganic,
  onOpenQuiz,
  matchedCount,
}: FilterBarProps) {
  const {t, getCategoryLabel} = useLanguage();

  const isFilterActive =
    searchQuery.trim().length > 0 ||
    selectedCategory !== 'todas' ||
    selectedPhase !== 'todas' ||
    selectedOrigin !== 'todas';

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('todas');
    setSelectedPhase('todas');
    setSelectedOrigin('todas');
  };

  return (
    <header className="w-full bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-4 py-3 z-30 flex flex-col gap-3 shadow-md">
      {/* Linha Superior: Logo com Ícone Animado 3D + Idiomas + Ações Principais */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* Título com Ícone Animado 3D de Ligações Químicas */}
        <div className="flex items-center gap-3">
          <AnimatedBondsIcon onClick={onOpenBonds} />
          <div>
            <h1 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              {t.app.title}
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
                {t.app.subtitleBadge}
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              {t.app.description}
            </p>
          </div>
        </div>

        {/* Botões de Ação Global e Seletor de Idiomas */}
        <div className="flex items-center flex-wrap gap-2">
          {/* Seletor de Idioma (Menu com PT, EN, RU) */}
          <LanguageSelector />

          {/* Alternador de Modos 3D */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
            <button
              onClick={() => setViewMode('table')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition ${
                viewMode === 'table'
                  ? 'bg-sky-500 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.app.viewTable}
            >
              <Box className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.app.viewTable}</span>
            </button>

            <button
              onClick={() => setViewMode('cylinder')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition ${
                viewMode === 'cylinder'
                  ? 'bg-sky-500 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.app.viewCylinder}
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.app.viewCylinder}</span>
            </button>

            <button
              onClick={() => setViewMode('sphere')}
              className={`px-2.5 py-1.5 rounded-lg flex items-center gap-1.5 font-medium transition ${
                viewMode === 'sphere'
                  ? 'bg-sky-500 text-white font-bold shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title={t.app.viewSphere}
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.app.viewSphere}</span>
            </button>
          </div>

          {/* Botão Quiz & Desafio */}
          <button
            onClick={onOpenQuiz}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition"
            title="Quiz & Desafio de Estabilização 3D"
          >
            <Brain className="w-3.5 h-3.5 animate-pulse" />
            <span>Quiz 3D</span>
          </button>

          {/* Botão Ligações Químicas */}
          <button
            onClick={onOpenBonds}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.app.btnBonds}</span>
          </button>

          {/* Aba: Funções Orgânicas Oxigenadas */}
          <button
            onClick={onOpenOrganic}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition"
            title="Álcoois, Fenóis, Éteres, Aldeídos, Cetonas, Carboxílicos e Ésteres"
          >
            <FlaskConical className="w-3.5 h-3.5" />
            <span>{t.app.btnOrganic}</span>
          </button>

          {/* Aba: Funções Químicas Inorgânicas */}
          <button
            onClick={onOpenInorganic}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition"
            title="Ácidos, Bases, Óxidos e Sais"
          >
            <Beaker className="w-3.5 h-3.5" />
            <span>{t.app.btnInorganic}</span>
          </button>

          {/* Botão Comparar Elementos */}
          <button
            onClick={onOpenComparison}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md transition"
          >
            <Scale className="w-3.5 h-3.5" />
            <span>{t.app.btnCompare}</span>
          </button>
        </div>
      </div>

      {/* Linha Inferior: Campo de Busca & Filtros Rápidos */}
      <div className="flex flex-wrap items-center gap-2.5">
        {/* Campo de Busca */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            placeholder={t.app.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl pl-9 pr-8 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-2.5 text-slate-500 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Filtro: Categoria Química */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
        >
          <option value="todas">{t.app.allCategories}</option>
          {Object.keys(CATEGORY_COLORS).map((key) => (
            <option key={key} value={key}>
              {getCategoryLabel(key as ElementCategory)}
            </option>
          ))}
        </select>

        {/* Filtro: Estado Físico */}
        <select
          value={selectedPhase}
          onChange={(e) => setSelectedPhase(e.target.value)}
          className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
        >
          <option value="todas">{t.phaseFilterLabels.all}</option>
          <option value="solido">{t.phaseFilterLabels.solid}</option>
          <option value="liquido">{t.phaseFilterLabels.liquid}</option>
          <option value="gas">{t.phaseFilterLabels.gas}</option>
          <option value="desconhecido">{t.phaseFilterLabels.unknown}</option>
        </select>

        {/* Filtro: Origem */}
        <select
          value={selectedOrigin}
          onChange={(e) => setSelectedOrigin(e.target.value)}
          className="bg-slate-900 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-sky-500"
        >
          <option value="todas">{t.app.allOrigins}</option>
          <option value="natural">{t.app.naturalOnly}</option>
          <option value="artificial">{t.app.artificialOnly}</option>
        </select>

        {/* Botão Limpar Filtros se Ativo */}
        {isFilterActive && (
          <button
            onClick={clearFilters}
            className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 transition"
          >
            <X className="w-3 h-3" />
            <span>{t.app.clearFilters}</span>
          </button>
        )}

        {/* Contador Informativo */}
        <div className="ml-auto text-xs text-slate-400 font-mono">
          <span className="text-white font-bold">{matchedCount}</span> / 118 {t.app.elementsCounter}
        </div>
      </div>
    </header>
  );
}
