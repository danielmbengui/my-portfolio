import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Tooltip,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import EditNoteIcon from '@mui/icons-material/EditNote';
import GroupsIcon from '@mui/icons-material/Groups';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import PlaceIcon from '@mui/icons-material/Place';
import VideocamIcon from '@mui/icons-material/Videocam';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LanguageIcon from '@mui/icons-material/Language';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VideoFullscreenDialog from '@/components/shared/VideoFullscreenDialog';
import JourneyStepLightboxImage from '@/components/journey/JourneyStepLightboxImage';
import JourneyStepLightboxVideo from '@/components/journey/JourneyStepLightboxVideo';
import {
  ANGOLA_COLORS,
  getJourneyEraColor,
  JOURNEY_ERAS,
  JOURNEY_LANGUAGES,
  JOURNEY_DEFAULT_VIEW,
  JOURNEY_INTRO_SEEN_STORAGE_KEY,
  JOURNEY_VIEW_STORAGE_KEY,
  JOURNEY_SKILLS,
  JOURNEY_TOTAL_STOPS,
  _NAMESPACE_LANGAGE_JOURNEY_,
  buildJourneyStops,
} from '@/_mocks_/_journey_items_';
import { AngolanIcon, EnglishIcon, FrenchIcon, ItalianIcon, PortugueseIcon } from '@/components/icons/FlagIcons';
import {
  AndroidIcon, C_LangageIcon, CssIcon, CursorIcon, FirebaseIcon, FlutterIcon, GithubIcon, IosIcon, JavaIcon,
  ClaudeCodeIcon, GrokBotIcon, GrokIcon, JavascriptIcon, MaterialUiIcon, MySqlIcon, NextJsIcon, OpenAiIcon,
  PlayStoreIcon, PwaIcon, XcodeIcon,
  PythonIcon, ReactIcon, SolidityIcon, TypescriptIcon, Web3JsIcon,
} from '@/components/icons/IconifiyIcons';
import { _MY_PROFILE_, _NAMESPACE_LANGAGE_COMMON_ } from '@/_mocks_/_settings_items_';
import AiAssistantPanel from '@/components/assistant/AiAssistantPanel';
import {
  getJourneyTheme,
  journeyFixedHeaderNavSx,
  journeyFixedHeaderShellSx,
  journeySiteCssVars,
  useJourneyThemeMode,
} from './journeyTheme';
import {
  getJourneyMilestoneFields,
  getJourneyProfile,
  getJourneyLanguageFields,
  getJourneyProjectFields,
  getJourneyProjectsUi,
  getJourneySkillLabel,
  getJourneyUi,
} from '@/utility/journeyMilestoneText';
import JourneyView2D from '@/components/journey/JourneyView2D';
import JourneyIntroOverlay from '@/components/journey/JourneyIntroOverlay';
import JourneySiteNav from '@/components/journey/JourneySiteNav';

const JourneyScene = dynamic(() => import('./JourneyScene'), { ssr: false });

const BOOT_3D_TIMEOUT_MS = 12000;

function JourneyBootLoader({ theme, label }) {
  return (
    <Box
      role="status"
      aria-live="polite"
      aria-busy="true"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1900,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: theme.background,
        backgroundImage: theme.backgroundGradient,
        color: theme.text,
        ...journeySiteCssVars(theme),
      }}
    >
      <Stack alignItems="center" spacing={2.25} sx={{ px: 2, textAlign: 'center' }}>
        <CircularProgress size={36} thickness={4} sx={{ color: theme.accent }} aria-hidden />
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: theme.textMuted,
            maxWidth: 280,
          }}
        >
          {label}
        </Typography>
      </Stack>
    </Box>
  );
}

const FLAGS = { fr: FrenchIcon, ao: AngolanIcon, en: EnglishIcon, it: ItalianIcon, pt: PortugueseIcon };

const SKILL_ICONS = {
  business: BusinessCenterIcon,
  writing: EditNoteIcon,
  scrum: GroupsIcon,
  java: JavaIcon,
  sql: MySqlIcon,
  android: AndroidIcon,
  python: PythonIcon,
  javascript: JavascriptIcon,
  css: CssIcon,
  c: C_LangageIcon,
  git: GithubIcon,
  solidity: SolidityIcon,
  web3: Web3JsIcon,
  ai: OpenAiIcon,
  nextjs: NextJsIcon,
  react: ReactIcon,
  flutter: FlutterIcon,
  firebase: FirebaseIcon,
  pwa: PwaIcon,
  mui: MaterialUiIcon,
  typescript: TypescriptIcon,
  cursor: CursorIcon,
  grok: GrokIcon,
  grokBot: GrokBotIcon,
  claudeCode: ClaudeCodeIcon,
  xcode: XcodeIcon,
};

function HudAccordion({ id, title, countLabel, theme, children }) {
  return (
    <Accordion
      disableGutters
      defaultExpanded={false}
      sx={{
        bgcolor: 'transparent',
        boxShadow: 'none',
        '&::before': { display: 'none' },
        border: `1px solid ${theme.divider || theme.glassBorder}`,
        borderRadius: '12px !important',
        mb: 1,
        overflow: 'hidden',
        transition: 'border-color .2s ease, background-color .2s ease',
        '&:hover': { borderColor: `${theme.accent}66` },
        '&.Mui-expanded': { mb: 1, bgcolor: theme.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(21,17,15,0.03)' },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: theme.accent }} />}
        aria-controls={`${id}-content`}
        id={`${id}-header`}
        sx={{
          minHeight: 44,
          px: 1.25,
          '& .MuiAccordionSummary-content': { my: 1, alignItems: 'center' },
        }}
      >
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ width: '100%', pr: 0.5 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: theme.accent, textTransform: 'uppercase' }}>
            {title}
          </Typography>
          {countLabel}
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, px: 1.25, pb: 1.5 }}>{children}</AccordionDetails>
    </Accordion>
  );
}

function HudVideoThumb({ theme, videoSrc, label, onOpen }) {
  const open = () => onOpen({ src: videoSrc, title: label });
  return (
    <Box
      role="button"
      tabIndex={0}
      aria-label={label}
      onClick={open}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
        }
      }}
      sx={{
        position: 'relative',
        borderRadius: 1.5,
        overflow: 'hidden',
        border: `1px solid ${theme.glassBorder}`,
        cursor: 'pointer',
        aspectRatio: '16 / 9',
        bgcolor: '#000',
        mb: 0.75,
        '&:hover .hud-video-zoom': { opacity: 1 },
        '&:focus-visible': { outline: `2px solid ${theme.accent}`, outlineOffset: 2 },
      }}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        controlsList="nodownload"
        disablePictureInPicture
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <Box
        className="hud-video-zoom"
        sx={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: 'rgba(0,0,0,0.38)',
          opacity: 0.85,
          transition: 'opacity .2s ease',
        }}
      >
        <FullscreenIcon sx={{ color: '#fff', fontSize: 26, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))' }} />
      </Box>
    </Box>
  );
}

function HudTextEntry({ theme, kicker, title, description, bullets, videoSrc, onVideoOpen }) {
  const videoLabel = kicker || title;
  return (
    <Box
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: `1px solid ${theme.glassBorder}`,
        bgcolor: `${theme.accent}0d`,
      }}
    >
      {kicker && (
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: theme.accent, lineHeight: 1.35, mb: 0.5 }}>
          {kicker}
        </Typography>
      )}
      {videoSrc && onVideoOpen && (
        <HudVideoThumb theme={theme} videoSrc={videoSrc} label={videoLabel} onOpen={onVideoOpen} />
      )}
      <Typography sx={{ fontSize: 13, fontWeight: 700, color: theme.text, lineHeight: 1.3 }}>{title}</Typography>
      <Typography sx={{ fontSize: 12, color: theme.textSoft, lineHeight: 1.55, mt: 0.5 }}>{description}</Typography>
      {Array.isArray(bullets) && bullets.length > 0 && (
        <Box component="ul" sx={{ m: 0, mt: 0.75, pl: 2, color: theme.textMuted, fontSize: 11, lineHeight: 1.5 }}>
          {bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </Box>
      )}
    </Box>
  );
}

const projectLinkButtonSx = (theme) => ({
  ...navButtonSx(theme),
  color: theme.accent,
  textDecoration: 'none',
  '& .MuiSvgIcon-root': { color: 'inherit' },
  '&:link, &:visited, &:active': { color: theme.accent },
  '&:hover': {
    color: theme.accent,
    borderColor: theme.accent,
    bgcolor: `${theme.accent}22`,
    transform: 'translateY(-1px)',
  },
});

function HudProjectEntry({ project, theme, locale, tc }) {
  const fields = getJourneyProjectFields(locale, project.id);
  const name = fields?.name || tc(`sections.projects.${project.id}.name`);
  const type = fields?.type || tc(`sections.projects.${project.id}.type`);
  const description = fields?.description || tc(`sections.projects.${project.id}.description`);
  const stopAccordionToggle = (e) => {
    e.stopPropagation();
  };

  return (
    <Accordion
      disableGutters
      defaultExpanded={false}
      sx={{
        bgcolor: `${theme.accent}0d`,
        boxShadow: 'none',
        '&::before': { display: 'none' },
        border: `1px solid ${theme.glassBorder}`,
        borderRadius: '10px !important',
        overflow: 'hidden',
        transition: 'border-color .2s ease',
        '&:hover': { borderColor: `${theme.accent}55` },
        '&.Mui-expanded': { bgcolor: `${theme.accent}12` },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon sx={{ color: theme.accent, fontSize: 20 }} />}
        aria-controls={`project-${project.id}-content`}
        id={`project-${project.id}-header`}
        sx={{
          minHeight: 44,
          px: 1,
          py: 0.25,
          '& .MuiAccordionSummary-content': { my: 0.75, alignItems: 'center', mr: 0.5 },
        }}
      >
        <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '100%', minWidth: 0 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              flexShrink: 0,
              borderRadius: 1.25,
              border: `1px solid ${theme.glassBorder}`,
              bgcolor: theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              p: 0.4,
            }}
          >
            <Box
              component="img"
              src={hudProjectLogoSrc(project, theme)}
              alt=""
              sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
            />
          </Box>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography sx={{ fontSize: 12.5, fontWeight: 700, color: theme.text, lineHeight: 1.25, pr: 0.5 }} noWrap>
              {name}
            </Typography>
            <Chip
              size="small"
              label={type}
              sx={{
                mt: 0.35,
                height: 18,
                fontSize: 9.5,
                fontWeight: 600,
                color: theme.text,
                border: `1px solid ${theme.accent}`,
                bgcolor: `${theme.accent}22`,
              }}
            />
          </Box>
          <IconButton
            component="a"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            aria-label={tc('sections.projects.viewProject')}
            onClick={stopAccordionToggle}
            onMouseDown={stopAccordionToggle}
            sx={{ ...projectLinkButtonSx(theme), width: 28, height: 28, flexShrink: 0 }}
          >
            <OpenInNewIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
      </AccordionSummary>
      <AccordionDetails sx={{ pt: 0, px: 1.25, pb: 1.25 }}>
        <Typography sx={{ fontSize: 11.5, color: theme.textSoft, lineHeight: 1.55 }}>{description}</Typography>
      </AccordionDetails>
    </Accordion>
  );
}

const hudContactLinkSx = (theme) => ({
  p: 1,
  borderRadius: 1.5,
  border: `1px solid ${theme.glassBorder}`,
  bgcolor: `${theme.accent}08`,
  textDecoration: 'none',
  transition: 'border-color .2s ease, background-color .2s ease',
  '&:link, &:visited, &:active': {
    color: theme.text,
    '& .hud-contact-value, & .hud-contact-icon': { color: theme.accent },
  },
  '&:hover': {
    borderColor: theme.accent,
    bgcolor: `${theme.accent}14`,
  },
});

function HudContactLink({ entry, theme, tc }) {
  const profile = _MY_PROFILE_;
  if (!entry.show(profile)) return null;

  const href = entry.getHref(profile);
  const label = tc(entry.labelKey);
  const display = entry.getDisplay(profile);
  const { Icon } = entry;

  return (
    <Stack
      component="a"
      href={href}
      target={entry.external ? '_blank' : undefined}
      rel={entry.external ? 'noopener noreferrer' : undefined}
      direction="row"
      spacing={1.1}
      alignItems="center"
      sx={hudContactLinkSx(theme)}
    >
      <Box
        sx={{
          width: 32,
          height: 32,
          flexShrink: 0,
          borderRadius: 1.25,
          border: `1px solid ${theme.glassBorder}`,
          bgcolor: theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: theme.accent,
        }}
        className="hud-contact-icon"
      >
        {entry.muiIcon ? <Icon sx={{ fontSize: 17 }} /> : <Icon size={17} />}
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography sx={{ fontSize: 10.5, fontWeight: 600, color: theme.textMuted, lineHeight: 1.3 }}>{label}</Typography>
        <Typography
          className="hud-contact-value"
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: theme.accent,
            lineHeight: 1.35,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {display}
        </Typography>
      </Box>
      {entry.external && (
        <OpenInNewIcon className="hud-contact-icon" sx={{ fontSize: 14, color: theme.accent, flexShrink: 0, opacity: 0.85 }} />
      )}
    </Stack>
  );
}

function SkillChipIcon({ Icon, theme, muiIcon }) {
  if (!Icon) return undefined;
  if (muiIcon) {
    return (
      <Box component="span" sx={{ display: 'flex', pl: 0.5, color: theme.accent }}>
        <Icon sx={{ fontSize: 14 }} />
      </Box>
    );
  }
  return (
    <Box component="span" sx={{ display: 'flex', pl: 0.5 }}>
      <Icon size={14} color={theme.text} />
    </Box>
  );
}

const AUTOPLAY_MS = 4500;
const NS_COMMON = 'common';

const DEFINE_ME_VIDEO_KEYS = ['video1', 'video2', 'video3', 'video4'];
const UNIVERSE_VIDEO_KEYS = ['video1', 'video2', 'video3', 'video4'];

const DEFINE_ME_VIDEOS = {
  video1: '/assets/videos/1-1.mp4',
  video2: '/assets/videos/1-2.mp4',
  video3: '/assets/videos/1-3.mp4',
  video4: '/assets/videos/1-4.mp4',
};

const UNIVERSE_VIDEOS = {
  video1: '/assets/videos/2-1.mp4',
  video2: '/assets/videos/2-2.mp4',
  video3: '/assets/videos/2-3.mp4',
  video4: '/assets/videos/2-4.mp4',
};

const PLAYPAD_LOGO_DARK = '/img/playpad/playpad-logo-dark.svg';
const PLAYPAD_LOGO_LIGHT = '/img/playpad/playpad-logo-light.svg';

const JOURNEY_HUD_PROJECTS = [
  { id: 'vaakai', img: '/img/vaakai/logo.png', link: 'https://vaakai-store.ch/' },
  { id: 'dandela', img: 'https://academy.dandela.com/images/logo.png', link: 'https://academy.dandela.com' },
  { id: 'playpad', img: PLAYPAD_LOGO_DARK, link: 'https://playpadapp.com/' },
  { id: 'drilldev', img: '/img/drilldev/complete_logo_drilldev.png', link: 'https://drilldev.com/' },
  { id: 'winno', img: '/img/logos/winnobearzclub.png', link: 'https://winno.bearzclub.io/' },
];

function hudProjectLogoSrc(project, theme) {
  if (project.id === 'playpad') {
    return theme.mode === 'light' ? PLAYPAD_LOGO_LIGHT : PLAYPAD_LOGO_DARK;
  }
  return project.img;
}

const JOURNEY_HUD_CONTACTS = [
  {
    id: 'email',
    labelKey: 'sections.contactMe.email',
    getHref: (p) => `mailto:${p.mail}`,
    getDisplay: (p) => p.mail,
    external: false,
    muiIcon: true,
    Icon: EmailIcon,
    show: () => true,
  },
  {
    id: 'phone-ch',
    labelKey: 'sections.contactMe.phoneSwitzerland',
    getHref: (p) => `tel:${p.phone.replace(/\s/g, '')}`,
    getDisplay: (p) => p.phone,
    external: false,
    muiIcon: true,
    Icon: PhoneIcon,
    show: (p) => Boolean(p.phone),
  },
  {
    id: 'phone-ao',
    labelKey: 'sections.contactMe.phoneAngola',
    getHref: (p) => `tel:${p.phone_ao.replace(/\s/g, '')}`,
    getDisplay: (p) => p.phone_ao,
    external: false,
    muiIcon: true,
    Icon: PhoneIcon,
    show: (p) => Boolean(p.phone_ao),
  },
  {
    id: 'website',
    labelKey: 'sections.contactMe.website',
    getHref: (p) => p.socials.website,
    getDisplay: (p) => p.socials.website.replace(/^https?:\/\//, ''),
    external: true,
    muiIcon: true,
    Icon: LanguageIcon,
    show: (p) => Boolean(p.socials?.website),
  },
  {
    id: 'github',
    labelKey: 'profileGithub',
    getHref: (p) => p.socials.github,
    getDisplay: () => 'GitHub',
    external: true,
    muiIcon: false,
    Icon: GithubIcon,
    show: (p) => Boolean(p.socials?.github),
  },
  {
    id: 'playstore',
    labelKey: 'profilePlaystore',
    getHref: (p) => p.socials.playstore,
    getDisplay: () => 'Google Play',
    external: true,
    muiIcon: false,
    Icon: PlayStoreIcon,
    show: (p) => Boolean(p.socials?.playstore),
  },
  {
    id: 'appstore',
    labelKey: 'profileAppstore',
    getHref: (p) => p.socials.appstore,
    getDisplay: () => 'App Store',
    external: true,
    muiIcon: false,
    Icon: IosIcon,
    show: (p) => Boolean(p.socials?.appstore),
  },
];

const glass = (theme) => ({
  background: theme.glassBg,
  backgroundImage: `linear-gradient(180deg, ${theme.glassHighlight || 'transparent'} 0%, transparent 42%)`,
  backdropFilter: 'blur(18px) saturate(1.25)',
  WebkitBackdropFilter: 'blur(18px) saturate(1.25)',
  border: `1px solid ${theme.glassBorder}`,
  boxShadow: theme.glassShadow,
  borderRadius: 3,
  color: theme.text,
  pointerEvents: 'auto',
});

const navButtonSx = (theme) => ({
  color: theme.text,
  border: `1px solid ${theme.locked}`,
  transition: 'border-color .2s ease, background-color .2s ease, transform .15s ease',
  '&:hover': { borderColor: theme.accent, bgcolor: `${theme.accent}22`, transform: 'translateY(-1px)' },
  '&:active': { transform: 'translateY(0)' },
  '&.Mui-focusVisible': { outline: `2px solid ${theme.focusRing}`, outlineOffset: 2 },
  '&.Mui-disabled': { color: theme.textFaint, borderColor: theme.track },
});

function useStopText() {
  const { t, i18n } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  return useCallback((stop) => {
    if (stop.placeholder) {
      return {
        year: t('ui.placeholderYear'),
        title: t('ui.placeholderTitle', { n: String(stop.index + 1).padStart(2, '0') }),
        description: t('ui.placeholderDescription'),
        place: t(`milestones.${stop.placeKey}.place`),
      };
    }
    const fields = getJourneyMilestoneFields(i18n.language, stop.milestoneId);
    const yearLabel = fields?.yearLabel || t(`milestones.${stop.milestoneId}.yearLabel`, { defaultValue: '' });
    return {
      year: stop.today ? t('ui.today') : yearLabel || stop.year || t('ui.unknownYear'),
      title: fields?.title || t(`milestones.${stop.milestoneId}.title`),
      description: fields?.description || t(`milestones.${stop.milestoneId}.description`),
      place: fields?.place || t(`milestones.${stop.milestoneId}.place`),
    };
  }, [t, i18n.language]);
}

function SectionTitle({ children, right, theme }) {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
      <Typography sx={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: theme.accent, textTransform: 'uppercase' }}>
        {children}
      </Typography>
      {right}
    </Stack>
  );
}

function UnlockHud({ stops, activeIndex, onClose, theme, stopText, mobileOverlay = false }) {
  const { t, i18n } = useTranslation([_NAMESPACE_LANGAGE_JOURNEY_, NS_COMMON]);
  const tc = useCallback((key, opts) => t(key, { ns: NS_COMMON, ...opts }), [t]);
  const profile = getJourneyProfile(i18n.language);
  const hudIntro = profile.hudIntro || t('profile.hudIntro', { ns: _NAMESPACE_LANGAGE_JOURNEY_ });
  const skillLabel = useCallback(
    (skill) => skill.label || getJourneySkillLabel(i18n.language, skill.id),
    [i18n.language],
  );
  const [fullscreenVideo, setFullscreenVideo] = useState(null);
  const { skills, languages } = useMemo(() => {
    const s = new Map();
    const l = new Map();
    stops.slice(0, activeIndex + 1).forEach((stop) => {
      stop.skills.forEach((id) => { if (!s.has(id)) s.set(id, stop); });
      stop.languages.forEach((id) => { if (!l.has(id)) l.set(id, stop); });
    });
    return { skills: s, languages: l };
  }, [stops, activeIndex]);

  const unlockedLabel = (key, stop) => {
    const text = stopText(stop);
    return t(key, { title: text.title, year: text.year });
  };

  return (
    <>
    <Box
      sx={{
        ...glass(theme),
        position: 'relative',
        p: 2,
        width: mobileOverlay ? '100%' : { xs: '100%', md: 320 },
        maxWidth: mobileOverlay ? 'none' : 360,
        maxHeight: mobileOverlay ? '100%' : '100%',
        overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {onClose && (
        <IconButton size="small" onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: theme.text }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      <Typography
        sx={{
          fontSize: 12.5,
          color: theme.textSoft,
          lineHeight: 1.55,
          mb: 2,
          pr: onClose ? 3 : 0,
        }}
      >
        {hudIntro}
      </Typography>
      <HudAccordion
        id="journey-languages"
        title={t('ui.languages')}
        theme={theme}
        countLabel={(
          <Typography sx={{ fontSize: 11, color: theme.textMuted, fontVariantNumeric: 'tabular-nums' }}>
            {JOURNEY_LANGUAGES.length}/{JOURNEY_LANGUAGES.length}
          </Typography>
        )}
      >
        <Stack spacing={0.75}>
          {JOURNEY_LANGUAGES.map((lang) => {
            const Flag = FLAGS[lang.flag];
            const unlockedAt = languages.get(lang.id);
            const accent = unlockedAt ? getJourneyEraColor(unlockedAt.era, theme.mode) : theme.accent;
            const langFields = getJourneyLanguageFields(i18n.language, lang.id);
            const langLabel = langFields?.label || t(`languages.${lang.id}.label`);
            const langLevel = langFields?.level || t(`languages.${lang.id}.level`);
            return (
              <Tooltip
                key={lang.id}
                placement="right"
                title={unlockedAt ? unlockedLabel('ui.unlockedAt', unlockedAt) : langLevel}
              >
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={1.25}
                  sx={{
                    opacity: 1,
                    filter: 'none',
                    py: 0.25,
                  }}
                >
                  {Flag && (
                    <Box sx={{ display: 'flex', filter: 'drop-shadow(0 0 6px rgba(255,203,0,0.35))' }}>
                      <Flag size={22} />
                    </Box>
                  )}
                  <Box sx={{ flex: 1 }}>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2, color: theme.text }}>{langLabel}</Typography>
                    <Typography sx={{ fontSize: 11, color: theme.textMuted }}>{langLevel}</Typography>
                  </Box>
                  <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: accent, boxShadow: `0 0 8px ${accent}` }} />
                </Stack>
              </Tooltip>
            );
          })}
        </Stack>
      </HudAccordion>

      <HudAccordion
        id="journey-skills"
        title={t('ui.skills')}
        theme={theme}
        countLabel={(
          <Typography sx={{ fontSize: 11, color: theme.textMuted, fontVariantNumeric: 'tabular-nums' }}>
            {JOURNEY_SKILLS.length}/{JOURNEY_SKILLS.length}
          </Typography>
        )}
      >
        <Box sx={{ height: 4, borderRadius: 2, bgcolor: theme.track, mb: 1.5, overflow: 'hidden' }}>
          <Box
            sx={{
              height: '100%',
              width: '100%',
              background: theme.titleGradient,
            }}
          />
        </Box>
        <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.75}>
          {JOURNEY_SKILLS.map((skill) => {
            const Icon = SKILL_ICONS[skill.id];
            const unlockedAt = skills.get(skill.id);
            const color = unlockedAt ? getJourneyEraColor(unlockedAt.era, theme.mode) : theme.accent;
            const muiIcon = ['business', 'writing', 'scrum'].includes(skill.id);
            return (
              <Tooltip
                key={skill.id}
                title={unlockedAt ? unlockedLabel('ui.acquiredAt', unlockedAt) : skillLabel(skill)}
              >
                <Chip
                  size="small"
                  icon={<SkillChipIcon Icon={Icon} theme={theme} muiIcon={muiIcon} />}
                  label={skillLabel(skill)}
                  sx={{
                    color: theme.text,
                    fontSize: 11,
                    bgcolor: `${color}26`,
                    border: `1px solid ${color}`,
                    boxShadow: `0 0 10px ${color}44`,
                    opacity: 1,
                    filter: 'none',
                  }}
                />
              </Tooltip>
            );
          })}
        </Stack>
      </HudAccordion>

      <HudAccordion
        id="journey-define-me"
        title={tc('sections.defineMe.title')}
        theme={theme}
        countLabel={<Typography sx={{ fontSize: 11, color: theme.textMuted }}>4</Typography>}
      >
        <Stack spacing={1}>
          {DEFINE_ME_VIDEO_KEYS.map((key, index) => {
            const bullets = key === 'video4'
              ? tc('sections.defineMe.video4.bullets', { returnObjects: true })
              : null;
            const kicker = tc(`sections.defineMe.${key}.axeTitle`).replace(/(AXE|AXIS|EIXO)\s*\d+/i, `$1 ${index + 1}`);
            return (
              <HudTextEntry
                key={key}
                theme={theme}
                kicker={kicker}
                title={tc(`sections.defineMe.${key}.title`)}
                description={tc(`sections.defineMe.${key}.description`)}
                bullets={Array.isArray(bullets) ? bullets : undefined}
                videoSrc={DEFINE_ME_VIDEOS[key]}
                onVideoOpen={setFullscreenVideo}
              />
            );
          })}
        </Stack>
      </HudAccordion>

      <HudAccordion
        id="journey-universe"
        title={tc('sections.universeAndValues.title')}
        theme={theme}
        countLabel={<Typography sx={{ fontSize: 11, color: theme.textMuted }}>4</Typography>}
      >
        <Stack spacing={1}>
          {UNIVERSE_VIDEO_KEYS.map((key) => {
            const entryTitle = tc(`sections.universeAndValues.${key}.title`);
            return (
              <HudTextEntry
                key={key}
                theme={theme}
                title={entryTitle}
                description={tc(`sections.universeAndValues.${key}.description`)}
                videoSrc={UNIVERSE_VIDEOS[key]}
                onVideoOpen={setFullscreenVideo}
              />
            );
          })}
        </Stack>
      </HudAccordion>

      <HudAccordion
        id="journey-projects"
        title={getJourneyProjectsUi(i18n.language, 'title') || tc('sections.projects.title')}
        theme={theme}
        countLabel={<Typography sx={{ fontSize: 11, color: theme.textMuted }}>{JOURNEY_HUD_PROJECTS.length}</Typography>}
      >
        <Stack spacing={1}>
          {JOURNEY_HUD_PROJECTS.map((project) => (
            <HudProjectEntry key={project.id} project={project} theme={theme} locale={i18n.language} tc={tc} />
          ))}
        </Stack>
      </HudAccordion>

      <HudAccordion
        id="journey-contact"
        title={tc('quickMenuContact')}
        theme={theme}
        countLabel={(
          <Typography sx={{ fontSize: 11, color: theme.textMuted }}>
            {JOURNEY_HUD_CONTACTS.filter((entry) => entry.show(_MY_PROFILE_)).length}
          </Typography>
        )}
      >
        <Typography sx={{ fontSize: 11.5, color: theme.textSoft, lineHeight: 1.55, mb: 1.25 }}>
          {tc('sections.contactMe.subtitle')}
        </Typography>
        <Stack spacing={0.75}>
          {JOURNEY_HUD_CONTACTS.map((entry) => (
            <HudContactLink key={entry.id} entry={entry} theme={theme} tc={tc} />
          ))}
        </Stack>
      </HudAccordion>
    </Box>
    <VideoFullscreenDialog
      open={Boolean(fullscreenVideo)}
      onClose={() => setFullscreenVideo(null)}
      videoSrc={fullscreenVideo?.src ?? ''}
      title={fullscreenVideo?.title}
    />
    </>
  );
}

function StopDetails({ stop, total, onPrev, onNext, onClose, compact = false, mobileLayout = false, ghostTitle = true, theme, stopText }) {
  const { t, i18n } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const [flipped, setFlipped] = useState(false);
  const era = JOURNEY_ERAS[stop.era];
  const eraColor = getJourneyEraColor(stop.era, theme.mode) || theme.accent;
  const text = stopText(stop);
  const fullHeightMobile = mobileLayout && flipped;
  const showYearInCard = true;
  const languageFlagById = useMemo(
    () => Object.fromEntries(JOURNEY_LANGUAGES.map((lang) => [lang.id, lang.flag])),
    [],
  );
  const unlockedLanguages = stop.languages.map((id) => {
    const langFields = getJourneyLanguageFields(i18n.language, id);
    return {
      id,
      label: langFields?.label || t(`languages.${id}.label`),
      flagKey: languageFlagById[id],
    };
  });
  const unlockedSkills = stop.skills.map((id) => {
    const skill = JOURNEY_SKILLS.find((s) => s.id === id);
    return {
      id,
      label: skill?.label || getJourneySkillLabel(i18n.language, id),
    };
  });

  useEffect(() => {
    setFlipped(false);
  }, [stop.id]);

  const cardShellSx = {
    ...glass(theme),
    p: 2.5,
    width: '100%',
    maxWidth: '100%',
    minWidth: 0,
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    backfaceVisibility: 'hidden',
    WebkitBackfaceVisibility: 'hidden',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 3,
      background: `linear-gradient(90deg, ${eraColor}, ${eraColor}00)`,
      opacity: 0.9,
    },
  };

  const headerRow = (
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5, flexShrink: 0 }}>
      <Chip
        size="small"
        label={t(`eras.${stop.era}`)}
        sx={{ color: theme.mode === 'dark' ? eraColor : theme.text, border: `1px solid ${eraColor}`, bgcolor: `${eraColor}26`, fontWeight: 700, fontSize: 11 }}
      />
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ flexShrink: 0 }}>
        <Typography sx={{ fontSize: 12, color: theme.textMuted, fontVariantNumeric: 'tabular-nums' }}>
          {String(stop.index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </Typography>
        {onClose && (
          <IconButton
            size="small"
            aria-label={t('ui.menuClose')}
            onClick={onClose}
            sx={{ color: theme.text, border: `1px solid ${theme.divider}` }}
          >
            <CloseIcon sx={{ fontSize: 16 }} />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );

  const yearBlock = (
    <Typography
      sx={{
        fontSize: compact ? 28 : { xs: 34, sm: 44 },
        fontWeight: 800,
        lineHeight: 1,
        background: `linear-gradient(90deg, ${eraColor}, ${theme.text})`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        flexShrink: 0,
      }}
    >
      {text.year}
    </Typography>
  );

  const mediaBlock = (
    <Box
      sx={{
        mt: showYearInCard ? 2 : 0,
        borderRadius: 2,
        overflow: 'hidden',
        border: `1px solid ${theme.divider || `${eraColor}55`}`,
        bgcolor: theme.surfaceAlt || theme.track,
        boxShadow: theme.mode === 'dark' ? '0 10px 30px rgba(0,0,0,0.45)' : '0 8px 24px rgba(50,35,20,0.10)',
        flexShrink: 0,
      }}
    >
      {stop.video ? (
        <JourneyStepLightboxVideo
          key={stop.video}
          src={stop.video}
          alt={text.title}
          borderColor={`${eraColor}55`}
          trackBg={theme.track}
        />
      ) : stop.image ? (
        <JourneyStepLightboxImage
          src={stop.image}
          alt={text.title}
          borderColor={`${eraColor}55`}
          trackBg={theme.track}
        />
      ) : (
        <Stack alignItems="center" justifyContent="center" spacing={0.5} sx={{ aspectRatio: '16 / 9', color: theme.textFaint }}>
          <VideocamIcon />
          <Typography sx={{ fontSize: 12, color: theme.textFaint }}>{t('ui.videoSoon')}</Typography>
        </Stack>
      )}
    </Box>
  );

  const unlockedBlock = (unlockedLanguages.length > 0 || unlockedSkills.length > 0) && (
    <Box sx={{ mt: 2, flexShrink: 0 }}>
      <SectionTitle theme={theme}>{t('ui.unlockedHere')}</SectionTitle>
      <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.75}>
        {unlockedLanguages.map(({ id, label, flagKey }) => {
          const Flag = flagKey ? FLAGS[flagKey] : null;
          return (
            <Chip
              key={`lang-${id}`}
              size="small"
              icon={
                Flag ? (
                  <Box component="span" sx={{ display: 'flex', alignItems: 'center', pl: 0.75 }}>
                    <Flag size={16} />
                  </Box>
                ) : undefined
              }
              label={`+ ${label}`}
              sx={{
                color: theme.text,
                fontWeight: 600,
                pl: Flag ? 0.25 : undefined,
                '& .MuiChip-icon': { ml: 0.5, mr: -0.25 },
                bgcolor: `${eraColor}${theme.mode === 'dark' ? '26' : '2e'}`,
                border: `1px solid ${eraColor}99`,
                boxShadow: theme.mode === 'dark' ? `0 0 10px ${eraColor}33` : 'none',
              }}
            />
          );
        })}
        {unlockedSkills.map(({ id, label }) => (
          <Chip
            key={`skill-${id}`}
            size="small"
            label={`+ ${label}`}
            sx={{
              color: theme.text,
              fontWeight: 600,
              bgcolor: `${eraColor}${theme.mode === 'dark' ? '26' : '2e'}`,
              border: `1px solid ${eraColor}99`,
              boxShadow: theme.mode === 'dark' ? `0 0 10px ${eraColor}33` : 'none',
            }}
          />
        ))}
      </Stack>
    </Box>
  );

  const navRow = (onFlip) => (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: compact ? 1.5 : 2.5, flexShrink: 0 }}>
      <Tooltip title={t('ui.previous')}>
        <span>
          <IconButton onClick={onPrev} disabled={stop.index === 0} sx={navButtonSx(theme)}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={t('ui.next')}>
        <span>
          <IconButton onClick={onNext} disabled={stop.index === total - 1} sx={navButtonSx(theme)}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </span>
      </Tooltip>
      <Chip
        label={flipped ? t('ui.backToCard') : t('ui.seeFiche')}
        onClick={onFlip}
        sx={{ ml: 'auto !important', color: theme.text, border: `1px solid ${eraColor}`, bgcolor: `${eraColor}22`, fontWeight: 600 }}
      />
    </Stack>
  );

  const scrollBodySx = {
    flex: fullHeightMobile ? 1 : undefined,
    minHeight: 0,
    overflowY: fullHeightMobile ? 'auto' : 'visible',
    WebkitOverflowScrolling: 'touch',
    display: 'flex',
    flexDirection: 'column',
  };

  const card = (
    <Box
      key={stop.id}
      sx={{
        width: '100%',
        animation: 'journeyIn .45s ease',
        perspective: 1200,
        minHeight: fullHeightMobile ? '100%' : 0,
        maxHeight: fullHeightMobile ? '100%' : compact ? 'none' : '100%',
        height: fullHeightMobile ? '100%' : 'auto',
        position: 'relative',
        zIndex: 1,
        ...(mobileLayout && ghostTitle && !flipped && { mt: 1.5 }),
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: fullHeightMobile ? '100%' : 'auto',
          minHeight: fullHeightMobile ? '100%' : 0,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.55s cubic-bezier(0.4, 0.2, 0.2, 1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <Box sx={{ ...cardShellSx, position: 'relative', zIndex: flipped ? 0 : 1 }}>
          <Box sx={scrollBodySx}>
            {headerRow}
            {showYearInCard && yearBlock}
            {mediaBlock}
            {unlockedBlock}
          </Box>
          {navRow(() => setFlipped(true))}
        </Box>

        <Box
          sx={{
            ...cardShellSx,
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            transform: 'rotateY(180deg)',
            zIndex: flipped ? 1 : 0,
          }}
        >
          <Box sx={scrollBodySx}>
            {headerRow}
            {yearBlock}
            <Typography sx={{ fontSize: compact ? 16 : { xs: 18, sm: 21 }, fontWeight: 700, mt: 1, color: theme.text, flexShrink: 0 }}>
              {text.title}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: theme.textMuted, mt: 0.5, flexShrink: 0 }}>
              <PlaceIcon sx={{ fontSize: 16, color: eraColor }} />
              <Typography sx={{ fontSize: 13, color: theme.textMuted }}>{text.place}</Typography>
            </Stack>
            <Typography
              sx={{
                fontSize: 14,
                lineHeight: 1.65,
                color: theme.textSoft,
                mt: 2,
                fontStyle: stop.placeholder ? 'italic' : 'normal',
                flexShrink: 0,
              }}
            >
              {text.description}
            </Typography>
          </Box>
          {navRow(() => setFlipped(false))}
        </Box>
      </Box>
    </Box>
  );

  if (!mobileLayout) {
    return (
      <Box sx={{ width: '100%', maxHeight: '100%', overflowY: 'auto' }}>
        {card}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 360,
        minWidth: 0,
        mx: 'auto',
        flex: fullHeightMobile ? '1 1 auto' : '0 1 auto',
        minHeight: 0,
        maxHeight: fullHeightMobile ? '100%' : 'none',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto',
        position: 'relative',
        isolation: 'isolate',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      {ghostTitle && !flipped && (
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          zIndex: 0,
          top: fullHeightMobile ? 4 : -6,
          left: 0,
          right: 0,
          width: '100%',
          maxWidth: '100%',
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1.05,
          overflow: 'hidden',
          px: 0.5,
          boxSizing: 'border-box',
        }}
      >
        <Typography
          sx={{
            fontSize: fullHeightMobile ? 22 : 18,
            fontWeight: 800,
            mt: 0.5,
            px: 1,
            color: theme.text,
            opacity: 0.28,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {text.title}
        </Typography>
        <Typography
          sx={{
            fontSize: fullHeightMobile ? 13 : 12,
            fontWeight: 600,
            mt: 0.75,
            px: 1,
            color: theme.textMuted,
            opacity: 0.45,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {text.place}
        </Typography>
      </Box>
      )}
      {card}
    </Box>
  );
}

function Timeline({ stops, activeIndex, onSelect, playing, onTogglePlay, onPrev, onNext, theme, stopText }) {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const renderTick = (stop, { wrapped = false } = {}) => {
    const color = getJourneyEraColor(stop.era, theme.mode);
    const active = stop.index === activeIndex;
    const passed = stop.index <= activeIndex;
    const text = stopText(stop);
    const isLight = theme.mode === 'light';
    return (
      <Tooltip key={stop.id} title={`${text.year} · ${text.title}`} placement="top" disableInteractive>
        <Box
          role="button"
          tabIndex={0}
          aria-label={`${text.year} · ${text.title}`}
          aria-current={active ? 'step' : undefined}
          onClick={() => onSelect(stop.index)}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(stop.index); } }}
          sx={{
            flex: wrapped ? '0 0 8px' : 1,
            width: wrapped ? 8 : 'auto',
            minWidth: wrapped ? 8 : 0,
            maxWidth: wrapped ? 10 : 'none',
            cursor: 'pointer',
            borderRadius: '3px 3px 1px 1px',
            height: active ? (wrapped ? 18 : 30) : stop.placeholder ? 9 : (wrapped ? 12 : 18),
            background: active
              ? `linear-gradient(180deg, ${color}, ${color}cc)`
              : passed
                ? color
                : `${color}${isLight ? '66' : '40'}`,
            border: !passed ? `1px solid ${color}${isLight ? '88' : '55'}` : 'none',
            boxShadow: active ? `0 0 16px ${color}, 0 0 0 1px ${theme.background}` : passed && !isLight ? `0 0 6px ${color}55` : 'none',
            transition: 'all .3s cubic-bezier(.4,0,.2,1)',
            '&:hover': { height: active ? (wrapped ? 18 : 30) : 24, filter: 'brightness(1.1)' },
            '&:focus-visible': { outline: `2px solid ${theme.focusRing}`, outlineOffset: 2 },
          }}
        />
      </Tooltip>
    );
  };

  return (
    <Box sx={{ ...glass(theme), px: { xs: 1.25, sm: 2 }, py: 1.5, width: '100%', maxWidth: '100%', minWidth: 0, boxSizing: 'border-box', overflow: 'hidden' }}>
      <Box sx={{ display: { xs: 'block', sm: 'none' }, width: '100%', minWidth: 0 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1} sx={{ width: '100%', minWidth: 0 }}>
          <Stack direction="row" alignItems="center" spacing={0.75}>
            <IconButton size="small" onClick={onPrev} disabled={activeIndex === 0} sx={navButtonSx(theme)} aria-label={t('ui.previous')}>
              <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
            </IconButton>
            <Tooltip title={playing ? t('ui.pause') : t('ui.play')}>
              <IconButton size="small" onClick={onTogglePlay} sx={{ ...navButtonSx(theme), borderColor: theme.accent }}>
                {playing ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
              </IconButton>
            </Tooltip>
            <IconButton size="small" onClick={onNext} disabled={activeIndex === stops.length - 1} sx={navButtonSx(theme)} aria-label={t('ui.next')}>
              <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
            </IconButton>
          </Stack>
          <Typography sx={{ fontSize: 12, fontWeight: 700, color: theme.textMuted, fontVariantNumeric: 'tabular-nums' }}>
            {String(activeIndex + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}
          </Typography>
        </Stack>
        <Box
          sx={{
            mt: 1.25,
            width: '100%',
            minWidth: 0,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'flex-end',
            gap: '3px',
          }}
        >
          {stops.map((stop) => renderTick(stop, { wrapped: true }))}
        </Box>
      </Box>
      <Stack direction="row" alignItems="center" spacing={1.5} sx={{ display: { xs: 'none', sm: 'flex' }, width: '100%', minWidth: 0 }}>
        <IconButton size="small" onClick={onPrev} disabled={activeIndex === 0} sx={navButtonSx(theme)} aria-label={t('ui.previous')}>
          <ArrowBackIosNewIcon sx={{ fontSize: 14 }} />
        </IconButton>
        <Tooltip title={playing ? t('ui.pause') : t('ui.play')}>
          <IconButton size="small" onClick={onTogglePlay} sx={{ ...navButtonSx(theme), borderColor: theme.accent }}>
            {playing ? <PauseIcon fontSize="small" /> : <PlayArrowIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        <IconButton size="small" onClick={onNext} disabled={activeIndex === stops.length - 1} sx={navButtonSx(theme)} aria-label={t('ui.next')}>
          <ArrowForwardIosIcon sx={{ fontSize: 14 }} />
        </IconButton>

        <Box sx={{ flex: 1, minWidth: 0, position: 'relative', height: 36 }}>
          {/* Rail de fond */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: 0,
              height: 2,
              borderRadius: 1,
              bgcolor: theme.track,
            }}
          />
          {/* Progression */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: 0,
              bottom: 0,
              height: 2,
              borderRadius: 1,
              width: `${stops.length > 1 ? (activeIndex / (stops.length - 1)) * 100 : 0}%`,
              bgcolor: theme.scene?.pathLine || theme.text,
              boxShadow: theme.mode === 'dark' ? `0 0 10px ${theme.scene?.pathLine || theme.text}66` : 'none',
              transition: 'width .45s cubic-bezier(.4,0,.2,1)',
            }}
          />
          <Stack direction="row" alignItems="flex-end" sx={{ position: 'relative', height: '100%', gap: '2px', pb: '5px', minWidth: 0 }}>
            {stops.map((stop) => renderTick(stop))}
          </Stack>
        </Box>
        <Typography
          sx={{
            fontSize: 12,
            fontWeight: 700,
            color: theme.textMuted,
            fontVariantNumeric: 'tabular-nums',
            display: { xs: 'none', sm: 'block' },
            minWidth: 54,
            textAlign: 'right',
          }}
        >
          {String(activeIndex + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}
        </Typography>
      </Stack>
      {stops[activeIndex]?.era && (
        <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 1.25, display: { xs: 'flex', md: 'none' } }}>
          <Box
            sx={{
              width: 9,
              height: 9,
              borderRadius: '50%',
              bgcolor: getJourneyEraColor(stops[activeIndex].era, theme.mode),
              boxShadow: theme.mode === 'dark' ? `0 0 8px ${getJourneyEraColor(stops[activeIndex].era, theme.mode)}88` : 'none',
            }}
          />
          <Typography sx={{ fontSize: 12, color: theme.text, fontWeight: 700 }}>
            {t(`eras.${stops[activeIndex].era}`)}
          </Typography>
        </Stack>
      )}
      <Stack direction="row" flexWrap="wrap" useFlexGap gap={1.75} sx={{ mt: 1.25, display: { xs: 'none', md: 'flex' } }}>
        {Object.values(JOURNEY_ERAS).map((era) => (
          <Stack key={era.id} direction="row" alignItems="center" spacing={0.75}>
            <Box
              sx={{
                width: 9,
                height: 9,
                borderRadius: '50%',
                bgcolor: getJourneyEraColor(era.id, theme.mode),
                boxShadow: theme.mode === 'dark' ? `0 0 8px ${getJourneyEraColor(era.id, theme.mode)}88` : 'none',
              }}
            />
            <Typography sx={{ fontSize: 11, color: theme.textMuted, fontWeight: 600 }}>{t(`eras.${era.id}`)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

export default function JourneyExperience() {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const stops = useMemo(() => buildJourneyStops(JOURNEY_TOTAL_STOPS), []);
  const stopText = useStopText();
  const { mode: themeMode, resolved, changeMode, hydrated: themeHydrated } = useJourneyThemeMode();
  const theme = getJourneyTheme(resolved);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hudOpen, setHudOpen] = useState(false);
  const [viewMode, setViewMode] = useState(JOURNEY_DEFAULT_VIEW);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [introOpen, setIntroOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [prefsHydrated, setPrefsHydrated] = useState(false);
  const [introPending, setIntroPending] = useState(false);
  const [appReady, setAppReady] = useState(false);
  const [scene3dReady, setScene3dReady] = useState(false);
  const isMobile = useMediaQuery('(max-width: 900px)');
  const loadingLabel = t('ui.loading');

  const dismissIntro = useCallback(() => {
    try {
      window.localStorage.setItem(JOURNEY_INTRO_SEEN_STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
    setIntroOpen(false);
    setIntroPending(false);
  }, []);

  useEffect(() => {
    try {
      const seenIntro = window.localStorage.getItem(JOURNEY_INTRO_SEEN_STORAGE_KEY) === '1';
      setIntroPending(!seenIntro);
      const saved = sessionStorage.getItem(JOURNEY_VIEW_STORAGE_KEY);
      if (saved === '2d' || saved === '3d') {
        setViewMode(saved);
      } else {
        sessionStorage.setItem(JOURNEY_VIEW_STORAGE_KEY, JOURNEY_DEFAULT_VIEW);
      }
    } catch {
      /* ignore */
    }
    setPrefsHydrated(true);
  }, []);

  useEffect(() => {
    if (!introOpen) return undefined;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [introOpen]);

  const handleScene3dReady = useCallback(() => {
    setScene3dReady(true);
  }, []);

  useEffect(() => {
    if (viewMode === '2d') {
      setScene3dReady(true);
      return undefined;
    }
    setScene3dReady(false);
    const timer = setTimeout(() => setScene3dReady(true), BOOT_3D_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [viewMode]);

  const booting = !appReady && (
    !prefsHydrated
    || !themeHydrated
    || (viewMode === '3d' && !scene3dReady)
  );

  useEffect(() => {
    if (appReady || booting) return;
    setAppReady(true);
    if (introPending) setIntroOpen(true);
  }, [appReady, booting, introPending]);

  const labels = useMemo(() => stops.map(stopText), [stops, stopText]);
  const regionLabels = useMemo(() => ({ angola: t('regions.angola'), suisse: t('regions.suisse') }), [t]);

  const select = useCallback((index) => {
    setActiveIndex(Math.max(0, Math.min(stops.length - 1, index)));
  }, [stops.length]);
  const next = useCallback(() => setActiveIndex((i) => Math.min(stops.length - 1, i + 1)), [stops.length]);
  const prev = useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);

  const manualSelect = (index) => {
    setPlaying(false);
    select(index);
    if (isMobile) setDetailsOpen(true);
  };
  const manualNext = () => { setPlaying(false); next(); };
  const manualPrev = () => { setPlaying(false); prev(); };

  useEffect(() => {
    if (!playing) return undefined;
    if (activeIndex >= stops.length - 1) {
      setPlaying(false);
      return undefined;
    }
    const timer = setTimeout(next, AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [playing, activeIndex, stops.length, next]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') { setPlaying(false); next(); }
      if (e.key === 'ArrowLeft') { setPlaying(false); prev(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  // Après un (re)montage de la scène 3D, force une mesure du canvas : certains
  // navigateurs n'émettent pas de ResizeObserver tant que rien n'a bougé.
  useEffect(() => {
    if (viewMode !== '3d') return undefined;
    const timer = setTimeout(() => window.dispatchEvent(new Event('resize')), 120);
    return () => clearTimeout(timer);
  }, [viewMode]);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        bgcolor: theme.background,
        backgroundImage: theme.backgroundGradient,
        transition: 'background-color .4s ease',
        fontFamily: 'Roboto, sans-serif',
        colorScheme: theme.mode,
        ...journeySiteCssVars(theme),
        '@keyframes journeyIn': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        '& *::-webkit-scrollbar': { width: 8, height: 8 },
        '& *::-webkit-scrollbar-thumb': { bgcolor: theme.locked, borderRadius: 8 },
        '& *::-webkit-scrollbar-track': { bgcolor: 'transparent' },
      }}
    >
      {prefsHydrated && viewMode === '3d' && (
        <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden' }}>
          <JourneyScene
            stops={stops}
            labels={labels}
            regionLabels={regionLabels}
            activeIndex={activeIndex}
            onSelect={manualSelect}
            theme={theme}
            showFloatingLabels={!isMobile}
            onReady={handleScene3dReady}
          />
        </Box>
      )}

      <Box sx={journeyFixedHeaderShellSx()}>
        <Box sx={journeyFixedHeaderNavSx()}>
          <JourneySiteNav
            theme={theme}
            themeMode={themeMode}
            onThemeChange={changeMode}
            isMobile={isMobile}
            onToggleHud={() => setHudOpen((o) => !o)}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            onOpenAssistant={() => setAssistantOpen(true)}
          />
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          maxWidth: '100%',
          minWidth: 0,
          boxSizing: 'border-box',
          overflowX: 'hidden',
          zIndex: 10,
          isolation: 'isolate',
          pointerEvents: 'none',
          display: 'grid',
          gridTemplateRows: '1fr auto',
          gap: 2,
          px: { xs: 1.5, md: 3 },
          pb: { xs: 1.5, md: 3 },
          pt: { xs: '84px', md: '112px' },
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ xs: 'flex-start', md: 'space-between' }}
          alignItems={{ xs: 'center', md: 'stretch' }}
          spacing={2}
          sx={{ minHeight: 0, minWidth: 0, height: '100%', width: '100%', maxWidth: '100%', position: 'relative' }}
        >
          {!isMobile && (
            <Box sx={{ minHeight: 0, flexShrink: 0, display: 'flex', alignItems: 'flex-start' }}>
              <UnlockHud
                stops={stops}
                activeIndex={activeIndex}
                theme={theme}
                stopText={stopText}
              />
            </Box>
          )}
          {viewMode === '2d' && isMobile && !hudOpen && (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                minHeight: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                pointerEvents: 'auto',
              }}
            >
              <Box sx={{ flex: 1, minHeight: 0, width: '100%' }}>
                <JourneyView2D
                  stops={stops}
                  activeIndex={activeIndex}
                  onSelect={manualSelect}
                  theme={theme}
                  stopText={stopText}
                  regionLabels={regionLabels}
                />
              </Box>
            </Box>
          )}
          {viewMode === '2d' && !isMobile && (
            <Box
              sx={{
                flex: '1 1 auto',
                minWidth: 0,
                minHeight: 0,
                width: '100%',
                display: 'flex',
                pointerEvents: 'auto',
              }}
            >
              <JourneyView2D
                stops={stops}
                activeIndex={activeIndex}
                onSelect={manualSelect}
                theme={theme}
                stopText={stopText}
                regionLabels={regionLabels}
              />
            </Box>
          )}
          {!isMobile && (
              <Box
                sx={{
                  flexShrink: 0,
                  width: 380,
                  minHeight: 0,
                  display: 'flex',
                  alignItems: 'flex-start',
                  maxHeight: '100%',
                }}
              >
                <StopDetails
                  stop={stops[activeIndex]}
                  total={stops.length}
                  onPrev={manualPrev}
                  onNext={manualNext}
                  theme={theme}
                  stopText={stopText}
                />
              </Box>
          )}
        </Stack>

        {isMobile && hudOpen && (
          <>
            <Box
              aria-hidden
              onClick={() => setHudOpen(false)}
              sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 1200,
                bgcolor: 'rgba(0, 0, 0, 0.62)',
                pointerEvents: 'auto',
              }}
            />
            <Box
              sx={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 1300,
                width: 'min(360px, calc(100vw - 24px))',
                maxHeight: 'min(82vh, calc(100dvh - 96px))',
                pointerEvents: 'auto',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <UnlockHud
                stops={stops}
                activeIndex={activeIndex}
                onClose={() => setHudOpen(false)}
                theme={theme}
                stopText={stopText}
                mobileOverlay
              />
            </Box>
          </>
        )}

        {isMobile && detailsOpen && stops[activeIndex] && (
          <>
            <Box
              aria-hidden
              onClick={() => setDetailsOpen(false)}
              sx={{
                position: 'fixed',
                inset: 0,
                zIndex: 1400,
                bgcolor: 'rgba(0, 0, 0, 0.55)',
                pointerEvents: 'auto',
              }}
            />
            <Box
              sx={{
                position: 'fixed',
                zIndex: 1410,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 'min(380px, calc(100vw - 24px))',
                maxHeight: 'min(78vh, calc(100dvh - 120px))',
                pointerEvents: 'auto',
                overflowY: 'auto',
              }}
            >
              <StopDetails
                stop={stops[activeIndex]}
                total={stops.length}
                onPrev={manualPrev}
                onNext={manualNext}
                onClose={() => setDetailsOpen(false)}
                compact
                theme={theme}
                stopText={stopText}
              />
            </Box>
          </>
        )}

        <Timeline
          stops={stops}
          activeIndex={activeIndex}
          onSelect={manualSelect}
          playing={playing}
          onTogglePlay={() => setPlaying((p) => !p)}
          onPrev={manualPrev}
          onNext={manualNext}
          theme={theme}
          stopText={stopText}
        />
      </Box>
      <AiAssistantPanel open={assistantOpen} onClose={() => setAssistantOpen(false)} />
      {booting && <JourneyBootLoader theme={theme} label={loadingLabel} />}
      {introOpen && (
        <JourneyIntroOverlay
          theme={theme}
          themeMode={themeMode}
          onThemeChange={changeMode}
          onEnter={dismissIntro}
        />
      )}
    </Box>
  );
}
