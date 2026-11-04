import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { bundle } from '@remotion/bundler';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Navigateur : celui de Remotion par défaut ; sinon un Chromium local s'il est fourni.
const candidates = [
  process.env.REMOTION_BROWSER,
  '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell',
].filter(Boolean);
export const browserExecutable = candidates.find((p) => fs.existsSync(p)) ?? null;
export const chromiumOptions = { gl: 'swangle' };

export const makeBundle = () =>
  bundle({ entryPoint: path.join(ROOT, 'src/index.ts'), publicDir: path.join(ROOT, 'public') });
