import { formations } from './formations';
import { libraryCourses } from './pass-library';
const key = (title: string) => title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/gi, '').toLowerCase().replace('lamethode', '').replace('methode', '');
export const catalogueCategories = [
  { id: 'all', label: 'Toutes' }, { id: 'mix', label: 'Mixage' }, { id: 'create', label: 'Composition' }, { id: 'creative', label: 'Créativité' }, { id: 'produce', label: 'Production' }, { id: 'workflow', label: 'Workflow' }, { id: 'logic', label: 'Logic Pro' }, { id: 'release', label: 'Sortie / artiste' },
];
const category = (title: string, fallback: string) => /Étincelle|Songwriting|Melody/.test(title) ? 'creative' : fallback;
const fromSource = formations.map((formation) => {
  const pass = libraryCourses.find((course) => key(course.title) === key(formation.title));
  const family = pass?.category || ({ create: 'create', produce: 'produce', sound: 'mix', progress: 'workflow' }[formation.category]);
  return {
    id: formation.slug, title: formation.title, category: category(formation.title, family), tone: family,
    promise: pass?.promise || formation.description, description: formation.description,
    duration: formation.duration || pass?.format, image: pass?.image || formation.image || '/images/pass/course-production-library.png',
    url: formation.url === '/pass-mao/' ? `/pass-mao/#cours-${pass?.id || ''}` : formation.url,
    cta: formation.url === '/pass-mao/' ? 'Découvrir dans le Pass' : formation.url.endsWith('/catalogue') ? 'Voir au catalogue' : 'Découvrir la formation',
    exclusive: formation.passExclusive, inPass: Boolean(pass),
  };
});
export const catalogueCourses = [...fromSource, ...libraryCourses.filter((course) => !formations.some((formation) => key(formation.title) === key(course.title))).map((course) => ({
  id: course.id, title: course.title, category: category(course.title, course.category), tone: course.category,
  promise: course.promise, description: course.description, duration: course.format, image: course.image,
  url: `/pass-mao/#cours-${course.id}`, cta: 'Découvrir dans le Pass', exclusive: false, inPass: true,
}))];
export const catalogueNeeds = [
  { title: 'Mon mix manque de clarté', hint: 'Équilibre, EQ et compression', ids: ['mixage-rapide', 'comprendre-eq', 'comprendre-compression'] },
  { title: 'Je reste coincé sur mes boucles', hint: 'Donner une forme à tes idées', ids: ['arrangements-mao'] },
  { title: 'Je ne termine pas mes morceaux', hint: 'Un cadre pour aller au bout', ids: ['finishline', 'lartdefinir', 'musicien-productif'] },
  { title: 'Je manque d’idées', hint: 'Relancer la composition', ids: ['methode-pmer', 'melody-maker', 'etincelle', 'defi-songwriting'] },
  { title: 'Je produis trop lentement', hint: 'Simplifier tes sessions', ids: ['workflow-efficace', 'logic-pro-secrets', 'smart-controls-logic-pro'] },
];
