export type Language = 'pt' | 'en' | 'ru';

export interface LanguageOption {
  code: Language;
  label: string;
  flag: string;
  nativeName: string;
}

export const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'pt', label: 'Português', flag: '🇧🇷', nativeName: 'Português (BR)' },
  { code: 'en', label: 'English', flag: '🇺🇸', nativeName: 'English (US)' },
  { code: 'ru', label: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
];
