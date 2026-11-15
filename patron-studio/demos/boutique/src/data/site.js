/**
 * ============================================================
 *  ATELIER LIN — textes et données (boutique fictive).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const boutique = {
  nom: 'Atelier Lin',
  slogan: 'L’essentiel, tout simplement.',
  accroche: 'Prêt-à-porter en matières naturelles · Lille',
  intro: 'Des pièces simples et durables, en matières naturelles, choisies et retouchées dans notre atelier lillois.',
  adresse: '9 rue des Tisserands, 59000 Lille',
  telephone: '01 99 00 84 84',
  telephoneLien: '+33199008484',
  email: 'bonjour@atelier-lin.fr',
  livraisonOfferte: 80,
  fraisLivraison: 5.9,
  mention: 'Boutique fictive — site de démonstration',
};

export const navigation = [
  { href: '#collection', label: 'Collection' },
  { href: '#atelier', label: 'L’atelier' },
  { href: '#livraison', label: 'Livraison' },
  { href: '#faq', label: 'FAQ' },
];

/**
 * Produits. Chaque pièce a sa vraie photo (photos/<photo>.jpg) ; le nom, la couleur et la description suivent la photo.
 * rayon : où elle est accrochée dans la boutique 3D de l'accueil ('hauts' à gauche, 'autres' à droite, 'table'),
 *   avec sa photo détourée (public/scene/vetements/<photo>-1024|512.webp) ; hauteur : taille réelle (m) ;
 *   crochet : où le cintre se trouve en haut de la photo (0 → 1). Les robes, photographiées portées, n'y sont pas.
 */
export const produits = [
  {
    id: 'chemise',
    photo: 'chemise-ondine',
    alt: 'Chemise en chambray bleu à petits cœurs blancs, manches 3/4, sur un cintre',
    nom: 'Chemise Ondine',
    couleur: 'Chambray bleu',
    prix: 89,
    note: 'Petits cœurs blancs, manches 3/4',
    rayon: 'hauts',
    hauteur: 0.66,
    crochet: 0.53,
  },
  {
    id: 'tshirt',
    photo: 'tshirt-ecume',
    alt: 'T-shirt blanc uni sur un cintre, contre un mur de béton',
    nom: 'T-shirt Écume',
    couleur: 'Blanc',
    prix: 35,
    note: 'Coton épais, coupe droite',
    rayon: 'hauts',
    hauteur: 0.74,
    crochet: 0.55,
  },
  {
    id: 'robe-brise',
    photo: 'robe-brise',
    alt: 'Robe midi en velours côtelé bordeaux, col officier boutonné, portée',
    nom: 'Robe Brise',
    couleur: 'Bordeaux',
    prix: 129,
    note: 'Velours côtelé, col officier, longueur midi',
  },
  {
    id: 'robe-sable',
    photo: 'robe-sable',
    alt: 'Robe longue corail à manches évasées, ceinture nouée, portée avec un chapeau de paille',
    nom: 'Robe Sable',
    couleur: 'Corail',
    prix: 119,
    note: 'Longue et fluide, manches évasées, ceinture nouée',
  },
  {
    id: 'combishort',
    photo: 'combishort-dune',
    alt: 'Combishort kaki à fines bretelles et ceinture à boucle ronde',
    nom: 'Combishort Dune',
    couleur: 'Kaki',
    prix: 85,
    note: 'Fines bretelles, ceinture à boucle',
    rayon: 'autres',
    hauteur: 0.86,
    crochet: 0.5,
  },
  {
    id: 'poncho',
    photo: 'poncho-alize',
    alt: 'Poncho en maille ajourée écrue à franges, sur un cintre en bois',
    nom: 'Poncho Alizé',
    couleur: 'Écru',
    prix: 69,
    note: 'Maille ajourée, franges',
    unique: true,
    rayon: 'autres',
    hauteur: 0.86,
    crochet: 0.47,
  },
  {
    id: 'veste',
    photo: 'veste-tisserand',
    alt: 'Veste en denim brut, col en velours côtelé camel, sur un cintre',
    nom: 'Veste Tisserand',
    couleur: 'Denim brut',
    prix: 139,
    note: 'Col en velours côtelé camel',
    rayon: 'autres',
    hauteur: 0.74,
    crochet: 0.47,
  },
  {
    id: 'cabas',
    photo: 'cabas-marche',
    alt: 'Grand cabas couleur kraft à longues anses',
    nom: 'Cabas Marché',
    couleur: 'Kraft',
    prix: 25,
    note: 'Grand format, longues anses',
    unique: true,
    rayon: 'table',
    hauteur: 0.56,
  },
];

export const tailles = ['XS', 'S', 'M', 'L', 'XL'];

export const engagements = [
  { valeur: 8, suffixe: '', label: 'pièces, choisies une à une' },
  { valeur: 100, suffixe: ' %', label: 'de fibres naturelles' },
  { valeur: 0, suffixe: ' g', label: 'de plastique dans nos colis' },
];

export const etapes = [
  { titre: 'Les matières', texte: 'Coton, denim, velours, maille : des fibres naturelles, choisies pour durer.' },
  { titre: 'La sélection', texte: 'Peu de pièces, mais de belles coupes, essayées et portées avant d’entrer en boutique.' },
  { titre: 'Les retouches', texte: 'Ourlets et ajustements faits sur place, dans notre atelier lillois.' },
  { titre: 'L’entretien', texte: 'Chaque pièce part avec ses conseils de lavage, pour la garder longtemps.' },
];

export const livraison = [
  ['Livraison', 'Offerte dès 80 €, sinon 5,90 €. Expédition sous 48 h en colis recyclé.'],
  ['Retrait en boutique', 'Gratuit, le jour même pour toute commande passée avant midi.'],
  ['Retours', '30 jours pour changer d’avis, retour gratuit en boutique ou en point relais.'],
];

export const avis = [
  { nom: 'Pauline', texte: 'La chemise Ondine est devenue ma pièce préférée. Le chambray s’adoucit à chaque lavage.' },
  { nom: 'Bastien', texte: 'La veste Tisserand tombe parfaitement. Colis soigné, livré en deux jours.' },
  { nom: 'Léonie', texte: 'La robe Brise en velours bordeaux : on me demande où je l’ai trouvée à chaque fois.' },
];

export const faq = [
  {
    q: 'Comment laver mes vêtements ?',
    a: 'À 30 °C, sur l’envers, sans adoucissant. Séchez à plat : les fibres naturelles durent plus longtemps.',
  },
  {
    q: 'Comment choisir ma taille ?',
    a: 'Nos coupes sont amples. Si vous hésitez entre deux tailles, prenez la plus petite. Le guide des tailles est sur chaque fiche.',
  },
  {
    q: 'Mes vêtements vont-ils rétrécir ?',
    a: 'Nos pièces sont prélavées : le rétrécissement reste inférieur à 2 %, à condition de respecter le lavage à 30 °C.',
  },
  { q: 'Puis-je essayer en boutique ?', a: 'Bien sûr, du mardi au samedi, 10 h – 19 h, au 9 rue des Tisserands à Lille.' },
];
