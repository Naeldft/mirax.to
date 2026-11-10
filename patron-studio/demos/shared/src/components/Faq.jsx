import { useId, useRef, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion.js';
import { gsap } from '../lib/gsap.js';

/**
 * Questions fréquentes (accordéon accessible). Le style est fourni par chaque démo :
 * classes = { item, button, icon, answer }
 */
function Item({ q, a, classes, defaultOpen }) {
  const [open, setOpen] = useState(!!defaultOpen);
  const panel = useRef(null);
  const id = useId();
  const reduced = useReducedMotion();
  const toggle = () => {
    const el = panel.current;
    const next = !open;
    setOpen(next);
    if (!el || reduced) return;
    if (next) gsap.fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.45, ease: 'power3.out' });
    else gsap.fromTo(el, { height: el.offsetHeight, opacity: 1 }, { height: 0, opacity: 0, duration: 0.35, ease: 'power3.in' });
  };
  return (
    <div className={classes.item} data-reveal>
      <h3>
        <button type="button" className={classes.button} aria-expanded={open} aria-controls={id} onClick={toggle}>
          <span>{q}</span>
          <span
            className={classes.icon}
            aria-hidden="true"
            style={{ transform: open ? 'rotate(45deg)' : 'none', transition: 'transform .3s' }}
          >
            +
          </span>
        </button>
      </h3>
      <div id={id} ref={panel} role="region" style={{ overflow: 'hidden', height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}>
        <p className={classes.answer}>{a}</p>
      </div>
    </div>
  );
}

export default function Faq({ items, classes }) {
  return (
    <div>
      {items.map((it, i) => (
        <Item key={it.q} {...it} classes={classes} defaultOpen={i === 0} />
      ))}
    </div>
  );
}
