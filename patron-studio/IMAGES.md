# Images du site Patrôn Studio

Règle : uniquement de vraies photos de vraies choses (Unsplash, licence Unsplash : usage commercial libre, sans attribution obligatoire).
Aucune image générée par IA, aucune illustration, aucun emoji. Quand aucune photo réaliste ne correspond exactement,
un **emplacement nommé** est listé ici au lieu d'une image approximative.

## Intro tunnel de l'accueil

Aucune image : les quatre icônes « enseigne néon » (pizza, maison, cintre, écran avec courbe) sont des tracés
vectoriels dessinés dans le code (`demos/accueil/src/intro.js`, constante `ICONES`), tous avec le même trait.
L'appareil photo reflex de la fin est lui aussi tracé dans le code (`demos/accueil/src/reflex.js`), sans image.
Les photos détourées essayées auparavant ont été retirées à la demande du client.

## Captures des démos (maquette de l'accueil et cartes « Votre futur site »)

`site/assets/captures/<démo>-ordi-1200.webp`, `-ordi-640.webp` (ordinateur 1440 × 900) et `-mobile.webp` (iPhone 390 × 844) :
vraies captures d'écran des 12 sites de démonstration du dossier `demos/`, faites automatiquement.
À refaire après chaque modification d'une démo : `node outils/captures-demos.cjs` (mode d'emploi en tête du fichier).

## Démos

### Forno Vivo (restauration)

Détail complet des photos : `demos/restauration/photos/LISEZ-MOI.md`.
- Intro : vraie scène 3D (pizzeria, four à bois, comptoir), construite en code dans `src/three/Pizzeria.jsx`.
- Pizzas de la scène : 4 vraies photos vues de dessus, détourées en disque (Margherita, Diavola, Verde, Rustica),
  posées sur un disque 3D avec une bordure en relief texturée avec la vraie croûte de chaque photo (`images/disques/*-bord.webp`).
- Carte : 9 pizzas, chacune avec sa vraie photo ; recettes et noms adaptés à ce que montre la photo. Calzone retirée (aucune photo).

Modèles 3D, textures et lumière d'ambiance : **Poly Haven, licence CC0** (domaine public, usage commercial libre, sans attribution
obligatoire), compressés pour le téléphone (textures 512 px WebP, géométrie compressée) dans `demos/restauration/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Ardoises sur pied | `modeles/standing_chalkboard_01.glb` | https://polyhaven.com/a/standing_chalkboard_01 |
| Panier en osier | `modeles/wicker_basket_01.glb` | https://polyhaven.com/a/wicker_basket_01 |
| Citrons | `modeles/lemon.glb` | https://polyhaven.com/a/lemon |
| Planche à découper | `modeles/wooden_cutting_board.glb` | https://polyhaven.com/a/wooden_cutting_board |
| Caisse en bois | `modeles/wooden_crate_01.glb` | https://polyhaven.com/a/wooden_crate_01 |
| Suspensions | `modeles/hanging_industrial_lamp.glb` | https://polyhaven.com/a/hanging_industrial_lamp |
| Briques du four | `textures/castle_brick_02_red-*` | https://polyhaven.com/a/castle_brick_02_red |
| Briques réfractaires (bouche) | `textures/brown_brick_02-*` | https://polyhaven.com/a/brown_brick_02 |
| Enduit des murs | `textures/clay_plaster-*` | https://polyhaven.com/a/clay_plaster |
| Sol en briques | `textures/brick_floor_02-*` | https://polyhaven.com/a/brick_floor_02 |
| Bois du comptoir, poutres, pelle | `textures/wood_table_001-*` | https://polyhaven.com/a/wood_table_001 |
| Lumière et reflets (photo 360°) | `ambiance-1024.jpg`, `ambiance-512.jpg` | https://polyhaven.com/a/warm_restaurant_night |

Construits en code (pas d'image) : le four (voûte, façade en arche, bouche, braises, flammes animées, conduit),
le comptoir, la pelle, la salle (murs, sol, plafond, poutres), les appliques.

### Ondine Plomberie

Détail complet : `demos/plomberie/photos/LISEZ-MOI.md`.
- Accueil : 4 vraies photos (robinet où l'on plonge, réseau de canalisations, outils, robinet ouvert sur un verre) ;
  textes des 3 étapes adaptés à ce que montrent les photos (dont « eau comme gaz » pour le réseau).
- Réalisations : 3 vraies photos ; la « chaufferie » (photo qui montrait un réseau de gaz) devient une salle de bain avec baignoire îlot.
- Retirés : la tuyauterie dessinée en 3D.

## Images de partage (réseaux sociaux)

`site/assets/social-*.webp` : texte seul sur fond noir (aucune photo, aucune illustration).

## À remplacer (phases suivantes)

- Cartes « concepts » (`burger-3d`, `automotive-3d`, `fashion-3d`) et dossier `assets/illustrations` (encore utilisés par la page `modeles.html`) : images non photographiques → à retirer ou remplacer.
- Les captures montrent les démos telles qu'elles sont aujourd'hui ; elles seront refaites après la refonte des démos.
