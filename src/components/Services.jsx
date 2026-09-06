import React from "react";
import { Package, Plane, Zap, ArrowRight, ShieldCheck, Clock, Calendar, Globe, Building2, Flame, MessageCircle } from "lucide-react";

export default function Services() {
  // Nomor WhatsApp tujuan
  const whatsappNumber = "6287713951424";

  const servicesList = [
    {
      badge: "Reguler",
      badgeColor: "bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border-blue-200/60 dark:border-blue-800/60",
      icon: <Package className="w-7 h-7" />,
      iconBoxBg: "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 group-hover:bg-blue-600 group-hover:text-white",
      title: "Cargo Reguler",
      desc: "Layanan pengiriman cargo dengan estimasi 1-3 hari kerja. Solusi ekonomis untuk pengiriman Anda dengan kualitas terjamin.",
      features: [
        { text: "Estimasi 1-3 hari kerja", icon: <Clock className="w-4 h-4 text-blue-500 shrink-0" /> },
        { text: "Via penerbangan reguler", icon: <Plane className="w-4 h-4 text-blue-500 shrink-0" /> },
        { text: "Jangkauan seluruh Indonesia", icon: <Globe className="w-4 h-4 text-blue-500 shrink-0" /> },
        { text: "Asuransi pengiriman", icon: <ShieldCheck className="w-4 h-4 text-blue-500 shrink-0" /> },
      ],
      footerText: "Ekonomis & Terjamin",
      accent: "from-blue-600 to-indigo-600",
      waMessage: "Halo, saya ingin memesan layanan Cargo Reguler.",
    },
    {
      badge: "Express Priority",
      badgeColor: "bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border-indigo-200/60 dark:border-indigo-800/60",
      icon: <Plane className="w-7 h-7" />,
      iconBoxBg: "bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white",
      title: "Cargo Express",
      desc: "Pengiriman prioritas tinggi dengan estimasi 1 hari sampai. Ideal untuk kebutuhan bisnis yang memerlukan kecepatan.",
      features: [
        { text: "Sampai dalam 1 hari", icon: <Zap className="w-4 h-4 text-indigo-500 shrink-0" /> },
        { text: "Prioritas penerbangan", icon: <Plane className="w-4 h-4 text-indigo-500 shrink-0" /> },
        { text: "Kelancaran bisnis terjamin", icon: <Building2 className="w-4 h-4 text-indigo-500 shrink-0" /> },
        { text: "Layanan express terpercaya", icon: <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0" /> },
      ],
      footerText: "Prioritas Bisnis",
      accent: "from-indigo-600 to-violet-600",
      waMessage: "Halo, saya ingin memesan layanan Cargo Express.",
    },
    {
      badge: "Same Day",
      badgeColor: "bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border-amber-200/60 dark:border-amber-800/60",
      icon: <Zap className="w-7 h-7" />,
      iconBoxBg: "bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 group-hover:bg-amber-600 group-hover:text-white",
      title: "Same Day Service",
      desc: "Untuk kebutuhan mendesak, barang Anda akan sampai di hari yang sama. Komitmen dan kecepatan terbaik.",
      features: [
        { text: "Pengiriman hari yang sama", icon: <Calendar className="w-4 h-4 text-amber-500 shrink-0" /> },
        { text: "Kecepatan maksimal", icon: <Flame className="w-4 h-4 text-amber-500 shrink-0" /> },
        { text: "Waktu sampai singkat", icon: <Clock className="w-4 h-4 text-amber-500 shrink-0" /> },
        { text: "Untuk kebutuhan mendesak", icon: <Zap className="w-4 h-4 text-amber-500 shrink-0" /> },
      ],
      footerText: "Tiba Hari Ini",
      accent: "from-amber-600 to-orange-600",
      waMessage: "Halo, saya ingin memesan layanan Same Day Service.",
    },
  ];

  return (
    <section className="py-4 sm:py-6 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-300 relative overflow-hidden" id="layanan">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-400/10 dark:bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase mb-4 border border-blue-200 dark:border-blue-800/50 shadow-xs">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Solusi Logistik Terpadu</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Layanan <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-blue-800">Pengiriman Kargo</span> Unggulan
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">Pilih opsi kecepatan pengiriman yang paling sesuai dengan kebutuhan logistik dan anggaran Anda.</p>
        </div>

        {/* Grid Layanan (3 Kolom) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servicesList.map((item, index) => (
            <div
              key={index}
              className="group relative bg-white dark:bg-slate-900 p-7 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/50 dark:hover:border-blue-400/50 shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden"
            >
              {/* Top Accent Gradient Line on Hover */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r ${item.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              <div>
                {/* Icon & Badge Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-inner group-hover:rotate-3 ${item.iconBoxBg}`}>{item.icon}</div>
                  <span className={`text-[11px] font-bold px-3 py-1 rounded-full border shadow-2xs ${item.badgeColor}`}>{item.badge}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{item.title}</h3>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.desc}</p>

                {/* Features List with Custom Icons */}
                <ul className="mt-6 space-y-2.5 pt-6 border-t border-slate-100 dark:border-slate-800/80">
                  {item.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      {feature.icon}
                      <span>{feature.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card Bottom: Info & WhatsApp Button */}
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800/80 flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{item.footerText}</span>
                  <span className="text-[11px] text-slate-400 dark:text-slate-500 font-normal">Siap Kirim</span>
                </div>

                {/* Tombol Pesan Sekarang ke WhatsApp */}
                <a
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(item.waMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Pesan Sekarang (WhatsApp)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
