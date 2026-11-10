// Icônes SVG simples (dessinées pour le site, aucune dépendance).
const base = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' };

export const Flame = (p) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path
      d="M12 2.5c.8 3.2 4.8 5.3 4.8 10a4.8 4.8 0 0 1-9.6 0c0-2 1-3.4 2-4.3.3 1.6 1.1 2.6 2.1 2.9-.6-3 .1-6.1.7-8.6Z"
      fill="currentColor"
    />
  </svg>
);
export const Phone = (p) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...base} {...p}>
    <path d="M5 3.5h3l1.6 4.2-2 1.3a11 11 0 0 0 5.4 5.4l1.3-2 4.2 1.6v3A2.5 2.5 0 0 1 16 19.5 13.5 13.5 0 0 1 2.5 6 2.5 2.5 0 0 1 5 3.5Z" />
  </svg>
);
export const Pin = (p) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...base} {...p}>
    <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0C18.5 15.4 12 21 12 21Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);
export const Clock = (p) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...base} {...p}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);
export const Star = ({ filled = true, ...p }) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path
      d="m12 3 2.7 5.6 6.1.8-4.5 4.2 1.1 6L12 16.8 6.6 19.6l1.1-6L3.2 9.4l6.1-.8L12 3Z"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);
export const Arrow = ({ dir = 'right', ...p }) => (
  <svg
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    aria-hidden="true"
    {...base}
    {...p}
    style={{ transform: dir === 'left' ? 'scaleX(-1)' : undefined }}
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const Check = (p) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...base} strokeWidth={2.4} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
export const Leaf = (p) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path
      d="M20 4c-9 0-15 4-15 11 0 2 .6 3.5 1.4 4.6C8 13 12 10 16 8.5 12.5 11 9.5 14.5 8 20c1 .3 2 .5 3 .5 6.5 0 9-6.5 9-16.5Z"
      fill="currentColor"
    />
  </svg>
);
export const Chili = (p) => (
  <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
    <path d="M15.5 6.5c2.6.4 4 2.6 3.4 5.6-1 5.2-7.4 9.4-14.4 9 5-1.8 8.4-5.8 8.6-10.6.1-2.2 1-3.7 2.4-4Z" fill="currentColor" />
    <path d="M15.5 6.5c0-1.8.8-3 2.5-3.5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

// Réseaux sociaux : pictogrammes simplifiés
export const Social = ({ name, ...p }) => {
  if (name === 'instagram')
    return (
      <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...base} {...p}>
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  if (name === 'facebook')
    return (
      <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
        <path
          d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.6V4.4a21 21 0 0 0-2.4-.1c-2.4 0-4 1.4-4 4.1v2.1H7.7v3h2.6V21h3.2Z"
          fill="currentColor"
        />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...p}>
      <path
        d="M14 3h3c.2 2 1.6 3.6 3.6 3.8v3a7 7 0 0 1-3.6-1.1v6.2a5.8 5.8 0 1 1-5.8-5.8c.3 0 .6 0 .8.1v3.1a2.8 2.8 0 1 0 2 2.7V3Z"
        fill="currentColor"
      />
    </svg>
  );
};
