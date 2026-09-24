import { useState } from "react";
import { Plane, MapPin, Scale, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { databaseTarif } from "../data/tarifData";
import { whatsappLink } from "../config/site";
import useDocumentMeta from "../hooks/useDocumentMeta";
import { CEK_ONGKIR_META } from "../config/pageMeta";

export default function CekOngkirPage() {
  useDocumentMeta(CEK_ONGKIR_META);

  const [origin] = useState("Bandara Soekarno Hatta - Jakarta (CGK)");
  const [destinationCode, setDestinationCode] = useState("");
  const [weight, setWeight] = useState(10); // Minimal langsung 10 KG

  const [resultList, setResultList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [calcWeight, setCalcWeight] = useState(10);
  const [hasCalculated, setHasCalculated] = useState(false);
  const clearResults = () => {
    setResultList([]);
    setHasCalculated(false);
  };

  const uniqueDestinations = Array.from(new Map(databaseTarif.map((item) => [item.dest, { dest: item.dest, namaDest: item.namaDest }])).values()).sort((a, b) => a.namaDest.localeCompare(b.namaDest));

  const formatCityName = (namaDest) => {
    if (!namaDest) return "";
    return namaDest.replace(/\s*\([^)]*\)/g, "").trim();
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    if (!destinationCode) {
      alert("Silakan pilih kota tujuan terlebih dahulu!");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const finalWeight = Math.max(Number(weight) || 10, 10);
      const biayaAdmin = 30000;

      const filteredData = databaseTarif.filter((item) => item.dest === destinationCode);

      // Hitung subtotal berat dan tambahkan biaya admin ke total keseluruhan
      const calculatedResults = filteredData.map((item) => {
        const subtotalBerat = item.rateReguler * finalWeight;
        const totalCost = subtotalBerat + biayaAdmin;

        return {
          ...item,
          subtotalBerat,
          biayaAdmin,
          totalCost,
          estimatedTime: "2-3 Hari",
        };
      });

      setCalcWeight(finalWeight);
      setResultList(calculatedResults);
      setHasCalculated(true);
      setLoading(false);
    }, 300);
  };

  return (
    <main className="bg-slate-50 dark:bg-slate-950 pt-6 pb-16 px-4 sm:px-6 transition-colors">
      <div className="max-w-xl lg:max-w-2xl mx-auto space-y-6">
        {/* Teks h2 dan Penjelasan DI LUAR KOTAK */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 mb-1">
            <Plane className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Cek Ongkir <span className="text-blue-600 dark:text-blue-400">Cargo Udara</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">Hitung estimasi biaya pengiriman cargo udara dari Bandara Soekarno Hatta ke berbagai kota tujuan di seluruh Indonesia</p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 md:p-8 space-y-6">
          <form onSubmit={handleCalculate} className="space-y-4">
            <div className="space-y-1.5">
              <label htmlFor="asal" className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Kota Asal Pengiriman
              </label>
              <div className="flex items-center w-full bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden px-3.5 py-2.5 sm:py-3">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mr-3" />
                <input id="asal" type="text" value={origin} disabled className="w-full bg-transparent text-xs sm:text-sm text-slate-600 dark:text-slate-400 cursor-not-allowed font-medium truncate focus:outline-none" />
              </div>
              <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400 pl-1">*Pengiriman diproses langsung melalui Hub Utama Bandara Soekarno Hatta (CGK).</p>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="tujuan" className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Kota Tujuan / Bandara Tujuan <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden px-3.5 py-2 sm:py-2.5 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                <Plane className="w-4 h-4 rotate-90 text-slate-400 shrink-0 mr-3" />
                <select
                  id="tujuan"
                  value={destinationCode}
                  disabled={loading}
                  onChange={(e) => {
                    setDestinationCode(e.target.value);
                    clearResults();
                  }}
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none truncate cursor-pointer py-1"
                  required
                >
                  <option value="">-- Pilih Kota / Bandara Tujuan --</option>
                  {uniqueDestinations.map((item) => (
                    <option key={item.dest} value={item.dest} className="dark:bg-slate-900">
                      {formatCityName(item.namaDest)} ({item.dest})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor="berat" className="block text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300">
                Berat Barang (KG) <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center w-full bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl overflow-hidden px-3.5 py-2.5 sm:py-3 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
                <Scale className="w-4 h-4 text-slate-400 shrink-0 mr-3" />
                <input
                  id="berat"
                  type="number"
                  min="10"
                  value={weight}
                  disabled={loading}
                  onChange={(e) => {
                    setWeight(e.target.value);
                    clearResults();
                  }}
                  placeholder="Minimal 10 KG"
                  className="w-full bg-transparent text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none"
                  required
                />
              </div>
              <div className="flex items-start sm:items-center space-x-1 text-[10px] sm:text-[11px] text-amber-600 dark:text-amber-400 pl-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 sm:mt-0" />
                <span>Minimum kargo udara adalah 10 KG. Sudah termasuk biaya penanganan Rp 30.000.</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 px-5 bg-linear-to-r from-blue-700 to-indigo-800 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-blue-600/30 transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer active:scale-[0.99]"
            >
              {loading ? (
                <span>Menghitung Tarif...</span>
              ) : (
                <>
                  <span>Cek Estimasi Tarif Sekarang</span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </>
              )}
            </button>
          </form>

          {resultList.length > 0 && (
            <div className="mt-6 pt-5 border-t border-slate-200 dark:border-slate-800 space-y-3.5 animate-fadeIn">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center space-x-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>Rincian Tarif Pengiriman Kargo</span>
                </h3>
                <span className="text-[11px] px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-semibold border border-blue-200 dark:border-blue-800">Berat: {calcWeight} KG</span>
              </div>

              <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-1">
                {resultList.map((res, index) => (
                  <div key={index} className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 truncate">{formatCityName(res.namaDest)}</span>
                        <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shrink-0">({res.dest})</span>
                      </div>
                      <span className="text-[10px] sm:text-[11px] bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded font-medium shrink-0">{res.estimatedTime}</span>
                    </div>
                    <div className="text-[11px] sm:text-xs space-y-1.5 py-2.5 border-y border-slate-200/80 dark:border-slate-700 text-slate-600 dark:text-slate-400">
                      <div className="flex justify-between items-center gap-2">
                        <span className="truncate pr-2">
                          Tarif Dasar ({calcWeight} KG × Rp {res.rateReguler.toLocaleString("id-ID")})
                        </span>
                        <span className="font-medium text-slate-900 dark:text-white shrink-0">Rp {res.subtotalBerat.toLocaleString("id-ID")}</span>
                      </div>
                      <div className="flex justify-between items-center gap-2">
                        <span>Biaya Penanganan / Admin</span>
                        <span className="font-medium text-slate-900 dark:text-white shrink-0">Rp {res.biayaAdmin.toLocaleString("id-ID")}</span>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-1">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wide">Total Biaya Keseluruhan</div>
                        <div className="text-base sm:text-lg font-black text-blue-700 dark:text-blue-400">Rp {res.totalCost.toLocaleString("id-ID")}</div>
                      </div>

                      <a
                        href={whatsappLink(`Halo Admin, saya ingin memesan pengiriman kargo tujuan ${formatCityName(res.namaDest)} (${res.dest}) dengan berat ${calcWeight} KG. Total biaya Rp ${res.totalCost.toLocaleString("id-ID")}`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center shrink-0 cursor-pointer"
                      >
                        Pesan via WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {hasCalculated && resultList.length === 0 && !loading && (
            <div className="mt-4 p-4 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 rounded-xl">Tidak ada data tarif yang tersedia untuk tujuan tersebut.</div>
          )}
        </div>
      </div>
    </main>
  );
}
