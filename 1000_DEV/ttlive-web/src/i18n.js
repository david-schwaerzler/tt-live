import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enEn from './locale/en';
import deDe from './locale/de';
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init

const resources = {...deDe, ...enEn};

i18n
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'de',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;