/**
 * ============================================================
 *  PULSE COACHING — textes et données (coach fictif).
 * ============================================================
 *  Numéro de téléphone : tranche 01 99 00 … réservée à la fiction.
 */

export const coach = {
  nom: 'Pulse Coaching',
  prenom: 'Malik',
  slogan: 'Plus fort. Chaque semaine.',
  accroche: 'Coach sportif · Lille & en ligne',
  intro: 'Coaching sur mesure en salle, en extérieur ou à domicile. Un programme clair, un suivi chaque semaine, des résultats qui durent.',
  telephone: '01 99 00 75 75',
  telephoneLien: '+33199007575',
  email: 'go@pulse-coaching.fr',
  lieu: 'Studio Pulse, 14 quai de l’Effort, 59000 Lille',
  mention: 'Coach fictif — site de démonstration',
};

export const navigation = [
  { href: '#programmes', label: 'Programmes' },
  { href: '#methode', label: 'Méthode' },
  { href: '#planning', label: 'Planning' },
  { href: '#coach', label: 'Le coach' },
];

export const programmes = [
  {
    id: 'decouverte',
    nom: 'Séance découverte',
    prix: 'Offerte',
    unite: '45 min',
    points: ['Bilan de forme', 'Objectifs et plan sur 3 mois', 'Sans engagement'],
    vedette: false,
  },
  {
    id: 'solo',
    nom: 'Coaching individuel',
    prix: '55 €',
    unite: 'la séance',
    points: ['Programme 100 % personnalisé', 'Suivi entre les séances', 'Pack 10 séances : 490 €'],
    vedette: true,
  },
  {
    id: 'duo',
    nom: 'Duo',
    prix: '35 €',
    unite: 'par personne',
    points: ['À deux, plus motivant', 'Même exigence', 'Idéal en couple ou entre amis'],
    vedette: false,
  },
  {
    id: 'groupe',
    nom: 'Small group',
    prix: '15 €',
    unite: 'la séance',
    points: ['6 personnes maximum', 'Circuits et cardio', 'Carte 10 séances : 130 €'],
    vedette: false,
  },
  {
    id: 'enligne',
    nom: 'Programme en ligne',
    prix: '39 €',
    unite: 'par mois',
    points: ['Séances vidéo à la maison', 'Point visio mensuel', 'Sans engagement'],
    vedette: false,
  },
];

export const piliers = [
  { titre: 'Force', texte: 'Des mouvements simples, bien exécutés, progressivement plus lourds. La base de tout.' },
  { titre: 'Mobilité', texte: 'Articulations souples, dos protégé : on bouge mieux au quotidien, pas seulement à la salle.' },
  { titre: 'Nutrition', texte: 'Pas de régime : des habitudes réalistes, adaptées à votre vie et à vos goûts.' },
];

export const chiffres = [
  { valeur: 8, suffixe: ' ans', label: 'de coaching' },
  { valeur: 640, suffixe: '', label: 'personnes accompagnées' },
  { valeur: 92, suffixe: ' %', label: 'atteignent leur objectif à 3 mois' },
  { valeur: 4.9, decimals: 1, suffixe: ' / 5', label: 'note moyenne' },
];

/** Planning hebdomadaire. type : 'solo' | 'groupe' | 'duo'. */
export const jours = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'];
export const planning = [
  { jour: 'Lun', heure: '7:00', type: 'groupe', titre: 'Cardio matin' },
  { jour: 'Lun', heure: '18:30', type: 'solo', titre: 'Individuel' },
  { jour: 'Mar', heure: '12:15', type: 'groupe', titre: 'Circuit midi' },
  { jour: 'Mar', heure: '19:00', type: 'duo', titre: 'Duo force' },
  { jour: 'Mer', heure: '7:00', type: 'solo', titre: 'Individuel' },
  { jour: 'Mer', heure: '18:30', type: 'groupe', titre: 'Kettlebell' },
  { jour: 'Jeu', heure: '12:15', type: 'groupe', titre: 'Circuit midi' },
  { jour: 'Jeu', heure: '19:00', type: 'solo', titre: 'Individuel' },
  { jour: 'Ven', heure: '7:00', type: 'groupe', titre: 'Cardio matin' },
  { jour: 'Ven', heure: '17:30', type: 'duo', titre: 'Duo mobilité' },
  { jour: 'Sam', heure: '9:30', type: 'groupe', titre: 'Plein air citadelle' },
  { jour: 'Sam', heure: '11:00', type: 'solo', titre: 'Individuel' },
];
export const typesSeance = [
  { id: 'tout', label: 'Tout' },
  { id: 'solo', label: 'Individuel' },
  { id: 'duo', label: 'Duo' },
  { id: 'groupe', label: 'Small group' },
];

export const objectifs = ['Perdre du poids', 'Prendre du muscle', 'Me remettre en forme', 'Préparer une course', 'Soulager mon dos'];

export const avis = [
  { nom: 'Sarah, 34 ans', texte: '−9 kg en quatre mois, sans régime miracle. Surtout, j’ai enfin envie d’aller m’entraîner.' },
  { nom: 'Julien, 41 ans', texte: 'Mon premier semi-marathon bouclé en 1 h 52. Malik a construit chaque semaine avec moi.' },
  { nom: 'Nadia, 58 ans', texte: 'Plus de douleurs au dos, et je porte mes petits-enfants sans y penser. Merci !' },
];

export const faq = [
  {
    q: 'Je n’ai jamais fait de sport, c’est pour moi ?',
    a: 'Oui. On part de votre niveau réel, avec des exercices adaptés. La séance découverte sert justement à faire le point.',
  },
  {
    q: 'Où ont lieu les séances ?',
    a: 'Au studio Pulse, en extérieur (citadelle, parc de la Deûle) ou à domicile dans la métropole lilloise, sans supplément jusqu’à 10 km.',
  },
  {
    q: 'Puis-je payer avec des chèques sport ?',
    a: 'Oui, les chèques sport et les virements sont acceptés. Les packs se règlent en une ou trois fois.',
  },
  { q: 'Et si je dois annuler une séance ?', a: 'Gratuitement jusqu’à 24 heures avant. Elle est simplement reportée.' },
];
