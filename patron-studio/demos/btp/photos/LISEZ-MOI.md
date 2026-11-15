# Photos de Bâti Nord Construction

Règle : uniquement de vraies photos qui montrent **exactement** ce que dit le texte (aucune image IA, aucun dessin,
aucun rendu 3D). Le titre de chaque réalisation décrit ce que montre sa photo.

Pour changer une photo : déposez la vôtre dans ce dossier **avec le même nom**, puis relancez
`./construire-dossier-ovh.sh` (versions WebP 800 et 1 600 px créées automatiquement), et adaptez le titre
et le texte de la réalisation dans `src/data/site.js`.

## Réalisations

| Fichier | Réalisation affichée | Photo d'origine (Unsplash) |
|---|---|---|
| realisation-maison-contemporaine | Maison contemporaine, Bondues (bardage bois sombre, grandes baies) | https://images.unsplash.com/photo-1600585154340-be6161a56a0c |
| realisation-extension-cuisine | Extension cuisine, Marcq-en-Barœul | https://images.unsplash.com/photo-1600489000022-c2086d79f9d4 |
| realisation-plain-pied | Maison de plain-pied en brique et enduit blanc, Templemars | https://images.unsplash.com/photo-1592595896551-12b371d546d5 |
| realisation-maison-familiale | Maison familiale à toit pentu, Villeneuve-d’Ascq ; aussi affichée à l'accueil sans 3D | https://images.unsplash.com/photo-1449844908441-8829872d2607 |
| realisation-maison-architecte | Maison d’architecte (enduit blanc, volume bardé de bois rouge), Lille Fives | https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde |
| realisation-maison-de-ville | Maison de ville rénovée (façade enduite, garage), Roubaix | https://images.unsplash.com/photo-1494526585095-c41746248156 |

Deux de ces photos sont aussi encadrées sur le mur du séjour, dans l'accueil 3D.

## Accueil 3D

L'accueil est une maison 3D construite en code (`src/three/Maison3D.jsx`) : voir `IMAGES.md` à la racine pour
les matières, meubles et panoramas (Poly Haven, CC0). Les phrases peintes sur les murs viennent de `src/data/site.js`
(`phases` et `entreprise.slogan`).

Pour un vrai client : utilisez ses propres photos de chantier.
Licence Unsplash : usage commercial autorisé, sans attribution obligatoire.
