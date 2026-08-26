export const headerNavigation = [
  { label: 'Formations', href: '/formations/' },
  { label: 'Pass MAO', href: '/pass-mao/' },
  { label: 'PM School', href: 'https://pmschool.fr', external: true },
  { label: 'Tools', href: 'https://lemusicien-shop.fourthwall.com/', external: true },
  { label: 'YouTube', href: 'https://www.youtube.com/@vincelemusicien', external: true },
];

export const homeOptions = [
  {
    title: 'Formations',
    description: 'Des cours concrets pour apprendre à créer, produire, mixer et terminer tes morceaux.',
    cta: 'Découvrir les formations',
    href: '/formations/',
    accent: 'coral',
    icon: 'book',
  },
  {
    title: 'Pass MAO',
    description: 'Accède à toute mon école de production musicale avec un seul abonnement.',
    cta: 'Découvrir le Pass',
    href: '/pass-mao/',
    accent: 'sand',
    icon: 'layers',
  },
  {
    title: 'PM School',
    description: 'Une communauté pour pratiquer, relever des défis, partager tes morceaux et avancer régulièrement.',
    cta: 'Rejoindre la PM School',
    href: 'https://pmschool.fr',
    external: true,
    accent: 'sage',
    icon: 'people',
  },
  {
    title: 'YouTube',
    description: 'Mes vidéos sur la production musicale, la créativité et le home studio.',
    cta: 'Voir YouTube',
    href: 'https://www.youtube.com/@vincelemusicien',
    external: true,
    accent: 'rose',
    icon: 'play',
  },
  {
    title: 'Tools by Vince',
    description: 'Racks, templates, outils créatifs et ressources conçues pour faciliter la création musicale.',
    cta: 'Explorer les Tools',
    href: 'https://lemusicien-shop.fourthwall.com/',
    external: true,
    accent: 'slate',
    icon: 'sliders',
  },
  {
    title: 'Email',
    description: 'Reçois mes idées, conseils, nouveautés et offres directement par email.',
    cta: 'Recevoir mes emails',
    href: 'https://productionmusicale.systeme.io/619551c5',
    external: true,
    accent: 'plum',
    icon: 'mail',
  },
];

export const placeholderPages = {
  membre: {
    eyebrow: 'Espace membre',
    title: 'Retrouve bientôt ton espace ici.',
    description: 'Cette entrée est prête à accueillir le futur accès aux contenus et à la communauté.',
  },
} as const;
