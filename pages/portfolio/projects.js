import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES } from '@/_mocks_/_settings_items_';
import { useTranslation } from 'next-i18next';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import ProjectsComponent from '@/components/projects/ProjectsComponent';
import MobileProjectsComponent from '@/components/projects/MobileProjectsComponent';
import AppBarComponent from '@/components/navigation/AppBarComponent';
import MobileAppBarComponent from '@/components/navigation/MobileAppBarComponent';
import ContentComponent from '@/components/layouts/ContentComponent';
import MobileContentComponent from '@/components/layouts/MobileContentComponent';

export default function ProjectsPage() {
  const { t } = useTranslation();
  const { isMobile } = useDeviceMode();

  const title = t('sections.projects.title');

  return (
    <div>
      {!isMobile ? <AppBarComponent title={title} /> : <MobileAppBarComponent title={title} />}
      {!isMobile ? (
        <ContentComponent>
          <ProjectsComponent />
        </ContentComponent>
      ) : (
        <MobileContentComponent>
          <MobileProjectsComponent />
        </MobileContentComponent>
      )}
    </div>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ARRAY_NAMESPACES, null, ARRAY_LANGAGES)),
    },
  };
}
