export default function SectionTitle({ eyebrow, title, intro, align = 'center', id }) {
  const center = align === 'center';
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} max-w-2xl`}>
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 id={id} className="mt-3 text-4xl font-semibold leading-tight md:text-6xl" data-reveal>
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-creme/70 md:text-lg" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}
