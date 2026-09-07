import React from "react";
import { Plane, ShieldCheck, Clock, Award } from "lucide-react";

// Import gambar dari folder src/assets/images/ (Lengkap 7 Maskapai)
import airasiaImg from "../assets/images/airasia.png";
import batikImg from "../assets/images/batik.png";
import citilinkImg from "../assets/images/citilink.png";
import garudaImg from "../assets/images/garuda.png";
import lionImg from "../assets/images/lion.png";
import sriwijayaImg from "../assets/images/sriwijaya.png";
import wingsImg from "../assets/images/wings.png";
import rimbunImg from "../assets/images/rimbun.png";
import ecaImg from "../assets/images/eca.png";

export default function AirlinePartners() {
  const airlines = [
    { name: "Lion Air Cargo", logo: lionImg, desc: "Jaringan Domestik Terluas" },
    { name: "Garuda Indonesia", logo: garudaImg, desc: "Prioritas Utama & Express" },
    { name: "Citilink Cargo", logo: citilinkImg, desc: "Cepat & Tepat Waktu" },
    { name: "Batik Air Cargo", logo: batikImg, desc: "Kargo Berjadwal Reguler" },
    { name: "Sriwijaya Air", logo: sriwijayaImg, desc: "Rute Kepulauan Luas" },
    { name: "Wings Air", logo: wingsImg, desc: "Kargo Daerah Perintis" },
    { name: "AirAsia Cargo", logo: airasiaImg, desc: "Jaringan Regional Asia" },
    { name: "Rimbun Air Cargo", logo: rimbunImg, desc: "Spesialis Pengiriman Wilayah Khusus" },
    { name: "Eca Air Cargo", logo: ecaImg, desc: "Layanan Kargo Fleksibel" },
  ];

  return (
    <section className="-mt-6 sm:-mt-10 pt-4 pb-12 sm:pb-16 bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200/60 dark:border-slate-800/60 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-3 border border-blue-200 dark:border-blue-800/50">
            <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Kemitraan Maskapai Resmi</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Didukung <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-blue-800">Maskapai Nasional</span> Terbaik & Terpercaya
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Beroperasi secara terintegrasi dengan maskapai penerbangan kargo nasiona pilihan guna memastikan alokasi ruang muat prioritas, keamanan kargo maksimal, dan ketepatan jadwal pengiriman.
          </p>
        </div>

        {/* Grid Maskapai (Disesuaikan jadi hingga 7 item dengan lg:grid-cols-4 atau lg:grid-cols-7) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {airlines.map((airline, index) => (
            <div
              key={index}
              className="group flex flex-col items-center justify-center p-5 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs hover:shadow-xl hover:border-blue-500/50 dark:hover:border-blue-400/50 transition-all duration-300 hover:-translate-y-1 text-center"
            >
              {/* Kotak Logo Maskapai (Diperbesar ukurannya agar lebih jelas) */}
              <div className="w-28 h-16 sm:w-32 sm:h-20 mb-3.5 flex items-center justify-center p-2 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                <img src={airline.logo} alt={airline.name} className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-110" />
              </div>

              {/* Nama Maskapai */}
              <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{airline.name}</h3>

              {/* Deskripsi Singkat */}
              <span className="mt-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">{airline.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
