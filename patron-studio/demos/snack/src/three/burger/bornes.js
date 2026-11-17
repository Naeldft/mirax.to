/*
  Découpage en couches de chaque burger (photo de référence), de haut en bas.
  Chaque borne = [au centre, sur les côtés], en fraction de la hauteur de la photo recadrée :
  le bord d'un ingrédient vu un peu d'en haut est une ellipse, plus basse au centre que sur les côtés.
*/
export const bornes = {
  'chicken-crispy': [
    [0, 0],
    [0.3, 0.395], // pain du dessus | sauce, bacon, oignons rouges
    [0.481, 0.471], // garniture | cheddar sur le poulet
    [0.739, 0.662], // poulet pané | tomate, salade
    [0.805, 0.792], // salade | pain du dessous
    [1, 1],
  ],
};
Object.assign(bornes, {
  forestier: [
    [0, 0],
    [0.27, 0.42], // pain | roquette, champignons et oignons caramélisés
    [0.54, 0.53], // garniture | cheddar fondu sur le steak
    [0.78, 0.72], // steak | sauce et pain du dessous
    [1, 1],
  ],
  'double-cheese': [
    [0, 0],
    [0.2, 0.42], // pain | oignons frits
    [0.46, 0.5], // oignons frits, bacon | 1er steak et son cheddar
    [0.62, 0.6], // 1er steak | 2e steak et son cheddar
    [0.8, 0.79], // 2e steak | sauce et pain du dessous
    [1, 1],
  ],
  'chicken-avocat': [
    [0, 0],
    [0.3, 0.47], // pain | sauce aux herbes, oignons rouges
    [0.57, 0.6], // oignons, avocat | poulet grillé
    [0.78, 0.74], // poulet | salade
    [0.84, 0.8], // salade | pain du dessous
    [1, 1],
  ],
  'egg-bacon': [
    [0, 0],
    [0.29, 0.4], // pain | œuf au plat
    [0.49, 0.43], // œuf | bacon
    [0.58, 0.6], // bacon | fromage fondu sur le steak
    [0.8, 0.77], // steak | salade, sauce et pain du dessous
    [1, 1],
  ],
});
