import { Link } from "react-router-dom";
import { Compass, Home, Calculator } from "lucide-react";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { ROUTES } from "../config/routes";

export default function NotFoundPage() {
  useDocumentMeta({ title: "Halaman Tidak Ditemukan | Lion Cargo Ownsale", robots: "noindex, follow" });

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-20 bg-slate-50 dark:bg-slate-950">
      <div className="max-w-md text-center space-y-5">
        <div className="mx-auto inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
          <Compass className="w-7 h-7" />
        </div>
        <p className="text-sm font-bold tracking-widest text-blue-600 dark:text-blue-400">404</p>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Halaman tidak ditemukan</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Alamat yang Anda buka tidak tersedia atau sudah dipindahkan. Silakan kembali ke beranda atau langsung cek ongkir cargo udara.</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link to={ROUTES.home} className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-sm font-bold transition-colors">
            <Home className="w-4 h-4" />
            Ke Beranda
          </Link>
          <Link
            to={ROUTES.cekOngkir}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:border-blue-500 transition-colors"
          >
            <Calculator className="w-4 h-4" />
            Cek Ongkir
          </Link>
        </div>
      </div>
    </main>
  );
}
