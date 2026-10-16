import { useCallback, useEffect, useState } from 'react';
import { ANGOLA_COLORS } from '@/_mocks_/_journey_items_';

export const JOURNEY_THEME_MODES = ['dark', 'light', 'system'];
const STORAGE_KEY = 'journey-theme-mode';

const DARK = {
  mode: 'dark',
  background: '#070203',
  text: '#ffffff',
  textSoft: '#ffffffd9',
  textMuted: '#ffffffaa',
  textFaint: '#ffffff55',
  glassBg: 'rgba(16, 4, 6, 0.66)',
  glassBorder: 'rgba(255, 203, 0, 0.22)',
  accent: ANGOLA_COLORS.gold,
  accent2: ANGOLA_COLORS.redBright,
  titleGradient: `linear-gradient(90deg, ${ANGOLA_COLORS.redBright}, #ff6a1a, ${ANGOLA_COLORS.gold})`,
  track: '#ffffff1a',
  locked: '#ffffff22',
  scene: {
    stars: true,
    sparkles: ANGOLA_COLORS.gold,
    gridCell: '#3a0a12',
    comet: [4, 3.2, 1.2],
    pathGlow: 1.6,
    pathDim: 0.82,
    bloom: { intensity: 1.3, threshold: 0.25 },
    vignette: 0.85,
    labelBg: 'rgba(7, 2, 3, 0.85)',
    labelText: '#ffffff',
    ambient: 0.35,
  },
};

const LIGHT = {
  mode: 'light',
  background: '#fbf5ea',
  text: '#140405',
  textSoft: '#140405d9',
  textMuted: '#140405a6',
  textFaint: '#14040566',
  glassBg: 'rgba(255, 255, 255, 0.74)',
  glassBorder: 'rgba(204, 9, 47, 0.22)',
  accent: ANGOLA_COLORS.red,
  accent2: '#d9a400',
  titleGradient: `linear-gradient(90deg, ${ANGOLA_COLORS.red}, ${ANGOLA_COLORS.black}, #d9a400)`,
  track: '#0000001a',
  locked: '#00000022',
  scene: {
    stars: false,
    sparkles: ANGOLA_COLORS.red,
    gridCell: '#ead8c0',
    comet: ANGOLA_COLORS.red,
    pathGlow: 1,
    pathDim: 0.78,
    bloom: { intensity: 0.5, threshold: 0.7 },
    vignette: 0.35,
    labelBg: 'rgba(255, 255, 255, 0.92)',
    labelText: '#140405',
    ambient: 0.9,
  },
};

export function getJourneyTheme(resolvedMode) {
  return resolvedMode === 'light' ? LIGHT : DARK;
}

/** Mode choisi par l'utilisateur (dark / light / system), persisté, et mode effectif résolu. */
export function useJourneyThemeMode() {
  const [mode, setMode] = useState('dark');
  const [systemDark, setSystemDark] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (JOURNEY_THEME_MODES.includes(saved)) setMode(saved);
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemDark(media.matches);
    const onChange = (e) => setSystemDark(e.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const changeMode = useCallback((next) => {
    setMode(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const resolved = mode === 'system' ? (systemDark ? 'dark' : 'light') : mode;
  return { mode, resolved, changeMode };
}
