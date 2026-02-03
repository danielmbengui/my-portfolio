import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useTranslation } from 'next-i18next';
import { _NAMESPACE_LANGAGE_COMMON_ } from '@/_mocks_/_settings_items_';

const BUTTON_SIZE = 52;
const GAP_ABOVE_MENU = 12;

export default function AiAssistantButton({ onClick }) {
  const { t } = useTranslation(_NAMESPACE_LANGAGE_COMMON_);

  return (
    <Tooltip
      title={t('assistant.open', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Ouvrir l\'assistant IA' })}
      placement="left"
    >
      <IconButton
        onClick={onClick}
        aria-label={t('assistant.open', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Ouvrir l\'assistant IA' })}
        sx={{
          position: 'fixed',
          bottom: `calc(max(16px, env(safe-area-inset-bottom)) + ${BUTTON_SIZE}px + ${GAP_ABOVE_MENU}px)`,
          right: 'max(16px, env(safe-area-inset-right))',
          zIndex: 1300,
          width: BUTTON_SIZE,
          height: BUTTON_SIZE,
          borderRadius: '50%',
          border: '2px solid var(--primary)',
          background: 'var(--background-card)',
          color: 'var(--primary)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,215,0,0.1)',
          '&:hover': {
            background: 'var(--primary-opacity)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.25), 0 0 20px rgba(255,215,0,0.2)',
          },
        }}
      >
        <SmartToyIcon sx={{ fontSize: 28 }} />
      </IconButton>
    </Tooltip>
  );
}
