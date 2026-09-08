import React, { useState } from "react";
import { X, Plane, Package, MapPin, Scale, ArrowRight, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";
// Impor database tarif dari folder src/data/
import { databaseTarif } from "../data/tarifData";

export default function CekOngkirSection({ isOpen, onClose }) {
  // State untuk form input
  const [origin] = useState("Bandara Soekarno Hatta - Jakarta (CGK)");
  const [destinationCode, setDestinationCode] = useState("");
  const [selectedMaskapai, setSelectedMaskapai] = useState("all"); // 'all' atau nama maskapai tertentu
  const [weight, setWeight] = useState(10); // Minimal langsung 10 KG

  // State untuk hasil perhitungan
  const [resultList, setResultList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Ambil daftar kota tujuan unik dari databaseTarif untuk pilihan <select>
  const uniqueDestinations = Array.from(new Map(databaseTarif.map((item) => [item.dest, { dest: item.dest, namaDest: item.namaDest }])).values());

  // Jika modal tertutup, jangan render apa pun
  if (!isOpen) return null;

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!destinationCode) {
      alert("Silakan pilih kota tujuan terlebih dahulu!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const finalWeight = Math.max(Number(weight) || 10, 10);
      const biayaAdmin = 30000; // Biaya tambahan admin tetap

      // Filter data berdasarkan kode destinasi yang dipilih
      let filteredData = databaseTarif.filter((item) => item.dest === destinationCode);

      // Jika user memilih maskapai spesifik (selain 'all')
      if (selectedMaskapai !== "all") {
        filteredData = filteredData.filter((item) => item.maskapai === selectedMaskapai);
      }

      // Hitung subtotal berat dan tambahkan biaya admin ke total keseluruhan
      const calculatedResults = filteredData.map((item) => {
        const subtotalBerat = item.rateReguler * finalWeight;
        const totalCost = subtotalBerat + biayaAdmin;

        return {
          ...item,
          subtotalBerat,
          biayaAdmin,
          totalCost,
          estimatedTime: "2-3 Hari", // Estimasi waktu standar
        };
      });

      setResultList(calculatedResults);
      setLoading(false);
    }, 400);
  };

  return (
    <div id="cek-ongkir" className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto">
      {/* Backdrop / Background Gelap */}
      <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" onClick={onClose} />

      {/* Kontainer Modal Utama */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 z-10 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header Modal */}
        <div className="flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
              <Plane className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">Cek Tarif & Layanan Cargo</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Estimasi biaya pengiriman udara cepat & terpercaya</p>
            </div>
          </div>

          <button
            onClick={onClose}
            type="button"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-200/80 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-red-500 hover:text-white dark:hover:bg-red-600 transition-all duration-200 cursor-pointer shadow-xs shrink-0"
            aria-label="Tutup Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Modal */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6">
          <form onSubmit={handleCalculate} className="space-y-4 sm:space-y-5">
            {/* Input Kota Asal */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">Kota Asal Pengiriman</label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-blue-600 dark:text-blue-400">
                  <MapPin className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  value={origin}
                  disabled
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-600 dark:text-slate-400 cursor-not-allowed font-medium"
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-1">*Semua pengiriman diproses langsung melalui Hub Utama Bandara Soekarno Hatta (CGK).</p>
            </div>

            {/* Input Kota Tujuan */}
            <div className="space-y-1.5">
              <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Kota Tujuan / Bandara Tujuan <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-slate-400">
                  <Plane className="w-4 h-4 rotate-90" />
                </span>
                <select
                  value={destinationCode}
                  onChange={(e) => setDestinationCode(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                  required
                >
                  <option value="">-- Pilih Kota / Bandara Tujuan --</option>
                  {uniqueDestinations.map((item) => (
                    <option key={item.dest} value={item.dest}>
                      {item.namaDest}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Input Berat & Filter Maskapai */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Berat Barang (KG) <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  <span className="absolute left-3.5 text-slate-400">
                    <Scale className="w-4 h-4" />
                  </span>
                  <input
                    type="number"
                    min="10"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="Minimal 10 KG"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                    required
                  />
                </div>
                <div className="flex items-center space-x-1 text-[11px] text-amber-600 dark:text-amber-400 pl-1 font-medium">
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  <span>Ketentuan minimum kargo udara adalah 10 KG.</span>
                </div>
              </div>

              {/* Pilihan Maskapai */}
              <div className="space-y-1.5">
                <label className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">Pilihan Maskapai</label>
                <select
                  value={selectedMaskapai}
                  onChange={(e) => setSelectedMaskapai(e.target.value)}
                  className="w-full px-4 py-2.5 sm:py-3 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                >
                  <option value="all">Semua Maskapai Tersedia</option>
                  <option value="Lion Air">Lion Air</option>
                  <option value="Citilink Hasus">Citilink Hasus</option>
                  <option value="Pelita Air">Pelita Air</option>
                  <option value="Rimbun Air">Rimbun Air</option>
                  <option value="Eca Air">Eca Air</option>
                  <option value="Air Asia">Air Asia</option>
                  <option value="Myi">Myi</option>
                </select>
              </div>
            </div>

            {/* Tombol Hitung Tarif */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-6 bg-linear-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-sm sm:text-base rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
            >
              {loading ? (
                <span>Menghitung Tarif...</span>
              ) : (
                <>
                  <span>Cek Estimasi Tarif Sekarang</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Bagian Hasil Pengecekan Tarif dengan Tampilan Detail */}
          {resultList.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>Hasil Tarif Berdasarkan Maskapai</span>
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800">Berat: {Math.max(Number(weight) || 10, 10)} KG</span>
              </div>

              <div className="grid grid-cols-1 gap-3.5 max-h-80 overflow-y-auto pr-1">
                {resultList.map((res) => (
                  <div key={res.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-xs">
                    {/* Header Kartu Maskapai */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">{res.maskapai}</span>
                        <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{res.namaDest}</span>
                      </div>
                      <span className="text-[11px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded font-medium">{res.estimatedTime}</span>
                    </div>

                    {/* Rincian Komponen Biaya */}
                    <div className="text-xs space-y-1.5 py-2.5 border-y border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span>
                          Tarif Dasar ({Math.max(Number(weight) || 10, 10)} KG × Rp {res.rateReguler.toLocaleString("id-ID")})
                        </span>
                        <span className="font-medium text-slate-900 dark:text-white">Rp {res.subtotalBerat.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Biaya Admin / Penanganan</span>
                        <span className="font-medium text-slate-900 dark:text-white">Rp {res.biayaAdmin.toLocaleString("id-ID")}</span>
                      </div>
                    </div>

                    {/* Total Biaya & Tombol WhatsApp */}
                    <div className="flex items-center justify-between pt-1">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Total Biaya Keseluruhan</div>
                        <div className="text-lg sm:text-xl font-black text-blue-700 dark:text-blue-400">Rp {res.totalCost.toLocaleString("id-ID")}</div>
                      </div>

                      <a
                        href={`https://wa.me/6285285586828?text=Halo%20Admin,%20saya%20ingin%20memesan%20pengiriman%20kargo%20menggunakan%20${encodeURIComponent(res.maskapai)}%20tujuan%20${encodeURIComponent(res.namaDest)}%20dengan%20berat%20${Math.max(Number(weight) || 10, 10)}%20KG.%20Total%20biaya%20Rp%20${res.totalCost.toLocaleString("id-ID")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center shrink-0 cursor-pointer"
                      >
                        Pilih via WA
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {resultList.length === 0 && !loading && destinationCode && (
            <div className="mt-4 p-4 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl">Tidak ada data maskapai yang tersedia untuk rute atau filter tersebut.</div>
          )}
        </div>
      </div>
    </div>
  );
}
