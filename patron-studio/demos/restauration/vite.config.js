import { defineConfig } from 'vite';
import { demoConfig } from '@demos/shared/viteBase.js';

// La 3D (three.js) est importée à la demande (React.lazy) : fichier séparé, chargé après l'affichage.
export default defineConfig(demoConfig('restauration'));
