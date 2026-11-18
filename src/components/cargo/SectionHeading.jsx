import { JUDUL_H2, TEKS } from "./gaya";

export default function SectionHeading({ id, eyebrow, title, description, rata = "tengah" }) {
  const tengah = rata === "tengah";
  return (
    <div className={`space-y-2 ${tengah ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}`}>
      {eyebrow && <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">{eyebrow}</p>}
      <h2 id={id} className={JUDUL_H2}>
        {title}
      </h2>
      {description && <p className={TEKS}>{description}</p>}
    </div>
  );
}
