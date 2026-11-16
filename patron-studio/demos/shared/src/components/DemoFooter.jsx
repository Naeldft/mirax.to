import { PATRON } from '../lib/patron.js';

/**
 * Bas de page commun à toutes les démos : signature Patrôn Studio, retour au site,
 * et bouton « Je veux un site comme ça » vers le formulaire de devis.
 * theme : { bg, fg, accent, accentFg } — couleurs de la démo.
 * À retirer pour un vrai client.
 */
// eslint-disable-next-line no-unused-vars -- grandesCibles : ancien réglage, désormais toujours actif
export default function DemoFooter({ demo, theme, fontClass = '', grandesCibles }) {
  return (
    <aside
      aria-label="À propos de ce site démo"
      className="relative overflow-hidden px-5 py-16 md:px-8 md:py-20"
      style={{ background: theme.bg, color: theme.fg }}
    >
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.25em] opacity-70">Site démo · entreprise fictive</p>
        <p className={`max-w-2xl text-3xl font-semibold leading-tight md:text-5xl ${fontClass}`}>
          Ce site vous plaît&nbsp;? Le vôtre peut être aussi spectaculaire.
        </p>
        <a
          href={PATRON.devis(demo)}
          className="group inline-flex min-h-14 items-center gap-3 rounded-full px-7 py-4 text-lg font-bold shadow-xl transition-transform duration-300 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-[0.98]"
          style={{ background: theme.accent, color: theme.accentFg }}
        >
          Je veux un site comme ça
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </a>
        <p className="text-base opacity-75">
          Site démo réalisé par <strong>{PATRON.nom}</strong>
          {' · '}
          <a
            href={PATRON.futurSite}
            className="inline-flex min-h-11 items-center underline underline-offset-4 hover:opacity-100"
          >
            ← Retour à Patrôn Studio et aux autres démos
          </a>
        </p>
      </div>
    </aside>
  );
}
