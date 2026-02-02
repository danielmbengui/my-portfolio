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
import { ARRAY_NAMESPACES, ARRAY_LANGAGES, LANGAGE_FRENCH, LANGAGE_ENGLISH, _MY_PROFILE_, _PAGE_LINK_RESUME_, GENERAL_FONT_FAMILY, _WEBSITE_ADDRESS_, _NEXTJS_LINK_ } from '@/_mocks_/_settings_items_';

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
import { Avatar, ButtonBase, Container, Drawer, Paper, Popover, Stack, useTheme } from '@mui/material';
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

import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Fade } from 'react-awesome-reveal';
import SkillsComponent from '@/components/skills/SkillsComponent';

import stylesCarousel from "@/styles/Carousel.module.css"
import CardSocial from '@/components/CardSocial';
import { NextJsIcon, PlayStoreIcon } from '@/components/icons/IconifiyIcons';
import AppBarComponent from '@/components/navigation/AppBarComponent';
import MobileAppBarComponent from '@/components/navigation/MobileAppBarComponent';
import ContentComponent from '@/components/layouts/ContentComponent';
import MobileContentComponent from '@/components/layouts/MobileContentComponent';
import MobileSkillsComponent from '@/components/skills/MobileSkillsComponent';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';

export default function FooterComponent() {
  const { width } = useWindowSize();
  const { t } = useTranslation();
  const [lang] = useLangMode();
  const {isMobile} = useDeviceMode();
  //const now = new Date();
  const currentYear = new Date().getFullYear();

  const title = t('sections.skills.title');

  return (        <footer
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
  </footer>);
}