/**
 * ============================================================
 *  INFORMATIONS DU RESTAURANT — à adapter pour chaque client.
 * ============================================================
 *  Établissement fictif (site démo). Adresse et numéro inventés :
 *  le numéro 01 99 00 … fait partie de la tranche réservée à la fiction.
 */

export const restaurant = {
  nom: 'Forno Vivo',
  slogan: 'Le feu de Naples, à votre table.',
  accroche: 'Pizzeria napolitaine · feu de bois · depuis 1994',
  adresse: { rue: '18 rue de la Braise', ville: '59800 Lille' },
  telephone: '01 99 00 42 42',
  telephoneLien: '+33199004242',
  email: 'ciao@fornovivo.fr',
  reseaux: [
    { nom: 'Instagram', url: '#', icone: 'instagram' },
    { nom: 'Facebook', url: '#', icone: 'facebook' },
    { nom: 'TikTok', url: '#', icone: 'tiktok' },
  ],
};

/**
 * Horaires. jour : 0 = dimanche … 6 = samedi.
 * services : créneaux d'ouverture "HH:MM" ; tableau vide = fermé.
 */
export const horaires = [
  { jour: 1, nom: 'Lundi', services: [] },
  {
    jour: 2,
    nom: 'Mardi',
    services: [
      ['12:00', '14:30'],
      ['19:00', '22:30'],
    ],
  },
  {
    jour: 3,
    nom: 'Mercredi',
    services: [
      ['12:00', '14:30'],
      ['19:00', '22:30'],
    ],
  },
  {
    jour: 4,
    nom: 'Jeudi',
    services: [
      ['12:00', '14:30'],
      ['19:00', '22:30'],
    ],
  },
  {
    jour: 5,
    nom: 'Vendredi',
    services: [
      ['12:00', '14:30'],
      ['19:00', '23:00'],
    ],
  },
  {
    jour: 6,
    nom: 'Samedi',
    services: [
      ['12:00', '15:00'],
      ['19:00', '23:00'],
    ],
  },
  { jour: 0, nom: 'Dimanche', services: [['12:00', '15:00']] },
];

export const carte = {
  entrees: [
    { nom: 'Bruschetta al pomodoro', detail: 'Pain grillé au feu de bois, tomates confites, ail, basilic', prix: 6.5 },
    { nom: 'Burrata des Pouilles', detail: 'Tomates anciennes, huile d’olive, fleur de sel', prix: 9.5 },
    { nom: 'Arancini', detail: 'Trois boules de risotto croustillantes, cœur de mozzarella', prix: 7 },
    { nom: 'Planche Antipasti', detail: 'Charcuteries, légumes grillés, olives, pecorino', prix: 12 },
  ],
  desserts: [
    { nom: 'Tiramisù della Nonna', detail: 'Mascarpone, café serré, biscuits imbibés, cacao', prix: 7 },
    { nom: 'Panna cotta', detail: 'Vanille de Madagascar, coulis de fruits rouges', prix: 6.5 },
    { nom: 'Cannoli siciliens', detail: 'Ricotta sucrée, pistache, écorces d’orange', prix: 6 },
  ],
  boissons: [
    { nom: 'Limonata maison', detail: 'Citrons d’Amalfi, menthe', prix: 4.5 },
    { nom: 'Spritz', detail: 'Apéritif italien, prosecco, orange', prix: 8 },
    { nom: 'Vin rouge Montepulciano', detail: 'Le verre de 12 cl', prix: 6 },
    { nom: 'Birra Moretti', detail: 'Bière blonde 33 cl', prix: 5.5 },
    { nom: 'Eau pétillante', detail: 'La bouteille de 75 cl', prix: 5 },
    { nom: 'Espresso', detail: 'Torréfaction napolitaine', prix: 2.2 },
  ],
};

export const histoire = {
  titre: 'Une famille, un four, trois générations',
  paragraphes: [
    'Tout commence en 1962, dans une ruelle du quartier de la Sanità, à Naples. Nonna Lucia y pétrit chaque matin la pâte de la petite pizzeria familiale, pendant que le four à bois chauffe depuis l’aube.',
    'En 1994, son fils Salvatore pose ses valises à Lille avec la recette de la pâte et une seule promesse : ne jamais presser le temps. Il construit le four brique par brique, à la main, comme on le fait là-bas.',
    'Aujourd’hui, la pâte repose toujours quarante-huit heures. Le four monte à 450 degrés, et chaque pizza y cuit en quatre-vingt-dix secondes. Le feu ne s’éteint jamais vraiment : c’est lui, le cœur de Forno Vivo.',
  ],
  chiffres: [
    { valeur: '48 h', label: 'de maturation de la pâte' },
    { valeur: '450 °C', label: 'dans le four à bois' },
    { valeur: '90 s', label: 'de cuisson par pizza' },
  ],
};

/** Galerie : remplacez simplement les fichiers dans public/images/galerie/ par vos photos. */
export const galerie = [
  { src: '/images/galerie/four.webp', alt: 'Le four à bois de Forno Vivo, braises incandescentes', legende: 'Le four, allumé dès l’aube' },
  {
    src: '/images/galerie/margherita.webp',
    alt: 'Margherita sortie du four, mozzarella fondante et basilic',
    legende: 'Margherita, l’éternelle',
  },
  { src: '/images/galerie/diavola.webp', alt: 'Pizza Diavola au salame piccante', legende: 'Diavola, la piquante' },
  {
    src: '/images/galerie/ingredients.webp',
    alt: 'Tomates, basilic et mozzarella sur le plan de travail',
    legende: 'Des produits de Campanie',
  },
  { src: '/images/galerie/tartufo.webp', alt: 'Pizza Tartufo à la crème de truffe', legende: 'Tartufo, pour les grandes occasions' },
  { src: '/images/galerie/vivo.webp', alt: 'La Vivo, pizza signature du chef à la pistache', legende: 'La Vivo, signature du chef' },
];

/** Avis (fictifs, site démo). */
export const avis = [
  {
    nom: 'Camille D.',
    note: 5,
    texte: 'La meilleure margherita que j’ai mangée hors de Naples. La pâte est légère, la bordure bien gonflée, et le service adorable.',
    date: 'Octobre 2026',
  },
  {
    nom: 'Thomas L.',
    note: 5,
    texte: 'On a pris la Vivo sur les conseils du serveur : pistache, mortadelle, stracciatella… Une vraie découverte. On reviendra.',
    date: 'Septembre 2026',
  },
  {
    nom: 'Inès B.',
    note: 5,
    texte: 'Ambiance chaleureuse, on voit le four depuis la salle. Le tiramisù de la nonna vaut le détour à lui seul.',
    date: 'Septembre 2026',
  },
  {
    nom: 'Marc et Julie',
    note: 4,
    texte: 'Super soirée en amoureux. Réservez le week-end, c’est vite complet, et pour cause !',
    date: 'Août 2026',
  },
];
