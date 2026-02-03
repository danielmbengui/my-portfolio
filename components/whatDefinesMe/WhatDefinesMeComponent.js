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

const VIDEOS = [
  { src: '/assets/videos/1-1.mp4', axeKey: 'sections.defineMe.video1.axeTitle', titleKey: 'sections.defineMe.video1.title', descKey: 'sections.defineMe.video1.description' },
  { src: '/assets/videos/1-2.mp4', axeKey: 'sections.defineMe.video2.axeTitle', titleKey: 'sections.defineMe.video2.title', descKey: 'sections.defineMe.video2.description' },
  { src: '/assets/videos/1-3.mp4', axeKey: 'sections.defineMe.video3.axeTitle', titleKey: 'sections.defineMe.video3.title', descKey: 'sections.defineMe.video3.description' },
  { src: '/assets/videos/1-4.mp4', axeKey: 'sections.defineMe.video4.axeTitle', titleKey: 'sections.defineMe.video4.title', descKey: 'sections.defineMe.video4.description', bulletsKey: 'sections.defineMe.video4.bullets' },
];

// Ordre d'affichage des cartes : step 2 en 1re, step 3 en 2e, step 1 en 3e, step 4 en 4e (indices 0-based : 1, 2, 0, 3)
const CARD_ORDER = [1, 2, 0, 3];

function axeTitleWithNumber(translatedAxeTitle, positionNumber) {
  return translatedAxeTitle.replace(/(AXE|AXIS|EIXO)\s*\d+/, `$1 ${positionNumber}`);
}

export default function WhatDefinesMeComponent({ embedded = false }) {
  const { t } = useTranslation('common');
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const orderedVideos = CARD_ORDER.map((videoIndex, positionIndex) => ({
    ...VIDEOS[videoIndex],
    positionNumber: positionIndex + 1,
  }));
  // Échange uniquement les vidéos du step 1 et du step 4
  [orderedVideos[0].src, orderedVideos[3].src] = [orderedVideos[3].src, orderedVideos[0].src];

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
              {t('sections.defineMe.title')}
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
              {t('sections.defineMe.subtitle')}
            </Typography>
          </Stack>
        </Grid>

        {orderedVideos.map((video, index) => (
          <Grid item xs={12} sm={6} key={video.src + index}>
            <Fade triggerOnce delay={150 + index * 50} direction="up">
              <Stack
                spacing={1.5}
                sx={{
                  height: '100%',
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid var(--accents3)',
                  bgcolor: 'var(--background-card)',
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--primary)',
                    px: 2,
                    pt: 2,
                  }}
                >
                  {axeTitleWithNumber(t(video.axeKey), video.positionNumber)}
                </Typography>
                <Box
                  onClick={() => setFullscreenVideo({ src: video.src, title: axeTitleWithNumber(t(video.axeKey), video.positionNumber) })}
                  sx={{
                    width: '100%',
                    aspectRatio: '16/9',
                    overflow: 'hidden',
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
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                </Box>
                <Stack spacing={0.5} sx={{ p: 2 }}>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: '1rem',
                      color: 'var(--text)',
                    }}
                  >
                    {t(video.titleKey)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'var(--accents7)',
                      lineHeight: 1.6,
                    }}
                  >
                    {t(video.descKey)}
                  </Typography>
                  {video.bulletsKey && (() => {
                    const bullets = t(video.bulletsKey, { returnObjects: true });
                    return Array.isArray(bullets) && bullets.length > 0 ? (
                      <Box component="ul" sx={{ m: 0, pl: 2.5, pt: 0.5, '& li': { mb: 0.25 } }}>
                        {bullets.map((bullet, i) => (
                          <li key={i}>
                            <Typography component="span" variant="body2" sx={{ color: 'var(--accents7)' }}>
                              {bullet}
                            </Typography>
                          </li>
                        ))}
                      </Box>
                    ) : null;
                  })()}
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
