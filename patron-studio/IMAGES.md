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
- Entrée : la première image de la vidéo (la façade) et l'intérieur juste après la porte, posés en deux plans de
  profondeur ; la caméra passe la porte (vrai relief, pas un zoom), puis la vidéo prend le relais.
- Intro : **3 vidéos fournies par le client, réalisées avec Kling AI** (la façade, la salle, la cuisine),
  montées bout à bout (toutes les images, vitesse d'origine, fondus de 0,5 s aux raccords), recadrées pour sortir le
  filigrane Kling du cadre, étalonnées en commun (couleurs harmonisées, noirs profonds, teinte chaude, vignette ;
  grain ajouté à l'écran), arrêtées sur la plancha et découpées en 458 images WebP qui défilent au scroll :
  `demos/snack/public/sequence/ordi/` (1 280 × 720) et `sequence/mobile/` (recadrage vertical au centre, 540 × 960).
- Burgers 3D : **5 photos de référence fournies par le client**, détourées ; le contour de chaque photo donne le volume
  du burger, découpé en couches, sur lequel la photo est projetée (`public/scene3d/burgers/`). Les mêmes photos
  illustrent la carte. Ombres des burgers sur leur planche calculées dans Blender (Cycles, `scripts/burgers-blender.sh`). Planche : Poly Haven « Wooden Cutting Board » (CC0), https://polyhaven.com/a/wooden_cutting_board ;
  reflets : Poly Haven « Bush Restaurant » (CC0), https://polyhaven.com/a/bush_restaurant.
- La carte (filtres, allergènes, click & collect) garde ses photos Unsplash pour les sides, desserts et boissons.

### Atelier Mèche (coiffure)

Détail des photos : `demos/coiffure/photos/LISEZ-MOI.md`.
- Intro : vrai salon en 3D construit en code (`src/three/Salon3D.jsx`) : porte d'entrée vitrée, parquet, murs poudre,
  miroirs à cadre laiton (reflet du salon calculé dans la scène), consoles en marbre, étagères, suspensions.
  Les 4 clients sont des mannequins de vitrine sculptés en code (`src/three/Mannequin.jsx`) : tête lisse et mate,
  cape anthracite au logo du salon, coupes sculptées en couleurs naturelles (carré, dégradé, balayage, chignon).
  Aucune photo dans l'intro ; les ciseaux dessinés en 3D et la galerie de tableaux sont retirés.
- Inspirations : 4 vraies photos (le « pixie texturé », sans photo, est retiré ; « Carré flou » devient « Brushing souple »).

Modèle, matières et lumière : **Poly Haven, licence CC0**, dans `demos/coiffure/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Fauteuils de coiffure (modèle 3D scanné) | `modeles/fauteuil.glb` | https://polyhaven.com/a/BarberShopChair_01 |
| Plantes | `modeles/potted_plant_04.glb` | https://polyhaven.com/a/potted_plant_04 |
| Parquet en point de Hongrie | `textures/herringbone_parquet-*` | https://polyhaven.com/a/herringbone_parquet |
| Relief des murs (couleur unie) | `textures/white_plaster_02-*` | https://polyhaven.com/a/white_plaster_02 |
| Consoles | `textures/marble_01-*` | https://polyhaven.com/a/marble_01 |
| Lumière d'ambiance (photo 360°) | `maison-1024.jpg`, `-512.jpg` | https://polyhaven.com/a/small_empty_house |

### Pulse Coaching (coach sportif)

- Intro : salle de sport premium en 3D (`demos/coach/src/three/Salle3D.jsx`), rendue de façon photoréaliste
  (matières PBR, lumière HDRI, soleil par la verrière avec ombres douces, occlusion ambiante, reflets au sol,
  rendu filmique AgX, profondeur de champ, grain et vignettage). Matériel construit en code à l'échelle ;
  athlètes = mannequins sculptés en code (`src/three/Athlete.jsx`), en décor. Aucune illustration.
- Vraies vidéos de séance : une par offre, en boucle et sans son, sur les écrans de la salle.

Vidéos : **Pexels, licence Pexels** (gratuite, usage commercial autorisé, sans attribution obligatoire),
recadrées, raccourcies à 8 s, sans son, dans `demos/coach/public/scene/videos/` (`-hd` ordinateur 960 px,
`-sd` téléphone 576 px, en MP4 H.264 et WebM VP9, plus une image d'attente `-affiche.jpg`).

| Offre | Fichier | Source Pexels |
|---|---|---|
| Séance découverte (kettlebell) | `decouverte-*` | https://www.pexels.com/video/elderly-man-lifting-kettlebell-7319944/ |
| Coaching individuel (squat à la barre) | `solo-*` | https://www.pexels.com/video/side-view-of-a-man-doing-barbell-squats-5319759/ |
| Duo (médecine-ball à deux) | `duo-*` | https://www.pexels.com/video/couple-working-out-together-4866863/ |
| Petit groupe | `groupe-*` | https://www.pexels.com/video/people-working-out-6326753/ |
| Coaching en ligne (séance devant l'ordinateur) | `enligne-*` | https://www.pexels.com/video/woman-doing-yoga-in-front-of-a-laptop-6583383/ |

Matières, modèle et lumière : **Poly Haven, licence CC0**, dans `demos/coach/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Sol en dalles de caoutchouc | `pbr/rubber_tiles-*` | https://polyhaven.com/a/rubber_tiles |
| Murs et plafond en béton | `pbr/concrete_wall_008-*` | https://polyhaven.com/a/concrete_wall_008 |
| Parquet de chêne (murs, plateforme, box) | `pbr/oak_wood_planks-*` | https://polyhaven.com/a/oak_wood_planks |
| Cuir des bancs | `pbr/brown_leather-*` | https://polyhaven.com/a/brown_leather |
| Caoutchouc granuleux (disques, haltères, tapis) | `pbr/rubberized_track-*` | https://polyhaven.com/a/rubberized_track |
| Tôle des platines du rack | `pbr/metal_plate-*` | https://polyhaven.com/a/metal_plate |
| Plantes | `modeles/potted_plant_04.glb` | https://polyhaven.com/a/potted_plant_04 |
| Lumière d'ambiance (HDRI, désaturée et réchauffée) | `gym-1k.hdr`, `gym-512.hdr` | https://polyhaven.com/a/crossfit_gym |

### Lumen Studio (photographe)

Détail des photos : `demos/photographe/photos/LISEZ-MOI.md`.
- Intro : vrai studio photo 3D dans un loft (`src/three/Studio3D.jsx`) : 4 plateaux (portrait, famille, mariage,
  entreprise) avec fond papier, boîte à lumière, réflecteur, appareil sur trépied et écran de contrôle qui montre
  la vraie photo de la séance. Modèles = mannequins habillés sculptés en code (`shared/src/three/Personnage.jsx`),
  mains placées par calcul (cinématique inverse). Rendu photoréaliste identique à Pulse.
- Portfolio : les 9 compositions dessinées sont remplacées par 9 vraies photos Pexels (titres adaptés).

Photos : **Pexels, licence Pexels** (gratuite, usage commercial autorisé) : 9 photos de portfolio + 4 sur l'écran
de contrôle de l'intro (liste et liens dans le LISEZ-MOI).

Modèles, matières et lumière : **Poly Haven, licence CC0**, dans `demos/photographe/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Appareil photo | `modeles/Camera_01.glb` | https://polyhaven.com/a/Camera_01 |
| Tabouret | `modeles/wooden_stool_01.glb` | https://polyhaven.com/a/wooden_stool_01 |
| Plantes | `modeles/potted_plant_01.glb` | https://polyhaven.com/a/potted_plant_01 |
| Parquet | `pbr/rectangular_parquet-*` | https://polyhaven.com/a/rectangular_parquet |
| Mur de briques blanchies | `pbr/whitewashed_brick-*` | https://polyhaven.com/a/whitewashed_brick |
| Enduit (fond, plafond) | `pbr/white_plaster_02-*` | https://polyhaven.com/a/white_plaster_02 |
| Tissu des boîtes à lumière | `pbr/velour_velvet-*` | https://polyhaven.com/a/velour_velvet |
| Lumière d'ambiance (HDRI, désaturée et réchauffée) | `studio-1k.hdr`, `studio-512.hdr` | https://polyhaven.com/a/photo_studio_loft_hall |

### Les Racines (association)

- Intro : la cour de la Maison des Racines en 3D (`demos/association/src/three/Cour3D.jsx`) : allée de terre,
  pelouse, murs de briques, façade et enseigne peinte. Quatre coins : jardin partagé (bacs potagers, salades,
  tomates), aide aux devoirs (pergola, table, cahiers), repair café (établi, outils, grille-pain, vélo), épicerie
  solidaire (étal de cagettes, bocaux). Bénévoles et habitants : mannequins habillés (`shared/src/three/Personnage.jsx`),
  mains placées par calcul. Légumes, mobilier et vélo construits en code. Aucune photo, aucune illustration.

Modèles, matières et lumière : **Poly Haven, licence CC0**, dans `demos/association/public/scene/`.

| Élément | Fichier | Source Poly Haven |
|---|---|---|
| Arbustes | `modeles/shrub_01.glb` | https://polyhaven.com/a/shrub_01 |
| Plantes en pot | `modeles/potted_plant_02.glb` | https://polyhaven.com/a/potted_plant_02 |
| Fleurs | `modeles/flower_gazania.glb` | https://polyhaven.com/a/flower_gazania |
| Jardinière | `modeles/planter_box_01.glb` | https://polyhaven.com/a/planter_box_01 |
| Caisses et cagettes | `modeles/wooden_crate_01.glb` | https://polyhaven.com/a/wooden_crate_01 |
| Panier | `modeles/wicker_basket_01.glb` | https://polyhaven.com/a/wicker_basket_01 |
| Marteau, clé à molette | `modeles/cross_pein_hammer.glb`, `modeles/adjustable_wrench.glb` | https://polyhaven.com/a/cross_pein_hammer · https://polyhaven.com/a/adjustable_wrench |
| Terre des bacs | `pbr/farm_soil-*` | https://polyhaven.com/a/farm_soil |
| Planches (bacs, pergola, établi) | `pbr/weathered_planks-*` | https://polyhaven.com/a/weathered_planks |
| Briques des murs et de la façade | `pbr/red_brick_03-*` | https://polyhaven.com/a/red_brick_03 |
| Allée de terre battue | `pbr/stony_dirt_path-*` | https://polyhaven.com/a/stony_dirt_path |
| Pelouse | `pbr/grass_ground-*` | https://polyhaven.com/a/grass_ground |
| Lumière et ciel (HDRI + JPG léger) | `jardin-hd.hdr`, `jardin-sd.hdr`, `ciel-hd.jpg`, `ciel-sd.jpg` | https://polyhaven.com/a/garden_nook |

## Images de partage (réseaux sociaux)

`site/assets/social-*.webp` : texte seul sur fond noir (aucune photo, aucune illustration).

## À remplacer (phases suivantes)

- Cartes « concepts » (`burger-3d`, `automotive-3d`, `fashion-3d`) et dossier `assets/illustrations` (encore utilisés par la page `modeles.html`) : images non photographiques → à retirer ou remplacer.
- Les captures montrent les démos telles qu'elles sont aujourd'hui ; elles seront refaites après la refonte des démos.
