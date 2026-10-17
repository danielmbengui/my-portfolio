import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import moment from 'moment';
import 'moment/locale/fr';
import { ARRAY_LANGAGES, STORAGE_LANG_MODE } from '../_mocks_/_settings_items_';
import {
  JOURNEY_DEFAULT_LOCALE,
  JOURNEY_LANG_STORAGE_KEY,
  JOURNEY_LOCALES,
  JOURNEY_PAGE_PATHS,
} from '../_mocks_/_journey_items_';

export const LangModeProviderContext = createContext(null);

function readStoredJourneyLang() {
  try {
    const saved = window.localStorage.getItem(JOURNEY_LANG_STORAGE_KEY);
    if (saved && JOURNEY_LOCALES.includes(saved)) return saved;
    window.localStorage.setItem(JOURNEY_LANG_STORAGE_KEY, JOURNEY_DEFAULT_LOCALE);
  } catch {
    /* ignore */
  }
  return JOURNEY_DEFAULT_LOCALE;
}

export default function LangModeProvider({ children, langMode }) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const isJourneyPage = JOURNEY_PAGE_PATHS.includes(router.pathname);
  const isCvPage = router.pathname === '/cv';
  const [lang, setLang] = useState(() => router.locale || langMode);

  useEffect(() => {
    if (isJourneyPage) {
      setLang(readStoredJourneyLang());
      return;
    }
    if (isCvPage && router.locale && ARRAY_LANGAGES.includes(router.locale)) {
      setLang(router.locale);
      return;
    }
    setLang(langMode);
  }, [langMode, isJourneyPage, isCvPage, router.locale]);

  useEffect(() => {
    document.documentElement.setAttribute(STORAGE_LANG_MODE, lang);
    moment.locale(lang);
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }

    try {
      if (isJourneyPage) {
        window.localStorage.setItem(JOURNEY_LANG_STORAGE_KEY, lang);
      } else {
        window.localStorage.setItem(STORAGE_LANG_MODE, lang);
      }
    } catch {
      /* ignore */
    }

    if (router.isReady && router.locale !== lang && (isJourneyPage || isCvPage)) {
      router.replace(router.asPath, router.asPath, { locale: lang });
    }
  }, [lang, isJourneyPage, isCvPage, i18n, router]);

  return (
    <LangModeProviderContext.Provider value={[lang, setLang]}>
      {children}
    </LangModeProviderContext.Provider>
  );
}

export const useLangMode = () => useContext(LangModeProviderContext);
