import React, { useState } from 'react';

import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Drawer } from '@mui/material';
import { Box } from '@mui/system';

import ExperienceCards from '../organisms/ExperienceCards';
import ProjectCards from '../organisms/ProjectCards';
import SkillCards from '../organisms/SkillCards';
import BlogCards from '../organisms/BlogCards';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { ChatbotIcon, GithubIcon, LanguagesIcon, LinkedinIcon, PlayStoreIcon, ProjectIcon, SkillsIcon } from '@/components/icons/IconifiyIcons';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useLangMode } from '@/contexts/LangModeProvider';
import { _PAGE_LINK_CHAT_BOT_, _PAGE_LINK_SKILLS_, _MY_PROFILE_, _PAGE_LINK_LANGUAGES_, _PAGE_LINK_PROJECTS_ } from '@/_mocks_/_settings_items_';
import EmailIcon from '@mui/icons-material/Email';
import { Slide } from 'react-awesome-reveal';

const ICON_SIZE = 20;
const ICON_BTN_SIZE = 40;

const navButtonSx = {
  width: ICON_BTN_SIZE,
  height: ICON_BTN_SIZE,
  minWidth: ICON_BTN_SIZE,
  color: 'var(--accents7)',
  borderRadius: '12px',
  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    color: 'var(--primary)',
    backgroundColor: 'var(--primary-opacity)',
    transform: 'scale(1.06)',
  },
  '&.active': {
    color: 'var(--primary)',
    backgroundColor: 'var(--primary-opacity)',
  },
};

const tooltipSlotProps = {
  tooltip: {
    sx: {
      fontSize: 12,
      fontWeight: 500,
      padding: '6px 10px',
      backgroundColor: 'var(--accents2)',
      border: '1px solid var(--accents4)',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      color: 'var(--text)',
    },
  },
  arrow: {
    sx: { color: 'var(--accents2)' },
  },
};



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
      <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            py: 2,
            px: 1,
            borderBottom: '1px solid var(--accents3)',
          }}
        >
          <IconButton
            onClick={() => toggleDrawer(false, '')}
            size="small"
            sx={{
              color: 'var(--accents7)',
              '&:hover': { color: 'var(--primary)', backgroundColor: 'var(--primary-opacity)' },
            }}
          >
            <ArrowBackIosNewRoundedIcon sx={{ fontSize: 20 }} />
          </IconButton>
          <Typography variant="h6" sx={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text)' }}>
            {section}
          </Typography>
        </Box>
        <Box sx={{ flex: 1, overflow: 'auto', py: 2, px: 1 }}>
          <DrawerContent />
        </Box>
      </Box>
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

  const socialIconHoverSx = {
    color: 'var(--accents7)',
    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
      color: '#fff',
      backgroundColor: 'var(--primary-opacity)',
      boxShadow: '0 0 16px 2px var(--primary-opacity)',
      transform: 'scale(1.06)',
    },
  };

  const NavIconButton = ({ children, title, isActive, onClick, href, socialIcon, sx = {} }) => {
    const btn = (
      <IconButton
        component={href ? 'span' : 'button'}
        aria-label={title}
        onClick={!href ? onClick : undefined}
        className={isActive ? 'active' : ''}
        sx={{
          ...navButtonSx,
          ...(socialIcon && socialIconHoverSx),
          ...sx,
        }}
      >
        {children}
      </IconButton>
    );

    const wrapped = href ? (
      <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noopener noreferrer' : undefined} style={{ display: 'flex', textDecoration: 'none', color: 'inherit' }}>
        {btn}
      </a>
    ) : btn;

    return (
      <Tooltip title={title} placement="right" arrow slotProps={tooltipSlotProps}>
        <Box component="span" sx={{ display: 'flex' }}>
          {wrapped}
        </Box>
      </Tooltip>
    );
  };

  return (
    <>
      <Stack
        direction="column"
        justifyContent="space-between"
        alignItems="center"
        spacing={1}
        sx={{ height: '100%', py: 2 }}
      >
        <Slide cascade direction="up" triggerOnce>
          <Stack direction="column" spacing={1} alignItems="center">
            <NavIconButton
              title={t('chatbot')}
              isActive={router.asPath.includes(_PAGE_LINK_CHAT_BOT_)}
              onClick={() => router.push(`/${lang}/${_PAGE_LINK_CHAT_BOT_}`)}
            >
              <ChatbotIcon size={ICON_SIZE} color="inherit" />
            </NavIconButton>

            <NavIconButton
              title={t('sections.skills.langs.title')}
              isActive={router.asPath.includes(_PAGE_LINK_LANGUAGES_)}
              onClick={() => router.push(`/${lang}/${_PAGE_LINK_LANGUAGES_}`)}
            >
              <LanguagesIcon size={ICON_SIZE} color="inherit" />
            </NavIconButton>

            <NavIconButton
              title={t('sections.skills.title')}
              isActive={router.asPath.includes(_PAGE_LINK_SKILLS_)}
              onClick={() => router.push(`/${lang}/${_PAGE_LINK_SKILLS_}`)}
            >
              <SkillsIcon size={ICON_SIZE} color="inherit" />
            </NavIconButton>

            {false && (
              <NavIconButton
                title={t('sections.projects.title')}
                isActive={router.asPath.includes(_PAGE_LINK_PROJECTS_)}
                onClick={() => router.push(`/${lang}/${_PAGE_LINK_PROJECTS_}`)}
              >
                <ProjectIcon size={ICON_SIZE} color="inherit" />
              </NavIconButton>
            )}
          </Stack>

          <Stack direction="column" spacing={1} alignItems="center">
            <Box
              sx={{
                width: 28,
                height: 1,
                backgroundColor: 'var(--accents4)',
                borderRadius: 1,
                my: 0.5,
              }}
            />
            <NavIconButton title={t('sendMeMail')} href={`mailto:${_MY_PROFILE_.mail}`} socialIcon>
              <EmailIcon sx={{ fontSize: ICON_SIZE }} color="inherit" />
            </NavIconButton>
            <NavIconButton title={t('profileLinkedin')} href={_MY_PROFILE_.socials.linkedin} socialIcon>
              <LinkedinIcon size={ICON_SIZE} color="inherit" />
            </NavIconButton>
            <NavIconButton title={t('profileGithub')} href={_MY_PROFILE_.socials.github} socialIcon>
              <GithubIcon size={ICON_SIZE} color="inherit" />
            </NavIconButton>
            <NavIconButton title={t('profilePlaystore')} href={_MY_PROFILE_.socials.playstore} socialIcon>
              <PlayStoreIcon size={16} color="inherit" />
            </NavIconButton>
          </Stack>
        </Slide>
      </Stack>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => toggleDrawer(false, '')}
        PaperProps={{
          sx: {
            backgroundColor: 'var(--background-card)',
            borderLeft: '1px solid var(--accents3)',
          },
        }}
      >
        <DrawerLayout />
      </Drawer>
    </>
  );
}

export default SectionsBar;
