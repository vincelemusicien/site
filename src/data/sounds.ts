export interface SoundProduct {
  slug: string; name: string; category: 'Instruments' | 'Presets Logic Pro';
  price: number; tagline: string; description: string; compatibility: string;
  contents: string[]; images: string[]; video?: string; accent: string;
}
export const sounds: SoundProduct[] = [
  { slug: 'ether-scape', name: 'Ether Scape', category: 'Instruments', price: 15,
    tagline: 'Des textures pour prendre le large.', description: 'Un instrument ambient pour explorer les nappes, les atmosphères et les paysages sonores. Une palette pour donner de la profondeur à tes morceaux.',
    compatibility: 'À confirmer avant la mise en vente', contents: ['6 nappes : Silk Drop, Mellow Pattern, Bright Star, Void Calls, Pearly Pad, Shiny Artefacts', 'Volume et panoramique indépendants par nappe', '26 presets'], images: ["/images/sounds/ether-scape-0.webp", "/images/sounds/ether-scape-1.webp", "/images/sounds/ether-scape-2.webp", "/images/sounds/ether-scape-3.webp"], video: "https://player.vimeo.com/video/912335256", accent: '#8da6bd' },
  { slug: 'the-machine', name: 'The Machine', category: 'Instruments', price: 25,
    tagline: 'Le grain des machines. La liberté de créer.', description: 'Trois sampleurs, 86 sons et des effets intégrés : une collection de timbres vintage pour trouver rapidement une nouvelle couleur musicale.',
    compatibility: 'À confirmer avant la mise en vente', contents: ['3 voix de sampleur, 86 samples par voix', 'Filtre, ADSR, accordage, panoramique et volume', 'Reverb avec 5 réponses impulsionnelles, delay, chorus, phaser et overdrive'], images: ["/images/sounds/the-machine-0.webp", "/images/sounds/the-machine-1.webp", "/images/sounds/the-machine-2.webp"], video: "https://player.vimeo.com/video/912335256", accent: '#b57e53' },
  { slug: 'merlin', name: 'Merlin', category: 'Instruments', price: 10,
    tagline: 'Un peu de bois. Un peu de magie.', description: 'Un instrument folk pour Decent Sampler. Quatre presets pour apporter une couleur organique à tes compositions.',
    compatibility: 'Decent Sampler', contents: ['Instrument folk pour Decent Sampler', '4 presets', 'Enveloppe et simulation d’ampli', 'Filtre, reverb, chorus et delay'], images: ["/images/sounds/merlin-0.webp", "/images/sounds/merlin-1.webp"], video: "https://player.vimeo.com/video/912335256", accent: '#8b9d76' },
  { slug: 'dream-vocals', name: 'Dream Vocals', category: 'Presets Logic Pro', price: 15,
    tagline: 'Une autre dimension pour ta voix.', description: 'Un rack vocal pour Logic Pro, piloté avec les Smart Controls. Explore de nouvelles textures vocales avec les effets de Logic, sans plugins tiers.',
    compatibility: 'Logic Pro 10.8+ · sans plugins tiers', contents: ['Rack vocal complet pour Logic Pro', 'Smart Controls déjà mappés', 'Reverb, delay et élargissement stéréo', 'Compression parallèle, saturation et texture', 'Mini-guide d’installation et d’utilisation'], images: ["/images/sounds/dream-vocals-0.webp", "/images/sounds/dream-vocals-1.webp"], video: "https://player.vimeo.com/video/1207758210", accent: '#af8bac' },
];
export const euro = (price: number) => new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(price);
