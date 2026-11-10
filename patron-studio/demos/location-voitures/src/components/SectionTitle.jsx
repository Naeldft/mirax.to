export default function SectionTitle({ surtitre, title, intro, id, center = false }) {
  return (
    <div className={`max-w-3xl ${center ? 'mx-auto text-center' : ''}`}>
      <p className="surtitre" data-reveal>
        {surtitre}
      </p>
      <h2 id={id} className="mt-4 text-3xl font-bold uppercase leading-[1.05] md:text-6xl" data-reveal>
        {title}
      </h2>
      {intro && (
        <p className="mt-5 text-base leading-relaxed text-ivoire/65 md:text-lg" data-reveal>
          {intro}
        </p>
      )}
    </div>
  );
}
