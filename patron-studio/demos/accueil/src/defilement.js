/** Avancement du défilement de la page (0 en haut → 1 en bas), lu par la caméra à chaque image. */
export const defilement = { progres: 0 };

function maj() {
  const max = document.documentElement.scrollHeight - innerHeight;
  defilement.progres = max > 0 ? Math.min(1, Math.max(0, scrollY / max)) : 0;
}
addEventListener('scroll', maj, { passive: true });
addEventListener('resize', maj, { passive: true });
maj();
