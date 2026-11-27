import { formations } from './formations';
import { libraryCourses } from './pass-library';
import { courseVisual } from './course-visuals';
const key = (title: string) => title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/gi, '').toLowerCase().replace('lamethode', '').replace('methode', '');
export const catalogueCategories = [
  { id: 'all', label: 'Toutes' }, { id: 'mix', label: 'Mixage' }, { id: 'create', label: 'Composition' }, { id: 'creative', label: 'Créativité' }, { id: 'produce', label: 'Production' }, { id: 'workflow', label: 'Workflow' }, { id: 'logic', label: 'Logic Pro' }, { id: 'release', label: 'Sortie / artiste' },
];
const category = (title: string, fallback: string) => /Étincelle|Songwriting|Melody/.test(title) ? 'creative' : fallback;
// Destinations commerciales explicites. En l'absence de lien individuel, utiliser le Pass MAO.
export const catalogueDestinations: Record<string, string> = {
  "ecouter-comme-un-producer": "https://productionmusicale.systeme.io/ecup-bdc",
  "methode-pmer": "https://productionmusicale.systeme.io/pmer-pdv",
  "arrangements-mao": "https://formations.lemusicien.fr/arrangements-mao/",
  "melody-maker": "https://productionmusicale.systeme.io/melody-maker-bdc",
  "defi-songwriting": "https://productionmusicale.systeme.io/defi-songwriting-bdc",
  "etincelle": "https://formations.lemusicien.fr/etincelle/",
  "fondations-mao": "https://productionmusicale.systeme.io/fondations-mao",
  "mixage-rapide": "https://productionmusicale.systeme.io/mixage-rapide",
  "comprendre-eq": "https://productionmusicale.systeme.io/eq-pdv",
  "comprendre-compression": "https://productionmusicale.systeme.io/comprendre-comp",
  "mastering-maison": "https://productionmusicale.systeme.io/mastering-maison",
  "musicien-productif": "https://productionmusicale.systeme.io/musicien-productif",
  "workflow-efficace": "https://formations.lemusicien.fr/workflow-efficace/",
  "smart-controls-logic-pro": "https://productionmusicale.systeme.io/smart-tools-logic-bdc",
  "logic-pro-secrets": "https://productionmusicale.systeme.io/logic-pro-secrets",
  "pluginmastery": "https://productionmusicale.systeme.io/plugin-mastery-bdc",
  "finishline": "https://productionmusicale.systeme.io/finishline-bdc",
  "lartdefinir": "https://productionmusicale.systeme.io/l-art-de-finir",
  "reussirsasortiedigitale": "https://productionmusicale.systeme.io/reussir-sortie-digitale"
};
const passDestination = '/pass-mao/';
const destinationFor = (id: string) => catalogueDestinations[id] || passDestination;
const ctaFor = (id: string) => catalogueDestinations[id] ? 'Découvrir la formation' : 'Découvrir dans le Pass';
const fromSource = formations.map((formation) => {
  const pass = libraryCourses.find((course) => key(course.title) === key(formation.title));
  const family = pass?.category || ({ create: 'create', produce: 'produce', sound: 'mix', progress: 'workflow' }[formation.category]);
  return {
    id: formation.slug, title: formation.title, category: category(formation.title, family), tone: family,
    promise: pass?.promise || formation.description, description: formation.description,
    duration: formation.duration || pass?.format, image: courseVisual(formation.title) || pass?.image || formation.image,
    url: destinationFor(formation.slug),
    cta: ctaFor(formation.slug),
    exclusive: formation.passExclusive && !catalogueDestinations[formation.slug], inPass: Boolean(pass),
  };
});
export const catalogueCourses = [...fromSource, ...libraryCourses.filter((course) => !formations.some((formation) => key(formation.title) === key(course.title))).map((course) => ({
  id: course.id, title: course.title, category: category(course.title, course.category), tone: course.category,
  promise: course.promise, description: course.description, duration: course.format, image: course.image,
  url: destinationFor(course.id), cta: ctaFor(course.id), exclusive: false, inPass: true,
}))];
export const catalogueNeeds = [
  { title: 'Mon mix manque de clarté', hint: 'Équilibre, EQ et compression', ids: ['mixage-rapide', 'comprendre-eq', 'comprendre-compression'] },
  { title: 'Je reste coincé sur mes boucles', hint: 'Donner une forme à tes idées', ids: ['arrangements-mao'] },
  { title: 'Je ne termine pas mes morceaux', hint: 'Un cadre pour aller au bout', ids: ['finishline', 'lartdefinir', 'musicien-productif'] },
  { title: 'Je manque d’idées', hint: 'Relancer la composition', ids: ['methode-pmer', 'melody-maker', 'etincelle', 'defi-songwriting'] },
  { title: 'Je produis trop lentement', hint: 'Simplifier tes sessions', ids: ['workflow-efficace', 'logic-pro-secrets', 'smart-controls-logic-pro'] },
];
