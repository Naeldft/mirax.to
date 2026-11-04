# Vidéo de présentation — Patrôn Studio

Vidéo verticale 1080 × 1920, 30 i/s, 50 s, faite en code avec **Remotion** (React), **@remotion/three** et **three.js**.

## Installation

```bash
npm install
```

## Prévisualiser

```bash
npm run preview
```

Ouvre Remotion Studio dans le navigateur. Deux compositions :
- `PatronStudio` : la version complète ;
- `PatronStudioSansContact` : la même sans les coordonnées à la fin.

Pour afficher les zones de sécurité (160 px en haut, 280 px en bas), passez `debugSafe` à `true` dans les props de la composition.

## Exporter

```bash
npm run render              # les deux versions + sous-titres .srt
npm run render -- --principal   # seulement la version avec coordonnées
```

Fichiers produits dans `out/` :
- `patron-studio-presentation.mp4` (H.264 + AAC) ;
- `patron-studio-presentation-sans-contact.mp4` ;
- `*.srt` : sous-titres séparés (facultatifs, ils sont déjà incrustés dans l'image).

Images fixes de contrôle : `node scripts/stills.mjs 0 750 1450 --safe` (dans `out/stills/`).

Sur un ordinateur sans GPU, le rendu 3D se fait en logiciel (SwiftShader) : comptez de 20 à 40 minutes.
Variable `CONCURRENCY` pour régler le nombre d'images rendues en parallèle (3 par défaut).

## Changer les textes et les coordonnées

Tout se trouve dans **`src/config.ts`** :
- textes de chaque scène (mettez un mot entre `*étoiles*` pour l'afficher en vert) ;
- prix ;
- site, adresses e-mail (`emails`, une ou plusieurs), WhatsApp ;
- `instagram`, `tiktok`, `snapchat` : vides pour l'instant. Tant qu'un champ est vide, sa ligne n'apparaît pas ;
- couleur verte (`marque.vert`).

Si un texte devient plus long, vérifiez-le avec les images fixes : les durées d'affichage sont dans `src/captions.ts` et `src/timeline.ts`.

## Musique

Déposez `public/audio/musique.mp3`. Elle est ajoutée automatiquement, à volume bas (`son.volume` dans `config.ts`) avec un fondu d'entrée et de sortie. Sans ce fichier, la vidéo est exportée sans musique, avec une piste audio AAC silencieuse.

## Organisation

- `src/config.ts` : textes, coordonnées, couleurs
- `src/timeline.ts` : découpage en 7 scènes
- `src/captions.ts` : sous-titres incrustés et minutage
- `src/three/` : scènes 3D (accroche, monogramme, titre, couloir de cartes, appareils, prix, rassurer)
- `src/three/CameraRig.tsx` : trajectoire de la caméra (transitions)
- `src/overlay/Overlay.tsx` : sous-titres, mentions, écran final
- `src/textures.ts` : maquettes de sites dessinées en code
- `public/ps-mark.svg` : monogramme PS en SVG (généré par `scripts/build-mark.mjs`)
- `public/fonts/` : polices libres (Syne, Inter, licence SIL OFL)

## Licences

- Polices Syne et Inter : SIL Open Font License.
- Remotion est gratuit pour les particuliers et les entreprises de 3 personnes au plus. Au-delà, une licence d'entreprise est nécessaire (voir remotion.dev/license).
- Les cartes de sites (boulangerie, coiffeur…) sont des concepts fictifs dessinés en code. La vidéo les signale par la mention « Concepts d'exemple ».
