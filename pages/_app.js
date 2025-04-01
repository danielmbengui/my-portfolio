import React, { useEffect, useState } from 'react';
import { CacheProvider } from '@emotion/react';
import createEmotionCache from '../utility/createEmotionCache';
import '@/styles/globals.css';
import '@/styles/chatbox.css';
import '@/styles/carousel.css';
import LangModeProvider from '../contexts/LangModeProvider';
import DeviceModeProvider from '../contexts/DeviceModeProvider';
import { appWithTranslation } from "next-i18next";
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

  useEffect(() => {
    function adjustIframeLayout(isOpen) {
      const widgetIframe = document.getElementById("xeko-ai-widget");
      if (!widgetIframe) return;

      const isMobile = window.innerWidth < 768;

      if (isMobile) {
        if (isOpen) {
          widgetIframe.style.position = "fixed";
          widgetIframe.style.top = 0;
          widgetIframe.style.bottom = 0;
          widgetIframe.style.left = 0;
          widgetIframe.style.right = 0;
          widgetIframe.style.width = "100%";
          widgetIframe.style.height = "100%";
          //widgetIframe.style.transform = "";
        } else {
          widgetIframe.style.position = "fixed";
          widgetIframe.style.bottom = 0;
          widgetIframe.style.right = 0;
          widgetIframe.style.top = "auto";
          widgetIframe.style.left = "auto";
          widgetIframe.style.width = "200px";
          widgetIframe.style.height = "160px";
          //widgetIframe.style.transform = "";
        }
      } else {
        if (isOpen) {
          widgetIframe.style.position = "fixed";
          widgetIframe.style.bottom = 0;
          widgetIframe.style.right = 0;
          widgetIframe.style.top = 0;
          //widgetIframe.style.left = "auto";
          widgetIframe.style.width = "450px";
          widgetIframe.style.height = "100%";
          //widgetIframe.style.transform = "";
        } else {
          widgetIframe.style.position = "fixed";
          //widgetIframe.style.right = "0";
          widgetIframe.style.top = "auto";
          //widgetIframe.style.bottom = "0";
          widgetIframe.style.left = "auto";
          widgetIframe.style.width = "210px";
          widgetIframe.style.height = "160px";
          //widgetIframe.style.transform = "translateY(-50%)";

          widgetIframe.style.right= 0;
          widgetIframe.style.bottom= 0;
          //widgetIframe.style.border= '5px solid cyan';
          //widgetIframe.style.width= '210px';
          //widgetIframe.style.maxWidth: '250px';
        }
      }
    }

    const handleResize = () => {
      const currentState = window.xekoWidgetState !== undefined ? window.xekoWidgetState : false;
      adjustIframeLayout(currentState);
    };

    const handleMessage = (event) => {
      if (event.data?.type === "resize_widget") {
        window.xekoWidgetState = event.data.isOpen;
        adjustIframeLayout(event.data.isOpen);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("message", handleMessage);

    adjustIframeLayout(false);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <SSRProvider>
        <ThemeModeProvider themeMode={themeMode}>
          <LangModeProvider langMode={langMode}>
            <DeviceModeProvider>
              <Head>
                <title>{"Daniel Mbengui"}</title>
                <meta
                  name="description"
                  content="Fullstack Developer | Mobile Developer "
                />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" href="/me-color.png" />



              </Head>
              <Script src="/assets/js/lib/bootstrap.min.js" />
              <Script type="module" src="https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js" />

              <Script src="/assets/js/plugins/progressbar-js/progressbar.min.js" />
              {
                /*
                <Script src="/assets/js/plugins/splide/splide.min.js" />
                <Script src="/assets/js/base.js" />
                <CssBaseline />
                */
              }
               <iframe
                  id="xeko-ai-widget"
                  src="https://assistant.xeko.ai?assistant_id=67ea9d65dba8839eea322ea3"
                  style={{
                    position: 'fixed',
                    right:0,bottom:0,
                    //border: '5px solid cyan',
                    //margin: 0, padding: 0, 
                    zIndex: 9999
                  }}
                  scrolling="no"></iframe>
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
