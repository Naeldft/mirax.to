# Photos de Forno Vivo

Règle : uniquement de vraies photos qui montrent **exactement** le produit (aucune image IA, aucun dessin, aucun rendu 3D).
Pas de bonne photo = un emplacement neutre « Photo à venir » s'affiche, jamais une image approchante.

Pour ajouter ou changer une photo de la carte : déposez-la dans ce dossier **avec le nom indiqué** (`.jpg`, `.png` ou `.webp`),
mettez `photo: '<nom>'` sur la pizza dans `src/data/pizzas.js`, puis relancez `./construire-dossier-ovh.sh`.
Les versions WebP (800 px mobile, 1 600 px ordinateur) sont créées automatiquement dans `public/images/`.

## Plateau tournant de l'accueil (photos vues de dessus, détourées en disque)

`public/images/disques/<pizza>-1024.webp` et `-512.webp` : la pizza entière vue de dessus, découpée au bord réel de la croûte
(sans fond, sans plat), la perspective éventuelle redressée pour former un disque.
Une pizza n'apparaît sur le plateau que si elle a un disque (`disque:` dans `src/data/pizzas.js`).

| Disque | Photo d'origine (Unsplash) |
|---|---|
| margherita | https://images.unsplash.com/photo-1574071318508-1cdbab80d002 |
| diavola | https://images.unsplash.com/photo-1628840042765-356cda07504e |
| verde | https://images.unsplash.com/photo-1593560708920-61dd98c46a4e |

Pour ajouter une pizza au plateau : une photo vue **exactement de dessus**, pizza entière, rien de coupé par le cadre.

## Carte

| Fichier | Pizza | Photo d'origine (Unsplash) |
|---|---|---|
| pizza-margherita | Margherita | https://images.unsplash.com/photo-1574071318508-1cdbab80d002 |
| pizza-diavola | Diavola | https://images.unsplash.com/photo-1628840042765-356cda07504e |
| pizza-verde | Verde | https://images.unsplash.com/photo-1593560708920-61dd98c46a4e |
| pizza-quattro-formaggi | Quattro Formaggi | https://images.unsplash.com/photo-1620374645498-af6bd681a0bd |

### Emplacements à remplir (aucune photo exacte trouvée)

| Fichier attendu | Ce que la photo doit montrer |
|---|---|
| `pizza-regina` | Pizza tomate, mozzarella, jambon cuit et champignons de Paris, origan |
| `pizza-calzone` | Calzone dorée (chausson) entière, éventuellement ouverte sur la garniture ricotta-jambon |
| `pizza-tartufo` | Pizza blanche à la crème de truffe, champignons des bois, roquette et copeaux de parmesan |
| `pizza-ortolana` | Pizza aux légumes grillés : courgette, aubergine, poivrons rôtis, basilic |
| `pizza-vivo` | Pizza signature : mortadelle, stracciatella, pesto et éclats de pistache, zeste de citron |

## Galerie

| Fichier | Photo d'origine (Unsplash) |
|---|---|
| galerie-four | https://images.unsplash.com/photo-1579751626657-72bc17010498 |
| galerie-fromage | https://images.unsplash.com/photo-1541745537411-b8046dc6d66c |
| galerie-mains | https://images.unsplash.com/photo-1572552635104-daf938e0aa1f |
| galerie-salle | https://images.unsplash.com/photo-1517248135467-4c7edcad34c4 |

Licence Unsplash : usage commercial autorisé, sans attribution obligatoire.
