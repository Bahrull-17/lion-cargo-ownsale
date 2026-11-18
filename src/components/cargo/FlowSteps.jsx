import { Plane } from "lucide-react";
import Reveal from "./Reveal";
import { TEKS } from "./gaya";

// Alur empat langkah: vertikal di HP, horizontal di layar lebar. Garis penghubung bergerak pelan dan sebuah pesawat kecil
// "terbang" menyusuri alur (hanya di layar lebar). `steps`: [{ ikon, judul, teks }], harus 4 langkah.
export default function FlowSteps({ steps }) {
  return (
    <ol className="relative grid gap-7 lg:grid-cols-4 lg:gap-6">
      {/* garis penghubung */}
      <span className="absolute bottom-8 left-[27px] top-8 w-px border-l-2 border-dashed border-blue-300 dark:border-blue-800 lg:hidden" aria-hidden="true" />
      <span className="absolute left-[12.5%] right-[12.5%] top-[27px] hidden h-px border-t-2 border-dashed border-blue-300 dark:border-blue-800 lg:block" aria-hidden="true">
        <Plane className="cg-travel absolute -top-3 h-5 w-5 -translate-x-1/2 rotate-90 text-blue-600 dark:text-blue-400" />
      </span>

      {steps.map(({ ikon: Ikon, judul, teks }, index) => (
        <Reveal as="li" key={judul} delay={index * 120} className="relative flex gap-4 lg:flex-col lg:items-center lg:text-center">
          <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-blue-200 bg-white text-blue-700 shadow-lg shadow-blue-900/10 dark:border-blue-800 dark:bg-slate-900 dark:text-blue-300">
            <Ikon className="h-6 w-6" aria-hidden="true" />
            <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-700 text-xs font-black text-white ring-2 ring-white dark:ring-slate-950" aria-hidden="true">
              {index + 1}
            </span>
          </span>
          <div className="min-w-0 pt-0.5 lg:pt-3">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">{judul}</h3>
            <p className={`${TEKS} mt-1 text-sm`}>{teks}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
