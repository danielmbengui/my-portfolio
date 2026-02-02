import React, { useRef, useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import { Button, Card, Container, Grid, IconButton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { AgentsAiIcon, ApiCallsIcon, AndroidIcon, AndroidStudioIcon, AtomIcon, BitcoinIcon, ContentCreationIcon, CursorIcon, CssIcon, DiscordApiIcon, DjangoIcon, EclipseIcon, EtherJsIcon, EthereumIcon, FirebaseIcon, GanacheIcon, HtmlIcon, IosIcon, IonicIcon, JavaIcon, JavascriptIcon, MaterialUiIcon, MomentJsIcon, MongoDbIcon, MySqlIcon, NextJsIcon, NodeJsIcon, NotepadIcon, OpenAiIcon, PhotoshopIcon, PhpIcon, PlayStoreIcon, PwaIcon, PythonIcon, ReactIcon, SolidityIcon, SpyderIcon, SqlLiteIcon, TradingBotIcon, TruffleIcon, TypescriptIcon, VimIcon, VisualStudioIcon, Web3JsIcon } from '../icons/IconifiyIcons';
import { I18nIcon, MidjourneyIcon, NetbeansIcon, SynthesiaIcon } from '../icons/ImagesIcons';
import { useDeviceMode } from '@/contexts/DeviceModeProvider';
import { blue } from '@mui/material/colors';
import { useSwipeable } from 'react-swipeable';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FooterComponent from '../footer/FooterComponent';

// ——— Liens apps (rubrique Mobile) — PlayPad ———
const APP_STORE_APP_ID = 'id6450876480';
const APP_STORE_SLUG = 'playpad-app-padel';
const LINK_GOOGLE_PLAY_PLAYPAD = 'https://play.google.com/store/apps/details?id=com.playpad.playpadapp';

// ——— Liens sites (rubrique Web) — Dandela Academy & PlayPad ———
const LINK_DANDELA_ACADEMY = 'https://academy.dandela.com';
const DANDELA_ACADEMY_LOGO_URL = 'https://academy.dandela.com/images/logo.png';
const LINK_PLAYPAD_WEB = 'https://playpadapp.com';
const PLAYPAD_IMAGE_PATH = '/img/playpad/playpad_banner.png';

// ——— Liens (rubrique IA) — Drill Dev ———
const LINK_DRILL_DEV = 'https://drilldev.com/';
const DRILL_DEV_IMAGE_PATH = '/img/drilldev/complete_logo_drilldev.png';

// ——— Liens (rubrique Blockchain) — Winno ———
const LINK_WINNO = 'https://winno.bearzclub.io/';
const WINNO_IMAGE_PATH = '/img/logos/winnobearzclub.png';

// ——— Constantes carousel 3D gaming ———
const ITEM_WIDTH = 200;
const LEN = 4; // sera synchronisé avec itemData.length (Web, Mobile, IA, Blockchain)
const THETA = 360 / LEN;
const RADIUS = Math.round((ITEM_WIDTH / 2) / Math.tan((Math.PI * 2) / LEN / 2));

// ——— Spring slow-motion gaming ———
const springSlow = {
  type: 'spring',
  stiffness: 42,
  damping: 24,
  mass: 0.8,
};

const springCard = {
  type: 'spring',
  stiffness: 120,
  damping: 24,
};

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], delay: i * 0.04 },
  }),
  exit: { opacity: 0, y: 8 },
};

export default function SkillsComponent({ embedded = false }) {
  const { t, i18n } = useTranslation();
  const [selectedId, setSelectedId] = useState(1);
  const appStoreLocale = i18n.language === 'en' ? 'us' : i18n.language;
  const linkAppStore = `https://apps.apple.com/${appStoreLocale}/app/${APP_STORE_SLUG}/${APP_STORE_APP_ID}`;
  const { isMobile } = useDeviceMode();
  const carouselRef = useRef(null);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      setSelectedId((prev) => (prev >= itemData.length ? 1 : prev + 1));
    },
    onSwipedRight: () => {
      setSelectedId((prev) => (prev <= 1 ? itemData.length : prev - 1));
    },
  });

  const goPrev = () => {
    setSelectedId((prev) => (prev <= 1 ? itemData.length : prev - 1));
  };
  const goNext = () => {
    setSelectedId((prev) => (prev >= itemData.length ? 1 : prev + 1));
  };

  const currentItem = itemData[selectedId - 1];
  const angle = -(selectedId - 1) * THETA;

  return (
    <Box
      sx={{
        ...(embedded ? { minHeight: 0, overflow: 'visible' } : { height: '100vh', overflowY: 'auto', overflowX: 'hidden', WebkitOverflowScrolling: 'touch' }),
      }}
    >
      <Container sx={{ position: 'relative', py: embedded ? { xs: 2, md: 3 } : { xs: 3, md: 5 }, minHeight: embedded ? 0 : '100%' }}>
      <Grid container justifyContent="center" spacing={embedded ? 2 : 4} pt={embedded ? 1 : 2} pb={embedded ? 4 : { xs: 8, sm: 6 }}>
        {/* Titre Compétences */}
        <Grid item xs={12} sx={{ textAlign: 'center', ...(embedded ? { mt: 4 } : {}) }}>
          <Stack spacing={1} alignItems="center">
            <Typography
              component="h1"
              sx={{
                fontSize: { xs: 24, sm: 28 },
                fontWeight: 600,
                letterSpacing: '0.02em',
                color: 'var(--text)',
                mb: 0.5,
              }}
            >
              {t('sections.skills.title')}
            </Typography>
          </Stack>
        </Grid>

        {/* Mode intégré : onglets de catégories */}
        {embedded && (
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
            {itemData.map((item, index) => {
              const isSelected = index === selectedId - 1;
              return (
                <Button
                  key={index}
                  onClick={() => setSelectedId(index + 1)}
                  variant="text"
                  size="small"
                  sx={{
                    borderRadius: 0,
                    textTransform: 'none',
                    fontWeight: isSelected ? 600 : 500,
                    fontSize: '0.85rem',
                    px: 2,
                    py: 1.25,
                    color: isSelected ? 'var(--text)' : 'var(--accents6)',
                    borderBottom: isSelected ? '2px solid var(--primary)' : '2px solid transparent',
                    minHeight: 0,
                    '&:hover': {
                      color: 'var(--text)',
                      bgcolor: 'transparent',
                      borderBottomColor: isSelected ? 'var(--primary)' : 'var(--accents4)',
                    },
                  }}
                >
                  {t(item.title)}
                </Button>
              );
            })}
          </Grid>
        )}

        {/* Carousel 3D — uniquement quand pas embedded */}
        {!embedded && (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: -6 }}>
          <Box
            {...handlers}
            ref={carouselRef}
            sx={{
              position: 'relative',
              width: { xs: 320, sm: 420 },
              height: { xs: 280, sm: 340 },
              perspective: 1200,
              touchAction: 'pan-y',
            }}
          >
            {/* Boutons prev/next */}
            <IconButton
              onClick={goPrev}
              sx={{
                position: 'absolute',
                left: { xs: -8, sm: -20 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                color: 'var(--primary)',
                border: '2px solid',
                borderColor: 'var(--primary)',
                bgcolor: 'var(--accents1)',
                '&:hover': {
                  bgcolor: 'var(--primary-opacity)',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.35)',
                },
              }}
              size="large"
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              onClick={goNext}
              sx={{
                position: 'absolute',
                right: { xs: -8, sm: -20 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 20,
                color: 'var(--primary)',
                border: '2px solid',
                borderColor: 'var(--primary)',
                bgcolor: 'var(--accents1)',
                '&:hover': {
                  bgcolor: 'var(--primary-opacity)',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.35)',
                },
              }}
              size="large"
            >
              <ChevronRightIcon />
            </IconButton>

            {/* Scène 3D */}
            <Box
              sx={{
                width: '100%',
                height: '100%',
                perspective: 1200,
                transformStyle: 'preserve-3d',
              }}
            >
              <motion.div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'relative',
                  transformStyle: 'preserve-3d',
                }}
                animate={{
                  rotateY: angle,
                  z: -RADIUS,
                }}
                transition={springSlow}
              >
                {itemData.map((item, index) => {
                  const cellAngle = THETA * index;
                  const isSelected = index === selectedId - 1;
                  return (
                    <motion.div
                      key={index}
                      onClick={() => setSelectedId(index + 1)}
                      style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        width: ITEM_WIDTH,
                        height: ITEM_WIDTH * 0.85,
                        marginLeft: -ITEM_WIDTH / 2,
                        marginTop: -(ITEM_WIDTH * 0.85) / 2,
                        transformStyle: 'preserve-3d',
                        transform: `rotateY(${cellAngle}deg) translateZ(${RADIUS}px)`,
                        cursor: 'pointer',
                        backfaceVisibility: 'hidden',
                      }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                      transition={springSlow}
                    >
                      <motion.div
                        style={{
                          width: '100%',
                          height: '100%',
                          borderRadius: 16,
                          overflow: 'hidden',
                          position: 'relative',
                          border: `2px solid ${isSelected ? 'var(--primary)' : 'var(--accents3)'}`,
                          boxShadow: isSelected
                            ? '0 0 30px rgba(255, 215, 0, 0.4), 0 8px 32px rgba(0,0,0,0.4)'
                            : '0 8px 24px rgba(0,0,0,0.35)',
                          transform: isSelected ? 'scale(1.08)' : 'scale(1)',
                          opacity: isSelected ? 1 : 0.82,
                        }}
                        transition={springSlow}
                      >
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            position: 'relative',
                            bgcolor: 'var(--accents1)',
                          }}
                        >
                          <Image
                            src={item.img}
                            alt={t(item.title)}
                            fill
                            sizes="200px"
                            style={{ objectFit: 'cover', opacity: 0.9 }}
                          />
                          <Box
                            sx={{
                              position: 'absolute',
                              inset: 0,
                              background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, transparent 50%)',
                              display: 'flex',
                              alignItems: 'flex-end',
                              justifyContent: 'center',
                              pb: 1.5,
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              fontWeight={700}
                              sx={{
                                color: 'var(--text)',
                                textShadow: '0 1px 4px rgba(0,0,0,0.8)',
                                textAlign: 'center',
                                px: 1,
                              }}
                            >
                              {t(item.title)}
                            </Typography>
                          </Box>
                          {isSelected && (
                            <Box
                              sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                                width: 10,
                                height: 10,
                                borderRadius: '50%',
                                bgcolor: 'var(--primary)',
                                boxShadow: '0 0 12px var(--primary)',
                              }}
                            />
                          )}
                        </Box>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </Box>
          </Box>
        </Grid>
        )}

        {/* Indicateurs (dots) — uniquement quand pas embedded */}
        {!embedded && (
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', gap: 0.5 }}>
          {itemData.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setSelectedId(index + 1)}
              style={{
                width: index === selectedId - 1 ? 24 : 10,
                height: 10,
                borderRadius: 5,
                border: 'none',
                background: index === selectedId - 1 ? 'var(--primary)' : 'var(--accents4)',
                cursor: 'pointer',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              transition={springSlow}
            />
          ))}
        </Grid>
        )}

        {/* Cartes de compétences — affichées quand on clique sur une catégorie */}
        <Grid item xs={12} sx={{ ...(embedded ? { mt: -0.5 } : {}) }}>
          <Stack alignItems="center" spacing={2}>
            {/* Liens sites Dandela Academy & PlayPad — uniquement sur la rubrique Web */}
            {currentItem?.title === 'sections.skills.web.title' && (
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mt: '10px', p: '14px' }}>
                <Link href={LINK_DANDELA_ACADEMY} passHref legacyBehavior>
                  <Box
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Dandela Academy"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      border: '1px solid var(--accents3)',
                      borderRadius: 2,
                      overflow: 'hidden',
                      padding: 0.5,
                      bgcolor: 'var(--background-card)',
                      '&:hover': { borderColor: 'var(--accents5)' },
                    }}
                  >
                    <Image src={DANDELA_ACADEMY_LOGO_URL} alt="Dandela Academy" width={40} height={40} style={{ objectFit: 'contain' }} />
                  </Box>
                </Link>
                <Link href={LINK_PLAYPAD_WEB} passHref legacyBehavior>
                  <Box
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="PlayPad"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      border: '1px solid var(--accents3)',
                      borderRadius: 2,
                      overflow: 'hidden',
                      padding: 0.5,
                      bgcolor: 'var(--background-card)',
                      '&:hover': { borderColor: 'var(--accents5)' },
                    }}
                  >
                    <Image src={PLAYPAD_IMAGE_PATH} alt="PlayPad" width={40} height={40} style={{ objectFit: 'contain' }} />
                  </Box>
                </Link>
              </Stack>
            )}
            {/* Lien Winno Bearz Club — uniquement sur la rubrique Blockchain */}
            {currentItem?.title === 'sections.skills.blockchain.title' && (
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mt: '10px', p: '14px' }}>
                <Link href={LINK_WINNO} passHref legacyBehavior>
                  <Box
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Winno Bearz Club"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      border: '1px solid var(--accents3)',
                      borderRadius: 2,
                      overflow: 'hidden',
                      padding: 0.5,
                      bgcolor: 'var(--background-card)',
                      '&:hover': { borderColor: 'var(--accents5)' },
                    }}
                  >
                    <Image src={WINNO_IMAGE_PATH} alt="Winno Bearz Club" width={40} height={40} style={{ objectFit: 'contain' }} />
                  </Box>
                </Link>
              </Stack>
            )}
            {/* Lien Drill Dev — uniquement sur la rubrique IA */}
            {currentItem?.title === 'sections.skills.artificial.title' && (
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mt: '10px', p: '14px' }}>
                <Link href={LINK_DRILL_DEV} passHref legacyBehavior>
                  <Box
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Drill Dev"
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: 48,
                      height: 48,
                      border: '1px solid var(--accents3)',
                      borderRadius: 2,
                      overflow: 'hidden',
                      padding: 0.5,
                      bgcolor: 'var(--background-card)',
                      '&:hover': { borderColor: 'var(--accents5)' },
                    }}
                  >
                    <Image src={DRILL_DEV_IMAGE_PATH} alt="Drill Dev" width={40} height={40} style={{ objectFit: 'contain' }} />
                  </Box>
                </Link>
              </Stack>
            )}
            {/* Liens App Store & Google Play (PlayPad) — uniquement sur la rubrique Mobile */}
            {currentItem?.title === 'sections.skills.mobile.title' && (
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2} sx={{ mt: '10px', p: '14px' }}>
                <Link href={linkAppStore} passHref legacyBehavior>
                  <IconButton
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="App Store (app iOS)"
                    size="small"
                    sx={{
                      color: 'var(--text)',
                      border: '1px solid var(--accents3)',
                      padding: '10px',
                      '&:hover': { borderColor: 'var(--accents5)', bgcolor: 'var(--accents2)' },
                    }}
                  >
                    <IosIcon size={24} />
                  </IconButton>
                </Link>
                <Link href={LINK_GOOGLE_PLAY_PLAYPAD} passHref legacyBehavior>
                  <IconButton
                    component="a"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Google Play (PlayPad)"
                    size="small"
                    sx={{
                      color: 'var(--text)',
                      border: '1px solid var(--accents3)',
                      padding: '10px',
                      '&:hover': { borderColor: 'var(--accents5)', bgcolor: 'var(--accents2)' },
                    }}
                  >
                    <PlayStoreIcon size={24} />
                  </IconButton>
                </Link>
              </Stack>
            )}
            <Grid container spacing={2} justifyContent="center" px={{ xs: 1, md: 4 }}>
              <AnimatePresence mode="wait">
                {currentItem?.skills && (
                  <motion.div
                    key={selectedId}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'contents' }}
                  >
                    {currentItem.skills.map((skill, idx) => {
                      const [name, descriptionKey, icon] = skill;
                      const cardLink = typeof skill[3] === 'string' ? skill[3] : null;
                      const cardContent = (
                        <Card
                          component={cardLink ? 'a' : 'div'}
                          href={cardLink || undefined}
                          target={cardLink ? '_blank' : undefined}
                          rel={cardLink ? 'noopener noreferrer' : undefined}
                          sx={{
                            py: 2,
                            px: 1.5,
                            height: '100%',
                            minHeight: 220,
                            border: '1px solid var(--accents3)',
                            borderRadius: 1,
                            bgcolor: 'var(--background-card)',
                            textAlign: 'center',
                            transition: 'border-color 0.2s ease',
                            textDecoration: 'none',
                            ...(cardLink ? { cursor: 'pointer', '&:hover': { borderColor: 'var(--accents5)' } } : { '&:hover': { borderColor: 'var(--accents5)' } }),
                          }}
                        >
                          <Stack alignItems="center" spacing={1.5} justifyContent="center" sx={{ height: '100%', minHeight: 180 }}>
                            <Stack alignItems="center" justifyContent="center" sx={{ minHeight: 48 }}>
                              {icon}
                            </Stack>
                            <Typography sx={{ fontWeight: 500, fontSize: '0.875rem', color: 'var(--text)' }}>{t(name)}</Typography>
                            <Typography variant="body2" sx={{ fontSize: '0.75rem', color: 'var(--accents6)', lineHeight: 1.4, px: 0.5 }}>
                              {t(descriptionKey)}
                            </Typography>
                          </Stack>
                        </Card>
                      );
                      return (
                        <Grid key={`${selectedId}-${idx}`} item xs={6} sm={4} md={3} lg={2}>
                          <motion.div
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            custom={idx}
                          >
                            {cardContent}
                          </motion.div>
                        </Grid>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </Grid>
          </Stack>
        </Grid>

        {/* Disclaimer */}
        <Grid item xs={12} sx={{ ...(embedded ? { mt: 1 } : {}) }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            style={{ textAlign: 'center' }}
          >
            <Typography
              variant="body2"
              sx={{
                color: 'var(--accents6)',
                fontStyle: 'italic',
                maxWidth: 720,
                mx: 'auto',
                px: 2,
              }}
            >
              {t('sections.skills.disclaimer')}
            </Typography>
          </motion.div>
        </Grid>

        {!embedded && (
        <Grid item xs={12}>
          <FooterComponent />
        </Grid>
        )}
      </Grid>
      </Container>
    </Box>
  );
}

// Ordre des rubriques : IA (1er), Mobile (2e), Web (3e), Blockchain (4e)
const itemData = [
  {
    img: '/img/skills/ai.gif',
    title: 'sections.skills.artificial.title',
    skills: [
      ['sections.skills.artificial.apiCalls', 'sections.skills.desc.apiCalls', <Stack direction="row" alignItems="center" justifyContent="center"><ApiCallsIcon size={32} /></Stack>],
      ['sections.skills.artificial.agents', 'sections.skills.desc.agents', <Stack direction="row" alignItems="center" justifyContent="center"><AgentsAiIcon size={32} /></Stack>],
      ['sections.skills.artificial.contentCreation', 'sections.skills.desc.contentCreation', <Stack direction="row" alignItems="center" justifyContent="center"><ContentCreationIcon size={32} /></Stack>],
      ['sections.skills.artificial.vibeCoding', 'sections.skills.desc.vibeCoding', <Stack direction="row" alignItems="center" justifyContent="center"><CursorIcon size={36} /></Stack>],
    ],
  },
  {
    img: '/img/skills/prog.gif',
    title: 'sections.skills.mobile.title',
    skills: [
      ['sections.skills.names.ios', 'sections.skills.desc.ios', <Stack direction="row" alignItems="center" justifyContent="center"><IosIcon size={36} /></Stack>],
      ['sections.skills.names.android', 'sections.skills.desc.android', <Stack direction="row" alignItems="center" justifyContent="center"><AndroidIcon size={40} /></Stack>],
      ['sections.skills.names.pwa', 'sections.skills.desc.pwa', <Stack direction="row" alignItems="center" justifyContent="center"><PwaIcon size={40} /></Stack>],
    ],
  },
  {
    img: '/img/skills/prog.gif',
    title: 'sections.skills.web.title',
    subtitle: 'sections.skills.mobile.title',
    skills: [
      ['sections.skills.names.javascript', 'sections.skills.desc.javascript', <Stack direction="row" alignItems="center" justifyContent="center" spacing={0.5}><JavascriptIcon size={28} /></Stack>],
      ['sections.skills.names.typescript', 'sections.skills.desc.typescript', <Stack direction="row" alignItems="center" justifyContent="center"><TypescriptIcon size={28} /></Stack>],
      ['sections.skills.names.reactjs', 'sections.skills.desc.reactjs', <Stack direction="row" alignItems="center" justifyContent="center"><ReactIcon size={32} /></Stack>],
      ['sections.skills.names.nextjs', 'sections.skills.desc.nextjs', <Stack direction="row" alignItems="center" justifyContent="center"><NextJsIcon size={32} /></Stack>],
    ],
  },
  {
    img: WINNO_IMAGE_PATH,
    title: 'sections.skills.blockchain.title',
    skills: [
      ['sections.skills.names.solidity', 'sections.skills.desc.solidity', <Stack direction="row" alignItems="center" justifyContent="center"><SolidityIcon size={24} /></Stack>],
      ['sections.skills.names.etherjs', 'sections.skills.desc.etherjs', <Stack direction="row" alignItems="center" justifyContent="center"><EtherJsIcon size={40} /></Stack>],
      ['sections.skills.names.web3js', 'sections.skills.desc.web3js', <Stack direction="row" alignItems="center" justifyContent="center"><Web3JsIcon size={40} /></Stack>],
      ['sections.skills.names.bitcoin', 'sections.skills.desc.bitcoin', <Stack direction="row" alignItems="center" justifyContent="center"><BitcoinIcon size={36} /></Stack>],
      ['sections.skills.names.ethereum', 'sections.skills.desc.ethereum', <Stack direction="row" alignItems="center" justifyContent="center"><EthereumIcon size={36} /></Stack>],
    ],
  },
];

// ——— Rubriques masquées (Librairies, BDD, Logiciels) — réintégrer dans itemData si besoin ———
// itemDataReserveFrameworks = {
//   img: '/img/skills/frameworks.jpg',
//   title: 'sections.skills.frameworks.title',
//   skills: [
//     ['NodeJS', 80, <NodeJsIcon size={28} />],
//     ['Material Ui', 90, <MaterialUiIcon color={blue[600]} size={28} />],
//     ['i18n', 100, <I18nIcon size={32} />],
//     ['MomentJS', 100, <MomentJsIcon size={28} />],
//     ['API ChatGPT', 70, <OpenAiIcon size={28} />],
//   ],
// };
// itemDataReserveDatabase = {
//   img: '/img/skills/database.jpg',
//   title: 'sections.skills.database.title',
//   skills: [
//     ['Firebase', 70, <Stack direction="row" alignItems="center" justifyContent="center"><FirebaseIcon size={24} /></Stack>],
//     ['MongoDB', 50, <Stack direction="row" alignItems="center" justifyContent="center"><MongoDbIcon size={24} /></Stack>],
//     ['MySQL', 65, <Stack direction="row" alignItems="center" justifyContent="center"><MySqlIcon size={32} /></Stack>],
//     ['SQLite', 75, <Stack direction="row" alignItems="center" justifyContent="center"><SqlLiteIcon size={32} /></Stack>],
//   ],
// };
// itemDataReserveSoftware = {
//   img: '/img/skills/software.gif',
//   title: 'sections.skills.software.title',
//   skills: [
//     ['Visual Studio Code', 100, <Stack direction="row" alignItems="center" justifyContent="center"><VisualStudioIcon size={32} /></Stack>],
//     ['Discord', 100, <Stack direction="row" alignItems="center" justifyContent="center"><DiscordApiIcon size={32} /></Stack>],
//     ['Android Studio', 85, <Stack direction="row" alignItems="center" justifyContent="center"><AndroidIcon size={40} /></Stack>],
//     ['Spyder', 60, <Stack direction="row" alignItems="center" justifyContent="center"><SpyderIcon size={40} /></Stack>],
//     ['Eclipse', 60, <Stack direction="row" alignItems="center" justifyContent="center"><EclipseIcon size={36} /></Stack>],
//     ['Photoshop', 75, <Stack direction="row" alignItems="center" justifyContent="center"><PhotoshopIcon size={36} /></Stack>],
//     ['Atom', 80, <Stack direction="row" alignItems="center" justifyContent="center"><AtomIcon size={40} /></Stack>],
//     ['NotePad ++', 100, <Stack direction="row" alignItems="center" justifyContent="center"><NotepadIcon size={40} /></Stack>],
//     ['Netbeans', 80, <Stack direction="row" alignItems="center" justifyContent="center"><NetbeansIcon size={40} /></Stack>],
//     ['Django', 80, <Stack direction="row" alignItems="center" justifyContent="center"><DjangoIcon size={36} /></Stack>],
//     ['Vim', 50, <Stack direction="row" alignItems="center" justifyContent="center"><VimIcon size={36} /></Stack>],
//   ],
// };

// ——— Compétences pour une future rubrique (ex. Langages / Backend / Mobile) ———
// skillsReserveLangages = [
//   ['Html', 95, <Stack direction="row" alignItems="center" justifyContent="center"><HtmlIcon size={28} /></Stack>],
//   ['Css', 85, <Stack direction="row" alignItems="center" justifyContent="center"><CssIcon size={28} /></Stack>],
//   ['Php', 80, <Stack direction="row" alignItems="center" justifyContent="center"><PhpIcon size={40} /></Stack>],
//   ['Python', 80, <Stack direction="row" alignItems="center" justifyContent="center"><PythonIcon size={36} /></Stack>],
//   ['Java', 80, <Stack direction="row" alignItems="center" justifyContent="center"><JavaIcon size={28} /></Stack>],
//   ['Android', 70, <Stack direction="row" alignItems="center" justifyContent="center"><AndroidIcon size={40} /></Stack>],
//   ['Ionic', 70, <Stack direction="row" alignItems="center" justifyContent="center"><IonicIcon size={40} /></Stack>],
// ];
