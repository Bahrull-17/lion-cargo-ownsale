import { Link } from "react-router-dom";
import { DESTINATION_PAGES } from "../config/destinations";
import { formatRupiah, tarifTermurahTujuan } from "../utils/tarif";

// Tabel tarif per kota tujuan beserta tautan ke halaman rinciannya.
// Tarif tampil sebagai teks di HTML sehingga terbaca mesin pencari tanpa perlu memakai kalkulator.
export default function RuteTujuanList({ databaseTarif }) {
  return (
    <section className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 md:p-8 space-y-4">
      <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Tarif Cargo Udara per Kota Tujuan</h2>
      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Tarif per kg cargo udara dari Bandara Soekarno-Hatta (CGK) ke kota-kota tujuan utama. Pilih kota untuk melihat contoh total ongkir, estimasi, dan cara perhitungannya.</p>
      <div className="overflow-x-auto">
        <table className="w-full text-xs sm:text-sm text-left">
          <caption className="sr-only">Tarif cargo udara per kg dari Jakarta ke kota tujuan</caption>
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
              <th scope="col" className="py-2 pr-3 font-semibold">
                Kota tujuan
              </th>
              <th scope="col" className="py-2 pr-3 font-semibold hidden sm:table-cell">
                Wilayah
              </th>
              <th scope="col" className="py-2 font-semibold text-right">
                Tarif per kg
              </th>
            </tr>
          </thead>
          <tbody className="text-slate-700 dark:text-slate-300">
            {DESTINATION_PAGES.map((destination) => {
              const tarif = tarifTermurahTujuan(databaseTarif, destination.code);
              return (
                <tr key={destination.code} className="border-b border-slate-100 dark:border-slate-800">
                  <th scope="row" className="py-2.5 pr-3 font-semibold">
                    <Link to={destination.path} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {`Jakarta ke ${destination.kota}`}
                    </Link>
                  </th>
                  <td className="py-2.5 pr-3 hidden sm:table-cell">{destination.wilayah}</td>
                  <td className="py-2.5 text-right font-bold text-blue-700 dark:text-blue-400">{tarif ? formatRupiah(tarif.rateReguler) : "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
