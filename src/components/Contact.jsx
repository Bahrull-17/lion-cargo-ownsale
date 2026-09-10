import React from "react";
import { MapPin, Phone, MessageSquare, Mail, Clock, Send, Compass } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="kontak" className="-mt-12 sm:-mt-16 pt-4 sm:pt-6 pb-12 sm:pb-16 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-2 border border-blue-500/20 shadow-xs backdrop-blur-md">
            <Compass className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span>Lokasi & Kontak</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Hubungi <span className="text-blue-600 dark:text-blue-500">Kami</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">
            Silakan kunjungi kantor operasional kami atau hubungi melalui layanan komunikasi resmi di bawah ini untuk konsultasi pengiriman kargo udara.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-3">
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">Kantor Pusat & Drop Point</h4>

              <a
                href="https://www.google.com/maps/place/GEDUNG+PT+GATRANS/@-6.1252053,106.6651638,17z/data=!4m6!3m5!1s0x2e6a036700943607:0xb4debe87ebce550c!8m2!3d-6.1252053!4d106.6651638!16s%2Fg%2F11hz6qk2vn"
                target="_blank"
                rel="noopener noreferrer"
                className="group block p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-200"
              >
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-600/10 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Gedung PT Gatrans (Area Kargo Bandara Soekarno-Hatta)</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">Jl. Cengkareng, Pajang, Kec. Benda, Kota Tangerang, Banten</p>
                    <div className="inline-flex items-center gap-1 pt-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                      <span>Buka di Google Maps</span>
                      <Send className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </a>
            </div>

            {/* Telepon */}
            <div className="bg-slate-50/80 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex items-start gap-4 transition-all duration-300 hover:border-blue-500/40">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">Telepon</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">+62 852-8558-6828</p>
              </div>
            </div>

            {/* WhatsApp */}
            <div className="bg-slate-50/80 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex items-start gap-4 transition-all duration-300 hover:border-blue-500/40">
              <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div className="w-full flex items-center justify-between">
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">WhatsApp CS</h3>
                  <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">+62 852-8558-6828</p>
                </div>
                <a href="https://wa.me/6285285586828" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-700 text-white text-[10px] sm:text-xs font-semibold transition-all shadow-xs">
                  Chat
                </a>
              </div>
            </div>

            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=cargolionownsale@gmail.com&su=Pertanyaan%20Layanan%20Kargo%20Lion&body=Halo%20Admin%20Lion%20Cargo,%20saya%20ingin%20bertanya%20mengenai..."
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-slate-50/80 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex items-start gap-4 transition-all duration-300 hover:border-blue-500/40 hover:shadow-md cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">Email Resmi</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 font-medium">support@lioncargoownsale.com</p>
                <span className="inline-block text-[10px] text-blue-600 dark:text-blue-400 font-semibold mt-1">Kirim Email Sekarang →</span>
              </div>
            </a>

            <div className="bg-slate-50/80 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex items-start gap-4 transition-all duration-300 hover:border-blue-500/40">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">Jam Operasional</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  <span className="font-semibold text-slate-900 dark:text-white">Senin - Minggu: 24 Jam (Tanpa Libur)</span>
                  <br />
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Siap Melayani Pengiriman & Konsultasi Kargo Setiap Saat</span>
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-full">
            <div className="bg-slate-50/80 dark:bg-slate-800/60 p-2 sm:p-3 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs h-full flex flex-col">
              <div className="relative w-full h-100 sm:h-120 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                {/* Embed Google Maps Area Kargo Bandara Soekarno-Hatta */}
                <iframe
                  title="Peta Lokasi Kantor Bandara Soekarno Hatta"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6976695276226!2d106.66258887483015!3d-6.125200060471243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a036700943607%3A0xb4debe87ebce550c!2sGEDUNG%20PT%20GATRANS!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                  width="100%"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full grayscale-20 contrast-105"
                ></iframe>
              </div>
              <div className="p-3 sm:p-4 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  Kawasan Cargo Area Bandara Soekarno-Hatta
                </span>
                <a
                  href="https://www.google.com/maps/place/GEDUNG+PT+GATRANS/@-6.125061,106.665276,19z/data=!4m6!3m5!1s0x2e6a036700943607:0xb4debe87ebce550c!8m2!3d-6.1252053!4d106.6651638!16s%2Fg%2F11hz6qk2vn?hl=id&entry=ttu&g_ep=EgoyMDI2MDkwMi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 font-semibold hover:underline"
                >
                  Buka Google Maps <Send className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
