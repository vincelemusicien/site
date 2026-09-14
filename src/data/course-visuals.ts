/** Original product covers recovered from the VIP page; shared by both catalogues. */
const visualKey = (title: string) => title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]/gi, '').toLowerCase();
const covers: Record<string, string> = Object.fromEntries([
  ['Arrangements MAO', 'arrangements-mao'],
  ['Comprendre la Compression', 'compression'],
  ['Réussir sa sortie digitale', 'sortie-digitale'],
  ['Musicien Productif', 'musicien-productif'],
  ['Mixage Rapide', 'mixage-rapide'],
  ['Melody Maker', 'melody-maker'],
  ['Workflow Efficace', 'workflow-efficace'],
  ['Le Défi Songwriting', 'defi-songwriting'],
  ['7 emails pour vendre sa musique', '7-emails'],
  ['Synthèse sonore facile', 'synthese-sonore'],
  ['Songwriting Mastery', 'songwriting-mastery'],
  ['Comment composer une fiction radio', 'fiction-radio'],
  ['Comment orchestrer en MAO', 'orchestration'],
  ['100 % Sound Design avec un sample', 'sound-design'],
  ['Masterclass Droit d’auteur', 'droit-auteur'],
  ['Masterclass Outils du web', 'outils-web'],
  ['Masterclass Monétisation des indés', 'monetisation'],
].map(([title, file]) => [visualKey(title), `/images/catalogue/${file}.webp`]));
covers[visualKey('Fondations MAO')] = '/images/pass/course-fmao.png';

export const courseVisual = (title: string): string | undefined => covers[visualKey(title)];
