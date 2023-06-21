export enum LANGUAGES {
  EN_US = 'en_US',
  PT_BR = 'pt_BR',
}

export const ALLOWED_LANGS = [LANGUAGES.EN_US, LANGUAGES.PT_BR];

export const isLangAllowed = (lang: LANGUAGES) => ALLOWED_LANGS.includes(lang);

export const getLanguage = (lang: LANGUAGES) =>
  isLangAllowed(lang) ? lang : LANG_DOCS;

export const LANG_DOCS = LANGUAGES.EN_US;
