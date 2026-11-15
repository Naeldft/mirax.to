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

Détail complet des photos : `demos/plomberie/photos/LISEZ-MOI.md`.
- Intro : vraie scène 3D construite en code (`src/three/Canalisation.jsx`) : salle de bain, robinet chromé, vasque,
  puis la canalisation en cuivre (bagues en laiton, eau qui coule, gouttes) avec les 3 étapes gravées sur les parois.
- Photo `hero-robinet` (vraie photo de robinet) : affichée le temps du chargement, et à la place de la 3D sans WebGL
  ou avec « réduire les animations ».
- Réalisations : 3 vraies photos.

Textures et lumière d'ambiance : **Poly Haven, licence CC0**, dans `demos/plomberie/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Carrelage du mur | `textures/long_white_tiles-*` | https://polyhaven.com/a/long_white_tiles |
| Reflets de la salle de bain (photo 360°) | `salle-de-bain-1024.jpg`, `-512.jpg` | https://polyhaven.com/a/modern_bathroom |
| Reflets dans la canalisation (photo 360°) | `chaufferie-1024.jpg`, `-512.jpg` | https://polyhaven.com/a/boiler_room |

Construits en code (pas d'image) : robinet, mousseur, goutte, vasque, plan, canalisation, bagues, eau, gouttes, plaques gravées.

### Velocità Location

Détail complet des photos : `demos/location-voitures/photos/LISEZ-MOI.md`.
- Intro : vraie scène 3D construite en code (`src/three/Velocita3D.jsx`) : showroom au sol laqué, le coupé (vraie photo
  détourée, avec reflet et ombre) fonce vers nous ; l'habitacle est une **vraie photo** mise en relief par sa carte de
  profondeur (calculée avec Depth Anything V2, modèle libre Apache 2.0) que la caméra traverse ; puis 4 places de
  parking avec une vraie voiture détourée par catégorie.
- Photo `flotte-premium` : affichée le temps du chargement, et à la place de la 3D sans WebGL ou avec « réduire les animations ».

| Élément | Fichier (`public/scene/`) | Photo d'origine |
|---|---|---|
| Habitacle (photo + profondeur) | `habitacle-1800|1000.webp`, `habitacle-profondeur.png` | https://images.unsplash.com/photo-1610647752706-3bb12232b3ab (Unsplash) |
| Coupé (Mercedes-AMG GT) | `voiture-premium-*.webp` | https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8 (Unsplash) |
| Citadine (Fiat 500) | `voiture-citadine-*.webp` | https://images.unsplash.com/photo-1549317661-bd32c8ce0db2 (Unsplash) |
| SUV (Honda CR-V) | `voiture-suv-*.webp` | https://images.unsplash.com/photo-1519641471654-76ce0107ad1b (Unsplash) |
| Fourgon aménagé (VW Combi) | `voiture-fourgon-*.webp` | https://images.unsplash.com/photo-1527786356703-4b100091cd2c (Unsplash) |
| Reflets du sol (photo 360°) | `parking-1024|512.jpg` | https://polyhaven.com/a/parking_garage (Poly Haven, CC0) |

Détourages : rembg (BiRefNet). Construits en code : sol, lignes rouges, rampes lumineuses, traits de vitesse, places de parking, étiquettes.

## Images de partage (réseaux sociaux)

`site/assets/social-*.webp` : texte seul sur fond noir (aucune photo, aucune illustration).

## À remplacer (phases suivantes)

- Cartes « concepts » (`burger-3d`, `automotive-3d`, `fashion-3d`) et dossier `assets/illustrations` (encore utilisés par la page `modeles.html`) : images non photographiques → à retirer ou remplacer.
- Les captures montrent les démos telles qu'elles sont aujourd'hui ; elles seront refaites après la refonte des démos.
