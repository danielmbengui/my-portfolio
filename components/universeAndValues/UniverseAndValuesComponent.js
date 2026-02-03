import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { Fade } from 'react-awesome-reveal';
import { motion } from 'framer-motion';
import VideoFullscreenDialog from '@/components/shared/VideoFullscreenDialog';

// Ordre des valeurs : Valeur 1, Valeur 2, Valeur 3, Valeur 4
const VIDEOS = [
  { src: '/assets/videos/2-1.mp4', titleKey: 'sections.universeAndValues.video1.title', descKey: 'sections.universeAndValues.video1.description' },
  { src: '/assets/videos/2-2.mp4', titleKey: 'sections.universeAndValues.video2.title', descKey: 'sections.universeAndValues.video2.description' },
  { src: '/assets/videos/2-3.mp4', titleKey: 'sections.universeAndValues.video3.title', descKey: 'sections.universeAndValues.video3.description' },
  { src: '/assets/videos/2-4.mp4', titleKey: 'sections.universeAndValues.video4.title', descKey: 'sections.universeAndValues.video4.description' },
];

export default function UniverseAndValuesComponent({ embedded = false }) {
  const { t } = useTranslation('common');
  const [fullscreenVideo, setFullscreenVideo] = useState(null);

  return (
    <Container
      sx={{
        position: 'relative',
        overflow: 'visible',
        mt: '20px',
        ...(embedded ? { px: 0, py: 0 } : {}),
      }}
    >
      <Grid
        container
        justifyContent="center"
        spacing={embedded ? 3 : 4}
        pt={embedded ? 3 : 4}
        pb={embedded ? 4 : { xs: 20, sm: 10 }}
      >
        <Grid item xs={12} sx={{ textAlign: 'center', ...(embedded ? { mt: 0 } : {}) }}>
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
              {t('sections.universeAndValues.title')}
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
                maxWidth: 800,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                lineHeight: 1.6,
              }}
            >
              {t('sections.universeAndValues.subtitle')}
            </Typography>
          </Stack>
        </Grid>

        {VIDEOS.map((video, index) => (
          <Grid item xs={12} sm={6} key={video.src}>
            <Fade triggerOnce delay={150 + index * 50} direction="up">
              <Stack
                spacing={0}
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  overflow: 'hidden',
                  border: '1px solid var(--accents3)',
                  bgcolor: 'var(--background-card)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 12px 32px rgba(0,0,0,0.1)',
                    borderColor: 'var(--accents4)',
                  },
                }}
              >
                <Box
                  onClick={() => setFullscreenVideo({ src: video.src, title: t(video.titleKey) })}
                  sx={{
                    width: '100%',
                    aspectRatio: { xs: '9/6.72', md: '9/4.62' },
                    overflow: 'hidden',
                    borderRadius: 3,
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    position: 'relative',
                    bgcolor: 'var(--accents2)',
                    cursor: 'pointer',
                    '&:hover': { opacity: 0.95 },
                  }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    controlsList="nodownload"
                    disablePictureInPicture
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'center center',
                      display: 'block',
                      transform: 'scale(1.12)',
                    }}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </Box>
                <Stack
                  spacing={0.75}
                  sx={{
                    p: 2,
                    borderTop: '1px solid var(--accents3)',
                    flex: 1,
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.05rem',
                      color: 'var(--text)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {t(video.titleKey)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--accents7)',
                      lineHeight: 1.65,
                      fontSize: '0.875rem',
                    }}
                  >
                    {t(video.descKey)}
                  </Typography>
                </Stack>
              </Stack>
            </Fade>
          </Grid>
        ))}
      </Grid>
      <VideoFullscreenDialog
        open={!!fullscreenVideo}
        onClose={() => setFullscreenVideo(null)}
        videoSrc={fullscreenVideo?.src ?? ''}
        title={fullscreenVideo?.title}
      />
    </Container>
  );
}
