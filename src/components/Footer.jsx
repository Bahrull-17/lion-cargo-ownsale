import React from "react";
import { Plane, MapPin, Phone, Mail, ArrowUp, Heart } from "lucide-react";

export default function Footer({ onOpenCekOngkir }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleClickCekOngkir = (e) => {
    e.preventDefault();
    if (typeof onOpenCekOngkir === "function") {
      onOpenCekOngkir();
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm pt-14 pb-8 border-t border-slate-800/80 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-4 space-y-4">
            <a href="#beranda" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight">
                  Lion Cargo <span className="text-blue-500">Ownsale</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">Air Freight Service</span>
              </div>
            </a>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">Mitra agen pengiriman kargo udara resmi, terpercaya, dan profesional berpusat di Bandara Internasional Soekarno-Hatta melayani rute domestik seluruh Indonesia.</p>
            <div className="pt-2 flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[11px] font-semibold border border-blue-500/25">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Operasional 24/7 via WhatsApp
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Navigasi</h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <a href="#beranda" className="hover:text-blue-400 transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#layanan" className="hover:text-blue-400 transition-colors">
                  Layanan Kargo
                </a>
              </li>
              <li>
                <button type="button" onClick={handleClickCekOngkir} className="hover:text-blue-400 transition-colors bg-transparent border-none p-0 cursor-pointer text-left font-inherit text-slate-400">
                  Cek Ongkir
                </button>
              </li>
              <li>
                <a href="#tentang" className="hover:text-blue-400 transition-colors">
                  Tentang Kami
                </a>
              </li>
              <li>
                <a href="#kontak" className="hover:text-blue-400 transition-colors">
                  Lokasi & Kontak
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Layanan Unggulan</h3>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Port-to-Port Domestic Cargo
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Pengiriman Dokumen & Paket UMKM
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Kargo Industri & Muatan Berat
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                Konsultasi Tarif & Muatan
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Kantor Pusat</h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                <a
                  href="https://www.google.com/maps/place/GEDUNG+PT+GATRANS/@-6.1252053,106.6651638,17z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-blue-400 transition-colors leading-relaxed font-medium"
                >
                  Gedung PT Gatrans (Cargo Area, Bandara Internasional Soekarno-Hatta, Tangerang, Banten)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href="https://wa.me/6285285586828" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors font-medium">
                  +62 852-8558-6828
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href="mailto:cargolionownsale@gmail.com" className="text-slate-400 hover:text-blue-400 transition-colors font-medium">
                  cargolionownsale@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center justify-center text-center gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} Lion Cargo Ownsale. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center text-center gap-2 sm:gap-6">
            <span className="flex items-center justify-center gap-1">
              Dibuat dengan <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> untuk Pengiriman Terbaik
            </span>

            <button onClick={scrollToTop} className="p-2 rounded-xl bg-slate-900 hover:bg-blue-600 text-slate-400 hover:text-white transition-all duration-300 border border-slate-800 shadow-sm cursor-pointer" title="Kembali ke atas">
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
