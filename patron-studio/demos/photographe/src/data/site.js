/**
 * ============================================================
 *  LUMEN STUDIO — textes et données (photographe fictif).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 *  Les photos du portfolio sont de vraies photos Pexels (sources : photos/LISEZ-MOI.md).
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
 * Portfolio : vraies photos Pexels (licence Pexels, usage commercial autorisé), sources dans photos/LISEZ-MOI.md.
 * nom : fichier dans photos/ (optimisé en public/images/<nom>-800.webp et -1600.webp).
 * lieu : légende courte affichée sous la photo (à la place de réglages inventés).
 */
export const photos = [
  { id: 1, titre: 'Sous les arbres', cat: 'Mariage', nom: 'sous-les-arbres', format: 'haut', lieu: 'Séance couple, en extérieur', alt: 'Les mariés enlacés, le marié embrasse la tempe de la mariée, feuillage en fond' },
  { id: 2, titre: 'Lumière de fenêtre', cat: 'Portrait', nom: 'lumiere-de-fenetre', format: 'haut', lieu: 'Portrait en lumière naturelle', alt: 'Jeune femme aux cheveux longs assise près d’une fenêtre, regard vers l’objectif' },
  { id: 3, titre: 'En famille', cat: 'Famille', nom: 'en-famille', format: 'large', lieu: 'Séance famille, en pleine nature', alt: 'Un père, une mère et leurs deux filles serrés les uns contre les autres, en extérieur' },
  { id: 4, titre: 'Les alliances', cat: 'Mariage', nom: 'les-alliances', format: 'carre', lieu: 'Détail, le jour J', alt: 'Les mains des mariés l’une dans l’autre, alliances et bague de fiançailles' },
  { id: 5, titre: 'L’équipe en réunion', cat: 'Entreprise', nom: 'equipe-en-reunion', format: 'large', lieu: 'Reportage en entreprise', alt: 'Une équipe sourit autour d’un ordinateur portable, dans un bureau aux murs de briques blanches' },
  { id: 6, titre: 'Contre-jour', cat: 'Portrait', nom: 'contre-jour', format: 'large', lieu: 'Portrait à l’heure dorée', alt: 'Silhouette d’une femme de profil à contre-jour, au coucher du soleil' },
  { id: 7, titre: 'Premier bain de mer', cat: 'Famille', nom: 'premier-bain', format: 'large', lieu: 'Séance famille, à la plage', alt: 'Une famille court main dans la main dans les vagues, de dos' },
  { id: 8, titre: 'Au chai', cat: 'Entreprise', nom: 'au-chai', format: 'large', lieu: 'Reportage métier, chai du Médoc', alt: 'Un chai à barriques, rangées de fûts de chêne et deux personnes au travail' },
  { id: 9, titre: 'Le lâcher de riz', cat: 'Mariage', nom: 'lacher-de-riz', format: 'large', lieu: 'Reportage de mariage', alt: 'Les invités lancent du riz sur les mariés pendant la cérémonie, décor rouge et or' },
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
