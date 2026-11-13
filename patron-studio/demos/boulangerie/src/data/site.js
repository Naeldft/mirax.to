/**
 * ============================================================
 *  MAISON LEVAIN — textes et données (boulangerie fictive).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const maison = {
  nom: 'Maison Levain',
  slogan: 'Pétri la nuit, doré au matin.',
  accroche: 'Boulangerie artisanale · Lille Wazemmes',
  intro: 'Pains au levain naturel, viennoiseries pur beurre et gâteaux du dimanche, faits ici, chaque nuit, avec des farines du Nord.',
  adresse: '27 rue du Fournil, 59000 Lille',
  telephone: '01 99 00 62 62',
  telephoneLien: '+33199006262',
  email: 'commande@maison-levain.fr',
  mention: 'Boulangerie fictive — site de démonstration',
};

export const navigation = [
  { href: '#pains', label: 'Nos pains' },
  { href: '#ardoise', label: 'L’ardoise' },
  { href: '#fournil', label: 'Le fournil' },
  { href: '#commande', label: 'Commander' },
];

/** Produits (prix TTC). categorie : 'pain' | 'viennoiserie' | 'patisserie'. */
export const produits = [
  {
    id: 'tradition',
    photo: 'pain-tradition',
    alt: 'Baguettes et pains dorés à la croûte croustillante',
    nom: 'Baguette tradition',
    categorie: 'pain',
    prix: 1.3,
    detail: 'Farine Label Rouge, 24 h de pousse lente',
    tag: 'La préférée',
  },
  {
    id: 'campagne',
    photo: 'pain-campagne',
    alt: 'Gros pain de campagne au levain, croûte fendue et farinée',
    nom: 'Pain de campagne au levain',
    categorie: 'pain',
    prix: 4.2,
    detail: '800 g, croûte épaisse, mie alvéolée',
    tag: 'Levain',
  },
  {
    id: 'seigle',
    photo: 'pain-seigle',
    alt: 'Pains de seigle foncés avec des épis de blé',
    nom: 'Seigle & raisins',
    categorie: 'pain',
    prix: 3.6,
    detail: 'Idéal avec les fromages du Nord',
    tag: null,
  },
  {
    id: 'cereales',
    photo: 'pain-cereales',
    alt: 'Pain aux céréales tranché, mie dense et graines',
    nom: 'Pain aux céréales',
    categorie: 'pain',
    prix: 3.9,
    detail: 'Lin, tournesol, sésame, pavot',
    tag: 'Bio',
  },
  {
    id: 'croissant',
    photo: 'viennoiserie-croissant',
    alt: 'Croissants pur beurre dorés, saupoudrés de sucre glace',
    nom: 'Croissant pur beurre',
    categorie: 'viennoiserie',
    prix: 1.2,
    detail: 'Beurre AOP, feuilletage maison',
    tag: null,
  },
  {
    id: 'pain-chocolat',
    photo: 'viennoiserie-pain-chocolat',
    alt: 'Plaque de pains au chocolat sortant du four',
    nom: 'Pain au chocolat',
    categorie: 'viennoiserie',
    prix: 1.35,
    detail: 'Deux barres de chocolat noir',
    tag: null,
  },
  {
    id: 'kouign',
    photo: null /* à fournir : photos/kouign.jpg */,
    nom: 'Gaufre fourrée à la vergeoise',
    categorie: 'viennoiserie',
    prix: 2.2,
    detail: 'La douceur lilloise',
    tag: 'Spécialité',
  },
  {
    id: 'tarte-sucre',
    photo: null /* à fournir : photos/tarte-sucre.jpg */,
    nom: 'Tarte au sucre (6 parts)',
    categorie: 'patisserie',
    prix: 14,
    detail: 'Brioche, vergeoise brune, crème',
    tag: 'Du Nord',
  },
  {
    id: 'flan',
    photo: null /* à fournir : photos/flan.jpg */,
    nom: 'Flan pâtissier (part)',
    categorie: 'patisserie',
    prix: 3.4,
    detail: 'Vanille de Madagascar',
    tag: null,
  },
];

export const categories = [
  { id: 'pain', label: 'Pains' },
  { id: 'viennoiserie', label: 'Viennoiseries' },
  { id: 'patisserie', label: 'Pâtisseries' },
];

/** L'ardoise du jour (affichée à la craie). */
export const ardoise = [
  ['Pain du jour', 'Petit épeautre & noisettes', '5,20 €'],
  ['Viennoiserie', 'Croissant amande', '2,10 €'],
  ['Le goûter', 'Cookie chocolat au sel de Guérande', '2,50 €'],
  ['Formule midi', 'Sandwich + boisson + dessert', '8,90 €'],
];

/** La nuit au fournil : étapes et heures. */
export const nuit = [
  { heure: '21 h', titre: 'Le levain se réveille', texte: 'On le nourrit de farine et d’eau : il travaillera toute la nuit.' },
  { heure: '23 h', titre: 'Pétrissage', texte: 'Lent, pour garder les arômes. La pâte repose ensuite au frais.' },
  { heure: '3 h', titre: 'Façonnage', texte: 'Chaque pain est façonné à la main, puis entaillé d’un coup de lame.' },
  { heure: '5 h', titre: 'Cuisson', texte: 'Four à sole à 250 °C : la croûte chante en refroidissant.' },
  { heure: '6 h 30', titre: 'Ouverture', texte: 'Les premières baguettes sont encore tièdes. Bonjour !' },
];

export const chiffres = [
  { valeur: 36, suffixe: ' h', label: 'de fermentation au levain' },
  { valeur: 1200, suffixe: '', label: 'baguettes chaque jour' },
  { valeur: 100, suffixe: ' %', label: 'de farines du Nord' },
];

export const horaires = [
  ['Lundi', 'Fermé'],
  ['Mardi – samedi', '6 h 30 – 19 h 30'],
  ['Dimanche', '7 h – 13 h'],
];

/** Créneaux de retrait de commande. */
export const retraits = ['7:00', '8:00', '9:00', '11:00', '12:00', '16:00', '17:00', '18:00'];

export const avis = [
  { nom: 'Hélène', texte: 'La tradition est croustillante comme il faut, et le pain de campagne tient toute la semaine.' },
  { nom: 'Youssef', texte: 'Je commande la tarte au sucre le vendredi pour le dimanche : jamais déçu, toujours prête à l’heure.' },
  { nom: 'Camille', texte: 'Une équipe adorable, des croissants qui feuillettent pour de vrai. Notre boulangerie de quartier.' },
];

export const faq = [
  {
    q: 'Puis-je commander un gâteau d’anniversaire ?',
    a: 'Oui, 48 heures à l’avance, en boutique ou par téléphone. Tartes, fraisiers, entremets : dites-nous le nombre de parts.',
  },
  {
    q: 'Avez-vous des pains sans gluten ?',
    a: 'Notre fournil utilise du blé : nous ne pouvons pas garantir l’absence de traces. Le petit épeautre est plus digeste, mais il contient du gluten.',
  },
  {
    q: 'Jusqu’à quand puis-je commander en ligne ?',
    a: 'La veille à 18 heures pour un retrait le lendemain matin, et le jour même avant 10 heures pour un retrait l’après-midi.',
  },
  {
    q: 'Livrez-vous les entreprises ?',
    a: 'Oui, viennoiseries et plateaux pour vos réunions, à partir de 30 €, dans tout Lille. Contactez-nous la veille.',
  },
];
