import React, { useState, useEffect, useRef } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Chip,
  CircularProgress,
  Drawer,
  IconButton,
  Link,
  TextField,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SendIcon from '@mui/icons-material/Send';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import { useTranslation } from 'next-i18next';
import { _NAMESPACE_LANGAGE_COMMON_ } from '@/_mocks_/_settings_items_';

const DRAWER_WIDTH = 380;
const DRAWER_HEIGHT_MOBILE = '100vh';

/** Détecte les liens Markdown [texte](url) et les URLs brutes, retourne un tableau de segments { type: 'text'|'link', content, href? }. */
function parseMessageWithLinks(text) {
  if (!text || typeof text !== 'string') return [{ type: 'text', content: text || '' }];
  const segments = [];
  // D'abord les liens Markdown [label](url)
  const mdRe = /\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g;
  let lastEnd = 0;
  let match;
  while ((match = mdRe.exec(text)) !== null) {
    if (match.index > lastEnd) segments.push({ type: 'text', content: text.slice(lastEnd, match.index) });
    segments.push({ type: 'link', content: match[1], href: match[2] });
    lastEnd = mdRe.lastIndex;
  }
  let rest = lastEnd > 0 ? text.slice(lastEnd) : text;
  // Puis les URLs brutes dans le reste
  const urlRe = /(https?:\/\/[^\s]+)/g;
  lastEnd = 0;
  while ((match = urlRe.exec(rest)) !== null) {
    if (match.index > lastEnd) segments.push({ type: 'text', content: rest.slice(lastEnd, match.index) });
    segments.push({ type: 'link', content: match[1], href: match[1] });
    lastEnd = urlRe.lastIndex;
  }
  if (lastEnd < rest.length) segments.push({ type: 'text', content: rest.slice(lastEnd) });
  return segments.length ? segments : [{ type: 'text', content: text }];
}

export default function AiAssistantPanel({ open, onClose }) {
  const { t, i18n } = useTranslation(_NAMESPACE_LANGAGE_COMMON_);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typingVisibleLength, setTypingVisibleLength] = useState(0);
  const messagesScrollRef = useRef(null);

  const TYPING_MS_PER_CHAR = 18;

  const suggestions = (() => {
    const raw = t('assistant.suggestions', { ns: _NAMESPACE_LANGAGE_COMMON_, returnObjects: true });
    return Array.isArray(raw) ? raw : [];
  })();

  const lastMsg = messages[messages.length - 1];
  const isTypingInProgress = lastMsg?.role === 'assistant' && lastMsg?.typing === true;
  const inputDisabled = isLoading || isTypingInProgress;

  const sendMessage = async (text) => {
    const trimmed = typeof text === 'string' ? text.trim() : inputValue?.trim();
    if (!trimmed || inputDisabled) return;
    const nextMessages = [...messages, { role: 'user', text: trimmed }, { role: 'assistant', text: '', typing: true }];
    setMessages(nextMessages);
    setInputValue('');
    setTypingVisibleLength(0);
    setIsLoading(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages.slice(0, -1),
          language: i18n.language || 'fr',
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorText = data?.error || t('assistant.errorReply', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Une erreur est survenue. Réessaie ou contacte-moi directement.' });
        setMessages((prev) => {
          const n = [...prev];
          n[n.length - 1] = { role: 'assistant', text: errorText };
          return n;
        });
        return;
      }
      setMessages((prev) => {
        const n = [...prev];
        n[n.length - 1] = { role: 'assistant', text: data?.text || '', typing: true };
        return n;
      });
      setTypingVisibleLength(0);
    } catch (err) {
      const errorText = t('assistant.errorReply', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Une erreur est survenue. Réessaie ou contacte-moi directement.' });
      setMessages((prev) => {
        const n = [...prev];
        n[n.length - 1] = { role: 'assistant', text: errorText };
        return n;
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Effet de frappe : afficher la dernière réponse assistant caractère par caractère
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (!last || last.role !== 'assistant' || !last.typing) return;
    const fullLen = last.text.length;
    if (typingVisibleLength >= fullLen) {
      setMessages((prev) => {
        const next = [...prev];
        next[next.length - 1] = { ...next[next.length - 1], typing: false };
        return next;
      });
      return;
    }
    const t = setTimeout(() => {
      setTypingVisibleLength((n) => Math.min(n + 1, fullLen));
    }, TYPING_MS_PER_CHAR);
    return () => clearTimeout(t);
  }, [messages, typingVisibleLength]);

  // Scroll vers le bas à chaque nouveau message ou avancement du typing
  useEffect(() => {
    const el = messagesScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typingVisibleLength]);

  const handleSend = () => sendMessage(inputValue);
  const handleSuggestionClick = (suggestionText) => () => sendMessage(suggestionText);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden',
        bgcolor: 'var(--background)',
      }}
    >
      {/* Header — fixe, ne scrolle pas */}
      <Box
        sx={{
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2,
          py: 1.5,
          borderBottom: '1px solid var(--accents3)',
          bgcolor: 'var(--background-card)',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SmartToyIcon sx={{ color: 'var(--primary)', fontSize: 28 }} />
          <Box sx={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'var(--text)', fontSize: '1rem' }}>
              Pudgy
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontWeight: 600,
                color: 'var(--primary)',
                textShadow: '0 0 12px var(--primary), 0 0 24px rgba(255, 215, 0, 0.4)',
                letterSpacing: '0.02em',
              }}
            >
              {t('assistant.title', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Assistant IA' })}
            </Typography>
          </Box>
        </Box>
        <IconButton
          onClick={onClose}
          aria-label={t('assistant.close', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Fermer' })}
          sx={{ color: 'var(--text)' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Messages — seule zone scrollable */}
      <Box
        ref={messagesScrollRef}
        sx={{
          flex: 1,
          minHeight: 0,
          overflow: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        {suggestions.length > 0 && (
          messages.length === 0 ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, py: 2 }}>
              <Typography
                variant="caption"
                sx={{
                  color: 'var(--accents7)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  px: 0.5,
                }}
              >
                {t('assistant.suggestionsTitle', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Suggestions' })}
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {suggestions.map((label, i) => (
                  <Chip
                    key={i}
                    label={label}
                    onClick={handleSuggestionClick(label)}
                    size="small"
                    sx={{
                      maxWidth: '100%',
                      bgcolor: 'var(--background-card)',
                      border: '1px solid var(--accents3)',
                      color: 'var(--text)',
                      fontWeight: 500,
                      '&:hover': {
                        borderColor: 'var(--primary)',
                        bgcolor: 'var(--primary-opacity)',
                        color: 'var(--text)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          ) : (
            <Accordion
              defaultExpanded={false}
              disableGutters
              sx={{
                bgcolor: 'transparent',
                boxShadow: 'none',
                '&:before': { display: 'none' },
                border: '1px solid var(--accents3)',
                borderRadius: 1.5,
                mb: 1,
                '& .MuiAccordionSummary-root': { minHeight: 40 },
                '& .MuiAccordionSummary-content': { my: 1 },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'var(--text)' }} />}
                aria-controls="assistant-suggestions"
                id="assistant-suggestions-header"
                sx={{
                  color: 'var(--accents7)',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontSize: '0.75rem',
                }}
              >
                {t('assistant.suggestionsTitle', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Suggestions' })}
              </AccordionSummary>
              <AccordionDetails sx={{ pt: 0 }}>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {suggestions.map((label, i) => (
                    <Chip
                      key={i}
                      label={label}
                      onClick={handleSuggestionClick(label)}
                      size="small"
                      sx={{
                        maxWidth: '100%',
                        bgcolor: 'var(--background-card)',
                        border: '1px solid var(--accents3)',
                        color: 'var(--text)',
                        fontWeight: 500,
                        '&:hover': {
                          borderColor: 'var(--primary)',
                          bgcolor: 'var(--primary-opacity)',
                          color: 'var(--text)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          )
        )}
        {messages.map((msg, i) => {
          const isTyping = msg.role === 'assistant' && msg.typing && i === messages.length - 1;
          const displayText = isTyping
            ? (msg.text ? msg.text.slice(0, typingVisibleLength) : '…')
            : msg.text;
          return (
            <Box
              key={i}
              sx={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                px: 2,
                py: 1.25,
                borderRadius: 2,
                bgcolor: msg.role === 'user' ? 'var(--primary-opacity)' : 'var(--background-card)',
                border: '1px solid var(--accents3)',
              }}
            >
              {isTyping && !msg.text ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, py: 0.5 }}>
                  <CircularProgress size={16} thickness={4} sx={{ color: 'var(--primary)' }} />
                  <Typography variant="body2" sx={{ color: 'var(--accents6)', fontSize: '0.875rem' }}>
                    …
                  </Typography>
                </Box>
              ) : (
                <Typography variant="body2" component="span" sx={{ color: 'var(--text)', whiteSpace: 'pre-wrap' }}>
                  {parseMessageWithLinks(displayText).map((seg, k) =>
                    seg.type === 'link' ? (
                      <Link
                        key={k}
                        href={seg.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: 'var(--primary)',
                          fontWeight: 600,
                          textDecoration: 'underline',
                          '&:hover': { textDecoration: 'underline', opacity: 0.9 },
                        }}
                      >
                        {seg.content}
                      </Link>
                    ) : (
                      <span key={k}>{seg.content}</span>
                    )
                  )}
                  {isTyping && (
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        width: 2,
                        height: '1em',
                        bgcolor: 'var(--primary)',
                        animation: 'blink 0.8s step-end infinite',
                        '@keyframes blink': {
                          '50%': { opacity: 0 },
                        },
                        verticalAlign: 'text-bottom',
                        ml: 0.25,
                      }}
                    />
                  )}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>

      {/* Input — fixe, ne scrolle pas */}
      <Box
        sx={{
          flexShrink: 0,
          p: 2,
          borderTop: '1px solid var(--accents3)',
          bgcolor: 'var(--background-card)',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-end' }}>
          <TextField
            fullWidth
            size="small"
            placeholder={t('assistant.placeholder', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Écris ton message…' })}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            multiline
            maxRows={3}
            disabled={inputDisabled}
            sx={{
              '& .MuiOutlinedInput-root': {
                bgcolor: 'var(--background)',
                borderRadius: 2,
                '& fieldset': { borderColor: 'var(--accents3)' },
                '&:hover fieldset': { borderColor: 'var(--primary)' },
              },
            }}
          />
          <Tooltip title={t('assistant.send', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Envoyer' })} placement="top">
            <span>
              <IconButton
                type="button"
                onClick={handleSend}
                disabled={!inputValue?.trim() || inputDisabled}
                aria-label={t('assistant.send', { ns: _NAMESPACE_LANGAGE_COMMON_, defaultValue: 'Envoyer la question' })}
                sx={{
                  bgcolor: 'var(--primary)',
                  color: 'var(--text-secondary)',
                  '&:hover': { bgcolor: 'var(--primary)', opacity: 0.9 },
                  '&.Mui-disabled': { bgcolor: 'var(--accents3)', color: 'var(--accents6)' },
                }}
              >
                <SendIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );

  const drawerSx = { zIndex: 1400 };

  if (isMobile) {
    return (
      <Drawer
        anchor="bottom"
        open={open}
        onClose={onClose}
        sx={drawerSx}
        slotProps={{
          paper: {
            sx: {
              height: DRAWER_HEIGHT_MOBILE,
              maxHeight: '100%',
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              bgcolor: 'var(--background)',
              border: '1px solid var(--accents3)',
            },
          },
        }}
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      sx={drawerSx}
      slotProps={{
        paper: {
          sx: {
            width: DRAWER_WIDTH,
            maxWidth: '100%',
            bgcolor: 'var(--background)',
            borderLeft: '1px solid var(--accents3)',
          },
        },
      }}
    >
      {content}
    </Drawer>
  );
}
