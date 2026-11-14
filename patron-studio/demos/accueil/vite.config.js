// Moteur 3D de l'accueil Patrôn Studio : compilé en un module chargé par site/index.html.
// Sortie : site/3d/accueil-3d.js (+ morceaux chargés à la demande, dont three.js).
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    outDir: resolve(__dirname, '../../site/3d'),
    emptyOutDir: true,
    target: 'es2020',
    chunkSizeWarningLimit: 1200,
    modulePreload: false,
    rollupOptions: {
      input: { 'accueil-3d': resolve(__dirname, 'src/main.jsx'), 'intro-3d': resolve(__dirname, 'src/intro.js') },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: 'morceaux/[name]-[hash].js',
        assetFileNames: 'morceaux/[name]-[hash][extname]',
      },
    },
  },
});
