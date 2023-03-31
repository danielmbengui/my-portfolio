import React, { useState } from 'react';

import { Divider, Grid, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Drawer } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';

import ExperienceCards from '../organisms/ExperienceCards';
import ProjectCards from '../organisms/ProjectCards';
import SkillCards from '../organisms/SkillCards';
import BlogCards from '../organisms/BlogCards';

import ArchitectureRoundedIcon from '@mui/icons-material/ArchitectureRounded';
import CodeOutlinedIcon from '@mui/icons-material/CodeOutlined';
import BookOutlinedIcon from '@mui/icons-material/BookOutlined';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { ChatbotIcon, GithubIcon, LinkedinIcon, ResumeIcon, SkillsIcon } from '@/components/icons/IconifiyIcons';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useLangMode } from '@/contexts/LangModeProvider';
import { PAGE_LINK_CHAT_BOT, PAGE_LINK_RESUME, PAGE_LINK_SKILLS, _MY_PROFILE_ } from '@/_mocks_/_settings_items_';
import scintillate from "@/styles/Scintillating.module.css";
import EmailIcon from '@mui/icons-material/Email';
import { Slide } from 'react-awesome-reveal';



function SectionsBar() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [section, setSection] = useState('');
  const router = useRouter();
  const [lang,] = useLangMode();

  const toggleDrawer = (isOpen, section) => {
    setSection(section);
    setDrawerOpen(isOpen);
  };

  const DrawerLayout = () => {
    return (
      <div sx={{ padding: 20, }}>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pt: 3, }}
        >
          <IconButton
            onClick={() => toggleDrawer(false, '')}
            sx={{ margin: 2 }}
          >
            <ArrowBackIosNewRoundedIcon />
          </IconButton>
          <Typography variant="h6">{section}</Typography>
        </Box>
        <Box sx={{ marginX: 2 }}>
          <DrawerContent />
        </Box>
      </div>
    );
  };

  const DrawerContent = () => {
    switch (section) {
      case 'Experience':
        return <ExperienceCards isDetailed={true} />;
      case 'Projects':
        return <ProjectCards isDetailed={true} />;
      case t('sections.skills.title'):
        return <SkillCards isDetailed={true} />;
      case 'Blogs':
        return <BlogCards isDetailed={true} />;
      default:
        return <></>;
    }
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{
          height: '100%',
          //background:'green'
        }}
      >
        <Slide cascade direction='up' triggerOnce>
          <Tooltip
            title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('chatbot')}</Typography>}
            placement="right"
          //sx={{display:'none'}}
          >
            <IconButton
              aria-label="experience"
              onClick={() => router.push(`/${lang}/${PAGE_LINK_CHAT_BOT}`)}
              color={router.asPath === PAGE_LINK_CHAT_BOT ? 'var(--primary)' : 'var(--accents7)'}
              sx={{ "&:hover": { color: "var(--primary)" } }}
            //className={scintillate['container']}
            >
              <ChatbotIcon
                // className={scintillate.scintillatingBox}
                //color={router.asPath === PAGE_LINK_CHAT_BOT ? 'var(--primary)' : 'var(--accents7)'} 
                size={30}
                color={router.asPath === PAGE_LINK_CHAT_BOT ? 'var(--primary)' : 'inherit'}
              //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'blue'} 
              />
            </IconButton>
          </Tooltip>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
          //spacing={1}
          >
            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('sections.skills.title')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <IconButton
                aria-label={t('sections.skills.title')}
                //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
                sx={{ "&:hover": { color: "var(--primary)" } }}
                color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'var(--accents7)'}
              >
                <SkillsIcon
                  //color={'inherit'} 
                  color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'inherit'}
                  //sx={{ "&:hover": { color: "var(--primary)" } }} 
                  size={30}
                //sx={{ "&:hover": { background: "inherit" } }}
                //hoverColor={'var(--primary)'}
                />
              </IconButton>
            </Tooltip>

            <Tooltip
              title={<span style={{ fontSize: 13 }}>projects</span>}
              placement="left"
              sx={{display:'none'}}
            //sx={{display:'none'}}
            >
              <IconButton
                aria-label="projects"
                onClick={() => toggleDrawer(true, 'Projects')}
              >
                <ArchitectureRoundedIcon
                  sx={{ color: grey[700], width: 30, height: 30 }}
                />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack
            direction="column"
            justifyContent="center"
            alignItems="center"
          //spacing={1}
          >
            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('seeMyCV')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <a href={`/${lang}/${PAGE_LINK_RESUME}`} target="_blank">
                <IconButton
                  aria-label={t('sections.skills.title')}
                  //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                  //onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
                  sx={{ "&:hover": { color: "var(--primary)" } }}
                //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'var(--accents7)'} 
                >
                  <ResumeIcon
                    //color={'inherit'} 
                    color={'inherit'}
                    //sx={{ "&:hover": { color: "var(--primary)" } }} 
                    size={35}
                  //sx={{ "&:hover": { background: "inherit" } }}
                  //hoverColor={'var(--primary)'}
                  />
                </IconButton>
              </a>
            </Tooltip>

            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('sendMeMail')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <a href={`mailto:${_MY_PROFILE_.mail}`}>
                <IconButton
                  aria-label={t('sections.skills.title')}
                  //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                  //onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
                  sx={{ "&:hover": { color: "var(--primary)" } }}
                //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'var(--accents7)'} 
                >
                  <EmailIcon
                    //color={'inherit'} 
                    color={'inherit'}
                    //sx={{ "&:hover": { color: "var(--primary)" } }} 
                    fontSize={'large'}
                  //sx={{ "&:hover": { background: "inherit" } }}
                  //hoverColor={'var(--primary)'}
                  />
                </IconButton>
              </a>
            </Tooltip>

            <Tooltip
              title={<Typography color={'white'}  style={{ fontSize: 13 }}>{t('profileLinkedin')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <a href={_MY_PROFILE_.socials.linkedin} target="_blank">
                <IconButton
                  aria-label={t('sections.skills.title')}
                  //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                  //onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
                  sx={{ "&:hover": { color: "var(--blue-linkedin)" } }}
                //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'var(--accents7)'} 
                >
                  <LinkedinIcon
                    //color={'inherit'} 
                    color={'inherit'}
                    //sx={{ "&:hover": { color: "var(--primary)" } }} 
                    size={30}
                  //sx={{ "&:hover": { background: "inherit" } }}
                  //hoverColor={'var(--primary)'}
                  />
                </IconButton>
              </a>
            </Tooltip>

            <Tooltip
              title={<Typography color={'white'} style={{ fontSize: 13 }}>{t('profileGithub')}</Typography>}
              placement="right"
            //sx={{ "&:hover": { color: "blue" } }}
            >
              <a href={_MY_PROFILE_.socials.github} target="_blank">
                <IconButton
                  aria-label={t('sections.skills.title')}
                  //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
                  //onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
                  sx={{ "&:hover": { color: "var(--text)" } }}
                //color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'var(--accents7)'} 
                >
                  <GithubIcon
                    //color={'inherit'} 
                    color={'inherit'}
                    //sx={{ "&:hover": { color: "var(--primary)" } }} 
                    size={35}
                  //sx={{ "&:hover": { background: "inherit" } }}
                  //hoverColor={'var(--primary)'}
                  />
                </IconButton>
              </a>
            </Tooltip>




          </Stack>
        </Slide>
      </Stack>



      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false, '')}
      //sx={{background:'red'}}

      >
        <DrawerLayout />
      </Drawer>
    </>
  );
}

export default SectionsBar;
