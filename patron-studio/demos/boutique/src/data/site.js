/**
 * ============================================================
 *  ATELIER LIN — textes et données (boutique fictive).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const boutique = {
  nom: 'Atelier Lin',
  slogan: 'Le lin, tout simplement.',
  accroche: 'Vêtements en lin · fabriqués en France',
  intro: 'Des pièces simples et durables, en lin cultivé en Normandie, tissé dans le Nord et teint avec des pigments végétaux.',
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

export const coloris = [
  { id: 'naturel', nom: 'Naturel', hex: '#d8ccb6' },
  { id: 'sauge', nom: 'Sauge', hex: '#9aa58a' },
  { id: 'terracotta', nom: 'Terracotta', hex: '#b8735a' },
  { id: 'ciel', nom: 'Bleu ciel', hex: '#9fb6c8' },
  { id: 'encre', nom: 'Encre', hex: '#2b2b2e' },
];

/** Produits. forme : silhouette dessinée (chemise, robe, pantalon, top, foulard, sac). */
export const produits = [
  {
    id: 'chemise',
    nom: 'Chemise Ondine',
    prix: 89,
    forme: 'chemise',
    coloris: ['naturel', 'ciel', 'encre'],
    note: 'Coupe ample, manches retroussables',
  },
  {
    id: 'robe',
    nom: 'Robe Brise',
    prix: 129,
    forme: 'robe',
    coloris: ['terracotta', 'sauge', 'naturel'],
    note: 'Longueur midi, poches cachées',
  },
  {
    id: 'pantalon',
    nom: 'Pantalon Dune',
    prix: 95,
    forme: 'pantalon',
    coloris: ['naturel', 'encre'],
    note: 'Taille élastiquée, jambe large',
  },
  { id: 'top', nom: 'Top Écume', prix: 59, forme: 'top', coloris: ['naturel', 'sauge', 'ciel'], note: 'Bretelles réglables' },
  { id: 'foulard', nom: 'Foulard Alizé', prix: 39, forme: 'foulard', coloris: ['terracotta', 'ciel'], note: 'Bords effilochés à la main' },
  { id: 'cabas', nom: 'Cabas Marché', prix: 45, forme: 'cabas', coloris: ['naturel', 'encre'], note: 'Lin épais, anses en cuir' },
];

export const tailles = ['XS', 'S', 'M', 'L', 'XL'];

export const engagements = [
  { valeur: 250, suffixe: ' km', label: 'entre le champ et l’atelier' },
  { valeur: 100, suffixe: ' %', label: 'de lin cultivé en France' },
  { valeur: 0, suffixe: ' g', label: 'de plastique dans nos colis' },
];

export const etapes = [
  { titre: 'Le champ', texte: 'Le lin pousse en Normandie, sans irrigation, en cent jours.' },
  { titre: 'Le tissage', texte: 'Il est filé et tissé dans le Nord, à moins de 100 km de Lille.' },
  { titre: 'La teinture', texte: 'Des pigments végétaux : garance, indigo, réséda.' },
  { titre: 'La couture', texte: 'Chaque pièce est coupée et cousue dans notre atelier lillois.' },
];

export const livraison = [
  ['Livraison', 'Offerte dès 80 €, sinon 5,90 €. Expédition sous 48 h en colis recyclé.'],
  ['Retrait en boutique', 'Gratuit, le jour même pour toute commande passée avant midi.'],
  ['Retours', '30 jours pour changer d’avis, retour gratuit en boutique ou en point relais.'],
];

export const avis = [
  { nom: 'Pauline', texte: 'La chemise Ondine est devenue ma pièce préférée. Elle s’adoucit à chaque lavage.' },
  { nom: 'Bastien', texte: 'Enfin un pantalon en lin qui tombe bien. Colis soigné, livré en deux jours.' },
  { nom: 'Léonie', texte: 'La robe Brise en terracotta : on me demande où je l’ai trouvée à chaque fois.' },
];

export const faq = [
  {
    q: 'Comment laver le lin ?',
    a: 'À 30 °C, sur l’envers, sans adoucissant. Séchez à plat : le lin se froisse naturellement, c’est ce qui fait son charme.',
  },
  {
    q: 'Comment choisir ma taille ?',
    a: 'Nos coupes sont amples. Si vous hésitez entre deux tailles, prenez la plus petite. Le guide des tailles est sur chaque fiche.',
  },
  {
    q: 'Le lin rétrécit-il ?',
    a: 'Nos tissus sont prélavés : le rétrécissement est inférieur à 2 %, à condition de respecter le lavage à 30 °C.',
  },
  { q: 'Puis-je essayer en boutique ?', a: 'Bien sûr, du mardi au samedi, 10 h – 19 h, au 9 rue des Tisserands à Lille.' },
];
