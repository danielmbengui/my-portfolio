/* --------------- PARCOURS 3D (page test-tree-js) -------------- */
/* Les textes (titres, descriptions, lieux, libellés) sont dans public/locales/<lang>/journey.json */

export const _NAMESPACE_LANGAGE_JOURNEY_ = 'journey';
export const JOURNEY_LOCALES = ['fr', 'en', 'pt'];
export const JOURNEY_DEFAULT_LOCALE = 'fr';
export const JOURNEY_LANG_STORAGE_KEY = 'journey-lang';
export const JOURNEY_VIEW_STORAGE_KEY = 'journey-view-mode';
/** Intro présentation déjà vue (backdrop index). */
export const JOURNEY_INTRO_SEEN_STORAGE_KEY = 'journey-intro-seen';
export const JOURNEY_DEFAULT_VIEW = '3d';

/** Routes qui partagent la langue parcours (localStorage journey-lang). */
export const JOURNEY_PAGE_PATHS = ['/', '/test-tree-js'];

/** Nombre total de points sur la carte. Les étapes non renseignées deviennent des points "à compléter". */
export const JOURNEY_TOTAL_STOPS = 30;

/** Jalons du début du parcours (1991…) placés consécutivement — augmenter à chaque nouvelle étape ajoutée. */
export const JOURNEY_PACK_HEAD_COUNT = 26;

export const JOURNEY_PROFILE = {
  photo: '/me-color.png',
};

/** Couleurs du drapeau angolais. */
export const ANGOLA_COLORS = {
  red: '#cc092f',
  redBright: '#ff1f3d',
  black: '#000000',
  gold: '#ffcb00',
};

export const JOURNEY_REGIONS = {
  angola: { id: 'angola', color: ANGOLA_COLORS.gold, x: -11 },
  suisse: { id: 'suisse', color: ANGOLA_COLORS.redBright, x: 11 },
};

/** Les époques passent du rouge au jaune de l'Angola au fil du temps. */
export const JOURNEY_ERAS = {
  origines: { id: 'origines', color: '#ff1f3d' },
  enfance: { id: 'enfance', color: '#ff4528' },
  formation: { id: 'formation', color: '#ff6d14' },
  retour: { id: 'retour', color: '#ff9500' },
  reconversion: { id: 'reconversion', color: '#ffb700' },
  entrepreneur: { id: 'entrepreneur', color: '#ffd84a' },
};

export const JOURNEY_LANGUAGES = [
  { id: 'french', flag: 'fr' },
  { id: 'lingala', flag: 'ao' },
  { id: 'english', flag: 'en' },
  { id: 'portuguese', flag: 'pt' },
  { id: 'italian', flag: 'it' },
];

export const JOURNEY_SKILLS = [
  { id: 'business' },
  { id: 'writing' },
  { id: 'java', label: 'Java' },
  { id: 'sql', label: 'SQL / MySQL' },
  { id: 'android', label: 'Android' },
  { id: 'python', label: 'Python' },
  { id: 'scrum', label: 'Scrum' },
  { id: 'javascript', label: 'JavaScript' },
  { id: 'css', label: 'HTML / CSS' },
  { id: 'c', label: 'C' },
  { id: 'git', label: 'Git / GitHub' },
  { id: 'solidity', label: 'Solidity' },
  { id: 'web3', label: 'Web3 / Ethers' },
  { id: 'ai' },
  { id: 'nextjs', label: 'Next.js' },
  { id: 'react', label: 'React' },
  { id: 'flutter', label: 'Flutter' },
  { id: 'firebase', label: 'Firebase' },
  { id: 'pwa', label: 'PWA' },
  { id: 'mui', label: 'Material UI' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'cursor' },
  { id: 'grok' },
  { id: 'grokBot' },
  { id: 'claudeCode', label: 'Claude Code' },
  { id: 'xcode', label: 'Xcode' },
];

/**
 * Étapes clés, dans l'ordre chronologique. Elles sont réparties sur les JOURNEY_TOTAL_STOPS points.
 * `year: null` affiche "????", `today: true` affiche "Aujourd'hui" traduit.
 * Titre, description et lieu : clés `milestones.<id>` dans journey.json.
 */
export const JOURNEY_MILESTONES = [
  { id: 'birth', era: 'origines', region: 'angola', year: '1989', image: '/img/portfolio/step-1-birth.jpeg', languages: ['lingala', 'portuguese'] },
  { id: 'immigration', era: 'origines', region: 'suisse', year: '1991', image: '/img/portfolio/step-2-italy.jpeg', languages: ['italian'] },
  { id: 'asylum', era: 'origines', region: 'suisse', year: '1991', image: '/img/portfolio/step-3-switzerland.jpeg', languages: ['french'] },
  { id: 'asylumDenied', era: 'origines', region: 'suisse', year: '1991', image: '/img/portfolio/step-4-switzerland-denied.jpeg' },
  { id: 'returnAngola1991', era: 'origines', region: 'angola', year: '1991', image: '/img/portfolio/step-5-back-angola.jpeg' },
  { id: 'fatherSoloSwitzerland', era: 'origines', region: 'suisse', year: '1992', image: '/img/portfolio/step-6-papa-swiss.jpeg' },
  { id: 'fatherReturnAngola1992', era: 'origines', region: 'angola', year: '1992', image: '/img/portfolio/step-7-papa-back.jpeg' },
  { id: 'retrySwitzerland1992', era: 'origines', region: 'suisse', year: '1992', image: '/img/portfolio/step-8-swiss-retry.jpeg' },
  { id: 'flightToSwitzerland1992', era: 'origines', region: 'suisse', year: '1992', image: '/img/portfolio/step-9-flight-swiss.jpeg' },
  { id: 'asylumAccepted1992', era: 'origines', region: 'suisse', year: '1992', image: '/img/portfolio/step-10-swiss-accept.jpeg' },
  { id: 'foyerAccueil1992', era: 'origines', region: 'suisse', year: '1992', image: '/img/portfolio/step-11-foyer-swiss.jpeg' },
  { id: 'fatherJoinsFoyer1993', era: 'origines', region: 'suisse', year: '1993', image: '/img/portfolio/step-12-papa-come.jpeg' },
  { id: 'apartmentGeneva1993', era: 'origines', region: 'suisse', year: '1993', image: '/img/portfolio/step-13-new-appartment.jpeg' },
  { id: 'parentsWorkingStable', era: 'origines', region: 'suisse', year: '1993', image: '/img/portfolio/step-14-parents-work.jpeg' },
  { id: 'schoolEntry1993', era: 'origines', region: 'suisse', year: '1993', image: '/img/portfolio/step-15-start-school.jpeg' },
  { id: 'peacefulLifeGeneva', era: 'origines', region: 'suisse', year: '1996', image: '/img/portfolio/step-16-happy-family.jpeg' },
  { id: 'avanchets1996', era: 'origines', region: 'suisse', year: '1996', image: '/img/portfolio/step-17-avanchets.jpeg' },
  { id: 'primarySchoolAvanchets1997', era: 'origines', region: 'suisse', year: '1997', image: '/img/portfolio/step-18-school-avanchets.jpeg' },
  { id: 'footballClubAvanchets', era: 'origines', region: 'suisse', year: '2001', image: '/img/portfolio/step-19-football.jpeg' },
  { id: 'coudriers2001', era: 'formation', region: 'suisse', year: '2001', image: '/img/portfolio/step-20-coudriers.jpeg' },
  { id: 'collegeRousseau2004', era: 'formation', region: 'suisse', year: '2004', image: '/img/portfolio/step-21-rousseau.jpeg' },
  { id: 'schneider', era: 'formation', region: 'suisse', year: '2008', image: '/img/portfolio/step-22-schneider.jpeg', skills: ['business'] },
  { id: 'jeunesseco', era: 'formation', region: 'suisse', year: '2009', image: '/img/portfolio/step-23-jeunesse-co.jpeg', skills: ['writing'] },
  { id: 'actu2010', era: 'formation', region: 'suisse', year: '2010', image: '/img/portfolio/step-24-first-party-jeunesse.jpeg' },
  { id: 'cfc', era: 'formation', region: 'suisse', year: '2011', image: '/img/portfolio/step-25-cfc.jpeg' },
  { id: 'itopie2013', era: 'formation', region: 'suisse', year: '2013', image: '/img/portfolio/step-26-itopie.jpeg' },
  { id: 'esig', era: 'formation', region: 'suisse', year: '2013', skills: ['java', 'sql'] },
  { id: 'esigImad', era: 'formation', region: 'suisse', year: '2015' },
  { id: 'backToAngola', era: 'retour', region: 'angola', year: '2016', languages: ['portuguese'] },
  { id: 'ifage', era: 'reconversion', region: 'suisse', year: '2018', skills: ['android'] },
  { id: 'pythonScrum', era: 'reconversion', region: 'suisse', year: '2019', skills: ['python', 'scrum'] },
  { id: 'javaSe11', era: 'reconversion', region: 'suisse', year: '2020' },
  { id: 'freecodecamp', era: 'reconversion', region: 'suisse', year: '2022', skills: ['javascript', 'css'] },
  { id: 'fortytwo', era: 'reconversion', region: 'suisse', year: '2022', skills: ['c', 'git'] },
  { id: 'winno', era: 'reconversion', region: 'suisse', year: '2022', skills: ['solidity', 'web3'] },
  { id: 'drilldev', era: 'reconversion', region: 'suisse', year: '2023', skills: ['ai', 'nextjs'] },
  { id: 'playpadIdea', era: 'entrepreneur', region: 'suisse', year: '2023', skills: ['react'] },
  { id: 'playpad', era: 'entrepreneur', region: 'suisse', year: '2024', skills: ['flutter', 'firebase'] },
  { id: 'dandela', era: 'entrepreneur', region: 'angola', year: '2024', skills: ['pwa', 'mui'] },
  { id: 'react', era: 'entrepreneur', region: 'suisse', year: '2025', skills: ['typescript'] },
  { id: 'dandelaOpening', era: 'entrepreneur', region: 'angola', year: '2026' },
  { id: 'today', era: 'entrepreneur', region: 'suisse', today: true, skills: ['cursor', 'grok', 'grokBot', 'claudeCode', 'xcode'] },
];

/** Répartit les étapes clés sur `total` points et remplit les trous avec des étapes à compléter. */
export function buildJourneyStops(total = JOURNEY_TOTAL_STOPS) {
  const milestones = JOURNEY_MILESTONES;
  const count = Math.max(total, milestones.length);
  const slots = new Map();
  const packHead = Math.min(JOURNEY_PACK_HEAD_COUNT, milestones.length);
  milestones.forEach((m, i) => {
    let index;
    if (milestones.length === 1) {
      index = 0;
    } else if (i < packHead) {
      index = i;
    } else {
      const tailAnchor = packHead - 1;
      const tailSpan = count - 1 - tailAnchor;
      const tailMilestones = milestones.length - packHead;
      index = Math.round(tailAnchor + ((i - packHead + 1) * tailSpan) / tailMilestones);
    }
    slots.set(index, m);
  });

  const stops = [];
  let previous = milestones[0];
  for (let index = 0; index < count; index++) {
    const milestone = slots.get(index);
    if (milestone) previous = milestone;
    stops.push({
      id: `stop-${index}`,
      index,
      milestoneId: milestone ? milestone.id : null,
      placeKey: previous.id,
      placeholder: !milestone,
      era: previous.era,
      region: previous.region,
      year: milestone ? milestone.year : undefined,
      today: Boolean(milestone?.today),
      video: milestone?.video || null,
      image: milestone?.image || null,
      skills: milestone?.skills || [],
      languages: milestone?.languages || [],
    });
  }
  return stops;
}
