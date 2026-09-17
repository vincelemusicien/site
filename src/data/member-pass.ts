import { catalogueCourses } from './catalogue';

// Only genuine member course URLs belong here, never sales pages or checkout URLs.
// Populate with the permanent URLs copied from the Systeme.io student space.
export const memberCourseUrls: Record<string, string> = Object.fromEntries(Object.entries({
  etincelle: 'etincelle',
  'mixage-rapide': 'mixage-rapide',
  'comprendre-eq': 'comprendre-eq',
  'comprendre-compression': 'comprendre-compression/',
  'logic-pro-secrets': 'logicpro-astuces',
  'ecouter-comme-un-producer': 'ecouter-comme-un-producer',
  'methode-pmer': 'methode-pmer',
  'fondations-mao': 'fondationsmao',
  'musicien-productif': 'musicien-productif',
  lartdefinir: 'adf',
  'arrangements-mao': 'arrangement-mao',
}).map(([id, slug]) => [id, `https://productionmusicale.systeme.io/school/course/${slug}`]));
export const memberAccess = {
  courses: 'https://productionmusicale.systeme.io/login',
  school: 'https://la.pmschool.fr',
  schoolInvitation: 'https://la.pmschool.fr/invitation?code=JFC6FE',
};

export const memberUniverses = [
  { id: 'mix', title: 'Mixer mieux', hint: 'Clarté, équilibre, profondeur', icon: 'sliders', tone: 'mix', ids: ['mixage-rapide', 'comprendre-eq', 'comprendre-compression', 'mastering-maison', 'pluginmastery'] },
  { id: 'compose', title: 'Composer / arranger', hint: 'Des idées qui prennent forme', icon: 'layers', tone: 'create', ids: ['methode-pmer', 'arrangements-mao', 'melody-maker', 'defi-songwriting', 'etincelle', 'songwriting-mastery', 'orchestrer-en-mao', 'composer-fiction-radio'] },
  { id: 'finish', title: 'Finir ses morceaux', hint: 'Débloquer, décider, terminer', icon: 'play', tone: 'workflow', ids: ['finishline', 'lartdefinir', 'musicien-productif', 'arrangements-mao'] },
  { id: 'workflow', title: 'Produire plus vite', hint: 'Moins de friction dans ton DAW', icon: 'sliders', tone: 'logic', ids: ['workflow-efficace', 'musicien-productif', 'logic-pro-secrets', 'smart-controls-logic-pro'] },
  { id: 'voice', title: 'Améliorer ses voix', hint: 'Mieux entendre les traitements', icon: 'people', tone: 'release', ids: ['comprendre-eq', 'comprendre-compression', 'mixage-rapide', 'pluginmastery'], note: 'Des outils de mixage à appliquer à tes voix : EQ, compression et équilibre. Ces formations ne sont pas des cours dédiés aux voix.' },
  { id: 'listen', title: 'Écoute / vision de producer', hint: 'Écouter, choisir, donner une direction', icon: 'book', tone: 'produce', ids: ['ecouter-comme-un-producer', 'fondations-mao', 'pluginmastery', 'arrangements-mao', 'mastering-maison', 'orchestrer-en-mao', 'sound-design-avec-un-sample', 'synthese-sonore-facile', 'composer-fiction-radio'] },
];

export const memberCourses = catalogueCourses.filter(course => course.inPass).map(course => {
  const directUrl = memberCourseUrls[course.id];
  if (directUrl && (new URL(directUrl).protocol !== 'https:' || !new URL(directUrl).hostname.endsWith('.systeme.io'))) {
    throw new Error(`Lien membre Systeme.io invalide : ${course.id}`);
  }
  return { ...course, directUrl: directUrl || null, universes: memberUniverses.filter(universe => universe.ids.includes(course.id)).map(universe => universe.id) };
});

// Editorial selection, not an invented release date. Change IDs here to update it.
export const memberDiscovery = {
  title: 'À découvrir dans le Pass',
  description: 'Deux idées pour ta prochaine session.',
  ids: ['methode-pmer', 'mixage-rapide'],
};
