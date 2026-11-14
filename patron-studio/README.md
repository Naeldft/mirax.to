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
│   ├── snack/                ← Crunch! (photos plein écran, carte filtrable, click & collect, allergènes)
│   └── conseil/              ← Cap Horizon (croissance et boussole, diagnostic express, rendez-vous)
├── construire-dossier-ovh.sh ← compile les démos et assemble le dossier à envoyer
└── site-ovh/              ← RÉSULTAT : à envoyer tel quel par FTP dans « www/ »
```

## Construire le dossier à mettre en ligne

Il faut Node.js 20 ou plus (https://nodejs.org).

```bash
cd patron-studio
./construire-dossier-ovh.sh
```

Le script installe les dépendances, compile chaque démo pour son sous-dossier (`/demos/<métier>/`),
copie le site et range le tout dans `site-ovh/` (et `site-ovh.zip`).

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

Les photos de Crunch! (snack) sont de vraies photos Unsplash : pour les remplacer, voir `demos/snack/photos/LISEZ-MOI.md`.
Les « photos » du portfolio du photographe sont des illustrations dessinées en code (`photographe/src/components/Photo.jsx`) :
remplacez-les par de vraies photos pour un client.


## Formulaire de contact (PHP, sans service tiers)

Toutes les demandes du site (contact, devis, rappel, partenaires) sont envoyées à `site/envoi.php`, qui les
transmet par e-mail avec la fonction `mail()` de l'hébergement OVH. Réglages dans `site/envoi-config.php` :
adresse de réception, adresse d'expédition (**obligatoirement de votre domaine**) et un « sel » à remplacer
par un texte au hasard. Ce fichier n'est pas accessible depuis le navigateur (règle dans `.htaccess`).

Protections : honeypot, envoi en moins de 3 s refusé, validation de chaque champ côté serveur, pas d'injection
d'en-têtes, 5 envois maximum par IP et par 10 minutes. Sans JavaScript, `contact.html` envoie au même script
puis affiche `merci.html`.

## Statistiques : Matomo sans cookie

Le site est prêt (`site/mesure.js`) ; il reste à installer Matomo sur l'hébergement, une seule fois :

1. **Base de données** : espace client OVH → Web Cloud → Hébergements → votre domaine → onglet
   **Bases de données** → « Créer une base de données » (MySQL). Notez le serveur, le nom, l'utilisateur et le mot de passe.
2. **Fichiers** : téléchargez Matomo sur https://matomo.org/download/, décompressez-le et envoyez le dossier
   `matomo` dans `www/matomo/` avec FileZilla.
3. **Installation** : ouvrez `https://votre-domaine/matomo/` et suivez l'assistant (base de données de l'étape 1,
   puis un compte administrateur). Ajoutez votre site : il reçoit le numéro **1**.
4. **Réglages RGPD** (Administration → Confidentialité → Anonymiser les données) : anonymiser l'IP sur
   **2 octets**, cocher « Utiliser aussi l'IP anonymisée pour enrichir les visites », et régler la suppression
   automatique des anciennes données brutes sur **25 mois**.
5. **Activer la mesure** : dans `site/export-config.js`, mettez
   `matomoUrl: "https://xn--patrn-studio-hib.fr/matomo/"` et `matomoSiteId: "1"`, puis renvoyez ce fichier sur le serveur.

Le suivi est déjà configuré sans cookie (`disableCookies`) : pas de bandeau de consentement à afficher. Les visiteurs
peuvent refuser d'être comptés via « Mesure d'audience » en bas de page ou sur la page Confidentialité.
