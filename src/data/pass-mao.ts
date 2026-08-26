export const checkoutPlaceholder = '#checkout-a-configurer';

export const passPillars = [
  { label: 'Formations', text: 'Toute la bibliothèque pour créer, produire et faire sonner tes morceaux.' },
  { label: 'Parcours', text: 'Des portes d’entrée simples pour savoir quoi travailler maintenant.' },
  { label: 'Nouveautés', text: 'De nouvelles formations et ressources ajoutées régulièrement.' },
  { label: 'PM School', text: 'Un espace humain pour pratiquer, partager et obtenir du feedback.' },
];

export const passPaths = [
  {
    number: '01',
    title: 'Partir sur de bonnes bases',
    description: 'Le Parcours MAO pour débuter, reprendre les fondamentaux ou remettre ta progression dans un ordre logique.',
    courses: ['Parcours MAO'],
    accent: 'coral',
  },
  {
    number: '02',
    title: 'Créer, écrire et finir',
    description: 'Retrouve des idées, donne une forme à tes morceaux et apprends à aller jusqu’au bout.',
    courses: ['Étincelle', 'La méthode PMER', 'Melody Maker', 'Arrangements MAO', 'Finish Line', 'L’Art de finir'],
    accent: 'sand',
  },
  {
    number: '03',
    title: 'Faire sonner ses productions',
    description: 'Prends de meilleures décisions d’écoute, de mixage et de finalisation.',
    courses: ['Mixage Rapide', 'Comprendre l’EQ', 'Comprendre la Compression', 'Plugin Mastery', 'Mastering Maison'],
    accent: 'sage',
  },
  {
    number: '04',
    title: 'Maîtriser Logic Pro',
    description: 'Approfondis l’outil pour qu’il accompagne ta création au lieu de la ralentir.',
    courses: ['Logic Pro : le Guide vidéo', 'Logic Pro Secrets', 'Smart Tools Logic', 'Logic Pro pour iPad'],
    accent: 'slate',
  },
];

export const passInteractiveCourses = [
  {
    category: 'Logic Pro',
    format: '4h40 environ',
    title: 'Logic Pro Secrets',
    image: '/images/pass/logic-pro-training.webp',
    promise: 'Deviens beaucoup plus rapide dans Logic',
    description: 'Plus de 300 astuces, fonctions cachées et raccourcis pour mieux maîtriser Logic Pro et réduire le temps entre tes idées et leur réalisation.',
    benefits: [
      'Accélère ton workflow et arrête de chercher constamment dans les menus.',
      'Maîtrise les fonctions vraiment utiles pour créer, enregistrer, éditer et produire plus efficacement.',
    ],
    value: '97 €',
    accent: 'slate',
  },
  {
    category: 'Création',
    format: '1h30 environ',
    title: 'La méthode PMER™',
    image: '/images/pass/course-pmer.png',
    promise: 'Crée plus, même sans inspiration',
    description: 'Un processus simple pour arrêter de fixer la page blanche et construire rapidement l’armature de nouveaux morceaux dans ton DAW.',
    benefits: [
      'Trouve toujours un point de départ quand tu manques d’idées.',
      'Passe plus facilement de la boucle de 8 mesures à un véritable morceau.',
    ],
    value: '97 €',
    accent: 'coral',
  },
  {
    category: 'Mixage',
    format: '3h30 environ',
    title: 'Mixage Rapide',
    image: '/images/pass/course-eq.png',
    promise: 'Mixe mieux sans y passer tes journées',
    description: 'Une méthode claire et réaliste pour obtenir des mixages plus équilibrés, propres et impactants avec les outils de ton home studio.',
    benefits: [
      'Apprends à gérer niveaux, EQ, compression, espace et profondeur.',
      'Construis un workflow de mixage simple pour prendre de meilleures décisions et terminer tes morceaux.',
    ],
    value: '97 €',
    accent: 'sage',
  },
  {
    category: 'Finalisation',
    format: '3h30 environ',
    title: 'Mastering Maison',
    image: '/images/pass/course-mastering.png',
    promise: 'Donne la touche finale à tes morceaux',
    description: 'Comprends enfin cette mystérieuse dernière étape et apprends à finaliser toi-même tes morceaux directement dans ton home studio.',
    benefits: [
      'Construis une chaîne de mastering simple plutôt que d’appliquer des presets au hasard.',
      'Gagne en autonomie pour préparer tes titres à être diffusés sans plugins particuliers.',
    ],
    value: '97 €',
    accent: 'sand',
  },
  {
    category: 'Artiste indépendant',
    format: '2h environ',
    title: 'Réussir sa sortie digitale',
    image: '/images/home-studio-background.png',
    promise: 'Donne une vraie chance à ta prochaine sortie',
    description: 'Un plan d’action en 7 étapes pour préparer, lancer et continuer à promouvoir intelligemment ta musique après le jour J.',
    benefits: [
      'Organise ta distribution, tes smartlinks et la communication autour de ta sortie.',
      'Sache exactement quoi faire avant, pendant et après la mise en ligne de ton morceau.',
    ],
    value: '97 €',
    accent: 'plum',
  },
  {
    category: 'Production & mixage',
    format: '21 vidéos',
    title: 'Plugin Mastery',
    image: '/images/pass/plugin-mastery.png',
    promise: 'Comprends enfin ce que font tes plugins',
    description: 'EQ, compression, saturation, reverb, delay… comprends le rôle des grandes familles de plugins pour arrêter d’empiler des traitements sans vraiment savoir pourquoi.',
    benefits: [
      'Apprends à mieux entendre ce que chaque traitement change réellement dans ton son.',
      'Choisis tes plugins avec intention selon le problème ou le résultat recherché.',
    ],
    value: '97 €',
    accent: 'rose',
  },
  {
    category: 'Créativité',
    format: '4h environ',
    title: 'Étincelle',
    image: '/images/pass/etincelle.png',
    promise: 'Retrouve l’envie et les idées pour créer',
    description: 'Une méthode pour remettre ton processus créatif en mouvement quand tu ouvres ton DAW sans savoir quoi faire ou que toutes tes idées te semblent déjà mortes avant d’avoir commencé.',
    benefits: [
      'Utilise 9 gestes créatifs concrets pour provoquer de nouveaux points de départ.',
      'Sors du perfectionnisme, du trop-plein de choix et de la panne d’inspiration.',
    ],
    value: '97 €',
    accent: 'sand',
  },
  {
    category: 'Finis tes morceaux',
    format: 'Programme méthode',
    title: 'La Méthode Finish Line',
    image: '/images/pass/finishline.png',
    promise: 'De la page blanche à un morceau publié',
    description: 'Un système en 5 étapes basé sur les contraintes, les deadlines et moins de décisions pour arrêter d’accumuler les projets abandonnés.',
    benefits: [
      'Donne un cadre clair à tes sessions pour savoir exactement quoi faire ensuite.',
      'Passe de l’idée au morceau terminé et publié avec les outils que tu possèdes déjà.',
    ],
    value: '97 €',
    accent: 'coral',
  },
  {
    category: 'Mindset créatif',
    format: 'Expérience audio · 2h',
    title: 'L’Art de finir',
    image: '/images/pass/art-de-finir.png',
    promise: 'Arrête de laisser le perfectionnisme décider à ta place',
    description: 'Une expérience audio intime pour comprendre ce qui t’empêche réellement d’aller au bout de tes morceaux et changer durablement ta façon de créer.',
    benefits: [
      'Apprivoise le doute, la comparaison et le perfectionnisme qui paralysent tes projets.',
      'Installe une posture et des habitudes qui t’aident à terminer, partager et passer au morceau suivant.',
    ],
    value: '97 €',
    accent: 'slate',
  },
];

export const passBonuses = [
  { value: '97€', title: 'Le Défi Songwriting', text: 'Crée 15 nouvelles chansons dans les 30 prochains jours.' },
  { value: '47€', title: '7 emails pour vendre sa musique', text: 'Une séquence prête à adapter et envoyer à ses fans pour présenter et vendre sa musique.' },
  { value: '47€', title: 'Synthèse sonore facile', text: 'Comprendre ses synthétiseurs virtuels et commencer à créer et modifier ses propres sons.' },
  { value: '67€', title: 'Songwriting Mastery', text: 'Développer un vrai mindset de créateur et devenir un songwriter plus régulier et prolifique.' },
  { value: '67€', title: 'Comment composer une fiction radio', text: 'Avec Seb Quencez, compositeur professionnel de fictions primées chez France Culture. Démonstrations sur Ableton Live.' },
  { value: '67€', title: 'Comment orchestrer en MAO', text: 'Avec Fred Sieze, arrangeur professionnel et directeur d’école de musique. Démonstrations sur Ableton Live.' },
  { value: '67€', title: '100 % Sound Design avec un sample', text: 'Créer un morceau complet en utilisant un unique sample comme seule matière sonore. Démonstrations sur Ableton Live.' },
  { value: '97€', title: 'Masterclass Droit d’auteur', text: 'Décortiquer le droit d’auteur et le music business avec Gildas Lefeuvre, journaliste spécialiste de l’industrie musicale.' },
  { value: '97€', title: 'Masterclass Outils du web', text: 'Explorer les outils du web utiles au développement d’un projet musical avec Gildas Lefeuvre.' },
  { value: '97€', title: 'Masterclass Monétisation des indépendants', text: 'Explorer les différents modèles de revenus accessibles aux artistes indépendants avec Gildas Lefeuvre.' },
];

export const passOffers = [
  {
    key: 'monthly',
    eyebrow: 'Mensuel',
    price: '49€',
    suffix: '/mois',
    description: 'Accès complet au Pass, sans engagement, aussi longtemps que ton abonnement est actif.',
    cta: 'Choisir le mensuel',
    note: null,
  },
  {
    key: 'founder',
    eyebrow: 'Offre Fondateur',
    price: '299€',
    suffix: 'la première année',
    description: 'Une année complète de Pass pour avancer avec un cadre, des ressources et une communauté.',
    cta: 'Rejoindre avec l’offre Fondateur',
    note: 'Au lieu de 588€ en mensuel · renouvellement ensuite à 399€/an',
  },
  {
    key: 'lifetime',
    eyebrow: 'Pass à vie',
    price: '1 490€',
    suffix: 'une fois',
    description: 'Accès permanent au contenu du Pass et aux ressources qui enrichiront la bibliothèque.',
    cta: 'Choisir le Pass à vie',
    note: '5 places seulement',
  },
];

export const passFaq = [
  { question: 'Je suis débutant, est-ce adapté ?', answer: 'Oui, notamment grâce au Parcours MAO, pensé pour avancer dans un ordre logique.' },
  { question: 'Je suis déjà expérimenté ?', answer: 'Oui. Les parcours sont des recommandations : tu peux explorer librement toute la bibliothèque selon tes besoins.' },
  { question: 'Dois-je utiliser Logic Pro ?', answer: 'Non. Seules les formations consacrées spécifiquement à Logic nécessitent Logic Pro.' },
  { question: 'Puis-je annuler le mensuel ?', answer: 'Oui, le mensuel est sans engagement.' },
  { question: 'Que deviennent mes anciennes formations achetées séparément ?', answer: 'Elles restent à toi selon les conditions d’achat initiales.' },
  { question: 'Toutes les futures offres de Vince seront-elles incluses ?', answer: 'Non nécessairement. Le Pass sera enrichi régulièrement en formations et ressources MAO, mais certains accompagnements ou produits premium peuvent rester séparés.' },
  { question: 'La communauté est-elle obligatoire ?', answer: 'Non. Elle est là quand tu as envie de partager, de pratiquer ou d’obtenir un regard sur ton travail.' },
  { question: 'Je suis déjà membre de la PM School ?', answer: 'Une offre fidélité spécifique est prévue pour les membres actuels de la PM School.' },
];
