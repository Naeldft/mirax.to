import { horaires } from '../data/site';

const pad = (n) => String(n).padStart(2, '0');
const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const toHHMM = (min) => `${pad(Math.floor(min / 60))}:${pad(min % 60)}`;

/** "AAAA-MM-JJ" de la date locale (pas UTC). */
export const isoLocal = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
export const parseIso = (s) => {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
};

export const jourDe = (date) => horaires.find((h) => h.jour === date.getDay());

/** Créneaux de réservation (toutes les 30 min, dernier créneau 45 min avant la fermeture). */
export function creneaux(dateIso, now = new Date()) {
  if (!dateIso) return [];
  const date = parseIso(dateIso);
  const jour = jourDe(date);
  if (!jour || jour.services.length === 0) return [];
  const isToday = isoLocal(now) === dateIso;
  const limit = isToday ? now.getHours() * 60 + now.getMinutes() + 30 : -1;
  const out = [];
  for (const [deb, fin] of jour.services) {
    for (let t = toMin(deb); t <= toMin(fin) - 45; t += 30) if (t > limit) out.push(toHHMM(t));
  }
  return out;
}

export const formatServices = (services) =>
  services.length === 0
    ? 'Fermé'
    : services.map(([a, b]) => `${a.replace(':', ' h ')} – ${b.replace(':', ' h ')}`.replace(/ h 00/g, ' h')).join(' · ');
