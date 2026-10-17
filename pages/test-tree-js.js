import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_LANGAGES, ARRAY_NAMESPACES } from '@/_mocks_/_settings_items_';
import { JOURNEY_DEFAULT_LOCALE, JOURNEY_LOCALES, _NAMESPACE_LANGAGE_JOURNEY_ } from '@/_mocks_/_journey_items_';
import JourneyExperience from '@/components/journey/JourneyExperience';

export default function TestTreeJsPage() {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  return (
    <>
      <Head>
        <title>{t('pageTitle')}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>
      <JourneyExperience />
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const lang = JOURNEY_LOCALES.includes(locale) ? locale : JOURNEY_DEFAULT_LOCALE;
  return {
    props: {
      ...(await serverSideTranslations(lang, [...ARRAY_NAMESPACES, _NAMESPACE_LANGAGE_JOURNEY_], null, ARRAY_LANGAGES)),
    },
  };
}
