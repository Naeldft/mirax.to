/**
 * Estime la puissance de l'appareil pour adapter la 3D :
 *  'none' : pas de WebGL → image fixe
 *  'low'  : appareil modeste ou mode économie de données → 3D simplifiée
 *  'mid' / 'high'
 */
export function getDeviceTier() {
  if (typeof window === 'undefined') return 'mid';
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return 'none';
  } catch {
    return 'none';
  }
  const nav = navigator;
  const mem = nav.deviceMemory ?? 4;
  const cores = nav.hardwareConcurrency ?? 4;
  const saveData = nav.connection?.saveData;
  const small = window.innerWidth < 768;
  if (saveData || mem <= 2 || cores <= 2) return 'low';
  if (mem <= 4 || cores <= 4 || small) return 'mid';
  return 'high';
}
