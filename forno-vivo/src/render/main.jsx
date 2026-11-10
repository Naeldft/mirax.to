// Page de développement uniquement (render.html) : génère les visuels du site
// à partir de la 3D. Utilisée par scripts/render-images.mjs, non incluse dans le site publié.
import { createRoot } from 'react-dom/client';
import RenderStudio from './RenderStudio';

createRoot(document.getElementById('root')).render(<RenderStudio />);
