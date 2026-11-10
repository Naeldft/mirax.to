export default function SectionTitle({ tag, title, intro, id, center = false }) {
  return (
    <div className={`max-w-2xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className="tag" data-reveal>
        {tag}
      </p>
      <h2 id={id} className="mt-3 text-4xl font-bold leading-[1.05] md:text-6xl" data-reveal>
        {title}
      </h2>
      {intro && (
        <p className="mt-4 text-base leading-relaxed text-ecume/70 md:text-lg" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}
