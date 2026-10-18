import { useCallback, useEffect, useState } from 'react';
import { ANGOLA_COLORS } from '@/_mocks_/_journey_items_';

export const JOURNEY_THEME_MODES = ['dark', 'light', 'system'];
const STORAGE_KEY = 'journey-theme-mode';

const DARK = {
  mode: 'dark',
  background: '#07060a',
  backgroundGradient: 'radial-gradient(120% 90% at 50% 0%, #15101a 0%, #07060a 55%, #030204 100%)',
  text: '#f7f5f2',
  textSoft: '#f7f5f2d9',
  textMuted: '#f7f5f2a6',
  textFaint: '#f7f5f259',
  glassBg: 'rgba(14, 11, 16, 0.72)',
  glassBorder: 'rgba(255, 255, 255, 0.10)',
  glassHighlight: 'rgba(255, 255, 255, 0.06)',
  glassShadow: '0 18px 48px rgba(0, 0, 0, 0.55), 0 1px 0 rgba(255, 255, 255, 0.04) inset',
  surface: '#121016',
  surfaceAlt: '#1a1720',
  divider: 'rgba(255, 255, 255, 0.08)',
  accent: ANGOLA_COLORS.gold,
  accent2: ANGOLA_COLORS.redBright,
  onAccent: '#140405',
  titleGradient: `linear-gradient(90deg, ${ANGOLA_COLORS.redBright}, #ff6a1a, ${ANGOLA_COLORS.gold})`,
  track: 'rgba(255, 255, 255, 0.10)',
  locked: 'rgba(255, 255, 255, 0.16)',
  focusRing: ANGOLA_COLORS.gold,
  scene: {
    stars: true,
    sparkles: '#9a9aa8',
    sparklesOpacity: 0.35,
    ground: '#0b0a0f',
    groundOpacity: 0.92,
    gridCell: '#3c3b46',
    gridSection: '#5d5c6a',
    gridLabel: '#8a8a94',
    regionLabelAngola: ANGOLA_COLORS.gold,
    regionLabelSuisse: ANGOLA_COLORS.redBright,
    pathLine: '#f4f2ee',
    pathLineFuture: '#4a4954',
    pathHalo: '#f4f2ee',
    pathHaloOpacity: 0.18,
    pathFutureMix: 0.3,
    pathLineWidth: 2.4,
    fogNear: 40,
    fogFar: 130,
    hemiSky: '#6d6a85',
    hemiGround: '#120d10',
    hemiIntensity: 0.55,
    directional: 0.5,
    ambient: 0.3,
    pointLightIntensity: 70,
    stopEmissiveBoost: 1,
    stopBase: '#1a1820',
    yearLabel: '#c9c6cf',
    comet: '#f4f2ee',
    bloom: { intensity: 1.15, threshold: 0.32, smoothing: 0.35 },
    vignette: 0.7,
    exposure: 1.05,
    labelBg: 'rgba(10, 8, 12, 0.88)',
    labelText: '#f7f5f2',
  },
};

const LIGHT = {
  mode: 'light',
  background: '#f4f4f6',
  backgroundGradient: 'linear-gradient(180deg, #fafafa 0%, #f4f4f6 50%, #ebebef 100%)',
  text: '#15110f',
  textSoft: '#15110fd9',
  textMuted: '#15110fa6',
  textFaint: '#15110f66',
  glassBg: 'rgba(255, 253, 249, 0.86)',
  glassBorder: 'rgba(21, 17, 15, 0.10)',
  glassHighlight: 'rgba(255, 255, 255, 0.9)',
  glassShadow: '0 14px 40px rgba(60, 40, 20, 0.14), 0 1px 0 rgba(255, 255, 255, 0.8) inset',
  surface: '#ffffff',
  surfaceAlt: '#ececef',
  divider: 'rgba(21, 17, 15, 0.08)',
  accent: ANGOLA_COLORS.red,
  accent2: '#b88900',
  onAccent: '#ffffff',
  titleGradient: `linear-gradient(90deg, ${ANGOLA_COLORS.red}, #4a1a10, #b88900)`,
  track: 'rgba(21, 17, 15, 0.08)',
  locked: 'rgba(21, 17, 15, 0.14)',
  focusRing: ANGOLA_COLORS.red,
  scene: {
    stars: false,
    sparkles: '#6b6560',
    sparklesOpacity: 0.22,
    ground: '#FFFFFF',
    groundOpacity: 1,
    gridCell: '#FFFFFF',
    gridSection: '#a1a1aa',
    gridLabel: '#a1a1aa',
    regionLabelAngola: '#8a6600',
    regionLabelSuisse: '#9b0824',
    pathLine: '#17130f',
    pathLineFuture: '#8c8378',
    pathHalo: '#17130f',
    pathHaloOpacity: 0.08,
    pathFutureMix: 0.1,
    pathLineWidth: 3,
    fogNear: 70,
    fogFar: 180,
    hemiSky: '#ffffff',
    hemiGround: '#cfc4b2',
    hemiIntensity: 0.7,
    directional: 1.1,
    ambient: 0.4,
    pointLightIntensity: 40,
    stopEmissiveBoost: 1.35,
    stopBase: '#ffffff',
    yearLabel: '#4a443e',
    comet: '#17130f',
    bloom: { intensity: 0.12, threshold: 0.9, smoothing: 0.5 },
    vignette: 0.1,
    exposure: 1.0,
    labelBg: 'rgba(255, 255, 255, 0.96)',
    labelText: '#15110f',
  },
};

export function getJourneyTheme(resolvedMode) {
  return resolvedMode === 'light' ? LIGHT : DARK;
}

/** Boutons ronds type assistant / menu (alignés sur l’accueil, tokens parcours). */
export function journeyChromeButtonSx(theme, size = 44) {
  const { accent, mode, surface, focusRing } = theme;
  const isLight = mode === 'light';
  const accentSoft = isLight ? `${accent}1f` : `${accent}47`;
  const accentRing = isLight ? `${accent}2e` : `${accent}40`;

  return {
    width: size,
    height: size,
    borderRadius: '50%',
    border: `2px solid ${accent}`,
    background: surface,
    color: accent,
    boxShadow: isLight
      ? `0 8px 28px rgba(60, 40, 20, 0.12), 0 0 0 1px ${accentRing}`
      : `0 8px 32px rgba(0, 0, 0, 0.35), 0 0 0 1px ${accentRing}`,
    transition: 'background-color .2s ease, box-shadow .2s ease, border-color .2s ease, transform .15s ease',
    '&:hover': {
      background: accentSoft,
      borderColor: accent,
      boxShadow: isLight
        ? `0 10px 32px rgba(60, 40, 20, 0.16), 0 0 18px ${accentRing}`
        : `0 8px 32px rgba(0, 0, 0, 0.45), 0 0 20px ${accentRing}`,
    },
    '&:active': { transform: 'scale(0.97)' },
    '&.Mui-focusVisible': { outline: `2px solid ${focusRing}`, outlineOffset: 2 },
  };
}

const journeyBorderStrong = (theme) => (theme.mode === 'light' ? theme.locked : 'rgba(255, 255, 255, 0.14)');

/** Enveloppe fixe du header (sans fond — seule la barre glass a un fond). */
export function journeyFixedHeaderShellSx() {
  return {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    p: { xs: 1.5, md: 3 },
    pointerEvents: 'none',
  };
}

export function journeyFixedHeaderNavSx() {
  return { pointerEvents: 'auto', width: '100%' };
}

/** Décalage sous le header fixe (padding + hauteur barre). */
export function journeyFixedHeaderOffsetSx() {
  return {
    pt: { xs: '84px', md: '112px' },
  };
}

/** Barre de navigation type PlayPad (logo / actions). */
export function journeyHeaderBarSx(theme) {
  return {
    display: 'grid',
    gridTemplateColumns: 'minmax(0, 1fr) auto',
    alignItems: 'center',
    gap: { xs: 1.5, md: 2.5 },
    minHeight: { xs: 56, md: 68 },
    px: { xs: 1.25, md: 2.25 },
    py: { xs: 1, md: 1.25 },
    border: `1px solid ${journeyBorderStrong(theme)}`,
    borderRadius: '22px',
    bgcolor: theme.mode === 'light' ? `${theme.surface}e8` : `${theme.glassBg}`,
    backdropFilter: 'blur(24px) saturate(1.15)',
    WebkitBackdropFilter: 'blur(24px) saturate(1.15)',
    boxShadow: theme.glassShadow,
    transition: 'border-color .25s ease, box-shadow .25s ease',
  };
}

/** Pill « Club Manager » → assistant. */
export function journeyHeaderPillSx(theme) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0.75,
    minHeight: 44,
    px: 1.5,
    py: 1,
    fontSize: 12,
    fontWeight: 500,
    lineHeight: 1.2,
    color: theme.text,
    border: `1px solid ${journeyBorderStrong(theme)}`,
    borderRadius: '11px',
    bgcolor: 'transparent',
    cursor: 'pointer',
    transition: 'color .2s ease, border-color .2s ease, background-color .2s ease',
    '&:hover': {
      color: theme.accent,
      borderColor: theme.accent,
      bgcolor: `${theme.accent}12`,
    },
    '& .journey-nav-arrow': {
      color: theme.accent,
      fontSize: 17,
      lineHeight: 1,
    },
    '&.Mui-focusVisible': { outline: `2px solid ${theme.focusRing}`, outlineOffset: 2 },
  };
}

/** Bouton Explorer / fermer le menu. */
export function journeyHeaderMenuToggleSx(theme, expanded) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: { xs: 0, sm: 1.75 },
    minHeight: 44,
    minWidth: 44,
    px: { xs: 1.25, sm: 1.75 },
    py: 1,
    fontSize: 12,
    color: theme.text,
    border: `1px solid ${expanded ? journeyBorderStrong(theme) : 'transparent'}`,
    borderRadius: '13px',
    bgcolor: expanded ? (theme.mode === 'light' ? theme.surfaceAlt : 'rgba(255,255,255,0.06)') : 'transparent',
    cursor: 'pointer',
    transition: 'background .2s ease, border-color .2s ease',
    '&:hover': {
      bgcolor: theme.mode === 'light' ? theme.surfaceAlt : 'rgba(255,255,255,0.06)',
      borderColor: journeyBorderStrong(theme),
    },
    '&.Mui-focusVisible': { outline: `2px solid ${theme.focusRing}`, outlineOffset: 2 },
  };
}

/** Overlay derrière le menu Explorer (Portal, hors arbre parcours). */
export function journeyHeaderBackdropSx(theme) {
  return {
    position: 'fixed',
    inset: 0,
    zIndex: 1600,
    bgcolor: theme.mode === 'light' ? 'rgba(21, 17, 15, 0.42)' : 'rgba(3, 2, 4, 0.72)',
  };
}

/** Enveloppe Portal : variables et couleur de texte du mode actif. */
export function journeyHeaderMenuPortalRootSx(theme) {
  return {
    color: theme.text,
    colorScheme: theme.mode,
    ...journeySiteCssVars(theme),
    '& .MuiTypography-root': { color: 'inherit' },
  };
}

/** Panneau déroulant du menu Explorer. */
export function journeyHeaderPanelSx(theme) {
  return {
    zIndex: 1601,
    maxHeight: 'min(72dvh, 520px)',
    overflowY: 'auto',
    overscrollBehavior: 'contain',
    border: `1px solid ${journeyBorderStrong(theme)}`,
    borderRadius: '22px',
    bgcolor: theme.surface,
    color: theme.text,
    boxShadow: theme.mode === 'light' ? '0 25px 70px -20px rgba(60, 40, 20, 0.22)' : '0 25px 70px -20px rgba(0, 0, 0, 0.65)',
    animation: 'journeyMenuIn .18s ease-out',
    '@keyframes journeyMenuIn': {
      from: { opacity: 0, transform: 'translateY(-6px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
  };
}

export function journeyNavSectionEyebrowSx(theme) {
  return {
    m: 0,
    mb: 2,
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: theme.textMuted,
  };
}

export function journeyNavMenuRowSx(theme, active = false) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: 1.75,
    width: '100%',
    minHeight: 51,
    py: 1.5,
    px: 0,
    border: 'none',
    borderBottom: `1px solid ${theme.divider}`,
    bgcolor: 'transparent',
    color: active ? theme.accent : theme.text,
    fontSize: 15,
    lineHeight: 1.4,
    letterSpacing: '-0.02em',
    textAlign: 'left',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'color .2s ease',
    '&:hover': { color: theme.accent },
    '& .journey-nav-index': {
      flexShrink: 0,
      fontSize: 9,
      color: theme.textMuted,
    },
    '& .journey-nav-arrow': {
      marginLeft: 'auto',
      color: theme.textMuted,
      fontSize: 15,
      transition: 'transform .2s ease, color .2s ease',
    },
    '&:hover .journey-nav-arrow': {
      color: theme.accent,
      transform: 'translate(2px, -2px)',
    },
  };
}

export function journeyHeaderPanelCtaSx(theme) {
  return {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 1,
    mt: 2,
    px: 2,
    py: 1.75,
    borderRadius: '14px',
    border: 'none',
    width: '100%',
    bgcolor: theme.accent,
    color: theme.onAccent,
    fontSize: 14,
    fontWeight: 700,
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'filter .2s ease, transform .15s ease',
    '&:hover': { filter: 'brightness(1.05)' },
    '&:active': { transform: 'scale(0.99)' },
    '& .journey-nav-arrow': { fontSize: 17 },
  };
}

export function journeyHeaderPreferencesSx(theme) {
  return {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 2,
    px: { xs: 2, md: 2.75 },
    py: 2,
    borderTop: `1px solid ${theme.divider}`,
    bgcolor: theme.mode === 'light' ? theme.surfaceAlt : 'rgba(255,255,255,0.03)',
  };
}

/** Variables CSS site (assistant, menus) cohérentes avec le thème parcours. */
export function journeySiteCssVars(theme) {
  const isLight = theme.mode === 'light';
  return {
    '--primary': theme.accent,
    '--primary-opacity': isLight ? `${theme.accent}22` : 'rgba(255, 203, 0, 0.28)',
    '--primary-hover': isLight ? theme.accent2 : theme.accent,
    '--background': theme.background,
    '--background-card': theme.surface,
    '--background-menu': theme.glassBg,
    '--text': theme.text,
    '--text-secondary': theme.onAccent,
    '--accents2': isLight ? theme.surfaceAlt : 'rgba(255,255,255,0.04)',
    '--accents3': theme.glassBorder,
    '--accents4': isLight ? 'rgba(21, 17, 15, 0.12)' : theme.locked,
    '--accents5': isLight ? 'rgba(21, 17, 15, 0.18)' : 'rgba(255,255,255,0.12)',
    '--accents6': theme.textFaint,
    '--accents7': theme.textMuted,
    '--accents8': theme.textSoft,
    '--gold-300': isLight ? '#ffd966' : '#ffe9a8',
    '--gold-400': theme.accent,
    '--gold-500': isLight ? theme.accent2 : theme.accent,
  };
}

function readStoredJourneyThemeMode() {
  if (typeof window === 'undefined') return 'dark';
  const saved = window.localStorage.getItem(STORAGE_KEY);
  return JOURNEY_THEME_MODES.includes(saved) ? saved : 'dark';
}

/** Mode choisi par l'utilisateur (dark / light / system), persisté, et mode effectif résolu. */
export function useJourneyThemeMode() {
  const [mode, setMode] = useState(readStoredJourneyThemeMode);
  const [systemDark, setSystemDark] = useState(() => (
    typeof window !== 'undefined' ? window.matchMedia('(prefers-color-scheme: dark)').matches : true
  ));
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (JOURNEY_THEME_MODES.includes(saved)) {
      setMode(saved);
    } else {
      setMode('dark');
      window.localStorage.setItem(STORAGE_KEY, 'dark');
    }
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(media.matches);
    const onChange = (e) => setSystemDark(e.matches);
    media.addEventListener('change', onChange);
    setHydrated(true);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const changeMode = useCallback((next) => {
    setMode(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const resolved = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode;
  return { mode, resolved, changeMode, hydrated };
}
