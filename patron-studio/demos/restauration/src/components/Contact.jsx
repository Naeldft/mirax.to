import { useRef } from 'react';
import { horaires, restaurant } from '../data/site';
import { useReveal } from '../hooks/useReveal';
import { formatServices } from '../lib/horaires';
import { Clock, Phone, Pin } from './Icons';
import SectionTitle from './SectionTitle';

/** Emplacement de la carte : dessin stylisé, à remplacer par une carte Google Maps ou OpenStreetMap. */
function MapPlaceholder() {
  const q = encodeURIComponent(`${restaurant.adresse.rue}, ${restaurant.adresse.ville}`);
  return (
    <div className="relative h-full min-h-72 overflow-hidden rounded-3xl border border-creme/10 bg-[#1b1714]">
      <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="400" height="300" fill="#1b1714" />
        <path d="M-20 210 C 80 190, 160 240, 420 170" stroke="#2f5367" strokeWidth="26" fill="none" opacity="0.55" />
        <g stroke="#3a322c" strokeWidth="10" fill="none" strokeLinecap="round">
          <path d="M0 80 L400 60" />
          <path d="M0 140 L400 150" />
          <path d="M90 0 L120 300" />
          <path d="M250 0 L230 300" />
          <path d="M330 0 L360 300" />
        </g>
        <g stroke="#2b2420" strokeWidth="4" fill="none">
          <path d="M0 110 L400 105" />
          <path d="M170 0 L180 300" />
          <path d="M40 0 L60 300" />
        </g>
        <circle cx="200" cy="120" r="46" fill="#d8432f" opacity="0.12" />
      </svg>
      <div className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-full">
        <span className="flex h-12 w-12 items-center justify-center rounded-full rounded-bl-none bg-tomate text-2xl text-creme shadow-lg shadow-tomate/40 [transform:rotate(-45deg)]">
          <Pin className="[transform:rotate(45deg)]" />
        </span>
      </div>
      <a
        href={`https://www.openstreetmap.org/search?query=${q}`}
        target="_blank"
        rel="noreferrer"
        className="btn btn-ghost absolute bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-sm"
      >
        Ouvrir le plan
      </a>
    </div>
  );
}

export default function Contact() {
  const scope = useRef(null);
  useReveal(scope);
  const today = new Date().getDay();
  return (
    <section id="contact" ref={scope} className="section grain bg-braise" aria-labelledby="contact-titre">
      <div className="mx-auto max-w-6xl">
        <SectionTitle id="contact-titre" eyebrow="Contact & horaires" title="Venez nous voir" />
        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr_1.2fr]">
          <div data-reveal className="rounded-3xl border border-creme/10 bg-charbon/60 p-6 md:p-8">
            <h3 className="flex items-center gap-2 text-2xl font-semibold">
              <Pin className="text-or-clair" /> Adresse
            </h3>
            <address className="mt-4 not-italic leading-relaxed text-creme/80">
              {restaurant.adresse.rue}
              <br />
              {restaurant.adresse.ville}
            </address>
            <p className="mt-4 text-sm text-creme/55">Métro Gare Lille-Flandres, à 5 minutes à pied.</p>
            <a href={`tel:${restaurant.telephoneLien}`} className="btn btn-primary mt-6 w-full">
              <Phone /> Appeler le {restaurant.telephone}
            </a>
            <a
              href={`mailto:${restaurant.email}`}
              className="mt-4 block text-center text-sm text-creme/70 underline-offset-4 hover:text-or-clair hover:underline"
            >
              {restaurant.email}
            </a>
          </div>

          <div data-reveal className="rounded-3xl border border-creme/10 bg-charbon/60 p-6 md:p-8">
            <h3 className="flex items-center gap-2 text-2xl font-semibold">
              <Clock className="text-or-clair" /> Horaires
            </h3>
            <ul className="mt-4 divide-y divide-creme/10">
              {horaires.map((h) => {
                const isToday = h.jour === today;
                return (
                  <li
                    key={h.jour}
                    className={`flex justify-between gap-4 py-2.5 text-sm ${isToday ? 'font-semibold text-or-clair' : 'text-creme/75'}`}
                  >
                    <span>
                      {h.nom}
                      {isToday && <span className="sr-only"> (aujourd’hui)</span>}
                    </span>
                    <span className={`text-right ${h.services.length === 0 ? 'text-creme/40' : ''}`}>{formatServices(h.services)}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          <div data-reveal className="min-h-72">
            <MapPlaceholder />
          </div>
        </div>
      </div>
    </section>
  );
}
