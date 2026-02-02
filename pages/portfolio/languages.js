import React from 'react';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, _MY_PROFILE_, _PAGE_LINK_RESUME_, _NEXTJS_LINK_, _WEBSITE_ADDRESS_ } from '@/_mocks_/_settings_items_';
import { useTranslation } from 'next-i18next';
import { useLangMode } from '@/contexts/LangModeProvider';
import LanguagesComponent from '@/components/languages.js/LanguagesComponent';
import AppBarComponent from '@/components/navigation/AppBarComponent';
import MobileAppBarComponent from '@/components/navigation/MobileAppBarComponent';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import ContentComponent from '@/components/layouts/ContentComponent';
import MobileContentComponent from '@/components/layouts/MobileContentComponent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Stack, Tooltip } from '@mui/material';
import { NextJsIcon, PlayStoreIcon } from '@/components/icons/IconifiyIcons';

export default function LanguagesPage() {
  const { t } = useTranslation();
  const title = t('sections.skills.langs.title');
  const { isMobile } = useDeviceMode();
  
  return (
    <div>
      {!isMobile ? <AppBarComponent title={title} /> : <MobileAppBarComponent title={title} />}
      {!isMobile ? <ContentComponent><LanguagesComponent /></ContentComponent> : <MobileContentComponent><LanguagesComponent /></MobileContentComponent>}
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      //tabPrice: response,
      ...(await serverSideTranslations(locale, ARRAY_NAMESPACES, null, ARRAY_LANGAGES)),
    },
  }
}