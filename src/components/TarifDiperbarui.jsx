import { CalendarCheck } from "lucide-react";
import { formatTanggal } from "../utils/tarif";

// Tanggal berasal dari build (scripts/inject-meta.mjs) dan hanya berubah kalau isi Sheet tarif berubah.
// Tanpa tanggal (Sheet gagal diambil saat build, atau data di browser sudah lebih baru dari build) label tidak ditampilkan.
export default function TarifDiperbarui({ tanggal, className = "" }) {
  if (!tanggal) return null;
  return (
    <p className={`flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 ${className}`}>
      <CalendarCheck className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
      <span>
        Tarif diperbarui <time dateTime={tanggal}>{formatTanggal(tanggal)}</time>
      </span>
    </p>
  );
}
