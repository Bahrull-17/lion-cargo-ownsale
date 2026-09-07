import React from "react";
import { ShieldCheck, Globe2, Clock, ArrowUpRight, Building2 } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="relative py-10 sm:py-14 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300 overflow-hidden" id="tentang">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Bagian */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-2.5 border border-blue-500/20 shadow-xs backdrop-blur-md">
            <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Profil & Kepercayaan</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Solusi Ekspedisi Udara Terpercaya di <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500">Bandara Soekarno-Hatta</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto font-normal">
            <strong className="text-slate-700 dark:text-white font-semibold">Lion Cargo Ownsale</strong> hadir sebagai mitra logistik udara utama Anda yang berpusat di{" "}
            <strong className="text-slate-700 dark:text-white font-semibold">Bandara Soekarno-Hatta</strong>, melayani pengiriman kargo <em className="text-blue-600 dark:text-blue-400 not-italic font-semibold">port-to-port</em> dengan
            standar tertinggi. Sebagai agen kargo resmi terpercaya dari berbagai maskapai penerbangan terkemuka di Indonesia, kami berkomitmen menghadirkan kualitas layanan prima, kecepatan, dan keandalan penuh untuk setiap muatan Anda.
          </p>
        </div>

        {/* Grid Konten Utama dengan Kartu Berbingkai Konsisten */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {/* Kartu 1: Jaringan Rute Luas */}
          <div className="group relative bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-400/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 transition-all duration-300 shadow-inner group-hover:rotate-3">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Jaringan Rute Luas</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Didukung oleh puluhan rute penerbangan domestik terkoneksi penuh dengan sistem pemantauan posisi langsung.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between font-mono text-xs text-blue-600 dark:text-blue-400">
              <span className="font-semibold">COVERAGE 45+ RUTE</span>
              <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Kartu 2: Standar Keamanan Ketat */}
          <div className="group relative bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-500/50 dark:hover:border-amber-400/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-amber-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 transition-all duration-300 shadow-inner group-hover:rotate-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-300">Standar Keamanan Ketat</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Penanganan kargo profesional mulai dari penerimaan, proses muat berat, hingga tiba di titik bongkar dengan jaminan garansi keutuhan.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between font-mono text-xs text-amber-600 dark:text-amber-400">
              <span className="font-semibold">SECURITY LEVEL A+</span>
              <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>

          {/* Kartu 3: Kecepatan & Ketepatan */}
          <div className="group relative bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-400/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-indigo-600 to-violet-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 transition-all duration-300 shadow-inner group-hover:rotate-3">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">Kecepatan & Ketepatan</h3>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Sistem penjadwalan teroptimasi radar memastikan estimasi waktu tiba (ETA) akurat hingga hitungan detik.</p>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between font-mono text-xs text-indigo-600 dark:text-indigo-400">
              <span className="font-semibold">99% ON-TIME</span>
              <ArrowUpRight className="w-4 h-4 opacity-60 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
