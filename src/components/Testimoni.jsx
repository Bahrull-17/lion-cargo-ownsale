import React from "react";
import { Star, Quote, Sparkles } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Budi Santoso",
      role: "Direktur Logistik PT Mitra Sukses",
      comment: "Pengiriman kargo udara sangat cepat dan aman. Barang tiba tepat waktu tanpa ada kendala sama sekali. Sangat memuaskan!",
      rating: 5,
      avatar: "BS",
      bgAvatar: "bg-blue-600 text-white",
    },
    {
      name: "Siti Rahma",
      role: "Owner Toko Online Berkah",
      comment: "Tarifnya kompetitif dan transparan. Layanan pelanggan 24/7 sangat membantu ketika saya butuh update status pengiriman mendadak.",
      rating: 5,
      avatar: "SR",
      bgAvatar: "bg-emerald-600 text-white",
    },
    {
      name: "Ahmad Hidayat",
      role: "Manager Operasional Ekspedisi",
      comment: "Jangkauan rute domestiknya luas banget. Sistem tracking real-time bikin klien kami merasa tenang dan percaya.",
      rating: 5,
      avatar: "AH",
      bgAvatar: "bg-amber-600 text-white",
    },
    {
      name: "Dewi Lestari",
      role: "Supply Chain Manager",
      comment: "Pelayanan sangat profesional dari awal booking hingga barang sampai di tujuan. Sangat bisa diandalkan untuk kebutuhan bisnis logistik.",
      rating: 5,
      avatar: "DL",
      bgAvatar: "bg-indigo-600 text-white",
    },
    {
      name: "Rizki Pratama",
      role: "Pengusaha UMKM Elektronik",
      comment: "Kargo aman dan tidak pernah ada yang rusak. Pengemasan dan penanganan dari tim Lion Cargo Ownsale benar-benar juara!",
      rating: 5,
      avatar: "RP",
      bgAvatar: "bg-purple-600 text-white",
    },
  ];

  return (
    <section
      id="testimoni"
      className="-mt-1 sm:-mt-2 pt-2 pb-6 sm:pb-10 bg-linear-to-b from-white via-blue-50/50 to-blue-100/80 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 transition-colors duration-300 overflow-hidden relative z-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-4 sm:mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-1.5 border border-blue-500/20 shadow-xs backdrop-blur-md">
            <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span>Testimoni Klien</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Apa Kata Mereka tentang <span className="text-blue-600 dark:text-blue-500">Lion Cargo Ownsale?</span>
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
            Kepercayaan, keamanan, serta kepuasan menyeluruh dari setiap pelanggan selalu menjadi prioritas utama dan komitmen terbesar kami dalam menghadirkan solusi pengiriman logistik udara yang handal, cepat, dan terpercaya.
          </p>
        </div>
      </div>

      <div className="relative w-full overflow-hidden flex">
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-linear-to-r from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-linear-to-l from-white dark:from-slate-900 to-transparent z-10 pointer-events-none" />
        <div className="flex gap-3 sm:gap-6 animate-marquee shrink-0 hover:[animation-play-state:paused]">
          {[...testimonials, ...testimonials].map((item, index) => (
            <div
              key={index}
              className="relative flex flex-col justify-between bg-white/90 dark:bg-slate-800/80 backdrop-blur-xs p-4 sm:p-6 rounded-2xl border border-blue-100/80 dark:border-slate-700/60 shadow-xs sm:shadow-md w-65 sm:w-87.5 shrink-0 transition-all duration-300 hover:shadow-lg"
            >
              <div className="absolute top-3.5 right-3.5 text-blue-500/15 dark:text-blue-400/10 pointer-events-none">
                <Quote className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>

              <div>
                <div className="flex items-center gap-0.5 mb-2 sm:mb-3">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-[11px] sm:text-[13px] text-slate-700 dark:text-slate-300 leading-relaxed mb-3 sm:mb-4">"{item.comment}"</p>
              </div>
              <div className="flex items-center gap-2.5 pt-2.5 sm:pt-3 border-t border-slate-100 dark:border-slate-700/60">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-bold text-xs sm:text-sm shadow-xs ${item.bgAvatar}`}>{item.avatar}</div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{item.name}</h3>
                  <p className="text-[10px] sm:text-[11px] text-slate-500 dark:text-slate-400">{item.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          width: max-content;
          animation: marquee 28s linear infinite;
        }
      `}</style>
    </section>
  );
}
