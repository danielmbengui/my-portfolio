import React, { useRef, useState } from 'react';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Box,
  Button,
  Chip,
  LinearProgress,
  Stack,
  Typography,
} from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CodeIcon from '@mui/icons-material/Code';
import DownloadIcon from '@mui/icons-material/Download';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import ExploreIcon from '@mui/icons-material/Explore';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TvIcon from '@mui/icons-material/Tv';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { useTranslation } from 'next-i18next';
import { _MY_PROFILE_, _NAMESPACE_LANGAGE_COMMON_, _PAGE_LINK_HOME_ } from '@/_mocks_/_settings_items_';
import { MY_AVATAR_BLACK_AND_WHITE } from '@/constants';
import { AngolanIcon, EnglishIcon, FrenchIcon, ItalianIcon, PortugueseIcon } from '@/components/icons/FlagIcons';
import { AndroidIcon, C_LangageIcon, CssIcon, EtherJsIcon, FigmaIcon, FlutterIcon, FirebaseIcon, GithubIcon, HeroUIIcon, JavaIcon, JavascriptIcon, MaterialUiIcon, MySqlIcon, NextJsIcon, PostgresIcon, PwaIcon, PythonIcon, ReactIcon, SolidityIcon, SqlLiteIcon, TailwindIcon, TypescriptIcon, Web3JsIcon } from '@/components/icons/IconifiyIcons';

const getCvPdfFilename = (lang) => `cv-daniel-mbengui-${lang || 'fr'}.pdf`;

const LINK_GOOGLE_PLAY_PLAYPAD = 'https://play.google.com/store/apps/details?id=com.playpad.playpadapp';
const LINK_APP_STORE_PLAYPAD = 'https://apps.apple.com/app/playpad-app-padel/id6450876480';

const CvSectionAccordion = ({ sectionId, title, children, expanded, onChange }) => (
  <Accordion
    className="cv-section cv-accordion"
    data-section-id={sectionId}
    expanded={expanded}
    onChange={onChange}
    sx={{
      bgcolor: 'transparent',
      boxShadow: 'none',
      '&::before': { display: 'none' },
      '&.MuiAccordion-root': { borderBottom: '1px solid var(--accents4)' },
    }}
  >
    <AccordionSummary
      expandIcon={<ExpandMoreIcon sx={{ color: 'var(--primary)' }} />}
      className="cv-section-title-wrap"
      sx={{
        minHeight: 48,
        '& .MuiAccordionSummary-content': { my: 1.5 },
      }}
    >
      <Typography
        component="span"
        className="cv-section-title"
        sx={{
          color: 'var(--primary)',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          fontSize: '0.75rem',
        }}
      >
        {title}
      </Typography>
    </AccordionSummary>
    <AccordionDetails className="cv-section-content" sx={{ pt: 0, pb: 2 }}>
      {children}
    </AccordionDetails>
  </Accordion>
);

const CvEntry = ({ period, location, title, items }) => (
  <Box sx={{ mb: 2.5 }}>
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'baseline' }} flexWrap="wrap" gap={0.5}>
      <Typography component="span" sx={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.95rem' }}>
        {period}
      </Typography>
      <Typography component="span" sx={{ color: 'var(--accents7)', fontSize: '0.9rem' }}>
        {location}
      </Typography>
    </Stack>
    <Typography component="div" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.95rem', mb: 0.5 }}>
      {title}
    </Typography>
    {items && (
      <Box component="ul" sx={{ m: 0, pl: 2.5, color: 'var(--accents8)', fontSize: '0.9rem', lineHeight: 1.7 }}>
        {items.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Box>
    )}
  </Box>
);

const CvCertEntry = ({ period, location, title, desc }) => (
  <Box sx={{ mb: 2 }}>
    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems={{ xs: 'flex-start', sm: 'baseline' }} flexWrap="wrap" gap={0.5}>
      <Typography component="span" sx={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>
        {period}
      </Typography>
      <Typography component="span" sx={{ color: 'var(--accents7)', fontSize: '0.85rem' }}>
        {location}
      </Typography>
    </Stack>
    <Typography component="div" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.9rem', mb: 0.5 }}>
      {title}
    </Typography>
    {desc && (
      <Typography component="p" sx={{ color: 'var(--accents8)', fontSize: '0.85rem', lineHeight: 1.6, m: 0 }}>
        {desc}
      </Typography>
    )}
  </Box>
);

const CvProjectEntry = ({ period, title, desc }) => (
  <Box sx={{ mb: 2 }}>
    <Typography component="span" sx={{ fontWeight: 600, color: 'var(--text)', fontSize: '0.9rem' }}>
      {period}
    </Typography>
    <Typography component="div" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.9rem', mb: 0.5 }}>
      {title}
    </Typography>
    {desc && (
      <Typography component="p" sx={{ color: 'var(--accents8)', fontSize: '0.85rem', lineHeight: 1.6, m: 0 }}>
        {desc}
      </Typography>
    )}
  </Box>
);

const SOFT_SKILL_ICONS = {
  Teamwork: GroupWorkIcon,
  'Problem Solving': LightbulbIcon,
  Adaptability: SwapHorizIcon,
  Creativity: AutoAwesomeIcon,
  Autonomy: SelfImprovementIcon,
  Curiosity: ExploreIcon,
  Resilience: TrendingUpIcon,
  Patience: HourglassEmptyIcon,
};

const SoftSkillCard = ({ iconKey, title, desc }) => {
  const Icon = SOFT_SKILL_ICONS[iconKey || title];
  return (
    <Box
      className="cv-softskill-card"
      sx={{
        p: 1.25,
        borderRadius: 2,
        border: '1px solid var(--accents4)',
        bgcolor: 'var(--background-card)',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          borderColor: 'var(--primary)',
          boxShadow: '0 2px 8px var(--primary-opacity)',
        },
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 0.75 }}>
        {Icon && (
          <Box sx={{ display: 'flex', alignItems: 'center', color: 'var(--primary)' }}>
            <Icon sx={{ fontSize: 20 }} />
          </Box>
        )}
        <Chip
          label={title}
          size="small"
          sx={{
            height: 24,
            fontWeight: 600,
            fontSize: '0.8rem',
            bgcolor: 'var(--primary-opacity)',
            color: 'var(--primary)',
            border: '1px solid transparent',
            '& .MuiChip-label': { px: 1 },
          }}
        />
      </Stack>
      <Typography component="p" sx={{ color: 'var(--accents8)', fontSize: '0.8rem', lineHeight: 1.45, m: 0, pl: 3.5 }}>
        {desc}
      </Typography>
    </Box>
  );
};

const HobbyItem = ({ icon: Icon, title, desc }) => (
  <Stack
    direction="row"
    alignItems="center"
    spacing={1.5}
    className="cv-hobby-item"
    sx={{ mb: 1.5 }}
  >
    <Box
      className="cv-hobby-icon-wrap"
      sx={{
        width: 36,
        height: 36,
        borderRadius: 2,
        border: '1px solid var(--accents4)',
        bgcolor: 'var(--background-card)',
        boxShadow: '0 2px 8px var(--primary-opacity)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        color: 'var(--primary)',
      }}
    >
      {Icon && <Icon sx={{ fontSize: 20 }} />}
    </Box>
    <Box sx={{ flex: 1, minWidth: 0 }}>
      <Typography component="span" className="cv-hobby-title" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.9rem' }}>
        {title}
      </Typography>
      <Typography component="span" sx={{ color: 'var(--accents8)', fontSize: '0.85rem' }}>
        {' — '}{desc}
      </Typography>
    </Box>
  </Stack>
);

const SkillBar = ({ name, value, Icon }) => (
  <Box sx={{ mb: 1 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 0.5 }}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {Icon && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Icon size={20} />
          </Box>
        )}
        <Typography component="span" sx={{ fontSize: '0.85rem', color: 'var(--text)' }}>
          {name}
        </Typography>
      </Stack>
      <Typography component="span" sx={{ fontSize: '0.75rem', color: 'var(--accents7)' }}>
        {value}%
      </Typography>
    </Stack>
    <LinearProgress
      variant="determinate"
      value={value}
      sx={{
        height: 6,
        borderRadius: 3,
        bgcolor: 'var(--accents3)',
        '& .MuiLinearProgress-bar': {
          bgcolor: 'var(--primary)',
          borderRadius: 3,
        },
      }}
    />
  </Box>
);

const STARS_MAX = 5;

const LanguageStars = ({ name, level, stars, Icon }) => (
  <Box sx={{ mb: 1.5 }}>
    <Stack direction="row" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={1}>
      <Stack direction="row" alignItems="center" spacing={1}>
        {Icon && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <Icon size={20} />
          </Box>
        )}
        <Typography component="span" sx={{ fontSize: '0.85rem', color: 'var(--text)' }}>
          {name}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" spacing={0.25}>
        {Array.from({ length: STARS_MAX }, (_, i) =>
          i < stars ? (
            <StarIcon key={i} sx={{ fontSize: 18, color: 'var(--primary)' }} />
          ) : (
            <StarBorderIcon key={i} sx={{ fontSize: 18, color: 'var(--accents4)' }} />
          )
        )}
      </Stack>
    </Stack>
    {level && (
      <Typography component="span" sx={{ fontSize: '0.7rem', color: 'var(--accents7)', pl: 3.5, display: 'block' }}>
        {level}
      </Typography>
    )}
  </Box>
);

const CV_SECTION_IDS = [
  'languages',
  'experiences',
  'education',
  'certificates',
  'projects',
  'skills',
  'soft-skills',
  'hobbies',
  'publications',
];

const defaultExpanded = () =>
  CV_SECTION_IDS.reduce((acc, id) => ({ ...acc, [id]: id === 'languages' }), {});

export default function CvComponent({ embedded = false }) {
  const { t, i18n } = useTranslation([_NAMESPACE_LANGAGE_COMMON_, 'cv']);
  const cvRef = useRef(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [sectionExpanded, setSectionExpanded] = useState(defaultExpanded());

  const handleSectionChange = (sectionId) => (_, isExpanded) => {
    setSectionExpanded((prev) => ({ ...prev, [sectionId]: isExpanded }));
  };

  const handleDownloadPdf = async () => {
    if (!cvRef.current || pdfLoading) return;
    setPdfLoading(true);
    const sourceEl = cvRef.current;
    const clone = sourceEl.cloneNode(true);
    clone.classList.add('cv-print-mode');
    const container = document.createElement('div');
    container.setAttribute('aria-hidden', 'true');
    Object.assign(container.style, {
      position: 'fixed',
      left: '-99999px',
      top: '0',
      width: '720px',
      maxWidth: '720px',
      minHeight: '100%',
      overflow: 'visible',
      visibility: 'hidden',
      pointerEvents: 'none',
      zIndex: -1,
    });
    container.appendChild(clone);
    document.body.appendChild(container);
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        try {
          const html2pdf = (await import('html2pdf.js')).default;
          const pdfWorker = html2pdf()
            .set({
              margin: [10, 10, 18, 10],
              image: { type: 'jpeg', quality: 0.98 },
              html2canvas: { scale: 2, useCORS: true, letterRendering: true },
              jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
              pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
            })
            .from(clone);
          const pdf = await pdfWorker.toPdf().get('pdf');
          const totalPages = pdf.internal.getNumberOfPages();
          const pageWidth = pdf.internal.pageSize.getWidth();
          const pageHeight = pdf.internal.pageSize.getHeight();
          const footerText = 'Généré depuis : https://danielmbengui.ch/cv';
          const footerUrl = 'https://danielmbengui.ch/cv';
          for (let i = 1; i <= totalPages; i++) {
            pdf.setPage(i);
            pdf.setFontSize(8);
            pdf.setTextColor(120, 120, 120);
            const textWidth = pdf.getStringUnitWidth(footerText) * 8 / pdf.internal.scaleFactor;
            const xPos = (pageWidth - textWidth) / 2;
            const yPos = pageHeight - 8;
            pdf.textWithLink(footerText, xPos, yPos, { url: footerUrl });
          }
          const blob = pdf.output('blob');
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = getCvPdfFilename(i18n.language);
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
        } catch (err) {
          console.error('PDF generation failed:', err);
        } finally {
          if (container.parentNode) document.body.removeChild(container);
          setPdfLoading(false);
        }
      });
    });
  };

  const cvContent = (
    <Box
      ref={cvRef}
      component="article"
      className="cv-article"
      sx={{
        maxWidth: 720,
        mx: 'auto',
        p: { xs: 2, sm: 3 },
        color: 'var(--text)',
        fontFamily: '"Roboto", "Helvetica Neue", sans-serif',
      }}
    >
      {/* Header: gauche = nom + poste + liens + bouton | droite = photo */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'stretch', sm: 'flex-start' }}
        spacing={2}
        mb={3}
        className="cv-header"
      >
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" flexWrap="wrap" gap={1} sx={{ mb: 2 }}>
            <Button
              data-cv-back-btn
              component="a"
              href={_PAGE_LINK_HOME_}
              variant="outlined"
              startIcon={<HomeIcon />}
              sx={{
                textTransform: 'none',
                fontWeight: 600,
                borderWidth: '2px',
                borderColor: 'var(--primary)',
                color: 'var(--primary)',
                transition: 'color 0.2s ease, border-color 0.2s ease, background-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  borderWidth: '2px',
                  borderColor: 'var(--primary)',
                  color: 'var(--primary)',
                  bgcolor: 'var(--primary-opacity)',
                  boxShadow: '0 2px 12px var(--primary-opacity)',
                  transform: 'translateY(-1px)',
                },
                '& .MuiButton-startIcon': {
                  color: 'inherit',
                },
              }}
            >
              {t('cv:backToHome')}
            </Button>
            <Button
              data-cv-download-btn
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownloadPdf}
              disabled={pdfLoading}
              sx={{
                background: 'linear-gradient(135deg, var(--gold-400) 0%, var(--gold-500) 100%)',
                color: 'var(--text-secondary)',
                textTransform: 'none',
                fontWeight: 600,
                border: '1px solid rgba(255, 215, 0, 0.35)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, var(--gold-300) 0%, var(--gold-400) 100%)',
                  color: 'var(--text-secondary)',
                  borderColor: 'rgba(255, 215, 0, 0.6)',
                  boxShadow: '0 4px 20px var(--primary-opacity)',
                  transform: 'translateY(-1px)',
                },
              }}
            >
              {pdfLoading ? t('buttons.generatingPdf') : t('buttons.downloadCv')}
            </Button>
          </Stack>
          <Typography component="h1" variant="h4" className="cv-name" sx={{ fontWeight: 700, color: 'var(--text)', mb: 0.5, letterSpacing: '0.02em' }}>
            {t('cv:name')}
          </Typography>
          <Typography component="p" variant="body2" sx={{ color: 'var(--accents7)', fontSize: '0.9rem', mb: 1.5, letterSpacing: '0.01em' }}>
            {t('cv:role')}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={0.5} sx={{ fontSize: '0.85rem', color: 'var(--accents7)' }} useFlexGap>
            <a href={_MY_PROFILE_.socials.website} target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:links.portfolio')}</a>
            <span aria-hidden>·</span>
            <a href={_MY_PROFILE_.socials.linkedin} target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:links.linkedin')}</a>
            <span aria-hidden>·</span>
            <a href={_MY_PROFILE_.socials.github} target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:links.github')}</a>
            <span aria-hidden>·</span>
            <a href={_MY_PROFILE_.socials.playstore} target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:links.googlePlay')}</a>
            {_MY_PROFILE_.socials.appstore ? (
              <>
                <span aria-hidden>·</span>
                <a href={_MY_PROFILE_.socials.appstore} target="_blank" rel="noopener noreferrer" className="cv-link">{t('profileAppstore')}</a>
              </>
            ) : null}
          </Stack>
        </Box>
        <Box
          component="a"
          href={_PAGE_LINK_HOME_}
          className="cv-photo-link"
          sx={{ display: 'block', flexShrink: 0, lineHeight: 0 }}
          aria-label={t('cv:backToHome')}
        >
          <Avatar
            src={MY_AVATAR_BLACK_AND_WHITE}
            alt={t('cv:name')}
            className="cv-photo"
            sx={{
              width: { xs: 88, sm: 100 },
              height: { xs: 88, sm: 100 },
              border: '2px solid var(--primary)',
              bgcolor: 'var(--background-card)',
              cursor: 'pointer',
              transition: 'opacity 0.2s ease, box-shadow 0.2s ease',
              '&:hover': {
                opacity: 0.9,
                boxShadow: '0 4px 12px var(--primary-opacity)',
              },
            }}
          />
        </Box>
      </Stack>

      {/* Tagline */}
      <Typography className="cv-tagline" sx={{ color: 'var(--accents8)', fontSize: '1rem', lineHeight: 1.65, mb: 1.5 }}>
        {t('cv:tagline')}
      </Typography>
      <Typography variant="body2" sx={{ color: 'var(--accents7)', fontSize: '0.8rem', mb: 1 }}>
        <Box component="span" sx={{ fontWeight: 600, color: 'var(--primary)' }}>{t('cv:aiToolsLabel')}</Box> {t('cv:aiTools')}
      </Typography>
      <Typography variant="body2" component="div" sx={{ color: 'var(--accents7)', fontSize: '0.8rem', mb: 3 }}>
        <Box component="span" sx={{ fontWeight: 600, color: 'var(--primary)' }}>{t('cv:alsoLabel')}</Box> {t('cv:also')}
      </Typography>

      {/* Languages — en premier */}
      <CvSectionAccordion
        sectionId="languages"
        title={t('cv:sections.languages')}
        expanded={sectionExpanded.languages}
        onChange={handleSectionChange('languages')}
      >
        <Stack spacing={0.5}>
          <LanguageStars name={t('cv:languages.french')} level={t('cv:languages.levelNative')} stars={5} Icon={FrenchIcon} />
          <LanguageStars name={t('cv:languages.english')} level={t('cv:languages.levelFluent')} stars={5} Icon={EnglishIcon} />
          <LanguageStars name={t('cv:languages.lingala')} level={t('cv:languages.levelFluentB2')} stars={4} Icon={AngolanIcon} />
          <LanguageStars name={t('cv:languages.italian')} level={t('cv:languages.levelElementary')} stars={2} Icon={ItalianIcon} />
          <LanguageStars name={t('cv:languages.portuguese')} level={t('cv:languages.levelBeginner')} stars={1} Icon={PortugueseIcon} />
        </Stack>
      </CvSectionAccordion>

      {/* Experiences */}
      <CvSectionAccordion
        sectionId="experiences"
        title={t('cv:sections.experiences')}
        expanded={sectionExpanded.experiences}
        onChange={handleSectionChange('experiences')}
      >
        <CvEntry
          period={t('cv:experiences.dandela.period')}
          location={t('cv:experiences.dandela.location')}
          title={<>{t('cv:experiences.dandela.titlePrefix')}Dandela Academy</>}
          items={[
            t('cv:experiences.dandela.items.0'),
            t('cv:experiences.dandela.items.1'),
            <React.Fragment key="dandela-2">{t('cv:experiences.dandela.items.2Prefix')}<a href="https://academy.dandela.com" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:experiences.dandela.linkSite')}</a>{t('cv:experiences.dandela.items.2Suffix')}</React.Fragment>,
            <React.Fragment key="dandela-3">{t('cv:experiences.dandela.items.3Prefix')}<a href="https://academy.dandela.com" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:experiences.dandela.linkApp')}</a>{t('cv:experiences.dandela.items.3Suffix')}</React.Fragment>,
          ]}
        />
        <CvEntry
          period={t('cv:experiences.playpad.period')}
          location={t('cv:experiences.playpad.location')}
          title={<>{t('cv:experiences.playpad.titlePrefix')}PlayPad Sàrl</>}
          items={[
            t('cv:experiences.playpad.items.0'),
            <React.Fragment key="playpad-1">
              {t('cv:experiences.playpad.items.1Prefix')}
              <a href={LINK_GOOGLE_PLAY_PLAYPAD} target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:experiences.playpad.linkGooglePlay')}</a>
              {t('cv:experiences.playpad.items.1Between')}
              <a href={LINK_APP_STORE_PLAYPAD} target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:experiences.playpad.linkAppStore')}</a>
              {t('cv:experiences.playpad.items.1Suffix')}
            </React.Fragment>,
            <React.Fragment key="playpad-2">
              {t('cv:experiences.playpad.items.2Prefix')}
              <a href="https://playpadapp.com" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:experiences.playpad.linkSite')}</a>
              {t('cv:experiences.playpad.items.2Suffix')}
            </React.Fragment>,
          ]}
        />
        <CvEntry
          period={t('cv:experiences.mdandela.period')}
          location={t('cv:experiences.mdandela.location')}
          title={t('cv:experiences.mdandela.title')}
          items={[t('cv:experiences.mdandela.items.0'), t('cv:experiences.mdandela.items.1'), t('cv:experiences.mdandela.items.2')]}
        />
        <CvEntry
          period={t('cv:experiences.imad.period')}
          location={t('cv:experiences.imad.location')}
          title={<>{t('cv:experiences.imad.titlePrefix')}<a href="https://www.imad-ge.ch/" target="_blank" rel="noopener noreferrer" className="cv-link">Institution genevoise de maintien à domicile (Imad)</a></>}
          items={[t('cv:experiences.imad.items.0'), t('cv:experiences.imad.items.1'), t('cv:experiences.imad.items.2')]}
        />
        <CvEntry
          period={t('cv:experiences.schneider.period')}
          location={t('cv:experiences.schneider.location')}
          title={<>{t('cv:experiences.schneider.titlePrefix')}<a href="https://schneider-transport.com/fr/" target="_blank" rel="noopener noreferrer" className="cv-link">Schneider &amp; Cie SA</a></>}
          items={[t('cv:experiences.schneider.items.0')]}
        />
      </CvSectionAccordion>

      {/* Education */}
      <CvSectionAccordion
        sectionId="education"
        title={t('cv:sections.education')}
        expanded={sectionExpanded.education}
        onChange={handleSectionChange('education')}
      >
        <CvEntry
          period={t('cv:education.fortytwo.period')}
          location={t('cv:education.fortytwo.location')}
          title={<><a href="https://42lausanne.ch/" target="_blank" rel="noopener noreferrer" className="cv-link">42Lausanne</a>{t('cv:education.fortytwo.titleSuffix')}</>}
          items={[t('cv:education.fortytwo.items.0')]}
        />
        <CvEntry
          period={t('cv:education.esig.period')}
          location={t('cv:education.esig.location')}
          title={<><a href="https://edu.ge.ch/secondaire2/esig/" target="_blank" rel="noopener noreferrer" className="cv-link">Ecole Supérieure d&apos;Informatique de Gestion (ESIG)</a>{t('cv:education.esig.titleSuffix')}</>}
          items={[t('cv:education.esig.items.0')]}
        />
        <CvEntry
          period={t('cv:education.stael.period')}
          location={t('cv:education.stael.location')}
          title={t('cv:education.stael.title')}
          items={[t('cv:education.stael.items.0'), t('cv:education.stael.items.1')]}
        />
      </CvSectionAccordion>

      {/* Certificates */}
      <CvSectionAccordion
        sectionId="certificates"
        title={t('cv:sections.certificates')}
        expanded={sectionExpanded.certificates}
        onChange={handleSectionChange('certificates')}
      >
        <CvCertEntry
          period={t('cv:certificates.react.period')}
          location={t('cv:certificates.react.location')}
          title={<a href="https://codesignal.com/learn/certificates/cm8oi3sj300041wzyv83qfuee/course-paths/13" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:certificates.react.title')}</a>}
          desc={t('cv:certificates.react.desc')}
        />
        <CvCertEntry
          period={t('cv:certificates.jsAlgo.period')}
          location={t('cv:certificates.jsAlgo.location')}
          title={<a href="https://www.freecodecamp.org/certification/fccef9a36a5-5f01-45d2-ad9e-88f37eac23d1/javascript-algorithms-and-data-structures" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:certificates.jsAlgo.title')}</a>}
          desc={t('cv:certificates.jsAlgo.desc')}
        />
        <CvCertEntry
          period={t('cv:certificates.responsive.period')}
          location={t('cv:certificates.responsive.location')}
          title={<a href="https://www.freecodecamp.org/certification/fccef9a36a5-5f01-45d2-ad9e-88f37eac23d1/responsive-web-design" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:certificates.responsive.title')}</a>}
          desc={t('cv:certificates.responsive.desc')}
        />
        <CvCertEntry
          period={t('cv:certificates.javaSe11.period')}
          location={t('cv:certificates.javaSe11.location')}
          title={t('cv:certificates.javaSe11.title')}
          desc={t('cv:certificates.javaSe11.desc')}
        />
        <CvCertEntry
          period={t('cv:certificates.python.period')}
          location={t('cv:certificates.python.location')}
          title={<a href="https://verify.openedg.org/?id=tNey.YC6P.z9by" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:certificates.python.title')}</a>}
          desc={t('cv:certificates.python.desc')}
        />
        <CvCertEntry
          period={t('cv:certificates.psm1.period')}
          location={t('cv:certificates.psm1.location')}
          title={t('cv:certificates.psm1.title')}
          desc={t('cv:certificates.psm1.desc')}
        />
        <CvCertEntry
          period={t('cv:certificates.ifage.period')}
          location={t('cv:certificates.ifage.location')}
          title={<a href="/assets/certifications/ifage.pdf" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:certificates.ifage.title')}</a>}
          desc={t('cv:certificates.ifage.desc')}
        />
        <CvCertEntry
          period={t('cv:certificates.esigDip.period')}
          location={t('cv:certificates.esigDip.location')}
          title={<a href="/assets/certifications/esig.pdf" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:certificates.esigDip.title')}</a>}
          desc={t('cv:certificates.esigDip.desc')}
        />
        <CvCertEntry
          period={t('cv:certificates.cfc.period')}
          location={t('cv:certificates.cfc.location')}
          title={<a href="/assets/certifications/cfc.pdf" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:certificates.cfc.title')}</a>}
          desc={t('cv:certificates.cfc.desc')}
        />
      </CvSectionAccordion>

      {/* Projects */}
      <CvSectionAccordion
        sectionId="projects"
        title={t('cv:sections.projects')}
        expanded={sectionExpanded.projects}
        onChange={handleSectionChange('projects')}
      >
        <CvProjectEntry
          period={t('cv:projects.drilldev.period')}
          title={<a href="https://drilldev.com" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:projects.drilldev.title')}</a>}
          desc={t('cv:projects.drilldev.desc')}
        />
        <CvProjectEntry
          period={t('cv:projects.winno.period')}
          title={<a href="https://winno.bearzclub.io" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:projects.winno.title')}</a>}
          desc={t('cv:projects.winno.desc')}
        />
      </CvSectionAccordion>

      {/* Skills */}
      <CvSectionAccordion
        sectionId="skills"
        title={t('cv:sections.skills')}
        expanded={sectionExpanded.skills}
        onChange={handleSectionChange('skills')}
      >
        <Stack className="cv-skills-content" spacing={1.5}>
          <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid' }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.85rem', mb: 0.5 }}>{t('cv:skills.webDevelopment')}</Typography>
            <SkillBar name="JavaScript" value={90} Icon={JavascriptIcon} />
            <SkillBar name="Next.js" value={90} Icon={NextJsIcon} />
            <SkillBar name="React.js" value={80} Icon={ReactIcon} />
            <SkillBar name="TypeScript" value={70} Icon={TypescriptIcon} />
          </Box>
          <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid', mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.85rem', mb: 0.5 }}>{t('cv:skills.mobileDevelopment')}</Typography>
            <SkillBar name="PWA" value={100} Icon={PwaIcon} />
            <SkillBar name="Flutter" value={80} Icon={FlutterIcon} />
            <SkillBar name="Android (Java)" value={80} Icon={AndroidIcon} />
            <SkillBar name="React Native" value={70} Icon={ReactIcon} />
          </Box>
          <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid', mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.85rem', mb: 0.5 }}>{t('cv:skills.databases')}</Typography>
            <SkillBar name="Firebase" value={90} Icon={FirebaseIcon} />
            <SkillBar name="SQLite" value={90} Icon={SqlLiteIcon} />
            <SkillBar name="PostgreSQL" value={80} Icon={PostgresIcon} />
            <SkillBar name="MySQL" value={80} Icon={MySqlIcon} />
          </Box>
          <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid', mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.85rem', mb: 0.5 }}>{t('cv:skills.blockchain')}</Typography>
            <SkillBar name="Ethers.js" value={85} Icon={EtherJsIcon} />
            <SkillBar name="Web3.js" value={85} Icon={Web3JsIcon} />
            <SkillBar name="Solidity" value={70} Icon={SolidityIcon} />
          </Box>
          <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid', mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.85rem', mb: 0.5 }}>{t('cv:skills.design')}</Typography>
            <SkillBar name="CSS" value={100} Icon={CssIcon} />
            <SkillBar name="Material UI" value={95} Icon={MaterialUiIcon} />
            <SkillBar name="Tailwind CSS" value={80} Icon={TailwindIcon} />
            <SkillBar name="HeroUI" value={70} Icon={HeroUIIcon} />
            <SkillBar name="Figma" value={50} Icon={FigmaIcon} />
          </Box>
          <Box sx={{ breakInside: 'avoid', pageBreakInside: 'avoid', mt: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: 'var(--primary)', fontSize: '0.85rem', mb: 0.5 }}>{t('cv:skills.otherLanguagesTools')}</Typography>
            <SkillBar name="Git / GitHub" value={85} Icon={GithubIcon} />
            <SkillBar name="Python" value={75} Icon={PythonIcon} />
            <SkillBar name="Java" value={75} Icon={JavaIcon} />
          </Box>
        </Stack>
      </CvSectionAccordion>

      {/* Soft skills — grille de cartes (icône + chip + description) */}
      <CvSectionAccordion
        sectionId="soft-skills"
        title={t('cv:sections.softSkills')}
        expanded={sectionExpanded['soft-skills']}
        onChange={handleSectionChange('soft-skills')}
      >
        <Box
          className="cv-softskills-grid"
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
            gap: 1.5,
          }}
        >
          <SoftSkillCard iconKey="Teamwork" title={t('cv:softSkills.teamwork')} desc={t('cv:softSkills.teamworkDesc')} />
          <SoftSkillCard iconKey="Problem Solving" title={t('cv:softSkills.problemSolving')} desc={t('cv:softSkills.problemSolvingDesc')} />
          <SoftSkillCard iconKey="Adaptability" title={t('cv:softSkills.adaptability')} desc={t('cv:softSkills.adaptabilityDesc')} />
          <SoftSkillCard iconKey="Creativity" title={t('cv:softSkills.creativity')} desc={t('cv:softSkills.creativityDesc')} />
          <SoftSkillCard iconKey="Autonomy" title={t('cv:softSkills.autonomy')} desc={t('cv:softSkills.autonomyDesc')} />
          <SoftSkillCard iconKey="Curiosity" title={t('cv:softSkills.curiosity')} desc={t('cv:softSkills.curiosityDesc')} />
          <SoftSkillCard iconKey="Resilience" title={t('cv:softSkills.resilience')} desc={t('cv:softSkills.resilienceDesc')} />
          <SoftSkillCard iconKey="Patience" title={t('cv:softSkills.patience')} desc={t('cv:softSkills.patienceDesc')} />
        </Box>
      </CvSectionAccordion>

      {/* Hobbies — puces stylées (cercle + icône) + titre + description */}
      <CvSectionAccordion
        sectionId="hobbies"
        title={t('cv:sections.hobbies')}
        expanded={sectionExpanded.hobbies}
        onChange={handleSectionChange('hobbies')}
      >
        <Stack spacing={0}>
          <HobbyItem
            icon={CodeIcon}
            title={t('cv:hobbies.it')}
            desc={t('cv:hobbies.itDesc')}
          />
          <HobbyItem
            icon={SportsEsportsIcon}
            title={t('cv:hobbies.gaming')}
            desc={t('cv:hobbies.gamingDesc')}
          />
          <HobbyItem
            icon={VideoLibraryIcon}
            title={t('cv:hobbies.multimedia')}
            desc={t('cv:hobbies.multimediaDesc')}
          />
          <HobbyItem
            icon={TvIcon}
            title={t('cv:hobbies.sports')}
            desc={t('cv:hobbies.sportsDesc')}
          />
          <HobbyItem
            icon={SportsTennisIcon}
            title={t('cv:hobbies.padel')}
            desc={t('cv:hobbies.padelDesc')}
          />
          <HobbyItem
            icon={EditNoteIcon}
            title={t('cv:hobbies.writing')}
            desc={t('cv:hobbies.writingDesc')}
          />
        </Stack>
      </CvSectionAccordion>

      {/* Publications */}
      <CvSectionAccordion
        sectionId="publications"
        title={t('cv:sections.publications')}
        expanded={sectionExpanded.publications}
        onChange={handleSectionChange('publications')}
      >
        <CvProjectEntry
          period={t('cv:publications.actu2010.period')}
          title={<a href="/assets/publications/ActuVernier_Fevrier_2010.pdf" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:publications.actu2010.title')}</a>}
          desc={t('cv:publications.actu2010.desc')}
        />
        <CvProjectEntry
          period={t('cv:publications.actu2009.period')}
          title={<a href="/assets/publications/ActuVernier_Novembre_2009.pdf" target="_blank" rel="noopener noreferrer" className="cv-link">{t('cv:publications.actu2009.title')}</a>}
          desc={t('cv:publications.actu2009.desc')}
        />
      </CvSectionAccordion>
    </Box>
  );

  if (embedded) {
    return cvContent;
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'var(--background)',
        pt: 3,
        pb: 6,
      }}
    >
      {cvContent}
    </Box>
  );
}
