import { useEffect } from 'react';

/**
 * Position de la souris (ou inclinaison du téléphone) normalisée entre -1 et 1.
 * Objet partagé et mis à jour hors React : à lire dans useFrame, sans re-rendu.
 *   pointer.x / pointer.y : valeurs cibles ; à lisser côté 3D (lerp).
 */
export const pointer = { x: 0, y: 0, source: 'none' };

let users = 0;
let detach = null;

function attach() {
  const onMove = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
    pointer.source = 'mouse';
  };
  const onOrient = (e) => {
    if (e.gamma == null || e.beta == null) return;
    pointer.x = Math.max(-1, Math.min(1, e.gamma / 30));
    pointer.y = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
    pointer.source = 'gyro';
  };
  // iOS : l'accès à l'inclinaison doit être demandé lors d'un geste de l'utilisateur
  const askPermission = () => {
    const DOE = window.DeviceOrientationEvent;
    if (DOE && typeof DOE.requestPermission === 'function') {
      DOE.requestPermission()
        .then((r) => r === 'granted' && window.addEventListener('deviceorientation', onOrient))
        .catch(() => {});
    }
    window.removeEventListener('touchend', askPermission);
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  const needsPermission = typeof window.DeviceOrientationEvent?.requestPermission === 'function';
  if (needsPermission) window.addEventListener('touchend', askPermission, { passive: true });
  else window.addEventListener('deviceorientation', onOrient);
  return () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('deviceorientation', onOrient);
    window.removeEventListener('touchend', askPermission);
  };
}

export function usePointer() {
  useEffect(() => {
    if (users++ === 0) detach = attach();
    return () => {
      if (--users === 0 && detach) detach();
    };
  }, []);
  return pointer;
}
