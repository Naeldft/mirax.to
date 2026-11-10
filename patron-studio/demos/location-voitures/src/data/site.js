/**
 * ============================================================
 *  VELOCITÀ LOCATION — textes et données (entreprise fictive).
 * ============================================================
 *  Les modèles décrivent aussi la voiture 3D (silhouette, roues, couleurs).
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const entreprise = {
  nom: 'Velocità',
  nomComplet: 'Velocità Location',
  slogan: 'Prenez la route. On s’occupe du reste.',
  accroche: 'Location de voitures · Lille & Roubaix',
  telephone: '01 99 00 27 27',
  telephoneLien: '+33199002727',
  email: 'reservation@velocita-location.fr',
  mention: 'Entreprise fictive — site de démonstration',
};

export const navigation = [
  { href: '#flotte', label: 'La flotte' },
  { href: '#fonctionnement', label: 'Comment ça marche' },
  { href: '#agences', label: 'Agences' },
  { href: '#faq', label: 'FAQ' },
];

export const couleurs = [
  { id: 'rouge', nom: 'Rouge Velocità', hex: '#c8102e' },
  { id: 'noir', nom: 'Noir Onyx', hex: '#16171a' },
  { id: 'blanc', nom: 'Blanc Glacier', hex: '#e9ecef' },
  { id: 'titane', nom: 'Gris Titane', hex: '#6b7078' },
  { id: 'bleu', nom: 'Bleu Nuit', hex: '#1d3557' },
];

/**
 * Flotte. prix : par jour (TTC). profil : silhouette 3D (voir three/carGeometry.js).
 */
export const modeles = [
  {
    id: 'citadine',
    categorie: 'Citadine',
    nom: 'Citadine Urbana',
    exemple: 'ou équivalent',
    prix: 39,
    prixWeekend: 99,
    prixSemaine: 229,
    places: 5,
    bagages: 2,
    boite: 'Manuelle',
    energie: 'Essence',
    atouts: ['Facile à garer', '5,2 L / 100 km', 'Bluetooth & CarPlay'],
    profil: 'citadine',
  },
  {
    id: 'suv',
    categorie: 'SUV',
    nom: 'SUV Altura',
    exemple: 'ou équivalent',
    prix: 69,
    prixWeekend: 169,
    prixSemaine: 389,
    places: 5,
    bagages: 4,
    boite: 'Automatique',
    energie: 'Hybride',
    atouts: ['Position de conduite haute', 'Grand coffre', 'Aide au stationnement'],
    profil: 'suv',
  },
  {
    id: 'utilitaire',
    categorie: 'Utilitaire',
    nom: 'Fourgon Cargo 12 m³',
    exemple: 'ou équivalent',
    prix: 59,
    prixWeekend: 139,
    prixSemaine: 329,
    places: 3,
    bagages: 12,
    boite: 'Manuelle',
    energie: 'Diesel',
    atouts: ['12 m³ de chargement', 'Permis B', 'Diable et sangles offerts'],
    profil: 'utilitaire',
  },
  {
    id: 'premium',
    categorie: 'Premium',
    nom: 'Coupé Gran Turismo',
    exemple: 'ou équivalent',
    prix: 119,
    prixWeekend: 289,
    prixSemaine: 690,
    places: 4,
    bagages: 2,
    boite: 'Automatique',
    energie: 'Essence',
    atouts: ['Sellerie cuir', 'Son haute fidélité', 'Le plaisir, tout simplement'],
    profil: 'premium',
  },
];

export const specsHero = ['Kilométrage 200 km / jour inclus', 'Assistance 24 h / 24', 'Annulation gratuite jusqu’à 48 h'];

export const etapes = [
  { titre: 'Réservez en ligne', texte: 'Choisissez le modèle et les dates : le prix total s’affiche tout de suite, sans frais cachés.' },
  { titre: 'Récupérez les clés', texte: 'En agence en dix minutes, ou livraison à domicile dans la métropole (29 €).' },
  {
    titre: 'Roulez l’esprit léger',
    texte: 'Assurance, assistance et kilométrage généreux inclus. Retour 7 j / 7 grâce à la boîte à clés.',
  },
];

export const chiffres = [
  { valeur: 12, suffixe: ' ans', label: 'sur la route' },
  { valeur: 25000, suffixe: '', label: 'locations' },
  { valeur: 120, suffixe: '', label: 'véhicules récents' },
  { valeur: 4.8, decimals: 1, suffixe: ' / 5', label: 'note moyenne' },
];

export const options = [
  { id: 'conducteur', label: 'Conducteur supplémentaire', prixJour: 8 },
  { id: 'siege', label: 'Siège enfant', prixJour: 5 },
  { id: 'franchise', label: 'Franchise réduite', prixJour: 12 },
];

export const agences = [
  {
    id: 'lille',
    nom: 'Lille Centre',
    adresse: '12 avenue des Phares, 59000 Lille',
    horaires: [
      ['Lundi – vendredi', '8 h – 19 h'],
      ['Samedi', '9 h – 18 h'],
      ['Dimanche', 'Retour par boîte à clés'],
    ],
  },
  {
    id: 'roubaix',
    nom: 'Roubaix',
    adresse: '3 rue du Circuit, 59100 Roubaix',
    horaires: [
      ['Lundi – vendredi', '8 h 30 – 18 h 30'],
      ['Samedi', '9 h – 13 h'],
      ['Dimanche', 'Retour par boîte à clés'],
    ],
  },
];

export const avis = [
  {
    nom: 'Julien M.',
    note: 5,
    texte: 'Réservé le matin, parti à midi. Voiture impeccable et presque neuve. Le prix affiché était le prix payé.',
  },
  { nom: 'Amandine L.', note: 5, texte: 'Le fourgon pour mon déménagement : propre, diable fourni, accueil adorable. Je reviendrai.' },
  { nom: 'Rachid T.', note: 5, texte: 'Coupé loué pour notre anniversaire de mariage. Un vrai moment, et une équipe aux petits soins.' },
  {
    nom: 'Claire D.',
    note: 4,
    texte: 'Livraison du SUV à domicile à l’heure prévue. Seul regret : j’aurais voulu le garder plus longtemps !',
  },
];

export const faq = [
  {
    q: 'Quel âge faut-il avoir pour louer ?',
    a: '21 ans minimum et deux ans de permis. Pour la catégorie Premium : 25 ans et trois ans de permis.',
  },
  {
    q: 'Quelle caution est demandée ?',
    a: 'Une empreinte de carte bancaire, non débitée : 800 € pour les citadines et utilitaires, 1 500 € pour les SUV et 2 500 € pour le Premium.',
  },
  {
    q: 'Le kilométrage est-il limité ?',
    a: '200 km par jour sont inclus, cumulables sur toute la location. Au-delà : 0,25 € par kilomètre. Forfaits illimités disponibles à la semaine.',
  },
  {
    q: 'Puis-je annuler ma réservation ?',
    a: 'Oui, gratuitement jusqu’à 48 heures avant le départ. Ensuite, la première journée de location est retenue.',
  },
  {
    q: 'Faut-il rendre le véhicule avec le plein ?',
    a: 'Oui, comme au départ. Sinon, le carburant manquant est facturé au prix de la pompe, sans frais de service.',
  },
];
