import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/fr';
import { STORAGE_LANG_MODE } from '../_mocks_/_settings_items_';


export const LangModeProviderContext = createContext(null);

export default function LangModeProvider({children, langMode}) {
    const { i18n } = useTranslation();
    const router = useRouter();
    const [lang, setLang] = useState(router.locale || langMode);


useEffect(() => {
setLang(langMode);
//moment.locale(langMode);
}, [langMode])

useEffect(() => {
  if (router.locale) {
    setLang(router.locale);
    //moment.locale(lang);
  }
}, [])
    
    useEffect(() => {
        //setLang(langMode);
        document.documentElement.setAttribute(STORAGE_LANG_MODE, lang);
        //i18n.changeLanguage(lang);
        window.localStorage.setItem(STORAGE_LANG_MODE, lang);
        router.replace(router.asPath, router.asPath, { locale: lang })
        moment.locale(lang);
    }, [lang]);
  
    return (
      <LangModeProviderContext.Provider value={[lang, setLang]}>
        {children}
      </LangModeProviderContext.Provider>
    );
  }

  export const useLangMode = () => {
    return useContext(LangModeProviderContext);
  };