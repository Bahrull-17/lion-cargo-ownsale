import { Link } from "react-router-dom";
import { MessageCircle, Calculator } from "lucide-react";
import { PesawatHiasan } from "./Scenes";
import { TOMBOL_PUTIH, TOMBOL_WA } from "./gaya";

// Pita ajakan di akhir halaman. `utama` = { label, to } (tautan internal), `sekunder` = { label, href } (WhatsApp).
export default function CtaBand({ judul, deskripsi, utama, sekunder, catatan }) {
  return (
    <section className="relative overflow-hidden rounded-[2rem] bg-linear-to-br from-blue-700 via-blue-800 to-indigo-900 px-6 py-10 text-center shadow-2xl shadow-blue-900/25 sm:px-12 sm:py-14">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sky-400/20 blur-3xl" aria-hidden="true" />
      <PesawatHiasan className="cg-float pointer-events-none absolute -bottom-3 -right-6 hidden w-64 opacity-25 sm:block" />
      <div className="relative z-10 mx-auto max-w-xl space-y-4">
        <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{judul}</h2>
        <p className="text-sm leading-relaxed text-blue-100 sm:text-base">{deskripsi}</p>
        <div className="flex flex-col justify-center gap-3 pt-2 sm:flex-row">
          <Link to={utama.to} className={TOMBOL_PUTIH}>
            <Calculator className="h-4 w-4" aria-hidden="true" />
            {utama.label}
          </Link>
          <a href={sekunder.href} target="_blank" rel="noopener noreferrer" className={TOMBOL_WA}>
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            {sekunder.label}
          </a>
        </div>
        {catatan}
      </div>
    </section>
  );
}
