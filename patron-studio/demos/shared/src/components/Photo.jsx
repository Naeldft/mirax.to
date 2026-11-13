import { useEffect, useRef, useState } from 'react';

/**
 * Photo optimisée : WebP en deux tailles (800 px pour mobile, 1600 px pour ordinateur),
 * chargement différé (sauf `prioritaire` pour le haut de page), apparition en fondu.
 * Les fichiers sont créés par shared/scripts/optimiser-photos.mjs à partir de <démo>/photos/<nom>.jpg
 *  nom : emplacement (ex. 'pizza-margherita') → public/images/pizza-margherita-800.webp et -1600.webp
 */
export const photoUrl = (nom, w = 800) => `${import.meta.env.BASE_URL}images/${nom}-${w}.webp`;
export const photoSrcSet = (nom) => `${photoUrl(nom, 800)} 800w, ${photoUrl(nom, 1600)} 1600w`;

export default function Photo({ nom, alt, sizes = '(min-width: 768px) 50vw, 100vw', className = '', prioritaire = false, ...props }) {
  const ref = useRef(null);
  const [charge, setCharge] = useState(false);
  useEffect(() => {
    if (ref.current?.complete && ref.current.naturalWidth) setCharge(true);
  }, []);
  return (
    <img
      ref={ref}
      src={photoUrl(nom)}
      srcSet={photoSrcSet(nom)}
      sizes={sizes}
      alt={alt}
      loading={prioritaire ? 'eager' : 'lazy'}
      fetchPriority={prioritaire ? 'high' : 'auto'}
      decoding="async"
      onLoad={() => setCharge(true)}
      className={`transition-[opacity,transform] duration-700 ${charge ? 'opacity-100' : 'opacity-0'} ${className}`}
      {...props}
    />
  );
}
