import React from 'react';
import { Audio, getStaticFiles, interpolate, Sequence, staticFile, useVideoConfig } from 'remotion';
import { CAPTIONS } from './captions';
import { config } from './config';
import { FPS } from './timeline';

type Kind = 'whoosh' | 'clic' | 'impact';
type Cue = { f: number; kind: Kind; vol?: number };

// Volume relatif de chaque type (mixage discret : les bruitages accompagnent, ils ne couvrent pas)
const LEVEL: Record<Kind, number> = { whoosh: 0.5, clic: 0.32, impact: 0.85 };
const LENGTH: Record<Kind, number> = { whoosh: 26, clic: 3, impact: 48 };
// Le whoosh atteint son maximum ≈ 14 images après son début : on l'anticipe.
const W = (peak: number, vol?: number): Cue => ({ f: Math.max(0, peak - 14), kind: 'whoosh', vol });

/** Liste des bruitages, calée sur l'animation. */
export const cues = (showContact: boolean): Cue[] => {
  const list: Cue[] = [
    // transitions de scène (whoosh)
    W(70), // le texte se brise
    W(122), // traversée du monogramme → titre
    W(276), // titre → métiers
    W(380, 0.6), // vague de cartes 2 (plus discret)
    W(476, 0.6), // vague de cartes 3
    W(564), // métiers → ordinateur et téléphone
    W(900), // plongée dans l'écran
    W(1166), // prix → maquette gratuite
    W(1310), // → écran final
    // arrivée du monogramme PS (impact grave)
    { f: 86, kind: 'impact' },
    { f: 1322, kind: 'impact' },
    // apparitions de texte (clic)
    { f: 1, kind: 'clic' },
    ...CAPTIONS.map((c) => ({ f: c.from, kind: 'clic' as const })),
    { f: 300, kind: 'clic', vol: 0.7 }, // mention « concepts d'exemple »
    { f: 918, kind: 'clic' },
    { f: 930, kind: 'clic' },
    { f: 942, kind: 'clic' },
    { f: 1336, kind: 'clic' },
  ];
  if (showContact) {
    const C = config.coordonnees;
    const rows = [C.site, C.whatsapp, ...C.emails, C.instagram, C.tiktok, C.snapchat].filter(Boolean).length;
    for (let i = 0; i < rows; i++) list.push({ f: 1336 + 22 + i * 7, kind: 'clic', vol: 0.8 });
  }
  return list.sort((a, b) => a.f - b.f);
};

const MUSIC = 'audio/musique.mp3';

/** Musique (facultative) + bruitages, avec un léger retrait de la musique sous les impacts. */
export const Sound: React.FC<{ showContact: boolean }> = ({ showContact }) => {
  const { durationInFrames } = useVideoConfig();
  const S = config.son;
  if (S.couperTout) return null;
  const files = getStaticFiles().map((f) => f.name);
  const hasMusic = files.includes(MUSIC);
  const list = S.bruitages ? cues(showContact).filter((c) => files.includes(`sfx/${c.kind}.wav`)) : [];
  const impacts = list.filter((c) => c.kind === 'impact').map((c) => c.f);

  return (
    <>
      {hasMusic && (
        <Audio
          src={staticFile(MUSIC)}
          volume={(f) => {
            const fade = interpolate(
              f,
              [0, S.fonduEntreeSec * FPS, durationInFrames - S.fonduSortieSec * FPS, durationInFrames],
              [0, 1, 1, 0],
              { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' },
            );
            // "ducking" : la musique baisse de 35 % pendant ~1 s autour de chaque impact
            const duck = impacts.reduce(
              (m, i) => Math.max(m, interpolate(f, [i - 3, i, i + 12, i + 30], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })),
              0,
            );
            return S.volume * fade * (1 - 0.35 * duck);
          }}
        />
      )}
      {list.map((c, i) => (
        <Sequence key={i} from={c.f} durationInFrames={LENGTH[c.kind] + 4} layout="none">
          <Audio src={staticFile(`sfx/${c.kind}.wav`)} volume={S.volumeBruitages * LEVEL[c.kind] * (c.vol ?? 1)} />
        </Sequence>
      ))}
    </>
  );
};
