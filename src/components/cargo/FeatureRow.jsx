import Reveal from "./Reveal";

// Baris keunggulan selang-seling: ilustrasi dan teks bertukar sisi di layar lebar. `balik` menukar urutan.
export default function FeatureRow({ nomor, judul, isi, seni, balik = false }) {
  return (
    <Reveal as="article" className="flex items-center gap-4 sm:gap-6 md:grid md:grid-cols-2 md:gap-12">
      <div className={`w-28 shrink-0 sm:w-40 md:mx-auto md:w-full md:max-w-sm ${balik ? "md:order-2" : ""}`}>{seni}</div>
      <div className={`min-w-0 space-y-1 md:space-y-2 ${balik ? "md:order-1" : ""}`}>
        <p className="font-mono text-xs font-bold tracking-widest text-blue-600 dark:text-blue-400 sm:text-sm">{nomor}</p>
        <h3 className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-2xl">{judul}</h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">{isi}</p>
      </div>
    </Reveal>
  );
}
