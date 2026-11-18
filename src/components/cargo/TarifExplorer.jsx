import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, ChevronRight, ChevronDown } from "lucide-react";
import { formatRupiah } from "../../utils/tarif";
import { KARTU } from "./gaya";

const PILIHAN_URUT = [
  { id: "populer", label: "Populer" },
  { id: "termurah", label: "Termurah" },
  { id: "az", label: "A-Z" },
];

function BarisTarif({ tujuan, rateTertinggi, beratMinimum }) {
  const lebarBar = Math.max(8, Math.round((tujuan.rate / rateTertinggi) * 100));
  const nama = `Jakarta ke ${tujuan.nama}`;
  return (
    <li className="py-2.5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 text-sm font-semibold leading-snug">
          {tujuan.path ? (
            <Link to={tujuan.path} className="group inline-flex items-start gap-0.5 text-slate-900 transition-colors hover:text-blue-700 dark:text-slate-100 dark:hover:text-blue-400">
              {nama}
              <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-400 transition-all group-hover:translate-x-0.5 group-hover:text-blue-600" aria-hidden="true" />
            </Link>
          ) : (
            <span className="text-slate-900 dark:text-slate-100">{nama}</span>
          )}
          <span className="ml-1.5 inline-block rounded-md bg-slate-100 px-1.5 py-px align-middle font-mono text-[11px] font-bold tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">{tujuan.code}</span>
        </div>
        <div className="shrink-0 text-right leading-tight">
          <p className="text-sm font-extrabold text-blue-700 dark:text-blue-400">
            {formatRupiah(tujuan.rate)}
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">/kg</span>
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">{`${beratMinimum} kg: ${formatRupiah(tujuan.total)}`}</p>
        </div>
      </div>
      <div className="mt-1.5 h-1 rounded-full bg-slate-100 dark:bg-slate-800" aria-hidden="true">
        <div className="h-full rounded-full bg-linear-to-r from-sky-400 to-blue-600" style={{ width: `${lebarBar}%` }} />
      </div>
    </li>
  );
}

// Daftar tarif per kota: pencarian, pengurutan, dan bar perbandingan harga. Keadaan awal ("populer", tanpa kata kunci) = isi HTML prerender,
// jadi semua tautan kota dan tarif terbaca mesin pencari. 89 tujuan tanpa halaman rincian dilipat dalam satu <details> (isinya tetap di HTML).
export default function TarifExplorer({ berHalaman, lainnya, beratMinimum, rateTertinggi }) {
  const [kueri, setKueri] = useState("");
  const [urut, setUrut] = useState("populer");
  const [bukaLainnya, setBukaLainnya] = useState(false);

  const kata = kueri.trim().toLowerCase();
  const cocok = (tujuan) => !kata || tujuan.nama.toLowerCase().includes(kata) || tujuan.code.toLowerCase().includes(kata);
  const susun = (daftar) => {
    if (urut === "termurah") return [...daftar].sort((a, b) => a.rate - b.rate);
    if (urut === "az") return [...daftar].sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    return daftar;
  };
  const hasilUtama = susun(berHalaman.filter(cocok));
  const hasilLain = susun(lainnya.filter(cocok));

  return (
    <div className={`${KARTU} p-4 shadow-xl shadow-blue-900/5 sm:p-6`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-300 bg-white px-4 transition-all focus-within:ring-2 focus-within:ring-blue-600 dark:border-slate-700 dark:bg-slate-800">
          <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
          <label htmlFor="cari-tujuan" className="sr-only">
            Cari kota tujuan atau kode bandara
          </label>
          <input
            id="cari-tujuan"
            type="search"
            inputMode="search"
            autoComplete="off"
            value={kueri}
            onChange={(e) => setKueri(e.target.value)}
            placeholder="Cari kota atau kode bandara"
            className="min-h-12 w-full bg-transparent text-base text-slate-900 placeholder:text-slate-400 focus:outline-none dark:text-white"
          />
        </div>
        <div role="group" aria-label="Urutkan tarif" className="flex shrink-0 rounded-xl bg-slate-100 p-1 dark:bg-slate-800">
          {PILIHAN_URUT.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              aria-pressed={urut === id}
              onClick={() => setUrut(id)}
              className={`min-h-10 flex-1 cursor-pointer rounded-lg px-4 text-sm font-semibold transition-all sm:flex-none ${urut === id ? "bg-white text-blue-700 shadow-sm dark:bg-slate-700 dark:text-blue-300" : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {hasilUtama.length > 0 && (
        <div className="mt-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">{`Rute Utama dengan Halaman Rincian (${hasilUtama.length})`}</h3>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {hasilUtama.map((tujuan) => (
              <BarisTarif key={tujuan.code} tujuan={tujuan} rateTertinggi={rateTertinggi} beratMinimum={beratMinimum} />
            ))}
          </ul>
        </div>
      )}

      {hasilLain.length > 0 && (
        <details className="group mt-3" open={bukaLainnya || kata !== ""} onToggle={(e) => setBukaLainnya(e.currentTarget.open)}>
          <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-bold text-slate-900 transition-colors hover:border-blue-500/60 dark:border-slate-700 dark:bg-slate-800/50 dark:text-white dark:hover:border-blue-400/60 [&::-webkit-details-marker]:hidden">
            <span>{`Tujuan Lainnya (${hasilLain.length})`}</span>
            <ChevronDown className="h-4 w-4 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
          </summary>
          <div className="pt-2">
            <p className="text-xs text-slate-600 dark:text-slate-400">Tujuan ini belum punya halaman rincian. Tarif di bawah tetap berlaku, hubungi admin untuk memesan.</p>
            <ul className="divide-y divide-slate-100 dark:divide-slate-800">
              {hasilLain.map((tujuan) => (
                <BarisTarif key={tujuan.code} tujuan={tujuan} rateTertinggi={rateTertinggi} beratMinimum={beratMinimum} />
              ))}
            </ul>
          </div>
        </details>
      )}

      {hasilUtama.length === 0 && hasilLain.length === 0 && (
        <p className="mt-4 rounded-xl bg-slate-50 p-4 text-center text-sm text-slate-600 dark:bg-slate-800/40 dark:text-slate-400">{`Tidak ada tujuan yang cocok dengan "${kueri.trim()}". Coba nama kota lain atau tanyakan ketersediaan rute ke admin.`}</p>
      )}
    </div>
  );
}
