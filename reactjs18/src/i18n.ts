
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en.json'
import vn from './locales/vi.json'

i18n.use(initReactI18next).init({
    resources:{
        en:{
            translation:en

        },
        vn:{
            translation:vn
        }
    },
    lng:'en',// Default language
    fallbackLng:'en'
})
export default i18n;