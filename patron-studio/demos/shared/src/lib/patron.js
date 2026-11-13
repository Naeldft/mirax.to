/**
 * Liens vers le site Patrôn Studio (les démos sont hébergées dans /demos/… du même site).
 * Pour réutiliser une démo pour un vrai client, retirez simplement <DemoFooter />.
 */
export const PATRON = {
  nom: 'Patrôn Studio',
  accueil: '../../index.html',
  futurSite: '../../index.html#futur-site',
  devis: (demo) => `../../contact.html?sujet=devis&demo=${encodeURIComponent(demo)}`,
};
