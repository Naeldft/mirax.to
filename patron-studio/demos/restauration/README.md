# Forno Vivo — site vitrine de pizzeria (démo Patrôn Studio)

Pizzeria napolitaine **fictive**, site démo pour portfolio. React + Vite, Three.js (React Three Fiber + drei), GSAP + ScrollTrigger, Tailwind CSS 4. Site 100 % statique.

## Lancer en local

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # site de production dans dist/
npm run preview    # tester dist/ sur http://localhost:4173
npm run lint       # vérification du code
```

## Adapter à un vrai client

Tout le contenu est dans `src/data/` :

| Fichier | Contenu |
| --- | --- |
| `src/data/pizzas.js` | pizzas (nom, prix, ingrédients, catégories pour les filtres, garnitures 3D), pizzas du sélecteur d'accueil |
| `src/data/site.js` | nom, slogan, adresse, téléphone, e-mail, réseaux, horaires (qui pilotent aussi les créneaux de réservation), entrées / desserts / boissons, histoire, galerie, avis |

- **Couleurs et polices** : bloc `@theme` en haut de `src/index.css`.
- **Images** : remplacez les fichiers de `public/images/pizzas/` (visuels des cartes, 800 × 800, fond transparent) et de `public/images/galerie/` (1200 × 900) par de vraies photos, en gardant les mêmes noms (ou changez les chemins dans `site.js`).
- **Garnitures 3D** : types disponibles dans `src/three/toppings.js` (mozzarella, basilic, salami, champignon, jambon, truffe, roquette, poivron, burrata, pistache…). Une pizza peut être ronde ou en chausson (`forme: 'chausson'`).
- **Réservation** : le formulaire valide tout côté navigateur et n'envoie rien (site démo). Pour un vrai client, branchez l'envoi dans `onSubmit` de `src/components/Reservation.jsx` (Formspree, e-mail, API…).
- **Carte** : `MapPlaceholder` dans `src/components/Contact.jsx` est un dessin ; remplacez-le par un `<iframe>` Google Maps ou OpenStreetMap.
- **Visuels générés** : `npm run images` régénère les images à partir de la 3D (nécessite Playwright : `npm i -D playwright && npx playwright install chromium`).

## Performance et accessibilité

- La 3D est chargée **après** l'affichage de la page (fichier séparé) ; une image de la pizza est affichée en attendant, et reste affichée si l'appareil n'a pas WebGL.
- Qualité adaptée à l'appareil (mémoire, processeur, mode économie de données) et baissée automatiquement si les images par seconde chutent ; rendu 3D en pause quand l'accueil n'est plus à l'écran.
- `prefers-reduced-motion` respecté : pizza fixe, changements instantanés, pas d'animations au défilement ni de carrousel automatique.
- Menu mobile accessible au clavier (Échap pour fermer), lien d'évitement, champs de formulaire avec messages d'erreur annoncés.

## Mettre en ligne

**Netlify** (le plus simple) : glissez le dossier `dist/` sur https://app.netlify.com/drop, ou reliez le dépôt Git (le fichier `netlify.toml` règle la commande `npm run build` et le dossier `dist`). Si le site est dans un sous-dossier du dépôt, indiquez `forno-vivo` comme « Base directory ».

**Vercel** : « Add New Project », importez le dépôt, choisissez le dossier racine `forno-vivo` ; le préréglage Vite est détecté (`vercel.json` fourni).

**OVH (hébergement mutualisé)** : lancez `npm run build`, puis envoyez **le contenu** du dossier `dist/` (pas le dossier lui-même) dans le dossier `www/` de l'hébergement, par FTP (FileZilla) ou via le gestionnaire de fichiers OVH. Le fichier `.htaccess` inclus active la compression et le cache.

Dans tous les cas, pensez au certificat HTTPS (automatique sur Netlify et Vercel, à activer dans l'espace client OVH).

---
Restaurant, adresse, numéro (tranche réservée à la fiction), avis et histoire sont fictifs. Polices Playfair Display et Inter : licence SIL OFL. Images générées à partir des modèles 3D du site.
