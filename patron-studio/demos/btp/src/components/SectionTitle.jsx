export default function SectionTitle({ etiquette, title, intro, id, light = false }) {
  return (
    <div className="max-w-3xl">
      <p className={`etiquette ${light ? '!text-chantier' : ''}`} data-reveal>
        {etiquette}
      </p>
      <h2 id={id} className="mt-3 text-3xl leading-[1.02] md:text-6xl" data-reveal>
        {title}
      </h2>
      {intro && (
        <p className={`mt-5 max-w-2xl text-lg leading-relaxed ${light ? 'text-papier/70' : 'text-graphite'}`} data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}
