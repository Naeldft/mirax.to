/* Configuration publique du site (aucun secret ici).
   apiBase : facultatif, /api pour un serveur compatible sur ce domaine, ou une URL HTTPS avec CORS autorisé.
   Les demandes sont envoyées par envoi.php (PHP sur l’hébergement) : adresse de réception dans envoi-config.php.
   contactEmail : adresse de secours affichée si un envoi échoue.
   matomoUrl / matomoSiteId : mesure d’audience Matomo SANS cookie (voir mesure.js et README).
                  Laissez matomoUrl vide tant que Matomo n’est pas installé : rien n’est chargé.
   photos : ajoutez ici le nom d’un métier quand vous avez déposé sa photo dans assets/photos/ (voir assets/photos/LIRE-MOI.txt).
   Exemple : photos: ["boulangerie", "coiffeur"] */
window.PATRON_EXPORT_CONFIG = {
  apiBase: "",
  onlineUrl: "https://xn--patrn-studio-hib.fr",
  contactEmail: "admin.ps@xn--patrn-studio-hib.fr",
  matomoUrl: "",
  matomoSiteId: "1",
  photos: []
};
