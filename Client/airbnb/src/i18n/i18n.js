import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';


import en from './locales/en.json';
import vi from './locales/vi.json';

// the translations
const resources = {
  en: {
    translation: en,
  },
  vi: {
    translation: vi,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // set default language
  fallbackLng: 'en', // set fallback language
  interpolation: {
    escapeValue: false, // not needed for react
  },
  
});
