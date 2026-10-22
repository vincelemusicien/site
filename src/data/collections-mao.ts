export type CollectionAccent = 'create' | 'mix' | 'workflow' | 'logic';

export interface CollectionCourse {
  id: string;
  title: string;
  benefit: string;
}

export interface MaoCollection {
  id: CollectionAccent;
  number: string;
  title: string;
  hook: string;
  promise: string;
  image: string;
  imageAlt: string;
  separateValue: number;
  price: number;
  installmentCount: number;
  installmentPrice: number;
  installmentTotal: number;
  cta: string;
  courses: CollectionCourse[];
}

export const offerEndsAt = '2026-10-25T23:59:00+01:00';
export const offerEndsLabel = 'dimanche 25 octobre 2026 à 23h59, heure de Paris';

export const collections: MaoCollection[] = [
  {
    id: 'create',
    number: '01',
    title: 'Créer & finir',
    hook: 'De l’idée au morceau terminé.',
    promise: 'Débloque ta créativité, développe tes compositions et termine davantage de morceaux.',
    image: '/images/collections/creer-finir.webp',
    imageAlt: 'Collection Créer & Finir, quatre formations MAO autour de la composition et de la finalisation',
    separateValue: 388,
    price: 129,
    installmentCount: 2,
    installmentPrice: 69,
    installmentTotal: 138,
    cta: 'Je veux créer & finir',
    courses: [
      { id: 'etincelle', title: 'Étincelle', benefit: 'Retrouver l’inspiration et dépasser la page blanche.' },
      { id: 'methode-pmer', title: 'Méthode PMER', benefit: 'Créer rapidement des morceaux complets avec un processus reproductible.' },
      { id: 'arrangement-mao', title: 'Arrangement MAO', benefit: 'Transformer des boucles en vraies productions structurées.' },
      { id: 'finish-line', title: 'Finish Line', benefit: 'Créer avec des contraintes et une méthode orientée vers la finition.' },
    ],
  },
  {
    id: 'mix',
    number: '02',
    title: 'Mixer & finaliser',
    hook: 'Des morceaux qui sonnent mieux, du début à la fin.',
    promise: 'Apprends à écouter, préparer, mixer et finaliser efficacement tes productions.',
    image: '/images/collections/mixer-finaliser.webp',
    imageAlt: 'Collection Mixer & Finaliser, quatre formations MAO autour du mixage et du mastering',
    separateValue: 388,
    price: 129,
    installmentCount: 2,
    installmentPrice: 69,
    installmentTotal: 138,
    cta: 'Je veux mieux mixer',
    courses: [
      { id: 'ecouter-producer', title: 'Écouter comme un producer', benefit: 'Identifier ce qui fonctionne et ce qui manque dans une production.' },
      { id: 'pret-a-mixer', title: 'Prêt à mixer', benefit: 'Nettoyer, éditer et préparer les pistes.' },
      { id: 'mixage-rapide', title: 'Mixage Rapide', benefit: 'Appliquer une méthode efficace pour réussir ses mixages.' },
      { id: 'mastering-maison', title: 'Mastering Maison', benefit: 'Finaliser ses morceaux dans son home studio.' },
    ],
  },
  {
    id: 'workflow',
    number: '03',
    title: 'Producteur efficace',
    hook: 'Moins de dispersion, plus de musique.',
    promise: 'Organise ton travail, développe de bonnes habitudes et retrouve du temps pour créer.',
    image: '/images/collections/producteur-efficace.webp',
    imageAlt: 'Collection Producteur Efficace, quatre formations MAO autour du workflow et de la productivité',
    separateValue: 388,
    price: 129,
    installmentCount: 2,
    installmentPrice: 69,
    installmentTotal: 138,
    cta: 'Je veux gagner en efficacité',
    courses: [
      { id: 'fondations-mao', title: 'Fondations MAO', benefit: 'Les principes essentiels pour progresser sans se disperser.' },
      { id: 'musicien-productif', title: 'Musicien Productif', benefit: 'Définir des objectifs et organiser son projet musical.' },
      { id: 'workflow-efficace', title: 'Workflow Efficace', benefit: 'Optimiser sa façon de travailler dans son DAW.' },
      { id: 'art-de-finir', title: 'L’Art de Finir', benefit: 'Dépasser les blocages et terminer ses morceaux.' },
    ],
  },
  {
    id: 'logic',
    number: '04',
    title: 'Logic & sound design',
    hook: 'Maîtrise tes outils, façonne ton son.',
    promise: 'Explore Logic Pro, les plugins et la synthèse pour produire plus librement.',
    image: '/images/collections/logic-sound-design.webp',
    imageAlt: 'Collection Logic & Sound Design, quatre formations MAO autour de Logic Pro et de la création sonore',
    separateValue: 388,
    price: 129,
    installmentCount: 2,
    installmentPrice: 69,
    installmentTotal: 138,
    cta: 'Je veux maîtriser mes outils',
    courses: [
      { id: 'logic-pro-secrets', title: 'Logic Pro Secrets', benefit: 'Découvrir des astuces et techniques avancées de Logic Pro.' },
      { id: 'smart-tools-logic', title: 'Smart Tools Logic', benefit: 'Exploiter les Smart Controls et leurs possibilités.' },
      { id: 'plugin-mastery', title: 'Plugin Mastery', benefit: 'Comprendre les familles de plugins et leurs usages.' },
      { id: 'synthese-sonore', title: 'Synthèse Sonore Facile', benefit: 'Créer et personnaliser ses sons.' },
    ],
  },
];

export const checkoutLinks = {
  CHECKOUT_CREER_FINIR: import.meta.env.PUBLIC_CHECKOUT_CREER_FINIR || 'https://productionmusicale.systeme.io/collec-creer-finir-bdc',
  CHECKOUT_MIXER_FINALISER: import.meta.env.PUBLIC_CHECKOUT_MIXER_FINALISER || 'https://productionmusicale.systeme.io/collec-mix-finaliser-bdc',
  CHECKOUT_PRODUCTEUR_EFFICACE: import.meta.env.PUBLIC_CHECKOUT_PRODUCTEUR_EFFICACE || 'https://productionmusicale.systeme.io/collec-prod-efficace-bdc',
  CHECKOUT_LOGIC_SOUND_DESIGN: import.meta.env.PUBLIC_CHECKOUT_LOGIC_SOUND_DESIGN || 'https://productionmusicale.systeme.io/collec-logic-sounddesign-bdc',
  CHECKOUT_INTEGRALE: import.meta.env.PUBLIC_CHECKOUT_INTEGRALE || 'https://productionmusicale.systeme.io/collec-integrale-bdc',
} as const;

export const collectionCheckoutKey: Record<CollectionAccent, keyof typeof checkoutLinks> = {
  create: 'CHECKOUT_CREER_FINIR',
  mix: 'CHECKOUT_MIXER_FINALISER',
  workflow: 'CHECKOUT_PRODUCTEUR_EFFICACE',
  logic: 'CHECKOUT_LOGIC_SOUND_DESIGN',
};

export const integralPricing = {
  price: 349,
  separateCollectionsValue: 516,
  savings: 167,
  savingsPercent: 32,
} as const;

export const choiceGuide = [
  { problem: 'J’ai trop de morceaux inachevés', answer: 'Créer & Finir', href: '#collection-create' },
  { problem: 'Mes productions ne sonnent pas comme je voudrais', answer: 'Mixer & Finaliser', href: '#collection-mix' },
  { problem: 'Je manque de méthode et de temps', answer: 'Producteur Efficace', href: '#collection-workflow' },
  { problem: 'Je veux mieux maîtriser mes outils', answer: 'Logic & Sound Design', href: '#collection-logic' },
  { problem: 'Je veux tout travailler', answer: 'L’intégrale', href: '#integrale' },
];

export const faq = [
  {
    question: 'À qui s’adressent ces formations ?',
    answer: 'Aux musiciens et producteurs en home studio qui veulent une méthode claire pour composer, produire, mixer ou mieux utiliser leurs outils. Tu peux choisir une seule collection selon ton besoin actuel.',
  },
  {
    question: 'Puis-je regarder les cours à mon rythme ?',
    answer: 'Oui. Les parcours sont conçus pour avancer à ton rythme. La durée exacte d’accès devra être confirmée dans les conditions affichées sur chaque checkout avant l’ouverture des ventes.',
  },
  {
    question: 'Quels logiciels sont compatibles ?',
    answer: 'La majorité des méthodes s’appliquent à différents DAW. Logic Pro Secrets et Smart Tools Logic sont spécifiquement consacrés à Logic Pro.',
  },
  {
    question: 'Ai-je besoin de plugins payants ?',
    answer: 'Les méthodes partent des outils du home studio et n’encouragent pas l’achat de matériel inutile. Les éventuels prérequis propres à un cours devront être précisés sur son checkout.',
  },
  {
    question: 'Puis-je acheter une seule collection ?',
    answer: 'Oui. Chaque collection réunit quatre formations et coûte 129 € en un paiement, ou 2 × 69 € (138 € au total).',
  },
  {
    question: 'L’intégrale est-elle un abonnement ou un paiement en plusieurs fois ?',
    answer: 'Non. L’intégrale coûte 349 € en un seul paiement, sans abonnement ni paiement en plusieurs fois. Elle réunit les quatre collections, soit seize formations.',
  },
  {
    question: 'Je possède déjà une ou plusieurs formations. Que faire ?',
    answer: 'Écris à Vince avant d’acheter pour vérifier la solution adaptée à ta situation : vincent@lemusicien.fr.',
  },
  {
    question: 'Quand l’offre se termine-t-elle ?',
    answer: `L’offre se termine le ${offerEndsLabel}. Les paiements devront aussi être fermés côté Systeme.io à cette échéance.`,
  },
];

const courseIds = collections.flatMap((collection) => collection.courses.map((course) => course.id));
if (courseIds.length !== 16 || new Set(courseIds).size !== 16) {
  throw new Error('L’offre Collections MAO doit contenir exactement 16 formations uniques.');
}

if (collections.some((collection) => collection.installmentTotal !== collection.installmentCount * collection.installmentPrice)) {
  throw new Error('Le total du paiement en plusieurs fois doit correspondre au nombre d’échéances multiplié par leur montant.');
}

const separateCollectionsTotal = collections.reduce((total, collection) => total + collection.price, 0);
if (integralPricing.separateCollectionsValue !== separateCollectionsTotal || integralPricing.savings !== separateCollectionsTotal - integralPricing.price) {
  throw new Error('Les montants et l’économie de l’offre intégrale sont incohérents.');
}
