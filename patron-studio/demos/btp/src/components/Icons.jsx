const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'square', strokeLinejoin: 'miter' };
const Svg = ({ children, ...p }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...s} {...p}>
    {children}
  </svg>
);
export const Telephone = (p) => (
  <Svg {...p} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 3.5h3l1.6 4.2-2 1.3a11 11 0 0 0 5.4 5.4l1.3-2 4.2 1.6v3A2.5 2.5 0 0 1 16 19.5 13.5 13.5 0 0 1 2.5 6 2.5 2.5 0 0 1 5 3.5Z" />
  </Svg>
);
export const Check = (p) => (
  <Svg {...p} strokeWidth={3}>
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
export const Bouclier = (p) => (
  <Svg {...p}>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6Z" />
    <path d="m8.5 12 2.5 2.5 4.5-5" />
  </Svg>
);
export const Logo = ({ className = '' }) => (
  <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
    <rect width="40" height="40" fill="#f2b705" />
    <path d="M7 32V18L20 8l13 10v14h-9v-8h-8v8Z" fill="#1d1d1b" />
  </svg>
);
