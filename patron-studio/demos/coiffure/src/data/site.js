/**
 * ============================================================
 *  ATELIER MÈCHE — textes et données (salon fictif).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const salon = {
  nom: 'Atelier Mèche',
  slogan: 'Une coupe qui vous ressemble.',
  accroche: 'Salon de coiffure · Vieux-Lille',
  intro: 'Coupe, couleur et soins dans un atelier lumineux du Vieux-Lille. On prend le temps de vous écouter avant de toucher aux ciseaux.',
  adresse: '6 rue des Ciseaux, 59800 Lille',
  telephone: '01 99 00 33 33',
  telephoneLien: '+33199003333',
  email: 'bonjour@atelier-meche.fr',
  mention: 'Salon fictif — site de démonstration',
};

export const navigation = [
  { href: '#prestations', label: 'Prestations' },
  { href: '#equipe', label: 'L’équipe' },
  { href: '#looks', label: 'Inspirations' },
  { href: '#infos', label: 'Infos pratiques' },
];

/** Prestations par catégorie. duree en minutes (sert aussi au formulaire de réservation). */
export const prestations = [
  {
    categorie: 'Femme',
    items: [
      { id: 'coupe-femme', nom: 'Coupe, shampooing, brushing', duree: 60, prix: 52 },
      { id: 'brushing', nom: 'Brushing seul', duree: 40, prix: 32 },
      { id: 'chignon', nom: 'Chignon & coiffure d’événement', duree: 60, prix: 65 },
    ],
  },
  {
    categorie: 'Homme',
    items: [
      { id: 'coupe-homme', nom: 'Coupe homme', duree: 30, prix: 28 },
      { id: 'barbe', nom: 'Taille de barbe à l’ancienne', duree: 30, prix: 22 },
      { id: 'coupe-barbe', nom: 'Coupe & barbe', duree: 50, prix: 45 },
    ],
  },
  {
    categorie: 'Couleur & soins',
    items: [
      { id: 'couleur', nom: 'Couleur racines', duree: 75, prix: 58 },
      { id: 'balayage', nom: 'Balayage sur mesure', duree: 150, prix: 120 },
      { id: 'cuivre', nom: 'Couleur cuivrée, racines et longueurs', duree: 105, prix: 72 },
      { id: 'fantaisie', nom: 'Coloration fantaisie (couleurs vives)', duree: 180, prix: 95 },
      { id: 'soin', nom: 'Soin profond à la kératine végétale', duree: 30, prix: 35 },
    ],
  },
  {
    categorie: 'Enfant',
    items: [{ id: 'coupe-enfant', nom: 'Coupe enfant (jusqu’à 12 ans)', duree: 30, prix: 18 }],
  },
];

export const equipe = [
  {
    id: 'lea',
    nom: 'Léa',
    role: 'Coloriste',
    bio: 'Balayages lumineux et couleurs naturelles : sa signature, ce sont les reflets qu’on remarque sans savoir pourquoi.',
    teinte: '#d9a5a0',
  },
  {
    id: 'samir',
    nom: 'Samir',
    role: 'Barbier',
    bio: 'Dégradés précis, rasage à l’ancienne et serviettes chaudes. Un quart d’heure de calme garanti.',
    teinte: '#8a6f5c',
  },
  {
    id: 'ines',
    nom: 'Inès',
    role: 'Coupe & chignons',
    bio: 'Coupes courtes audacieuses et coiffures de mariage. Elle prépare chaque mariée lors d’un essai.',
    teinte: '#c9b28d',
  },
];

/** Inspirations (illustrations dessinées, remplaçables par des photos). */
export const looks = [
  {
    photo: 'look-brushing-souple',
    alt: 'Brushing au sèche-cheveux et à la brosse ronde sur cheveux mi-longs, vu de dos',
    titre: 'Brushing souple',
    note: 'Coupe & brushing',
    texte: 'La brosse ronde, le geste précis : un mouvement souple qui tient toute la journée.',
    prix: 'Coupe, shampooing, brushing · 52 €',
  },
  {
    photo: 'look-balayage-caramel',
    alt: 'Longs cheveux ondulés au balayage caramel, vus de dos',
    titre: 'Balayage caramel',
    note: 'Couleur & soin',
    texte: 'Des reflets peints à la main, mèche par mèche, avec des produits d’origine naturelle.',
    prix: 'Balayage sur mesure · 120 €',
  },
  {
    photo: 'look-degrade-net',
    alt: 'Coupe homme dégradée aux ciseaux, vue de dos',
    titre: 'Dégradé net',
    note: 'Coupe & barbe',
    texte: 'Tondeuse et ciseaux pour un dégradé propre, finitions au rasoir.',
    prix: 'Coupe & barbe · 45 €',
  },
  {
    photo: 'look-chignon-boheme',
    alt: 'Mains de la coiffeuse épinglant un chignon bohème',
    titre: 'Chignon bohème',
    note: 'Événement',
    texte: 'Mariage, cérémonie : un chignon souple, épinglé à la main, qui tient jusqu’au bout de la nuit.',
    prix: 'Chignon & coiffure d’événement · 65 €',
  },
  {
    photo: 'look-roux-cuivre',
    alt: 'Longs cheveux roux cuivré, vus de dos, la cliente regarde par-dessus son épaule',
    titre: 'Roux cuivré',
    note: 'Couleur',
    texte: 'Un roux profond et lumineux, des racines aux pointes, entretenu par un soin brillance.',
    prix: 'Couleur cuivrée · 72 €',
  },
  {
    photo: 'look-coloration-fantaisie',
    alt: 'Longs cheveux ondulés en coloration fantaisie violet, rose, jaune et turquoise, vus de dos',
    titre: 'Coloration fantaisie',
    note: 'Couleur',
    texte: 'Violet, rose, jaune, turquoise : des couleurs vives posées mèche par mèche, sur cheveux décolorés.',
    prix: 'Coloration fantaisie · 95 €',
  },
];

export const chiffres = [
  { valeur: 9, suffixe: ' ans', label: 'dans le Vieux-Lille' },
  { valeur: 12000, suffixe: '', label: 'coupes réalisées' },
  { valeur: 96, suffixe: ' %', label: 'de produits d’origine naturelle' },
];

export const horaires = [
  ['Lundi', 'Fermé'],
  ['Mardi – vendredi', '9 h 30 – 19 h'],
  ['Samedi', '9 h – 18 h'],
  ['Dimanche', 'Fermé'],
];

/** Créneaux proposés à la réservation. */
export const creneaux = ['9:30', '10:30', '11:30', '14:00', '15:00', '16:00', '17:00', '18:00'];

export const avis = [
  {
    nom: 'Margaux',
    texte: 'Enfin une coiffeuse qui écoute ! Léa a compris ce que je voulais en deux phrases, et mon balayage est parfait.',
    note: 5,
  },
  { nom: 'Antoine', texte: 'Le rituel barbe de Samir, c’est mon moment du mois. Précis, détendu, et le café est bon.', note: 5 },
  { nom: 'Chloé', texte: 'Inès a fait mon chignon de mariage : il a tenu toute la nuit, et j’ai reçu mille compliments.', note: 5 },
];

export const faq = [
  {
    q: 'Puis-je venir sans rendez-vous ?',
    a: 'Pour une coupe homme ou une barbe, souvent oui, en semaine. Pour le reste, réservez : chaque prestation a son temps.',
  },
  {
    q: 'Faites-vous un diagnostic avant une couleur ?',
    a: 'Toujours, et il est offert. Pour un balayage ou un grand changement, nous proposons même un rendez-vous conseil de quinze minutes la semaine précédente.',
  },
  {
    q: 'Quels produits utilisez-vous ?',
    a: 'Des soins et des colorations d’origine naturelle, sans ammoniaque pour la plupart, choisis pour respecter le cheveu et le cuir chevelu.',
  },
  {
    q: 'Et si je dois annuler ?',
    a: 'Prévenez-nous au moins 24 heures avant, par téléphone ou par e-mail. C’est gratuit, et cela permet de proposer le créneau à quelqu’un d’autre.',
  },
];

/**
 * Les clientes du salon 3D de l'accueil : vraie photo détourée (public/scene/clientes/<photo>-1024|512.webp),
 * vue de dos, assise dans un fauteuil ; reglage : hauteur de la photo (m), hauteur du bas (y), recul vers le miroir.
 * Plan B : sans photo détourée crédible, mettre photo: null et photoMiroir: '<photo du look>' (la photo s'affiche
 * dans le miroir et le fauteuil reste vide).
 */
export const clientes = [
  {
    look: 'Balayage caramel',
    photo: 'cliente-balayage',
    reglage: { hauteur: 0.8, y: 0.86, recul: -0.08 },
    prestation: 'Balayage sur mesure',
    prix: 120,
  },
  {
    look: 'Roux cuivré',
    // plan B : la photo détourée ne paraissait pas assise (elle se retourne vers nous), le fauteuil reste vide
    photo: null,
    photoMiroir: 'look-roux-cuivre',
    prestation: 'Couleur cuivrée, racines et longueurs',
    prix: 72,
  },
  {
    look: 'Coloration fantaisie',
    photo: 'cliente-fantaisie',
    reglage: { hauteur: 0.98, y: 0.68, recul: -0.08, dx: -0.09 },
    prestation: 'Coloration fantaisie (couleurs vives)',
    prix: 95,
  },
];
