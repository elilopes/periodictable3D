import React, {useState, useMemo} from 'react';
import {X, BookOpen, Search} from 'lucide-react';
import {CHEMISTRY_GLOSSARY} from '../data/glossary';
import {useLanguage} from '../i18n/LanguageContext';

interface ChemistryGlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChemistryGlossaryModal({isOpen, onClose}: ChemistryGlossaryModalProps) {
  const {language} = useLanguage();
  const [search, setSearch] = useState<string>('');

  const filteredTerms = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return CHEMISTRY_GLOSSARY;
    return CHEMISTRY_GLOSSARY.filter((item) => {
      const termText = (item.term[language] || item.term.pt).toLowerCase();
      const defText = (item.definition[language] || item.definition.pt).toLowerCase();
      return termText.includes(q) || defText.includes(q);
    });
  }, [search, language]);

  if (!isOpen) return null;

  const titleText =
    language === 'pt'
      ? 'Glossário de Termos Químicos'
      : language === 'ru'
      ? 'Глоссарий химических терминов'
      : 'Chemistry Glossary';

  const subtitleText =
    language === 'pt'
      ? 'Explicações simples e informais de termos técnicos da química para todos'
      : language === 'ru'
      ? 'Простые и понятные объяснения химических терминов'
      : 'Simple, informal explanations of technical chemistry terms';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xl p-4 sm:p-6 select-none">
      <div className="relative w-full max-w-4xl h-[88vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden">
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/85 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-gradient-to-tr from-sky-500/20 to-teal-500/20 text-sky-400 rounded-xl border border-sky-500/30">
              <BookOpen className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                {titleText}
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-400 border border-sky-500/30">
                  {CHEMISTRY_GLOSSARY.length} Termos
                </span>
              </h2>
              <p className="text-xs text-slate-400">{subtitleText}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Barra de Pesquisa */}
        <div className="px-6 py-3 bg-slate-950/60 border-b border-slate-800">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
            <input
              type="text"
              placeholder={
                language === 'pt'
                  ? 'Pesquisar termo técnico (ex: Octeto, Valência, pH)...'
                  : language === 'ru'
                  ? 'Поиск термина...'
                  : 'Search term...'
              }
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
            />
          </div>
        </div>

        {/* Lista de Termos */}
        <div className="flex-1 p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredTerms.map((item) => {
            const termName = item.term[language] || item.term.pt;
            const termDef = item.definition[language] || item.definition.pt;

            return (
              <div
                key={item.id}
                className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 flex flex-col gap-2 hover:border-slate-700 transition"
              >
                <h3 className="text-sm font-bold text-sky-300 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  {termName}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {termDef}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
