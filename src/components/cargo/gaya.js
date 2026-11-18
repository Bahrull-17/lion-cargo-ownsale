// Kelas Tailwind yang dipakai bersama oleh halaman cargo (satu sumber, supaya tombol dan tipografi konsisten).
const DASAR = "inline-flex items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-bold transition-all duration-300 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600";

export const TOMBOL_UTAMA = `${DASAR} border border-blue-500/30 bg-linear-to-r from-blue-600 via-blue-700 to-indigo-800 text-white shadow-lg shadow-blue-700/25 hover:-translate-y-0.5`;
export const TOMBOL_WA = `${DASAR} bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 hover:bg-emerald-700`;
export const TOMBOL_OUTLINE = `${DASAR} border border-slate-300 bg-white text-slate-800 shadow-sm hover:-translate-y-0.5 hover:border-blue-500/60 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100`;
export const TOMBOL_PUTIH = `${DASAR} bg-white text-blue-800 shadow-lg hover:-translate-y-0.5`;

export const GRADASI = "text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500";
export const JUDUL_H2 = "text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white";
export const TEKS = "text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed";
export const LINK = "font-semibold text-blue-700 dark:text-blue-400 hover:underline";
export const KARTU = "rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm";
