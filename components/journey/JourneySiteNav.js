import React, { useCallback, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { Avatar, Box, Portal, Stack, Typography } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import {
  ANGOLA_COLORS,
  JOURNEY_LOCALES,
  JOURNEY_PROFILE,
  JOURNEY_VIEW_STORAGE_KEY,
  _NAMESPACE_LANGAGE_JOURNEY_,
} from '@/_mocks_/_journey_items_';
import {
  ARRAY_LANGAGES,
  _NAMESPACE_LANGAGE_COMMON_,
  _PAGE_LINK_CV_,
  _PAGE_LINK_JOURNEY_,
} from '@/_mocks_/_settings_items_';
import { useLangMode } from '@/contexts/LangModeProvider';
import { AngolanIcon, SwissIcon } from '@/components/icons/FlagIcons';
import {
  journeyHeaderBackdropSx,
  journeyHeaderBarSx,
  journeyHeaderMenuPortalRootSx,
  journeyHeaderMenuToggleSx,
  journeyHeaderPanelCtaSx,
  journeyHeaderPanelSx,
  journeyHeaderPillSx,
  journeyHeaderPreferencesSx,
  journeyNavMenuRowSx,
  journeyNavSectionEyebrowSx,
} from '@/components/journey/journeyTheme';
import { getJourneyProfile, getJourneyUi } from '@/utility/journeyMilestoneText';

const CV_LOCALE_LABELS = {
  fr: 'Français',
  en: 'English',
  pt: 'Português',
  it: 'Italiano',
  ao: 'Lingala',
};

function ProfileCard({ theme, compact = false, collapsible = false, headerBar = false }) {
  const { t, i18n } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const profile = getJourneyProfile(i18n.language);
  const name = profile.name || t('profile.name');
  const role = profile.role || t('profile.role');
  const based = profile.based || t('profile.based');
  const tagline = profile.tagline || t('profile.tagline');
  const showDetails = !collapsible || detailsOpen;
  const avatarPx = headerBar
    ? (collapsible && !detailsOpen ? 40 : { xs: 40, md: 44 })
    : compact
      ? (collapsible && !detailsOpen ? 44 : { xs: 48, md: 64 })
      : 64;

  return (
    <Box sx={{ mb: compact || headerBar ? 0 : 2.5, minWidth: 0, flex: compact && !collapsible ? 1 : undefined }}>
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
              component={compact || headerBar ? 'h1' : 'p'}
              sx={{
                fontSize: headerBar ? { xs: 14, md: 16 } : compact ? { xs: 15, md: 18 } : 17,
                fontWeight: 800,
                color: theme.text,
                lineHeight: 1.2,
                m: 0,
              }}
              noWrap={headerBar}
            >
              {name}
            </Typography>
            <Typography
              sx={{
                fontSize: headerBar ? { xs: 10, md: 11 } : compact ? { xs: 10.5, md: 12 } : 12,
                color: theme.accent,
                fontWeight: 600,
                mt: 0.25,
                lineHeight: 1.35,
              }}
              noWrap={headerBar}
            >
              {role}
            </Typography>
            {(!headerBar || (headerBar && showDetails && collapsible)) && (
              <Stack direction="row" alignItems="center" spacing={0.75} sx={{ mt: 0.5, flexWrap: 'wrap' }}>
                <AngolanIcon size={14} />
                <SwissIcon size={14} />
                <Typography sx={{ fontSize: 11, color: theme.textMuted }} noWrap={headerBar}>
                  {based}
                </Typography>
              </Stack>
            )}
          </Box>
        )}
      </Stack>
      {!compact && (
        <Typography sx={{ fontSize: 12.5, color: theme.textSoft, lineHeight: 1.55, mt: 1.25 }}>{tagline}</Typography>
      )}
    </Box>
  );
}

function PlaypadNavIcon({ open }) {
  const lineSx = {
    display: 'block',
    height: '1px',
    bgcolor: 'currentColor',
    transition: 'transform .2s ease, width .2s ease',
  };
  return (
    <Box component="span" aria-hidden sx={{ display: 'grid', gap: '5px', width: 17, flexShrink: 0 }}>
      <Box
        component="i"
        sx={{
          ...lineSx,
          width: 17,
          transform: open ? 'translateY(3px) rotate(45deg)' : 'none',
        }}
      />
      <Box
        component="i"
        sx={{
          ...lineSx,
          width: open ? 17 : 12,
          justifySelf: 'end',
          transform: open ? 'translateY(-3px) rotate(-45deg)' : 'none',
        }}
      />
    </Box>
  );
}

export default function JourneySiteNav({
  theme,
  themeMode,
  onThemeChange,
  isMobile,
  onToggleHud = () => {},
  viewMode = '3d',
  onViewModeChange = () => {},
  onOpenAssistant,
  variant = 'journey',
}) {
  const { t, i18n } = useTranslation([_NAMESPACE_LANGAGE_JOURNEY_, _NAMESPACE_LANGAGE_COMMON_]);
  const router = useRouter();
  const langContext = useLangMode();
  const shellRef = useRef(null);
  const barRef = useRef(null);
  const localeChoices = variant === 'cv' ? ARRAY_LANGAGES : JOURNEY_LOCALES;
  const currentLang = localeChoices.includes(router.locale) ? router.locale : localeChoices[0];
  const [menuOpen, setMenuOpen] = useState(false);
  const [panelRect, setPanelRect] = useState(null);

  const updatePanelRect = useCallback(() => {
    if (!barRef.current) return;
    const rect = barRef.current.getBoundingClientRect();
    const margin = 12;
    if (variant === 'cv') {
      const width = Math.min(300, window.innerWidth - margin * 2);
      setPanelRect({
        top: rect.bottom + 8,
        left: Math.max(margin, rect.right - width),
        width,
      });
      return;
    }
    setPanelRect({
      top: rect.bottom + 10,
      left: Math.max(margin, rect.left),
      width: Math.min(rect.width, window.innerWidth - margin * 2),
    });
  }, [variant]);

  const changeLang = (lang) => {
    if (!lang || lang === currentLang) return;
    i18n.changeLanguage(lang);
    if (langContext) langContext[1](lang);
    else router.replace(router.asPath, router.asPath, { locale: lang });
  };

  const setView = (mode) => {
    if (!mode || mode === viewMode) return;
    onViewModeChange(mode);
    try {
      sessionStorage.setItem(JOURNEY_VIEW_STORAGE_KEY, mode);
    } catch {
      /* ignore */
    }
  };

  const ui = (key) => getJourneyUi(i18n.language, key) || t(`ui.${key}`);
  const tc = (key) => t(key, { ns: _NAMESPACE_LANGAGE_COMMON_ });

  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((o) => !o);

  useLayoutEffect(() => {
    if (!menuOpen) {
      setPanelRect(null);
      return undefined;
    }
    updatePanelRect();
    window.addEventListener('resize', updatePanelRect);
    window.addEventListener('scroll', updatePanelRect, true);
    return () => {
      window.removeEventListener('resize', updatePanelRect);
      window.removeEventListener('scroll', updatePanelRect, true);
    };
  }, [menuOpen, updatePanelRect]);

  const prefLinkSx = (active) => ({
    display: 'inline-flex',
    alignItems: 'center',
    minHeight: 24,
    px: 0.25,
    fontSize: 10,
    fontWeight: active ? 700 : 500,
    color: active ? theme.accent : theme.textMuted,
    border: 'none',
    bgcolor: 'transparent',
    cursor: 'pointer',
    textDecoration: active ? 'underline' : 'none',
    textUnderlineOffset: 3,
    '&:hover': { color: theme.accent },
  });

  const localeLabel = (lang) => {
    if (variant === 'cv') return CV_LOCALE_LABELS[lang] || lang.toUpperCase();
    if (lang === 'fr') return 'Français';
    if (lang === 'en') return 'English';
    return 'Português';
  };

  const isCv = variant === 'cv';
  const menuRowSx = (active = false) => ({
    ...journeyNavMenuRowSx(theme, active),
    ...(isCv && { minHeight: 38, py: 0.85, gap: 1, fontSize: 13.5 }),
  });
  const sectionEyebrowSx = {
    ...journeyNavSectionEyebrowSx(theme),
    ...(isCv && { mb: 0.75 }),
  };

  return (
    <Box ref={shellRef} sx={{ position: 'relative', pointerEvents: 'auto', width: '100%', minWidth: 0 }}>
      <Box ref={barRef} data-journey-nav-bar sx={journeyHeaderBarSx(theme)}>
        <Box sx={{ minWidth: 0, overflow: 'hidden' }}>
          <ProfileCard theme={theme} compact headerBar collapsible={isMobile} />
        </Box>
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.75, sm: 1.25 }} sx={{ flexShrink: 0 }}>
          <Box
            component="button"
            type="button"
            onClick={onOpenAssistant}
            aria-label={tc('assistant.open')}
            sx={journeyHeaderPillSx(theme)}
          >
            <SmartToyIcon sx={{ fontSize: 18, color: theme.accent }} />
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              {ui('menuAssistant')}
            </Box>
            <Box component="span" className="journey-nav-arrow" aria-hidden>
              ↗
            </Box>
          </Box>
          <Box
            component="button"
            type="button"
            id="journey-header-menu"
            aria-label={menuOpen ? ui('menuClose') : ui('menuExplore')}
            aria-controls="journey-header-panel"
            aria-expanded={menuOpen ? 'true' : 'false'}
            onClick={toggleMenu}
            sx={journeyHeaderMenuToggleSx(theme, menuOpen)}
          >
            <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
              {menuOpen ? ui('menuClose') : ui('menuExplore')}
            </Box>
            <PlaypadNavIcon open={menuOpen} />
          </Box>
        </Stack>
      </Box>

      {menuOpen && panelRect && (
        <Portal>
          <Box sx={journeyHeaderMenuPortalRootSx(theme)}>
            <Box aria-hidden onClick={closeMenu} sx={journeyHeaderBackdropSx(theme)} />
            <Box
              id="journey-header-panel"
              role="dialog"
              aria-labelledby="journey-header-menu"
              sx={{
                ...journeyHeaderPanelSx(theme),
                ...(isCv && {
                  maxHeight: 'none',
                  borderRadius: '16px',
                }),
                position: 'fixed',
                top: panelRect.top,
                left: panelRect.left,
                width: panelRect.width,
              }}
            >
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: isCv ? '1fr' : { xs: '1fr', md: '1fr 1fr' },
                  gap: isCv ? 0.5 : { xs: 2, md: 4 },
                  px: isCv ? 1.5 : { xs: 2, md: 3 },
                  pt: isCv ? 1.25 : 2,
                  pb: isCv ? 0.75 : { xs: 1.5, md: 2 },
                }}
              >
                {variant === 'journey' && (
                  <Box component="nav" aria-label={ui('menuSectionJourney')}>
                    <Typography component="p" sx={journeyNavSectionEyebrowSx(theme)}>
                      {ui('menuSectionJourney')}
                    </Typography>
                    <Box
                      component="button"
                      type="button"
                      onClick={() => setView('3d')}
                      sx={journeyNavMenuRowSx(theme, viewMode === '3d')}
                    >
                      <Box component="span" className="journey-nav-index">
                        01
                      </Box>
                      <Box component="span">{ui('view3d')}</Box>
                      <Box component="span" className="journey-nav-arrow">
                        ↗
                      </Box>
                    </Box>
                    <Box
                      component="button"
                      type="button"
                      onClick={() => setView('2d')}
                      sx={journeyNavMenuRowSx(theme, viewMode === '2d')}
                    >
                      <Box component="span" className="journey-nav-index">
                        02
                      </Box>
                      <Box component="span">{ui('view2d')}</Box>
                      <Box component="span" className="journey-nav-arrow">
                        ↗
                      </Box>
                    </Box>
                  </Box>
                )}

                <Box component="nav" aria-label={ui('menuSectionMore')}>
                  <Typography component="p" sx={sectionEyebrowSx}>
                    {ui('menuSectionMore')}
                  </Typography>
                  {variant === 'journey' ? (
                    <Box component={Link} href={_PAGE_LINK_CV_} onClick={closeMenu} sx={menuRowSx()}>
                      <Box component="span">{tc('seeMyCV')}</Box>
                      <Box component="span" className="journey-nav-arrow">
                        ↗
                      </Box>
                    </Box>
                  ) : (
                    <Box component={Link} href={_PAGE_LINK_JOURNEY_} onClick={closeMenu} sx={menuRowSx()}>
                      <Box component="span">{ui('introViewJourney')}</Box>
                      <Box component="span" className="journey-nav-arrow">
                        ↗
                      </Box>
                    </Box>
                  )}
                  {variant === 'journey' && isMobile && (
                    <Box
                      component="button"
                      type="button"
                      onClick={() => {
                        onToggleHud();
                        closeMenu();
                      }}
                      sx={menuRowSx()}
                    >
                      <Box component="span">{ui('settings')}</Box>
                      <Box component="span" className="journey-nav-arrow">
                        ↗
                      </Box>
                    </Box>
                  )}
                  <Box
                    component="button"
                    type="button"
                    onClick={() => {
                      onOpenAssistant();
                      closeMenu();
                    }}
                    sx={{
                      ...journeyHeaderPanelCtaSx(theme),
                      ...(isCv && { mt: 0.75, py: 1.1, px: 1.5, fontSize: 13, borderRadius: '12px' }),
                    }}
                  >
                    <Box component="span">{ui('menuCtaAssistant')}</Box>
                    <Box component="span" className="journey-nav-arrow" aria-hidden>
                      ↗
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Box
                sx={{
                  ...journeyHeaderPreferencesSx(theme),
                  ...(isCv && {
                    flexDirection: 'column',
                    alignItems: 'stretch',
                    gap: 1,
                    py: 1.1,
                    px: 1.5,
                  }),
                }}
              >
                <Box>
                  <Typography sx={{ fontSize: isCv ? 9 : 10, color: theme.textMuted, mb: isCv ? 0.5 : 0.75 }}>
                    {ui('language')}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.5}>
                    {localeChoices.map((lang) => (
                      <Box
                        key={lang}
                        component="button"
                        type="button"
                        aria-current={lang === currentLang ? 'true' : undefined}
                        onClick={() => changeLang(lang)}
                        sx={prefLinkSx(lang === currentLang)}
                      >
                        {localeLabel(lang)}
                      </Box>
                    ))}
                  </Stack>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: isCv ? 9 : 10, color: theme.textMuted, mb: isCv ? 0.5 : 0.75 }}>
                    {ui('theme')}
                  </Typography>
                  <Stack direction="row" flexWrap="wrap" useFlexGap gap={0.75}>
                    {[
                      { id: 'dark', label: ui('themeDark') },
                      { id: 'light', label: ui('themeLight') },
                      { id: 'system', label: ui('themeSystem') },
                    ].map(({ id, label }) => (
                      <Box
                        key={id}
                        component="button"
                        type="button"
                        aria-pressed={themeMode === id ? 'true' : 'false'}
                        onClick={() => onThemeChange(id)}
                        sx={prefLinkSx(themeMode === id)}
                      >
                        {label}
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Box>
          </Box>
        </Portal>
      )}
    </Box>
  );
}
