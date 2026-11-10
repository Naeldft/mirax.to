/**
 * ============================================================
 *  LUMEN STUDIO — textes et données (photographe fictif).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 *  Les « photos » du portfolio sont des compositions dessinées en code
 *  (aucune image externe) : remplacez-les par de vraies photos pour un client.
 */

export const studio = {
  nom: 'Lumen Studio',
  photographe: 'Inès Morel',
  accroche: 'Photographe · Bordeaux & Gironde',
  intro: 'Mariages, portraits, familles et entreprises. Une lumière naturelle, des images sincères, livrées en galerie privée.',
  adresse: '18 quai des Chartrons, 33000 Bordeaux',
  telephone: '01 99 00 23 23',
  telephoneLien: '+33199002323',
  email: 'bonjour@lumen-studio.fr',
  zone: 'Bordeaux et 60 km autour · au-delà, frais de route au réel',
  horaires: 'Studio sur rendez-vous, du mardi au samedi',
  mention: 'Studio fictif — site de démonstration',
};

export const navigation = [
  { href: '#portfolio', label: 'Portfolio' },
  { href: '#prestations', label: 'Prestations' },
  { href: '#deroule', label: 'Déroulé' },
  { href: '#reservation', label: 'Réserver' },
];

export const categories = ['Tout', 'Mariage', 'Portrait', 'Famille', 'Entreprise'];

/**
 * Portfolio. scene : composition dessinée (voir Photo.jsx).
 * exif : réglages affichés comme sur une vraie fiche photo.
 */
export const photos = [
  {
    id: 1,
    titre: 'Sous le chêne',
    cat: 'Mariage',
    scene: 'couple',
    ton: ['#f3c58a', '#c4704b', '#2b1d1a'],
    exif: '85 mm · f/1.8 · 1/500 s',
    format: 'haut',
  },
  {
    id: 2,
    titre: 'Lumière de fenêtre',
    cat: 'Portrait',
    scene: 'portrait',
    ton: ['#d9d2c5', '#7c6f62', '#1c1a18'],
    exif: '50 mm · f/2 · 1/250 s',
    format: 'carre',
  },
  {
    id: 3,
    titre: 'Dune du Pilat',
    cat: 'Famille',
    scene: 'dune',
    ton: ['#f6d9a8', '#d99a5b', '#4a6a7a'],
    exif: '35 mm · f/5.6 · 1/1000 s',
    format: 'large',
  },
  {
    id: 4,
    titre: 'Les mains',
    cat: 'Mariage',
    scene: 'mains',
    ton: ['#efe2d0', '#b89478', '#3a2b24'],
    exif: '100 mm macro · f/2.8 · 1/320 s',
    format: 'carre',
  },
  {
    id: 5,
    titre: 'L’équipe Garonne',
    cat: 'Entreprise',
    scene: 'equipe',
    ton: ['#cfd8dc', '#607d8b', '#1d262b'],
    exif: '35 mm · f/4 · 1/200 s',
    format: 'large',
  },
  {
    id: 6,
    titre: 'Contre-jour',
    cat: 'Portrait',
    scene: 'profil',
    ton: ['#ffcf8a', '#e07a4a', '#16110f'],
    exif: '85 mm · f/1.4 · 1/2000 s',
    format: 'haut',
  },
  {
    id: 7,
    titre: 'Premier bain de mer',
    cat: 'Famille',
    scene: 'vagues',
    ton: ['#bfe0e6', '#5f9ea8', '#1f3b44'],
    exif: '24 mm · f/8 · 1/800 s',
    format: 'carre',
  },
  {
    id: 8,
    titre: 'Atelier du chai',
    cat: 'Entreprise',
    scene: 'chai',
    ton: ['#e8c9a0', '#8a4b2f', '#1a0f0b'],
    exif: '24 mm · f/2.8 · 1/60 s',
    format: 'haut',
  },
  {
    id: 9,
    titre: 'Le lâcher de riz',
    cat: 'Mariage',
    scene: 'confettis',
    ton: ['#f7efe6', '#d7a7a0', '#3b2d33'],
    exif: '35 mm · f/2.8 · 1/1600 s',
    format: 'large',
  },
];

export const prestations = [
  {
    id: 'portrait',
    nom: 'Portrait',
    prix: 'dès 180 €',
    duree: '1 h · studio ou extérieur',
    points: ['15 photos retouchées', 'Galerie privée en ligne', 'Conseils tenue et maquillage'],
  },
  {
    id: 'famille',
    nom: 'Famille',
    prix: 'dès 240 €',
    duree: '1 h 30 · en extérieur',
    points: ['30 photos retouchées', 'Jusqu’à 6 personnes', 'Tirages fine art en option'],
  },
  {
    id: 'mariage',
    nom: 'Mariage',
    prix: 'dès 1 490 €',
    duree: 'des préparatifs à la soirée',
    points: ['400 photos retouchées', 'Séance couple offerte', 'Livre album 30 × 30 en option'],
    vedette: true,
  },
  {
    id: 'entreprise',
    nom: 'Entreprise',
    prix: 'dès 390 €',
    duree: 'demi-journée sur site',
    points: ['Portraits d’équipe homogènes', 'Photos des locaux et métiers', 'Droits d’usage web et print'],
  },
];

export const deroule = [
  { titre: 'On se parle', texte: 'Un appel de 20 minutes pour comprendre votre projet, vos envies et le lieu.' },
  { titre: 'On prépare', texte: 'Repérage, horaires selon la lumière, liste des photos à ne pas manquer.' },
  { titre: 'On photographie', texte: 'Une séance détendue, je vous guide sans vous figer.' },
  { titre: 'Vous recevez', texte: 'Galerie privée sous 2 semaines (6 pour un mariage), en haute définition.' },
];

export const chiffres = [
  { valeur: 12, suffixe: ' ans', label: 'derrière l’objectif' },
  { valeur: 180, suffixe: '', label: 'mariages photographiés' },
  { valeur: 14, suffixe: ' j', label: 'délai moyen de livraison' },
];

export const avis = [
  {
    nom: 'Camille & Hugo',
    type: 'Mariage',
    texte: 'Inès a capté des instants qu’on n’avait même pas vus. On a pleuré en ouvrant la galerie.',
  },
  {
    nom: 'Sophie R.',
    type: 'Portrait',
    texte: 'Je déteste être prise en photo… et pourtant je les adore toutes. Merci pour la patience !',
  },
  {
    nom: 'Cabinet Garonne',
    type: 'Entreprise',
    texte: 'Des portraits d’équipe cohérents, livrés en 10 jours. Notre site a pris une autre allure.',
  },
];

export const faq = [
  {
    q: 'Combien de temps à l’avance réserver ?',
    a: 'Pour un mariage, 9 à 12 mois. Pour un portrait ou une séance famille, 2 à 4 semaines suffisent en général.',
  },
  {
    q: 'Comment réserve-t-on la date ?',
    a: 'Après notre échange, je vous envoie un devis. La date est bloquée à réception d’un acompte de 30 %.',
  },
  {
    q: 'Et s’il pleut le jour de la séance ?',
    a: 'Pour les séances en extérieur, on reporte sans frais. Pour un mariage, la pluie donne souvent de très belles images !',
  },
  {
    q: 'Recevons-nous les fichiers bruts ?',
    a: 'Non, je livre uniquement des photos retouchées, en haute définition et en version web, sans filigrane.',
  },
];

export const typesSeance = ['Portrait', 'Famille', 'Mariage', 'Entreprise', 'Autre'];
