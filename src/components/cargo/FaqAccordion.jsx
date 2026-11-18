import { ChevronDown } from "lucide-react";
import { TEKS } from "./gaya";

// Akordeon dengan <details> asli: isi jawaban tetap ada di HTML (terbaca mesin pencari) dan bisa dipakai dengan keyboard.
export default function FaqAccordion({ items }) {
  return (
    <div className="space-y-2.5">
      {items.map(({ pertanyaan, jawaban }) => (
        <details key={pertanyaan} className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow open:border-blue-200 open:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:open:border-blue-800/60">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 [&::-webkit-details-marker]:hidden">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white sm:text-base">{pertanyaan}</h3>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-transform duration-300 group-open:rotate-180 dark:bg-blue-950 dark:text-blue-400">
              <ChevronDown className="h-4 w-4" aria-hidden="true" />
            </span>
          </summary>
          <p className={`${TEKS} px-5 pb-5`}>{jawaban}</p>
        </details>
      ))}
    </div>
  );
}
