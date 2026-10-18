import React from 'react';
import Head from 'next/head';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import {
  _NAMESPACE_LANGAGE_COMMON_,
  _MY_PROFILE_,
  _WEBSITE_ADDRESS_,
  _NEXTJS_LINK_,
} from '@/_mocks_/_settings_items_';
import CssBaseline from '@mui/material/CssBaseline';
import { Stack, Tooltip } from '@mui/material';
import CvComponent from '@/components/cv/CvComponent';
import CvPageLayout from '@/components/cv/CvPageLayout';
import { PlayStoreIcon, IosIcon, NextJsIcon, CursorIcon } from '@/components/icons/IconifiyIcons';

export default function CvPage() {
  const { t, i18n } = useTranslation(_NAMESPACE_LANGAGE_COMMON_);
  const currentYear = new Date().getFullYear();
  const tabTitle = t('cvTabTitle');

  return (
    <CvPageLayout>
      <Head>
        <title key={i18n.resolvedLanguage || i18n.language}>{tabTitle}</title>
        <meta name="description" content={t('cvDescriptionPage')} />
      </Head>
      <CssBaseline />
      <CvComponent embedded />
      <footer
        className="appFooter"
        style={{
          position: 'relative',
          background: 'var(--background)',
          width: '100%',
          marginTop: 'auto',
          padding: '24px 16px',
          paddingBottom: 'max(24px, env(safe-area-inset-bottom))',
          borderTop: '1px solid var(--accents3)',
        }}
      >
        <Stack alignItems="center" spacing={3}>
          <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap sx={{ gap: 2, justifyContent: 'center' }}>
            <Tooltip sx={{ zIndex: 1 }} title={t('sendMeMail')} placement="top">
              <a href={`mailto:${_MY_PROFILE_.mail}`} className="btn btn-icon btn-sm" style={{
                background: 'var(--primary)',
                color: 'var(--text-secondary)',
              }}
              >
                <ion-icon name="mail"></ion-icon>
              </a>
            </Tooltip>

            <Tooltip sx={{ zIndex: 1 }} title={t('profileLinkedin')} placement="top">
              <a href={_MY_PROFILE_.socials.linkedin} target="_blank" rel="noopener noreferrer" className="btn btn-icon btn-sm" style={{
                background: 'var(--blue-linkedin)',
                color: 'white',
              }}
              >
                <ion-icon name="logo-linkedin"></ion-icon>
              </a>
            </Tooltip>

            <Tooltip sx={{ zIndex: 1 }} title={t('profileGithub')} placement="top">
              <a href={_MY_PROFILE_.socials.github} target="_blank" rel="noopener noreferrer" className="btn btn-icon btn-sm" style={{
                background: 'black',
                color: 'white',
              }}
              >
                <ion-icon name="logo-github"></ion-icon>
              </a>
            </Tooltip>

            <Tooltip sx={{ zIndex: 1 }} title={t('profilePlaystore')} placement="top">
              <a href={_MY_PROFILE_.socials.playstore} target="_blank" rel="noopener noreferrer" className="btn btn-icon btn-sm" style={{ background: 'white' }}>
                <PlayStoreIcon size={15} />
              </a>
            </Tooltip>
            {_MY_PROFILE_.socials.appstore ? (
              <Tooltip sx={{ zIndex: 1 }} title={t('profileAppstore')} placement="top">
                <a href={_MY_PROFILE_.socials.appstore} target="_blank" rel="noopener noreferrer" className="btn btn-icon btn-sm" style={{ background: 'var(--text)', color: 'var(--background)' }}>
                  <IosIcon size={15} color="var(--background)" />
                </a>
              </Tooltip>
            ) : null}
          </Stack>
          <Stack alignItems="center" spacing={0.5} sx={{ fontSize: 12, color: 'var(--accents7)' }}>
            <div>
              {t('footer.deployedWith')}{' '}
              <a href={_NEXTJS_LINK_} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                Next.js <NextJsIcon size={14} />
              </a>{' '}
              &{' '}
              <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                Cursor <CursorIcon size={14} />
              </a>
            </div>
            <div>
              {t('footer.copyright')}{' '}
              <span>{currentYear === 2023 ? '2023' : `2023–${currentYear}`}</span> {_WEBSITE_ADDRESS_}
            </div>
            <div>{t('footer.allRightsReserved')}</div>
          </Stack>
        </Stack>
      </footer>
    </CvPageLayout>
  );
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [_NAMESPACE_LANGAGE_COMMON_, 'cv'])),
    },
  };
}
