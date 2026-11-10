/**
 * ============================================================
 *  ONDINE PLOMBERIE — textes et données (entreprise fictive).
 *  Pour un vrai client : modifiez ce fichier, le reste suit.
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const entreprise = {
  nom: 'Ondine',
  nomComplet: 'Ondine Plomberie',
  slogan: 'L’eau, on la maîtrise.',
  accroche: 'Plombier chauffagiste · Lille et métropole',
  intro:
    'Fuite, canalisation bouchée, chauffe-eau en panne ou salle de bain à refaire : un plombier qualifié chez vous rapidement, avec un devis clair avant toute intervention.',
  telephone: '01 99 00 18 18',
  telephoneLien: '+33199001818',
  email: 'contact@ondine-plomberie.fr',
  adresse: '7 rue des Canaux, 59000 Lille',
  siret: 'Entreprise fictive — site de démonstration',
};

export const navigation = [
  { href: '#services', label: 'Services' },
  { href: '#realisations', label: 'Réalisations' },
  { href: '#methode', label: 'Méthode' },
  { href: '#zone', label: 'Zone' },
  { href: '#faq', label: 'FAQ' },
];

/** Étapes affichées pendant l'assemblage 3D de l'accueil. */
export const etapesHero = [
  { titre: 'On diagnostique', texte: 'Recherche de fuite sans casse, caméra et détection.' },
  { titre: 'On répare', texte: 'Pièces de qualité, raccords en cuivre, travail propre.' },
  { titre: 'Ça coule de source', texte: 'Tout est testé devant vous avant notre départ.' },
];

export const services = [
  {
    id: 'fuite',
    titre: 'Recherche et réparation de fuite',
    texte: 'Détection sans casse, réparation sur place dans la plupart des cas.',
    prix: 89,
    prefixe: 'dès',
    icone: 'goutte',
  },
  {
    id: 'debouchage',
    titre: 'Débouchage',
    texte: 'Évier, WC, douche ou colonne : furet, hydrocurage, caméra.',
    prix: 99,
    prefixe: 'dès',
    icone: 'debouchage',
  },
  {
    id: 'chauffe-eau',
    titre: 'Chauffe-eau',
    texte: 'Dépannage, détartrage ou remplacement, ballon posé et raccordé.',
    prix: 690,
    prefixe: 'posé dès',
    icone: 'ballon',
  },
  {
    id: 'robinetterie',
    titre: 'Robinetterie',
    texte: 'Mitigeur, mécanisme de chasse, joints : remplacé dans l’heure.',
    prix: 69,
    prefixe: 'dès',
    icone: 'robinet',
  },
  {
    id: 'chaudiere',
    titre: 'Entretien chaudière',
    texte: 'Visite annuelle obligatoire, attestation remise le jour même.',
    prix: 109,
    prefixe: '',
    icone: 'flamme',
  },
  {
    id: 'salle-de-bain',
    titre: 'Salle de bain clés en main',
    texte: 'Douche à l’italienne, meuble vasque, carrelage : un seul interlocuteur.',
    prix: null,
    prefixe: 'sur devis',
    icone: 'douche',
  },
];

export const chiffres = [
  { valeur: 15, suffixe: ' ans', label: 'd’expérience' },
  { valeur: 4800, suffixe: '', label: 'interventions réalisées' },
  { valeur: 98, suffixe: ' %', label: 'de clients satisfaits' },
  { valeur: 45, suffixe: ' min', label: 'délai moyen en urgence' },
];

/** Réalisations : comparaison avant / après (illustrations dessinées en code). */
export const realisations = [
  {
    id: 'sdb',
    titre: 'Salle de bain, Lambersart',
    texte: 'Baignoire remplacée par une douche à l’italienne, nouvelle arrivée d’eau en multicouche.',
    duree: '6 jours',
    scene: 'salle-de-bain',
  },
  {
    id: 'chaufferie',
    titre: 'Chaufferie, Roubaix',
    texte: 'Chauffe-eau de 200 L et réseau cuivre refaits à neuf dans une maison des années 1930.',
    duree: '2 jours',
    scene: 'chaufferie',
  },
  {
    id: 'cuisine',
    titre: 'Cuisine, Lille Vauban',
    texte: 'Évacuation déplacée et évier sous fenêtre, sans toucher au carrelage existant.',
    duree: '1 jour',
    scene: 'cuisine',
  },
];

export const methode = [
  { titre: 'Vous appelez', texte: 'Un plombier vous répond, pas un standard. On qualifie le problème en deux minutes.' },
  { titre: 'Devis avant tout', texte: 'Sur place, prix annoncé et signé avant de commencer. Aucune surprise sur la facture.' },
  { titre: 'Intervention propre', texte: 'Protection des sols, outillage adapté, chantier laissé net.' },
  { titre: 'Garantie', texte: 'Pièces et main d’œuvre garanties. On revient si quelque chose ne va pas.' },
];

export const zone = {
  texte: 'Nous intervenons dans toute la métropole lilloise, déplacement inclus dans nos tarifs.',
  // x, y : position sur la carte stylisée (0 – 100)
  communes: [
    { nom: 'Lille', x: 48, y: 58, principale: true },
    { nom: 'Roubaix', x: 74, y: 30 },
    { nom: 'Tourcoing', x: 66, y: 18 },
    { nom: 'Villeneuve-d’Ascq', x: 72, y: 60 },
    { nom: 'Marcq-en-Barœul', x: 56, y: 38 },
    { nom: 'Lambersart', x: 36, y: 46 },
    { nom: 'La Madeleine', x: 50, y: 46 },
    { nom: 'Wasquehal', x: 66, y: 42 },
    { nom: 'Croix', x: 70, y: 36 },
    { nom: 'Lomme', x: 30, y: 58 },
    { nom: 'Mons-en-Barœul', x: 60, y: 54 },
    { nom: 'Loos', x: 38, y: 70 },
  ],
};

export const horaires = [
  { jours: 'Lundi – samedi', heures: '7 h – 20 h' },
  { jours: 'Urgences', heures: '7 j / 7, 24 h / 24' },
];

export const avis = [
  {
    nom: 'Sophie R.',
    ville: 'Lille',
    note: 5,
    texte: 'Fuite sous l’évier un dimanche matin. Rappelée en cinq minutes, plombier sur place en quarante. Prix annoncé, prix payé.',
  },
  {
    nom: 'Karim B.',
    ville: 'Roubaix',
    note: 5,
    texte: 'Chauffe-eau changé dans la journée, explications claires et chantier impeccable. Je recommande sans hésiter.',
  },
  {
    nom: 'Hélène et Paul',
    ville: 'Lambersart',
    note: 5,
    texte: 'Notre salle de bain a été entièrement refaite. Délais tenus, finitions soignées, équipe très respectueuse.',
  },
  {
    nom: 'Thomas V.',
    ville: 'Tourcoing',
    note: 4,
    texte: 'Débouchage efficace d’une canalisation ancienne, avec passage caméra. Bon contact, tarif correct.',
  },
];

export const faq = [
  {
    q: 'Combien coûte un déplacement ?',
    a: 'Le déplacement est inclus dans nos tarifs pour toute la métropole lilloise. Vous ne payez que l’intervention, au prix annoncé avant de commencer.',
  },
  {
    q: 'Intervenez-vous le week-end et la nuit ?',
    a: 'Oui, pour les urgences (fuite, dégât des eaux, absence d’eau chaude en hiver), 7 jours sur 7 et 24 heures sur 24. Une majoration de nuit et de dimanche vous est annoncée au téléphone.',
  },
  {
    q: 'Le devis est-il vraiment gratuit ?',
    a: 'Oui. Pour les travaux (salle de bain, remplacement de chauffe-eau, réseau), nous nous déplaçons et chiffrons gratuitement, sans engagement.',
  },
  {
    q: 'Travaillez-vous avec les assurances ?',
    a: 'Nous rédigeons un rapport de recherche de fuite et une facture détaillée, acceptés par les assureurs pour vos démarches de dégât des eaux.',
  },
  {
    q: 'Quels moyens de paiement acceptez-vous ?',
    a: 'Carte bancaire, virement et chèque. Pour les gros travaux, un acompte de 30 % est demandé à la commande.',
  },
];

export const typesIntervention = [
  { id: 'fuite', label: 'Fuite' },
  { id: 'debouchage', label: 'Débouchage' },
  { id: 'chauffe-eau', label: 'Chauffe-eau' },
  { id: 'salle-de-bain', label: 'Salle de bain' },
  { id: 'autre', label: 'Autre' },
];

export const creneaux = ['Dès que possible', 'Matin (8 h – 12 h)', 'Après-midi (13 h – 17 h)', 'Fin de journée (17 h – 20 h)'];
