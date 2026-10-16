import React, { useCallback, useEffect, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  Avatar, Box, Chip, IconButton, Stack, ToggleButton, ToggleButtonGroup, Tooltip, Typography, useMediaQuery,
} from '@mui/material';
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

const JourneyScene = dynamic(() => import('./JourneyScene'), { ssr: false });

const FLAGS = { fr: FrenchIcon, ao: AngolanIcon, en: EnglishIcon, it: ItalianIcon, pt: PortugueseIcon };

const SKILL_ICONS = {
  java: JavaIcon, sql: MySqlIcon, android: AndroidIcon, python: PythonIcon, javascript: JavascriptIcon,
  css: CssIcon, c: C_LangageIcon, git: GithubIcon, solidity: SolidityIcon, web3: Web3JsIcon, ai: OpenAiIcon,
  nextjs: NextJsIcon, react: ReactIcon, flutter: FlutterIcon, firebase: FirebaseIcon, pwa: PwaIcon,
  mui: MaterialUiIcon, typescript: TypescriptIcon, cursor: CursorIcon,
};

const AUTOPLAY_MS = 4500;

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
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  return useCallback((stop) => {
    const place = t(`milestones.${stop.placeKey}.place`);
    if (stop.placeholder) {
      return {
        year: t('ui.placeholderYear'),
        title: t('ui.placeholderTitle', { n: String(stop.index + 1).padStart(2, '0') }),
        description: t('ui.placeholderDescription'),
        place,
      };
    }
    return {
      year: stop.today ? t('ui.today') : stop.year || t('ui.unknownYear'),
      title: t(`milestones.${stop.milestoneId}.title`),
      description: t(`milestones.${stop.milestoneId}.description`),
      place,
    };
  }, [t]);
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

function ProfileCard({ theme }) {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  return (
    <Box sx={{ mb: 2.5 }}>
      <Stack direction="row" spacing={1.5} alignItems="center">
        <Box
          sx={{
            p: '3px',
            borderRadius: '50%',
            background: `conic-gradient(${ANGOLA_COLORS.red}, ${ANGOLA_COLORS.black}, ${ANGOLA_COLORS.gold}, ${ANGOLA_COLORS.red})`,
            boxShadow: `0 0 18px ${theme.accent}55`,
            flexShrink: 0,
          }}
        >
          <Avatar src={JOURNEY_PROFILE.photo} alt={t('profile.name')} sx={{ width: 64, height: 64, border: `2px solid ${theme.background}` }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 17, fontWeight: 800, color: theme.text, lineHeight: 1.2 }}>{t('profile.name')}</Typography>
          <Typography sx={{ fontSize: 12, color: theme.accent, fontWeight: 600, mt: 0.25 }}>{t('profile.role')}</Typography>
          <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.5 }}>
            <AngolanIcon size={14} />
            <SwissIcon size={14} />
            <Typography sx={{ fontSize: 11, color: theme.textMuted }}>{t('profile.based')}</Typography>
          </Stack>
        </Box>
      </Stack>
      <Typography sx={{ fontSize: 12.5, color: theme.textSoft, lineHeight: 1.55, mt: 1.25 }}>{t('profile.tagline')}</Typography>
    </Box>
  );
}

function UnlockHud({ stops, activeIndex, onClose, theme, stopText }) {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
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
    <Box sx={{ ...glass(theme), position: 'relative', p: 2, width: 290, maxHeight: '100%', overflowY: 'auto' }}>
      {onClose && (
        <IconButton size="small" onClick={onClose} sx={{ position: 'absolute', top: 8, right: 8, color: theme.text }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
      <ProfileCard theme={theme} />

      <SectionTitle theme={theme} right={<Typography sx={{ fontSize: 11, color: theme.textMuted }}>{languages.size}/{JOURNEY_LANGUAGES.length}</Typography>}>
        {t('ui.languages')}
      </SectionTitle>
      <Stack spacing={0.75} sx={{ mb: 2.5 }}>
        {JOURNEY_LANGUAGES.map((lang) => {
          const Flag = FLAGS[lang.flag];
          const unlockedAt = languages.get(lang.id);
          return (
            <Tooltip key={lang.id} placement="right" title={unlockedAt ? unlockedLabel('ui.unlockedAt', unlockedAt) : t('ui.notUnlocked')}>
              <Stack
                direction="row"
                alignItems="center"
                spacing={1.25}
                sx={{
                  opacity: unlockedAt ? 1 : 0.3,
                  filter: unlockedAt ? 'none' : 'grayscale(1)',
                  transition: 'opacity .5s ease, filter .5s ease',
                }}
              >
                {Flag && <Flag size={20} />}
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.2, color: theme.text }}>{t(`languages.${lang.id}.label`)}</Typography>
                  <Typography sx={{ fontSize: 11, color: theme.textMuted }}>{t(`languages.${lang.id}.level`)}</Typography>
                </Box>
              </Stack>
            </Tooltip>
          );
        })}
      </Stack>

      <SectionTitle theme={theme} right={<Typography sx={{ fontSize: 11, color: theme.textMuted }}>{skills.size}/{JOURNEY_SKILLS.length}</Typography>}>
        {t('ui.skills')}
      </SectionTitle>
      <Box sx={{ height: 4, borderRadius: 2, bgcolor: theme.track, mb: 1.5, overflow: 'hidden' }}>
        <Box
          sx={{
            height: '100%',
            width: `${(skills.size / JOURNEY_SKILLS.length) * 100}%`,
            background: theme.titleGradient,
            transition: 'width .6s ease',
          }}
        />
      </Box>
      <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.75}>
        {JOURNEY_SKILLS.map((skill) => {
          const Icon = SKILL_ICONS[skill.id];
          const unlockedAt = skills.get(skill.id);
          const color = unlockedAt ? JOURNEY_ERAS[unlockedAt.era]?.color : theme.text;
          return (
            <Tooltip key={skill.id} title={unlockedAt ? unlockedLabel('ui.acquiredAt', unlockedAt) : t('ui.toUnlock')}>
              <Chip
                size="small"
                icon={Icon ? <Box component="span" sx={{ display: 'flex', pl: 0.5 }}><Icon size={14} color={theme.text} /></Box> : undefined}
                label={skill.label || t(`skills.${skill.id}`)}
                sx={{
                  color: theme.text,
                  fontSize: 11,
                  bgcolor: unlockedAt ? `${color}26` : 'transparent',
                  border: `1px solid ${unlockedAt ? color : theme.locked}`,
                  boxShadow: unlockedAt ? `0 0 10px ${color}55` : 'none',
                  opacity: unlockedAt ? 1 : 0.32,
                  filter: unlockedAt ? 'none' : 'grayscale(1)',
                  transition: 'all .5s ease',
                }}
              />
            </Tooltip>
          );
        })}
      </Stack>
    </Box>
  );
}

function StopDetails({ stop, total, onPrev, onNext, compact = false, theme, stopText }) {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const [expanded, setExpanded] = useState(false);
  const era = JOURNEY_ERAS[stop.era];
  const text = stopText(stop);
  const showBody = !compact || expanded;
  const unlocked = [
    ...stop.languages.map((id) => t(`languages.${id}.label`)),
    ...stop.skills.map((id) => {
      const skill = JOURNEY_SKILLS.find((s) => s.id === id);
      return skill?.label || t(`skills.${id}`);
    }),
  ];

  return (
    <Box key={stop.id} sx={{ ...glass(theme), p: 2.5, width: '100%', maxHeight: '100%', overflowY: 'auto', animation: 'journeyIn .45s ease' }}>
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

      <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: compact ? 1.5 : 2.5 }}>
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
                    opacity: passed ? 1 : 0.22,
                    boxShadow: active ? `0 0 14px ${color}` : 'none',
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

function HeaderControls({ theme, themeMode, onThemeChange, isMobile, onToggleHud }) {
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

  return (
    <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap" useFlexGap sx={{ pointerEvents: 'auto', gap: 1 }}>
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
  const isMobile = useMediaQuery('(max-width: 900px)');

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
      <JourneyScene
        stops={stops}
        labels={labels}
        regionLabels={regionLabels}
        activeIndex={activeIndex}
        onSelect={manualSelect}
        theme={theme}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: 2,
          p: { xs: 1.5, md: 3 },
        }}
      >
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', md: 'flex-start' }} spacing={1}>
          <Box sx={{ pointerEvents: 'auto' }}>
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 24, md: 40 },
                fontWeight: 900,
                letterSpacing: '0.08em',
                lineHeight: 1,
                background: theme.titleGradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('ui.title')}
            </Typography>
            <Typography sx={{ color: theme.textMuted, fontSize: { xs: 11, md: 14 }, mt: 0.5, letterSpacing: '0.12em' }}>
              {t('ui.subtitle')}
            </Typography>
          </Box>
          <HeaderControls
            theme={theme}
            themeMode={themeMode}
            onThemeChange={changeMode}
            isMobile={isMobile}
            onToggleHud={() => setHudOpen((o) => !o)}
          />
        </Stack>

        <Stack direction="row" justifyContent="space-between" alignItems="stretch" spacing={2} sx={{ minHeight: 0 }}>
          {(!isMobile || hudOpen) && (
            <Box sx={{ minHeight: 0, display: 'flex', alignItems: 'flex-start' }}>
              <UnlockHud
                stops={stops}
                activeIndex={activeIndex}
                onClose={isMobile ? () => setHudOpen(false) : undefined}
                theme={theme}
                stopText={stopText}
              />
            </Box>
          )}
          {(!isMobile || !hudOpen) && (
            <Box
              sx={{
                ml: 'auto',
                width: { xs: '100%', md: 380 },
                minHeight: 0,
                display: 'flex',
                alignItems: { xs: 'flex-end', md: 'flex-start' },
                maxHeight: { xs: '55vh', md: '100%' },
              }}
            >
              <StopDetails
                stop={stops[activeIndex]}
                total={stops.length}
                onPrev={manualPrev}
                onNext={manualNext}
                compact={isMobile}
                theme={theme}
                stopText={stopText}
              />
            </Box>
          )}
        </Stack>

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
