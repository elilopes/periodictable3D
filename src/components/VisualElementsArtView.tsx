import React, {useState} from 'react';
import {ElementData} from '../data/elements';
import {getVisualElementData} from '../data/visualElements';
import {useLanguage} from '../i18n/LanguageContext';
import {ExternalLink, Sparkles, Image, RefreshCw, Palette, ShieldCheck} from 'lucide-react';

interface VisualElementsArtViewProps {
  element: ElementData;
}

export function VisualElementsArtView({element}: VisualElementsArtViewProps) {
  const {language} = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [loading, setLoading] = useState(true);

  // Nome em inglês para o link da RSC
  const nameEn = element.name; // fallback
  const artData = getVisualElementData(element.number, element.symbol, nameEn);

  return (
    <div className="w-full h-full flex flex-col items-center justify-between p-3 select-none">
      {/* Moldura da Obra de Arte Visual Elements */}
      <div className="relative w-48 h-48 sm:w-52 sm:h-52 rounded-2xl overflow-hidden border-2 border-amber-500/40 bg-slate-950 shadow-2xl flex items-center justify-center group">
        {!imageError ? (
          <img
            src={artData.imageUrl}
            alt={`Visual Elements - ${element.name} by Murray Robertson`}
            className={`w-full h-full object-cover transition-all duration-700 ${
              loading ? 'scale-105 blur-sm opacity-50' : 'scale-100 blur-0 opacity-100 group-hover:scale-105'
            }`}
            onLoad={() => setLoading(false)}
            onError={() => {
              setImageError(true);
              setLoading(false);
            }}
          />
        ) : (
          /* Fallback Artístico Elegante estilo Gravura Alquímica de Murray Robertson */
          <div className="w-full h-full p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/40 flex flex-col items-center justify-center text-center relative">
            <div className="absolute inset-2 border border-amber-500/30 rounded-xl pointer-events-none" />
            <span className="text-3xl font-black text-amber-400 font-serif tracking-widest">
              {element.symbol}
            </span>
            <span className="text-xs font-semibold text-slate-300 mt-1 uppercase tracking-wider">
              {element.name}
            </span>
            <span className="text-[10px] text-amber-300/80 mt-2 font-mono">
              Z = {element.number} • {element.atomicMass} u
            </span>
            <div className="mt-3 flex items-center gap-1 text-[10px] text-amber-400/90 font-serif italic">
              <Palette className="w-3 h-3" />
              <span>Murray Robertson • RSC</span>
            </div>
          </div>
        )}

        {/* Badge da Royal Society of Chemistry */}
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-amber-500/40 text-[9px] font-bold text-amber-300 flex items-center gap-1 shadow">
          <Sparkles className="w-2.5 h-2.5 text-amber-400" />
          <span>RSC</span>
        </div>

        {/* Selo do Artista */}
        <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-md border border-slate-800 text-[9px] font-mono text-slate-300">
          Murray Robertson
        </div>
      </div>

      {/* Explicação da Obra e Simbologia */}
      <div className="mt-2 w-full text-center">
        <p className="text-[11px] text-slate-300 leading-snug">
          {artData.symbolism[language] || artData.symbolism.pt}
        </p>

        {/* Link Oficial da RSC Periodic Table */}
        <a
          href={artData.rscUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/40 text-amber-300 text-xs font-semibold transition-all shadow-sm"
        >
          <Image className="w-3.5 h-3.5" />
          <span>Ver obra em alta resolução na RSC Periodic Table</span>
          <ExternalLink className="w-3 h-3 ml-0.5" />
        </a>
      </div>
    </div>
  );
}
