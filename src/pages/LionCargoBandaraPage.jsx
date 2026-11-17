import { Link } from "react-router-dom";
import { ChevronRight, MapPin, Clock, MessageCircle, Mail, Plane, ArrowRight } from "lucide-react";
import JsonLd from "../components/JsonLd";
import TarifDiperbarui from "../components/TarifDiperbarui";
import useDocumentMeta from "../hooks/useDocumentMeta";
import useTarifData from "../hooks/useTarifData";
import { LION_CARGO_BANDARA_META } from "../config/pageMeta";
import { ROUTES } from "../config/routes";
import { SITE, whatsappLink } from "../config/site";
import { DESTINATION_PAGES } from "../config/destinations";
import { formatRupiah, tarifTermurahTujuan } from "../utils/tarif";

const CARD = "bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 space-y-4";
const H2 = "text-lg sm:text-xl font-bold text-slate-900 dark:text-white";
const BODY = "text-sm text-slate-600 dark:text-slate-400 leading-relaxed";
const GRADASI = "text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500";
const LINK = "font-semibold text-blue-700 dark:text-blue-400 hover:underline";
const JUMLAH_RUTE_POPULER = 6;

// Semua fakta (alamat, jam, kontak, cara pesan, jenis barang) diambil dari yang sudah tertulis di situs ini
// (SITE di config/site.js, bagian Kontak, dan FAQ Beranda). Status agen resmi Lion Cargo dikonfirmasi pemilik situs. Tidak ada klaim asuransi atau penjemputan.
const LANGKAH_PESAN = [
  { judul: "Hubungi admin via WhatsApp", isi: "Sebutkan kota tujuan, perkiraan berat, dan jenis barang yang akan dikirim." },
  { judul: "Cek tarif", isi: "Lihat tarif per kg di daftar tarif, atau hitung ongkir sesuai berat dan tujuan Anda di halaman cek ongkir." },
  { judul: "Konfirmasi jadwal dan penyerahan barang", isi: "Admin akan memandu jadwal penerbangan dan cara menyerahkan barang di kawasan kargo bandara." },
];

export default function LionCargoBandaraPage() {
  useDocumentMeta(LION_CARGO_BANDARA_META);

  const { databaseTarif, pengaturan, diperbaruiPada } = useTarifData();

  const kodeTujuan = [...new Set(databaseTarif.map((baris) => baris.dest))];
  const tarifPerTujuan = kodeTujuan.map((code) => tarifTermurahTujuan(databaseTarif, code));
  const termurah = tarifPerTujuan.reduce((a, b) => (a.rateReguler <= b.rateReguler ? a : b));
  const termahal = tarifPerTujuan.reduce((a, b) => (a.rateReguler >= b.rateReguler ? a : b));
  const maskapai = [...new Set(databaseTarif.map((baris) => baris.maskapai).filter(Boolean))].join(" dan ");

  const rutePopuler = DESTINATION_PAGES.slice(0, JUMLAH_RUTE_POPULER)
    .map((destination) => ({ destination, tarif: tarifTermurahTujuan(databaseTarif, destination.code) }))
    .filter(({ tarif }) => tarif);

  const alamatLengkap = `${SITE.address.place}, ${SITE.address.street}`;

  const faq = [
    {
      pertanyaan: "Apakah Lion Cargo Ownsale agen resmi Lion Cargo?",
      jawaban: "Ya. Lion Cargo Ownsale adalah agen resmi Lion Cargo di area kargo Bandara Soekarno-Hatta. Hubungi admin lewat WhatsApp jika Anda membutuhkan keterangan lebih lanjut.",
    },
    {
      pertanyaan: "Di mana lokasi Lion Cargo Ownsale di Bandara Soekarno-Hatta?",
      jawaban: `Lion Cargo Ownsale berlokasi di ${alamatLengkap}. Lokasi ini ada di area kargo Bandara Soekarno-Hatta (CGK). Anda dapat membukanya lewat tautan Google Maps di halaman ini.`,
    },
    {
      pertanyaan: "Jam berapa Lion Cargo Ownsale melayani?",
      jawaban: `Jam operasional: ${SITE.hours}. Admin dapat dihubungi lewat WhatsApp ${SITE.phoneDisplay} atau email ${SITE.email}.`,
    },
    {
      pertanyaan: "Bagaimana cara memesan cargo udara?",
      jawaban: "Hubungi admin lewat WhatsApp dan sebutkan kota tujuan, berat, serta jenis barang. Anda juga bisa datang langsung ke kantor operasional di area kargo bandara untuk konsultasi muatan dan penjadwalan penerbangan.",
    },
    {
      pertanyaan: "Barang apa saja yang bisa dikirim lewat cargo udara?",
      jawaban: "Dokumen penting, paket usaha kecil dan online shop, produk elektronik, sampai muatan berat. Semua pengiriman mengikuti regulasi keamanan penerbangan yang berlaku. Untuk barang khusus, tanyakan dulu ke admin sebelum mengirim.",
    },
    {
      pertanyaan: "Berapa minimal berat dan tarif per kg?",
      jawaban: `Minimal berat ${pengaturan.beratMinimum} kg per pengiriman. Tarif per kg berkisar ${formatRupiah(termurah.rateReguler)} sampai ${formatRupiah(termahal.rateReguler)} tergantung kota tujuan, ditambah biaya penanganan ${formatRupiah(pengaturan.biayaAdmin)}.`,
    },
    {
      pertanyaan: "Apakah barang bisa dijemput?",
      jawaban: "Layanan ini berbasis port-to-port, yaitu dari kawasan kargo Bandara Soekarno-Hatta ke bandara tujuan. Untuk menanyakan opsi penjemputan, hubungi admin lewat WhatsApp.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Lion Cargo Bandara Soekarno-Hatta", item: `${SITE.url}${ROUTES.lionCargoBandara}` },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map(({ pertanyaan, jawaban }) => ({
          "@type": "Question",
          name: pertanyaan,
          acceptedAnswer: { "@type": "Answer", text: jawaban },
        })),
      },
    ],
  };

  const stat = [
    { nilai: String(kodeTujuan.length), label: "Kota tujuan" },
    { nilai: formatRupiah(termurah.rateReguler), label: "Tarif mulai/kg" },
    { nilai: "24 jam", label: "Admin siaga" },
  ];

  return (
    <main className="bg-slate-50 dark:bg-slate-950 pt-6 pb-16 px-4 sm:px-6 transition-colors">
      <JsonLd data={jsonLd} />
      <div className="max-w-3xl mx-auto space-y-6">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1 text-xs text-slate-600 dark:text-slate-400">
            <li className="flex items-center gap-1">
              <Link to={ROUTES.home} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Beranda
              </Link>
              <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
            </li>
            <li aria-current="page" className="font-semibold text-slate-700 dark:text-slate-300">
              Lion Cargo Bandara Soekarno-Hatta
            </li>
          </ol>
        </nav>

        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase border border-blue-200 dark:border-blue-800/50 shadow-xs">
            <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span>Area Kargo Bandara CGK</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Agen Resmi Lion Cargo <span className={GRADASI}>Bandara Soekarno-Hatta</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            Lion Cargo Ownsale adalah agen resmi Lion Cargo di kawasan kargo Bandara Soekarno-Hatta, Tangerang, Banten. Kami melayani jasa cargo bandara dan ekspedisi udara domestik dari bandara Jakarta ke kota-kota di seluruh Indonesia.
          </p>
        </header>

        <div className="grid grid-cols-3 gap-2 sm:gap-4">
          {stat.map(({ nilai, label }) => (
            <div key={label} className="rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm px-2 py-3.5 text-center">
              <p className={`text-base sm:text-2xl font-black tracking-tight ${GRADASI}`}>{nilai}</p>
              <p className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">{label}</p>
            </div>
          ))}
        </div>

        <section className={CARD}>
          <h2 className={H2}>Lokasi dan Jam Operasional</h2>
          <ul className="space-y-3">
            <li className="flex gap-3">
              <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <div className={BODY}>
                <p className="font-semibold text-slate-900 dark:text-white">{SITE.address.place}</p>
                <p>{SITE.address.street}</p>
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={`inline-block mt-1 ${LINK}`}>
                  Buka di Google Maps
                </a>
              </div>
            </li>
            <li className="flex gap-3">
              <Clock className="w-5 h-5 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <p className={BODY}>{SITE.hours}</p>
            </li>
            <li className="flex gap-3">
              <MessageCircle className="w-5 h-5 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className={`text-sm ${LINK}`}>
                {`WhatsApp ${SITE.phoneDisplay}`}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="w-5 h-5 shrink-0 mt-0.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <a href={`mailto:${SITE.email}`} className={`text-sm ${LINK}`}>
                {SITE.email}
              </a>
            </li>
          </ul>
        </section>

        <section className={CARD}>
          <h2 className={H2}>Layanan Cargo Udara dari Bandara Soekarno-Hatta</h2>
          <p className={BODY}>
            Layanan ini berbasis port-to-port, yaitu pengiriman dari kawasan kargo Bandara Soekarno-Hatta (CGK) ke bandara kota tujuan. Barang yang umum dikirim meliputi dokumen penting, paket usaha kecil dan online shop, produk elektronik, hingga muatan berat, dengan mengikuti regulasi keamanan penerbangan yang berlaku.
          </p>
          <p className={BODY}>{`Tarif di situs ini mengacu pada pengiriman via ${maskapai || "maskapai mitra"}, dengan minimal berat ${pengaturan.beratMinimum} kg dan estimasi ${pengaturan.estimasiWaktu}.`}</p>
        </section>

        <section className={CARD}>
          <h2 className={H2}>Cara Memesan Cargo Udara</h2>
          <ol className="space-y-3">
            {LANGKAH_PESAN.map(({ judul, isi }, index) => (
              <li key={judul} className="flex gap-3">
                <span className="flex w-7 h-7 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-sm font-bold text-blue-700 dark:text-blue-300" aria-hidden="true">
                  {index + 1}
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{judul}</h3>
                  <p className={BODY}>{isi}</p>
                </div>
              </li>
            ))}
          </ol>
          <a
            href={whatsappLink("Halo Admin, saya ingin memesan cargo udara dari Bandara Soekarno-Hatta.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Pesan via WhatsApp
          </a>
        </section>

        <section className={CARD}>
          <h2 className={H2}>Tarif Cargo Udara Rute Populer</h2>
          <p className={BODY}>{`Tarif per kg dari Bandara Soekarno-Hatta ke rute yang paling sering dicari. Minimal ${pengaturan.beratMinimum} kg.`}</p>
          <ul className="space-y-2">
            {rutePopuler.map(({ destination, tarif }) => (
              <li key={destination.code}>
                <Link
                  to={destination.path}
                  className="group flex min-h-12 items-center justify-between gap-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 bg-slate-50 dark:bg-slate-800/50 px-4 py-2.5 hover:border-blue-500/60 dark:hover:border-blue-400/60 hover:shadow-md active:scale-[0.98] transition-all"
                >
                  <span className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">{`Cargo udara Jakarta ke ${destination.kota}`}</span>
                  <span className="flex items-center gap-1.5 shrink-0">
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-400">{`${formatRupiah(tarif.rateReguler)}/kg`}</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <TarifDiperbarui tanggal={diperbaruiPada} />
          <Link to={ROUTES.tarif} className="inline-flex items-center gap-1.5 text-sm font-bold text-blue-700 dark:text-blue-400 hover:underline">
            Lihat tarif cargo udara ke semua tujuan
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        </section>

        <section className={CARD}>
          <h2 className={H2}>Pertanyaan tentang Lion Cargo di Bandara Soekarno-Hatta</h2>
          {faq.map(({ pertanyaan, jawaban }) => (
            <div key={pertanyaan} className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{pertanyaan}</h3>
              <p className={BODY}>{jawaban}</p>
            </div>
          ))}
          <p className={BODY}>
            Ingin menghitung ongkir sesuai berat Anda? Gunakan{" "}
            <Link to={ROUTES.cekOngkir} className={LINK}>
              cek ongkir cargo udara
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
