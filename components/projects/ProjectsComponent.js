import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Grid, IconButton, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useSwipeable } from 'react-swipeable';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PublicIcon from '@mui/icons-material/Public';
import FooterComponent from '@/components/footer/FooterComponent';
import { AngolanIcon, SwissIcon } from '@/components/icons/FlagIcons';

// ——— Constantes carousel 3D (4 slides visibles : plus de marge pour éviter le clipping) ———
const ITEM_WIDTH = 200;
const LEN = 4;
const THETA = 360 / LEN;
const RADIUS = Math.round((ITEM_WIDTH / 2) / Math.tan((Math.PI * 2) / LEN / 2));
const CAROUSEL_VIEW_WIDTH = 480; // largeur suffisante pour voir les 3 slides (centre + 2 côtés)

const springSlow = {
  type: 'spring',
  stiffness: 42,
  damping: 24,
  mass: 0.8,
};

const DANDELA_ACADEMY_LOGO_URL = 'https://academy.dandela.com/images/logo.png';

const projectData = [
  { id: 'dandela', img: DANDELA_ACADEMY_LOGO_URL, link: 'https://academy.dandela.com' },
  { id: 'playpad', img: '/img/playpad/playpad_banner.png', link: 'https://playpadapp.com/' },
  { id: 'drilldev', img: '/img/drilldev/complete_logo_drilldev.png', link: 'https://drilldev.com/' },
  { id: 'winno', img: '/img/logos/winnobearzclub.png', link: 'https://winno.bearzclub.io/' },
];

export default function ProjectsComponent({ embedded = false }) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(1);
  const carouselRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSelectedId((prev) => (prev >= projectData.length ? 1 : prev + 1));
    },
    onSwipedRight: () => {
      setSelectedId((prev) => (prev <= 1 ? projectData.length : prev - 1));
    },
  });

  const goPrev = () => {
    setSelectedId((prev) => (prev <= 1 ? projectData.length : prev - 1));
  };
  const goNext = () => {
    setSelectedId((prev) => (prev >= projectData.length ? 1 : prev + 1));
  };

  const currentProject = projectData[selectedId - 1];
  const angle = -(selectedId - 1) * THETA;

  return (
    <Box
      sx={{
        ...(embedded ? { minHeight: 0, overflow: 'visible' } : { height: '100vh', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }),
      }}
    >
      <Container sx={{ position: 'relative', py: embedded ? 0 : { xs: 3, md: 5 }, minHeight: embedded ? 0 : '100%' }}>
        <Grid
          container
          justifyContent="center"
          spacing={embedded ? 2 : 4}
          pt={embedded ? 1 : 2}
          pb={embedded ? 4 : { xs: 8, sm: 6 }}
        >
          {/* Titre Projets */}
          <Grid item xs={12} sx={{ textAlign: 'center', mt: embedded ? 4 : 12 }}>
            <Stack spacing={1} alignItems="center">
              <Typography
                component="h1"
                sx={{
                  fontSize: { xs: 24, sm: 28 },
                  fontWeight: 600,
                  letterSpacing: '0.02em',
                  color: 'var(--text)',
                  mb: 0.5,
                }}
              >
                {t('sections.projects.title')}
              </Typography>
            </Stack>
          </Grid>

          {/* Carousel 3D — cliquable */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: embedded ? -3 : -8, overflow: 'visible' }}>
            <Box
              {...handlers}
              ref={carouselRef}
              sx={{
                position: 'relative',
                width: CAROUSEL_VIEW_WIDTH,
                minWidth: CAROUSEL_VIEW_WIDTH,
                height: { xs: 300, sm: 360 },
                perspective: 1400,
                touchAction: 'pan-y',
                overflow: 'visible',
              }}
            >
              <IconButton
                onClick={goPrev}
                sx={{
                  position: 'absolute',
                  left: { xs: -8, sm: -20 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  color: 'var(--primary)',
                  border: '2px solid',
                  borderColor: 'var(--primary)',
                  bgcolor: 'var(--accents1)',
                  '&:hover': {
                    bgcolor: 'var(--primary-opacity)',
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.35)',
                  },
                }}
                size="large"
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={goNext}
                sx={{
                  position: 'absolute',
                  right: { xs: -8, sm: -20 },
                  top: '50%',
                  transform: 'translateY(-50%)',
                  zIndex: 20,
                  color: 'var(--primary)',
                  border: '2px solid',
                  borderColor: 'var(--primary)',
                  bgcolor: 'var(--accents1)',
                  '&:hover': {
                    bgcolor: 'var(--primary-opacity)',
                    boxShadow: '0 0 20px rgba(255, 215, 0, 0.35)',
                  },
                }}
                size="large"
              >
                <ChevronRightIcon />
              </IconButton>

              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  perspective: 1400,
                  transformStyle: 'preserve-3d',
                  overflow: 'visible',
                }}
              >
                <motion.div
                  style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    transformStyle: 'preserve-3d',
                  }}
                  animate={{
                    rotateY: angle,
                    z: -RADIUS,
                  }}
                  transition={springSlow}
                >
                  {projectData.map((item, index) => {
                    const cellAngle = THETA * index;
                    const isSelected = index === selectedId - 1;
                    return (
                      <motion.div
                        key={item.id}
                        onClick={() => setSelectedId(index + 1)}
                        style={{
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          width: ITEM_WIDTH,
                          height: ITEM_WIDTH * 0.85,
                          marginLeft: -ITEM_WIDTH / 2,
                          marginTop: -(ITEM_WIDTH * 0.85) / 2,
                          transformStyle: 'preserve-3d',
                          transform: `rotateY(${cellAngle}deg) translateZ(${RADIUS}px)`,
                          cursor: 'pointer',
                          backfaceVisibility: 'hidden',
                        }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        transition={springSlow}
                      >
                        <motion.div
                          style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: 16,
                            overflow: 'hidden',
                            position: 'relative',
                            border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--accents3)'}`,
                            boxShadow: isSelected
                              ? '0 0 30px rgba(255, 215, 0, 0.4), 0 8px 32px rgba(0,0,0,0.4)'
                              : '0 8px 24px rgba(0,0,0,0.35)',
                            transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                            opacity: isSelected ? 1 : 0.82,
                          }}
                          transition={springSlow}
                        >
                          <Box
                            sx={{
                              width: '100%',
                              height: '100%',
                              position: 'relative',
                              bgcolor: 'var(--accents1)',
                            }}
                          >
                            <Image
                              src={item.img}
                              alt={t(`sections.projects.${item.id}.name`)}
                              fill
                              sizes="200px"
                              style={{
                                objectFit: 'contain',
                                opacity: 0.95,
                              }}
                            />
                            <Box
                              sx={{
                                position: 'absolute',
                                inset: 0,
                                background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 50%)',
                                display: 'flex',
                                alignItems: 'flex-end',
                                justifyContent: 'center',
                                pb: 1.5,
                              }}
                            >
                              <Typography
                                variant="subtitle1"
                                fontWeight={700}
                                sx={{
                                  color: 'var(--text)',
                                  textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                                  textAlign: 'center',
                                  px: 1,
                                }}
                              >
                                {t(`sections.projects.${item.id}.name`)}
                              </Typography>
                            </Box>
                            {isSelected && (
                              <Box
                                sx={{
                                  position: 'absolute',
                                  top: 8,
                                  right: 8,
                                  width: 10,
                                  height: 10,
                                  borderRadius: '50%',
                                  bgcolor: 'var(--primary)',
                                  boxShadow: '0 0 12px var(--primary)',
                                }}
                              />
                            )}
                          </Box>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </Box>
            </Box>
          </Grid>

          {/* Indicateurs (dots) */}
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
            {projectData.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedId(index + 1)}
                style={{
                  width: index === selectedId - 1 ? 24 : 10,
                  height: 10,
                  borderRadius: 5,
                  border: 'none',
                  background: index === selectedId - 1 ? 'var(--primary)' : 'var(--accents4)',
                  cursor: 'pointer',
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={springSlow}
              />
            ))}
          </Grid>

          {/* Titre du projet sélectionné */}
          <Grid item xs={12} sx={{ ...(embedded ? { mt: -0.5 } : {}) }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                style={{ textAlign: 'center' }}
              >
                <Typography
                  variant="h6"
                  fontWeight={600}
                  sx={{
                    color: 'var(--text)',
                    letterSpacing: '0.02em',
                  }}
                >
                  {currentProject && t(`sections.projects.${currentProject.id}.name`)}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--accents6)', mt: 0.5 }}>
                  {currentProject && t(`sections.projects.${currentProject.id}.type`)}
                </Typography>
              </motion.div>
            </AnimatePresence>
          </Grid>

          {/* Panneau de présentation stylé — description + lien */}
          <Grid item xs={12} sx={{ ...(embedded ? { mt: -0.5 } : {}) }}>
            <AnimatePresence mode="wait">
              {currentProject && (
                <motion.div
                  key={selectedId}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Paper
                    elevation={0}
                    sx={{
                      maxWidth: 960,
                      mx: 'auto',
                      px: { xs: 2, sm: 4 },
                      py: embedded ? 2.5 : 3,
                      borderRadius: 1,
                      border: '1px solid var(--accents3)',
                      bgcolor: 'var(--background-card)',
                      transition: 'border-color 0.2s ease',
                      '&:hover': {
                        borderColor: 'var(--accents5)',
                      },
                    }}
                  >
                    <Stack alignItems="center" sx={{ mb: 2 }}>
                      {currentProject.id === 'dandela' && <AngolanIcon size={40} style={{ borderRadius: 4 }} />}
                      {currentProject.id === 'playpad' && <SwissIcon size={40} style={{ borderRadius: 4 }} />}
                      {(currentProject.id === 'drilldev' || currentProject.id === 'winno') && (
                        <PublicIcon sx={{ fontSize: 40, color: 'var(--primary)' }} />
                      )}
                    </Stack>
                    <Typography
                      component="p"
                      sx={{
                        color: 'var(--text)',
                        lineHeight: 1.75,
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {t(`sections.projects.${currentProject.id}.description`)}
                    </Typography>
                    <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                      <Button
                        component="a"
                        href={currentProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        variant="outlined"
                        endIcon={<OpenInNewIcon />}
                        sx={{
                          borderColor: 'var(--accents5)',
                          color: 'var(--text)',
                          fontWeight: 500,
                          px: 3,
                          py: 1.25,
                          '&:hover': {
                            borderColor: 'var(--accents6)',
                            bgcolor: 'var(--accents2)',
                          },
                        }}
                      >
                        {t('sections.projects.viewProject')}
                      </Button>
                    </Stack>
                  </Paper>
                </motion.div>
              )}
            </AnimatePresence>
          </Grid>

          {!embedded && (
            <Grid item xs={12}>
              <FooterComponent />
            </Grid>
          )}
        </Grid>
      </Container>
    </Box>
  );
}
