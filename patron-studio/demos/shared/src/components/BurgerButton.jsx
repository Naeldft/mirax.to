/** Bouton burger animé (trois traits → croix). */
export default function BurgerButton({ open, onClick, buttonRef, controls, className = '', color = 'currentColor' }) {
  const bar = 'absolute left-0 h-0.5 rounded transition-all duration-300';
  return (
    <button
      ref={buttonRef}
      type="button"
      className={`relative flex h-12 w-12 items-center justify-center ${className}`}
      aria-expanded={open}
      aria-controls={controls}
      aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
      onClick={onClick}
    >
      <span className="relative block h-4 w-7">
        <span className={`${bar} w-7 ${open ? 'top-[7px] rotate-45' : 'top-0'}`} style={{ background: color }} />
        <span className={`${bar} top-[7px] ${open ? 'w-0 opacity-0' : 'w-5 opacity-100'}`} style={{ background: color }} />
        <span className={`${bar} w-7 ${open ? 'top-[7px] -rotate-45' : 'top-[14px]'}`} style={{ background: color }} />
      </span>
    </button>
  );
}
