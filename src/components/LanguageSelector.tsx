import React, {useState, useRef, useEffect} from 'react';
import {useLanguage} from '../i18n/LanguageContext';
import {Language} from '../i18n/types';
import {Globe, ChevronDown, Check} from 'lucide-react';

export function LanguageSelector() {
  const {language, setLanguage, languages} = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const currentLang = languages.find((l) => l.code === language) || languages[0];

  // Fecha o dropdown se clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 text-white text-xs font-semibold shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-sky-500/50"
        title="Alterar Idioma / Change Language / Сменить язык"
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="font-medium text-slate-200">{currentLang.label}</span>
        <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1.5 w-48 bg-slate-900 border border-slate-700/90 rounded-2xl shadow-2xl p-1.5 z-50 backdrop-blur-xl animate-in fade-in duration-150">
          <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400 tracking-wider border-b border-slate-800 mb-1">
            Idioma • Language • Язык
          </div>
          <div className="flex flex-col gap-0.5">
            {languages.map((item) => {
              const isSelected = item.code === language;
              return (
                <button
                  key={item.code}
                  onClick={() => {
                    setLanguage(item.code);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-xl text-xs transition ${
                    isSelected
                      ? 'bg-sky-500/20 text-sky-300 font-bold border border-sky-500/30'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{item.flag}</span>
                    <div className="text-left">
                      <div className="leading-tight">{item.label}</div>
                      <div className="text-[10px] text-slate-400">{item.nativeName}</div>
                    </div>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-sky-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
