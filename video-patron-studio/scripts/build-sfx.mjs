// Génère les bruitages en code (synthèse), sans aucun fichier externe ni droits à gérer.
// node scripts/build-sfx.mjs  →  public/sfx/whoosh.wav, clic.wav, impact.wav
import fs from 'node:fs';

const SR = 44100;
let seed = 12345;
const rnd = () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};
const noise = () => rnd() * 2 - 1;

/** Filtre passe-bande / passe-bas (state-variable). */
const svf = () => {
  let low = 0;
  let band = 0;
  return (x, freq, q) => {
    const f = 2 * Math.sin((Math.PI * Math.min(freq, SR / 6)) / SR);
    low += f * band;
    const high = x - low - q * band;
    band += f * high;
    return { low, band, high };
  };
};

const writeWav = (file, L, R = L, peakDb = -6) => {
  const n = L.length;
  let peak = 0;
  for (let i = 0; i < n; i++) peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
  const g = Math.pow(10, peakDb / 20) / (peak || 1);
  const buf = Buffer.alloc(44 + n * 4);
  buf.write('RIFF', 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write('WAVEfmt ', 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write('data', 36);
  buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, L[i] * g)) * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(Math.max(-1, Math.min(1, R[i] * g)) * 32767), 46 + i * 4);
  }
  fs.writeFileSync(new URL(`../public/sfx/${file}`, import.meta.url), buf);
  console.log(`public/sfx/${file}`);
};

// --- Whoosh : souffle filtré dont la fréquence monte puis redescend, avec panoramique ---
{
  const dur = 0.85;
  const n = Math.floor(dur * SR);
  const L = new Float32Array(n);
  const R = new Float32Array(n);
  const f1 = svf();
  const f2 = svf();
  for (let i = 0; i < n; i++) {
    const t = i / n;
    const env = Math.pow(Math.sin(Math.PI * Math.pow(t, 0.8)), 2.2);
    const freq = 350 + 2200 * Math.sin(Math.PI * Math.pow(t, 0.9));
    const s = f2(f1(noise(), freq, 0.9).band, freq * 1.3, 1.1).band * env;
    const pan = 0.2 + 0.6 * t;
    L[i] = s * Math.cos((pan * Math.PI) / 2);
    R[i] = s * Math.sin((pan * Math.PI) / 2);
  }
  writeWav('whoosh.wav', L, R, -5);
}

// --- Clic : petit "tic" doux et court ---
{
  const dur = 0.07;
  const n = Math.floor(dur * SR);
  const L = new Float32Array(n);
  const f = svf();
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const env = Math.exp(-t / 0.009);
    const tone = Math.sin(2 * Math.PI * 1900 * t) * 0.7 + Math.sin(2 * Math.PI * 3100 * t) * 0.25;
    const tick = f(noise(), 4000, 1.4).band * Math.exp(-t / 0.002);
    L[i] = (tone + tick * 0.8) * env * Math.min(1, i / 40);
  }
  writeWav('clic.wav', L, L, -8);
}

// --- Impact grave : sinus qui plonge + souffle étouffé ---
{
  const dur = 1.6;
  const n = Math.floor(dur * SR);
  const L = new Float32Array(n);
  const f = svf();
  let phase = 0;
  for (let i = 0; i < n; i++) {
    const t = i / SR;
    const freq = 38 + 70 * Math.exp(-t / 0.08);
    phase += (2 * Math.PI * freq) / SR;
    const body = Math.sin(phase) * Math.exp(-t / 0.42);
    const thump = f(noise(), 180, 0.7).low * Math.exp(-t / 0.05) * 1.6;
    const att = Math.min(1, i / 60);
    L[i] = Math.tanh((body + thump) * 1.6) * att;
  }
  writeWav('impact.wav', L, L, -3);
}
