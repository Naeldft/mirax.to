// Configuration Vite commune : chaque démo est publiée dans /demos/<slug>/ du site Patrôn Studio.
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export const demoConfig = (slug) => ({
  base: `/demos/${slug}/`,
  plugins: [react(), tailwindcss()],
  build: { target: 'es2020', chunkSizeWarningLimit: 1200 },
  server: { port: 5173 },
});
