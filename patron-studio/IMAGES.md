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

### Bâti Nord (BTP)

Détail complet des photos : `demos/btp/photos/LISEZ-MOI.md`.
- Intro : maison 3D claire construite en code (`src/three/Maison3D.jsx`) : façade et porte d'entrée, fondations
  (béton, semelles, ferraillage), séjour et cuisine, escalier, chambre sous la charpente avec puits de lumière.
  Les phrases du site sont peintes sur les murs.
- 2 vraies photos de réalisations encadrées au mur du séjour ; `realisation-maison-familiale` est affichée pendant le
  chargement, et à la place de la 3D sans WebGL ou avec « réduire les animations ».
- Réalisations : 6 vraies photos, titres adaptés à ce que montre chaque photo (les dessins de maisons sont supprimés).

Matières, meubles et lumière : **Poly Haven, licence CC0**, dans `demos/btp/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Parquet, escalier, charpente, porte | `textures/wood_floor-*` | https://polyhaven.com/a/wood_floor |
| Relief des murs intérieurs (couleur unie) | `textures/white_plaster_02-*` | https://polyhaven.com/a/white_plaster_02 |
| Relief de la façade (couleur unie) | `textures/white_rough_plaster-*` | https://polyhaven.com/a/white_rough_plaster |
| Béton (dalle, semelles, soubassement) | `textures/concrete_floor_02-*` | https://polyhaven.com/a/concrete_floor_02 |
| Terre du fond de fouille | `textures/excavated_soil_wall-*` | https://polyhaven.com/a/excavated_soil_wall |
| Mur en blocs béton apparent | `textures/concrete_block_wall-*` | https://polyhaven.com/a/concrete_block_wall |
| Tapis, couette | `textures/rough_linen-*` | https://polyhaven.com/a/rough_linen |
| Plan de travail | `textures/marble_01-*` | https://polyhaven.com/a/marble_01 |
| Pelouse | `textures/leafy_grass-*` | https://polyhaven.com/a/leafy_grass |
| Canapé | `modeles/sofa_02.glb` | https://polyhaven.com/a/sofa_02 |
| Table basse | `modeles/modern_coffee_table_01.glb` | https://polyhaven.com/a/modern_coffee_table_01 |
| Plante en pot | `modeles/potted_plant_04.glb` | https://polyhaven.com/a/potted_plant_04 |
| Tabourets de bar | `modeles/bar_chair_round_01.glb` | https://polyhaven.com/a/bar_chair_round_01 |
| Table de chevet | `modeles/side_table_01.glb` | https://polyhaven.com/a/side_table_01 |
| Suspensions | `modeles/modern_ceiling_lamp_01.glb` | https://polyhaven.com/a/modern_ceiling_lamp_01 |
| Reflets intérieurs (photo 360°) | `maison-1024.jpg`, `-512.jpg` | https://polyhaven.com/a/small_empty_house |
| Jardin et ciel autour de la maison (photo 360°) | `jardin-2048.jpg`, `-1024.jpg` | https://polyhaven.com/a/meadow_2 |

Construits en code : murs, dalles, fenêtres, porte, escalier, toit et chevrons, lit, cuisine, ferraillage, baladeuses.

### Maison Levain (boulangerie)

Détail complet des photos : `demos/boulangerie/photos/LISEZ-MOI.md`.
- Intro : vraie scène 3D construite en code (`src/three/Fournil3D.jsx`) : boutique au petit matin, comptoir en bois
  et pierre, four à sole au fond, deux ardoises, soleil par la fenêtre. Les pains sont de vraies photos détourées,
  debout sur des planches qui glissent sur le côté ; la loupe montre la croûte, ou la mie quand la photo la montre.
- Carte : 7 produits, tous avec une vraie photo (gaufre, tarte au sucre et flan retirés, faute de photo fidèle ;
  « Seigle & raisins » devenu « Pain de seigle », la photo ne montrant pas de raisins).

Matières, meubles et lumière : **Poly Haven, licence CC0** (mêmes fichiers que Forno Vivo), dans `demos/boulangerie/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Plan du comptoir, planches, étagères | `textures/wood_table_001-*` | https://polyhaven.com/a/wood_table_001 |
| Murs, façade en pierre du comptoir | `textures/clay_plaster-*` | https://polyhaven.com/a/clay_plaster |
| Sol | `textures/brick_floor_02-*` | https://polyhaven.com/a/brick_floor_02 |
| Mur du fournil | `textures/brown_brick_02-*` | https://polyhaven.com/a/brown_brick_02 |
| Paniers | `modeles/wicker_basket_01.glb` | https://polyhaven.com/a/wicker_basket_01 |
| Ardoises | `modeles/standing_chalkboard_01.glb` | https://polyhaven.com/a/standing_chalkboard_01 |
| Suspensions | `modeles/hanging_industrial_lamp.glb` | https://polyhaven.com/a/hanging_industrial_lamp |
| Planche à découper | `modeles/wooden_cutting_board.glb` | https://polyhaven.com/a/wooden_cutting_board |
| Reflets (photo 360°) | `ambiance-1024.jpg`, `-512.jpg` | https://polyhaven.com/a/warm_restaurant_night |

Construits en code : murs, comptoir, four à sole, fenêtre et rayon de soleil, planches, farine en suspension.

### Atelier Lin (boutique)

Détail complet des photos : `demos/boutique/photos/LISEZ-MOI.md`.
- Intro : vraie scène 3D construite en code (`src/three/Boutique3D.jsx`) : devanture peinte, vitrine, porte vitrée et
  enseigne, puis l'intérieur (murs clairs, parquet, portants en bois). Les vêtements sont de vraies photos détourées,
  suspendues à des crochets 3D : rayon « chemises & hauts » à gauche, « autres styles » à droite, cabas sur la table.
- Collection : 8 pièces, toutes avec une vraie photo (les silhouettes dessinées et le choix de coloris sont supprimés :
  une photo ne se recolore pas). Les robes, photographiées portées, ne sont pas dans la boutique 3D.

Matières, meubles et lumière : **Poly Haven, licence CC0** (mêmes fichiers que Bâti Nord), dans `demos/boutique/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Parquet | `textures/wood_floor-*` | https://polyhaven.com/a/wood_floor |
| Relief des murs (couleur unie) | `textures/white_plaster_02-*` | https://polyhaven.com/a/white_plaster_02 |
| Trottoir | `textures/concrete_floor_02-*` | https://polyhaven.com/a/concrete_floor_02 |
| Plantes | `modeles/potted_plant_04.glb` | https://polyhaven.com/a/potted_plant_04 |
| Reflets (photo 360°) | `maison-1024.jpg`, `-512.jpg` | https://polyhaven.com/a/small_empty_house |

Construits en code : devanture, porte, vitrine, enseigne, murs, portants, crochets, table, spots.

### Crunch! (snack)

Détail complet des photos : `demos/snack/photos/LISEZ-MOI.md`.
- Intro : vraie scène 3D construite en code (`src/three/Snack3D.jsx`) : devanture de nuit et néon « CRUNCH! »,
  salle en briques sombres, néons, menus lumineux, comptoir, plancha et hotte. Les 5 burgers sont de vraies photos
  détourées, posées sur des planches sur le passe-plat ; le burger change au défilement, aux flèches ou au doigt.
- Recettes adaptées aux photos : « Le Ch’ti » (maroilles) devient « L’Œuf-Bacon », et la recette du Brasier suit sa photo.

Matières et lumière : **Poly Haven, licence CC0**, dans `demos/snack/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Murs et façade en brique | `textures/dark_brick_wall-*` | https://polyhaven.com/a/dark_brick_wall |
| Carrelage de la cuisine | `textures/long_white_tiles-*` | https://polyhaven.com/a/long_white_tiles |
| Sol et trottoir | `textures/concrete_floor_02-*` | https://polyhaven.com/a/concrete_floor_02 |
| Comptoir et planches | `textures/wood_table_001-*` | https://polyhaven.com/a/wood_table_001 |
| Reflets (photo 360°) | `neon-1024.jpg`, `-512.jpg` | https://polyhaven.com/a/neon_photostudio |

Construits en code : façade, néons, menus lumineux, comptoir, passe-plat, plancha, hotte, lampes, fumée.

## Images de partage (réseaux sociaux)

`site/assets/social-*.webp` : texte seul sur fond noir (aucune photo, aucune illustration).

## À remplacer (phases suivantes)

- Cartes « concepts » (`burger-3d`, `automotive-3d`, `fashion-3d`) et dossier `assets/illustrations` (encore utilisés par la page `modeles.html`) : images non photographiques → à retirer ou remplacer.
- Les captures montrent les démos telles qu'elles sont aujourd'hui ; elles seront refaites après la refonte des démos.
