import { useState } from "react";
import { Link } from "react-router-dom";
import { Plane, MapPin, ChevronRight, Table2, MessageCircle } from "lucide-react";
import { DESTINATION_PAGES } from "../config/destinations";
import { ROUTES, SECTION_IDS } from "../config/routes";
import { whatsappLink } from "../config/site";

const SEMUA = "Semua";

// Urutan wilayah mengikuti kebutuhan pencarian terbanyak lebih dulu (Jawa & Sumatera), bukan abjad.
const URUTAN_WILAYAH = ["Jawa", "Sumatera", "Kalimantan", "Sulawesi", "Bali & Nusa Tenggara", "Maluku & Papua"];

// Dikelompokkan dari DESTINATION_PAGES, jadi kota baru yang ditambahkan di destinations.js otomatis tampil di sini
// dan otomatis mendapat tautan dari Beranda. Sengaja tanpa angka tarif: Beranda tidak membawa data Sheet
// (lihat scripts/inject-meta.mjs), sehingga HTML prerender dan hasil hidrasi tetap identik.
const KELOMPOK_WILAYAH = URUTAN_WILAYAH.map((wilayah) => ({
  wilayah,
  kota: DESTINATION_PAGES.filter((destination) => destination.wilayah === wilayah),
})).filter((kelompok) => kelompok.kota.length > 0);

// Warna aksen per kartu wilayah, mengikuti pola kartu di bagian Layanan (biru, indigo, amber).
const AKSEN = [
  {
    ikon: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400",
    garis: "from-blue-600 to-indigo-600",
    badge: "bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60",
  },
  {
    ikon: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400",
    garis: "from-indigo-600 to-violet-600",
    badge: "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/60",
  },
  {
    ikon: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400",
    garis: "from-amber-600 to-orange-600",
    badge: "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60",
  },
];

const SEMBUNYIKAN_SCROLLBAR = "[scrollbar-width:none] [&::-webkit-scrollbar]:hidden";

export default function TarifRute() {
  // Keadaan awal "Semua" sehingga HTML prerender memuat seluruh tautan kota (terbaca mesin pencari).
  // Filter hanya mengubah tampilan setelah pengunjung menyentuh tombol wilayah.
  const [aktif, setAktif] = useState(SEMUA);
  const satuWilayah = aktif !== SEMUA;

  return (
    <section id={SECTION_IDS.routes} className="relative overflow-hidden py-10 sm:py-14 bg-white dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-2 border border-blue-200 dark:border-blue-800/50 shadow-xs">
            <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span>Rute dari Bandara CGK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Tarif Cargo Udara Jakarta ke <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500">Kota Tujuan</span>
          </h2>

          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Pilih kota tujuan untuk melihat tarif per kg, estimasi waktu, minimal berat, dan contoh perhitungan ongkir cargo udara dari Bandara Soekarno-Hatta.
          </p>
        </div>

        {/* Filter wilayah: di HP bisa digeser ke samping, di layar lebar tersusun rapi di tengah. */}
        <div role="group" aria-label="Filter wilayah tujuan" className={`-mx-4 px-4 sm:mx-0 sm:px-0 mb-6 sm:mb-8 flex gap-2 overflow-x-auto sm:overflow-visible sm:flex-wrap sm:justify-center pb-1 snap-x ${SEMBUNYIKAN_SCROLLBAR}`}>
          {[SEMUA, ...KELOMPOK_WILAYAH.map((kelompok) => kelompok.wilayah)].map((nama) => {
            const dipilih = aktif === nama;
            return (
              <button
                key={nama}
                type="button"
                aria-pressed={dipilih}
                onClick={() => setAktif(nama)}
                className={`snap-start shrink-0 min-h-11 px-4 rounded-full border text-sm font-semibold whitespace-nowrap cursor-pointer transition-all duration-200 active:scale-95 ${
                  dipilih
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-600/25"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-500/60 dark:hover:border-blue-400/60 hover:text-blue-700 dark:hover:text-blue-400"
                }`}
              >
                {nama}
              </button>
            );
          })}
        </div>

        <div className={satuWilayah ? "grid grid-cols-1 gap-4 sm:gap-6 max-w-3xl mx-auto" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto"}>
          {KELOMPOK_WILAYAH.map(({ wilayah, kota }, index) => {
            const aksen = AKSEN[index % AKSEN.length];
            const tersembunyi = satuWilayah && aktif !== wilayah;
            return (
              <div key={wilayah} className={`group relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/70 dark:bg-slate-900 shadow-sm hover:shadow-xl transition-shadow duration-300 p-4 sm:p-6 ${tersembunyi ? "hidden" : ""}`}>
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r ${aksen.garis} opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="flex items-center justify-between gap-3 mt-1 mb-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${aksen.ikon}`}>
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                    </div>
                    <h3 className="text-base sm:text-lg font-bold leading-tight text-slate-900 dark:text-white">{`Cargo Udara ke ${wilayah}`}</h3>
                  </div>
                  <span className={`shrink-0 text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${aksen.badge}`}>{`${kota.length} kota`}</span>
                </div>

                <ul className={`grid gap-2 ${satuWilayah ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3" : "grid-cols-1 sm:grid-cols-2 md:grid-cols-1"}`}>
                  {kota.map((destination) => (
                    <li key={destination.code} className="flex">
                      <Link
                        to={destination.path}
                        title={`Tarif cargo udara Jakarta ke ${destination.kota} (Bandara ${destination.bandara})`}
                        className="group/kota flex w-full items-center justify-between gap-3 min-h-12 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-white dark:bg-slate-800/50 pl-4 pr-3 py-2.5 hover:border-blue-500/60 dark:hover:border-blue-400/60 hover:shadow-md active:scale-[0.98] transition-all duration-200"
                      >
                        <span className="min-w-0 text-sm font-semibold leading-snug text-slate-800 dark:text-slate-100 group-hover/kota:text-blue-700 dark:group-hover/kota:text-blue-400 transition-colors">{`Jakarta ke ${destination.kota}`}</span>
                        <span className="flex items-center gap-1.5 shrink-0">
                          <span className="font-mono text-[11px] font-bold tracking-wide px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700/60 text-slate-600 dark:text-slate-300">{destination.code}</span>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover/kota:text-blue-600 dark:group-hover/kota:text-blue-400 group-hover/kota:translate-x-0.5 transition-all" aria-hidden="true" />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <Link to={ROUTES.tarif} className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-white bg-linear-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-xl shadow-lg shadow-blue-900/25 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 border border-blue-500/30">
            <Table2 className="w-4 h-4" aria-hidden="true" />
            Lihat Tarif Semua Tujuan
          </Link>
          <a
            href={whatsappLink("Halo Admin, saya ingin tanya tarif cargo udara ke kota tujuan saya.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl shadow-sm hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300"
          >
            <MessageCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
            Tanya Admin via WhatsApp
          </a>
        </div>
        <p className="mt-4 text-center text-xs text-slate-600 dark:text-slate-400">Tarif dapat berubah. Hubungi admin untuk konfirmasi sebelum pengiriman.</p>
      </div>
    </section>
  );
}
