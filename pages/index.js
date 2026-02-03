import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Box } from '@mui/system';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, _MY_PROFILE_, _NAMESPACE_LANGAGE_HOME_, _WEBSITE_ADDRESS_, _NEXTJS_LINK_, _PAGE_LINK_CV_ } from '@/_mocks_/_settings_items_';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { Avatar, Button, Grid, Stack, Tooltip, Typography } from '@mui/material';
import FloatingQuickMenu from "@/components/contexts/FloatingQuickMenu";
import { CssBaseline } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DescriptionIcon from '@mui/icons-material/Description';
import ProjectsComponent from '@/components/projects/ProjectsComponent';
import LanguagesComponent from '@/components/languages/LanguagesComponent';
import WhatDefinesMeComponent from '@/components/whatDefinesMe/WhatDefinesMeComponent';
import UniverseAndValuesComponent from '@/components/universeAndValues/UniverseAndValuesComponent';
import ContactMeComponent from '@/components/contactMe/ContactMeComponent';
import SkillsComponent from '@/components/skills/SkillsComponent';
import { PlayStoreIcon, IosIcon, AndroidIcon, XCodeIcon, FlutterIcon, CssIcon, HtmlIcon, JavascriptIcon, MaterialUiIcon, NextJsIcon, NodeJsIcon, PwaIcon, ReactIcon, VisualStudioIcon, BitcoinIcon, EthereumIcon, CursorIcon } from '@/components/icons/IconifiyIcons';
import { motion, AnimatePresence } from "framer-motion";
import { MY_AVATAR_BLACK_AND_WHITE } from "@/constants";
import AiAssistant from '@/components/assistant/AiAssistant';

export const WebHome = ({ currentYear }) => {
  const { t } = useTranslation();

  const [currentImageProg, setCurrentImageProg] = useState(0);
  const [currentImageFramework, setCurrentImageFramework] = useState(0);
  const [currentImageSoftware, setCurrentImageSoftware] = useState(0);

  // Fonction pour mélanger un tableau aléatoirement
  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  // Initialiser les tableaux mélangés une seule fois au montage
  const [imgProg] = useState(() => shuffleArray([
    <JavascriptIcon size={60} key="js" />,
    <HtmlIcon size={60} key="html" />,
    <NodeJsIcon size={70} key="node" />,
    <AndroidIcon size={70} key="android" />,
    <BitcoinIcon size={65} key="btc" />,
  ]));

  const [imgFramework] = useState(() => shuffleArray([
    <ReactIcon size={60} key="react" />,
    <MaterialUiIcon size={60} key="mui" />,
    <PwaIcon size={70} key="pwa" />,
    <XCodeIcon size={60} key="xcode" />,
    <EthereumIcon size={65} key="eth" />,
  ]));

  const [imgSoftware] = useState(() => shuffleArray([
    <NextJsIcon size={60} key="next" />,
    <CssIcon size={60} key="css" />,
    <VisualStudioIcon size={60} key="vscode" />,
    <FlutterIcon size={50} key="flutter" />,
    <CursorIcon size={60} key="cursor" />,
  ]));




  useEffect(() => {

    const interval = setInterval(() => {
      setCurrentImageProg((prevImage) => (prevImage + 1) % imgProg.length);
      setCurrentImageFramework((prevImage) => (prevImage + 1) % imgFramework.length);
      setCurrentImageSoftware((prevImage) => (prevImage + 1) % imgSoftware.length);
    }, 3000);
    return () => clearInterval(interval);

  }, [])


  return (
    <Box
      sx={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'auto',
        background: 'var(--background)',
        '&::before': {
          content: '""',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(ellipse 50% 30% at 100% 50%, var(--accents2), transparent), radial-gradient(ellipse 50% 30% at 0% 50%, var(--accents2), transparent)',
          pointerEvents: 'none',
          zIndex: 0,
        },
      }}
    >
      <Box sx={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Stack
          pt={3.5}
          pb={{ xs: 6, sm: 8 }}
          px={{ xs: 2, sm: 3 }}
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: 960, mx: 'auto', width: '100%', boxSizing: 'border-box' }}
        >

          <Stack alignItems="center" spacing={2} my={0}>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'var(--primary)',
                fontWeight: 400,
                letterSpacing: '0.04em',
                fontSize: '1.15rem',
                mt: 3,
              }}
            >
              {t('userPosition', { ns: _NAMESPACE_LANGAGE_HOME_ })}
            </Typography>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Avatar
                src={MY_AVATAR_BLACK_AND_WHITE}
                sx={{
                  width: { xs: 96, sm: 120 },
                  height: { xs: 96, sm: 120 },
                  border: '1px solid var(--accents3)',
                  bgcolor: 'var(--background-card)',
                }}
              />
            </motion.div>
            <Typography
              component="span"
              sx={{
                color: 'var(--text)',
                fontWeight: 600,
                letterSpacing: '0.02em',
                fontSize: { xs: '1rem', sm: '1.3rem' },
                textAlign: 'center',
              }}
            >
              MBENGUI Daniel Slaver
            </Typography>

            {/* Tech stack — icônes rotatives */}
            <Stack py={{ xs: 1.5, sm: 2 }} direction="row" spacing={{ xs: 1, sm: 2 }} alignItems="center" justifyContent="center" flexWrap="wrap" useFlexGap sx={{ gap: { xs: 1, sm: 2 } }}>
              <Stack justifyContent={'center'} alignItems={'center'} sx={{
                position: 'relative',
                width: { xs: 64, sm: 80 },
                height: { xs: 64, sm: 80 },
                objectFit: 'cover',
              }}>
                <AnimatePresence style={{
                  position: 'relative',
                  //background:'red',
                  margin: 'auto',
                  objectFit: 'cover',
                }}>
                  <Grid container justifyContent={'center'} alignItems={'center'}>
                    {imgProg.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageProg ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        //transition={{ duration: 0.5 }}
                        whileTap={{
                          scale: index === currentImageProg ? 2 : 1,
                        }}
                        transition={{ duration: 1 }}
                        style={{
                          position: 'absolute',
                          //background:'yellow',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          //textAlign:'center'
                        }}
                      >
                        <Stack justifyContent={'center'} alignItems={'center'} sx={{
                          width: '100%',
                          height: '100%'
                        }}>
                          {image}
                        </Stack>
                      </motion.div>
                    ))}
                  </Grid>
                </AnimatePresence>
              </Stack>

              <Stack justifyContent={'center'} alignItems={'center'} sx={{
                position: 'relative',
                width: { xs: 64, sm: 80 },
                height: { xs: 64, sm: 80 },
                objectFit: 'cover',
              }}>
                <AnimatePresence style={{
                  position: 'relative',
                  margin: 'auto',
                  objectFit: 'cover',
                }}>
                  <Grid container justifyContent={'center'} alignItems={'center'}>
                    {imgFramework.map((image, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageFramework ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        //transition={{ duration: 0.5 }}
                        transition={{ duration: 1 }}
                        whileTap={{
                          scale: index === currentImageFramework ? 2 : 1,
                        }}
                        style={{
                          position: 'absolute',
                          //background:'yellow',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          //textAlign:'center'
                        }}
                      >
                        <Stack justifyContent={'center'} alignItems={'center'} sx={{
                          width: '100%',
                          height: '100%'
                        }}>
                          {image}
                        </Stack>
                      </motion.div>
                    ))}
                  </Grid>
                </AnimatePresence>
              </Stack>

              <Stack justifyContent={'center'} alignItems={'center'} sx={{
                position: 'relative',
                width: { xs: 64, sm: 80 },
                height: { xs: 64, sm: 80 },
                objectFit: 'cover',
              }}>
                <AnimatePresence style={{
                  position: 'relative',
                  margin: 'auto',
                  objectFit: 'cover',
                }}>
                  <Grid container justifyContent={'center'} alignItems={'center'}>
                    {imgSoftware.map((image, index) => (
                      <motion.div
                        key={'img-software-' + index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: index === currentImageSoftware ? 1 : 0 }}
                        exit={{ opacity: 0 }}
                        //transition={{ duration: 0.5 }}
                        transition={{ duration: 1 }}
                        whileTap={{
                          scale: index === currentImageSoftware ? 2 : 1,
                        }}
                        style={{
                          position: 'absolute',
                          //background:'yellow',
                          top: 0,
                          bottom: 0,
                          left: 0,
                          right: 0,
                          //textAlign:'center'
                        }}
                      >
                        <Stack justifyContent={'center'} alignItems={'center'} sx={{
                          width: '100%',
                          height: '100%'
                        }}>
                          {image}
                        </Stack>
                      </motion.div>
                    ))}
                  </Grid>
                </AnimatePresence>
              </Stack>
            </Stack>

            <Stack spacing={2.5} alignItems={'center'}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} alignItems="center">
                {/* CTA — découvrir les projets */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    component="button"
                    onClick={() => document.getElementById('projects-section')?.scrollIntoView({ behavior: 'smooth' })}
                    endIcon={
                    <ArrowForwardIcon
                      sx={{
                        fontSize: 20,
                        ml: 0.25,
                        transition: 'transform 0.25s ease',
                      }}
                    />
                  }
                  sx={{
                    mt: 2.5,
                    px: 3.5,
                    py: 1.75,
                    borderRadius: '999px',
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: { xs: '0.9rem', sm: '1rem' },
                    letterSpacing: '0.02em',
                    background: 'linear-gradient(135deg, var(--gold-400) 0%, var(--gold-500) 100%)',
                    color: 'var(--text-secondary)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    boxShadow: '0 4px 20px var(--primary-opacity), inset 0 1px 0 rgba(255,255,255,0.2)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, var(--gold-300) 0%, var(--gold-400) 100%)',
                      borderColor: 'rgba(255, 215, 0, 0.5)',
                      boxShadow: '0 8px 28px var(--primary-opacity), inset 0 1px 0 rgba(255,255,255,0.25)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover .MuiButton-endIcon': {
                      transform: 'translateX(4px)',
                    },
                    '& .MuiButton-endIcon': {
                      transition: 'transform 0.25s ease',
                    },
                  }}
                >
                  {t('buttons.discoverProjects', { ns: _NAMESPACE_LANGAGE_HOME_ })}
                </Button>
              </motion.div>
                {/* CTA — voir le CV */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    component={Link}
                    href={_PAGE_LINK_CV_}
                    startIcon={<DescriptionIcon sx={{ fontSize: 20 }} />}
                    sx={{
                      mt: 2.5,
                      px: 3.5,
                      py: 1.75,
                      borderRadius: '999px',
                      textTransform: 'none',
                      fontWeight: 600,
                      fontSize: { xs: '0.9rem', sm: '1rem' },
                      letterSpacing: '0.02em',
                      border: '2px solid var(--primary)',
                      color: 'var(--primary)',
                      background: 'transparent',
                      '&:hover': {
                        background: 'var(--primary-opacity)',
                        borderColor: 'var(--primary)',
                        color: 'var(--primary)',
                      },
                    }}
                  >
                    {t('buttons.goCv', { ns: _NAMESPACE_LANGAGE_HOME_ })}
                  </Button>
                </motion.div>
              </Stack>

              {/* Vidéo de présentation — animation boom (arrive de loin, grossit, puis taille normale) */}
              <Box
                component={motion.div}
                initial={{ scale: 0.15, opacity: 0.5 }}
                animate={{
                  scale: [0.15, 1.12, 1],
                  opacity: [0.5, 1, 1],
                }}
                transition={{
                  duration: 1.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  times: [0, 0.65, 1],
                }}
                sx={{
                  width: '100%',
                  maxWidth: { xs: 340, sm: 520, md: 640 },
                  mt: 3,
                  borderRadius: 2,
                  overflow: 'hidden',
                  border: '1px solid var(--accents3)',
                  bgcolor: 'var(--background-card)',
                }}
              >
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  controlsList="nodownload"
                  disablePictureInPicture
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                >
                  <source src="/assets/videos/presentation.mp4" type="video/mp4" />
                </video>
              </Box>
            </Stack>
          </Stack>

          {/* Langues — titre, sous-titre et accordéons (même composant que /portfolio/languages) */}
          <LanguagesComponent embedded />

          {/* Ce qui me définit — 4 vidéos avec titres et descriptions */}
          <WhatDefinesMeComponent embedded />

          {/* Mon univers et mes valeurs — 4 vidéos capsule (valeurs, qualités) */}
          <UniverseAndValuesComponent embedded />

          {/* Projets — carousel 3D + présentation (même composant que /portfolio/projects) */}
          <Box id="projects-section" component="section" sx={{ scrollMarginTop: 24 }}>
            <ProjectsComponent embedded />
          </Box>

          {/* Contacte-moi — email, LinkedIn, GitHub, Play Store */}
          <ContactMeComponent embedded />

          {/* Compétences — pills de catégories + cartes (même composant que /portfolio/skills, sans carousel) */}
          <SkillsComponent embedded />
        </Stack>
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
              <Tooltip sx={{
                zIndex: 1
              }} title={t('sendMeMail')} placement="top">
                <a href={`mailto:${_MY_PROFILE_.mail}`} className="btn btn-icon btn-sm" style={{
                  background: 'var(--primary)',
                  color: 'var(--text-secondary)'
                }}>
                  <ion-icon name="mail"></ion-icon>
                </a>
              </Tooltip>

              <Tooltip sx={{
                zIndex: 1
              }} title={t('profileLinkedin')} placement="top">
                <a href={_MY_PROFILE_.socials.linkedin} target='_blank' className="btn btn-icon btn-sm" style={{
                  background: 'var(--blue-linkedin)',
                  color: 'white'
                }}>
                  <ion-icon name="logo-linkedin"></ion-icon>
                </a>
              </Tooltip>

              <Tooltip sx={{
                zIndex: 1
              }} title={t('profileGithub')} placement="top">
                <a href={_MY_PROFILE_.socials.github} target='_blank' className="btn btn-icon btn-sm" style={{
                  background: 'black',
                  color: 'white'
                }}>
                  <ion-icon name="logo-github"></ion-icon>
                </a>
              </Tooltip>

              <Tooltip sx={{ zIndex: 1 }} title={t('profilePlaystore')} placement="top">
                <a href={_MY_PROFILE_.socials.playstore} target="_blank" className="btn btn-icon btn-sm" style={{ background: 'white' }}>
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
                {t('footer.deployedWith')} <a href={_NEXTJS_LINK_} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Next.js <NextJsIcon size={14} /></a> & <a href="https://cursor.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Cursor <CursorIcon size={14} /></a>
              </div>
              <div>
                {t('footer.copyright')} <span>{currentYear === 2023 ? '2023' : `2023–${currentYear}`}</span> {_WEBSITE_ADDRESS_}
              </div>
              <div>{t('footer.allRightsReserved')}</div>
            </Stack>
          </Stack>
        </footer>
      </Box>
    </Box>
  );
};

export default function HomePage() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <div style={{
      background: 'var(--background)',
      overflowX: 'hidden',
      overflowY: 'auto',
      WebkitOverflowScrolling: 'touch',
      position: 'relative',
      minHeight: '100vh',
      width: '100%',
    }}>
      <Head>
        <title>{t('titlePage', { ns: _NAMESPACE_LANGAGE_HOME_ })}</title>
        <meta
          name="description"
          content={t('descriptionPage', { ns: _NAMESPACE_LANGAGE_HOME_ })}
        />
      </Head>


      <CssBaseline />
      <WebHome currentYear={currentYear} />

      {/* Assistant IA (bouton au-dessus du menu) + Menu rapide fixe */}
      <AiAssistant />
      <FloatingQuickMenu />
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
