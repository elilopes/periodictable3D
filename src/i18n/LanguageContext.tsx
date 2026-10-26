import React, {createContext, useContext, useState, useEffect, ReactNode} from 'react';
import {Language, SUPPORTED_LANGUAGES, LanguageOption} from './types';
import {TRANSLATIONS, Translations} from './translations';
import {ELEMENT_NAMES_I18N} from './elementNames';
import {ElementCategory, PhysicalState, ElementOrigin, ElementData} from '../data/elements';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: LanguageOption[];
  getElementName: (elementNumber: number) => string;
  getWikiUrl: (element: ElementData) => string;
  getCategoryLabel: (category: ElementCategory) => string;
  getPhaseLabel: (phase: PhysicalState) => string;
  getOriginLabel: (origin: ElementOrigin) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({children}: {children: ReactNode}) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Tenta obter do localStorage ou padrão pt
    const saved = localStorage.getItem('periodic_table_lang');
    if (saved === 'pt' || saved === 'en' || saved === 'ru') {
      return saved;
    }
    return 'pt';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('periodic_table_lang', lang);
    } catch {
      // ignore
    }
  };

  const t = TRANSLATIONS[language] || TRANSLATIONS.pt;

  const getElementName = (elementNumber: number): string => {
    const item = ELEMENT_NAMES_I18N[elementNumber];
    if (item && item.name[language]) {
      return item.name[language];
    }
    return '';
  };

  const getWikiUrl = (element: ElementData): string => {
    const item = ELEMENT_NAMES_I18N[element.number];
    const slug = item?.wikiSlug[language] || encodeURIComponent(element.name);
    return `https://${language}.wikipedia.org/wiki/${slug}`;
  };

  const getCategoryLabel = (category: ElementCategory): string => {
    return t.categories[category] || category;
  };

  const getPhaseLabel = (phase: PhysicalState): string => {
    return t.phases[phase] || phase;
  };

  const getOriginLabel = (origin: ElementOrigin): string => {
    return origin === 'natural' ? t.app.naturalBadge : t.app.artificialBadge;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages: SUPPORTED_LANGUAGES,
        getElementName,
        getWikiUrl,
        getCategoryLabel,
        getPhaseLabel,
        getOriginLabel,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
