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
    sparkles: '#6b6b7388',
    gridCell: '#5c5c66',
    gridSection: '#787882',
    gridLabel: '#8a8a94',
    regionLabelAngola: ANGOLA_COLORS.gold,
    regionLabelSuisse: ANGOLA_COLORS.redBright,
    pathLine: '#f2f2f4',
    pathLineFuture: '#5a5a64',
    pathFutureMix: 0.35,
    pathLineWidth: 2.5,
    fogNear: 35,
    fogFar: 110,
    directional: 0.35,
    pointLightIntensity: 60,
    stopEmissiveBoost: 1,
    comet: '#e8e8ec',
    bloom: { intensity: 1.1, threshold: 0.35 },
    vignette: 0.75,
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
    sparkles: '#3d3d4522',
    gridCell: '#7a808a',
    gridSection: '#555b66',
    gridLabel: '#6e6e76',
    regionLabelAngola: '#9a7200',
    regionLabelSuisse: '#9b0824',
    pathLine: '#101014',
    pathLineFuture: '#636a75',
    pathFutureMix: 0.12,
    pathLineWidth: 3.2,
    fogNear: 58,
    fogFar: 150,
    directional: 0.95,
    pointLightIntensity: 48,
    stopEmissiveBoost: 1.45,
    comet: '#2a2a30',
    bloom: { intensity: 0.08, threshold: 0.95 },
    vignette: 0.12,
    labelBg: 'rgba(255, 255, 255, 0.96)',
    labelText: '#140405',
    ambient: 0.48,
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
