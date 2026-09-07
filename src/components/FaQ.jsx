import React, { useState } from "react";
import { HelpCircle, ChevronDown, Sparkles, MessageCircle } from "lucide-react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Apa itu layanan Lion Cargo Ownsale dan di mana lokasinya?",
      answer: "Lion Cargo Ownsale adalah layanan agen kargo udara resmi yang berpusat di Bandara Soekarno-Hatta, melayani pengiriman kargo port-to-port domestik dengan standar keamanan, kecepatan, dan ketepatan tinggi.",
    },
    {
      question: "Bagaimana cara melakukan pemesanan pengiriman kargo?",
      answer: "Anda dapat melakukan pemesanan secara online melalui kontak atau WhatsApp resmi kami, atau langsung mengunjungi kantor operasional kami di kawasan Bandara Soekarno-Hatta untuk konsultasi muatan dan penjadwalan penerbangan.",
    },
    {
      question: "Apa saja jenis barang yang dapat dikirimkan melalui layanan kargo udara?",
      answer: "Kami melayani berbagai macam pengiriman barang mulai dari dokumen penting, paket komersial UMKM, produk elektronik, hingga muatan berat dan kargo industri dengan mematuhi regulasi keamanan penerbangan yang berlaku.",
    },
    {
      question: "Bagaimana cara menghitung ongkos kirim?",
      answer:
        "Ongkos kirim dihitung berdasarkan berat aktual atau berat volume (P x L x T / 5000), mana yang lebih besar. Anda bisa menggunakan fitur Cek Ongkir di website kami atau menghubungi customer service untuk perhitungan yang lebih akurat.",
    },
    {
      question: "Apakah ada minimal berat untuk pengiriman?",
      answer: "Ya, minimal berat pengiriman adalah 10 kg. Untuk berat di bawah 10 kg akan tetap dihitung sebagai 10 kg.",
    },
    {
      question: "Apakah barang diasuransikan?",
      answer: "Ya, semua pengiriman mendapat perlindungan asuransi dasar. Untuk barang dengan nilai tinggi, kami menyarankan untuk mengambil asuransi tambahan yang bisa diinformasikan saat booking.",
    },
    {
      question: "Bagaimana cara melacak status pengiriman barang saya?",
      answer: "Setiap pengiriman akan dilengkapi dengan nomor resi resmi. Anda dapat memantau posisi dan status barang secara real-time melalui sistem pelacakan atau dengan menghubungi layanan pelanggan kami yang siap 24/7.",
    },
    {
      question: "Berapa lama estimasi waktu pengiriman barang sampai ke tujuan?",
      answer: "Estimasi waktu pengiriman (ETA) bergantung pada rute destinasi domestik yang dituju. Sebagian besar pengiriman domestik rute utama dapat tiba dalam hitungan jam atau 1-2 hari kerja berkat dukungan penerbangan langsung.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-16 bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/15 text-blue-700 dark:text-blue-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-2 border border-blue-500/20 shadow-xs backdrop-blur-md">
            <HelpCircle className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span>Pusat Bantuan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
            Pertanyaan yang Sering <span className="text-blue-600 dark:text-blue-500">Diajukan</span>
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl mx-auto">Temukan jawaban lengkap seputar prosedur, layanan, dan informasi pengiriman kargo udara bersama kami.</p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 sm:space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 rounded-2xl overflow-hidden transition-all duration-300 hover:border-blue-500/40 dark:hover:border-blue-400/40 shadow-xs"
              >
                <button onClick={() => toggleFAQ(index)} className="w-full flex items-center justify-between p-4 sm:p-5 text-left font-semibold text-slate-900 dark:text-white text-xs sm:text-sm focus:outline-hidden gap-4 cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${isOpen ? "bg-blue-600 text-white" : "bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400"}`}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span>{faq.question}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-600 dark:text-blue-400" : ""}`} />
                </button>

                <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-4 px-4 sm:px-5 sm:pb-5" : "grid-rows-[0fr] opacity-0 px-4 sm:px-5"}`}>
                  <div className="overflow-hidden">
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-slate-200/60 dark:border-slate-700/60">{faq.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Call to Action Box */}
        <div className="mt-10 sm:mt-12 text-center bg-blue-50 dark:bg-slate-800/50 border border-blue-100 dark:border-slate-700/80 p-6 sm:p-8 rounded-3xl shadow-xs">
          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2">Masih ada pertanyaan?</h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-5 max-w-md mx-auto">Hubungi kami untuk informasi lebih lanjut mengenai pengiriman kargo udara Anda.</p>
          <a
            href="https://wa.me/6285285586828"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Hubungi Kami</span>
          </a>
        </div>
      </div>
    </section>
  );
}
