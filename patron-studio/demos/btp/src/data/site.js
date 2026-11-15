/**
 * ============================================================
 *  BÂTI NORD CONSTRUCTION — textes et données (entreprise fictive).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const entreprise = {
  nom: 'Bâti Nord',
  nomComplet: 'Bâti Nord Construction',
  slogan: 'On bâtit. Vous emménagez.',
  accroche: 'Construction · Extension · Rénovation — Métropole lilloise',
  intro:
    'Maisons individuelles, extensions et rénovations lourdes, de la dalle aux finitions. Un seul interlocuteur, un planning tenu, une garantie décennale.',
  telephone: '01 99 00 59 59',
  telephoneLien: '+33199005959',
  email: 'chantiers@batinord-construction.fr',
  adresse: '41 rue des Charpentiers, 59650 Villeneuve-d’Ascq',
  mention: 'Entreprise fictive — site de démonstration',
};

export const navigation = [
  { href: '#services', label: 'Services' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#methode', label: 'Méthode' },
  { href: '#zone', label: 'Zone' },
  { href: '#faq', label: 'FAQ' },
];

/** Étapes du chantier affichées pendant la construction 3D (seuil = avancement du défilement). */
export const phases = [
  { seuil: 0, nom: 'Fondations', texte: 'Terrassement, semelles et dalle béton.' },
  { seuil: 0.18, nom: 'Rez-de-chaussée', texte: 'Murs porteurs en blocs béton.' },
  { seuil: 0.45, nom: 'Étage', texte: 'Plancher, ossature et bardage bois.' },
  { seuil: 0.68, nom: 'Toiture', texte: 'Charpente et couverture.' },
  { seuil: 0.86, nom: 'Clés en main', texte: 'Menuiseries, finitions, réception.' },
];

/** Services. tarif : prix indicatif (min), unite : affichage. Utilisé aussi par l'estimateur du devis. */
export const services = [
  {
    id: 'maison',
    titre: 'Maison individuelle',
    texte: 'Plans, permis et construction clés en main, du terrassement à la remise des clés.',
    tarif: 1650,
    tarifMax: 2200,
    unite: '€ / m²',
    estimable: true,
  },
  {
    id: 'extension',
    titre: 'Extension',
    texte: 'Pièce de vie, suite parentale ou étage supplémentaire, raccordés à l’existant.',
    tarif: 1900,
    tarifMax: 2600,
    unite: '€ / m²',
    estimable: true,
  },
  {
    id: 'renovation',
    titre: 'Rénovation globale',
    texte: 'Isolation, réseaux, cloisons, sols : votre maison remise à neuf.',
    tarif: 650,
    tarifMax: 1200,
    unite: '€ / m²',
    estimable: true,
  },
  {
    id: 'gros-oeuvre',
    titre: 'Gros œuvre & maçonnerie',
    texte: 'Fondations, murs, dalles et planchers pour particuliers et professionnels.',
    tarif: null,
    unite: 'sur devis',
  },
  {
    id: 'porteur',
    titre: 'Ouverture de mur porteur',
    texte: 'Étude de structure, étaiement, pose de poutre IPN, finitions.',
    tarif: 2400,
    unite: '€ l’ouverture',
  },
  {
    id: 'terrasse',
    titre: 'Dalle & terrasse béton',
    texte: 'Dalle armée, béton désactivé ou balayé, évacuation des eaux.',
    tarif: 95,
    tarifMax: 140,
    unite: '€ / m²',
    estimable: true,
  },
];

export const chiffres = [
  { valeur: 25, suffixe: ' ans', label: 'de métier' },
  { valeur: 180, suffixe: '', label: 'maisons livrées' },
  { valeur: 10, suffixe: ' ans', label: 'de garantie décennale' },
  { valeur: 98, suffixe: ' %', label: 'de chantiers livrés à la date prévue' },
];

/** Réalisations. type : filtre. Chaque réalisation a sa vraie photo : le titre décrit ce que la photo montre. */
export const realisations = [
  {
    id: 1,
    photo: 'realisation-maison-contemporaine', // photos/realisation-maison-contemporaine.jpg
    alt: 'Maison contemporaine à bardage bois sombre et grandes baies vitrées, éclairée au crépuscule',
    type: 'maison',
    titre: 'Maison contemporaine',
    lieu: 'Bondues',
    surface: '142 m²',
    duree: '9 mois',
  },
  {
    id: 2,
    photo: 'realisation-extension-cuisine', // photos/realisation-extension-cuisine.jpg
    alt: 'Cuisine ouverte avec fenêtre au-dessus de l’évier, meubles gris anthracite',
    type: 'extension',
    titre: 'Extension cuisine',
    lieu: 'Marcq-en-Barœul',
    surface: '35 m²',
    duree: '3 mois',
  },
  {
    id: 3,
    photo: 'realisation-plain-pied', // photos/realisation-plain-pied.jpg
    alt: 'Maison de plain-pied en brique et enduit blanc, pelouse au premier plan',
    type: 'maison',
    titre: 'Maison de plain-pied',
    lieu: 'Templemars',
    surface: '132 m²',
    duree: '8 mois',
  },
  {
    id: 4,
    photo: 'realisation-maison-familiale', // photos/realisation-maison-familiale.jpg
    alt: 'Maison familiale à toit pentu entre les arbres, lumière du soir',
    type: 'maison',
    titre: 'Maison familiale',
    lieu: 'Villeneuve-d’Ascq',
    surface: '118 m²',
    duree: '8 mois',
  },
  {
    id: 5,
    photo: 'realisation-maison-architecte', // photos/realisation-maison-architecte.jpg
    alt: 'Maison contemporaine : enduit blanc, volume bardé de bois rouge, grandes baies vitrées',
    type: 'maison',
    titre: 'Maison d’architecte',
    lieu: 'Lille Fives',
    surface: '165 m²',
    duree: '10 mois',
  },
  {
    id: 6,
    photo: 'realisation-maison-de-ville', // photos/realisation-maison-de-ville.jpg
    alt: 'Maison de ville étroite à façade enduite, entrée éclairée',
    type: 'renovation',
    titre: 'Maison de ville rénovée',
    lieu: 'Roubaix',
    surface: '96 m²',
    duree: '5 mois',
  },
];

export const filtres = [
  { id: 'tout', label: 'Tout' },
  { id: 'maison', label: 'Maisons' },
  { id: 'extension', label: 'Extensions' },
  { id: 'renovation', label: 'Rénovations' },
];

export const methode = [
  {
    titre: 'Étude & devis',
    duree: '2 semaines',
    texte: 'Visite du terrain ou de la maison, besoins, budget. Devis détaillé poste par poste, gratuit.',
  },
  {
    titre: 'Plans & permis',
    duree: '1 à 3 mois',
    texte: 'Plans par notre architecte partenaire, dépôt du permis ou de la déclaration préalable.',
  },
  {
    titre: 'Chantier',
    duree: 'selon projet',
    texte: 'Un conducteur de travaux unique, un point hebdomadaire et des photos à chaque étape.',
  },
  {
    titre: 'Réception',
    duree: '1 jour',
    texte: 'Visite de fin de chantier ensemble, levée des réserves, remise des clés et des garanties.',
  },
];

export const garanties = ['Garantie décennale', 'Parfait achèvement', 'Assurance dommages-ouvrage', 'Prix ferme et définitif'];

export const zone = [
  'Lille',
  'Villeneuve-d’Ascq',
  'Roubaix',
  'Tourcoing',
  'Marcq-en-Barœul',
  'Lambersart',
  'Bondues',
  'Seclin',
  'Armentières',
  'Templemars',
  'Wambrechies',
  'Lesquin',
];

export const horaires = [
  ['Lundi – vendredi', '7 h 30 – 18 h'],
  ['Samedi', 'Sur rendez-vous'],
];

export const avis = [
  {
    nom: 'Famille Lefebvre',
    projet: 'Maison neuve, Bondues',
    note: 5,
    texte: 'Neuf mois annoncés, neuf mois tenus. Un seul interlocuteur du début à la fin, et des photos du chantier chaque semaine.',
  },
  {
    nom: 'Nadia et Olivier',
    projet: 'Extension, Marcq-en-Barœul',
    note: 5,
    texte: 'Notre cuisine s’ouvre enfin sur le jardin. Équipe propre, ponctuelle, et un résultat au-delà de nos attentes.',
  },
  {
    nom: 'Bertrand P.',
    projet: 'Rénovation, Roubaix',
    note: 5,
    texte: 'Une maison de 1920 remise à neuf sans mauvaise surprise sur le budget. Je recommande les yeux fermés.',
  },
];

export const faq = [
  {
    q: 'Le devis est-il gratuit ?',
    a: 'Oui. Nous nous déplaçons gratuitement, puis vous recevez un devis détaillé poste par poste sous deux semaines, sans engagement.',
  },
  {
    q: 'Gérez-vous le permis de construire ?',
    a: 'Oui, avec notre architecte partenaire : plans, dossier complet et suivi auprès de la mairie jusqu’à l’obtention.',
  },
  {
    q: 'Le prix peut-il changer en cours de chantier ?',
    a: 'Non : le prix signé est ferme et définitif, sauf si vous demandez vous-même des travaux supplémentaires, chiffrés à part avant exécution.',
  },
  {
    q: 'Quelles garanties avez-vous ?',
    a: 'Garantie décennale, garantie de parfait achèvement d’un an, garantie biennale sur les équipements. Les attestations sont jointes au devis.',
  },
  {
    q: 'Peut-on habiter la maison pendant une rénovation ?',
    a: 'Souvent, oui : nous organisons le chantier par zones pour que vous gardiez une cuisine et une salle d’eau utilisables.',
  },
];

export const delais = ['Dans les 3 mois', 'Dans 3 à 6 mois', 'Dans plus de 6 mois', 'Je me renseigne'];
