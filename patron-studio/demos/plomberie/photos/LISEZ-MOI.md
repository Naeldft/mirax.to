# Photos d'Ondine Plomberie

Pour changer une photo : déposez la vôtre dans ce dossier **avec le même nom**, puis relancez
`./construire-dossier-ovh.sh` (versions WebP 800 et 1 600 px créées automatiquement).

| Emplacement | Où | Description de la photo attendue |
|---|---|---|
| `realisation-sdb-apres` | Réalisations | Salle de bain terminée : douche à l’italienne vitrée, meuble vasque (Lambersart) |
| `realisation-chaufferie-apres` | Réalisations | Chaufferie refaite : ballon d’eau chaude 200 L et réseau cuivre neuf |
| `realisation-cuisine-apres` | Réalisations | Cuisine : évier sous la fenêtre, évacuation refaite |
| `realisation-sdb-avant` | Réalisations | **À FOURNIR** : la même salle de bain avant travaux (même cadrage) |
| `realisation-chaufferie-avant` | Réalisations | **À FOURNIR** : la chaufferie avant travaux |
| `realisation-cuisine-avant` | Réalisations | **À FOURNIR** : la cuisine avant travaux |

**Curseur avant / après** : il réapparaît automatiquement dès qu’une photo « avant » est fournie. Après avoir
déposé `realisation-sdb-avant.jpg`, remplacez `avant: null` par `avant: 'realisation-sdb-avant'` dans
`src/data/site.js` (idem pour les deux autres chantiers). Le titre redevient « Avant, après. Faites glisser. ».

Les photos actuelles ne montrent pas les vrais chantiers du client : la photo de chaufferie montre un réseau
de vannes industriel. Pour un vrai client, utilisez ses propres photos de chantier.

## Origine (Unsplash, licence libre, usage commercial autorisé)

| Fichier | Photo d'origine |
|---|---|
| realisation-sdb-apres | https://images.unsplash.com/photo-1584622650111-993a426fbf0a |
| realisation-chaufferie-apres | https://images.unsplash.com/photo-1607472586893-edb57bdc0e39 (recadrée pour masquer des panneaux) |
| realisation-cuisine-apres | https://images.unsplash.com/photo-1556912173-3bb406ef7e77 |
