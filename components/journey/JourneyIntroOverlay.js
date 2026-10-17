import React, { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import {
  Avatar,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import {
  _NEXTJS_LINK_,
  _PAGE_LINK_CV_,
  _WEBSITE_ADDRESS_,
} from '@/_mocks_/_settings_items_';
import { JOURNEY_LOCALES, JOURNEY_PROFILE, _NAMESPACE_LANGAGE_JOURNEY_ } from '@/_mocks_/_journey_items_';
import { useLangMode } from '@/contexts/LangModeProvider';
import { CursorIcon, NextJsIcon } from '@/components/icons/IconifiyIcons';
import { getCommonFooter, getJourneyProfile, getJourneyUi } from '@/utility/journeyMilestoneText';
import { journeySiteCssVars } from '@/components/journey/journeyTheme';

const PRESENTATION_VIDEO = '/assets/videos/presentation.mp4';

const LANG_LABELS = { fr: 'Français', en: 'English', pt: 'Português' };

export default function JourneyIntroOverlay({ theme, themeMode, onThemeChange, onEnter }) {
  const { t, i18n } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const router = useRouter();
  const langContext = useLangMode();
  const currentLang = JOURNEY_LOCALES.includes(router.locale) ? router.locale : 'fr';

  const changeLang = (lang) => {
    if (!lang || lang === currentLang) return;
    i18n.changeLanguage(lang);
    if (langContext) langContext[1](lang);
    else router.replace(router.asPath, router.asPath, { locale: lang });
  };

  const footer = (key) => getCommonFooter(i18n.language, key);
  const profile = getJourneyProfile(i18n.language);
  const name = profile.name || t('profile.name');
  const role = profile.role || t('profile.role');
  const ui = (key) => getJourneyUi(i18n.language, key) || t(`ui.${key}`);

  const currentYear = new Date().getFullYear();
  const copyrightYears = useMemo(
    () => (currentYear === 2023 ? '2023' : `2023–${currentYear}`),
    [currentYear],
  );

  const border = theme.mode === 'light' ? theme.locked : 'rgba(255, 255, 255, 0.12)';

  const selectSx = {
    fontSize: 13,
    color: theme.text,
    borderRadius: '10px',
    '& .MuiOutlinedInput-notchedOutline': { borderColor: theme.divider },
    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: theme.accent },
    '& .MuiSvgIcon-root': { color: theme.textMuted },
  };

  const labelSx = {
    fontSize: 13,
    color: theme.textMuted,
    '&.Mui-focused': { color: theme.accent },
  };

  const menuPaperSx = {
    bgcolor: theme.surface,
    color: theme.text,
    border: `1px solid ${theme.divider}`,
    boxShadow: theme.glassShadow,
    '& .MuiMenuItem-root': {
      fontSize: 13,
      '&:hover': { bgcolor: `${theme.accent}14` },
      '&.Mui-selected': { bgcolor: `${theme.accent}22`, '&:hover': { bgcolor: `${theme.accent}28` } },
    },
  };

  const themeOptions = [
    { id: 'dark', label: ui('themeDark') },
    { id: 'light', label: ui('themeLight') },
    { id: 'system', label: ui('themeSystem') },
  ];

  return (
    <Box
      role="dialog"
      aria-modal="true"
      aria-labelledby="journey-intro-title"
      sx={{
        position: 'fixed',
        inset: 0,
        zIndex: 1800,
        color: theme.text,
        colorScheme: theme.mode,
        ...journeySiteCssVars(theme),
        animation: 'journeyIntroIn .45s ease-out',
        '@keyframes journeyIntroIn': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      }}
    >
      <Box
        role="button"
        tabIndex={0}
        aria-label={ui('introViewJourney')}
        onClick={onEnter}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onEnter();
          }
        }}
        sx={{
          position: 'absolute',
          inset: 0,
          cursor: 'pointer',
          bgcolor: theme.mode === 'light' ? 'rgba(244, 239, 230, 0.92)' : 'rgba(7, 6, 10, 0.88)',
          backdropFilter: 'blur(22px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(22px) saturate(1.2)',
          border: 'none',
          p: 0,
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100%',
          px: { xs: 1.5, sm: 2 },
          py: { xs: 2, sm: 3 },
          pb: { xs: 14, sm: 16 },
          pointerEvents: 'none',
        }}
      >
        <Box
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
          sx={{
            width: '100%',
            maxWidth: 440,
            pointerEvents: 'auto',
            cursor: 'default',
            borderRadius: '22px',
            border: `1px solid ${border}`,
            bgcolor: theme.surface,
            boxShadow: theme.glassShadow,
            overflow: 'hidden',
            animation: 'journeyIntroCard .5s ease-out',
            '@keyframes journeyIntroCard': {
              from: { opacity: 0, transform: 'translateY(16px) scale(0.98)' },
              to: { opacity: 1, transform: 'translateY(0) scale(1)' },
            },
          }}
        >
        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 1.25 }}
          sx={{ px: { xs: 2, sm: 2.5 }, pt: 2, pb: 0.5 }}
        >
          <FormControl size="small" sx={{ flex: 1, minWidth: 0 }}>
            <InputLabel id="journey-intro-lang-label" sx={labelSx}>
              {ui('language')}
            </InputLabel>
            <Select
              labelId="journey-intro-lang-label"
              id="journey-intro-lang"
              value={currentLang}
              label={ui('language')}
              onChange={(e) => changeLang(e.target.value)}
              sx={{ ...selectSx, fontSize: { xs: 12, sm: 13 } }}
              MenuProps={{ sx: { zIndex: 1900 }, PaperProps: { sx: menuPaperSx } }}
            >
              {JOURNEY_LOCALES.map((lang) => (
                <MenuItem key={lang} value={lang}>
                  {LANG_LABELS[lang] || lang.toUpperCase()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ flex: 1, minWidth: 0 }}>
            <InputLabel id="journey-intro-theme-label" sx={labelSx}>
              {ui('theme')}
            </InputLabel>
            <Select
              labelId="journey-intro-theme-label"
              id="journey-intro-theme"
              value={themeMode}
              label={ui('theme')}
              onChange={(e) => onThemeChange(e.target.value)}
              sx={{ ...selectSx, fontSize: { xs: 12, sm: 13 } }}
              MenuProps={{ sx: { zIndex: 1900 }, PaperProps: { sx: menuPaperSx } }}
            >
              {themeOptions.map(({ id, label }) => (
                <MenuItem key={id} value={id}>
                  {label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>

        <Stack alignItems="center" spacing={1.5} sx={{ px: { xs: 2, sm: 2.5 }, pt: 1.5, pb: 1 }}>
          <Avatar
            src={JOURNEY_PROFILE.photo}
            alt=""
            sx={{
              width: { xs: 88, sm: 96 },
              height: { xs: 88, sm: 96 },
              border: `3px solid ${theme.accent}`,
              boxShadow: `0 0 24px ${theme.accent}44`,
            }}
          />
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              id="journey-intro-title"
              component="h1"
              sx={{ fontSize: { xs: 20, sm: 22 }, fontWeight: 800, color: theme.text, lineHeight: 1.2 }}
            >
              {name}
            </Typography>
            <Typography sx={{ fontSize: 13, color: theme.accent, fontWeight: 600, mt: 0.35 }}>{role}</Typography>
          </Box>
        </Stack>

        <Box sx={{ px: { xs: 1.5, sm: 2 }, pb: 2 }}>
          <Box
            component="video"
            src={PRESENTATION_VIDEO}
            controls
            playsInline
            preload="metadata"
            sx={{
              width: '100%',
              display: 'block',
              borderRadius: '14px',
              border: `1px solid ${theme.divider}`,
              bgcolor: theme.mode === 'light' ? '#000' : '#0a0a0f',
              maxHeight: 'min(42vh, 280px)',
              objectFit: 'contain',
            }}
          />
        </Box>

        <Stack
          direction="row"
          spacing={{ xs: 1, sm: 1.25 }}
          sx={{ px: { xs: 2, sm: 2.5 }, pb: 2.5 }}
        >
          <Button
            fullWidth
            variant="contained"
            onClick={onEnter}
            sx={{
              flex: 1,
              minWidth: 0,
              py: { xs: 1, sm: 1.25 },
              px: { xs: 1, sm: 2 },
              fontSize: { xs: 12, sm: 14 },
              fontWeight: 700,
              borderRadius: '12px',
              bgcolor: theme.accent,
              color: theme.onAccent,
              boxShadow: `0 8px 24px ${theme.accent}44`,
              whiteSpace: { xs: 'nowrap', sm: 'normal' },
              '&:hover': { bgcolor: theme.accent, filter: 'brightness(1.06)' },
            }}
          >
            {ui('introViewJourney')}
          </Button>
          <Button
            fullWidth
            component={Link}
            href={_PAGE_LINK_CV_}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            sx={{
              flex: 1,
              minWidth: 0,
              py: { xs: 1, sm: 1.25 },
              px: { xs: 1, sm: 2 },
              fontSize: { xs: 12, sm: 14 },
              fontWeight: 700,
              borderRadius: '12px',
              borderColor: theme.accent,
              color: theme.accent,
              whiteSpace: { xs: 'nowrap', sm: 'normal' },
              '&:hover': { borderColor: theme.accent, bgcolor: `${theme.accent}14` },
            }}
          >
            {ui('introViewCv')}
          </Button>
        </Stack>
        </Box>
      </Box>

      <Box
        component="footer"
        onClick={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        sx={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          px: 2,
          py: 2,
          pb: 'max(16px, env(safe-area-inset-bottom))',
          borderTop: `1px solid ${theme.divider}`,
          bgcolor: theme.mode === 'light' ? `${theme.surface}f2` : `${theme.background}ee`,
          textAlign: 'center',
          cursor: 'default',
          pointerEvents: 'auto',
        }}
      >
        <Typography sx={{ fontSize: 12, color: theme.textMuted, lineHeight: 1.65 }}>
          {footer('deployedWith')}{' '}
          <Box
            component="a"
            href={_NEXTJS_LINK_}
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.accent, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Next.js <NextJsIcon size={14} style={{ verticalAlign: 'middle' }} />
          </Box>{' '}
          &{' '}
          <Box
            component="a"
            href="https://cursor.com"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.accent, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
          >
            Cursor <CursorIcon size={14} style={{ verticalAlign: 'middle' }} />
          </Box>
        </Typography>
        <Typography sx={{ fontSize: 12, color: theme.textMuted, mt: 0.35 }}>
          {footer('copyright')} {copyrightYears} {_WEBSITE_ADDRESS_}
        </Typography>
        <Typography sx={{ fontSize: 12, color: theme.textMuted }}>{footer('allRightsReserved')}</Typography>
      </Box>
    </Box>
  );
}
