import React, { useRef } from 'react';
import Head from 'next/head';
import useWindowSize from '../hooks/useWindowSize';
import { Box } from '@mui/system';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, _MY_PROFILE_, _PAGE_LINK_RESUME_, _NAMESPACE_LANGAGE_HOME_, _NAMESPACE_LANGAGE_COMMON_, _WEBSITE_ADDRESS_, _NEXTJS_LINK_ } from '@/_mocks_/_settings_items_';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useLangMode } from '../contexts/LangModeProvider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Avatar, Container, Drawer, Grid, Paper, Stack, Tooltip, useTheme } from '@mui/material';
import StyledBadge from '../components/atoms/StyledBadge';
import FloatingQuickMenu from "@/components/contexts/FloatingQuickMenu"
import SwitchThemeComponent from '../components/contexts/SwitchThemeComponent';
import { CssBaseline } from '@mui/material';
import MobileLinksBar from '../components/layouts/MobileLinksBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MobileSectionsBar from '../components/layouts/MobileSectionsBar';
import ProjectsComponent from '@/components/projects/ProjectsComponent';
import LanguagesComponent from '@/components/languages.js/LanguagesComponent';
import SkillsComponent from '@/components/skills/SkillsComponent';
import {PlayStoreIcon, AndroidIcon,XCodeIcon,FlutterIcon, CssIcon, HtmlIcon, JavascriptIcon, MaterialUiIcon, NextJsIcon, NodeJsIcon, PwaIcon, ReactIcon, VisualStudioIcon, BitcoinIcon, EthereumIcon, CursorIcon } from '@/components/icons/IconifiyIcons';
import { motion, AnimatePresence } from "framer-motion";
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import Image from 'next/image';
import {MY_AVATAR_BLACK_AND_WHITE, MY_AVATAR_COLOR} from "@/constants";
//const MY_AVATAR = "/me-black-and-white.png";
//const MY_AVATAR = "/me-no-back.png";
//import 'ionicons/dist/ionicons/ionicons.esm.js';

export function WebAppBar() {
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <Box sx={{ background: 'transparent' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: 'var(--background-menu)',
          backdropFilter: 'saturate(180%) blur(12px)',
          borderBottom: '1px solid var(--accents3)',
        }}
      >
        <Toolbar sx={{ background: 'transparent', minHeight: { xs: 56, sm: 64 } }}>
          <Stack direction="row" justifyContent="center" spacing={1} alignItems="center" sx={{ width: '100%' }}>
            <SwitchThemeComponent />
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export function MobileAppBar() {
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [linksBarOpen, setLinksBarOpen] = useState(false);
  const [sectionBarOpen, setSectionBarOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <Box sx={{}}>
      <AppBar position="static">
        <Toolbar sx={{ background: theme.palette.background.paper }}>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{
            width: '100%',
            //background:'pink'
          }}>
            <div>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                //sx={{ mr: 2 }}
                //onClick={() => setPopoverOpen(!popoverOpen)}
                onClick={() => setLinksBarOpen(!linksBarOpen)}
                ref={avatarRef}
              >
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar src={MY_AVATAR_COLOR} sx={{ width: 40, height: 40, background: 'var(--primary)' }} />
                </StyledBadge>

                <Drawer
                  anchor="left"
                  open={linksBarOpen}
                  onClose={() => setLinksBarOpen(false)}
                  PaperProps={{ sx: { padding: '20px', width: 'fit-content' } }}
                >
                  <MobileLinksBar />
                </Drawer>


              </IconButton>
            </div>
            <div>
              <Stack direction={'row'} spacing={1} justifyContent={'center'} alignItems={'center'} sx={{
                //background: 'red',
                //mx:'auto',
                //width: '100%'
              }}>
                <SelectLangageComponent
                />
                <SwitchThemeComponent />
              </Stack>
            </div>
            <div>
              <Box
                component={IconButton}
                onClick={() => setSectionBarOpen(!sectionBarOpen)}
              >
                <MenuRoundedIcon />
              </Box>
              <Drawer
                anchor="right"
                open={sectionBarOpen}
                onClose={() => setSectionBarOpen(false)}
                PaperProps={{
                  sx: {
                    paddingLeft: '5px',
                    paddingRight: '20px',
                    paddingY: '10px',
                    width: 'fit-content',
                  },
                }}
              >
                <MobileSectionsBar />
              </Drawer>
            </div>
          </Stack>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

const getMoodOptions = (actionProvider) => {
  return [
    {
      text: 'Doing great! Tell me about yourself',
      handler: () => actionProvider.handleGoodMood(),
      id: 1,
    },
    {
      text: 'Having a bad day...',
      handler: () => actionProvider.handleBadMood(),
      id: 2,
    },
  ];
};

const getJokeOptions = (actionProvider) => {
  return [
    {
      text: "LOL that's funny",
      handler: () => actionProvider.handleGoodMoodFinally(),
      id: 1,
    },
    {
      text: 'Tell me another one',
      handler: () => actionProvider.handleBadMoodAgain(),
      id: 2,
    },
  ];
};

const getPersonalOptions = (actionProvider) => {
  return [
    {
      text: 'Experience',
      handler: () => actionProvider.handleExperience(),
      id: 1,
    },
    {
      text: 'Projects',
      handler: () => actionProvider.handleProjects(),
      id: 2,
    },
    {
      text: 'Skills',
      handler: () => actionProvider.handleSkills(),
      id: 3,
    },
    {
      text: 'Blogs',
      handler: () => actionProvider.handleBlogs(),
      id: 4,
    },
  ];
};

export const WebHome = ({currentYear}) => {
  //const currentYear = {param};
  const { t } = useTranslation();
  const theme = useTheme();
  const [lang,] = useLangMode();
  const { isMobile, isTablet } = useDeviceMode();


  //const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [isVisible, setIsVisible] = useState(true);
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
          pt={{ xs: 5.5, sm: 7 }}
          pb={8}
          px={3}
          justifyContent="center"
          alignItems="center"
          sx={{ maxWidth: 960, mx: 'auto', width: '100%' }}
        >
          {/* Tech stack — icônes rotatives */}
          <Stack py={2} direction="row" spacing={2} alignItems="center" justifyContent="center" flexWrap="wrap" useFlexGap sx={{ gap: 2 }}>
            <Stack justifyContent={'center'} alignItems={'center'} style={{
              position: 'relative',
              //background:'cyan',
              //top: 0,
              //left: 0,
              width: 80,
              height: 80,
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

            <Stack justifyContent={'center'} alignItems={'center'} style={{
              position: 'relative',
              //background:'cyan',
              //top: 0,
              //left: 0,
              width: 80,
              height: 80,
              objectFit: 'cover',
            }}>
              <AnimatePresence style={{
                position: 'relative',
                //background:'red',
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

            <Stack justifyContent={'center'} alignItems={'center'} style={{
              position: 'relative',
              //background:'cyan',
              //top: 0,
              //left: 0,
              width: 80,
              height: 80,
              objectFit: 'cover',
            }}>
              <AnimatePresence style={{
                position: 'relative',
                //background:'red',
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

          <Typography
            variant="subtitle1"
            sx={{
              color: 'var(--accents7)',
              fontWeight: 500,
              letterSpacing: '0.04em',
              fontSize: '0.85rem',
              mt: 3,
            }}
          >
            {t('userPosition', { ns: _NAMESPACE_LANGAGE_HOME_ })}
          </Typography>

          <Stack alignItems="center" spacing={2} my={4}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <Avatar
                src={MY_AVATAR_COLOR}
                sx={{
                  width: 120,
                  height: 120,
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
                fontSize: '0.9rem',
                textAlign: 'center',
              }}
            >
              MBENGUI Daniel Slaver
            </Typography>
          </Stack>

          {/* Langues — titre, sous-titre et accordéons (même composant que /portfolio/languages) */}
          <LanguagesComponent embedded />

          {/* Projets — carousel 3D + présentation (même composant que /portfolio/projects) */}
          <ProjectsComponent embedded />

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
            padding: '32px 24px',
            borderTop: '1px solid var(--accents3)',
          }}
        >
          <Stack alignItems="center" spacing={3}>
            <Stack direction="row" spacing={2} alignItems="center" flexWrap="wrap" useFlexGap sx={{ gap: 2, justifyContent: 'center' }}>
            <Tooltip sx={{
              zIndex: 1
            }} open={false} title={t('seeMyCV')} placement="top">
              <a href={`/${lang}${_PAGE_LINK_RESUME_}`} target='_blank' className="btn btn-icon btn-sm" style={{
                background: 'var(--accents6)',
                color: 'black',
                display: "none"
              }}>
                <ion-icon name="newspaper-outline"></ion-icon>
              </a>
            </Tooltip>

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
            </Stack>
            <Stack alignItems="center" spacing={0.5} sx={{ fontSize: 12, color: 'var(--accents7)' }}>
              <div>
                {t('footer.deployedWith')} <a href={_NEXTJS_LINK_} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>Next.js <NextJsIcon size={14} /></a>
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
  const theme = useTheme();
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const { isMobile } = useDeviceMode();
  const [lang] = useLangMode();
  const currentYear = new Date().getFullYear();

  return (
    <div style={{
      background: 'var(--background)',
      overflow: 'auto',
      position: 'absolute',
      inset: 0,
      minHeight: '100vh',
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

      {/* Menu rapide fixe (langue + contact) en bas à droite */}
      <FloatingQuickMenu />
    </div>
  );
  /*
  {width > 740 && <WebAppBar />}
      {width <= 740 && <MobileAppBar />}

   {width > 740 && <WebHome />}
      {width <= 740 && <MobileHome />}
  */
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
