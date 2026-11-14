/**
 * Défilement de la page, lu par la caméra 3D à chaque image.
 *  - progres : 0 en haut → 1 en bas ;
 *  - station : numéro (décimal) de la section en cours. 2,5 = à mi-chemin entre la section 2 et la 3.
 *    Il suit la vraie position des sections dans la page : la caméra arrive devant un portail
 *    au moment où sa section atteint le haut de l'écran, quelle que soit la longueur des sections.
 *  - ensemble : vrai quand le menu « Vue d'ensemble » est ouvert (la caméra prend de la hauteur) ;
 *  - survol : section survolée dans ce menu (-1 : aucune) ;
 *  - zCamera, melange : écrits par la caméra 3D (position dans la galerie, 0 → 1 vers la vue d'ensemble).
 */
export const defilement = { progres: 0, station: 0, stations: [], ensemble: false, survol: -1, zCamera: 6, melange: 0 };

let hauts = [];

function mesurer() {
  const sections = [...document.querySelectorAll('main [data-station]')];
  defilement.stations = sections.map((s) => s.dataset.station);
  hauts = sections.map((s) => s.getBoundingClientRect().top + scrollY);
  maj();
}

function maj() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const y = scrollY;
  defilement.progres = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
  if (hauts.length < 2) return;
  // le bas de la page compte comme la fin de la dernière section
  const repere = y + innerHeight * 0.18;
  let i = 0;
  while (i < hauts.length - 1 && repere >= hauts[i + 1]) i++;
  const fin = i < hauts.length - 1 ? hauts[i + 1] : Math.max(hauts[i] + 1, max + innerHeight * 0.18);
  defilement.station = Math.min(hauts.length - 1, i + Math.max(0, Math.min(1, (repere - hauts[i]) / (fin - hauts[i]))));
}

addEventListener('scroll', maj, { passive: true });
addEventListener('resize', mesurer, { passive: true });
addEventListener('load', mesurer);
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mesurer);
else mesurer();
// les polices et les images changent la hauteur des sections : on remesure
if ('ResizeObserver' in window) {
  const main = document.querySelector('main');
  if (main) new ResizeObserver(() => mesurer()).observe(main);
}
