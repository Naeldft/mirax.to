import PhotoOpt from '@demos/shared/components/Photo.jsx';

/* ------------------------------------------------------------------
   Photo du portfolio : une vraie photo Pexels, optimisée en WebP (800 / 1 600 px), cadrée par son conteneur.
------------------------------------------------------------------- */
export default function Photo({ photo, className = '', sizes }) {
  return <PhotoOpt nom={photo.nom} alt={photo.alt} sizes={sizes ?? '(min-width: 768px) 40vw, 100vw'} className={`object-cover ${className}`} />;
}
