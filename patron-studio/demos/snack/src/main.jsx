import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// ?apercu-burger : le burger 3D seul, pour régler son rendu
const Apercu = lazy(() => import('./three/ApercuBurger.jsx'));
const apercu = new URLSearchParams(location.search).has('apercu-burger');

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {apercu ? (
      <Suspense fallback={null}>
        <Apercu />
      </Suspense>
    ) : (
      <App />
    )}
  </StrictMode>,
);
