import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import {getValue} from "./util/LocalStorage"
import { LocalStorageKey } from "./data/constant/Constants"
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

var lang = getValue(LocalStorageKey.LANGUAGE)

i18n
  .use(Backend)
  // .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'vi',
    lng: lang,
    debug: true,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;