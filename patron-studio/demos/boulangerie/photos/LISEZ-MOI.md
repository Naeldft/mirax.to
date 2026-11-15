# Photos de Maison Levain

Règle : uniquement de vraies photos qui montrent **exactement** ce que dit le texte (aucune image IA, aucun dessin,
aucun rendu 3D). Un produit sans photo fidèle est retiré de la carte.

Pour changer une photo : déposez la vôtre dans ce dossier **avec le même nom**, puis relancez
`./construire-dossier-ovh.sh` (versions WebP 800 et 1 600 px créées automatiquement).

## Produits

| Fichier | Produit | Photo d'origine (Unsplash) |
|---|---|---|
| pain-tradition | Baguette tradition (baguettes farinées côte à côte) | https://images.unsplash.com/photo-1597079910443-60c43fc4f729 |
| pain-campagne | Pain de campagne au levain | https://images.unsplash.com/photo-1589367920969-ab8e050bbb04 |
| pain-seigle | Pain de seigle (tranché, mie visible) | https://images.unsplash.com/photo-1549931319-a545dcf3bc73 |
| pain-mie | Pain de mie (tranché) | https://images.unsplash.com/photo-1598373182133-52452f7691ef |
| viennoiserie-croissant | Croissant pur beurre | https://images.unsplash.com/photo-1555507036-ab1f4038808a |
| viennoiserie-pain-chocolat | Pain au chocolat (plaque) | https://images.unsplash.com/photo-1483695028939-5bb13f8648b0 |
| viennoiserie-brioche | Brioche pur beurre | https://images.unsplash.com/photo-1620921568790-c1cf8984624c |

## Accueil 3D (`public/scene/pains/`)

Les pains posés sur les planches sont de vraies photos **détourées** (fond transparent, WebP 1 024 et 512 px) :

| Fichier | Produit | Photo d'origine (Unsplash) |
|---|---|---|
| campagne-* | Pain de campagne (boule farinée, de profil) | https://images.unsplash.com/photo-1586444248902-2f64eddc13df |
| seigle-* | Pain de seigle tranché (la loupe montre la mie) | https://images.unsplash.com/photo-1549931319-a545dcf3bc73 |
| brioche-* | Brioche pur beurre | https://images.unsplash.com/photo-1620921568790-c1cf8984624c |
| mie-* | Pain de mie tranché (la loupe montre la mie) | https://images.unsplash.com/photo-1598373182133-52452f7691ef |
| croissant-* | Croissants | https://images.unsplash.com/photo-1555507036-ab1f4038808a |
| tradition-* | Baguettes, dans le panier au bout du comptoir | https://images.unsplash.com/photo-1597079910443-60c43fc4f729 |

Pour changer un pain de l'accueil : détourez la nouvelle photo (fond transparent), gardez le même nom, et réglez
`plateau` (largeur réelle, position de la mie) dans `src/data/site.js`.

Pour un vrai client : photographiez ses propres pains.
Licence Unsplash : usage commercial autorisé, sans attribution obligatoire.
