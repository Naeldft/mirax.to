/**
 * ============================================================
 *  PIZZAS — fichier de données à adapter pour chaque client.
 * ============================================================
 *  - categories : 'classique', 'epicee', 'vegetarienne' (filtres du menu)
 *  - photo      : vraie photo du menu (photos/<photo>.jpg → public/images/<photo>-800/1600.webp).
 *                 Obligatoire : une pizza sans vraie photo n'est pas affichée (jamais d'emplacement vide).
 *  - disque     : vraie photo vue de dessus, détourée en disque (public/images/disques/<disque>-1024/512.webp).
 *                 Les pizzas qui en ont une passent dans le grand plateau tournant de l'accueil.
 *  - fond       : couleurs du fond de l'accueil quand cette pizza est affichée
 *  Les ingrédients décrivent exactement ce que montre la photo.
 */

export const pizzas = [
  {
    id: 'margherita',
    photo: 'pizza-margherita',
    disque: 'margherita',
    fond: ['#8a2216', '#160c0a'],
    nom: 'Margherita',
    prix: 11,
    categories: ['classique', 'vegetarienne'],
    description: 'La reine de Naples, simple et parfaite.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Basilic frais', 'Huile d’olive extra vierge'],
  },
  {
    id: 'diavola',
    photo: 'pizza-diavola',
    disque: 'diavola',
    fond: ['#a3360f', '#170806'],
    nom: 'Diavola',
    prix: 14,
    categories: ['epicee'],
    description: 'Trois charcuteries, pour ceux qui aiment quand ça chauffe.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Salame piccante', 'Salami', 'Saucisse émiettée'],
  },
  {
    id: 'verde',
    photo: 'pizza-verde',
    disque: 'verde',
    fond: ['#2f5a2a', '#0b120a'],
    nom: 'Verde',
    prix: 15,
    categories: ['vegetarienne'],
    description: 'Le vert du jardin et la douceur de la burrata.',
    ingredients: ['Tomate San Marzano', 'Pousses d’épinard', 'Burrata des Pouilles', 'Huile d’olive extra vierge'],
  },
  {
    id: 'quattro-formaggi',
    photo: 'pizza-quattro-formaggi',
    nom: 'Quattro Formaggi',
    prix: 15,
    categories: ['vegetarienne'],
    description: 'Quatre fromages italiens, fondants à souhait.',
    ingredients: ['Crème fraîche', 'Fior di latte', 'Gorgonzola DOP', 'Scamorza fumée', 'Parmigiano Reggiano 24 mois'],
  },
  {
    id: 'rustica',
    photo: 'pizza-rustica',
    disque: 'rustica',
    fond: ['#8a5a14', '#150e06'],
    nom: 'Rustica',
    prix: 14.5,
    categories: ['classique'],
    description: 'La généreuse : saucisse fumée, champignons et olives.',
    ingredients: ['Fior di latte', 'Saucisse fumée', 'Champignons de Paris', 'Olives noires', 'Poivrons rouges et verts', 'Origan'],
  },
  {
    id: 'capricciosa',
    photo: 'pizza-capricciosa',
    nom: 'Capricciosa',
    prix: 14,
    categories: ['classique'],
    description: 'Un peu de tout, beaucoup de goût.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Jambon cuit', 'Salami', 'Poivrons', 'Olives noires', 'Oignon rouge'],
  },
  {
    id: 'funghi-rucola',
    photo: 'pizza-funghi-rucola',
    nom: 'Funghi e Rucola',
    prix: 13.5,
    categories: ['vegetarienne'],
    description: 'Champignons poêlés, tomates cerises et roquette fraîche.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Champignons poêlés', 'Tomates cerises', 'Roquette'],
  },
  {
    id: 'ortolana',
    photo: 'pizza-ortolana',
    nom: 'Ortolana',
    prix: 13,
    categories: ['vegetarienne'],
    description: 'Le potager sur la pâte, en couleurs.',
    ingredients: ['Fior di latte', 'Tomates', 'Poivrons jaunes et rouges', 'Oignon rouge', 'Herbes fraîches'],
  },
  {
    id: 'vivo',
    photo: 'pizza-vivo',
    nom: 'La Vivo',
    prix: 17,
    categories: [],
    signature: true,
    description: 'La signature du chef Salvatore, à partager au centre de la table.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Prosciutto crudo', 'Roquette', 'Poivrons rouges grillés'],
  },
];

export const categories = [
  { id: 'toutes', label: 'Toutes' },
  { id: 'classique', label: 'Classiques' },
  { id: 'epicee', label: 'Épicées' },
  { id: 'vegetarienne', label: 'Végétariennes' },
];

/** Pizzas du plateau tournant de l'accueil (celles qui ont une vraie photo vue de dessus). */
export const pizzasPlateau = pizzas.filter((p) => p.disque && p.photo);

export const formatPrix = (p) =>
  p.toLocaleString('fr-FR', { minimumFractionDigits: Number.isInteger(p) ? 0 : 2, maximumFractionDigits: 2 }) + ' €';

// BASE_URL = dossier de publication de la démo
const BASE = import.meta.env?.BASE_URL ?? '/';
export const disqueImage = (id, taille = 1024) => `${BASE}images/disques/${id}-${taille}.webp`;
