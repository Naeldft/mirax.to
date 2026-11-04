import React, { createContext, useContext, useEffect, useState } from 'react';
import { continueRender, delayRender, staticFile } from 'remotion';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';

export const DISPLAY = 'Syne';
export const BODY = 'Inter';

const faces: [string, string, string][] = [
  [DISPLAY, 'fonts/syne-latin-700-normal.woff2', '700'],
  [DISPLAY, 'fonts/syne-latin-800-normal.woff2', '800'],
  [BODY, 'fonts/inter-latin-500-normal.woff2', '500'],
  [BODY, 'fonts/inter-latin-600-normal.woff2', '600'],
  [BODY, 'fonts/inter-latin-700-normal.woff2', '700'],
  [BODY, 'fonts/inter-latin-800-normal.woff2', '800'],
];

type Assets = { font3d: Font; fontMono: Font };
const Ctx = createContext<Assets | null>(null);
export const useAssets = () => {
  const a = useContext(Ctx);
  if (!a) throw new Error('assets not loaded');
  return a;
};

let cache: Promise<Assets> | null = null;
const loadAll = () => {
  if (!cache) {
    cache = (async () => {
      await Promise.all(
        faces.map(async ([family, file, weight]) => {
          const ff = new FontFace(family, `url(${staticFile(file)}) format('woff2')`, { weight });
          await ff.load();
          document.fonts.add(ff);
        }),
      );
      const [json, mono] = await Promise.all(
        ['fonts/syne-800.typeface.json', 'fonts/inter-800.typeface.json'].map((f) => fetch(staticFile(f)).then((r) => r.json())),
      );
      return { font3d: new Font(json), fontMono: new Font(mono) };
    })();
  }
  return cache;
};

export const AssetGate: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [assets, setAssets] = useState<Assets | null>(null);
  const [handle] = useState(() => delayRender('Chargement des polices'));
  useEffect(() => {
    loadAll()
      .then((a) => {
        setAssets(a);
        continueRender(handle);
      })
      .catch((e) => {
        console.error(e);
        throw e;
      });
  }, [handle]);
  if (!assets) return null;
  return <Ctx.Provider value={assets}>{children}</Ctx.Provider>;
};
