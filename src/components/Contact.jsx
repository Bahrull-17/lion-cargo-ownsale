import React from "react";
import { MapPin, Phone, MessageSquare, Mail, Clock, Send, Compass } from "lucide-react";

export default function ContactSection() {
  return (
    <section id="kontak" className="-mt-12 sm:-mt-16 pt-4 sm:pt-6 pb-12 sm:pb-16 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
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

        {/* Grid Konten: Info Kontak & Peta */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Informasi Kontak (5 Kolom) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Alamat */}
            <div className="bg-slate-50/80 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex items-start gap-4 transition-all duration-300 hover:border-blue-500/40">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">Alamat Kantor</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 leading-relaxed">Kawasan Bandara Internasional Soekarno-Hatta, Cargo Area, Tangerang, Banten, Indonesia.</p>
              </div>
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

            {/* Email */}
            <div className="bg-slate-50/80 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex items-start gap-4 transition-all duration-300 hover:border-blue-500/40">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">Email Resmi</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">support@lioncargoownsale.com</p>
              </div>
            </div>

            {/* Jam Operasional */}
            <div className="bg-slate-50/80 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs flex items-start gap-4 transition-all duration-300 hover:border-blue-500/40">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white mb-1">Jam Operasional</h3>
                <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400">
                  Senin - Sabtu: 08.00 - 17.00 WIB
                  <br />
                  <span className="text-blue-600 dark:text-blue-400 font-medium">Layanan Kargo Darurat / 24 Jam via WhatsApp</span>
                </p>
              </div>
            </div>
          </div>

          {/* Kolom Peta Besar (7 Kolom) */}
          <div className="lg:col-span-7 h-full">
            <div className="bg-slate-50/80 dark:bg-slate-800/60 p-2 sm:p-3 rounded-3xl border border-slate-200/80 dark:border-slate-700/60 shadow-xs h-full flex flex-col">
              <div className="relative w-full h-100 sm:h-120 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                {/* Embed Google Maps Area Kargo Bandara Soekarno-Hatta */}
                <iframe
                  title="Peta Lokasi Kantor Bandara Soekarno Hatta"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.666324083544!2d106.6570!3d-6.1250!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a02b55b555555%3A0x5555555555555555!2sSoekarno-Hatta%20International%20Airport!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
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
                  href="https://maps.google.com/?q=Soekarno-Hatta+International+Airport+Cargo"
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
