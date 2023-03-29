import React, { useState } from 'react';

import { IconButton, Tooltip, Typography } from '@mui/material';
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
import { ChatbotIcon, SkillsIcon } from '@/components/icons/IconifiyIcons';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useLangMode } from '@/contexts/LangModeProvider';
import { PAGE_LINK_CHAT_BOT, PAGE_LINK_SKILLS } from '@/_mocks_/_settings_items_';

function SectionsBar() {
  const {t} = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [section, setSection] = useState('');
  const router = useRouter();
  const [lang, ] = useLangMode();

  const toggleDrawer = (isOpen, section) => {
    setSection(section);
    setDrawerOpen(isOpen);
  };

  const DrawerLayout = () => {
    return (
      <div sx={{ padding: 20,}}>
        <Box
          sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', pt:3, }}
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
      <Tooltip
        title={<span style={{ fontSize: 13 }}>experience</span>}
        placement="left"
        sx={{display:'none'}}
      >
        <IconButton
          aria-label="experience"
          onClick={() => toggleDrawer(true, 'Experience')}
        >
          <WorkOutlineIcon sx={{ color: grey[700], width: 30, height: 30 }} />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={<span style={{ fontSize: 13 }}>{`Chat`}</span>}
        placement="left"
        //sx={{display:'none'}}
      >
        <IconButton
          aria-label="experience"
          onClick={() => router.push(`/${lang}/${PAGE_LINK_CHAT_BOT}`)}
        >
          <ChatbotIcon 
          color={router.asPath === PAGE_LINK_CHAT_BOT ? 'var(--primary)' : 'var(--accents7)'} 
          size={30}
           />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={<span style={{ fontSize: 13 }}>projects</span>}
        placement="left"
        sx={{display:'none'}}
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

      <Tooltip
        title={<span style={{ fontSize: 13 }}>{t('sections.skills.title')}</span>}
        placement="left"
        sx={{ "&:hover": { color: "blue" } }}
      >
        <IconButton
          aria-label={t('sections.skills.title')}
          //onClick={() => toggleDrawer(true, t('sections.skills.title'))}
          onClick={() => router.push(`/${lang}/${PAGE_LINK_SKILLS}`)}
          sx={{ "&:hover": { color: "var(--primary)" } }}
          color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'blue'} 
        >
          <SkillsIcon
          //color={'inherit'} 
          color={router.asPath === PAGE_LINK_SKILLS ? 'var(--primary)' : 'inherit'}
          sx={{ "&:hover": { color: "var(--primary)" } }} 
          size={30}
          //sx={{ "&:hover": { background: "inherit" } }}
          //hoverColor={'var(--primary)'}
           />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={<span style={{ fontSize: 13 }}>blogs</span>}
        placement="left"
        sx={{display:'none'}}
      >
        <IconButton
          aria-label="blogs"
          onClick={() => toggleDrawer(true, 'Blogs')}
        >
          <BookOutlinedIcon sx={{ color: grey[700], width: 30, height: 30 }} />
        </IconButton>
      </Tooltip>

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
