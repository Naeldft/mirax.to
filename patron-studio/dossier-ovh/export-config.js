/* Configuration publique du site (aucun secret ici).
   apiBase : facultatif, /api pour un serveur compatible sur ce domaine, ou une URL HTTPS avec CORS autorisé.
   web3formsKey : clé d’accès PUBLIQUE Web3Forms (envoi des demandes et des maquettes vers votre boîte mail).
                  Si vous la changez, changez-la aussi dans contact.html (formulaire qui fonctionne sans JavaScript).
   contactEmail : adresse de secours affichée si un envoi échoue.
   photos : ajoutez ici le nom d’un métier quand vous avez déposé sa photo dans assets/photos/ (voir assets/photos/LIRE-MOI.txt).
   Exemple : photos: ["boulangerie", "coiffeur"] */
window.PATRON_EXPORT_CONFIG = {
  apiBase: "",
  onlineUrl: "https://xn--patrn-studio-hib.fr",
  web3formsKey: "69a6708d-d4be-4c28-98f1-8e08442ae8d7",
  contactEmail: "admin.ps@xn--patrn-studio-hib.fr",
  photos: []
};
