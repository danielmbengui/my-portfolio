import React, { useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Grid,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'next-i18next';
import { Fade } from 'react-awesome-reveal';
import { motion } from 'framer-motion';
import { AngolanIcon, EnglishIcon, FrenchIcon, ItalianIcon, PortugueseIcon } from '../icons/FlagIcons';

const languages = [
  {
    id: 'fr',
    Icon: FrenchIcon,
    nameKey: 'sections.skills.langs.fr.name',
    descKey: 'sections.skills.langs.fr.description',
    valueKey: 'sections.skills.langs.fr.value',
    levelKey: 'sections.skills.langs.fr.level',
  },
  {
    id: 'en',
    Icon: EnglishIcon,
    nameKey: 'sections.skills.langs.en.name',
    descKey: 'sections.skills.langs.en.description',
    valueKey: 'sections.skills.langs.en.value',
    levelKey: 'sections.skills.langs.en.level',
  },
  {
    id: 'it',
    Icon: ItalianIcon,
    nameKey: 'sections.skills.langs.it.name',
    descKey: 'sections.skills.langs.it.description',
    valueKey: 'sections.skills.langs.it.value',
    levelKey: 'sections.skills.langs.it.level',
  },
  {
    id: 'ao',
    Icon: AngolanIcon,
    nameKey: 'sections.skills.langs.ao.name',
    descKey: 'sections.skills.langs.ao.description',
    valueKey: 'sections.skills.langs.ao.value',
    levelKey: 'sections.skills.langs.ao.level',
  },
  {
    id: 'pt',
    Icon: PortugueseIcon,
    nameKey: 'sections.skills.langs.pt.name',
    descKey: 'sections.skills.langs.pt.description',
    valueKey: 'sections.skills.langs.pt.value',
    levelKey: 'sections.skills.langs.pt.level',
  },
];

export default function LanguagesComponent({ embedded = false }) {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState('fr');

  // Langues triées par valeur (niveau de maîtrise) décroissante
  const sortedLanguages = [...languages].sort((a, b) => {
    const valA = parseInt(t(a.valueKey), 10) || 0;
    const valB = parseInt(t(b.valueKey), 10) || 0;
    return valB - valA;
  });

  const handleChange = (panel) => (_, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container
      sx={{
        position: 'relative',
        overflow: 'visible',
        mt: '20px',
        ...(embedded ? { px: 0, py: 0 } : {}),
      }}
    >
      <Grid
        container
        justifyContent="center"
        spacing={embedded ? 3 : 4}
        pt={embedded ? 3 : 4}
        pb={embedded ? 4 : { xs: 20, sm: 10 }}
      >
        {/* En-tête — animation d'entrée titre + sous-titre */}
        <Grid item xs={12} sx={{ textAlign: 'center', ...(embedded ? { mt: 0 } : {}) }}>
          <Stack spacing={1} alignItems="center" component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }} variants={{ visible: { transition: { staggerChildren: 0.12 } } }}>
            <Typography
              component={motion.h1}
              variants={{
                hidden: { opacity: 0, y: 20, scale: 0.96 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              sx={{
                fontSize: { xs: 24, sm: 28 },
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: 'var(--text)',
                mb: 0.5,
              }}
            >
              {t('sections.skills.langs.title')}
            </Typography>
            <Typography
              component={motion.p}
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              variant="body1"
              sx={{
                color: 'var(--accents7)',
                maxWidth: 800,
                fontSize: { xs: '0.95rem', sm: '1.05rem' },
                lineHeight: 1.6,
              }}
            >
              {t('sections.skills.langs.subtitle')}
            </Typography>
          </Stack>
        </Grid>

        {/* Cartes des langues */}
        <Grid item xs={12} sm={12} md={10}>
          <Fade triggerOnce cascade delay={300}>
            {sortedLanguages.map((lang, index) => {
              const Icon = lang.Icon;
              const rawValue = t(lang.valueKey);
              const numericValue = typeof rawValue === 'number' ? rawValue : (parseInt(rawValue, 10) || 80);

              return (
                <Accordion
                  key={lang.id}
                  expanded={expanded === lang.id}
                  onChange={handleChange(lang.id)}
                  sx={{
                    mb: 2,
                    background: 'var(--background-card)',
                    border: '1px solid var(--accents3)',
                    borderRadius: '8px !important',
                    overflow: 'hidden',
                    '&:before': { display: 'none' },
                    boxShadow: 'none',
                    transition: 'border-color 0.2s ease',
                    borderColor: expanded === lang.id ? 'var(--accents5)' : undefined,
                    '&:hover': {
                      borderColor: 'var(--accents5)',
                    },
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: 'var(--primary)' }} />}
                    sx={{
                      px: { xs: 2, sm: 3 },
                      py: 1.5,
                      minHeight: { xs: 64, sm: 72 },
                      '& .MuiAccordionSummary-content': {
                        my: 2,
                        alignItems: 'center',
                      },
                    }}
                  >
                    <Stack direction="row" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                      <Box
                        sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'linear-gradient(135deg, var(--accents3) 0%, var(--accents2) 100%)',
                          border: '1px solid var(--accents4)',
                          overflow: 'hidden',
                        }}
                      >
                        <Icon size={28} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          sx={{
                            //fontWeight: 700,
                            fontSize: '0.75rem',
                            color: 'var(--text-color)',
                          }}
                        >
                          {t(`langs.${lang.id}`)}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={1.5}>
                          <LinearProgress
                            variant="determinate"
                            value={numericValue}
                            sx={{
                              width: 100,
                              height: 6,
                              borderRadius: 3,
                              backgroundColor: 'var(--accents4)',
                              '& .MuiLinearProgress-bar': {
                                background: 'linear-gradient(90deg, var(--gold-600), var(--gold-400))',
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: 'var(--primary)',
                              fontWeight: 600,
                              minWidth: 36,
                            }}
                          >
                            {numericValue}%
                          </Typography>
                        </Stack>
                      </Box>
                      <Typography
                        variant="caption"
                        sx={{
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 2,
                          background: 'var(--primary-opacity)',
                          color: 'var(--gold-300)',
                          fontWeight: 600,
                          display: { xs: 'none', sm: 'block' },
                        }}
                      >
                        {t(lang.levelKey)}
                      </Typography>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, pb: 3, pt: 0 }}>
                    <Typography
                      sx={{
                        color: 'var(--accents8)',
                        lineHeight: 1.8,
                        textAlign: 'justify',
                        fontSize: { xs: '0.95rem', sm: '1rem' },
                      }}
                    >
                      {t(lang.descKey)}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            })}
          </Fade>
        </Grid>
      </Grid>
    </Container>
  );
}
