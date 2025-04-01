import React, { useEffect } from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES } from '@/_mocks_/_settings_items_';
import { useTranslation } from 'next-i18next';
import { useLangMode } from '@/contexts/LangModeProvider';
import SkillsComponent from '@/components/skills/SkillsComponent';
import AppBarComponent from '@/components/navigation/AppBarComponent';
import MobileAppBarComponent from '@/components/navigation/MobileAppBarComponent';
import ContentComponent from '@/components/layouts/ContentComponent';
import MobileContentComponent from '@/components/layouts/MobileContentComponent';
import MobileSkillsComponent from '@/components/skills/MobileSkillsComponent';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';

export default function SkillsPage() {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const [lang] = useLangMode();
  const { isMobile } = useDeviceMode();

  const title = t('sections.skills.title');
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

          widgetIframe.style.right = 0;
          widgetIframe.style.bottom = 0;
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
    <>
      {!isMobile ? <AppBarComponent title={title} /> : <MobileAppBarComponent title={title} />}
      {!isMobile ? <ContentComponent><SkillsComponent /></ContentComponent> : <MobileContentComponent><MobileSkillsComponent /></MobileContentComponent>}
      <iframe
        id="xeko-ai-widget"
        src="https://assistant.xeko.ai?assistant_id=67ea9d65dba8839eea322ea3"
        style={{
          position: 'fixed',
          right: 0, bottom: 0,
          //border: '5px solid cyan',
          //margin: 0, padding: 0, 
          zIndex: 9999
        }}
        scrolling="no"></iframe>
    </>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      //tabPrice: response,
      ...(await serverSideTranslations(locale, ARRAY_NAMESPACES, null, ARRAY_LANGAGES)),
      // Will be passed to the page component as props
    },
  }
}