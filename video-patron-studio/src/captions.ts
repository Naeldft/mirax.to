import { stripAccent } from './anim';
import { config } from './config';

const TX = config.textes;
export type Cap = { from: number; to: number; text: string; small?: string; big?: boolean };

/** Sous-titres incrustés (images de début / fin, à 30 i/s). */
export const CAPTIONS: Cap[] = [
  { from: 128, to: 262, text: TX.presentation },
  { from: 282, to: 420, text: TX.metiers1 },
  { from: 424, to: 562, text: TX.metiers2 },
  { from: 582, to: 676, text: TX.etape1 },
  { from: 690, to: 786, text: TX.etape2 },
  { from: 800, to: 890, text: TX.etape3 },
  { from: 985, to: 1160, text: TX.sansEngagement, small: TX.surDevis },
  { from: 1196, to: 1314, text: TX.rassurer1, small: TX.rassurer2, big: true },
];

/** Toutes les lignes de texte (pour le fichier .srt), accroche et appel à l'action compris. */
export const allLines = (showContact: boolean) => {
  const C = config.coordonnees;
  const prix = TX.prix.map((p) => `${p.montant}${p.periode ? ' ' + p.periode : ''} : ${p.lignes.join(' ')}`).join('\n');
  const cta = TX.utiliserVarianteCta ? TX.ctaVariante : TX.cta;
  const contact = [C.site, C.whatsapp && `WhatsApp ${C.whatsapp}`, ...C.emails, C.instagram, C.tiktok, C.snapchat].filter(Boolean).join(' · ');
  const lines = [
    { from: 0, to: 80, text: TX.accroche.join(' ') },
    { from: 120, to: 262, text: `${config.marque.nom1} ${config.marque.nom2} — ${TX.presentation}` },
    ...CAPTIONS.slice(1, 6),
    { from: 930, to: 984, text: prix },
    ...CAPTIONS.slice(6).map((c) => ({ ...c, text: c.small ? `${c.text} ${c.small}` : c.text })),
    { from: 1336, to: 1500, text: showContact ? `${cta}\n${contact}` : cta },
  ];
  return lines.map((l) => ({ ...l, text: stripAccent(l.text) }));
};
