import React from 'react';
import { CacheProvider } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';

import createEmotionCache from '../utility/createEmotionCache';
import lightTheme from '../styles/theme/lightTheme';
import '../styles/globals.css';
import '../styles/chatbox.css';
import LangModeProvider from '../contexts/LangModeProvider';
import DeviceModeProvider from '../contexts/DeviceModeProvider';
import { appWithTranslation, useTranslation } from "next-i18next";

const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={lightTheme}>
        <LangModeProvider>
          <DeviceModeProvider>
          <CssBaseline />
        <Component {...pageProps} />
          </DeviceModeProvider>
        </LangModeProvider>
      </ThemeProvider>
    </CacheProvider>
  );
};

//export default MyApp;
export default appWithTranslation(MyApp);
