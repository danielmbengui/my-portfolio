import React, { useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utility/createEmotionCache';
import "@/styles/robotoMono-fonts.css";
import '@/styles/globals.css';
import '@/styles/globals.css';
import '@/styles/cv-print.css';
import '@/styles/carousel.css';
import LangModeProvider from '../contexts/LangModeProvider';
import DeviceModeProvider from '../contexts/DeviceModeProvider';
import { appWithTranslation } from "next-i18next";
import nextI18NextConfig from "../next-i18next.config";
import { DEFAULT_LANGAGE, DEFAULT_THEME, STORAGE_LANG_MODE, STORAGE_THEME_MODE } from '../_mocks_/_settings_items_';
import { SSRProvider } from '@react-aria/ssr';
import ThemeModeProvider from '../contexts/ThemeModeProvider';
import Head from 'next/head';
import Script from 'next/script';
import { CssBaseline } from '@mui/material';


const clientSideEmotionCache = createEmotionCache();

const MyApp = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [themeMode, setThemeMode] = useState(DEFAULT_THEME);
  const [langMode, setLangMode] = useState(DEFAULT_LANGAGE);

  useEffect(() => {
    //firebase.initializeApp(firebaseConfig);
    // you can use any storage
    var _theme = DEFAULT_THEME;
    if (!window.localStorage.getItem(STORAGE_THEME_MODE)) {
      window.localStorage.setItem(STORAGE_THEME_MODE, _theme)
    } else {
      _theme = window.localStorage.getItem(STORAGE_THEME_MODE);
    }
    let lang = DEFAULT_LANGAGE;

    if (!window.localStorage.getItem(STORAGE_LANG_MODE)) {
      window.localStorage.setItem(STORAGE_LANG_MODE, DEFAULT_LANGAGE);
    } else {
      lang = window.localStorage.getItem(STORAGE_LANG_MODE);
    }
    setThemeMode(_theme);
    setLangMode(lang);

    var date = new Date();
    var nowYear = date.getFullYear();
    var copyrightYear = document.querySelectorAll('.yearNow');
    copyrightYear.forEach(function (el) {
      el.innerHTML = nowYear
    });

    //-----------------------------------------------------------------------
    // Go Top Button
    //-----------------------------------------------------------------------
    var goTopButton = document.querySelectorAll(".goTop");
    goTopButton.forEach(function (el) {
      // show fixed button after some scrolling
      window.addEventListener("scroll", function () {
        var scrolled = window.scrollY;
        if (scrolled > 100) {
          el.classList.add("show")
        }
        else {
          el.classList.remove("show")
        }
      })
      // go top on click
      el.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      })

    })
    //-----------------------------------------------------------------------
  }, []);


  return (
    <CacheProvider value={emotionCache}>
      <SSRProvider>
        <ThemeModeProvider themeMode={themeMode}>
          <LangModeProvider langMode={langMode}>
            <DeviceModeProvider>
              <Head>
                <title>{"Daniel Mbengui | Vibe Developer"}</title>
                <meta
                  name="description"
                  content="Vibe Developer | Fullstack Developer | Mobile Developer "
                />
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, viewport-fit=cover" />
                <link rel="icon" href="/me-color.png" />
              </Head>
              <Script
                src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.esm.js"
                strategy="afterInteractive"
                type="module"
              />
              <Script
                src="https://cdn.jsdelivr.net/npm/ionicons@latest/dist/ionicons/ionicons.js"
                strategy="afterInteractive"
                noModule
              />
              <Script src="https://unpkg.com/swiper/swiper-bundle.min.js" strategy="afterInteractive" />
              <Script src="/assets/js/lib/bootstrap.min.js" />




              <Script src="/assets/js/plugins/progressbar-js/progressbar.min.js" />
              {
                /*
                <Script src="/assets/js/plugins/splide/splide.min.js" />
                <Script src="/assets/js/base.js" />
                <CssBaseline />
                */
              }
              
              <Component {...pageProps} />
            </DeviceModeProvider>
          </LangModeProvider>
        </ThemeModeProvider>
      </SSRProvider>
    </CacheProvider>
  );
};

//export default MyApp;
export default appWithTranslation(MyApp, nextI18NextConfig);
