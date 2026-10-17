import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useTranslation } from 'next-i18next';
import { _NAMESPACE_LANGAGE_COMMON_ } from '@/_mocks_/_settings_items_';
import { journeyChromeButtonSx } from '@/components/journey/journeyTheme';

const BUTTON_SIZE = 52;
const GAP_ABOVE_MENU = 12;
const ICON_SIZE = 28;

const homeButtonSx = (size) => ({
  width: size,
  height: size,
  borderRadius: '50%',
  border: '2px solid var(--primary)',
  background: 'var(--background-card)',
  color: 'var(--primary)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,215,0,0.1)',
  '&:hover': {
    background: 'var(--primary-opacity)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 0 20px rgba(255,215,0,0.2)',
  },
});

export default function AiAssistantButton({
  onClick,
  placement = 'fixed',
  size = BUTTON_SIZE,
  sx = {},
  chromeTheme,
}) {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_COMMON_);
  const label = t('assistant.open', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Ouvrir l\'assistant IA' });

  const fixedSx =
    placement === 'fixed'
      ? {
          position: 'fixed',
          bottom: `calc(max(16px, env(safe-area-inset-bottom)) + ${BUTTON_SIZE}px + ${GAP_ABOVE_MENU}px)`,
          right: 'max(16px, env(safe-area-inset-right))',
          zIndex: 1300,
        }
      : {};

  const baseSx = chromeTheme ? journeyChromeButtonSx(chromeTheme, size) : homeButtonSx(size);

  return (
    <Tooltip title={label} placement={placement === 'fixed' ? 'left' : 'bottom'}>
      <IconButton
        onClick={onClick}
        aria-label={label}
        sx={{
          ...baseSx,
          ...fixedSx,
          ...sx,
        }}
      >
        <SmartToyIcon sx={{ fontSize: ICON_SIZE }} />
      </IconButton>
    </Tooltip>
  );
}
