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
| `burger-classic` | Carte : Le Crunch Classic | 4:3 |
| `burger-fume` | Carte : Le Fumé | 4:3 |
| `burger-brasier` | Carte : Le Brasier (pain rouge, effiloché, fromage fondu, salade) | 4:3 |
| `burger-chti` | Carte : L’Œuf-Bacon (bacon, œuf au plat, cheddar, tomate, salade) | 4:3 |
| `burger-green` | Carte : Le Green | 4:3 |
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
| burger-classic | https://images.unsplash.com/photo-1572802419224-296b0aeee0d9 |
| burger-fume | https://images.unsplash.com/photo-1553979459-d2229ba7433b |
| burger-brasier | https://images.unsplash.com/photo-1596662951482-0c4ba74a6df6 |
| burger-chti | https://images.unsplash.com/photo-1550317138-10000687a72b |
| burger-green | https://images.unsplash.com/photo-1525059696034-4967a8e1dca2 |
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

## Accueil 3D (`public/scene/burgers/`)

Les 5 burgers posés sur le passe-plat de l'accueil 3D sont les mêmes photos, **détourées** (fond transparent,
WebP 1 024 et 512 px) : `burger-classic`, `burger-fume`, `burger-brasier`, `burger-chti`, `burger-green`.
Pour changer un burger de l'accueil : détourez la nouvelle photo et gardez le même nom.

## Intro (séquence au défilement)

Les images de `public/sequence/` viennent de 3 vidéos fournies par le client, réalisées avec Kling AI
(clip 1 : façade et entrée ; clip 2 : la salle ; clip 3 : la cuisine puis le burger). Montage : clip 1 de 0,2 à 5 s,
clip 2 de 0,5 à 8,3 s, clip 3 de 0,3 à 4,6 s puis de 5 à 7,8 s, fondus de 0,5 s ; vitesse inchangée.
