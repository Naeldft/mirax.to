import { useId } from 'react';

/* ------------------------------------------------------------------
   « Photos » du portfolio, dessinées en SVG (aucune image externe).
   Chaque composition utilise 3 tons : [lumière, milieu, ombre].
   Pour un vrai client : remplacer par <img src="..." /> (même cadre).
------------------------------------------------------------------- */

const rnd = (i) => {
  const x = Math.sin(i * 91.7 + 3.3) * 43758.5453;
  return x - Math.floor(x);
};

/** Silhouette debout (tête + corps). robe : corps évasé. */
const Personne = ({ x, y, h, fill, robe }) => {
  const t = h * 0.13;
  return (
    <g fill={fill}>
      <circle cx={x} cy={y - h + t} r={t} />
      {robe ? (
        <path d={`M${x - t * 0.9} ${y - h + t * 2.2} L${x + t * 0.9} ${y - h + t * 2.2} L${x + t * 2.6} ${y} L${x - t * 2.6} ${y} Z`} />
      ) : (
        <path
          d={`M${x - t * 1.25} ${y - h + t * 2.2} h${t * 2.5} l${t * 0.2} ${h * 0.45} h-${t * 0.5} l-${t * 0.2} ${h * 0.47} h-${t * 0.8} l-${t * 0.25} -${h * 0.4} l-${t * 0.25} ${h * 0.4} h-${t * 0.8} l-${t * 0.2} -${h * 0.47} h-${t * 0.5} Z`}
        />
      )}
    </g>
  );
};

function Scene({ scene, ton, id }) {
  const [L, M, D] = ton;
  switch (scene) {
    case 'couple':
      return (
        <>
          <circle cx="250" cy="170" r="70" fill={L} opacity="0.9" />
          <path d="M0 300 Q200 250 400 290 V400 H0 Z" fill={D} />
          <rect x="88" y="120" width="18" height="170" fill={D} />
          {[
            [97, 110, 70],
            [60, 140, 50],
            [140, 135, 55],
            [100, 70, 50],
          ].map(([cx, cy, r], i) => (
            <circle key={i} cx={cx} cy={cy} r={r} fill={D} />
          ))}
          <Personne x={225} y={300} h={110} fill={D} robe />
          <Personne x={268} y={300} h={122} fill={D} />
        </>
      );
    case 'portrait':
      return (
        <>
          <rect width="400" height="400" fill={M} />
          <rect x="250" y="40" width="110" height="200" fill={L} opacity="0.85" />
          <rect x="302" y="40" width="6" height="200" fill={M} />
          <rect x="250" y="138" width="110" height="6" fill={M} />
          <path
            d="M60 400 Q70 300 140 285 Q120 250 125 210 Q130 150 185 150 Q240 150 245 210 Q250 250 228 285 Q300 300 310 400 Z"
            fill={D}
          />
          <path d="M240 200 Q248 240 228 285" stroke={L} strokeWidth="4" fill="none" opacity="0.7" />
        </>
      );
    case 'dune':
      return (
        <>
          <rect y="215" width="400" height="40" fill={D} />
          <path d="M0 400 V260 Q130 190 230 230 Q320 265 400 250 V400 Z" fill={M} />
          <path d="M0 400 V300 Q160 260 400 330 V400 Z" fill={L} opacity="0.45" />
          <Personne x={180} y={212} h={34} fill={D} />
          <Personne x={195} y={213} h={30} fill={D} robe />
          <Personne x={208} y={214} h={18} fill={D} />
        </>
      );
    case 'mains':
      return (
        <>
          <rect width="400" height="400" fill={L} />
          <path d="M-20 260 Q120 200 210 230 Q250 245 240 270 Q230 290 170 285 L-20 330 Z" fill={M} />
          <path d="M420 190 Q290 170 220 215 Q195 235 215 255 Q240 270 300 250 L420 260 Z" fill={D} opacity="0.85" />
          <circle cx="212" cy="236" r="13" fill="none" stroke="#e0a95f" strokeWidth="5" />
          <circle cx="216" cy="224" r="4" fill="#fff" />
        </>
      );
    case 'equipe':
      return (
        <>
          <rect width="400" height="400" fill={L} />
          <rect y="300" width="400" height="100" fill={M} opacity="0.5" />
          {[70, 130, 195, 260, 325].map((x, i) => (
            <Personne key={x} x={x} y={330} h={150 + ((i * 37) % 30)} fill={D} robe={i === 1 || i === 3} />
          ))}
        </>
      );
    case 'profil':
      return (
        <>
          <rect width="400" height="400" fill={D} />
          <circle cx="250" cy="170" r="120" fill={`url(#${id}-flare)`} />
          <path
            d="M120 400 L130 330 Q150 300 160 280 Q150 250 158 236 L150 222 Q160 212 162 196 Q150 190 158 180 Q165 160 166 140 Q172 90 225 80 Q280 75 300 130 Q315 180 290 230 Q280 260 290 300 Q330 330 340 400 Z"
            fill="#0a0807"
          />
          <path
            d="M166 140 Q160 165 158 180 Q150 190 162 196 Q160 212 150 222 L158 236 Q150 250 160 280"
            stroke={L}
            strokeWidth="3"
            fill="none"
          />
        </>
      );
    case 'vagues':
      return (
        <>
          <rect width="400" height="160" fill={L} />
          <rect y="160" width="400" height="240" fill={M} />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path
              key={i}
              d={`M0 ${190 + i * 38} Q50 ${180 + i * 38} 100 ${190 + i * 38} T200 ${190 + i * 38} T300 ${190 + i * 38} T400 ${190 + i * 38}`}
              stroke="#fff"
              strokeWidth={2 + i}
              fill="none"
              opacity={0.5 - i * 0.05}
            />
          ))}
          <Personne x={170} y={300} h={70} fill={D} />
          <Personne x={215} y={305} h={46} fill={D} robe />
        </>
      );
    case 'chai':
      return (
        <>
          <rect width="400" height="400" fill={D} />
          <path d="M260 0 L400 0 L400 400 L120 400 Z" fill={L} opacity="0.12" />
          {[0, 1].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <g key={`${r}-${c}`} transform={`translate(${60 + c * 95} ${170 + r * 105})`}>
                <ellipse rx="44" ry="48" fill={M} />
                <ellipse rx="34" ry="38" fill={D} opacity="0.5" />
                <ellipse rx="44" ry="48" fill="none" stroke={L} strokeWidth="3" opacity="0.4" />
              </g>
            )),
          )}
          <Personne x={330} y={390} h={150} fill="#0a0605" />
        </>
      );
    case 'confettis':
      return (
        <>
          <rect width="400" height="400" fill={L} />
          <path d="M110 400 V190 Q200 70 290 190 V400" fill="none" stroke={M} strokeWidth="18" />
          <Personne x={182} y={380} h={150} fill={D} robe />
          <Personne x={225} y={380} h={165} fill={D} />
          {Array.from({ length: 70 }, (_, i) => (
            <circle key={i} cx={rnd(i) * 400} cy={rnd(i + 100) * 300} r={1.5 + rnd(i + 200) * 3} fill={i % 3 ? '#fff' : M} />
          ))}
        </>
      );
    default:
      return null;
  }
}

export default function Photo({ photo, className = '' }) {
  const id = useId().replace(/:/g, '');
  const [L, M] = photo.ton;
  return (
    <svg
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`${photo.titre} (${photo.cat})`}
    >
      <defs>
        <linearGradient id={`${id}-ciel`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={L} />
          <stop offset="1" stopColor={M} />
        </linearGradient>
        <radialGradient id={`${id}-flare`}>
          <stop offset="0" stopColor={L} />
          <stop offset="0.5" stopColor={M} stopOpacity="0.6" />
          <stop offset="1" stopColor={M} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-vignette`} cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.55" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>
      <rect width="400" height="400" fill={`url(#${id}-ciel)`} />
      <Scene scene={photo.scene} ton={photo.ton} id={id} />
      <rect width="400" height="400" fill={`url(#${id}-vignette)`} />
    </svg>
  );
}
