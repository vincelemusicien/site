import catalogue from './videos/catalogue.json';

export const categories = [
  { id: 'logic', label: 'Logic Pro', pattern: /logic|drummer|track stack|scripter|varispeed|space designer|quick sampler/ },
  { id: 'mix', label: 'Mixage & mastering', pattern: /mix|mastering|compress|eq\b|frequence|reverb|delay|stereo|side.?chain|mid.?side|gain staging|de.esser|saturation|distortion|routing|routage|bruit|noise|enveloper|transient|fader|phat fx/ },
  { id: 'composition', label: 'Composer & produire', pattern: /compos|accord|melodi|arrang|rythm|harmoni|groove|structure|basse|drum|beat|sample|sampling|synthe|sound design|instrument|midi|tempo|track de a|musique en|chanson en|titre de a|son a partir|prises|enregistr|piano|corde|vocoder|guitare|rtl|cinemati/ },
  { id: 'creativity', label: 'Créativité & motivation', pattern: /creati|inspir|motiv|finir|fini |termin|projet|perfection|peur|passion|patience|concentr|progres|appren|conseil|temps|workflow|organis|boucle|defi|philosoph|musicien|vertu|confiance|singulier|regul|intention|recul|frustration|dispersion|copier|produit|qualite/ },
  { id: 'gear', label: 'Matériel & plugins', pattern: /materiel|matos|micro|casque|enceinte|carte son|hardware|vst|plugin|black friday|mac\b|macbook|macpro|hackintosh|ipad|komplete|kontakt|spitfire|test|faderport|reason|soundtrap|presets|equiper|gear/ },
  { id: 'release', label: 'Diffuser sa musique', pattern: /sacem|spotify|diffus|sortir|sortie|streaming|business|argent|revenu|tarif|label|subvention|agent|industrie|groover|fiverr|pochette|soundcloud|promo|tracks and fields|zimbalam/ },
  { id: 'studio', label: 'Coulisses & échanges', pattern: /coulisse|vlog|videolog|palabre|nocturne|tea.?time|album|interview|entretien|live|papot|coaching|critique|avis|londres|manhattan|new york|merci|chaine|retour|audio\)|vincent retg|concert/ },
];
export const normalize = (text: string) => text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[’']/g, ' ');
// Reviewed starting points, using the original video IDs from the channel.
export const startingPoints = [
  { id: '-JJe11QLbe0', label: 'Je débute sur Logic Pro', category: 'logic' },
  { id: 'U0uskZiIXGs', label: 'Je veux un mix plus clair', category: 'mix' },
  { id: 'W1Paj92SK1Y', label: 'Je veux finir mes morceaux', category: 'creativity' },
];
export const videos = catalogue.videos.map(v => {
  const matching = categories.filter(c => c.pattern.test(normalize(v.title))).map(c => c.id);
  return { ...v, categories: matching.length ? matching : ['studio'], url: `https://www.youtube.com/watch?v=${v.id}`, thumbnail: `https://i.ytimg.com/vi/${v.id}/hqdefault.jpg` };
});
export const updatedAt = catalogue.updatedAt;
export const channelUrl = catalogue.channelUrl;
