# Photos de Velocità Location

Pour changer une photo : déposez la vôtre dans ce dossier **avec le même nom**, puis relancez
`./construire-dossier-ovh.sh` (versions WebP 800 et 1 600 px créées automatiquement).
Tant qu’une photo de véhicule manque, la carte affiche la silhouette dessinée du modèle.

| Emplacement | Où | Description de la photo attendue |
|---|---|---|
| `flotte-citadine` | Flotte | **À FOURNIR** : petite citadine (type 5 portes), vue de trois quarts avant, fond sombre ou parking, **logo et plaque masqués**. Puis mettre `photo: 'flotte-citadine'` dans `src/data/site.js` |
| `flotte-suv` | Flotte | SUV vu de trois quarts, en extérieur (photo actuelle : SUV blanc, logo flouté, plaque masquée) |
| `flotte-utilitaire` | Flotte | **À FOURNIR** : fourgon type 12 m³, vue de côté ou trois quarts, sans logo ni plaque lisible. Puis mettre `photo: 'flotte-utilitaire'` |
| `flotte-premium` | Flotte | Coupé haut de gamme en studio sombre, lumière rasante (photo actuelle : coupé noir, aucun logo visible) |

Conseil : photographiez les vrais véhicules de l’agence, plaques floutées, devant un fond uni et sombre pour
garder l’ambiance « showroom » du site.

## Origine (Unsplash, licence libre, usage commercial autorisé)

| Fichier | Photo d'origine |
|---|---|
| flotte-suv | https://images.unsplash.com/photo-1519641471654-76ce0107ad1b (logo du constructeur flouté) |
| flotte-premium | https://images.unsplash.com/photo-1485291571150-772bcfc10da5 |
