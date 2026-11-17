# Photos de la démo Crunch!

Chaque photo du site a un **emplacement nommé**. Pour la changer :

1. Déposez votre photo dans ce dossier (`demos/snack/photos/`) **avec exactement le même nom** que celle à remplacer (`.jpg`, `.jpeg`, `.png` ou `.webp`).
2. Relancez la compilation : `./construire-dossier-ovh.sh` (ou `npm run build` dans `demos/snack`).
   Le script `scripts/optimiser-photos.mjs` crée automatiquement les versions WebP compressées
   (480, 800 et 1 200 px pour la carte ; jusqu'à 2 400 px pour l'accueil) dans `public/images/`.

Conseils : photo nette, fond sombre, lumière chaude, au moins 1 600 px de large.
Les photos de la carte sont recadrées au format 4:3 (le cadrage suit automatiquement le sujet).

| Emplacement (nom du fichier) | Où il apparaît | Format conseillé |
|---|---|---|
| `accueil-smash-burger` | Grande photo de l'accueil | **vertical** (2:3), sujet au centre |
| `burger-chicken-crispy` | Carte : Chicken Crispy Bacon | portrait |
| `burger-forestier` | Carte : Le Forestier | portrait |
| `burger-double-cheese` | Carte : Double Cheese Bacon | portrait |
| `burger-chicken-avocat` | Carte : Chicken Avocat | portrait |
| `burger-egg-bacon` | Carte : L’Egg Bacon | portrait |
| `poulet-tenders` | Carte : Tenders × 5 | 4:3 |
| `poulet-wrap` | Carte : Wrap Crispy | 4:3 |
| `side-frites` | Carte : Frites maison | 4:3 |
| `side-cheesy-fries` | Carte : Cheesy fries | 4:3 |
| `side-onion-rings` | Carte : Onion rings | 4:3 |
| `dessert-cookie` | Carte : Cookie géant | 4:3 |
| `dessert-milkshake` | Carte : Milkshake | 4:3 |
| `boisson-citronnade` | Carte : Citronnade maison | 4:3 |
| `boisson-sodas` | Carte : Soda artisanal | 4:3 |
| `ambiance-burger-frites` | À côté de la commande | paysage ou carré |
| `ambiance-black-bun` | Fond de la section « avis » (assombri) | carré ou paysage |
| `ambiance-salle` | Fond de la section « horaires » (assombri) | paysage |

Pour ajouter un produit, ajoutez-le dans `src/data/site.js` avec un champ `photo: 'mon-nom'`
et déposez `mon-nom.jpg` ici.

## Origine des photos actuelles

Photos d'**Unsplash**, sous [licence Unsplash](https://unsplash.com/license) : utilisation gratuite,
y compris commerciale, sans obligation de citer l'auteur (ce qui reste apprécié).
Elles illustrent la démo : pour un vrai client, utilisez **ses propres photos**, prises dans son
restaurant, afin que les clients voient ce qu'ils mangeront vraiment.

| Fichier | Photo d'origine |
|---|---|
| accueil-smash-burger | https://images.unsplash.com/photo-1607013251379-e6eecfffe234 |
| burger-chicken-crispy, burger-forestier, burger-double-cheese, burger-chicken-avocat, burger-egg-bacon | photos de référence fournies par le client (voir « Burgers 3D » ci-dessous) |
| poulet-tenders | https://images.unsplash.com/photo-1562967914-608f82629710 |
| poulet-wrap | https://images.unsplash.com/photo-1626700051175-6818013e1d4f |
| side-frites | https://images.unsplash.com/photo-1630384060421-cb20d0e0649d |
| side-cheesy-fries | https://images.unsplash.com/photo-1573080496219-bb080dd4f877 |
| side-onion-rings | https://images.unsplash.com/photo-1639024471283-03518883512d |
| dessert-cookie | https://images.unsplash.com/photo-1499636136210-6f4ee915583e |
| dessert-milkshake | https://images.unsplash.com/photo-1572490122747-3968b75cc699 |
| boisson-citronnade | https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd |
| boisson-sodas | https://images.unsplash.com/photo-1551024709-8f23befc6f87 |
| ambiance-burger-frites | https://images.unsplash.com/photo-1561758033-d89a9ad46330 |
| ambiance-black-bun | https://images.unsplash.com/photo-1582196016295-f8c8bd4b3a99 |
| ambiance-salle | https://images.unsplash.com/photo-1615297928064-24977384d0da |

## Burgers 3D (`public/scene3d/burgers/`)

Les 5 burgers en 3D sont construits d'après les **photos de référence fournies par le client**
(`photos/burgers-3d/references-client.png`, découpée en 5 et détourée : `photos/burgers-3d/<burger>.png`).
Le contour de chaque photo donne le volume du burger, découpé en couches, et la photo est projetée dessus.
Pour changer un burger : remplacez sa photo détourée dans `photos/burgers-3d/` (même nom, fond transparent),
ajustez si besoin le découpage des couches dans `src/three/burger/bornes.js`, puis lancez
`python3 scripts/burgers-photo.py`. Planche à découper : Poly Haven « Wooden Cutting Board » (CC0).
Les mêmes photos, avec leur fond, servent aux cartes de la carte (`burger-<id>.jpg`).

## Intro (séquence au défilement)

Les images de `public/sequence/` viennent de 3 vidéos fournies par le client, réalisées avec Kling AI
(clip 1 : façade et entrée ; clip 2 : la salle ; clip 3 : la cuisine puis le burger), montées en entier, à vitesse
d'origine, avec des fondus de 0,5 s aux raccords ; image recadrée (1 664 × 936 au centre du 1 920 × 1 080) pour
sortir le filigrane Kling du cadre. La séquence s'arrête sur la plancha (458 images, le plan du burger Kling est
retiré : les burgers sont en 3D). Étalonnage commun (couleurs des 3 clips harmonisées, noirs profonds, teinte
chaude, vignette) : `python3 scripts/sequence-crunch.py <montage.mp4>` ; le grain est ajouté à l'écran.
