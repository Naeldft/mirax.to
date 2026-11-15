# Photos de Velocità Location

Règle : uniquement de vraies photos qui montrent **exactement** ce que dit le texte (aucune image IA, aucun dessin,
aucun rendu 3D). Le nom de chaque modèle suit la voiture réellement photographiée (« ou équivalent »).

Pour changer une photo : déposez la vôtre dans ce dossier **avec le même nom**, puis relancez
`./construire-dossier-ovh.sh` (versions WebP 800 et 1 600 px créées automatiquement).
Pensez aussi à changer le nom et les caractéristiques du modèle dans `src/data/site.js`.

## Flotte

| Fichier | Ce qu'elle montre | Photo d'origine (Unsplash) |
|---|---|---|
| flotte-citadine | Fiat 500 bleu ciel, de profil | https://images.unsplash.com/photo-1549317661-bd32c8ce0db2 |
| flotte-suv | Honda CR-V blanc, trois quarts avant | https://images.unsplash.com/photo-1519641471654-76ce0107ad1b |
| flotte-fourgon | Volkswagen Combi au toit relevable (fourgon aménagé) | https://images.unsplash.com/photo-1527786356703-4b100091cd2c |
| flotte-premium | Mercedes-AMG GT gris mat (catégorie Coupé) ; aussi affichée à l'accueil sans 3D | https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8 |

## Accueil 3D (`public/scene/`)

Les mêmes voitures, détourées (`voiture-<modèle>-1400|720.webp`), et une vraie photo d'habitacle
(`habitacle-1800|1000.webp`, https://images.unsplash.com/photo-1610647752706-3bb12232b3ab) avec sa carte de profondeur
(`habitacle-profondeur.png`). Pour changer une voiture de l'accueil : détourez la nouvelle photo (fond transparent, WebP)
et gardez le même nom. Voir `IMAGES.md` à la racine pour le détail.

Pour un vrai client : photographiez les vrais véhicules de l'agence, plaques floutées.
Licence Unsplash : usage commercial autorisé, sans attribution obligatoire.
