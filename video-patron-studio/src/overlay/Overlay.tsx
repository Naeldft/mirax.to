import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { easeOut, parseAccent, ramp, sp } from '../anim';
import { BODY, DISPLAY } from '../assets';
import { CAPTIONS, Cap } from '../captions';
import { config } from '../config';
import { SAFE_BOTTOM, SAFE_TOP, W } from '../timeline';

const G = config.marque.vert;
const TX = config.textes;

const Accent: React.FC<{ text: string; frame: number; start: number; stagger?: number }> = ({ text, frame, start, stagger = 1.6 }) => {
  // apparition mot par mot (montée douce), lisible immédiatement
  let k = 0;
  return (
    <>
      {parseAccent(text).map((seg, si) =>
        seg.t.split(/(\s+)/).map((word, wi) => {
          if (/^\s+$/.test(word)) return word;
          const i = k++;
          const p = ramp(frame, start + i * stagger, start + i * stagger + 9, easeOut);
          return (
            <span
              key={`${si}-${wi}`}
              style={{
                display: 'inline-block',
                color: seg.accent ? G : '#fff',
                opacity: p,
                transform: `translateY(${(1 - p) * 26}px)`,
              }}
            >
              {word}
            </span>
          );
        }),
      )}
    </>
  );
};

export const CAPTION_TOP = 1215;
const CAPTION_BOTTOM_LIMIT = 1920 - SAFE_BOTTOM; // 1640

const Caption: React.FC<{ c: Cap; frame: number }> = ({ c, frame }) => {
  if (frame < c.from - 2 || frame > c.to) return null;
  const out = ramp(frame, c.to - 8, c.to);
  return (
    <div
      style={{
        position: 'absolute',
        left: 60,
        right: 60,
        top: CAPTION_TOP,
        maxHeight: CAPTION_BOTTOM_LIMIT - CAPTION_TOP,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        opacity: 1 - out,
        transform: `translateY(${-out * 30}px)`,
      }}
    >
      <div
        style={{
          fontFamily: c.big ? DISPLAY : BODY,
          fontWeight: 800,
          fontSize: c.big ? 84 : 66,
          lineHeight: 1.16,
          letterSpacing: c.big ? -1 : -0.5,
          color: '#fff',
          textShadow: '0 4px 24px rgba(0,0,0,0.9), 0 0 2px rgba(0,0,0,1)',
        }}
      >
        <Accent text={c.text} frame={frame} start={c.from} />
      </div>
      {c.small && (
        <div
          style={{
            marginTop: 26,
            fontFamily: BODY,
            fontWeight: c.big ? 700 : 600,
            fontSize: c.big ? 60 : 44,
            lineHeight: 1.2,
            color: c.big ? '#fff' : '#d4d4d4',
            textShadow: '0 4px 20px rgba(0,0,0,0.9)',
          }}
        >
          <Accent text={c.small} frame={frame} start={c.from + (c.big ? 18 : 22)} />
        </div>
      )}
    </div>
  );
};

const Pill: React.FC<{ frame: number; from: number; to: number; top: number; children: React.ReactNode; muted?: boolean }> = ({
  frame,
  from,
  to,
  top,
  children,
  muted,
}) => {
  if (frame < from || frame > to) return null;
  const s = sp(frame, from, 14, 0.7, 120);
  const out = ramp(frame, to - 8, to);
  return (
    <div style={{ position: 'absolute', top, left: 0, width: W, display: 'flex', justifyContent: 'center', opacity: s * (1 - out) }}>
      <div
        style={{
          transform: `scale(${0.85 + s * 0.15})`,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          padding: muted ? '10px 22px' : '14px 30px',
          borderRadius: 999,
          border: `2px solid ${muted ? '#555' : G}`,
          background: 'rgba(0,0,0,0.6)',
          fontFamily: BODY,
          fontWeight: 600,
          fontSize: muted ? 30 : 42,
          color: muted ? '#bdbdbd' : '#fff',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const PinIcon: React.FC = () => (
  <svg width="30" height="38" viewBox="0 0 24 30">
    <path d="M12 0C5.4 0 0 5.2 0 11.7 0 20.4 12 30 12 30s12-9.6 12-18.3C24 5.2 18.6 0 12 0z" fill={G} />
    <circle cx="12" cy="11.5" r="4.6" fill="#000" />
  </svg>
);

/** Pictogramme de bulle de discussion (pas le logo officiel WhatsApp). */
export const ChatIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <path d="M24 4C12.4 4 3 12.3 3 22.6c0 5.6 2.8 10.6 7.2 14L8 44l9.2-4.4c2.1.6 4.4.9 6.8.9 11.6 0 21-8.3 21-18.6S35.6 4 24 4z" fill={G} />
    <path d="M17 16.5c.6-.6 1.6-.6 2.1.1l2 2.9c.4.6.3 1.4-.2 1.9l-1.2 1.1c1.1 2.3 3 4.2 5.3 5.3l1.1-1.2c.5-.5 1.3-.6 1.9-.2l2.9 2c.7.5.7 1.5.1 2.1l-1.5 1.5c-1 1-2.6 1.3-3.9.7-4.4-2-7.9-5.5-9.9-9.9-.6-1.3-.3-2.9.7-3.9z" fill="#000" />
  </svg>
);

const MailIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48">
    <rect x="3" y="9" width="42" height="30" rx="6" fill="none" stroke={G} strokeWidth="4" />
    <path d="M6 13l18 13 18-13" fill="none" stroke={G} strokeWidth="4" strokeLinejoin="round" />
  </svg>
);

const GlobeIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 48 48" fill="none" stroke={G} strokeWidth="3.6">
    <circle cx="24" cy="24" r="19" />
    <ellipse cx="24" cy="24" rx="8.5" ry="19" />
    <path d="M6 18h36M6 30h36" />
  </svg>
);

/** Scène 7 : appel à l'action + coordonnées. */
const CTA: React.FC<{ frame: number; showContact: boolean }> = ({ frame, showContact }) => {
  const start = 1336;
  if (frame < start - 2) return null;
  const C = config.coordonnees;
  const text = TX.utiliserVarianteCta ? TX.ctaVariante : TX.cta;
  type Row = { key: string; icon: React.ReactNode; label?: string; value: string; size: number; font: string; color: string };
  const rows: Row[] = [];
  if (C.site) rows.push({ key: 'site', icon: <GlobeIcon size={58} />, value: C.site, size: 70, font: DISPLAY, color: G });
  if (C.whatsapp) rows.push({ key: 'wa', icon: <ChatIcon size={66} />, label: 'WhatsApp', value: C.whatsapp, size: 66, font: BODY, color: '#fff' });
  if (C.email) rows.push({ key: 'mail', icon: <MailIcon size={52} />, value: C.email, size: 44, font: BODY, color: '#fff' });
  // Réseaux sociaux : uniquement si renseignés dans config.ts
  if (C.instagram) rows.push({ key: 'ig', icon: null, label: 'Instagram', value: C.instagram, size: 40, font: BODY, color: '#fff' });
  if (C.tiktok) rows.push({ key: 'tt', icon: null, label: 'TikTok', value: C.tiktok, size: 40, font: BODY, color: '#fff' });
  if (C.snapchat) rows.push({ key: 'sc', icon: null, label: 'Snapchat', value: C.snapchat, size: 40, font: BODY, color: '#fff' });
  const compact = rows.length > 3;

  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 660,
          left: 70,
          right: 70,
          textAlign: 'center',
          fontFamily: DISPLAY,
          fontWeight: 800,
          fontSize: 66,
          lineHeight: 1.13,
          letterSpacing: -0.5,
          color: '#fff',
        }}
      >
        <Accent text={text} frame={frame} start={start} stagger={2} />
      </div>
      {showContact && (
        <div
          style={{
            position: 'absolute',
            top: 940,
            bottom: SAFE_BOTTOM + 30,
            left: 60,
            right: 60,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: compact ? 22 : 40,
          }}
        >
          {rows.map((r, i) => {
            const s = sp(frame, start + 22 + i * 7, 15, 0.8, 120);
            return (
              <div
                key={r.key}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 22,
                  opacity: Math.min(1, s * 1.3),
                  transform: `translateY(${(1 - s) * 40}px) scale(${0.9 + 0.1 * s})`,
                }}
              >
                {r.icon}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {r.label && (
                    <div style={{ fontFamily: BODY, fontWeight: 600, fontSize: 30, color: '#bdbdbd', marginBottom: 2 }}>{r.label}</div>
                  )}
                  <div style={{ fontFamily: r.font, fontWeight: 800, fontSize: compact ? r.size * 0.85 : r.size, color: r.color, lineHeight: 1.05, whiteSpace: 'nowrap' }}>
                    {r.value}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </AbsoluteFill>
  );
};

/** Dégradé sombre derrière les sous-titres pour garantir la lisibilité sur la 3D. */
const CaptionScrim: React.FC<{ frame: number }> = ({ frame }) => {
  const on = interpolate(frame, [110, 130, 1316, 1330], [0, 1, 1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 1100,
        height: 620,
        opacity: on,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.78) 25%, rgba(0,0,0,0.85) 75%, rgba(0,0,0,0) 100%)',
      }}
    />
  );
};

export const Overlay: React.FC<{ showContact: boolean; debugSafe?: boolean }> = ({ showContact, debugSafe }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      <CaptionScrim frame={frame} />
      {CAPTIONS.map((c, i) => (
        <Caption key={i} c={c} frame={frame} />
      ))}
      <Pill frame={frame} from={150} to={262} top={1105}>
        <PinIcon />
        {TX.lieu}
      </Pill>
      <Pill frame={frame} from={300} to={556} top={1130} muted>
        {TX.mentionConcepts}
      </Pill>
      <CTA frame={frame} showContact={showContact} />
      {debugSafe && (
        <>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: SAFE_TOP, background: 'rgba(255,0,0,0.25)' }} />
          <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: SAFE_BOTTOM, background: 'rgba(255,0,0,0.25)' }} />
        </>
      )}
    </AbsoluteFill>
  );
};
