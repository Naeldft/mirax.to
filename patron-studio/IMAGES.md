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

## Images de partage (réseaux sociaux)

`site/assets/social-*.webp` : texte seul sur fond noir (aucune photo, aucune illustration).

## À remplacer (phases suivantes)

- Cartes « concepts » (`burger-3d`, `automotive-3d`, `fashion-3d`) et dossier `assets/illustrations` (encore utilisés par la page `modeles.html`) : images non photographiques → à retirer ou remplacer.
- Les captures montrent les démos telles qu'elles sont aujourd'hui ; elles seront refaites après la refonte des démos.
