import journeyFr from '../public/locales/fr/journey.json';
import journeyEn from '../public/locales/en/journey.json';
import journeyPt from '../public/locales/pt/journey.json';
import { JOURNEY_LOCALES } from '@/_mocks_/_journey_items_';

const BY_LOCALE = {
  fr: journeyFr,
  en: journeyEn,
  pt: journeyPt,
};

function resolveLocale(locale) {
  return JOURNEY_LOCALES.includes(locale) ? locale : 'fr';
}

/** Textes d’étape lus depuis les JSON (évite le cache i18next en dev). */
export function getJourneyMilestoneFields(locale, milestoneId) {
  if (!milestoneId) return null;
  const lang = resolveLocale(locale);
  return BY_LOCALE[lang]?.milestones?.[milestoneId] ?? BY_LOCALE.fr?.milestones?.[milestoneId] ?? null;
}

/** Bloc profil parcours (HUD, en-tête). */
export function getJourneyProfile(locale) {
  const lang = resolveLocale(locale);
  return BY_LOCALE[lang]?.profile ?? BY_LOCALE.fr?.profile ?? {};
}

/** Libellés `journey.json` → ui.* (évite le cache i18next en dev). */
export function getJourneyUi(locale, key) {
  const lang = resolveLocale(locale);
  const ui = BY_LOCALE[lang]?.ui ?? BY_LOCALE.fr?.ui ?? {};
  return ui[key] ?? BY_LOCALE.fr?.ui?.[key] ?? '';
}
