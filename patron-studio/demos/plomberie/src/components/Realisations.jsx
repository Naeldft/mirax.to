import { useRef, useState } from 'react';
import { useReveal } from '@demos/shared/hooks/useReveal.js';
import { realisations } from '../data/site';
import SectionTitle from './SectionTitle';

/** Scènes "avant / après" dessinées en SVG (remplaçables par de vraies photos). */
function Scene({ type, apres }) {
  const mur = apres ? '#e9eef0' : '#b9a88f';
  const sol = apres ? '#cfd8dc' : '#8a7660';
  const tuyau = apres ? '#d08a52' : '#6d6a63';
  const rouille = apres ? 'transparent' : '#7a4a22';
  return (
    <svg
      viewBox="0 0 400 300"
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={apres ? 'Après travaux' : 'Avant travaux'}
    >
      <rect width="400" height="300" fill={mur} />
      {!apres && (
        <g opacity="0.5">
          <path d="M40 40 q30 20 10 60 q-15 30 20 50" stroke="#8f7b5e" strokeWidth="3" fill="none" />
          <circle cx="300" cy="80" r="30" fill="#a8946f" />
          <circle cx="90" cy="120" r="22" fill="#9c8762" />
        </g>
      )}
      {apres && (
        <g>
          {Array.from({ length: 8 }, (_, i) => (
            <rect key={i} x={i * 50} y="0" width="49" height="300" fill={i % 2 ? '#e3eaec' : '#edf2f3'} />
          ))}
        </g>
      )}
      <rect y="230" width="400" height="70" fill={sol} />
      {type === 'salle-de-bain' && (
        <g>
          {apres ? (
            <>
              <rect x="40" y="60" width="150" height="170" fill="#d7f3f8" opacity="0.6" stroke="#9fb7bd" strokeWidth="3" />
              <path d="M70 70 v30 h40" stroke="#c0c7cb" strokeWidth="6" fill="none" />
              <rect x="105" y="95" width="40" height="8" rx="4" fill="#c0c7cb" />
              <rect x="240" y="150" width="120" height="50" rx="6" fill="#6b4f3a" />
              <rect x="250" y="135" width="100" height="18" rx="8" fill="#fff" />
              <rect x="285" y="60" width="30" height="60" rx="4" fill="#cfe9ef" stroke="#9fb7bd" strokeWidth="3" />
            </>
          ) : (
            <>
              <rect x="30" y="150" width="200" height="80" rx="30" fill="#e8e2d0" stroke="#a69b80" strokeWidth="4" />
              <rect x="270" y="140" width="80" height="90" fill="#ddd5c1" stroke="#a69b80" strokeWidth="3" />
              <circle cx="120" cy="200" r="8" fill={rouille} />
            </>
          )}
        </g>
      )}
      {type === 'chaufferie' && (
        <g>
          <rect
            x={apres ? 150 : 140}
            y="40"
            width="110"
            height="180"
            rx="40"
            fill={apres ? '#f7f9fa' : '#d6cfbe'}
            stroke={apres ? '#b7c3c8' : '#9e937b'}
            strokeWidth="4"
          />
          <path d={`M175 220 v20 h-120 v-150`} stroke={tuyau} strokeWidth="10" fill="none" strokeLinecap="round" />
          <path d={`M235 220 v20 h120 v-170`} stroke={apres ? '#5fd4e8' : tuyau} strokeWidth="10" fill="none" strokeLinecap="round" />
          {!apres && <circle cx="55" cy="160" r="10" fill={rouille} />}
          {apres && <circle cx="205" cy="100" r="16" fill="#0a1724" opacity="0.8" />}
        </g>
      )}
      {type === 'cuisine' && (
        <g>
          <rect x="60" y="50" width="280" height="100" fill={apres ? '#bfe6ef' : '#a99a7d'} opacity={apres ? 0.7 : 0.6} />
          <path d="M200 50 v100 M60 100 h280" stroke={apres ? '#fff' : '#8b7c60'} strokeWidth="6" />
          <rect x="40" y="170" width="320" height="60" fill={apres ? '#2b3b47' : '#6a5a45'} />
          <rect x="150" y="165" width="100" height="14" rx="4" fill={apres ? '#e9eff4' : '#bdb4a2'} />
          <path d="M200 165 v-25 q0 -10 15 -10" stroke={apres ? '#e9eff4' : '#9b927f'} strokeWidth="6" fill="none" />
          {!apres && <path d="M250 230 q10 20 0 40" stroke={rouille} strokeWidth="6" fill="none" />}
        </g>
      )}
    </svg>
  );
}

/** Curseur avant / après (souris, doigt ou clavier). */
function Compare({ r }) {
  const [pos, setPos] = useState(50);
  return (
    <figure data-reveal className="overflow-hidden rounded-2xl border border-ecume/10 bg-nuit-2">
      <div className="relative aspect-[4/3] cursor-ew-resize touch-pan-y select-none">
        <div className="absolute inset-0">
          <Scene type={r.scene} apres />
        </div>
        <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          <Scene type={r.scene} />
        </div>
        <span className="absolute left-3 top-3 rounded-full bg-nuit/80 px-3 py-1 text-xs font-semibold">Avant</span>
        <span className="absolute right-3 top-3 rounded-full bg-eau px-3 py-1 text-xs font-semibold text-nuit">Après</span>
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <div className="absolute inset-y-0 -translate-x-1/2 border-l-2 border-ecume" />
          <div className="absolute top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ecume font-bold text-nuit shadow-lg">
            ⇆
          </div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`Comparer avant et après : ${r.titre}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
      <figcaption className="p-5">
        <p className="flex items-center justify-between gap-3">
          <span className="font-display text-lg font-bold">{r.titre}</span>
          <span className="shrink-0 rounded-full border border-ecume/15 px-2.5 py-0.5 text-xs text-ecume/70">{r.duree}</span>
        </p>
        <p className="mt-2 text-sm text-ecume/65">{r.texte}</p>
      </figcaption>
    </figure>
  );
}

export default function Realisations() {
  const scope = useRef(null);
  useReveal(scope);
  return (
    <section id="realisations" ref={scope} className="section bg-nuit-2" aria-labelledby="real-titre">
      <div className="mx-auto max-w-6xl">
        <SectionTitle
          id="real-titre"
          tag="Réalisations"
          title="Avant, après. Faites glisser."
          intro="Quelques chantiers récents dans la métropole lilloise."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {realisations.map((r) => (
            <Compare key={r.id} r={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
