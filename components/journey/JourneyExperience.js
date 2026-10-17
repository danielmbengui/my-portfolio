import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Chip,
  IconButton,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
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
import HomeIcon from '@mui/icons-material/Home';
import PlaceIcon from '@mui/icons-material/Place';
import VideocamIcon from '@mui/icons-material/Videocam';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ViewInArIcon from '@mui/icons-material/ViewInAr';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import VideoFullscreenDialog from '@/components/shared/VideoFullscreenDialog';
import JourneyStepLightboxImage from '@/components/journey/JourneyStepLightboxImage';
import {
  ANGOLA_COLORS,
  JOURNEY_ERAS,
  JOURNEY_LANGUAGES,
  JOURNEY_LOCALES,
  JOURNEY_PROFILE,
  JOURNEY_SKILLS,
  JOURNEY_TOTAL_STOPS,
  _NAMESPACE_LANGAGE_JOURNEY_,
  buildJourneyStops,
} from '@/_mocks_/_journey_items_';
import { useLangMode } from '@/contexts/LangModeProvider';
import { AngolanIcon, EnglishIcon, FrenchIcon, ItalianIcon, PortugueseIcon, SwissIcon } from '@/components/icons/FlagIcons';
import {
  AndroidIcon, C_LangageIcon, CssIcon, CursorIcon, FirebaseIcon, FlutterIcon, GithubIcon, JavaIcon,
  JavascriptIcon, MaterialUiIcon, MySqlIcon, NextJsIcon, OpenAiIcon, PwaIcon, PythonIcon, ReactIcon,
  SolidityIcon, TypescriptIcon, Web3JsIcon,
} from '@/components/icons/IconifiyIcons';
import { getJourneyTheme, useJourneyThemeMode } from './journeyTheme';
import { getJourneyMilestoneFields, getJourneyProfile, getJourneyUi } from '@/utility/journeyMilestoneText';
import JourneyView2D from '@/components/journey/JourneyView2D';

const JourneyScene = dynamic(() => import('./JourneyScene'), { ssr: false });

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
        border: `1px solid ${theme.glassBorder}`,
        borderRadius: '12px !important',
        mb: 1,
        overflow: 'hidden',
        '&.Mui-expanded': { mb: 1 },
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

function HudProjectEntry({ project, theme, tc }) {
  const name = tc(`sections.projects.${project.id}.name`);
  const type = tc(`sections.projects.${project.id}.type`);
  const description = tc(`sections.projects.${project.id}.description`);
  return (
    <Stack
      direction="row"
      spacing={1.25}
      alignItems="flex-start"
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: `1px solid ${theme.glassBorder}`,
        bgcolor: `${theme.accent}0d`,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          flexShrink: 0,
          borderRadius: 1.5,
          border: `1px solid ${theme.glassBorder}`,
          bgcolor: theme.mode === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          p: 0.5,
        }}
      >
        <Box component="img" src={project.img} alt={name} sx={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </Box>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Stack direction="row" alignItems="center" spacing={0.5} flexWrap="wrap" useFlexGap>
          <Typography sx={{ fontSize: 13, fontWeight: 700, color: theme.text, lineHeight: 1.25 }}>{name}</Typography>
          <Chip
            size="small"
            label={type}
            sx={{ height: 20, fontSize: 10, fontWeight: 600, color: theme.text, border: `1px solid ${theme.accent}`, bgcolor: `${theme.accent}22` }}
          />
          <IconButton
            component="a"
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
            aria-label={tc('sections.projects.viewProject')}
            sx={{ ...navButtonSx(theme), width: 28, height: 28, ml: 'auto !important' }}
          >
            <OpenInNewIcon sx={{ fontSize: 14 }} />
          </IconButton>
        </Stack>
        <Typography sx={{ fontSize: 11.5, color: theme.textSoft, lineHeight: 1.5, mt: 0.75 }}>{description}</Typography>
      </Box>
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

const JOURNEY_HUD_PROJECTS = [
  { id: 'dandela', img: 'https://academy.dandela.com/images/logo.png', link: 'https://academy.dandela.com' },
  { id: 'playpad', img: '/img/playpad/playpad_banner.png', link: 'https://playpadapp.com/' },
  { id: 'drilldev', img: '/img/drilldev/complete_logo_drilldev.png', link: 'https://drilldev.com/' },
  { id: 'winno', img: '/img/logos/winnobearzclub.png', link: 'https://winno.bearzclub.io/' },
];

const glass = (theme) => ({
  background: theme.glassBg,
  backdropFilter: 'blur(14px)',
  WebkitBackdropFilter: 'blur(14px)',
  border: `1px solid ${theme.glassBorder}`,
  borderRadius: 3,
  color: theme.text,
  pointerEvents: 'auto',
});

const navButtonSx = (theme) => ({
  color: theme.text,
  border: `1px solid ${theme.locked}`,
  '&:hover': { borderColor: theme.accent, bgcolor: `${theme.accent}22` },
  '&.Mui-disabled': { color: theme.textFaint, borderColor: theme.track },
});

const toggleGroupSx = (theme) => ({
  ...glass(theme),
  '& .MuiToggleButton-root': {
    color: theme.textMuted,
    border: 'none',
    px: 1.1,
    py: 0.6,
    fontSize: 12,
    fontWeight: 700,
    '&.Mui-selected': { color: theme.mode === 'dark' ? '#140405' : '#fff', bgcolor: theme.accent },
    '&.Mui-selected:hover': { bgcolor: theme.accent },
  },
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

function ProfileCard({ theme, compact = false, collapsible = false }) {
  const { t, i18n } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const profile = getJourneyProfile(i18n.language);
  const name = profile.name || t('profile.name');
  const role = profile.role || t('profile.role');
  const based = profile.based || t('profile.based');
  const tagline = profile.tagline || t('profile.tagline');
  const showDetails = !collapsible || detailsOpen;
  const avatarPx = compact ? (collapsible && !detailsOpen ? 44 : { xs: 48, md: 64 }) : 64;

  return (
    <Box sx={{ mb: compact ? 0 : 2.5, minWidth: 0, flex: compact && !collapsible ? 1 : undefined }}>
      <Stack direction="row" spacing={collapsible && !detailsOpen ? 0 : 1.5} alignItems="center">
        <Box
          component={collapsible ? 'button' : 'div'}
          type={collapsible ? 'button' : undefined}
          onClick={collapsible ? () => setDetailsOpen((o) => !o) : undefined}
          aria-label={collapsible ? name : undefined}
          aria-expanded={collapsible ? detailsOpen : undefined}
          sx={{
            p: '3px',
            borderRadius: '50%',
            background: `conic-gradient(${ANGOLA_COLORS.red}, ${ANGOLA_COLORS.black}, ${ANGOLA_COLORS.gold}, ${ANGOLA_COLORS.red})`,
            boxShadow: `0 0 18px ${theme.accent}55`,
            flexShrink: 0,
            border: 'none',
            cursor: collapsible ? 'pointer' : 'default',
            display: 'flex',
            '&:focus-visible': { outline: `2px solid ${theme.accent}`, outlineOffset: 2 },
          }}
        >
          <Avatar
            src={JOURNEY_PROFILE.photo}
            alt={name}
            sx={{
              width: avatarPx,
              height: avatarPx,
              border: `2px solid ${theme.background}`,
            }}
          />
        </Box>
        {showDetails && (
          <Box sx={{ minWidth: 0, animation: collapsible ? 'journeyIn .35s ease' : 'none' }}>
            <Typography
              component={compact ? 'h1' : 'p'}
              sx={{
                fontSize: compact ? { xs: 15, md: 18 } : 17,
                fontWeight: 800,
                color: theme.text,
                lineHeight: 1.2,
                m: 0,
              }}
            >
              {name}
            </Typography>
            <Typography sx={{ fontSize: compact ? { xs: 10.5, md: 12 } : 12, color: theme.accent, fontWeight: 600, mt: 0.25, lineHeight: 1.35 }}>
              {role}
            </Typography>
            <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
              <AngolanIcon size={14} />
              <SwissIcon size={14} />
              <Typography sx={{ fontSize: 11, color: theme.textMuted }}>{based}</Typography>
            </Stack>
          </Box>
        )}
      </Stack>
      {!compact && (
        <Typography sx={{ fontSize: 12.5, color: theme.textSoft, lineHeight: 1.55, mt: 1.25 }}>{tagline}</Typography>
      )}
    </Box>
  );
}

function UnlockHud({ stops, activeIndex, onClose, theme, stopText, mobileOverlay = false }) {
  const { t, i18n } = useTranslation([_NAMESPACE_LANGAGE_JOURNEY_, NS_COMMON]);
  const tc = useCallback((key, opts) => t(key, { ns: NS_COMMON, ...opts }), [t]);
  const profile = getJourneyProfile(i18n.language);
  const hudIntro = profile.hudIntro || t('profile.hudIntro', { ns: _NAMESPACE_LANGAGE_JOURNEY_ });
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
            const accent = unlockedAt ? JOURNEY_ERAS[unlockedAt.era]?.color : theme.accent;
            return (
              <Tooltip
                key={lang.id}
                placement="right"
                title={unlockedAt ? unlockedLabel('ui.unlockedAt', unlockedAt) : t(`languages.${lang.id}.level`)}
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
                    <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2, color: theme.text }}>{t(`languages.${lang.id}.label`)}</Typography>
                    <Typography sx={{ fontSize: 11, color: theme.textMuted }}>{t(`languages.${lang.id}.level`)}</Typography>
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
            const color = unlockedAt ? JOURNEY_ERAS[unlockedAt.era]?.color : theme.accent;
            const muiIcon = ['business', 'writing', 'scrum'].includes(skill.id);
            return (
              <Tooltip
                key={skill.id}
                title={unlockedAt ? unlockedLabel('ui.acquiredAt', unlockedAt) : skill.label || t(`skills.${skill.id}`)}
              >
                <Chip
                  size="small"
                  icon={<SkillChipIcon Icon={Icon} theme={theme} muiIcon={muiIcon} />}
                  label={skill.label || t(`skills.${skill.id}`)}
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
        title={tc('sections.projects.title')}
        theme={theme}
        countLabel={<Typography sx={{ fontSize: 11, color: theme.textMuted }}>{JOURNEY_HUD_PROJECTS.length}</Typography>}
      >
        <Stack spacing={1}>
          {JOURNEY_HUD_PROJECTS.map((project) => (
            <HudProjectEntry key={project.id} project={project} theme={theme} tc={tc} />
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

function StopDetails({ stop, total, onPrev, onNext, compact = false, mobileLayout = false, theme, stopText }) {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const [expanded, setExpanded] = useState(false);
  const era = JOURNEY_ERAS[stop.era];
  const text = stopText(stop);
  const showBody = !compact || expanded;
  const fullHeightMobile = mobileLayout && expanded;
  const unlocked = [
    ...stop.languages.map((id) => t(`languages.${id}.label`)),
    ...stop.skills.map((id) => {
      const skill = JOURNEY_SKILLS.find((s) => s.id === id);
      return skill?.label || t(`skills.${id}`);
    }),
  ];

  useEffect(() => {
    setExpanded(false);
  }, [stop.id]);

  const card = (
    <Box
      key={stop.id}
      sx={{
        ...glass(theme),
        p: 2.5,
        width: '100%',
        boxSizing: 'border-box',
        animation: 'journeyIn .45s ease',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
        maxHeight: fullHeightMobile ? '100%' : compact ? 'none' : '100%',
        height: fullHeightMobile ? '100%' : 'auto',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1,
        ...(mobileLayout && { mt: 3, pt: 2.5 }),
      }}
    >
      <Box sx={{ flex: fullHeightMobile ? 1 : undefined, minHeight: 0, overflowY: fullHeightMobile ? 'auto' : 'visible', WebkitOverflowScrolling: 'touch' }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 1.5 }}>
        <Chip
          size="small"
          label={t(`eras.${stop.era}`)}
          sx={{ color: theme.mode === 'dark' ? era?.color : theme.text, border: `1px solid ${era?.color}`, bgcolor: `${era?.color}26`, fontWeight: 700, fontSize: 11 }}
        />
        <Typography sx={{ fontSize: 12, color: theme.textMuted, fontVariantNumeric: 'tabular-nums' }}>
          {String(stop.index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </Typography>
      </Stack>

      {!mobileLayout && (
        <>
          <Typography
            sx={{
              fontSize: compact ? 28 : { xs: 34, sm: 44 },
              fontWeight: 800,
              lineHeight: 1,
              background: `linear-gradient(90deg, ${era?.color}, ${theme.text})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            {text.year}
          </Typography>
          <Typography sx={{ fontSize: compact ? 16 : { xs: 18, sm: 21 }, fontWeight: 700, mt: 1, color: theme.text }}>{text.title}</Typography>
        </>
      )}
      <Stack direction="row" alignItems="center" spacing={0.5} sx={{ color: theme.textMuted, mt: 0.5 }}>
        <PlaceIcon sx={{ fontSize: 16, color: era?.color }} />
        <Typography sx={{ fontSize: 13, color: theme.textMuted }}>{text.place}</Typography>
      </Stack>

      {showBody && (
        <>
          <Typography sx={{ fontSize: 14, lineHeight: 1.65, color: theme.textSoft, mt: 2, fontStyle: stop.placeholder ? 'italic' : 'normal' }}>
            {text.description}
          </Typography>

          <Box sx={{ mt: 2, borderRadius: 2, overflow: 'hidden', border: `1px solid ${era?.color}55`, bgcolor: theme.track }}>
            {stop.video ? (
              <video key={stop.video} src={stop.video} autoPlay muted loop playsInline controls style={{ width: '100%', display: 'block' }} />
            ) : stop.image ? (
              <JourneyStepLightboxImage
                src={stop.image}
                alt={text.title}
                borderColor={`${era?.color}55`}
                trackBg={theme.track}
              />
            ) : (
              <Stack alignItems="center" justifyContent="center" spacing={0.5} sx={{ aspectRatio: '16 / 9', color: theme.textFaint }}>
                <VideocamIcon />
                <Typography sx={{ fontSize: 12, color: theme.textFaint }}>{t('ui.videoSoon')}</Typography>
              </Stack>
            )}
          </Box>

          {unlocked.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <SectionTitle theme={theme}>{t('ui.unlockedHere')}</SectionTitle>
              <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.75}>
                {unlocked.map((label) => (
                  <Chip key={label} size="small" label={`+ ${label}`} sx={{ color: theme.text, bgcolor: `${era?.color}33`, border: `1px solid ${era?.color}` }} />
                ))}
              </Stack>
            </Box>
          )}
        </>
      )}
      </Box>

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
        {compact && (
          <Chip
            label={expanded ? t('ui.collapse') : t('ui.seeDetails')}
            onClick={() => setExpanded((e) => !e)}
            sx={{ ml: 'auto !important', color: theme.text, border: `1px solid ${era?.color}`, bgcolor: `${era?.color}22` }}
          />
        )}
      </Stack>
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
        width: 'min(360px, calc(100vw - 24px))',
        mx: 'auto',
        flex: fullHeightMobile ? '1 1 auto' : '0 0 auto',
        minHeight: 0,
        maxHeight: fullHeightMobile ? '100%' : 'none',
        alignSelf: fullHeightMobile ? 'stretch' : 'flex-start',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: 'auto',
        position: 'relative',
        isolation: 'isolate',
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          zIndex: 0,
          top: fullHeightMobile ? 4 : -6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '115%',
          maxWidth: 'calc(100vw - 8px)',
          textAlign: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
          lineHeight: 1.05,
        }}
      >
        <Typography
          sx={{
            fontSize: fullHeightMobile ? 48 : 38,
            fontWeight: 900,
            letterSpacing: '-0.02em',
            background: `linear-gradient(90deg, ${era?.color}88, ${theme.text}55)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          {text.year}
        </Typography>
        <Typography
          sx={{
            fontSize: fullHeightMobile ? 22 : 18,
            fontWeight: 800,
            mt: 0.5,
            px: 1,
            color: theme.text,
            opacity: 0.28,
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
          }}
        >
          {text.place}
        </Typography>
      </Box>
      {card}
    </Box>
  );
}

function Timeline({ stops, activeIndex, onSelect, playing, onTogglePlay, onPrev, onNext, theme, stopText }) {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  return (
    <Box sx={{ ...glass(theme), px: 2, py: 1.5, width: '100%' }}>
      <Stack direction="row" alignItems="center" spacing={1.5}>
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

        <Stack direction="row" alignItems="flex-end" sx={{ flex: 1, height: 34, gap: '2px' }}>
          {stops.map((stop) => {
            const color = JOURNEY_ERAS[stop.era]?.color;
            const active = stop.index === activeIndex;
            const passed = stop.index <= activeIndex;
            const text = stopText(stop);
            return (
              <Tooltip key={stop.id} title={`${text.year} · ${text.title}`} placement="top" disableInteractive>
                <Box
                  onClick={() => onSelect(stop.index)}
                  sx={{
                    flex: 1,
                    minWidth: 2,
                    cursor: 'pointer',
                    borderRadius: 1,
                    height: active ? 34 : stop.placeholder ? 10 : 20,
                    bgcolor: color,
                    opacity: passed ? 1 : theme.mode === 'light' ? 0.42 : 0.22,
                    border: theme.mode === 'light' && !passed ? `1px solid ${color}55` : 'none',
                    boxShadow: active ? `0 0 14px ${color}` : theme.mode === 'light' ? `0 0 4px ${color}44` : 'none',
                    transition: 'all .35s ease',
                    '&:hover': { opacity: 1, height: active ? 34 : 26 },
                  }}
                />
              </Tooltip>
            );
          })}
        </Stack>
      </Stack>
      <Stack direction="row" flexWrap="wrap" useFlexGap gap={1.5} sx={{ mt: 1, display: { xs: 'none', md: 'flex' } }}>
        {Object.values(JOURNEY_ERAS).map((era) => (
          <Stack key={era.id} direction="row" alignItems="center" spacing={0.75}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: era.color, boxShadow: `0 0 8px ${era.color}` }} />
            <Typography sx={{ fontSize: 11, color: theme.textMuted }}>{t(`eras.${era.id}`)}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

const JOURNEY_VIEW_STORAGE_KEY = 'journey-view-mode';

function HeaderControls({ theme, themeMode, onThemeChange, isMobile, onToggleHud, viewMode, onViewModeChange }) {
  const { t, i18n } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const router = useRouter();
  const langContext = useLangMode();
  const currentLang = JOURNEY_LOCALES.includes(router.locale) ? router.locale : 'fr';

  const changeLang = (_, lang) => {
    if (!lang || lang === currentLang) return;
    i18n.changeLanguage(lang);
    if (langContext) langContext[1](lang);
    else router.replace(router.asPath, router.asPath, { locale: lang });
  };

  const setView = (_, mode) => {
    if (!mode || mode === viewMode) return;
    onViewModeChange(mode);
    try {
      sessionStorage.setItem(JOURNEY_VIEW_STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  };

  const ui = (key) => getJourneyUi(i18n.language, key) || t(`ui.${key}`);

  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ pointerEvents: 'auto', gap: 1 }}>
      <ToggleButtonGroup exclusive size="small" value={viewMode} onChange={setView} sx={toggleGroupSx(theme)}>
        <ToggleButton value="3d" aria-label={ui('view3d')}>
          <Tooltip title={ui('view3d')}><ViewInArIcon sx={{ fontSize: 18 }} /></Tooltip>
        </ToggleButton>
        <ToggleButton value="2d" aria-label={ui('view2d')}>
          <Tooltip title={ui('view2d')}><FormatListBulletedIcon sx={{ fontSize: 18 }} /></Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
      <Tooltip title={t('ui.language')}>
        <ToggleButtonGroup exclusive size="small" value={currentLang} onChange={changeLang} sx={toggleGroupSx(theme)}>
          {JOURNEY_LOCALES.map((lang) => (
            <ToggleButton key={lang} value={lang}>{lang.toUpperCase()}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Tooltip>
      <ToggleButtonGroup exclusive size="small" value={themeMode} onChange={(_, m) => m && onThemeChange(m)} sx={toggleGroupSx(theme)}>
        <ToggleButton value="dark" aria-label={t('ui.themeDark')}>
          <Tooltip title={t('ui.themeDark')}><DarkModeIcon sx={{ fontSize: 18 }} /></Tooltip>
        </ToggleButton>
        <ToggleButton value="light" aria-label={t('ui.themeLight')}>
          <Tooltip title={t('ui.themeLight')}><LightModeIcon sx={{ fontSize: 18 }} /></Tooltip>
        </ToggleButton>
        <ToggleButton value="system" aria-label={t('ui.themeSystem')}>
          <Tooltip title={t('ui.themeSystem')}><SettingsBrightnessIcon sx={{ fontSize: 18 }} /></Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
      {isMobile && (
        <Tooltip title={t('ui.settings')}>
          <IconButton onClick={onToggleHud} sx={{ ...glass(theme), ...navButtonSx(theme) }}>
            <TuneIcon />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={t('ui.home')}>
        <IconButton component={Link} href="/" sx={{ ...glass(theme), ...navButtonSx(theme) }}>
          <HomeIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

export default function JourneyExperience() {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const stops = useMemo(() => buildJourneyStops(JOURNEY_TOTAL_STOPS), []);
  const stopText = useStopText();
  const { mode: themeMode, resolved, changeMode } = useJourneyThemeMode();
  const theme = getJourneyTheme(resolved);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [hudOpen, setHudOpen] = useState(false);
  const [viewMode, setViewMode] = useState('3d');
  const isMobile = useMediaQuery('(max-width: 900px)');

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(JOURNEY_VIEW_STORAGE_KEY);
      if (saved === '2d' || saved === '3d') setViewMode(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const labels = useMemo(() => stops.map(stopText), [stops, stopText]);
  const regionLabels = useMemo(() => ({ angola: t('regions.angola'), suisse: t('regions.suisse') }), [t]);

  const select = useCallback((index) => {
    setActiveIndex(Math.max(0, Math.min(stops.length - 1, index)));
  }, [stops.length]);
  const next = useCallback(() => setActiveIndex((i) => Math.min(stops.length - 1, i + 1)), [stops.length]);
  const prev = useCallback(() => setActiveIndex((i) => Math.max(0, i - 1)), []);

  const manualSelect = (index) => { setPlaying(false); select(index); };
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

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        overflow: 'hidden',
        bgcolor: theme.background,
        transition: 'background-color .4s ease',
        fontFamily: 'Roboto, sans-serif',
        '@keyframes journeyIn': {
          from: { opacity: 0, transform: 'translateY(12px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      }}
    >
      {viewMode === '3d' && (
        <JourneyScene
          stops={stops}
          labels={labels}
          regionLabels={regionLabels}
          activeIndex={activeIndex}
          onSelect={manualSelect}
          theme={theme}
          showFloatingLabels={!isMobile}
        />
      )}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: 2,
          p: { xs: 1.5, md: 3 },
        }}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems={{ xs: 'center', md: 'flex-start' }}
          spacing={1}
          sx={{ width: '100%', gap: 1 }}
        >
          <Box sx={{ pointerEvents: 'auto', minWidth: 0, flex: isMobile ? '0 0 auto' : 1, maxWidth: isMobile ? 'calc(100% - 8px)' : 'none' }}>
            <ProfileCard theme={theme} compact collapsible={isMobile} />
          </Box>
          <HeaderControls
            theme={theme}
            themeMode={themeMode}
            onThemeChange={changeMode}
            isMobile={isMobile}
            onToggleHud={() => setHudOpen((o) => !o)}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
          />
        </Stack>

        <Stack
          direction="row"
          justifyContent={{ xs: 'center', md: 'space-between' }}
          alignItems={{ xs: 'flex-start', md: 'stretch' }}
          spacing={2}
          sx={{ minHeight: 0, height: '100%', width: '100%', position: 'relative' }}
        >
          {!isMobile && (
            <Box sx={{ minHeight: 0, display: 'flex', alignItems: 'flex-start' }}>
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
              <Box sx={{ flex: 1, minHeight: 0 }}>
                <JourneyView2D
                  stops={stops}
                  activeIndex={activeIndex}
                  onSelect={manualSelect}
                  theme={theme}
                  stopText={stopText}
                  regionLabels={regionLabels}
                />
              </Box>
              <Box sx={{ flexShrink: 0, maxHeight: '42vh', overflowY: 'auto', pointerEvents: 'auto' }}>
                <StopDetails
                  stop={stops[activeIndex]}
                  total={stops.length}
                  onPrev={manualPrev}
                  onNext={manualNext}
                  compact
                  mobileLayout
                  theme={theme}
                  stopText={stopText}
                />
              </Box>
            </Box>
          )}
          {viewMode === '2d' && !isMobile && (
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                minHeight: 0,
                display: 'flex',
                pointerEvents: 'auto',
                maxWidth: 'min(560px, 44vw)',
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
          {(!isMobile || !hudOpen) && !(isMobile && viewMode === '2d') && (
            isMobile ? (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  minHeight: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  pointerEvents: 'none',
                }}
              >
                <StopDetails
                  stop={stops[activeIndex]}
                  total={stops.length}
                  onPrev={manualPrev}
                  onNext={manualNext}
                  compact
                  mobileLayout
                  theme={theme}
                  stopText={stopText}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  ml: 'auto',
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
            )
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
    </Box>
  );
}
