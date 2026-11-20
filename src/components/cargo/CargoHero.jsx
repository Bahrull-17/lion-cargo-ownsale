import { GRADASI } from "./gaya";

// Hero bersama untuk halaman cargo: teks di kiri, ilustrasi di kanan (di HP: ilustrasi di bawah teks agar H1 langsung terlihat).
// `overlay` = elemen melayang di atas ilustrasi (lihat KepingMelayang).
export default function CargoHero({ breadcrumb, badge, judul, judulSorot, deskripsi, tambahan, aksi, adegan, overlay }) {
  return (
    <section data-lokasi="hero" className="relative overflow-hidden bg-linear-to-b from-blue-50 via-white to-white dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
      <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-blue-300/25 blur-[110px] dark:bg-blue-600/10" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-5 sm:px-6 lg:pb-16">
        {breadcrumb}
        <div className="mt-5 grid items-center gap-8 lg:grid-cols-[1.05fr_1fr] lg:gap-12">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-900 shadow-xs backdrop-blur dark:border-blue-800/50 dark:bg-slate-900/80 dark:text-blue-300">
              {badge}
            </div>
            <h1 className="text-3xl font-black leading-[1.12] tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
              {judul} <span className={GRADASI}>{judulSorot}</span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 dark:text-slate-400 sm:text-base">{deskripsi}</p>
            {tambahan}
            <div className="flex flex-col gap-3 sm:flex-row">{aksi}</div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-white shadow-2xl shadow-blue-900/10 dark:border-slate-800 dark:bg-slate-900">{adegan}</div>
            {overlay}
          </div>
        </div>
      </div>
    </section>
  );
}

// Keping info melayang di atas ilustrasi hero. Posisi diatur lewat `className` (mis. "left-3 top-4 sm:-left-4").
export function KepingMelayang({ ikon: Ikon, judul, teks, className = "", animasi = "cg-float" }) {
  return (
    <div className={`absolute flex items-center gap-2.5 rounded-2xl border border-white/70 bg-white/90 px-3 py-2 shadow-xl shadow-blue-900/15 backdrop-blur dark:border-slate-700 dark:bg-slate-900/90 ${animasi} ${className}`}>
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300">
        <Ikon className="h-4 w-4" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-extrabold text-slate-900 dark:text-white">{judul}</span>
        <span className="block text-[11px] text-slate-600 dark:text-slate-400">{teks}</span>
      </span>
    </div>
  );
}
