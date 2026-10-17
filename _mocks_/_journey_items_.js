/* --------------- PARCOURS 3D (page test-tree-js) -------------- */
/* Les textes (titres, descriptions, lieux, libellés) sont dans public/locales/<lang>/journey.json */

export const _NAMESPACE_LANGAGE_JOURNEY_ = 'journey';
export const JOURNEY_LOCALES = ['fr', 'en', 'pt'];

/** Nombre total de points sur la carte. Les étapes non renseignées deviennent des points "à compléter". */
export const JOURNEY_TOTAL_STOPS = 30;

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
  { id: 'italian', flag: 'it' },
  { id: 'portuguese', flag: 'pt' },
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
];

/**
 * Étapes clés, dans l'ordre chronologique. Elles sont réparties sur les JOURNEY_TOTAL_STOPS points.
 * `year: null` affiche "????", `today: true` affiche "Aujourd'hui" traduit.
 * Titre, description et lieu : clés `milestones.<id>` dans journey.json.
 */
export const JOURNEY_MILESTONES = [
  { id: 'birth', era: 'origines', region: 'angola', year: '1989', image: '/img/portfolio/step-1-birth.jpeg' },
  { id: 'immigration', era: 'origines', region: 'suisse', year: null, languages: ['french', 'lingala'] },
  { id: 'childhood', era: 'enfance', region: 'suisse', year: null, languages: ['english', 'italian'] },
  { id: 'schneider', era: 'formation', region: 'suisse', year: '2008', skills: ['business'] },
  { id: 'jeunesseco', era: 'formation', region: 'suisse', year: '2009', skills: ['writing'] },
  { id: 'actu2010', era: 'formation', region: 'suisse', year: '2010' },
  { id: 'cfc', era: 'formation', region: 'suisse', year: '2011' },
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
  { id: 'today', era: 'entrepreneur', region: 'suisse', today: true, skills: ['cursor'] },
];

/** Répartit les étapes clés sur `total` points et remplit les trous avec des étapes à compléter. */
export function buildJourneyStops(total = JOURNEY_TOTAL_STOPS) {
  const milestones = JOURNEY_MILESTONES;
  const count = Math.max(total, milestones.length);
  const slots = new Map();
  milestones.forEach((m, i) => {
    const index = milestones.length === 1 ? 0 : Math.round((i * (count - 1)) / (milestones.length - 1));
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
