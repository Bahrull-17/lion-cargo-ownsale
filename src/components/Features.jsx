import React from "react";
import { ShieldCheck, Award, Sparkles, Tag, Globe, Clock, Timer, PlaneTakeoff } from "lucide-react";

export default function Features() {
  const items = [
    {
      icon: <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      bgIcon: "bg-amber-100 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800/40",
      title: "Pengalaman & Keahlian",
      desc: "Tim profesional dengan pengalaman lebih dari 10 tahun dalam industri cargo dan logistik udara.",
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      bgIcon: "bg-blue-100 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800/40",
      title: "Keamanan Terjamin",
      desc: "Sistem tracking dan monitoring real-time untuk transparansi dan keamanan pengiriman.",
    },
    {
      icon: <Timer className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
      bgIcon: "bg-emerald-100 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/40",
      title: "Tepat Waktu",
      desc: "Komitmen tinggi untuk memastikan setiap kargo Anda tiba di tujuan sesuai jadwal penerbangan.",
    },
    {
      icon: <Tag className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      bgIcon: "bg-indigo-100 dark:bg-indigo-950/50 border-indigo-200 dark:border-indigo-800/40",
      title: "Harga Kompetitif",
      desc: "Tarif pengiriman cargo yang terjangkau dan transparan tanpa biaya tersembunyi.",
    },
    {
      icon: <Globe className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
      bgIcon: "bg-purple-100 dark:bg-purple-950/50 border-purple-200 dark:border-purple-800/40",
      title: "Jangkauan Luas",
      desc: "Melayani pengiriman ke berbagai destinasi domestik dengan jaringan rute penerbangan handal.",
    },
    {
      icon: <Clock className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
      bgIcon: "bg-rose-100 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800/40",
      title: "Layanan 24/7",
      desc: "Dukungan layanan pelanggan dan sistem operasional yang siap siaga setiap saat.",
    },
  ];

  return (
    <section id="layanan" className="pt-8 pb-8 sm:pb-12 bg-linear-to-b from-blue-100/90 via-blue-50/60 to-white dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-xs font-bold tracking-wider uppercase mb-3 border border-blue-500/20 shadow-xs backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Keunggulan Kami</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                Mengapa Memilih <span className="text-blue-600 dark:text-blue-500">Lion Cargo Ownsale?</span>
              </h2>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                Dengan pengalaman bertahun-tahun di industri logistik, kami memahami betul kebutuhan bisnis Anda dan berkomitmen memberikan solusi pengiriman cargo terbaik.
              </p>
            </div>

            {/* Grid 6 Kotak Keunggulan */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {items.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between space-y-3 bg-white/90 dark:bg-slate-800/80 backdrop-blur-xs p-5 rounded-2xl border border-blue-100/80 dark:border-slate-700/60 shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center shadow-xs ${item.bgIcon}`}>{item.icon}</div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center items-center py-6 lg:py-0">
            <div className="absolute w-80 h-80 sm:w-105 sm:h-105 bg-blue-300/40 dark:bg-slate-800/40 rounded-full blur-3xl -z-10 pointer-events-none" />

            <div className="relative w-full max-w-md p-4 sm:p-6 flex flex-col items-center">
              <div className="absolute top-0 left-2 sm:-left-4 z-20 bg-white dark:bg-slate-800 px-4 py-3 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/80 flex items-center gap-3 animate-bounce [animation-duration:3s]">
                <div className="w-10 h-10 rounded-xl bg-red-50 dark:bg-red-950/40 flex items-center justify-center text-red-600 dark:text-red-400 font-extrabold text-sm">99%</div>
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">On-Time Delivery</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Pengiriman Tepat Waktu</div>
                </div>
              </div>

              <div className="absolute top-28 -right-2 sm:-right-6 z-20 bg-white dark:bg-slate-800 px-3.5 py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/80 hidden sm:flex items-center gap-2.5 animate-pulse [animation-duration:3.5s]">
                <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/40 flex items-center justify-center text-sky-600 dark:text-sky-400">
                  <PlaneTakeoff className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-slate-900 dark:text-white">Rute Domestik</div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400">Jaringan Penerbangan Luas</div>
                </div>
              </div>

              <div className="relative w-full flex flex-col items-center justify-center pt-14 pb-6 animate-pulse [animation-duration:4s]">
                <div className="w-56 sm:w-64 h-22 sm:h-24 bg-emerald-500 dark:bg-emerald-600 rounded-2xl shadow-lg border-b-4 border-emerald-700 flex flex-col items-center justify-center relative z-10">
                  <div className="w-14 h-2 bg-emerald-300 rounded-full mb-2 opacity-80" />
                  <div className="w-9 h-9 rounded-full border-2 border-emerald-300 flex items-center justify-center text-white text-sm font-bold">+</div>
                </div>

                <div className="w-64 sm:w-72 h-26 sm:h-28 bg-blue-600 dark:bg-blue-700 rounded-2xl shadow-xl border-b-4 border-blue-800 flex flex-col items-center justify-center -mt-4 relative z-0">
                  <div className="w-16 h-2 bg-blue-400 rounded-full mb-3 opacity-80" />
                  <div className="w-10 h-10 rounded-full border-2 border-blue-400 flex items-center justify-center text-white text-base font-bold">+</div>
                </div>

                <div className="w-72 sm:w-80 h-18 sm:h-20 bg-amber-500 dark:bg-amber-600 rounded-2xl shadow-lg border-b-4 border-amber-700 -mt-3.5 flex items-center justify-around px-6">
                  <div className="w-3 h-3 rounded-full bg-amber-200 animate-ping" />
                  <div className="text-white text-xs sm:text-sm font-extrabold tracking-widest uppercase">Lion Cargo Express</div>
                  <div className="w-3 h-3 rounded-full bg-amber-200 animate-ping" />
                </div>
              </div>

              <div className="absolute -bottom-2 left-4 sm:-left-2 z-20 bg-white dark:bg-slate-800 px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700/80 flex items-center gap-2.5 animate-bounce [animation-duration:3.5s]">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-200">1000+ Klien Puas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
