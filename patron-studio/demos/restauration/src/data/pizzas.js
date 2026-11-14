/**
 * ============================================================
 *  PIZZAS — fichier de données à adapter pour chaque client.
 * ============================================================
 *  - categories : 'classique', 'epicee', 'vegetarienne' (filtres du menu)
 *  - photo      : photo du menu (photos/<photo>.jpg → public/images/<photo>-800/1600.webp)
 *                 null = pas encore de vraie photo : un emplacement neutre est affiché (voir photos/LISEZ-MOI.md)
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
    id: 'regina',
    photo: null, // emplacement : photos/pizza-regina.jpg
    nom: 'Regina',
    prix: 13.5,
    categories: ['classique'],
    description: 'Le grand classique de la trattoria.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Jambon cuit aux herbes', 'Champignons de Paris', 'Origan'],
  },
  {
    id: 'calzone',
    photo: null, // emplacement : photos/pizza-calzone.jpg
    nom: 'Calzone',
    prix: 14.5,
    categories: ['classique'],
    description: 'Le chausson généreux, doré au feu de bois.',
    ingredients: ['Ricotta', 'Fior di latte', 'Jambon cuit', 'Tomate San Marzano', 'Poivre noir'],
  },
  {
    id: 'tartufo',
    photo: null, // emplacement : photos/pizza-tartufo.jpg
    nom: 'Tartufo',
    prix: 18,
    categories: ['vegetarienne'],
    description: 'Crème de truffe noire et champignons des bois.',
    ingredients: ['Crème de truffe noire', 'Fior di latte', 'Champignons des bois', 'Roquette', 'Copeaux de parmesan'],
  },
  {
    id: 'ortolana',
    photo: null, // emplacement : photos/pizza-ortolana.jpg
    nom: 'Ortolana',
    prix: 13,
    categories: ['vegetarienne'],
    description: 'Le potager grillé au feu de bois.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Courgette', 'Aubergine', 'Poivrons rôtis', 'Basilic'],
  },
  {
    id: 'vivo',
    photo: null, // emplacement : photos/pizza-vivo.jpg
    nom: 'La Vivo',
    prix: 17,
    categories: [],
    signature: true,
    description: 'La signature du chef Salvatore : douce, croquante, inoubliable.',
    ingredients: ['Fior di latte', 'Mortadelle à la pistache', 'Stracciatella', 'Pesto de pistache', 'Zeste de citron'],
  },
];

export const categories = [
  { id: 'toutes', label: 'Toutes' },
  { id: 'classique', label: 'Classiques' },
  { id: 'epicee', label: 'Épicées' },
  { id: 'vegetarienne', label: 'Végétariennes' },
];

/** Pizzas du plateau tournant de l'accueil (celles qui ont une vraie photo vue de dessus). */
export const pizzasPlateau = pizzas.filter((p) => p.disque);

export const formatPrix = (p) =>
  p.toLocaleString('fr-FR', { minimumFractionDigits: Number.isInteger(p) ? 0 : 2, maximumFractionDigits: 2 }) + ' €';

// BASE_URL = dossier de publication de la démo
const BASE = import.meta.env?.BASE_URL ?? '/';
export const disqueImage = (id, taille = 1024) => `${BASE}images/disques/${id}-${taille}.webp`;
