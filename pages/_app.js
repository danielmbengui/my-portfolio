import React, { useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
import '../styles/chatbox.css';
import LangModeProvider from '../contexts/LangModeProvider';
import DeviceModeProvider from '../contexts/DeviceModeProvider';
import { appWithTranslation, useTranslation } from "next-i18next";
import { DEFAULT_LANGAGE, STORAGE_LANG_MODE } from '../_mocks_/_settings_items_';
import { SSRProvider } from '@react-aria/ssr';

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [langMode, setLangMode] = useState(DEFAULT_LANGAGE);

  useEffect(() => {
    //firebase.initializeApp(firebaseConfig);
    // you can use any storage
    //let theme = window.localStorage.getItem(STORAGE_THEME_MODE);
    let lang = DEFAULT_LANGAGE;
    if (!window.localStorage.getItem(STORAGE_LANG_MODE)) {
      window.localStorage.setItem(STORAGE_LANG_MODE, DEFAULT_LANGAGE);
    } else {
      lang = window.localStorage.getItem(STORAGE_LANG_MODE);
    }
    
    //setIsDark(theme === THEME_MODE_DARK);
    //setThemeMode(theme === THEME_MODE_DARK ? THEME_MODE_DARK : THEME_MODE_LIGHT);
    //document.documentElement.setAttribute(STORAGE_THEME_MODE, theme === THEME_MODE_DARK ? THEME_MODE_DARK : THEME_MODE_LIGHT);
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
      <ThemeProvider theme={lightTheme}>
        <LangModeProvider langMode={langMode}>
          <DeviceModeProvider>
          <CssBaseline />
        <Component {...pageProps} />
          </DeviceModeProvider>
        </LangModeProvider>
      </ThemeProvider>
      </SSRProvider>
    </CacheProvider>
  );
};

//export default MyApp;
export default appWithTranslation(MyApp);
