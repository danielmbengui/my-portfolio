import journeyFr from '../public/locales/fr/journey.json';
import journeyEn from '../public/locales/en/journey.json';
import journeyPt from '../public/locales/pt/journey.json';
import commonFr from '../public/locales/fr/common.json';
import commonEn from '../public/locales/en/common.json';
import commonPt from '../public/locales/pt/common.json';
import { JOURNEY_LOCALES } from '@/_mocks_/_journey_items_';

const BY_LOCALE = {
  fr: journeyFr,
  en: journeyEn,
  pt: journeyPt,
};

const COMMON_BY_LOCALE = {
  fr: commonFr,
  en: commonEn,
  pt: commonPt,
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

/** Libellés compétences HUD (`skills.*` dans journey.json). */
export function getJourneySkillLabel(locale, skillId) {
  if (!skillId) return '';
  const lang = resolveLocale(locale);
  const skills = BY_LOCALE[lang]?.skills ?? BY_LOCALE.fr?.skills ?? {};
  return skills[skillId] ?? BY_LOCALE.fr?.skills?.[skillId] ?? skillId;
}

/** Projet HUD parcours (`sections.projects.*` dans common.json, évite le cache i18next en dev). */
export function getJourneyProjectFields(locale, projectId) {
  if (!projectId) return null;
  const lang = resolveLocale(locale);
  const block =
    COMMON_BY_LOCALE[lang]?.sections?.projects?.[projectId]
    ?? COMMON_BY_LOCALE.fr?.sections?.projects?.[projectId];
  return block && typeof block === 'object' ? block : null;
}

/** Libellé section projets (title, viewProject, …). */
export function getJourneyProjectsUi(locale, key) {
  const lang = resolveLocale(locale);
  const section = COMMON_BY_LOCALE[lang]?.sections?.projects ?? COMMON_BY_LOCALE.fr?.sections?.projects ?? {};
  return section[key] ?? COMMON_BY_LOCALE.fr?.sections?.projects?.[key] ?? '';
}

/** Libellés langues HUD (`languages.*` dans journey.json). */
export function getJourneyLanguageFields(locale, langId) {
  if (!langId) return null;
  const lang = resolveLocale(locale);
  const block = BY_LOCALE[lang]?.languages?.[langId] ?? BY_LOCALE.fr?.languages?.[langId];
  return block && typeof block === 'object' ? block : null;
}

/** Pied de page (`footer.*` dans common.json). */
export function getCommonFooter(locale, key) {
  const lang = resolveLocale(locale);
  const footer = COMMON_BY_LOCALE[lang]?.footer ?? COMMON_BY_LOCALE.fr?.footer ?? {};
  return footer[key] ?? COMMON_BY_LOCALE.fr?.footer?.[key] ?? '';
}
