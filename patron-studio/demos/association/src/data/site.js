/**
 * ============================================================
 *  LES RACINES — textes et données (association fictive).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const asso = {
  nom: 'Les Racines',
  accroche: 'Association de quartier · Nantes Est',
  intro:
    'Depuis 2014, on fait pousser des liens entre voisins : un jardin, des devoirs, des réparations et une épicerie, ouverts à toutes et à tous.',
  adresse: 'Maison des Racines, 4 allée des Tilleuls, 44300 Nantes',
  telephone: '01 99 00 47 47',
  telephoneLien: '+33199004747',
  email: 'contact@les-racines.org',
  horaires: [
    ['Mardi', '16 h – 19 h'],
    ['Mercredi', '14 h – 19 h'],
    ['Samedi', '9 h – 13 h'],
  ],
  mention: 'Association fictive — site de démonstration',
  rna: 'W000000000 (fictif)',
};

export const navigation = [
  { href: '#actions', label: 'Nos actions' },
  { href: '#agenda', label: 'Agenda' },
  { href: '#benevole', label: 'Bénévolat' },
  { href: '#soutenir', label: 'Soutenir' },
];

export const actions = [
  {
    id: 'jardin',
    titre: 'Le jardin partagé',
    texte: '40 parcelles, un composteur collectif et des ateliers semis pour les enfants du quartier.',
    quand: 'Mercredi et samedi',
    couleur: '#7fb069',
    icone: 'M12 22V12m0 0C12 7 8 4 3 4c0 5 4 8 9 8Zm0 0c0-5 4-8 9-8 0 5-4 8-9 8Z',
  },
  {
    id: 'devoirs',
    titre: 'L’aide aux devoirs',
    texte: 'Du CP à la 3e, des bénévoles accompagnent chaque semaine plus de 60 élèves.',
    quand: 'Mardi, 16 h 30 – 18 h 30',
    couleur: '#4a7bd0',
    icone: 'M4 5h7a2 2 0 0 1 2 2v13a2 2 0 0 0-2-2H4V5Zm16 0h-5a2 2 0 0 0-2 2v13a2 2 0 0 1 2-2h5V5Z',
  },
  {
    id: 'repair',
    titre: 'Le repair café',
    texte: 'Grille-pain, vélo ou ourlet : on répare ensemble plutôt que de jeter. Gratuit.',
    quand: '1er samedi du mois',
    couleur: '#f2b84b',
    icone: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.5 2.5-2.4-.6-.6-2.4 2.5-2.5Z',
  },
  {
    id: 'epicerie',
    titre: 'L’épicerie solidaire',
    texte: 'Des produits frais et de base à 30 % du prix, pour 120 familles accompagnées.',
    quand: 'Mercredi, 14 h – 19 h',
    couleur: '#e5533d',
    icone: 'M5 8h14l-1.5 12h-11L5 8Zm4 0V6a3 3 0 0 1 6 0v2',
  },
];

export const impact = [
  { valeur: 312, suffixe: '', label: 'adhérents' },
  { valeur: 85, suffixe: '', label: 'bénévoles actifs' },
  { valeur: 1.4, suffixe: ' t', decimales: 1, label: 'de déchets évités au repair café' },
  { valeur: 120, suffixe: '', label: 'familles à l’épicerie' },
];

/** Agenda : dates fictives sur la saison. */
export const agenda = [
  {
    id: 'a1',
    date: '2026-11-21',
    heure: '9 h 30',
    titre: 'Plantation des haies fruitières',
    lieu: 'Jardin partagé',
    type: 'jardin',
    places: 25,
    inscrits: 18,
  },
  {
    id: 'a2',
    date: '2026-12-05',
    heure: '10 h',
    titre: 'Repair café spécial jouets',
    lieu: 'Maison des Racines',
    type: 'repair',
    places: 30,
    inscrits: 22,
  },
  {
    id: 'a3',
    date: '2026-12-12',
    heure: '15 h',
    titre: 'Atelier biscuits de Noël',
    lieu: 'Cuisine partagée',
    type: 'epicerie',
    places: 16,
    inscrits: 15,
  },
  {
    id: 'a4',
    date: '2026-12-19',
    heure: '18 h',
    titre: 'Repas de quartier de fin d’année',
    lieu: 'Salle des Tilleuls',
    type: 'fete',
    places: 120,
    inscrits: 74,
  },
  {
    id: 'a5',
    date: '2027-01-09',
    heure: '10 h',
    titre: 'Assemblée générale',
    lieu: 'Maison des Racines',
    type: 'asso',
    places: 200,
    inscrits: 41,
  },
  {
    id: 'a6',
    date: '2027-01-23',
    heure: '14 h',
    titre: 'Taille des arbres fruitiers',
    lieu: 'Jardin partagé',
    type: 'jardin',
    places: 15,
    inscrits: 6,
  },
];

export const missions = ['Jardin', 'Aide aux devoirs', 'Repair café', 'Épicerie', 'Événements', 'Communication'];
export const disponibilites = ['En semaine (journée)', 'En semaine (soir)', 'Le week-end', 'Ponctuellement'];

export const montantsDon = [20, 50, 100, 200];
export const reductionImpot = 0.66;

export const adhesions = [
  { id: 'reduit', nom: 'Tarif réduit', prix: 5, texte: 'Étudiants, demandeurs d’emploi, minima sociaux' },
  { id: 'individuel', nom: 'Individuelle', prix: 12, texte: 'Accès à toutes les activités, vote en AG', vedette: true },
  { id: 'famille', nom: 'Famille', prix: 20, texte: 'Tout le foyer, enfants compris' },
  { id: 'soutien', nom: 'Soutien', prix: 40, texte: 'Pour aller plus loin et nous aider à grandir' },
];

export const faq = [
  {
    q: 'Faut-il être adhérent pour participer ?',
    a: 'Non, la plupart des activités sont ouvertes à tous. L’adhésion (dès 5 €) permet de voter en assemblée générale et de réserver une parcelle au jardin.',
  },
  {
    q: 'Mon don est-il déductible des impôts ?',
    a: 'Oui : Les Racines est reconnue d’intérêt général. 66 % de votre don est déductible de l’impôt sur le revenu, dans la limite de 20 % du revenu imposable. Un reçu fiscal vous est envoyé.',
  },
  {
    q: 'Je n’ai que deux heures par mois, c’est utile ?',
    a: 'Absolument. Beaucoup de bénévoles donnent un coup de main ponctuel : un repair café, un repas de quartier, une distribution.',
  },
  {
    q: 'Comment réserver une parcelle au jardin ?',
    a: 'Les parcelles sont attribuées chaque année en mars, par tirage au sort entre les adhérents inscrits sur la liste d’attente.',
  },
];
