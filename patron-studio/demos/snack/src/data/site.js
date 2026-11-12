/**
 * ============================================================
 *  CRUNCH! — textes et données (snack fictif).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 *  Allergènes : codes des 14 allergènes à déclaration obligatoire (règlement UE 1169/2011).
 */

export const snack = {
  nom: 'Crunch!',
  accroche: 'Smash burgers · Lille Wazemmes',
  intro: 'Bœuf de race régionale écrasé à la plancha, pain brioché du boulanger d’à côté, frites coupées chaque matin.',
  adresse: '27 rue des Sarrazins, 59000 Lille',
  acces: 'Métro Gambetta (ligne 1), 3 min à pied',
  telephone: '01 99 00 62 62',
  telephoneLien: '+33199006262',
  email: 'hello@crunch-lille.fr',
  retraitMinutes: 15,
  livraison: { zone: 'Lille, La Madeleine, Lambersart', minimum: 15, frais: 2.5, offerteDes: 30 },
  mention: 'Snack fictif — site de démonstration',
};

/**
 * PHOTOS : chaque visuel a un emplacement nommé (champ « photo » des produits ci-dessous).
 * Le fichier source est  snack/photos/<nom>.jpg  : pour changer une photo, remplacez
 * ce fichier par le vôtre en gardant le même nom (voir snack/photos/LISEZ-MOI.md).
 */
export const photos = {
  accueil: 'accueil-smash-burger', // grande photo de l'accueil (format vertical conseillé)
  commande: 'ambiance-burger-frites', // à côté de la commande
  avis: 'ambiance-black-bun', // fond de la section avis
  infos: 'ambiance-salle', // fond de la section horaires
};

export const navigation = [
  { href: '#carte', label: 'La carte' },
  { href: '#commande', label: 'Commander' },
  { href: '#allergenes', label: 'Allergènes' },
  { href: '#infos', label: 'Horaires & accès' },
];

/** Les 14 allergènes réglementaires. */
export const allergenes = {
  gluten: 'Gluten',
  crustaces: 'Crustacés',
  oeufs: 'Œufs',
  poisson: 'Poisson',
  arachides: 'Arachides',
  soja: 'Soja',
  lait: 'Lait',
  fruits: 'Fruits à coque',
  celeri: 'Céleri',
  moutarde: 'Moutarde',
  sesame: 'Sésame',
  sulfites: 'Sulfites',
  lupin: 'Lupin',
  mollusques: 'Mollusques',
};

export const categories = [
  { id: 'burgers', nom: 'Burgers' },
  { id: 'poulet', nom: 'Poulet' },
  { id: 'sides', nom: 'Frites & sides' },
  { id: 'desserts', nom: 'Desserts' },
  { id: 'boissons', nom: 'Boissons' },
];

/** La carte. tags : 'veggie', 'piment', 'star'. */
export const produits = [
  {
    id: 'classic',
    photo: 'burger-classic',
    cat: 'burgers',
    nom: 'Le Crunch Classic',
    prix: 9.5,
    desc: 'Deux steaks écrasés à la plancha jusqu’à la croûte, cheddar affiné qui fond, pickles croquants et notre sauce maison.',
    allergenes: ['gluten', 'lait', 'oeufs', 'moutarde', 'sesame'],
    tags: ['star'],
  },
  {
    id: 'fumee',
    photo: 'burger-fume',
    cat: 'burgers',
    nom: 'Le Fumé',
    prix: 11,
    desc: 'Double smash, bacon de bœuf fumé au bois de hêtre, oignons frits et barbecue maison légèrement caramélisé.',
    allergenes: ['gluten', 'lait', 'oeufs', 'sesame', 'sulfites'],
    tags: [],
  },
  {
    id: 'brasier',
    photo: 'burger-brasier',
    cat: 'burgers',
    nom: 'Le Brasier',
    prix: 10.5,
    desc: 'Smash saisi à feu vif, pepper jack fondu, jalapeños et sauce au piment fumé. Pour ceux qui aiment quand ça pique.',
    allergenes: ['gluten', 'lait', 'oeufs', 'sesame'],
    tags: ['piment'],
  },
  {
    id: 'maroilles',
    photo: 'burger-chti',
    cat: 'burgers',
    nom: 'Le Ch’ti',
    prix: 11.5,
    desc: 'Smash, maroilles fondu qui coule, oignons confits à la bière du Nord et une pointe de moutarde à l’ancienne.',
    allergenes: ['gluten', 'lait', 'oeufs', 'sesame', 'sulfites'],
    tags: [],
  },
  {
    id: 'veggie',
    photo: 'burger-green',
    cat: 'burgers',
    nom: 'Le Green',
    prix: 9.5,
    desc: 'Galette pois chiches et betterave dorée à la plancha, avocat, feta, roquette et sauce yaourt-menthe.',
    allergenes: ['gluten', 'lait', 'sesame', 'celeri'],
    tags: ['veggie'],
  },
  {
    id: 'tenders',
    photo: 'poulet-tenders',
    cat: 'poulet',
    nom: 'Tenders × 5',
    prix: 7.5,
    desc: 'Filets de poulet marinés une nuit au babeurre, panure maison qui croustille à chaque bouchée.',
    allergenes: ['gluten', 'lait', 'oeufs'],
    tags: [],
  },
  {
    id: 'wrap',
    photo: 'poulet-wrap',
    cat: 'poulet',
    nom: 'Wrap Crispy',
    prix: 8.5,
    desc: 'Tenders tout juste frits, cheddar, crudités et sauce ranch, roulés dans une galette grillée.',
    allergenes: ['gluten', 'lait', 'oeufs', 'moutarde'],
    tags: [],
  },
  {
    id: 'frites',
    photo: 'side-frites',
    cat: 'sides',
    nom: 'Frites maison',
    prix: 3.5,
    desc: 'Pommes de terre du Nord coupées le matin, double cuisson, fleur de sel. Dorées dehors, fondantes dedans.',
    allergenes: [],
    tags: ['veggie'],
  },
  {
    id: 'cheesy',
    photo: 'side-cheesy-fries',
    cat: 'sides',
    nom: 'Cheesy fries',
    prix: 5,
    desc: 'Nos frites maison nappées de sauce cheddar chaude, oignons frits et ciboulette.',
    allergenes: ['lait', 'gluten'],
    tags: ['veggie'],
  },
  {
    id: 'onion',
    photo: 'side-onion-rings',
    cat: 'sides',
    nom: 'Onion rings × 6',
    prix: 4,
    desc: 'Rondelles d’oignon doux en panure à la bière, servies brûlantes.',
    allergenes: ['gluten', 'sulfites'],
    tags: ['veggie'],
  },
  {
    id: 'cookie',
    photo: 'dessert-cookie',
    cat: 'desserts',
    nom: 'Cookie géant',
    prix: 3,
    desc: 'Chocolat noir et noisettes torréfiées, cœur fondant, servi tiède.',
    allergenes: ['gluten', 'oeufs', 'lait', 'fruits', 'soja'],
    tags: ['veggie'],
  },
  {
    id: 'shake',
    photo: 'dessert-milkshake',
    cat: 'desserts',
    nom: 'Milkshake',
    prix: 4.5,
    desc: 'Vanille, chocolat ou spéculoos, monté avec une glace artisanale lilloise.',
    allergenes: ['lait', 'gluten', 'soja'],
    tags: ['veggie'],
  },
  {
    id: 'citronnade',
    photo: 'boisson-citronnade',
    cat: 'boissons',
    nom: 'Citronnade maison',
    prix: 3,
    desc: 'Citron pressé, menthe fraîche, peu sucrée.',
    allergenes: [],
    tags: ['veggie'],
  },
  {
    id: 'soda',
    photo: 'boisson-sodas',
    cat: 'boissons',
    nom: 'Soda artisanal 33 cl',
    prix: 2.5,
    desc: 'Cola, limonade ou ginger beer d’une brasserie lilloise.',
    allergenes: [],
    tags: ['veggie'],
  },
];

/** Formule : + frites et boisson. */
export const formule = { supplement: 3.5, texte: 'En menu : + frites maison et boisson au choix' };

export const horaires = [
  ['Lundi', 'Fermé'],
  ['Mardi – Jeudi', '11 h 30 – 14 h 30 · 18 h 30 – 22 h 30'],
  ['Vendredi – Samedi', '11 h 30 – 15 h · 18 h 30 – 23 h 30'],
  ['Dimanche', '18 h 30 – 22 h 30'],
];

export const chiffres = [
  { valeur: 100, suffixe: ' %', label: 'bœuf des Hauts-de-France' },
  { valeur: 15, suffixe: ' min', label: 'pour retirer votre commande' },
  { valeur: 4.8, suffixe: '/5', decimales: 1, label: 'sur 1 200 avis' },
];

export const avis = [
  { nom: 'Mehdi', texte: 'Le meilleur smash de Lille, la croûte du steak est parfaite. Les frites sont vraiment maison.' },
  { nom: 'Clara', texte: 'Commandé en ligne à 12 h 05, récupéré à 12 h 20. Le Ch’ti au maroilles, une tuerie.' },
  { nom: 'Antoine', texte: 'Enfin un vrai burger veggie qui n’est pas une option au rabais. Le Green est top.' },
];

export const faq = [
  {
    q: 'Peut-on manger sur place ?',
    a: 'Oui, nous avons 24 places assises et une terrasse aux beaux jours. La commande en ligne reste le plus rapide.',
  },
  { q: 'Vous livrez ?', a: 'Oui, à Lille, La Madeleine et Lambersart, dès 15 € de commande. Frais de 2,50 €, offerts dès 30 €.' },
  {
    q: 'La viande est-elle halal ?',
    a: 'Notre bœuf vient d’un éleveur des Hauts-de-France et n’est pas certifié halal. Le Green et les sides sont végétariens.',
  },
  {
    q: 'Et pour les allergies ?',
    a: 'Tous nos allergènes sont listés sur cette page. Prévenez-nous à la commande : nous changeons de gants et de plancha.',
  },
];
