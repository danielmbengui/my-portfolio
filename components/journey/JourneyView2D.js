import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'next-i18next';
import { Box, Typography } from '@mui/material';
import { JOURNEY_ERAS, _NAMESPACE_LANGAGE_JOURNEY_ } from '@/_mocks_/_journey_items_';
import { getJourneyUi } from '@/utility/journeyMilestoneText';

const ROW_HEIGHT = 76;

function MapStopCard({ stop, text, era, active, passed, theme, onSelect, index, placeholderHint }) {
  const color = era?.color || theme.accent;
  const cardBg = theme.mode === 'dark' ? '#121214' : '#ffffff';

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
        width: { xs: 118, sm: 148 },
        maxWidth: '100%',
        textAlign: 'left',
        cursor: 'pointer',
        border: active ? `2px solid ${color}` : `1px solid ${theme.glassBorder}`,
        borderRadius: 1,
        bgcolor: cardBg,
        color: theme.text,
        p: 0.75,
        boxShadow: active ? `0 0 16px ${color}66` : theme.mode === 'dark' ? '0 2px 10px rgba(0,0,0,0.45)' : '0 2px 8px rgba(0,0,0,0.12)',
        opacity: passed ? 1 : 0.55,
        transition: 'box-shadow .25s ease, opacity .25s ease, transform .2s ease',
        transform: active ? 'scale(1.03)' : 'none',
        '&:hover': { opacity: 1, borderColor: color },
        '&:focus-visible': { outline: `2px solid ${color}`, outlineOffset: 2 },
        ...(stop.placeholder && {
          bgcolor: theme.mode === 'dark' ? '#1a1a1e' : '#f4f4f6',
          borderStyle: 'dashed',
        }),
      }}
    >
      {stop.image && (
        <Box
          component="img"
          src={stop.image}
          alt=""
          sx={{
            width: '100%',
            height: 40,
            objectFit: 'cover',
            borderRadius: 0.5,
            mb: 0.5,
            display: 'block',
          }}
        />
      )}
      <Typography
        sx={{
          fontSize: 10,
          fontWeight: 800,
          color,
          fontVariantNumeric: 'tabular-nums',
          lineHeight: 1.1,
        }}
      >
        {text.year}
      </Typography>
      <Typography
        sx={{
          fontSize: 11,
          fontWeight: 700,
          lineHeight: 1.25,
          mt: 0.25,
          color: theme.text,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}
      >
        {text.title}
      </Typography>
      {stop.placeholder && (
        <Typography sx={{ fontSize: 9, color: theme.textMuted, mt: 0.25, fontStyle: 'italic' }}>
          {placeholderHint}
        </Typography>
      )}
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
  const scrollRef = useRef(null);
  const rowRefs = useRef({});
  const placeholderHint = ui('placeholderStepHint');
  const timelineNavLabel = ui('timelineNav');
  const view2dHeading = ui('view2dHeading');
  const mapLegendLines = ui('mapLegendLines');

  useEffect(() => {
    const el = rowRefs.current[activeIndex];
    if (el?.scrollIntoView) {
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeIndex]);

  const lineColor = theme.scene?.pathLine || theme.text;

  return (
    <Box
      sx={{
        height: '100%',
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        border: `1px solid ${theme.glassBorder}`,
        bgcolor: theme.mode === 'dark' ? '#050508' : theme.background,
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}
    >
      <Box
        component="nav"
        aria-label={timelineNavLabel}
        ref={scrollRef}
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          WebkitOverflowScrolling: 'touch',
          position: 'relative',
          px: { xs: 0.5, sm: 1 },
          py: 1.5,
        }}
      >
        <Typography
          component="h2"
          sx={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.2em',
            color: theme.textMuted,
            textTransform: 'uppercase',
            textAlign: 'center',
            mb: 1,
            px: 1,
          }}
        >
          {view2dHeading}
        </Typography>

        <Box
          sx={{
            position: 'relative',
            minHeight: stops.length * ROW_HEIGHT,
            maxWidth: 720,
            mx: 'auto',
          }}
        >
          {/* Tronc vertical */}
          <Box
            aria-hidden
            sx={{
              position: 'absolute',
              left: '50%',
              top: ROW_HEIGHT / 2,
              bottom: ROW_HEIGHT / 2,
              width: 4,
              transform: 'translateX(-50%)',
              borderRadius: 2,
              bgcolor: lineColor,
              opacity: 0.85,
              zIndex: 0,
            }}
          />

          <Box component="ol" sx={{ listStyle: 'none', m: 0, p: 0, position: 'relative', zIndex: 1 }}>
            {stops.map((stop, index) => {
              const text = stopText(stop);
              const era = JOURNEY_ERAS[stop.era];
              const color = era?.color || theme.accent;
              const active = index === activeIndex;
              const passed = index <= activeIndex;
              const isLeft = stop.region === 'angola';

              return (
                <Box
                  component="li"
                  key={stop.id}
                  ref={(node) => {
                    rowRefs.current[index] = node;
                  }}
                  sx={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateColumns: '1fr 28px 1fr',
                    alignItems: 'center',
                    minHeight: ROW_HEIGHT,
                  }}
                >
                  <Box
                    aria-hidden
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      height: 3,
                      transform: 'translateY(-50%)',
                      bgcolor: lineColor,
                      opacity: passed ? 0.9 : 0.22,
                      borderRadius: 1,
                      boxShadow: active ? `0 0 8px ${lineColor}88` : 'none',
                      ...(isLeft
                        ? { right: '50%', width: 'calc(50% - 52px)', marginRight: '14px' }
                        : { left: '50%', width: 'calc(50% - 52px)', marginLeft: '14px' }),
                    }}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: { xs: 0.25, sm: 0.5 } }}>
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
                      />
                    )}
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 2 }}>
                    <Box
                      sx={{
                        width: active ? 14 : 10,
                        height: active ? 14 : 10,
                        borderRadius: '50%',
                        bgcolor: color,
                        border: `2px solid ${lineColor}`,
                        boxShadow: active ? `0 0 16px ${color}` : `0 0 6px ${color}66`,
                        transition: 'all .25s ease',
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', pl: { xs: 0.25, sm: 0.5 } }}>
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
                      />
                    )}
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
          px: 1.5,
          py: 1,
          borderTop: `1px solid ${theme.glassBorder}`,
          bgcolor: theme.glassBg,
          backdropFilter: 'blur(8px)',
        }}
      >
        <Typography sx={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', color: theme.textMuted, mb: 0.75, textTransform: 'uppercase' }}>
          {mapLegendLines}
        </Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          {Object.values(JOURNEY_ERAS).map((era) => (
            <Box key={era.id} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Box sx={{ width: 14, height: 3, borderRadius: 1, bgcolor: era.color }} />
              <Typography sx={{ fontSize: 10, color: theme.textSoft }}>{t(`eras.${era.id}`)}</Typography>
            </Box>
          ))}
        </Box>
        <Typography sx={{ fontSize: 9, mt: 0.75, fontWeight: 700 }}>
          <Box component="span" sx={{ color: theme.scene?.regionLabelAngola || theme.accent2 }}>
            {regionLabels.angola}
          </Box>
          <Box component="span" sx={{ color: theme.textFaint, mx: 0.5 }}>
            ← · →
          </Box>
          <Box component="span" sx={{ color: theme.scene?.regionLabelSuisse || theme.accent }}>
            {regionLabels.suisse}
          </Box>
        </Typography>
      </Box>
    </Box>
  );
}
