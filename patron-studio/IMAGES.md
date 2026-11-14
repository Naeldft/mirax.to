# Images du site Patrôn Studio

Règle : uniquement de vraies photos de vraies choses (Unsplash, licence Unsplash : usage commercial libre, sans attribution obligatoire).
Aucune image générée par IA, aucune illustration, aucun emoji. Quand aucune photo réaliste ne correspond exactement,
un **emplacement nommé** est listé ici au lieu d'une image approximative.

## Intro tunnel de l'accueil (photos détourées, fond transparent)

Détourage : BiRefNet (rembg), petits morceaux isolés supprimés, bord resserré d'1 px puis adouci (pas de liseré clair).
Fichiers sources : `demos/accueil/src/images/` → publiés dans `site/3d/morceaux/` (nom + empreinte).

| Panneau | Fichier | Sujet | Photo d'origine |
|---|---|---|---|
| Restaurants | `tunnel-pizza.webp` (+ `-ombre`) | Pizza margherita, vue en plongée | https://images.unsplash.com/photo-1574071318508-1cdbab80d002 |
| Artisans | `tunnel-maison.webp` (+ `-ombre`) | Maison blanche à véranda | https://images.unsplash.com/photo-1570129477492-45c003edd2be |
| Commerces | `tunnel-vetement.webp` (+ `-ombre`) | Poncho en maille sur cintre en bois | https://images.unsplash.com/photo-1434389677669-e08b4cac3105 |
| Agences | `tunnel-ordinateur.webp` (+ `-ombre`) | Ordinateur portable argent | https://images.unsplash.com/photo-1611186871348-b1ce696e52c9 |

Les fichiers `-ombre` sont l'ombre portée calculée à partir de la silhouette de la photo (pas un dessin).

## Images de partage (réseaux sociaux)

`site/assets/social-*.webp` : texte seul sur fond noir (aucune photo, aucune illustration).

## À remplacer (phases suivantes)

- Accueil, maquette d'ordinateur et de téléphone : aperçus dessinés → seront remplacés par de vraies captures des démos (phase 4).
- Cartes « concepts » (`burger-3d`, `automotive-3d`, `fashion-3d`) et dossier `assets/illustrations` : images non photographiques → à retirer ou remplacer.
