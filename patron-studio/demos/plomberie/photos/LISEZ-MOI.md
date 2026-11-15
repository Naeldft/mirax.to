# Photos d'Ondine Plomberie

Règle : uniquement de vraies photos qui montrent **exactement** ce que dit le texte (aucune image IA, aucun dessin,
aucun rendu 3D). Jamais d'emplacement vide : si une photo ne correspond pas, on adapte le texte à la photo ou on retire l'élément.

Pour changer une photo : déposez la vôtre dans ce dossier **avec le même nom**, puis relancez
`./construire-dossier-ovh.sh` (versions WebP 800 et 1 600 px créées automatiquement).

## Accueil

L'accueil est une scène 3D construite en code (voir `IMAGES.md`). Une seule photo y sert :

| Fichier | Ce qu'elle montre | Photo d'origine (Unsplash) |
|---|---|---|
| hero-robinet | Robinet chromé, une goutte au bec : affichée pendant le chargement, et sans 3D | https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c |

Les textes des 3 étapes gravées sur les parois sont dans `src/data/site.js` (`etapesHero`).

## Réalisations

| Fichier | Chantier | Photo d'origine (Unsplash) |
|---|---|---|
| realisation-sdb-apres | Salle de bain, Lambersart : douche à l'italienne vitrée, meuble vasque | https://images.unsplash.com/photo-1584622650111-993a426fbf0a |
| realisation-baignoire-apres | Salle de bain, Roubaix : baignoire îlot, vasque à poser, robinetterie murale | https://images.unsplash.com/photo-1620626011761-996317b8d101 |
| realisation-cuisine-apres | Cuisine, Lille Vauban : évier sous la fenêtre | https://images.unsplash.com/photo-1556912173-3bb406ef7e77 |

**Curseur avant / après** : il apparaît automatiquement quand une photo « avant » est fournie (`realisation-<chantier>-avant.jpg`,
puis `avant: 'realisation-<chantier>-avant'` dans `src/data/site.js`). Sans photo « avant », la carte montre seulement le résultat.

Pour un vrai client : utilisez ses propres photos de chantier.
Licence Unsplash : usage commercial autorisé, sans attribution obligatoire.
