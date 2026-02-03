import React from 'react';
import {
  Box,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import { useTranslation } from 'next-i18next';
import { Fade } from 'react-awesome-reveal';
import { motion } from 'framer-motion';
import { _MY_PROFILE_ } from '@/_mocks_/_settings_items_';
import { LinkedinIcon, GithubIcon, PlayStoreIcon, IosIcon } from '@/components/icons/IconifiyIcons';

const LINKS = [
  {
    id: 'email',
    href: (profile) => `mailto:${profile.mail}`,
    labelKey: 'sendMeMail',
    Icon: EmailIcon,
    iconProps: {},
    colorHover: 'var(--primary)',
  },
  {
    id: 'linkedin',
    href: (profile) => profile.socials.linkedin,
    labelKey: 'profileLinkedin',
    Icon: LinkedinIcon,
    iconProps: { size: 28 },
    colorHover: 'var(--blue-linkedin)',
  },
  {
    id: 'github',
    href: (profile) => profile.socials.github,
    labelKey: 'profileGithub',
    Icon: GithubIcon,
    iconProps: { size: 28 },
    colorHover: 'var(--text)',
  },
  {
    id: 'playstore',
    href: (profile) => profile.socials.playstore,
    labelKey: 'profilePlaystore',
    Icon: PlayStoreIcon,
    iconProps: { size: 28 },
    colorHover: 'var(--primary)',
  },
  {
    id: 'appstore',
    href: (profile) => profile.socials.appstore || '',
    labelKey: 'profileAppstore',
    Icon: IosIcon,
    iconProps: { size: 28 },
    colorHover: 'var(--text)',
  },
];

export default function ContactMeComponent({ embedded = false }) {
  const { t } = useTranslation('common');

  return (
    <Box
      id="contact-section"
      component="section"
      sx={{
        scrollMarginTop: 24,
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Container
        sx={{
          ...(embedded ? { px: 0, py: 0 } : {}),
        }}
      >
        <Grid
          container
          justifyContent="center"
          spacing={embedded ? 3 : 4}
          pt={embedded ? 3 : 4}
          pb={embedded ? 4 : { xs: 4, sm: 5 }}
        >
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Stack
              spacing={1}
              alignItems="center"
              component={motion.div}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
            >
              <Typography
                component={motion.h2}
                variants={{
                  hidden: { opacity: 0, y: 20, scale: 0.96 },
                  visible: { opacity: 1, y: 0, scale: 1 },
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                sx={{
                  fontSize: { xs: 24, sm: 28 },
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: 'var(--text)',
                  mb: 0.5,
                }}
              >
                {t('sections.contactMe.title')}
              </Typography>
              <Typography
                component={motion.p}
                variants={{
                  hidden: { opacity: 0, y: 16 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                variant="body1"
                sx={{
                  color: 'var(--accents7)',
                  maxWidth: 560,
                  fontSize: { xs: '0.95rem', sm: '1.05rem' },
                  lineHeight: 1.6,
                }}
              >
                {t('sections.contactMe.subtitle')}
              </Typography>
            </Stack>
          </Grid>

          <Grid item xs={12}>
            <Fade triggerOnce delay={200}>
              <Grid
                container
                spacing={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  border: '1px solid var(--accents3)',
                  bgcolor: 'var(--background-card)',
                }}
              >
                {LINKS.filter((item) => {
                  const href = typeof item.href === 'function' ? item.href(_MY_PROFILE_) : item.href;
                  return href;
                }).map((item) => {
                  const href = typeof item.href === 'function' ? item.href(_MY_PROFILE_) : item.href;
                  const isExternal = item.id !== 'email';
                  const Icon = item.Icon;

                  return (
                    <Grid item xs={12} sm={6} key={item.id}>
                      <Link
                        href={href}
                        target={isExternal ? '_blank' : undefined}
                        rel={isExternal ? 'noopener noreferrer' : undefined}
                        underline="none"
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 1.5,
                          px: 2.5,
                          py: 1.5,
                          borderRadius: 2,
                          border: '1px solid var(--accents3)',
                          bgcolor: 'var(--background)',
                          color: 'var(--text)',
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          transition: 'all 0.2s ease',
                          width: '100%',
                          maxWidth: '100%',
                          boxSizing: 'border-box',
                          '&:hover': {
                            borderColor: item.colorHover,
                            color: item.colorHover,
                            bgcolor: 'var(--accents2)',
                          },
                        }}
                      >
                        {item.id === 'email' ? (
                          <EmailIcon sx={{ fontSize: 26 }} />
                        ) : (
                          <Icon color="inherit" {...item.iconProps} />
                        )}
                        <Typography component="span" sx={{ fontWeight: 500 }}>
                          {item.id === 'email' ? _MY_PROFILE_.mail : t(item.labelKey)}
                        </Typography>
                      </Link>
                    </Grid>
                  );
                })}
              </Grid>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
