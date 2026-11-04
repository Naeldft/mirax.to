// Export final : node scripts/render.mjs            → les deux versions
//                node scripts/render.mjs --principal → seulement la version avec coordonnées
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { renderMedia, selectComposition } from '@remotion/renderer';
import { ROOT, browserExecutable, chromiumOptions, makeBundle } from './common.mjs';

const OUT = path.join(ROOT, 'out');
fs.mkdirSync(OUT, { recursive: true });
const onlyMain = process.argv.includes('--principal');
const concurrency = Number(process.env.CONCURRENCY ?? 3);
const CTA_START = 1320; // début de la scène 7 (seule partie qui diffère entre les deux versions)

const music = fs.existsSync(path.join(ROOT, 'public/audio/musique.mp3'));
console.log(music ? '♪ musique trouvée : public/audio/musique.mp3' : 'Pas de musique (public/audio/musique.mp3 absent) : export sans musique.');

const serveUrl = await makeBundle();

const render = async (id, inputProps, output, frameRange) => {
  const composition = await selectComposition({ serveUrl, id, inputProps, browserExecutable, chromiumOptions });
  let last = -1;
  await renderMedia({
    serveUrl,
    composition,
    inputProps,
    codec: 'h264',
    crf: 18,
    pixelFormat: 'yuv420p',
    audioCodec: 'aac',
    audioBitrate: '192k',
    enforceAudioTrack: true, // piste AAC (silencieuse si pas de musique)
    outputLocation: output,
    frameRange,
    concurrency,
    browserExecutable,
    chromiumOptions,
    onProgress: ({ progress }) => {
      const p = Math.floor(progress * 100);
      if (p >= last + 5) {
        last = p;
        console.log(`${path.basename(output)} : ${p} %`);
      }
    },
  });
  console.log('✔', output);
};

const main = path.join(OUT, 'patron-studio-presentation.mp4');
const raw = path.join(OUT, '_brut.mp4');
await render('PatronStudio', { showContact: true }, raw);
// Normalisation yuv420p (plage vidéo standard) pour TikTok / Instagram / Snapchat
execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', raw, '-vf', 'scale=in_range=full:out_range=tv,format=yuv420p',
  '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-r', '30', '-c:a', 'copy', '-movflags', '+faststart', main]);
fs.unlinkSync(raw);
execFileSync('npx', ['tsx', 'scripts/srt.ts', path.join(OUT, 'patron-studio-presentation.srt')], { cwd: ROOT, stdio: 'inherit' });

if (!onlyMain) {
  // Version sans coordonnées : on ne recalcule que la scène finale, puis on la raccorde.
  const tail = path.join(OUT, '_fin-sans-contact.mp4');
  await render('PatronStudioSansContact', { showContact: false }, tail, [CTA_START, 1499]);
  const sans = path.join(OUT, 'patron-studio-presentation-sans-contact.mp4');
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-i', main, '-i', tail,
    '-filter_complex', `[0:v]trim=end_frame=${CTA_START},setpts=PTS-STARTPTS[a];[1:v]setpts=PTS-STARTPTS[b];[a][b]concat=n=2:v=1:a=0[v]`,
    '-map', '[v]', '-map', '0:a',
    '-c:v', 'libx264', '-crf', '18', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-r', '30',
    '-c:a', 'copy', '-movflags', '+faststart', sans,
  ]);
  fs.unlinkSync(tail);
  execFileSync('npx', ['tsx', 'scripts/srt.ts', path.join(OUT, 'patron-studio-presentation-sans-contact.srt'), 'sans-contact'], { cwd: ROOT, stdio: 'inherit' });
  console.log('✔', sans);
}
