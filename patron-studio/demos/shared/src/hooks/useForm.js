import { useMemo, useRef, useState } from 'react';

/**
 * Petit gestionnaire de formulaire (validation côté navigateur, messages accessibles).
 *  valider(valeurs) → { champ: 'message d’erreur' }
 *  onValide(valeurs) → appelé si tout est correct
 */
export function useForm(initial, valider, onValide) {
  const [values, setValues] = useState(initial);
  const [touched, setTouched] = useState({});
  const [sent, setSent] = useState(false);
  const form = useRef(null);
  const errors = useMemo(() => valider(values), [values, valider]);
  const show = (k) => (touched[k] || sent) && errors[k];
  const set = (k) => (e) => {
    const t = e.target;
    const v = t.type === 'checkbox' ? t.checked : t.type === 'range' || t.type === 'number' ? Number(t.value) : t.value;
    setValues((o) => ({ ...o, [k]: v }));
  };
  const setValue = (k, v) => setValues((o) => ({ ...o, [k]: v }));
  const field = (k) => ({
    name: k,
    id: k,
    onBlur: () => setTouched((t) => ({ ...t, [k]: true })),
    'aria-invalid': show(k) ? 'true' : 'false',
    'aria-describedby': show(k) ? `${k}-err` : undefined,
  });
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    const first = Object.keys(errors)[0];
    if (first) {
      form.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    onValide(values);
  };
  const reset = () => {
    setValues(initial);
    setTouched({});
    setSent(false);
  };
  return { values, set, setValue, field, show, errors, submit, reset, form };
}
