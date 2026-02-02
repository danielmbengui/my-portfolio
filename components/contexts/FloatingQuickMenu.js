import React, { useState } from 'react';
import { useTranslation } from 'next-i18next';
import { useLangMode } from '@/contexts/LangModeProvider';
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import EmailIcon from '@mui/icons-material/Email';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { _MY_PROFILE_, _NAMESPACE_LANGAGE_COMMON_ } from '@/_mocks_/_settings_items_';
import { getFlag } from '@/components/icons/FlagIcons';
import { PlayStoreIcon } from '@/components/icons/IconifiyIcons';
import { ARRAY_LANGAGES } from '@/_mocks_/_settings_items_';

// Langues disponibles pour l’interface (locales de l’app)
const QUICK_MENU_LANGS = ARRAY_LANGAGES;

export default function FloatingQuickMenu() {
  const { t, i18n } = useTranslation();
  const [lang, setLang] = useLangMode();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLangSelect = (langCode) => {
    i18n.changeLanguage(langCode);
    setLang(langCode);
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        aria-label="Menu rapide"
        aria-controls={open ? 'quick-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{
          position: 'fixed',
          bottom: 'max(16px, env(safe-area-inset-bottom))',
          right: 'max(16px, env(safe-area-inset-right))',
          zIndex: 1300,
          width: 52,
          height: 52,
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
        <MenuRoundedIcon sx={{ fontSize: 28 }} />
      </IconButton>

      <Menu
        id="quick-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        slotProps={{
          paper: {
            sx: {
              mt: -2,
              minWidth: 220,
              borderRadius: 2,
              border: '1px solid var(--accents3)',
              bgcolor: 'var(--background-card)',
              boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
            },
          },
        }}
        MenuListProps={{
          sx: { py: 0 },
        }}
      >
        {/* Sous-menu Langue */}
        <Typography
          component="div"
          variant="caption"
          sx={{
            px: 2,
            py: 1.5,
            fontWeight: 700,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {t('sections.skills.langs.title', { ns: _NAMESPACE_LANGAGE_COMMON_ })}
        </Typography>
        {QUICK_MENU_LANGS.map((langCode) => {
          const isSelected = lang === langCode;
          return (
            <MenuItem
              key={langCode}
              onClick={() => handleLangSelect(langCode)}
              selected={isSelected}
              sx={{
                py: 1.25,
                '&.Mui-selected': {
                  bgcolor: 'var(--primary-opacity)',
                  '&:hover': { bgcolor: 'var(--primary-opacity)' },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                {getFlag(langCode)}
              </ListItemIcon>
              <ListItemText
                primary={t(`langs.${langCode}`, { ns: _NAMESPACE_LANGAGE_COMMON_ })}
                primaryTypographyProps={{
                  fontSize: '0.9rem',
                  fontWeight: isSelected ? 600 : 500,
                  color: 'var(--text)',
                }}
              />
            </MenuItem>
          );
        })}

        <Divider sx={{ my: 1, borderColor: 'var(--accents3)' }} />

        {/* Sous-menu Contact / Liens */}
        <Typography
          component="div"
          variant="caption"
          sx={{
            px: 2,
            py: 1.5,
            fontWeight: 700,
            color: 'var(--primary)',
            textTransform: 'uppercase',
            letterSpacing: '0.06em',
          }}
        >
          {t('quickMenuContact', { ns: _NAMESPACE_LANGAGE_COMMON_ })}
        </Typography>
        <MenuItem
          component="a"
          href={`mailto:${_MY_PROFILE_.mail}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
          sx={{ py: 1.25 }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'var(--primary)' }}>
            <EmailIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={t('sendMeMail', { ns: _NAMESPACE_LANGAGE_COMMON_ })}
            primaryTypographyProps={{ fontSize: '0.9rem', color: 'var(--text)' }}
          />
        </MenuItem>
        <MenuItem
          component="a"
          href={_MY_PROFILE_.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
          sx={{ py: 1.25 }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: '#0a66c2' }}>
            <LinkedInIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={t('profileLinkedin', { ns: _NAMESPACE_LANGAGE_COMMON_ })}
            primaryTypographyProps={{ fontSize: '0.9rem', color: 'var(--text)' }}
          />
        </MenuItem>
        <MenuItem
          component="a"
          href={_MY_PROFILE_.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
          sx={{ py: 1.25 }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: 'var(--text)' }}>
            <GitHubIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText
            primary={t('profileGithub', { ns: _NAMESPACE_LANGAGE_COMMON_ })}
            primaryTypographyProps={{ fontSize: '0.9rem', color: 'var(--text)' }}
          />
        </MenuItem>
        <MenuItem
          component="a"
          href={_MY_PROFILE_.socials.playstore}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClose}
          sx={{ py: 1.25 }}
        >
          <ListItemIcon sx={{ minWidth: 36 }}>
            <PlayStoreIcon size={22} />
          </ListItemIcon>
          <ListItemText
            primary={t('profilePlaystore', { ns: _NAMESPACE_LANGAGE_COMMON_ })}
            primaryTypographyProps={{ fontSize: '0.9rem', color: 'var(--text)' }}
          />
        </MenuItem>
      </Menu>
    </>
  );
}
