const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' };
const Svg = ({ children, ...p }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...s} {...p}>
    {children}
  </svg>
);
export const Telephone = (p) => (
  <Svg {...p}>
    <path d="M5 3.5h3l1.6 4.2-2 1.3a11 11 0 0 0 5.4 5.4l1.3-2 4.2 1.6v3A2.5 2.5 0 0 1 16 19.5 13.5 13.5 0 0 1 2.5 6 2.5 2.5 0 0 1 5 3.5Z" />
  </Svg>
);
export const Places = (p) => (
  <Svg {...p}>
    <circle cx="9" cy="7" r="3" />
    <path d="M3 20a6 6 0 0 1 12 0" />
    <path d="M16 4a3 3 0 0 1 0 6M21 20a6 6 0 0 0-4-5.6" />
  </Svg>
);
export const Valise = (p) => (
  <Svg {...p}>
    <rect x="4" y="7" width="16" height="13" rx="2" />
    <path d="M9 7V4h6v3M4 12h16" />
  </Svg>
);
export const Boite = (p) => (
  <Svg {...p}>
    <path d="M6 4v16M12 4v16M18 4v8H6" />
  </Svg>
);
export const Energie = (p) => (
  <Svg {...p}>
    <path d="M4 20V5a1 1 0 0 1 1-1h8a1 1 0 0 1 1 1v15M3 20h12M14 9h3l2 2v6a1.5 1.5 0 0 1-3 0v-3h-2" />
    <path d="M7 8h4" />
  </Svg>
);
export const Check = (p) => (
  <Svg {...p} strokeWidth={2.6}>
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
  <svg viewBox="0 0 64 40" className={className} aria-hidden="true">
    <path d="M2 4h14l12 26L40 4h14L34 38H22Z" fill="#e10600" />
    <path d="M44 4h18L52 24" fill="none" stroke="#f4f2ee" strokeWidth="4" />
  </svg>
);
