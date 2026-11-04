/**
 * ============================================================
 *  CONFIGURATION — modifiez ici les textes et coordonnées.
 *  Aucune modification de l'animation n'est nécessaire.
 * ============================================================
 *
 *  Astuce : entourez un mot avec des *étoiles* pour l'afficher
 *  en vert (accent). Ex. : "votre *maquette gratuite*".
 */

export const config = {
  marque: {
    nom1: 'Patrôn',
    nom2: 'Studio',
    // Vert d'accent. Le site n'était pas accessible : valeur proposée,
    // à remplacer par le vert exact d'accueil.css si besoin.
    vert: '#2CE584',
    fond: '#000000',
    texte: '#FFFFFF',
    gris: '#A3A3A3',
  },

  coordonnees: {
    site: 'patrônstudio.fr',
    email: 'patronstudio59@hotmail.com',
    whatsapp: '07 60 33 74 74',
    // Laissez vide ('') tant que le compte n'existe pas : la ligne n'apparaît pas.
    instagram: '',
    tiktok: '',
    snapchat: '',
  },

  textes: {
    // Scène 1 — accroche (une ligne par entrée)
    accroche: ['Votre activité', 'n’a pas encore', 'de *site* ?'],

    // Scène 2 — présentation
    presentation: 'Des sites internet pour *tous les métiers*.',
    lieu: 'Lille · partout en France',

    // Scène 3 — tous les métiers
    metiers1: '*Commerçants, artisans, indépendants, associations* :',
    metiers2: 'votre site, *à votre image*.',
    mentionConcepts: 'Concepts d’exemple',
    // Cartes 3D (concepts fictifs) : [libellé, sous-titre]
    cartes: [
      ['Boulangerie', 'Pains & viennoiseries'],
      ['Coiffeur', 'Prenez rendez-vous'],
      ['Plombier', 'Dépannage & installation'],
      ['Coach', 'Séances sur mesure'],
      ['Boutique', 'Nouvelle collection'],
      ['Restaurant', 'Découvrez la carte'],
      ['Association', 'Rejoignez-nous'],
      ['Photographe', 'Portfolio & tarifs'],
    ] as [string, string][],

    // Scène 4 — comment ça marche
    etape1: '*1.* Vous nous racontez votre activité.',
    etape2: '*2.* Vous voyez votre *maquette gratuite*.',
    etape3: '*3.* On met votre site *en ligne*.',

    // Scène 5 — les prix (ne changez les montants que si vos tarifs changent)
    prix: [
      { montant: '80 €', periode: '', lignes: ['Le site,', 'une seule fois.'] },
      { montant: '30 €', periode: '/ mois', lignes: ['Site, hébergement,', 'domaine et entretien.'] },
      { montant: '40 €', periode: '/ mois', lignes: ['Avec plus de', 'modifications.'] },
    ],
    sansEngagement: '*Sans engagement.*',
    surDevis: 'Boutique en ligne et cas particuliers : sur devis.',

    // Scène 6 — rassurer
    rassurer1: '*Maquette gratuite.*',
    rassurer2: 'Vous décidez après l’avoir vue.',

    // Scène 7 — appel à l'action
    cta: 'Écrivez-nous : votre *maquette gratuite* en quelques jours.',
    ctaVariante: 'Écrivez-nous sur WhatsApp ou par e-mail.',
    utiliserVarianteCta: false,
  },

  son: {
    // Fichier facultatif : public/audio/musique.mp3
    volume: 0.25,
    fonduEntreeSec: 1.5,
    fonduSortieSec: 2.5,
  },
};

export type Config = typeof config;
