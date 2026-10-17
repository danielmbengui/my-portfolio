import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Typography } from '@mui/material';
import PlaceIcon from '@mui/icons-material/Place';
import { JOURNEY_ERAS, _NAMESPACE_LANGAGE_JOURNEY_ } from '@/_mocks_/_journey_items_';
import { getJourneyUi } from '@/utility/journeyMilestoneText';

const ROW_HEIGHT = 92;
const ERA_HEADER_HEIGHT = 34;
const SPINE_WIDTH = 4;
const BRANCH_GAP = 16;

const useIsoLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function MapStopCard({ stop, text, era, active, passed, theme, onSelect, index, placeholderHint, side }) {
  const color = era?.color || theme.accent;
  const isDark = theme.mode === 'dark';
  const cardBg = isDark ? theme.surface : theme.surface;
  const cardBorder = active ? color : theme.divider;

  return (
    <Box
      component="button"
      type="button"
      onClick={() => onSelect(index)}
      aria-current={active ? 'step' : undefined}
      aria-label={`${text.year}, ${text.title}, ${text.place}`}
      sx={{
        position: 'relative',
        zIndex: 2,
        width: { xs: 132, sm: 172 },
        maxWidth: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        border: `1px solid ${cardBorder}`,
        borderRadius: 2,
        bgcolor: cardBg,
        color: theme.text,
        p: 0,
        overflow: 'hidden',
        boxShadow: active
          ? `0 0 0 2px ${color}, 0 14px 32px ${color}33`
          : isDark
            ? '0 6px 18px rgba(0,0,0,0.5)'
            : '0 6px 18px rgba(50,35,20,0.10)',
        opacity: passed ? 1 : 0.55,
        transition: 'box-shadow .25s ease, opacity .25s ease, transform .25s ease, border-color .2s ease',
        transform: active ? 'translateY(-2px) scale(1.03)' : 'none',
        '&:hover': { opacity: 1, borderColor: color, transform: 'translateY(-2px)' },
        '&:focus-visible': { outline: `2px solid ${theme.focusRing}`, outlineOffset: 3 },
        ...(stop.placeholder && {
          bgcolor: theme.surfaceAlt,
          borderStyle: 'dashed',
        }),
      }}
    >
      {/* Liseré époque */}
      <Box
        aria-hidden
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          [side === 'left' ? 'right' : 'left']: 0,
          width: 3,
          bgcolor: color,
          opacity: passed ? 1 : 0.6,
        }}
      />

      {stop.image && (
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 7',
            overflow: 'hidden',
            bgcolor: theme.track,
          }}
        >
          <Box
            component="img"
            src={stop.image}
            alt=""
            loading="lazy"
            sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: passed ? 'none' : 'grayscale(0.6)' }}
          />
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              inset: 0,
              background: `linear-gradient(180deg, transparent 50%, ${cardBg} 100%)`,
            }}
          />
        </Box>
      )}

      <Box sx={{ p: 1, pr: side === 'left' ? 1.4 : 1, pl: side === 'right' ? 1.4 : 1 }}>
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: '0.06em',
            color: isDark ? color : theme.text,
            bgcolor: `${color}${isDark ? '26' : '33'}`,
            border: `1px solid ${color}66`,
            borderRadius: 999,
            px: 0.75,
            py: 0.15,
            fontVariantNumeric: 'tabular-nums',
            lineHeight: 1.4,
          }}
        >
          {text.year}
        </Box>
        <Typography
          sx={{
            fontSize: { xs: 11.5, sm: 12.5 },
            fontWeight: 700,
            lineHeight: 1.3,
            mt: 0.6,
            color: theme.text,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {text.title}
        </Typography>
        {!stop.placeholder ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.4, mt: 0.5, color: theme.textMuted, minWidth: 0 }}>
            <PlaceIcon sx={{ fontSize: 12, color: theme.textMuted, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 10.5, color: theme.textMuted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {text.place}
            </Typography>
          </Box>
        ) : (
          <Typography sx={{ fontSize: 10, color: theme.textFaint, mt: 0.5, fontStyle: 'italic' }}>
            {placeholderHint}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

/**
 * Vue 2D « plan de métro » : tronc central + branches gauche (Angola) / droite (Suisse).
 */
export default function JourneyView2D({ stops, activeIndex, onSelect, theme, stopText, regionLabels }) {
  const { t, i18n } = useTranslation(_NAMESPACE_LANGAGE_JOURNEY_);
  const lang = i18n.language;
  const ui = (key) => getJourneyUi(lang, key) || t(`ui.${key}`);
  const rowRefs = useRef({});
  const stationRefs = useRef({});
  const listRef = useRef(null);
  const [spine, setSpine] = useState({ top: ROW_HEIGHT / 2, passed: 0, total: 0 });
  const placeholderHint = ui('placeholderStepHint');
  const timelineNavLabel = ui('timelineNav');
  const view2dHeading = ui('view2dHeading');
  const mapLegendLines = ui('mapLegendLines');

  useEffect(() => {
    const el = rowRefs.current[activeIndex];
    if (el?.scrollIntoView) {
      el.scrollIntoView({ block: 'center', behavior: 'smooth' });
    }
  }, [activeIndex]);

  // Mesure la position réelle des stations pour tracer le tronc (les rangées n’ont pas toutes la même hauteur).
  useIsoLayoutEffect(() => {
    const measure = () => {
      const list = listRef.current;
      const first = stationRefs.current[0];
      const last = stationRefs.current[stops.length - 1];
      const current = stationRefs.current[activeIndex];
      if (!list || !first || !last || !current) return;
      const base = list.getBoundingClientRect().top;
      const center = (el) => {
        const r = el.getBoundingClientRect();
        return r.top - base + r.height / 2;
      };
      const top = center(first);
      setSpine({ top, passed: Math.max(0, center(current) - top), total: Math.max(0, center(last) - top) });
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [activeIndex, stops.length, lang]);

  const isDark = theme.mode === 'dark';
  const lineColor = theme.scene?.pathLine || theme.text;
  const lineFuture = theme.scene?.pathLineFuture || theme.textFaint;
  const dotGrid = isDark ? 'rgba(255,255,255,0.06)' : 'rgba(21,17,15,0.08)';
  const mapBg = isDark ? '#08070b' : '#f8f4ec';

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: `1px solid ${theme.glassBorder}`,
        boxShadow: theme.glassShadow,
        bgcolor: mapBg,
        backgroundImage: `radial-gradient(${dotGrid} 1px, transparent 1px)`,
        backgroundSize: '18px 18px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        color: theme.text,
      }}
    >
      {/* En-tête */}
      <Box
        sx={{
          flexShrink: 0,
          px: 1.75,
          py: 1.1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${theme.divider}`,
          bgcolor: theme.glassBg,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography
          component="h2"
          sx={{ fontSize: 10.5, fontWeight: 800, letterSpacing: '0.22em', color: theme.accent, textTransform: 'uppercase', m: 0 }}
        >
          {view2dHeading}
        </Typography>
        <Typography sx={{ fontSize: 11, color: theme.textMuted, fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
          {String(activeIndex + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')}
        </Typography>
      </Box>

      <Box
        component="nav"
        aria-label={timelineNavLabel}
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          px: { xs: 0.75, sm: 1.25 },
          py: 2,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            maxWidth: 760,
            mx: 'auto',
          }}
        >
          {/* Tronc : partie future */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: '50%',
              top: spine.top,
              height: spine.total,
              width: SPINE_WIDTH,
              transform: 'translateX(-50%)',
              borderRadius: 2,
              bgcolor: lineFuture,
              opacity: 0.55,
              zIndex: 0,
            }}
          />
          {/* Tronc : partie parcourue */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: '50%',
              top: spine.top,
              height: spine.passed,
              width: SPINE_WIDTH,
              transform: 'translateX(-50%)',
              borderRadius: 2,
              bgcolor: lineColor,
              boxShadow: isDark ? `0 0 14px ${lineColor}55` : 'none',
              transition: 'height .45s cubic-bezier(.4,0,.2,1)',
              zIndex: 0,
            }}
          />

          <Box component="ol" ref={listRef} sx={{ listStyle: 'none', m: 0, p: 0, position: 'relative', zIndex: 1 }}>
            {stops.map((stop, index) => {
              const text = stopText(stop);
              const era = JOURNEY_ERAS[stop.era];
              const color = era?.color || theme.accent;
              const active = index === activeIndex;
              const passed = index <= activeIndex;
              const isLeft = stop.region === 'angola';
              const eraChanged = index === 0 || stops[index - 1].era !== stop.era;

              return (
                <Box
                  component="li"
                  key={stop.id}
                  ref={(node) => {
                    rowRefs.current[index] = node;
                  }}
                  sx={{ position: 'relative' }}
                >
                  {/* Repère changement d’époque : sa propre rangée, centrée sur le tronc */}
                  {eraChanged && (
                    <Box
                      aria-hidden
                      sx={{
                        height: ERA_HEADER_HEIGHT,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        zIndex: 3,
                      }}
                    >
                      <Box
                        sx={{
                          fontSize: 9.5,
                          fontWeight: 800,
                          letterSpacing: '0.16em',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                          px: 1.1,
                          py: 0.35,
                          borderRadius: 999,
                          color: isDark ? color : '#fff',
                          bgcolor: isDark ? '#0f0e13' : color,
                          border: `1px solid ${color}`,
                          boxShadow: isDark ? `0 0 0 3px ${mapBg}, 0 0 14px ${color}55` : `0 0 0 3px ${mapBg}, 0 4px 12px ${color}44`,
                        }}
                      >
                        {t(`eras.${stop.era}`)}
                      </Box>
                    </Box>
                  )}

                  <Box
                    sx={{
                      position: 'relative',
                      display: 'grid',
                      gridTemplateColumns: '1fr 32px 1fr',
                      alignItems: 'center',
                      minHeight: ROW_HEIGHT,
                    }}
                  >
                  {/* Branche horizontale */}
                  <Box
                    aria-hidden
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      height: 3,
                      transform: 'translateY(-50%)',
                      bgcolor: passed ? lineColor : lineFuture,
                      opacity: passed ? 0.95 : 0.5,
                      borderRadius: 1,
                      ...(isLeft
                        ? { right: '50%', width: `calc(50% - ${BRANCH_GAP}px - 2px)`, marginRight: `${BRANCH_GAP}px` }
                        : { left: '50%', width: `calc(50% - ${BRANCH_GAP}px - 2px)`, marginLeft: `${BRANCH_GAP}px` }),
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '50%',
                        [isLeft ? 'right' : 'left']: -2,
                        width: 7,
                        height: 7,
                        borderRadius: '50%',
                        transform: 'translateY(-50%)',
                        bgcolor: color,
                        opacity: passed ? 1 : 0.6,
                      },
                    }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: { xs: 0.5, sm: 1 } }}>
                    {isLeft && (
                      <MapStopCard
                        stop={stop}
                        text={text}
                        era={era}
                        active={active}
                        passed={passed}
                        theme={theme}
                        onSelect={onSelect}
                        index={index}
                        placeholderHint={placeholderHint}
                        side="left"
                      />
                    )}
                  </Box>

                  {/* Station */}
                  <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                    <Box
                      ref={(node) => {
                        stationRefs.current[index] = node;
                      }}
                      sx={{
                        width: active ? 18 : 12,
                        height: active ? 18 : 12,
                        borderRadius: '50%',
                        bgcolor: active ? color : passed ? color : mapBg,
                        border: `3px solid ${active ? lineColor : passed ? lineColor : lineFuture}`,
                        boxShadow: active ? `0 0 0 5px ${color}33, 0 0 20px ${color}` : passed ? `0 0 8px ${color}55` : 'none',
                        transition: 'all .3s ease',
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: { xs: 0.5, sm: 1 } }}>
                    {!isLeft && (
                      <MapStopCard
                        stop={stop}
                        text={text}
                        era={era}
                        active={active}
                        passed={passed}
                        theme={theme}
                        onSelect={onSelect}
                        index={index}
                        placeholderHint={placeholderHint}
                        side="right"
                      />
                    )}
                  </Box>
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      {/* Légende */}
      <Box
        sx={{
          flexShrink: 0,
          px: 1.75,
          py: 1.1,
          borderTop: `1px solid ${theme.divider}`,
          bgcolor: theme.glassBg,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 1, flexWrap: 'wrap' }}>
          <Typography sx={{ fontSize: 9.5, fontWeight: 800, letterSpacing: '0.16em', color: theme.textMuted, textTransform: 'uppercase' }}>
            {mapLegendLines}
          </Typography>
          <Typography sx={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.06em' }}>
            <Box component="span" sx={{ color: theme.scene?.regionLabelAngola || theme.accent2 }}>
              {regionLabels.angola}
            </Box>
            <Box component="span" sx={{ color: theme.textFaint, mx: 0.75 }}>
              ←&nbsp;·&nbsp;→
            </Box>
            <Box component="span" sx={{ color: theme.scene?.regionLabelSuisse || theme.accent }}>
              {regionLabels.suisse}
            </Box>
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.25, mt: 0.75 }}>
          {Object.values(JOURNEY_ERAS).map((era) => (
            <Box key={era.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
              <Box sx={{ width: 9, height: 9, borderRadius: '50%', bgcolor: era.color, boxShadow: isDark ? `0 0 8px ${era.color}88` : 'none' }} />
              <Typography sx={{ fontSize: 10.5, color: theme.textSoft, fontWeight: 600 }}>{t(`eras.${era.id}`)}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
