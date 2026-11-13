/**
 * Barre fixe en bas d'écran sur téléphone : « Appeler » (lien tel:) et « Itinéraire » (Google Maps).
 * Masquée à partir de la tablette (768 px). Ajoute un espace en bas de page pour ne rien cacher.
 *  theme : { bg, fg, accent, accentFg, bord }
 */
export default function BarreMobile({ telephone, telephoneLien, adresse, theme, fontClass = '' }) {
  const itineraire = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(adresse)}`;
  return (
    <>
      <div aria-hidden="true" className="h-[calc(4.75rem+env(safe-area-inset-bottom))] md:hidden" style={{ background: theme.bg }} />
      <nav
        aria-label="Contact rapide"
        className={`fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 gap-3 border-t px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-xl md:hidden ${fontClass}`}
        style={{ background: `color-mix(in srgb, ${theme.bg} 88%, transparent)`, borderColor: theme.bord ?? 'rgb(127 127 127 / 0.25)' }}
      >
        <a
          href={`tel:${telephoneLien}`}
          className="flex min-h-12 items-center justify-center gap-2 rounded-full text-base font-semibold"
          style={{ background: theme.accent, color: theme.accentFg }}
          aria-label={`Appeler le ${telephone}`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
          </svg>
          Appeler
        </a>
        <a
          href={itineraire}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-12 items-center justify-center gap-2 rounded-full border text-base font-semibold"
          style={{ borderColor: theme.fg, color: theme.fg }}
          aria-label={`Itinéraire vers ${adresse} (ouvre Google Maps)`}
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21Z" />
            <circle cx="12" cy="9.5" r="2.5" />
          </svg>
          Itinéraire
        </a>
      </nav>
    </>
  );
}
