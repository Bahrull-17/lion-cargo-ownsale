import React from "react";
import { ArrowRight, ShieldCheck, Clock, MapPin, PhoneCall, PlaneTakeoff, Plane, Package, Building2, ShieldCheck as ShieldIcon, Zap, Tag } from "lucide-react";

export default function Hero({ onOpenCekOngkir }) {
  return (
    <section id="beranda" className="relative overflow-hidden bg-slate-50 dark:bg-slate-950 pt-6 sm:pt-8 lg:pt-10 pb-12 sm:pb-16 lg:pb-24 transition-colors duration-300">
      {/* Background Accent Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-72 sm:h-96 bg-blue-500/10 dark:bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Kolom Kiri: Teks & CTA */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Badge Highlight */}
            <div className="flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase border border-blue-200 dark:border-blue-800/50 shadow-xs w-fit mx-auto lg:mx-0">
              <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse shrink-0"></span>
              <span className="text-center">Agen Cargo Resmi Bandara Soekarno Hatta</span>
            </div>

            {/* Headline Utama */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-[1.2] sm:leading-[1.15]">
              Solusi Pengiriman Cargo Udara <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-700 to-blue-900 dark:from-blue-400 dark:to-blue-600">Tercepat & Terpercaya</span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              Sebagai mitra resmi <strong className="font-bold text-slate-600 dark:text-white">Lion Cargo Ownsale</strong>, kami menghadirkan solusi pengiriman barang via{" "}
              <strong className="font-bold text-slate-600 dark:text-white">Bandara Soekarno Hatta</strong> (CGK) dengan tarif kompetitif dan jaminan keamanan tertinggi untuk kebutuhan bisnis maupun pribadi Anda.
            </p>
            {/* Fitur dengan Ikon yang Sesuai */}
            {/* Fitur dengan Ikon yang Sesuai */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-1 max-w-md mx-auto lg:mx-0 justify-items-center">
              <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm w-full">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                  <Building2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="truncate">Agen Cargo Resmi</span>
              </div>

              <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm w-full">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                  <ShieldIcon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="truncate">100% Aman</span>
              </div>

              <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm w-full">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="truncate">Pengiriman Cepat</span>
              </div>

              <div className="flex items-center space-x-2.5 text-slate-700 dark:text-slate-200 font-medium text-xs sm:text-sm w-full">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center shrink-0">
                  <Tag className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </div>
                <span className="truncate">Harga Kompetitif</span>
              </div>
            </div>

            {/* Tombol Aksi (CTA) */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 sm:gap-4 pt-2">
              {/* Tombol Pertama: Cek Tarif & Layanan (Memicu Modal Cek Ongkir) */}
              <button
                type="button"
                onClick={onOpenCekOngkir}
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white bg-linear-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-xl sm:rounded-2xl shadow-xl shadow-blue-900/30 hover:shadow-2xl hover:shadow-blue-600/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 overflow-hidden border border-blue-500/30 dark:border-blue-400/30 cursor-pointer"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-white/20 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
                <div className="absolute inset-0 bg-linear-to-r from-blue-600 to-indigo-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative z-10 tracking-wide drop-shadow-xs">Cek Tarif & Layanan</span>
                <div className="relative z-10 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/15 flex items-center justify-center group-hover:translate-x-1.5 transition-transform duration-300 shrink-0">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                </div>
              </button>

              {/* Tombol Kedua: Hubungi Admin (WhatsApp) */}
              <a
                href="https://wa.me/6285285586828?text=Halo%20Admin,%20saya%20tertarik%20ingin%20menggunakan%20jasa%20pengiriman%20Cargo%20Udara."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-xl sm:rounded-2xl shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-linear-to-r from-transparent via-blue-500/10 to-transparent skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />

                <div className="relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shrink-0">
                  <PhoneCall className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
                </div>

                <span className="relative z-10 tracking-wide group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">Hubungi Admin</span>
              </a>
            </div>
            {/* Info Keunggulan Singkat */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-slate-200/80 dark:border-slate-800/80">
              <div className="group relative flex flex-col items-center lg:items-start p-3.5 sm:p-5 rounded-2xl bg-linear-to-b from-white/80 to-slate-100/50 dark:from-slate-900/60 dark:to-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-900/3 dark:shadow-black/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-700 via-blue-800 to-indigo-900 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-300 tracking-tighter drop-shadow-xs">
                  500+
                </span>
                <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest mt-1 text-center lg:text-left">Kota Tujuan</span>
              </div>

              <div className="group relative flex flex-col items-center lg:items-start p-3.5 sm:p-5 rounded-2xl bg-linear-to-b from-white/80 to-slate-100/50 dark:from-slate-900/60 dark:to-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-900/3 dark:shadow-black/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-700 via-blue-800 to-indigo-900 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-300 tracking-tighter drop-shadow-xs">
                  100%
                </span>
                <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest mt-1 text-center lg:text-left">Aman & Asuransi</span>
              </div>

              <div className="group relative flex flex-col items-center lg:items-start p-3.5 sm:p-5 rounded-2xl bg-linear-to-b from-white/80 to-slate-100/50 dark:from-slate-900/60 dark:to-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 shadow-lg shadow-slate-900/3 dark:shadow-black/20 hover:border-blue-500/50 dark:hover:border-blue-400/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-2xl sm:text-3xl lg:text-4xl font-black bg-clip-text text-transparent bg-linear-to-r from-blue-700 via-blue-800 to-indigo-900 dark:from-blue-400 dark:via-blue-300 dark:to-indigo-300 tracking-tighter drop-shadow-xs">
                  24/7
                </span>
                <span className="text-[10px] sm:text-xs text-slate-600 dark:text-slate-400 font-bold uppercase tracking-widest mt-1 text-center lg:text-left">Dukungan CS</span>
              </div>
            </div>
          </div>

          {/* Kolom Kanan: Ilustrasi / Kartu Visual Modern dengan Animasi Pesawat & Paket */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-sm sm:max-w-md lg:max-w-none">
              {/* Kartu Utama Dekoratif */}
              <div className="rounded-3xl bg-linear-to-br from-blue-900 via-blue-950 to-slate-900 p-6 sm:p-8 text-white shadow-2xl shadow-blue-950/30 border border-blue-800/40 relative overflow-hidden">
                <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

                {/* Ilustrasi Area Langit & Animasi Pesawat */}
                <div className="relative w-full h-44 sm:h-52 bg-linear-to-b from-blue-800/40 via-blue-900/20 to-transparent rounded-2xl border border-blue-700/30 overflow-hidden mb-6 flex flex-col justify-between p-4">
                  {/* Awan Berjalan */}
                  <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
                    <div className="absolute top-3 w-20 h-6 bg-white rounded-full blur-[1px] animate-[pulse_4s_ease-in-out_infinite]" style={{ left: "10%" }} />
                    <div className="absolute top-8 w-24 h-7 bg-white rounded-full blur-[1px] animate-[pulse_6s_ease-in-out_infinite]" style={{ right: "15%" }} />
                  </div>

                  {/* Jalur Putus-putus Jejak Pesawat */}
                  <div className="absolute top-1/2 left-4 right-10 -translate-y-1/2 flex items-center space-x-2 opacity-40">
                    <div className="w-full border-t-2 border-dashed border-blue-300"></div>
                  </div>

                  {/* Icon Pesawat Utama dengan Animasi Terbang */}
                  <div className="relative z-10 flex justify-center items-center h-28 animate-[bounce_3s_ease-in-out_infinite]">
                    <div className="relative flex items-center justify-center">
                      <div className="absolute -left-6 w-8 h-2 bg-linear-to-r from-transparent to-blue-400/60 rounded-full blur-[2px] animate-pulse" />
                      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-linear-to-tr from-red-600 to-red-500 shadow-xl shadow-red-600/40 flex items-center justify-center border border-red-400/40 transform -rotate-12 hover:rotate-0 transition-transform duration-300">
                        <Plane className="w-9 h-9 sm:w-11 sm:h-11 text-white transform rotate-45 drop-shadow-md" />
                      </div>
                    </div>
                  </div>

                  {/* Kotak Paket Kecil di Bagian Bawah Ilustrasi */}
                  <div className="relative z-10 flex items-center justify-center space-x-2.5 pt-2">
                    <div className="px-3 py-1.5 rounded-lg bg-amber-500/90 text-white font-black text-[10px] sm:text-xs shadow-md border border-amber-400 flex items-center space-x-1 animate-pulse">
                      <Package className="w-3.5 h-3.5 text-white" />
                      <span>PKG</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-blue-600/90 text-white font-black text-[10px] sm:text-xs shadow-md border border-blue-400 flex items-center space-x-1 animate-pulse">
                      <Package className="w-3.5 h-3.5 text-white" />
                      <span>CARGO</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg bg-emerald-500/90 text-white font-black text-[10px] sm:text-xs shadow-md border border-emerald-400 flex items-center space-x-1 animate-pulse">
                      <Package className="w-3.5 h-3.5 text-white" />
                      <span>EXPRESS</span>
                    </div>
                  </div>
                </div>

                <div className="relative z-10 space-y-5 sm:space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-300">Status Jaringan</span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-semibold border border-emerald-500/30 flex items-center space-x-1">
                      <PlaneTakeoff className="w-3.5 h-3.5" />
                      <span>Operasional Normal</span>
                    </span>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <h3 className="text-lg sm:text-xl font-bold tracking-tight">Kirim Paket Tanpa Batas</h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Didukung penuh oleh jaringan armada penerbangan reguler yang terintegrasi secara profesional guna menjamin kecepatan, ketepatan waktu, serta keandalan maksimal dalam setiap pengiriman paket ke berbagai destinasi tujuan
                      Anda.
                    </p>
                  </div>

                  {/* Daftar Fitur Mini */}
                  <div className="space-y-2.5 sm:space-y-3 pt-2">
                    <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200 bg-white/5 p-3 rounded-xl border border-white/10">
                      <ShieldCheck className="w-5 h-5 text-blue-400 shrink-0" />
                      <span>Garansi Keamanan Paket & Packing Profesional</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200 bg-white/5 p-3 rounded-xl border border-white/10">
                      <Clock className="w-5 h-5 text-blue-400 shrink-0" />
                      <span>Estimasi Pengiriman Kilat (Express Service)</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs sm:text-sm text-slate-200 bg-white/5 p-3 rounded-xl border border-white/10">
                      <MapPin className="w-5 h-5 text-blue-400 shrink-0" />
                      <span>Layanan Door to Door & Port to Port</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
