import React, { useRef } from 'react';
import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Chatbot from 'react-chatbot-kit';
//import config from '../utility/chatbot/config';
import ActionProvider from '@/utility/chatbot/ActionProvider';
import MessageParser from '@/utility/chatbot/MessageParser';
import LinksBar from '@/components/layouts/LinksBar';
import SectionsBar from '@/components/layouts/SectionsBar';
import useWindowSize from '@/hooks/useWindowSize';
import { Box } from '@mui/system';
import MobileHeader from '@/components/layouts/MobileHeader';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, LANGAGE_FRENCH, LANGAGE_ENGLISH, _MY_PROFILE_, PAGE_LINK_CHAT_BOT, PAGE_LINK_RESUME } from '@/_mocks_/_settings_items_';

import { createChatBotMessage } from 'react-chatbot-kit';
import Options from '@/components/molecules/Options';
import ExperienceCards from '@/components/organisms/ExperienceCards';
import ProjectCards from '@/components/organisms/ProjectCards';
import SkillCards from '@/components/organisms/SkillCards';
import BlogCards from '@/components/organisms/BlogCards';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useLangMode } from '@/contexts/LangModeProvider';
import FrenchChatbot from '@/components/chatbot/FrenchChatbot';
import EnglishChatbot from '@/components/chatbot/EnglishChatbot';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Avatar, ButtonBase, Container, Drawer, Grid, Paper, Popover, Stack, useTheme } from '@mui/material';
import StyledBadge from '@/components/atoms/StyledBadge';
import { grey } from '@mui/material/colors';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

import SelectLangageComponent from "@/components/contexts/SelectLangageComponent"
import SwitchThemeComponent from '@/components/contexts/SwitchThemeComponent';
import { CssBaseline } from '@mui/material';
import DesktopContent from '@/components/layouts/DesktopContent';
import MobileLinksBar from '@/components/layouts/MobileLinksBar';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import MobileSectionsBar from '@/components/layouts/MobileSectionsBar';
import { Slide, Fade, Bounce } from "react-awesome-reveal";

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


import { motion, AnimatePresence } from "framer-motion"
import { ReactIcon } from '@/components/icons/IconifiyIcons';

export function WebAppBar() {
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
 <Box sx={{}}>
     <AppBar position="static">
    <Toolbar sx={{background:theme.palette.background.paper}}>
     <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{
      width:'100%', 
     //background:'pink'
     }}>
      <div>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        //sx={{ mr: 2 }}
        onClick={() => setPopoverOpen(!popoverOpen)}
    ref={avatarRef}
      >
                <StyledBadge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      variant="dot"
    >
      <Avatar src="/me-no-back.png" sx={{ width: 40, height: 40, background:'var(--primary)' }} />
    </StyledBadge>
  <Box
    //component={ButtonBase}
    
  >

  </Box>


      </IconButton>
      <Popover
    open={popoverOpen}
    onClose={handlePopoverClose}
    anchorEl={avatarRef.current}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    PaperProps={{
      sx: {
        border: 1,
        borderColor: grey[200],
        padding: 2,
        marginLeft: 2,
        borderRadius: '5%',
      },
    }}
    elevation={0}
  >
    <Box flex flexDirection="column">
      <Typography variant="h6">{_MY_PROFILE_.name}</Typography>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <EmailIcon />
        <Typography
          variant="span"
          sx={{ marginLeft: '8px', marginTop: '5px' }}
        >
          {_MY_PROFILE_.mail}
        </Typography>
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}
      >
        <PhoneIcon />
        <Typography
          variant="span"
          sx={{ marginLeft: '8px', marginTop: '5px' }}
        >
          {_MY_PROFILE_.phone}
        </Typography>
      </Box>
      <a
        href={PAGE_LINK_RESUME}
        target="_blank"
        rel="noreferrer"
      >
        <Button>{`See my resume`}</Button>
      </a>
      <a
        href={PAGE_LINK_CHAT_BOT}
        //target="_blank"
        rel="noreferrer"
      >
        <Button variant='contained'>{`Chat with me`}</Button>
      </a>
    </Box>
  </Popover>
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
    <Toolbar sx={{background:theme.palette.background.paper}}>
     <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{
      width:'100%', 
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
      <Avatar src="/me-no-back.png" sx={{ width: 40, height: 40, background:'var(--primary)' }} />
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

function AlertDialog({selectedId, setSelectedId}) {
    const [open, setOpen] = useState(selectedId ? true : false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedId(null);
    };
  
    return (
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Use Google's location service?" + selectedId}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Disagree</Button>
            <Button onClick={handleClose} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

const WebHome = () => {
  const {t} = useTranslation();
  const [lang, ] = useLangMode();
  const [selectedId, setSelectedId] = useState(null)
  return (
    <>
    
<Box sx={{
  py:'1vh',
      paddingBottom:100,
      fontFamily:'Coolvetica'
    }}>
      
<Stack direction={'row'} justifyContent={'space-between'}>
    <div className={styles.links}>
        <LinksBar />
      </div>
<Stack px={20} pt={5} pb={10} sx={{background:'red', width:'100%', overflowY:'scroll', height:'90vh'}}>


<Grid container justifyContent={'center'} spacing={1} sx={{background:'cyan'}}>
    <Grid item xs={12} md={6}>
    <motion.div 
    layoutId={1} 
    onClick={() => setSelectedId(1)}
    initial={false}
    whileHover={{scale: 0.9, "z-index":10000}}
    //animate={{ x: 100 }}
    >
   <Fade triggerOnce>
   <Card sx={{}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/img/skills/langs.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Langues
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`En tant qu'afro-européen, je suis fier de parler deux langues couramment. 
            Mes langues maternelles sont le lingala et le français, que j'ai apprises dès mon enfance; en plus de cela, je parle également l'anglais, 
            acquis grâce à des voyages, des études et des expériences personnelles. 
            Chaque langue que je parle représente pour moi une ouverture vers de nouvelles cultures, de nouveaux horizons et de nouvelles manières de penser. 
            Je suis convaincu que la connaissance des langues est un outil essentiel pour communiquer et comprendre le monde qui nous entoure.`}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
   </Fade>
  </motion.div>  
    </Grid>

    <Grid item xs={12} md={6}>
    <motion.div layoutId={2} onClick={() => setSelectedId(2)}>
    <Fade>
    <Card sx={{ }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/img/skills/prog.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Programmation
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Fade>
  </motion.div>  
    </Grid>

    <Grid item xs={12} md={6}>
    <Fade triggerOnce>
    <motion.div layoutId={3} onClick={() => setSelectedId(3)}>
    <Card sx={{ }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="/img/skills/frameworks.jpg"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Librairies / Outils
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </motion.div>  
    </Fade>
    </Grid>

    <Grid item xs={12} md={6}>
    <Fade triggerOnce>
    <motion.div layoutId={4} onClick={() => setSelectedId(4)}>
    <Card sx={{ }}>
      <CardActionArea>
      <AnimatePresence>
      <motion.div
    animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
   // whileHover={{scale:0.8}}
    >
        <Stack>
        <ReactIcon />
        </Stack>
    </motion.div>
      </AnimatePresence>
       
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Logiciels
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </motion.div>  
    </Fade>
    </Grid>

    <AnimatePresence>
  {selectedId && (
     <Bounce>
        <motion.div 
     layoutId={selectedId}
     animate={{ opacity: 0 }}
     transition={{duration:5}}
     >
         <AlertDialog selectedId={selectedId} setSelectedId={setSelectedId} />
       
     </motion.div>
     </Bounce>
  )}
</AnimatePresence>
</Grid>




    <div style={{paddingBottom:20, textAlign:'center'}}>
    <Fade triggerOnce cascade damping={0.3} style={{
        fontSize:30,
        fontFamily:'Coolvetica'
    }}>{t('sections.skills.title')}</Fade>
    </div>

<div style={{overflowY:'sroll'}}>
<SkillCards />
</div>
</Stack>
<div className={styles.links}>
        <SectionsBar />
      </div>
    </Stack>
</Box>
    </>
  );
};

const MobileHome = () => {
  const {t} = useTranslation();
  const [lang, ] = useLangMode();
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
      paddingTop:10
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

export default function SkillsPage() {
  const { width } = useWindowSize();
const {t} = useTranslation();

  return (
    <>      
      {width > 740 ? <WebAppBar /> : <MobileAppBar />}
    <CssBaseline />
    
    {width > 740 ? <WebHome /> : <MobileHome />}
      
    </>
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