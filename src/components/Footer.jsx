import { Link } from "react-router-dom";
import { Plane, MapPin, Phone, Mail, ArrowUp, Heart } from "lucide-react";
import { SITE, whatsappLink } from "../config/site";
import { ROUTES } from "../config/routes";
import { FOOTER_LINKS } from "../config/navigation";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-slate-950 text-slate-400 text-xs sm:text-sm pt-14 pb-8 border-t border-slate-800/80 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-linear-to-r from-transparent via-blue-500 to-transparent opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">
          <div className="lg:col-span-4 space-y-4">
            <Link to={ROUTES.home} className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-600/30 group-hover:bg-blue-500 transition-colors">
                <Plane className="w-5 h-5 -rotate-45" />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-base sm:text-lg tracking-tight text-white leading-tight">
                  Lion Cargo <span className="text-blue-500">Ownsale</span>
                </span>
                <span className="text-[10px] tracking-widest text-slate-400 uppercase font-medium">Air Freight Service</span>
              </div>
            </Link>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Mitra layanan pengiriman kargo udara resmi, terpercaya, dan profesional berpusat di Bandara Internasional Soekarno-Hatta melayani rute domestik seluruh Indonesia.
            </p>
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
              {FOOTER_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-blue-400 transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
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
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors leading-relaxed font-medium">
                  {SITE.address.place}, {SITE.address.street}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-500 shrink-0" />
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors font-medium">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a href={`mailto:${SITE.email}`} className="text-slate-400 hover:text-blue-400 transition-colors font-medium">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center justify-center text-center gap-2 text-xs text-slate-400">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} {SITE.name}. Hak Cipta Dilindungi Undang-Undang.
          </p>
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
      <a
        href={whatsappLink("Halo Lion Cargo, saya mau tanya tarif pengiriman")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat WhatsApp"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 
                   flex items-center justify-center 
                   w-11 h-11 md:w-14 md:h-14 
                   bg-[#25D366] hover:bg-[#20ba5a] text-white 
                   rounded-full shadow-lg hover:scale-110 
                   transition-all duration-300 ease-in-out cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-5 h-5 md:w-7 md:h-7 fill-current">
          <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.6 66.4 14 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
        </svg>
      </a>
    </footer>
  );
}
