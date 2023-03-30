import React, { useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';


import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '@/styles/globals.css';
import '@/styles/chatbox.css';
import LangModeProvider from '../contexts/LangModeProvider';
import DeviceModeProvider from '../contexts/DeviceModeProvider';
import { appWithTranslation, useTranslation } from "next-i18next";
import { DEFAULT_LANGAGE, DEFAULT_THEME, STORAGE_LANG_MODE, STORAGE_THEME_MODE } from '../_mocks_/_settings_items_';
import { SSRProvider } from '@react-aria/ssr';
import ThemeModeProvider from '../contexts/ThemeModeProvider';
import Head from 'next/head';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const {t} = useTranslation();
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [themeMode, setThemeMode] = useState(DEFAULT_THEME);
  const [langMode, setLangMode] = useState(DEFAULT_LANGAGE);

  useEffect(() => {
    //firebase.initializeApp(firebaseConfig);
    // you can use any storage
    let theme = DEFAULT_THEME;
    let lang = DEFAULT_LANGAGE;
    if (!window.sessionStorage.getItem(STORAGE_THEME_MODE)) {
      window.sessionStorage.setItem(STORAGE_THEME_MODE, DEFAULT_THEME);
    } else {
      theme = window.sessionStorage.getItem(STORAGE_THEME_MODE);
    }

    if (!window.sessionStorage.getItem(STORAGE_LANG_MODE)) {
      window.sessionStorage.setItem(STORAGE_LANG_MODE, DEFAULT_LANGAGE);
    } else {
      lang = window.sessionStorage.getItem(STORAGE_LANG_MODE);
    }
    setThemeMode(theme);
    setLangMode(lang);
/*
    const observer = new MutationObserver(() => {
      let newTheme = getDocumentTheme(document?.documentElement);
      setIsDark(newTheme === THEME_MODE_DARK);
      setThemeMode(newTheme === THEME_MODE_DARK ? THEME_MODE_DARK : THEME_MODE_LIGHT);
      //document.documentElement.setAttribute(STORAGE_THEME_MODE, newTheme);
    });

    // Observe the document theme changes
    observer.observe(document?.documentElement, {
      attributes: true,
      attributeFilter: [STORAGE_THEME_MODE, 'style']
    });

    return () => observer.disconnect();
    */
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <SSRProvider>
      <ThemeModeProvider themeMode={themeMode}>
        <LangModeProvider langMode={langMode}>
          <DeviceModeProvider>
          <Head>
        <title>{t('titlePageHome')}</title>
        <meta
          name="description"
          content="Daniel Mbengui | Backend Developer | Web Developer "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/me.ico" />
      </Head>
        <Component {...pageProps} />
          </DeviceModeProvider>
        </LangModeProvider>
      </ThemeModeProvider>
      </SSRProvider>
    </CacheProvider>
  );
};

//export default MyApp;
export default appWithTranslation(MyApp);
