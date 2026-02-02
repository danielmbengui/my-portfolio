import React from 'react';
import useWindowSize from '@/hooks/useWindowSize';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, _MY_PROFILE_, _PAGE_LINK_RESUME_, _NEXTJS_LINK_, _WEBSITE_ADDRESS_ } from '@/_mocks_/_settings_items_';
import { useTranslation } from 'next-i18next';
import { useLangMode } from '@/contexts/LangModeProvider';
import SkillsComponent from '@/components/skills/SkillsComponent';
import AppBarComponent from '@/components/navigation/AppBarComponent';
import MobileAppBarComponent from '@/components/navigation/MobileAppBarComponent';
import ContentComponent from '@/components/layouts/ContentComponent';
import MobileContentComponent from '@/components/layouts/MobileContentComponent';
import MobileSkillsComponent from '@/components/skills/MobileSkillsComponent';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import { Stack, Tooltip } from '@mui/material';
import { NextJsIcon, PlayStoreIcon } from '@/components/icons/IconifiyIcons';

export default function SkillsPage() {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const [lang] = useLangMode();
  const { isMobile } = useDeviceMode();

  const title = t('sections.skills.title');
  const currentYear = new Date().getFullYear();
  
  return (
    <div>
      {!isMobile ? <AppBarComponent title={title} /> : <MobileAppBarComponent title={title} />}
      {!isMobile ? <ContentComponent><SkillsComponent /></ContentComponent> : <MobileContentComponent><MobileSkillsComponent /></MobileContentComponent>}
    </div>
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