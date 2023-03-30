import React, { useRef } from 'react';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import Chatbot from 'react-chatbot-kit';
//import config from '../utility/chatbot/config';
import ActionProvider from '../utility/chatbot/ActionProvider';
import MessageParser from '../utility/chatbot/MessageParser';
import LinksBar from '../components/layouts/LinksBar';
import SectionsBar from '../components/layouts/SectionsBar';
import useWindowSize from '../hooks/useWindowSize';
import { Box } from '@mui/system';
import MobileHeader from '../components/layouts/MobileHeader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, LANGAGE_FRENCH, LANGAGE_ENGLISH, _MY_PROFILE_, PAGE_LINK_CHAT_BOT, PAGE_LINK_RESUME, NAMESPACE_LANGAGE_HOME, THEME_DARK, THEME_LIGHT } from '@/_mocks_/_settings_items_';

import { createChatBotMessage } from 'react-chatbot-kit';
import Options from '../components/molecules/Options';
import ExperienceCards from '../components/organisms/ExperienceCards';
import ProjectCards from '../components/organisms/ProjectCards';
import SkillCards from '../components/organisms/SkillCards';
import BlogCards from '../components/organisms/BlogCards';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useLangMode } from '../contexts/LangModeProvider';
import FrenchChatbot from '../components/chatbot/FrenchChatbot';
import EnglishChatbot from '../components/chatbot/EnglishChatbot';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, ButtonBase, Container, Drawer, Grid, Paper, Popover, Stack, useTheme } from '@mui/material';
import StyledBadge from '../components/atoms/StyledBadge';
import { grey, blue } from '@mui/material/colors';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import SelectLangageComponent from "../components/contexts/SelectLangageComponent"
import SwitchThemeComponent from '../components/contexts/SwitchThemeComponent';
import { CssBaseline } from '@mui/material';
import DesktopContent from '../components/layouts/DesktopContent';
import MobileLinksBar from '../components/layouts/MobileLinksBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MobileSectionsBar from '../components/layouts/MobileSectionsBar';
import Link from 'next/link';
import { ResumeIcon } from '@/components/icons/IconMaterialUi';
import { AndroidIcon, AndroidStudioIcon, CssIcon, HtmlIcon, JavascriptIcon, MaterialUiIcon, MomentJsIcon, NextJsIcon, NodeJsIcon, PhotoshopIcon, PwaIcon, ReactIcon, SpyderIcon, SwrIcon, VisualStudioIcon } from '@/components/icons/IconifiyIcons';
import { motion, AnimatePresence } from "framer-motion"
import { Fade, Bounce } from "react-awesome-reveal";
import { useDeviceMode } from '@/contexts/DeviceModeProvider';


export function WebAppBar() {
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <Box sx={{background:'transparent'}}>
      <AppBar position="fixed" sx={{background:'var(--background-menu)'}}>
        <Toolbar 
        sx={{ background: 'transparent' }}
        >
          <Stack direction={'row'} justifyContent={'center'} spacing={1} alignItems={'center'} sx={{
            width: '100%',
            //background:'pink'
          }}>
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
                  <Avatar src="/me-no-back.png" sx={{ width: 40, height: 40, background: 'var(--primary)' }} />
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



const WebHome = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [lang,] = useLangMode();
  const refProgramm = useRef();
  const [positionVisualStudio, setPositionVisualStudio] = useState({
    x:0,
    y: 0
  })


  const [isVisible, setIsVisible] = useState(true);
  const [currentImageProg, setCurrentImageProg] = useState(0);
  const [currentImageFramework, setCurrentImageFramework] = useState(0);
  const [currentImageSoftware, setCurrentImageSoftware] = useState(0);
const imgProg = [
  <JavascriptIcon size={60} />,
  <HtmlIcon size={60} />,
  <NodeJsIcon size={70} />,  
]

const imgFramework = [ 
  <ReactIcon size={60} />,
  <MaterialUiIcon size={60} />,
  <PwaIcon size={70} />,  
]

const imgSoftware = [
  <NextJsIcon size={60} />,
  <CssIcon size={60} />,
  <VisualStudioIcon size={60} />,
]

useEffect(() => {
    
  const interval = setInterval(() => {
    setCurrentImageProg((prevImage) => (prevImage + 1) % imgProg.length);
    setCurrentImageFramework((prevImage) => (prevImage + 1) % imgFramework.length);
    setCurrentImageSoftware((prevImage) => (prevImage + 1) % imgSoftware.length);
}, 3000);
return () => clearInterval(interval);

}, [])



  const [x, setX] = useState(0);

  useEffect(() => {
    
    const interval = setInterval(() => {
    const _position = positionVisualStudio;
    _position.x += 100;
    if (_position.x >= window.innerWidth) {
      _position.x = 0;
      //setX(0);
    } else {
      //setX(_position.x);
    }
    //setPositionVisualStudio(_position);
    
    //_position.x += 10;
    //setSeconds(_seconds);
    //setSeconds(_seconds);
    //console.log("NEw position" ,_position.x, window.innerWidth)
    //console.log("Width stack" ,refProgramm.current.style.width)

    
}, 1000);
  return () => clearInterval(interval);
  
  }, [])
  return (
    <Box sx={{
      height:'100%',
      position:'relative',
      //my:30,
      //mb:50,
      overflowY:'scroll',
      //backgroundColor: `rgba(${theme.palette.mode === THEME_LIGHT ? '255,255,255' : '0,0,0'}, 0.7)`, /* Black w/opacity/see-through */
      //opacity:0.5,
      //zIndex:0
      //mt: 3,
      //paddingBottom: 100
    }}>
      <div style={{
        position:'absolute',
        top:0,
        left:0,
        right:0,
        bottom:0,
        //paddingTop:50
        //background:'red',
        
        //opacity:1,
        //zIndex:10000
        //opacity:0.5
        
      }}>
        <Stack 
      //mb={50}
      py={10}
      justifyContent={'center'} alignItems={'center'} 
      sx={{
        opacity:1,
        
        //background:'cyan'
        }}>
<Stack p={1} mt={3} mb={1} direction={'row'} spacing={1} alignItems={'center'} justifyContent={'center'} sx={{
//background:'green',
//background:'cyan',
//width:'100%',
borderRadius: 10
}}>
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
      margin:'auto',
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
      scale:index === currentImageProg ? 2 : 1,
    }}
    transition={{ duration: 1 }}
    style={{
      position: 'absolute',
      //background:'yellow',
      top:0,
      bottom:0,
      left:0,
      right:0,
      //textAlign:'center'
    }}
  >
    <Stack justifyContent={'center'} alignItems={'center'} sx={{
      width:'100%',
      height:'100%'
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
      margin:'auto',
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
      top:0,
      bottom:0,
      left:0,
      right:0,
      //textAlign:'center'
    }}
  >
    <Stack justifyContent={'center'} alignItems={'center'} sx={{
      width:'100%',
      height:'100%'
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
      margin:'auto',
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
      top:0,
      bottom:0,
      left:0,
      right:0,
      //textAlign:'center'
    }}
  >
    <Stack justifyContent={'center'} alignItems={'center'} sx={{
      width:'100%',
      height:'100%'
    }}>
    {image}
    </Stack>
  </motion.div>
         ))}
</Grid>
       </AnimatePresence>
</Stack>

</Stack>
        <Stack alignItems={'center'} spacing={1} mb={2}>
        <Bounce duration={3000}>
        <Paper 
        //elevation={theme.palette.mode === THEME_LIGHT ? 16 : 0} 
        sx={{
          p:1,
          //px:2,
          borderRadius:'50%',
          border:'3px solid var(--primary)',
          background:'transparent'
        }}>
        <Avatar src="/me-no-back.png" 
        sx={{ width: 150, height: 150, }}
         />
          </Paper>
        </Bounce>
        
        <SelectLangageComponent/>
        </Stack>
     

          <Stack alignItems={'start'} sx={{
            display:'none',
            width:1920 / 3,
            height:1080 / 3,
            background:'yellow'}}>
          <video width="100%" height="100%" style={{
            objectFit:'fill'
          }} controls>
<source src="/videos/home.mp4" type="video/mp4" />
Your browser does not support the video tag.
</video>
          </Stack>

          <Stack my={5} p={1} alignItems={'center'}>
          <Link href={PAGE_LINK_CHAT_BOT} target={'_blank'}>
            <Button sx={{color:'var(--text)'}} startIcon={<ResumeIcon />} variant='contained'>{t('buttons.goChat',{ns:NAMESPACE_LANGAGE_HOME})}</Button>
          </Link>
          <Link href={PAGE_LINK_RESUME} target={'_blank'}>
            <Button sx={{color:'var(--text)'}}>{t('buttons.goCv',{ns:NAMESPACE_LANGAGE_HOME})}</Button>
          </Link>
          </Stack>

          
      </Stack>
      </div>
    </Box>
  );
};

const MobileHome = () => {
  const { t } = useTranslation();
  const [lang,] = useLangMode();
  const [config, setConfig] = useState({
    botName: 'Jeffrey Yu',
    initialMessages: [
      createChatBotMessage(
        t('welcome'),
        {
          widget: 'moodOptions',
        }
      ),
    ],
    // customStyles: {
    //   botMessageBox: {
    //     backgroundColor: '#147efb',
    //   },
    //   chatButton: {
    //     backgroundColor: '#147efb',
    //   },
    // },
    widgets: [
      {
        widgetName: 'moodOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options actionProvider={actionProvider} getOptions={getMoodOptions} />
        ),
      },
      {
        widgetName: 'jokeOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options actionProvider={actionProvider} getOptions={getJokeOptions} />
        ),
      },
      {
        widgetName: 'personalOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options
            actionProvider={actionProvider}
            getOptions={getPersonalOptions}
          />
        ),
      },
      {
        widgetName: 'experienceOptions',
        widgetFunc: () => <ExperienceCards />,
      },
      {
        widgetName: 'projectsOptions',
        widgetFunc: () => <ProjectCards />,
      },
      {
        widgetName: 'skillsOptions',
        widgetFunc: () => <SkillCards />,
      },
      {
        widgetName: 'blogsOptions',
        widgetFunc: () => <BlogCards />,
      },
    ],
  });
  /*
  const config = {
    botName: 'Jeffrey Yu',
    initialMessages: [
      createChatBotMessage(
        t('welcome'),
        {
          widget: 'moodOptions',
        }
      ),
    ],
    // customStyles: {
    //   botMessageBox: {
    //     backgroundColor: '#147efb',
    //   },
    //   chatButton: {
    //     backgroundColor: '#147efb',
    //   },
    // },
    widgets: [
      {
        widgetName: 'moodOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options actionProvider={actionProvider} getOptions={getMoodOptions} />
        ),
      },
      {
        widgetName: 'jokeOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options actionProvider={actionProvider} getOptions={getJokeOptions} />
        ),
      },
      {
        widgetName: 'personalOptions',
        widgetFunc: ({ actionProvider }) => (
          <Options
            actionProvider={actionProvider}
            getOptions={getPersonalOptions}
          />
        ),
      },
      {
        widgetName: 'experienceOptions',
        widgetFunc: () => <ExperienceCards />,
      },
      {
        widgetName: 'projectsOptions',
        widgetFunc: () => <ProjectCards />,
      },
      {
        widgetName: 'skillsOptions',
        widgetFunc: () => <SkillCards />,
      },
      {
        widgetName: 'blogsOptions',
        widgetFunc: () => <BlogCards />,
      },
    ],
  };
  */

  useEffect(() => {
    /*
    setConfig({
      botName: 'Jeffrey Yu',
      initialMessages: [
        createChatBotMessage(
          t('welcome'),
          {
            widget: 'moodOptions',
          }
        ),
      ],
      // customStyles: {
      //   botMessageBox: {
      //     backgroundColor: '#147efb',
      //   },
      //   chatButton: {
      //     backgroundColor: '#147efb',
      //   },
      // },
      widgets: [
        {
          widgetName: 'moodOptions',
          widgetFunc: ({ actionProvider }) => (
            <Options actionProvider={actionProvider} getOptions={getMoodOptions} />
          ),
        },
        {
          widgetName: 'jokeOptions',
          widgetFunc: ({ actionProvider }) => (
            <Options actionProvider={actionProvider} getOptions={getJokeOptions} />
          ),
        },
        {
          widgetName: 'personalOptions',
          widgetFunc: ({ actionProvider }) => (
            <Options
              actionProvider={actionProvider}
              getOptions={getPersonalOptions}
            />
          ),
        },
        {
          widgetName: 'experienceOptions',
          widgetFunc: () => <ExperienceCards />,
        },
        {
          widgetName: 'projectsOptions',
          widgetFunc: () => <ProjectCards />,
        },
        {
          widgetName: 'skillsOptions',
          widgetFunc: () => <SkillCards />,
        },
        {
          widgetName: 'blogsOptions',
          widgetFunc: () => <BlogCards />,
        },
      ],
    })
    */
  }, [lang])

  return (
    <div style={{
      paddingTop: 10
    }}>

      {
        lang && lang === LANGAGE_FRENCH && <FrenchChatbot />
      }

      {
        lang && lang === LANGAGE_ENGLISH && <EnglishChatbot />
      }
    </div>
  );
};

export default function HomePage() {
  const theme = useTheme();
  const { width } = useWindowSize();
  const { t } = useTranslation();
const {isMobile} = useDeviceMode();
  return (
    <div style={{
      //background:'red', 
      //paddingTop:20,
      //backgroundImage: `url('/img/home/background-${theme.palette.mode}.gif')`,
      backgroundSize:'cover',
      backgroundRepeat:'no-repeat',
      //background:theme.palette.background.default,
    overflow:'scroll', position:'absolute', bottom:0, top:0, left:0, right:0}}>
    <Head>
    <title>{t('titlePage', {ns:NAMESPACE_LANGAGE_HOME})}</title>
        <meta
          name="description"
          content={t('descriptionPage', {ns:NAMESPACE_LANGAGE_HOME})}
        />
    </Head>
      
      <WebAppBar />
      <CssBaseline />
      <WebHome />
     

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