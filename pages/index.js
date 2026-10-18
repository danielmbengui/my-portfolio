import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_LANGAGES, ARRAY_NAMESPACES, _NAMESPACE_LANGAGE_COMMON_ } from '@/_mocks_/_settings_items_';
import { JOURNEY_DEFAULT_LOCALE, _NAMESPACE_LANGAGE_JOURNEY_ } from '@/_mocks_/_journey_items_';
import JourneyExperience from '@/components/journey/JourneyExperience';

export default function IndexPage() {
  const { t, i18n } = useTranslation([_NAMESPACE_LANGAGE_JOURNEY_, _NAMESPACE_LANGAGE_COMMON_]);
  const tabTitle = t('indexTabTitle', { ns: _NAMESPACE_LANGAGE_COMMON_ });
  return (
    <>
      <Head>
        <title key={i18n.resolvedLanguage || i18n.language}>{tabTitle}</title>
        <meta name="description" content={t('pageDescription')} />
      </Head>
      <JourneyExperience />
    </>
  );
}

export async function getServerSideProps({ locale }) {
  const lang = ARRAY_LANGAGES.includes(locale) ? locale : JOURNEY_DEFAULT_LOCALE;
  return {
    props: {
      ...(await serverSideTranslations(lang, [...ARRAY_NAMESPACES, _NAMESPACE_LANGAGE_JOURNEY_], null, ARRAY_LANGAGES)),
    },
  };
}
