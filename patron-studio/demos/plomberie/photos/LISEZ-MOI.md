# Photos d'Ondine Plomberie

Règle : uniquement de vraies photos qui montrent **exactement** ce que dit le texte (aucune image IA, aucun dessin,
aucun rendu 3D). Jamais d'emplacement vide : si une photo ne correspond pas, on adapte le texte à la photo ou on retire l'élément.

Pour changer une photo : déposez la vôtre dans ce dossier **avec le même nom**, puis relancez
`./construire-dossier-ovh.sh` (versions WebP 800 et 1 600 px créées automatiquement).

## Accueil (la plongée dans le robinet, puis les 3 étapes)

| Fichier | Ce qu'elle montre | Photo d'origine (Unsplash) |
|---|---|---|
| hero-robinet | Robinet chromé, une goutte au bec (on plonge dans le bec : point réglé dans `src/components/Hero.jsx`, `BEC`) | https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c |
| hero-reseau | 01 On diagnostique : réseau de canalisations, vannes et compteur sur un mur de briques (recadrée sous le panneau) | https://images.unsplash.com/photo-1607472586893-edb57bdc0e39 |
| hero-outils | 02 On répare : marteau, pince, tournevis, clés hexagonales, mètre ruban | https://images.unsplash.com/photo-1567361808960-dec9cb578182 |
| hero-essai | 03 Ça coule de source : une main ouvre le robinet, l'eau jaillit dans un verre | https://images.unsplash.com/photo-1542013936693-884638332954 |

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
