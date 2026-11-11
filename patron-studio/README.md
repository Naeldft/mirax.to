# Patrôn Studio — site + sites démo par métier

```
patron-studio/
├── site/                     ← le site Patrôn Studio (HTML statique, modifiable directement)
├── demos/                    ← les sites démo (React + Vite + Three.js), un dossier par métier
│   ├── shared/               ← code commun : écran de chargement, bas de page « Je veux un site comme ça »,
│   │                           menu burger, FAQ, compteurs, inclinaison souris/téléphone…
│   ├── restauration/         ← Forno Vivo (pizza 3D)
│   ├── plomberie/            ← Ondine Plomberie (tuyauterie et eau en 3D)
│   ├── location-voitures/    ← Velocità Location (voiture 3D configurable)
│   ├── btp/                  ← Bâti Nord Construction (maison qui se construit)
│   ├── coiffure/             ← Atelier Mèche (ciseaux 3D, réservation de créneau)
│   ├── boulangerie/          ← Maison Levain (pain qui lève et dore, commande à retirer)
│   ├── coach/                ← Pulse Coaching (kettlebell et battements de cœur, séance d'essai)
│   ├── boutique/             ← Atelier Lin (chemise au vent, panier et commande)
│   ├── photographe/          ← Lumen Studio (appareil photo, portfolio, réservation)
│   ├── association/          ← Les Racines (arbre qui pousse, agenda, bénévolat, dons, adhésion)
│   ├── snack/                ← Crunch! (burger qui s'assemble, carte filtrable, click & collect, allergènes)
│   └── conseil/              ← Cap Horizon (croissance et boussole, diagnostic express, rendez-vous)
├── construire-dossier-ovh.sh ← compile les démos et assemble le dossier à envoyer
└── dossier-ovh/              ← RÉSULTAT : à envoyer tel quel par FTP dans « www/ »
```

## Construire le dossier à mettre en ligne

Il faut Node.js 20 ou plus (https://nodejs.org).

```bash
cd patron-studio
./construire-dossier-ovh.sh
```

Le script installe les dépendances, compile chaque démo pour son sous-dossier (`/demos/<métier>/`),
copie le site et range le tout dans `dossier-ovh/` (et `dossier-ovh.zip`).

## Tester en local

```bash
cd patron-studio/dossier-ovh
python3 -m http.server 8080
```
Puis ouvrez http://localhost:8080 (le site) et, par exemple, http://localhost:8080/demos/plomberie/.

Pour travailler sur une démo avec rechargement instantané : `cd demos/plomberie && npx vite`.

## Modifier une démo ou en faire le site d'un vrai client

Tous les textes et données sont dans `demos/<métier>/src/data/site.js` (et `pizzas.js` pour la restauration) :
nom, slogan, téléphone, services et tarifs, avis, FAQ, horaires, zone… Les couleurs et polices sont en haut de
`src/index.css`. Pour un vrai client, retirez `<DemoFooter />` dans `src/App.jsx` et changez la base dans
`vite.config.js` (`base: '/'` pour un site à la racine d'un domaine).

Les formulaires (devis, réservation, commande, dons…) valident les champs mais n'envoient rien et n'encaissent rien : branchez l'envoi dans la
fonction `submit` du composant (Formspree, Web3Forms, e-mail…).

## Ajouter une démo (vagues suivantes)

1. Copier un dossier de démo existant, changer `name` dans `package.json` et le slug dans `vite.config.js`.
2. L'ajouter à `workspaces` dans `demos/package.json` et à la liste `DEMOS` de `construire-dossier-ovh.sh`.
3. Ajouter sa carte dans la section `#futur-site` de `site/index.html` (et ses textes traduits dans `site/accueil.js`),
   puis son nom dans `DEMOS` de `site/contact-form.js` (message pré-rempli du devis) et dans `site/sitemap.xml`.

Les « photos » du portfolio du photographe sont des illustrations dessinées en code (`photographe/src/components/Photo.jsx`) :
remplacez-les par de vraies photos pour un client.
