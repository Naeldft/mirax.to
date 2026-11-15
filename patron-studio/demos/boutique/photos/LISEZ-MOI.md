# Photos d'Atelier Lin

Règle : uniquement de vraies photos qui montrent **exactement** ce que dit le texte (aucune image IA, aucun dessin,
aucun rendu 3D). Le nom, la couleur et la description de chaque pièce suivent sa photo.

Pour changer une photo : déposez la vôtre dans ce dossier **avec le même nom**, puis relancez
`./construire-dossier-ovh.sh` (versions WebP 800 et 1 600 px créées automatiquement), et adaptez la fiche
dans `src/data/site.js`.

## Collection

| Fichier | Pièce | Dans la boutique 3D | Photo d'origine (Unsplash) |
|---|---|---|---|
| chemise-ondine | Chemise Ondine, chambray bleu à petits cœurs | rayon « chemises & hauts » | https://images.unsplash.com/photo-1596755094514-f87e34085b2c |
| tshirt-ecume | T-shirt Écume, blanc | rayon « chemises & hauts » | https://images.unsplash.com/photo-1581655353564-df123a1eb820 |
| combishort-dune | Combishort Dune, kaki | rayon « autres styles » | https://images.unsplash.com/photo-1618932260643-eee4a2f652a6 |
| poncho-alize | Poncho Alizé, maille écrue ; aussi l'image d'accueil sans 3D | rayon « autres styles » | https://images.unsplash.com/photo-1434389677669-e08b4cac3105 |
| veste-tisserand | Veste Tisserand, denim brut | rayon « autres styles » | https://images.unsplash.com/photo-1611312449408-fcece27cdbb7 |
| cabas-marche | Cabas Marché, kraft | sur la table du fond | https://images.unsplash.com/photo-1544816155-12df9643f363 |
| robe-brise | Robe Brise, velours côtelé bordeaux (photo portée) | — | https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03 |
| robe-sable | Robe Sable, corail (photo portée) | — | https://images.unsplash.com/photo-1596783074918-c84cb06531ca |

Les pièces de la boutique 3D sont les mêmes photos, **détourées** (fond transparent) dans `public/scene/vetements/`.
Les robes n'y sont pas : aucune photo de robe seule sur cintre n'était disponible ; elles restent dans la collection.
Pour les ajouter : photographiez-les sur cintre, détourez-les, puis donnez-leur un `rayon` dans `src/data/site.js`.

Pour un vrai client : utilisez ses propres photos de vêtements.
Licence Unsplash : usage commercial autorisé, sans attribution obligatoire.
