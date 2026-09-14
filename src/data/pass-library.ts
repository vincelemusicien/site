import { formations } from './formations';
import { passInteractiveCourses, passBonuses } from './pass-mao';

export const passCheckout = {
  monthly: import.meta.env.PUBLIC_PASS_CHECKOUT_MONTHLY || null,
  annual: import.meta.env.PUBLIC_PASS_CHECKOUT_ANNUAL || null,
};

export const libraryCategories = [
  { id: 'all', label: 'Tout explorer' },
  { id: 'mix', label: 'Mixage' },
  { id: 'create', label: 'Composition' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'produce', label: 'Production' },
  { id: 'logic', label: 'Logic Pro' },
  { id: 'release', label: 'Sortir sa musique' },
];

const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/gi, '').toLowerCase().replace('lamethode', '').replace('methode', '').replace('independants', 'indes');
const classify = (title: string, fallback = 'create') => {
  if (/Logic|Smart Controls/.test(title)) return 'logic';
  if (/Mixage|EQ|Compression|Mastering/.test(title)) return 'mix';
  if (/finir|Finish|Workflow|Productif/.test(title)) return 'workflow';
  if (/Plugin|Synthèse|Sound Design|orchestrer/.test(title)) return 'produce';
  if (/sortie|emails|Droit|Outils du web|Monétisation/.test(title)) return 'release';
  return fallback;
};

const libraryImageByCategory: Record<string, string> = {
  mix: '/images/pass/course-mix-library.png',
  create: '/images/pass/course-composition-library.png',
  workflow: '/images/pass/course-workflow-library.png',
  produce: '/images/pass/course-production-library.png',
  logic: '/images/pass/course-workflow-library.png',
  release: '/images/pass/course-release-library.png',
};

export interface LibraryCourse {
  id: string;
  title: string;
  category: string;
  description: string;
  promise: string;
  format: string | null;
  image: string | null;
  benefits: string[];
  value: string | null;
}

const primary: LibraryCourse[] = passInteractiveCourses.map((course) => ({
  id: normalize(course.title), title: course.title, category: classify(course.title),
  description: course.description, promise: course.promise, format: course.format,
  image: course.image, benefits: course.benefits, value: course.value,
}));
const existing = new Set(primary.map((course) => course.id));
const additional: LibraryCourse[] = formations.filter((course) => course.includedInPass === true && !existing.has(normalize(course.title))).map((course) => {
  const category = classify(course.title, course.category === 'produce' ? 'produce' : 'create');
  const specificImage = course.slug === 'comprendre-eq'
    ? '/images/pass/course-eq.png'
    : course.slug === 'smart-controls-logic-pro'
      ? '/images/pass/smart-tools-logic.webp'
      : null;
  return {
    id: normalize(course.title), title: course.title, category,
    description: passBonuses.find((bonus) => normalize(bonus.title) === normalize(course.title))?.text || course.description,
    promise: course.description, format: course.duration,
    image: specificImage || libraryImageByCategory[category],
    benefits: [], value: null,
  };
});
const order = ['Mixage Rapide', 'La méthode PMER™', 'La Méthode Finish Line', 'Logic Pro Secrets', 'Mastering Maison', 'Étincelle', 'Plugin Mastery', 'Arrangements MAO'];
export const libraryCourses = [...primary, ...additional].sort((a, b) => {
  const indexA = order.indexOf(a.title), indexB = order.indexOf(b.title);
  return (indexA < 0 ? 100 : indexA) - (indexB < 0 ? 100 : indexB);
});

export const passQuestions = [
  { question: 'Est-ce que je dois tout regarder ?', answer: 'Surtout pas. Pars de ce qui bloque dans ton morceau, choisis une formation et applique ce qui t’aide. La bibliothèque reste sous la main pendant ton abonnement. Tu n’as rien à rattraper.' },
  { question: 'Est-ce adapté à mon niveau et à mon logiciel ?', answer: 'Tu peux poser les bases ou approfondir un point précis selon ton expérience. Les méthodes de composition, de mixage et de workflow s’appliquent à ton home studio. Seules les formations dédiées à Logic Pro nécessitent ce logiciel.' },
  { question: 'Puis-je arrêter mon abonnement mensuel ?', answer: 'Oui, le mensuel est sans engagement. L’accès aux contenus du Pass est lié à ton abonnement actif. Ton tarif de lancement est conservé tant que ton abonnement reste actif.' },
  { question: 'Les prochaines formations sont-elles incluses ?', answer: 'La bibliothèque sera enrichie régulièrement en formations et ressources MAO. Certaines offres premium ou certains accompagnements peuvent rester séparés.' },
  { question: 'Est-ce que le Pass inclut un accompagnement sur mon projet ?', answer: 'Oui, sous une forme collective : la PM School incluse te permet de partager, d’échanger avec d’autres musiciens et de participer au live mensuel de retours avec Vince. Si tu as besoin d’un travail individuel ou d’un retour approfondi sur un projet précis, cet accompagnement peut être proposé séparément.' },
  { question: 'Et mes formations déjà achetées ?', answer: 'Elles restent accessibles selon les conditions de ton achat initial. Le Pass est un accès par abonnement au catalogue et à la PM School. Déjà membre de la School ? Contacte-moi dans la communauté pour l’offre fidélité.' },
];
