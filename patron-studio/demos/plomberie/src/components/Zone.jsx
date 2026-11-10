import { useRef } from 'react';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { entreprise, horaires, zone } from '../data/site';
import { Telephone } from './Icons';
import SectionTitle from './SectionTitle';

/** Carte stylisée de la zone d'intervention (dessinée en SVG). */
function Carte() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-ecume/10 bg-nuit-2" data-reveal>
      <svg viewBox="0 0 100 90" className="h-full w-full" role="img" aria-label="Carte de la zone d’intervention autour de Lille">
        <defs>
          <radialGradient id="halo">
            <stop offset="0" stopColor="#5fd4e8" stopOpacity="0.35" />
            <stop offset="1" stopColor="#5fd4e8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100" height="90" fill="#0f2235" />
        <path d="M-5 75 C 20 66, 35 80, 55 70 S 90 62, 105 66" stroke="#16304a" strokeWidth="5" fill="none" />
        <path d="M10 10 L 90 85 M 5 50 L 95 40 M 50 0 L 45 90" stroke="#16304a" strokeWidth="1.2" />
        <circle cx="52" cy="48" r="42" fill="url(#halo)" />
        <circle cx="52" cy="48" r="36" fill="none" stroke="#5fd4e8" strokeOpacity="0.35" strokeDasharray="1.5 1.5" strokeWidth="0.4" />
        {zone.communes.map((c) => (
          <g key={c.nom}>
            <circle cx={c.x} cy={c.y} r={c.principale ? 2.2 : 1.2} fill={c.principale ? '#d08a52' : '#5fd4e8'} />
            <text
              x={c.x + 2.4}
              y={c.y + 1}
              fontSize={c.principale ? 4 : 2.6}
              fill="#e8f6fa"
              fontFamily="Inter Variable, sans-serif"
              fontWeight={c.principale ? 700 : 400}
            >
              {c.nom}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

export default function Zone() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="zone" ref={scope} className="section bg-nuit-2" aria-labelledby="zone-titre">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionTitle id="zone-titre" tag="Zone d’intervention & horaires" title="Toute la métropole lilloise." intro={zone.texte} />
          <ul className="mt-8 flex flex-wrap gap-2" data-reveal>
            {zone.communes.map((c) => (
              <li key={c.nom} className="rounded-full border border-ecume/15 px-3 py-1 text-sm text-ecume/80">
                {c.nom}
              </li>
            ))}
          </ul>
          <dl className="mt-8 grid gap-3" data-reveal>
            {horaires.map((h) => (
              <div key={h.jours} className="flex items-center justify-between rounded-xl bg-nuit px-4 py-3">
                <dt className="text-ecume/70">{h.jours}</dt>
                <dd className="font-display font-bold">{h.heures}</dd>
              </div>
            ))}
          </dl>
          <a href={`tel:${entreprise.telephoneLien}`} className="btn btn-eau mt-8 w-full sm:w-auto" data-reveal>
            <Telephone /> {entreprise.telephone}
          </a>
        </div>
        <Carte />
      </div>
    </section>
  );
}
