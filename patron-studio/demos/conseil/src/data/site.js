/**
 * ============================================================
 *  CAP HORIZON — textes et données (cabinet de conseil fictif).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const cabinet = {
  nom: 'Cap Horizon',
  accroche: 'Conseil aux dirigeants de TPE & PME · Lille',
  intro: 'Stratégie, finance, organisation : on vous aide à décider vite et bien, avec des chiffres clairs et un plan d’action concret.',
  adresse: '12 place du Théâtre, 59800 Lille',
  telephone: '01 99 00 31 31',
  telephoneLien: '+33199003131',
  email: 'bonjour@cap-horizon.fr',
  zone: 'Lille Métropole et Hauts-de-France · rendez-vous en visio partout en France',
  mention: 'Cabinet fictif — site de démonstration',
};

export const navigation = [
  { href: '#expertises', label: 'Expertises' },
  { href: '#diagnostic', label: 'Diagnostic express' },
  { href: '#offres', label: 'Offres' },
  { href: '#rendez-vous', label: 'Rendez-vous' },
];

export const chiffres = [
  { valeur: 140, suffixe: '+', label: 'dirigeants accompagnés' },
  { valeur: 18, suffixe: ' %', label: 'de marge gagnée en moyenne*' },
  { valeur: 9, suffixe: '/10', label: 'recommandent le cabinet' },
];

export const expertises = [
  {
    id: 'strategie',
    titre: 'Stratégie & développement',
    texte: 'Positionnement, nouveaux marchés, business plan, levée de fonds ou reprise d’entreprise.',
    livrables: ['Business plan chiffré', 'Plan d’action à 12 mois'],
  },
  {
    id: 'finance',
    titre: 'Finance & pilotage',
    texte: 'Tableaux de bord, prix de revient, trésorerie prévisionnelle : savoir où vous en êtes chaque mois.',
    livrables: ['Tableau de bord mensuel', 'Prévisionnel de trésorerie'],
  },
  {
    id: 'organisation',
    titre: 'Organisation & équipes',
    texte: 'Rôles, recrutements clés, process : libérer du temps au dirigeant sans perdre en qualité.',
    livrables: ['Organigramme cible', 'Fiches de poste et rituels'],
  },
  {
    id: 'numerique',
    titre: 'Transition numérique',
    texte: 'Choisir les bons outils (gestion, CRM, site), les déployer et former vos équipes.',
    livrables: ['Cartographie des outils', 'Cahier des charges'],
  },
];

export const methode = [
  { titre: 'Diagnostic', duree: 'Semaine 1', texte: 'Entretiens, chiffres, visite : une photo honnête de votre entreprise.' },
  { titre: 'Feuille de route', duree: 'Semaine 2', texte: '3 à 5 priorités, chiffrées, avec un responsable et une date pour chacune.' },
  { titre: 'Accompagnement', duree: 'Mois 1 à 6', texte: 'Un point par mois, un tableau de bord partagé, des ajustements rapides.' },
  { titre: 'Bilan', duree: 'Mois 6', texte: 'Résultats mesurés contre les objectifs. Vous continuez seul, ou avec nous.' },
];

export const offres = [
  {
    id: 'flash',
    nom: 'Diagnostic flash',
    prix: '490 €',
    unite: 'HT · 1 journée',
    points: ['Analyse de vos comptes et indicateurs', 'Entretien de 3 h avec le dirigeant', 'Rapport et 3 priorités sous 5 jours'],
  },
  {
    id: 'cap',
    nom: 'Accompagnement Cap',
    prix: '890 €',
    unite: 'HT / mois · 6 mois',
    points: [
      'Diagnostic flash inclus',
      'Une demi-journée par mois',
      'Tableau de bord mis à jour',
      'Réponse sous 24 h entre deux rendez-vous',
    ],
    vedette: true,
  },
  {
    id: 'mission',
    nom: 'Mission sur mesure',
    prix: 'Sur devis',
    unite: 'selon le périmètre',
    points: ['Business plan, reprise, levée de fonds', 'Réorganisation, recrutement clé', 'Déploiement d’outils'],
  },
];

export const cas = [
  {
    client: 'Menuiserie familiale, 14 salariés',
    defi: 'Chiffre d’affaires en hausse mais trésorerie toujours tendue.',
    action: 'Calcul du prix de revient par chantier, relance clients, acomptes systématiques.',
    resultats: [
      ['+9 pts', 'de marge brute'],
      ['−32 j', 'de délai de paiement'],
    ],
  },
  {
    client: 'Agence de voyages, 6 salariés',
    defi: 'Dirigeante débordée, impossible de prendre des congés.',
    action: 'Nouvelle organisation, recrutement d’une responsable d’agence, outils partagés.',
    resultats: [
      ['−12 h', 'par semaine pour la dirigeante'],
      ['+21 %', 'de ventes en ligne'],
    ],
  },
  {
    client: 'Restaurant & traiteur, 22 salariés',
    defi: 'Projet d’un second établissement, besoin d’un financement bancaire.',
    action: 'Business plan, prévisionnel sur 3 ans, préparation des rendez-vous bancaires.',
    resultats: [
      ['380 k€', 'de prêt obtenu'],
      ['8 mois', 'de la décision à l’ouverture'],
    ],
  },
];

export const avis = [
  {
    nom: 'Julien V.',
    role: 'Gérant, menuiserie',
    texte: 'Pour la première fois, je sais chaque mois si je gagne de l’argent. Ça change tout.',
  },
  {
    nom: 'Sarah K.',
    role: 'Fondatrice, agence de voyages',
    texte: 'Clairs, directs, jamais de jargon. Et ils sont là quand on en a besoin.',
  },
];

export const faq = [
  {
    q: 'Le premier rendez-vous est-il payant ?',
    a: 'Non. Le premier échange de 45 minutes est offert et sans engagement : on regarde ensemble si et comment on peut vous aider.',
  },
  {
    q: 'Travaillez-vous avec mon expert-comptable ?',
    a: 'Oui, systématiquement. Il produit les comptes, nous vous aidons à les lire et à décider. Les deux métiers se complètent.',
  },
  {
    q: 'Existe-t-il des aides pour financer le conseil ?',
    a: 'Certains dispositifs régionaux ou de branche peuvent prendre en charge une partie d’une mission de conseil. Nous vous aidons à vérifier votre éligibilité.',
  },
  {
    q: 'Mes données sont-elles confidentielles ?',
    a: 'Oui. Un engagement de confidentialité est signé avant toute transmission de document.',
  },
];

export const sujets = ['Stratégie', 'Finance & trésorerie', 'Organisation', 'Numérique', 'Reprise / création', 'Je ne sais pas encore'];
