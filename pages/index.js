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
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, LANGAGE_FRENCH, LANGAGE_ENGLISH, _MY_PROFILE_, PAGE_LINK_CHAT_BOT, PAGE_LINK_RESUME, NAMESPACE_LANGAGE_HOME } from '@/_mocks_/_settings_items_';

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
import { Avatar, ButtonBase, Container, Drawer, Paper, Popover, Stack, useTheme } from '@mui/material';
import StyledBadge from '../components/atoms/StyledBadge';
import { grey } from '@mui/material/colors';
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

export function WebAppBar() {
  const theme = useTheme();
  const avatarRef = useRef(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handlePopoverClose = () => {
    setPopoverOpen(false);
  };

  return (
    <Box sx={{}}>
      <AppBar position="static" elevation={0}>
        <Toolbar sx={{ background: 'var(--background)' }}>
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
  const [lang,] = useLangMode();
  return (
    <>

      <Box sx={{
        py: '5px',
        paddingBottom: 100
      }}>

        <Stack direction={'column'} justifyContent={'center'} alignItems={'center'} sx={{ background: 'red' }}>
          <Stack alignItems={'center'} my={3} sx={{background:'yellow'}}>
          <div>
          <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar src="/me-no-back.png" sx={{ width: 150, height: 150, background: 'var(--primary)' }} />
            </StyledBadge>
          </div>
          <SelectLangageComponent/>
          </Stack>

          <Link href={PAGE_LINK_CHAT_BOT} target={'_blank'}>
              <Button sx={{fontFamily:'Coolvetica'}}>{t('buttons.goChat',{ns:NAMESPACE_LANGAGE_HOME})}</Button>
            </Link>

            <Link href={PAGE_LINK_RESUME} target={'_blank'}>
              <Button sx={{fontFamily:'Coolvetica', color:'var(--text)'}} startIcon={<ResumeIcon />} variant='contained'>{t('buttons.goCv', {ns:NAMESPACE_LANGAGE_HOME})}</Button>
            </Link>

        </Stack>
      </Box>
    </>
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
  const { width } = useWindowSize();
  const { t } = useTranslation();

  return (
    <>
    <Head>
    <title>{t('titlePage', {ns:NAMESPACE_LANGAGE_HOME})}</title>
        <meta
          name="description"
          content={t('descriptionPage', {ns:NAMESPACE_LANGAGE_HOME})}
        />
    </Head>
      {width > 740 && <WebAppBar />}
      {width <= 740 && <MobileAppBar />}
      <CssBaseline />

      {width > 740 && <WebHome />}
      {width <= 740 && <MobileHome />}

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