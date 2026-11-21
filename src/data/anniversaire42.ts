export type BirthdayCategory = 'mix' | 'create' | 'produce' | 'logic' | 'workflow' | 'release';

export interface BirthdayCourse {
  title: string;
  category: BirthdayCategory;
  description: string;
  note?: string;
}

export const birthdayDeadline = '2026-11-22T10:40:00Z';
export const birthdayCheckout = 'https://productionmusicale.systeme.io/960b960c';
export const birthdayContact = 'vincent@lemusicien.fr';

export const birthdayCategories = [
  { id: 'all', label: 'Toutes' },
  { id: 'mix', label: 'Mixage & son' },
  { id: 'produce', label: 'Production' },
  { id: 'create', label: 'Créativité' },
  { id: 'logic', label: 'Logic Pro' },
  { id: 'workflow', label: 'Workflow' },
  { id: 'release', label: 'Artiste indépendant' },
] as const;

// Une formation complète par commande. Ni packs, ni abonnements, ni coaching.
export const birthdayCourses: BirthdayCourse[] = [
  { title: 'Mixage Rapide', category: 'mix', description: 'Une méthode claire pour mixer mieux et plus vite en home studio.' },
  { title: "Comprendre l'EQ", category: 'mix', description: 'Apprends à utiliser l’égalisation pour obtenir des mixages plus lisibles.' },
  { title: 'Comprendre la Compression', category: 'mix', description: 'Domine les dynamiques sans écraser la vie de tes morceaux.' },
  { title: 'Mastering Maison', category: 'mix', description: 'Finalise tes morceaux avec les outils de ton propre studio.' },
  { title: 'Plugin Mastery', category: 'mix', description: 'Comprends le rôle des EQ, compresseurs, reverbs, saturations et autres effets.' },
  { title: 'Philo du Mix', category: 'mix', description: 'Développe les bons réflexes et une meilleure vision du mixage.' },
  { title: 'Prêt à Mixer', category: 'mix', description: 'L’editing audio pour préparer des pistes propres avant le mixage.' },
  { title: 'Mix en Session', category: 'mix', description: 'Apprends à prendre de bonnes décisions de mixage à partir d’une vraie session.' },
  { title: 'La méthode PMER', category: 'produce', description: 'Produis des titres complets et avance même sans inspiration.' },
  { title: 'Arrangements MAO', category: 'produce', description: 'Transforme une boucle prometteuse en morceau structuré.' },
  { title: 'Écouter comme un Producer', category: 'produce', description: 'Aiguise ton écoute, ton analyse et ta vision de producteur.' },
  { title: 'Fondations MAO', category: 'produce', description: 'Les bases et le bon état d’esprit pour progresser sans t’éparpiller.' },
  { title: 'Synthèse sonore facile', category: 'produce', description: 'Comprends les synthétiseurs et commence à créer tes propres sons.' },
  { title: 'Étincelle', category: 'create', description: 'Retrouve des idées et l’envie de créer quand l’inspiration te lâche.' },
  { title: 'Melody Maker', category: 'create', description: 'Imagine, développe et améliore des mélodies qui restent en tête.' },
  { title: 'Le défi Songwriting', category: 'create', description: '30 jours de contraintes pour écrire 15 chansons.' },
  { title: 'Songwriting Mastery', category: 'create', description: 'Affirme ton identité d’auteur-compositeur et écris avec plus de régularité.' },
  { title: 'Finish Line', category: 'create', description: 'Une méthode pour arrêter d’abandonner tes morceaux en cours de route.' },
  { title: "L'art de finir", category: 'create', description: 'Déjoue le perfectionnisme et ose enfin terminer tes créations.' },
  { title: 'Logic Pro Secrets', category: 'logic', description: 'Des centaines d’astuces et de raccourcis pour dominer Logic Pro.' },
  { title: 'Smart Tools Logic', category: 'logic', description: 'Exploite les outils intelligents de Logic Pro dans ton workflow.' },
  { title: 'Logic Pro pour iPad, le guide vidéo', category: 'logic', description: 'Prends tes marques dans la version iPad de Logic Pro.' },
  { title: 'Logic Pro X : Le guide vidéo', category: 'logic', description: 'Un guide de l’ancienne génération de Logic Pro.', note: 'Formation ancienne, fournie en téléchargement' },
  { title: 'Musicien Productif', category: 'workflow', description: 'Organise ton temps et retrouve de vraies habitudes musicales.' },
  { title: 'Workflow Efficace', category: 'workflow', description: 'Travaille plus vite et plus sereinement dans ton DAW.' },
  { title: 'Réussir sa sortie digitale', category: 'release', description: 'Un plan en 7 étapes pour mieux préparer et promouvoir une sortie musicale.' },
  { title: 'Les 7 emails pour vendre sa musique', category: 'release', description: 'Sept messages à adapter pour mieux partager et vendre tes titres.' },
  { title: 'Les 7 piliers pour vendre sa musique', category: 'release', description: 'Les bases du marketing direct pour ton projet artistique.' },
];
