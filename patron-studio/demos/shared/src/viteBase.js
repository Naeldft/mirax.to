// Configuration Vite commune : chaque démo est publiée dans /demos/<slug>/ du site Patrôn Studio.
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export const demoConfig = (_slug) => ({
  base: './', // chemins relatifs : la démo fonctionne dans /demos/${slug}/ comme dans n'importe quel sous-dossier
  plugins: [react(), tailwindcss()],
  build: { target: 'es2020', chunkSizeWarningLimit: 1200 },
  server: { port: 5173 },
});
