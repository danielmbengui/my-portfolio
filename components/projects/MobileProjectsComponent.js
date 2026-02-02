import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Button, Container, Grid, Paper, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Bounce, Slide } from 'react-awesome-reveal';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import PublicIcon from '@mui/icons-material/Public';
import FooterComponent from '@/components/footer/FooterComponent';
import { AngolanIcon, SwissIcon } from '@/components/icons/FlagIcons';

const DANDELA_ACADEMY_LOGO_URL = 'https://academy.dandela.com/images/logo.png';

const projectData = [
  { id: 'dandela', img: DANDELA_ACADEMY_LOGO_URL, link: 'https://academy.dandela.com' },
  { id: 'playpad', img: '/img/playpad/playpad_banner.png', link: 'https://playpadapp.com/' },
  { id: 'drilldev', img: '/img/drilldev/complete_logo_drilldev.png', link: 'https://drilldev.com/' },
  { id: 'winno', img: '/img/logos/winnobearzclub.png', link: 'https://winno.bearzclub.io/' },
];

export default function MobileProjectsComponent() {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(1);
  const currentProject = projectData[selectedId - 1];

  return (
    <Container
      sx={{
        height: '100vh',
        position: 'relative',
        overflowY: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      <Grid container justifyContent="center" spacing={3} pt={3} pb={10}>
        {/* Titre */}
        <Grid item xs={12} sx={{ textAlign: 'center' }}>
          <Stack spacing={1} alignItems="center">
            <Bounce triggerOnce duration={800}>
              <Typography
                component="h1"
                sx={{
                  fontSize: 26,
                  fontWeight: 800,
                  letterSpacing: '0.02em',
                  background: 'linear-gradient(135deg, var(--gold-300) 0%, var(--gold-500) 50%, var(--gold-400) 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                {t('sections.projects.title')}
              </Typography>
            </Bounce>
          </Stack>
        </Grid>

        {/* Liste des projets — cliquable */}
        <Grid item xs={12} sx={{ px: 1 }}>
          <Stack spacing={2}>
            {projectData.map((item, index) => {
              const isSelected = index + 1 === selectedId;
              return (
                <Slide key={item.id} direction="up" cascade damping={0.6} triggerOnce>
                  <motion.div
                    onClick={() => setSelectedId(index + 1)}
                    style={{ cursor: 'pointer' }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Paper
                      elevation={0}
                      sx={{
                        overflow: 'hidden',
                        borderRadius: 2,
                        border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--accents3)'}`,
                        bgcolor: 'var(--accents1)',
                        boxShadow: isSelected
                          ? '0 0 20px rgba(255, 215, 0, 0.2)'
                          : '0 4px 16px rgba(0,0,0,0.12)',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 1.5 }}>
                        <Box
                          sx={{
                            position: 'relative',
                            width: 72,
                            height: 72,
                            borderRadius: 2,
                            overflow: 'hidden',
                            flexShrink: 0,
                          }}
                        >
                          <Image
                            src={item.img}
                            alt={t(`sections.projects.${item.id}.name`)}
                            fill
                            sizes="72px"
                            style={{ objectFit: item.id === 'dandela' ? 'contain' : 'cover' }}
                          />
                        </Box>
                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography fontWeight={700} sx={{ color: 'var(--text)', fontSize: '1rem' }}>
                            {t(`sections.projects.${item.id}.name`)}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'var(--accents6)' }}>
                            {t(`sections.projects.${item.id}.type`)}
                          </Typography>
                        </Box>
                        {isSelected && (
                          <Box
                            sx={{
                              width: 8,
                              height: 8,
                              borderRadius: '50%',
                              bgcolor: 'var(--primary)',
                              flexShrink: 0,
                            }}
                          />
                        )}
                      </Box>
                    </Paper>
                  </motion.div>
                </Slide>
              );
            })}
          </Stack>
        </Grid>

        {/* Panneau de présentation — description + lien */}
        <Grid item xs={12} sx={{ px: 2 }}>
          <AnimatePresence mode="wait">
            {currentProject && (
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <Paper
                  elevation={0}
                  sx={{
                    px: 2,
                    py: 2.5,
                    borderRadius: 2,
                    border: '1px solid var(--accents3)',
                    bgcolor: 'var(--background-card)',
                    background: 'linear-gradient(145deg, var(--accents1) 0%, var(--background-card) 100%)',
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
                      lineHeight: 1.7,
                      fontSize: '0.95rem',
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {t(`sections.projects.${currentProject.id}.description`)}
                  </Typography>
                  <Stack direction="row" justifyContent="center" sx={{ mt: 2 }}>
                    <Button
                      component="a"
                      href={currentProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="outlined"
                      size="medium"
                      endIcon={<OpenInNewIcon />}
                      fullWidth
                      sx={{
                        borderColor: 'var(--primary)',
                        color: 'var(--primary)',
                        fontWeight: 700,
                        py: 1.25,
                        '&:hover': {
                          borderColor: 'var(--primary)',
                          bgcolor: 'var(--primary-opacity)',
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

        <Grid item xs={12}>
          <FooterComponent />
        </Grid>
      </Grid>
    </Container>
  );
}
