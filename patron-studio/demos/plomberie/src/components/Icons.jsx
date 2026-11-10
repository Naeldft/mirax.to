// Pictogrammes dessinés pour la démo (traits simples).
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Svg = ({ children, ...p }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...s} {...p}>
    {children}
  </svg>
);
export const Goutte = (p) => (
  <Svg {...p}>
    <path d="M12 3c3 4.4 6 7.7 6 11a6 6 0 0 1-12 0c0-3.3 3-6.6 6-11Z" />
    <path d="M9.5 15a2.5 2.5 0 0 0 2.5 2.5" />
  </Svg>
);
export const Debouchage = (p) => (
  <Svg {...p}>
    <path d="M12 3v9" />
    <path d="M7 12h10l-1.5 8h-7L7 12Z" />
    <path d="M9 6h6" />
  </Svg>
);
export const Ballon = (p) => (
  <Svg {...p}>
    <rect x="6" y="3" width="12" height="16" rx="5" />
    <path d="M9 21v-2M15 21v-2M12 8v5" />
    <circle cx="12" cy="14.5" r="1.5" />
  </Svg>
);
export const Robinet = (p) => (
  <Svg {...p}>
    <path d="M4 10h9a4 4 0 0 1 4 4v1" />
    <path d="M4 7v6M8 7h4" />
    <path d="M17 18.5c0 .8-.7 1.5-1.5 1.5S14 19.3 14 18.5c0-.9 1.5-2.5 1.5-2.5s1.5 1.6 1.5 2.5Z" />
  </Svg>
);
export const Flamme = (p) => (
  <Svg {...p}>
    <path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2 1-3.5 2-4.5.3 1.7 1.2 2.7 2.2 3-.6-3 .2-6 .8-8.5Z" />
  </Svg>
);
export const Douche = (p) => (
  <Svg {...p}>
    <path d="M5 21V8a4 4 0 0 1 8 0" />
    <path d="M10 8h6l-1 3h-4l-1-3Z" />
    <path d="M11 14v1M13 14v2M15 14v1" />
  </Svg>
);
export const Telephone = (p) => (
  <Svg {...p}>
    <path d="M5 3.5h3l1.6 4.2-2 1.3a11 11 0 0 0 5.4 5.4l1.3-2 4.2 1.6v3A2.5 2.5 0 0 1 16 19.5 13.5 13.5 0 0 1 2.5 6 2.5 2.5 0 0 1 5 3.5Z" />
  </Svg>
);
export const Check = (p) => (
  <Svg {...p} strokeWidth={2.4}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </Svg>
);
export const Etoile = ({ plein = true, ...p }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path
      d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6L12 16.8 6.6 19.6l1.1-6L3.2 9.4l6.1-.8L12 3Z"
      fill={plein ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.4"
    />
  </svg>
);
export const Logo = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <path d="M20 4c5 7 11 13 11 20a11 11 0 0 1-22 0c0-7 6-13 11-20Z" fill="#5fd4e8" />
    <path d="M13 26c2 4 6 5 9 4" stroke="#0a1724" strokeWidth="2.6" fill="none" strokeLinecap="round" />
  </svg>
);
export const icones = { goutte: Goutte, debouchage: Debouchage, ballon: Ballon, robinet: Robinet, flamme: Flamme, douche: Douche };
