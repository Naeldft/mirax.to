/**
 * ============================================================
 *  PIZZAS — fichier de données à adapter pour chaque client.
 * ============================================================
 *  - categories : 'classique', 'epicee', 'vegetarienne' (servent aux filtres du menu)
 *  - sauce      : base de la pizza en 3D → 'tomate', 'creme', 'truffe' ou 'pistache'
 *  - garnitures : ce que la pizza 3D affiche (types définis dans src/three/toppings.js)
 *  - image      : visuel utilisé dans le menu (public/images/pizzas/…), remplaçable par une photo
 *  - forme      : 'ronde' (par défaut) ou 'chausson' (calzone)
 */

export const pizzas = [
  {
    id: 'margherita',
    nom: 'Margherita',
    prix: 11,
    categories: ['classique', 'vegetarienne'],
    description: 'La reine de Naples, simple et parfaite.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Basilic frais', 'Huile d’olive extra vierge'],
    sauce: 'tomate',
    garnitures: [
      { type: 'mozzarella', n: 9 },
      { type: 'basilic', n: 7 },
    ],
  },
  {
    id: 'regina',
    nom: 'Regina',
    prix: 13.5,
    categories: ['classique'],
    description: 'Le grand classique de la trattoria.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Jambon cuit aux herbes', 'Champignons de Paris', 'Origan'],
    sauce: 'tomate',
    garnitures: [
      { type: 'mozzarella', n: 7 },
      { type: 'jambon', n: 7 },
      { type: 'champignon', n: 9 },
    ],
  },
  {
    id: 'diavola',
    nom: 'Diavola',
    prix: 14,
    categories: ['epicee'],
    description: 'Pour ceux qui aiment quand ça chauffe.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Salame piccante', 'Piment de Calabre', 'Origan'],
    sauce: 'tomate',
    garnitures: [
      { type: 'mozzarella', n: 6 },
      { type: 'salami', n: 10 },
      { type: 'piment', n: 14 },
    ],
  },
  {
    id: 'quattro-formaggi',
    nom: 'Quattro Formaggi',
    prix: 15,
    categories: ['vegetarienne'],
    description: 'Quatre fromages italiens, fondants à souhait.',
    ingredients: ['Crème fraîche', 'Fior di latte', 'Gorgonzola DOP', 'Scamorza fumée', 'Parmigiano Reggiano 24 mois'],
    sauce: 'creme',
    garnitures: [
      { type: 'mozzarella', n: 6 },
      { type: 'gorgonzola', n: 6 },
      { type: 'scamorza', n: 6 },
      { type: 'parmesan', n: 16 },
    ],
  },
  {
    id: 'calzone',
    nom: 'Calzone',
    prix: 14.5,
    categories: ['classique'],
    description: 'Le chausson généreux, doré au feu de bois.',
    ingredients: ['Ricotta', 'Fior di latte', 'Jambon cuit', 'Tomate San Marzano', 'Poivre noir'],
    sauce: 'tomate',
    forme: 'chausson',
    garnitures: [
      { type: 'basilic', n: 3 },
      { type: 'parmesan', n: 8 },
    ],
  },
  {
    id: 'tartufo',
    nom: 'Tartufo',
    prix: 18,
    categories: ['vegetarienne'],
    description: 'Crème de truffe noire et champignons des bois.',
    ingredients: ['Crème de truffe noire', 'Fior di latte', 'Champignons des bois', 'Roquette', 'Copeaux de parmesan'],
    sauce: 'truffe',
    garnitures: [
      { type: 'mozzarella', n: 6 },
      { type: 'champignon', n: 8 },
      { type: 'truffe', n: 10 },
      { type: 'roquette', n: 8 },
    ],
  },
  {
    id: 'ortolana',
    nom: 'Ortolana',
    prix: 13,
    categories: ['vegetarienne'],
    description: 'Le potager grillé au feu de bois.',
    ingredients: ['Tomate San Marzano', 'Fior di latte', 'Courgette', 'Aubergine', 'Poivrons rôtis', 'Basilic'],
    sauce: 'tomate',
    garnitures: [
      { type: 'mozzarella', n: 5 },
      { type: 'courgette', n: 8 },
      { type: 'aubergine', n: 5 },
      { type: 'poivron', n: 8 },
      { type: 'basilic', n: 4 },
    ],
  },
  {
    id: 'nduja',
    nom: '’Nduja e Burrata',
    prix: 16,
    categories: ['epicee'],
    description: 'La douceur de la burrata, le feu de la ’nduja.',
    ingredients: ['Tomate San Marzano', '’Nduja de Calabre', 'Burrata des Pouilles', 'Piment', 'Basilic'],
    sauce: 'tomate',
    garnitures: [
      { type: 'nduja', n: 8 },
      { type: 'burrata', n: 1 },
      { type: 'piment', n: 8 },
      { type: 'basilic', n: 5 },
    ],
  },
  {
    id: 'vivo',
    nom: 'La Vivo',
    prix: 17,
    categories: [],
    signature: true,
    description: 'La signature du chef Salvatore : douce, croquante, inoubliable.',
    ingredients: ['Fior di latte', 'Mortadelle à la pistache', 'Stracciatella', 'Pesto de pistache', 'Zeste de citron'],
    sauce: 'pistache',
    garnitures: [
      { type: 'mozzarella', n: 5 },
      { type: 'mortadelle', n: 7 },
      { type: 'stracciatella', n: 5 },
      { type: 'pistache', n: 40 },
    ],
  },
];

export const categories = [
  { id: 'toutes', label: 'Toutes' },
  { id: 'classique', label: 'Classiques' },
  { id: 'epicee', label: 'Épicées' },
  { id: 'vegetarienne', label: 'Végétariennes' },
];

/** Pizzas proposées dans le sélecteur 3D de l'accueil (dans cet ordre). */
export const heroPizzas = ['margherita', 'diavola', 'quattro-formaggi', 'tartufo', 'calzone', 'vivo', 'regina'];

export const formatPrix = (p) =>
  p.toLocaleString('fr-FR', { minimumFractionDigits: Number.isInteger(p) ? 0 : 2, maximumFractionDigits: 2 }) + ' €';

// BASE_URL = dossier de publication (/demos/restauration/) ; '/' quand le fichier est lu par Node.
const BASE = import.meta.env?.BASE_URL ?? '/';
export const pizzaImage = (id) => `${BASE}images/pizzas/${id}.webp`;
