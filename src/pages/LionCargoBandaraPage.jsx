import { Link } from "react-router-dom";
import { ShieldCheck, MapPin, Plane, PackageCheck, Clock, Headset, Building2, Route, Gauge, Navigation, PhoneCall, MessageCircle, Mail, Package, ScanLine, PlaneTakeoff, PlaneLanding, ArrowRight } from "lucide-react";
import JsonLd from "../components/JsonLd";
import Breadcrumb from "../components/cargo/Breadcrumb";
import CargoHero, { KepingMelayang } from "../components/cargo/CargoHero";
import CtaBand from "../components/cargo/CtaBand";
import FaqAccordion from "../components/cargo/FaqAccordion";
import FlowSteps from "../components/cargo/FlowSteps";
import Reveal from "../components/cargo/Reveal";
import RouteMap from "../components/cargo/RouteMap";
import { FeatureArt, TerminalScene } from "../components/cargo/Scenes";
import SectionHeading from "../components/cargo/SectionHeading";
import { LINK, TEKS, TOMBOL_OUTLINE, TOMBOL_UTAMA, TOMBOL_WA } from "../components/cargo/gaya";
import useDocumentMeta from "../hooks/useDocumentMeta";
import useRingkasanTarif from "../hooks/useRingkasanTarif";
import { LION_CARGO_BANDARA_META } from "../config/pageMeta";
import { ROUTES } from "../config/routes";
import { SITE, whatsappLink } from "../config/site";
import { formatRupiah } from "../utils/tarif";

const PESAN_WA = "Halo Admin, saya ingin konsultasi layanan cargo udara dari Bandara Soekarno-Hatta.";

// Semua fakta (alamat, jam, kontak, cara pesan, jenis barang) diambil dari yang sudah tertulis di situs ini
// (SITE di config/site.js, bagian Kontak, dan FAQ Beranda). Status agen resmi Lion Cargo dikonfirmasi pemilik situs. Tidak ada klaim asuransi atau penjemputan.
export default function LionCargoBandaraPage() {
  useDocumentMeta(LION_CARGO_BANDARA_META);

  const { pengaturan, termurah, termahal, jumlahTujuan, maskapai } = useRingkasanTarif();
  if (!termurah) return null;

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
      jawaban: `Minimal berat ${pengaturan.beratMinimum} kg per pengiriman. Tarif per kg berkisar ${formatRupiah(termurah.rate)} sampai ${formatRupiah(termahal.rate)} tergantung kota tujuan, ditambah biaya penanganan ${formatRupiah(pengaturan.biayaAdmin)}.`,
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

  const langkahProses = [
    { ikon: Package, judul: "Barang diterima", teks: "Serahkan barang yang sudah dikemas di area kargo bandara, sesuai arahan admin." },
    { ikon: ScanLine, judul: "Proses terminal cargo", teks: "Barang melalui penerimaan dan pemeriksaan di terminal kargo sesuai regulasi keamanan penerbangan." },
    { ikon: PlaneTakeoff, judul: "Pengiriman melalui pesawat", teks: "Barang dimuat ke penerbangan menuju bandara kota tujuan." },
    { ikon: PlaneLanding, judul: "Tiba di kota tujuan", teks: "Barang tiba di bandara kota tujuan dan dapat diambil di sana (layanan port-to-port)." },
  ];

  const keunggulan = [
    { ikon: Building2, judul: "Akses bandara utama", teks: "Berada di area kargo Bandara Soekarno-Hatta, tepat di titik keberangkatan barang Anda." },
    { ikon: Clock, judul: "Jadwal penerbangan", teks: "Pengiriman mengikuti jadwal penerbangan. Admin membantu memilih jadwal yang sesuai kebutuhan." },
    { ikon: Route, judul: "Jaringan kota tujuan", teks: `${jumlahTujuan} kota tujuan dengan tarif terbuka per kota, dari Sumatra sampai Papua.` },
    { ikon: Gauge, judul: "Proses lebih efisien", teks: "Layanan port-to-port memproses barang langsung dari kawasan kargo ke bandara tujuan." },
  ];

  const infoSingkat = [
    { label: "Kode bandara", nilai: "CGK" },
    { label: "Lokasi", nilai: "Tangerang, Banten" },
    { label: "Kantor kami", nilai: "Area kargo bandara" },
    { label: "Layanan", nilai: "Cargo udara domestik, port-to-port" },
  ];

  return (
    <main className="bg-white pb-16 transition-colors dark:bg-slate-950">
      <JsonLd data={jsonLd} />

      <CargoHero
        breadcrumb={<Breadcrumb items={[{ label: "Beranda", to: ROUTES.home }, { label: "Lion Cargo Bandara Soekarno-Hatta" }]} />}
        badge={
          <>
            <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Agen Resmi Lion Cargo
          </>
        }
        judul="Lion Cargo"
        judulSorot="Bandara Soekarno-Hatta"
        deskripsi="Lion Cargo Ownsale adalah agen resmi Lion Cargo di kawasan kargo Bandara Soekarno-Hatta, Tangerang, Banten. Kami melayani jasa cargo bandara dan ekspedisi udara domestik dari bandara Jakarta ke kota-kota di seluruh Indonesia."
        tambahan={
          <ul className="flex flex-wrap gap-2">
            {[
              { ikon: MapPin, teks: "Lokasi strategis" },
              { ikon: Plane, teks: "Konektivitas penerbangan" },
              { ikon: PackageCheck, teks: "Layanan cargo udara" },
            ].map(({ ikon: Ikon, teks }) => (
              <li key={teks} className="inline-flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5 text-xs font-semibold text-blue-900 dark:bg-blue-900/40 dark:text-blue-200">
                <Ikon className="h-3.5 w-3.5 text-blue-600 dark:text-blue-300" aria-hidden="true" />
                {teks}
              </li>
            ))}
          </ul>
        }
        aksi={
          <>
            <Link to={ROUTES.cekOngkir} className={TOMBOL_UTAMA}>
              Cek Ongkir
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={whatsappLink(PESAN_WA)} target="_blank" rel="noopener noreferrer" className={TOMBOL_WA}>
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Konsultasi
            </a>
          </>
        }
        adegan={<TerminalScene label="Ilustrasi terminal kargo bandara dengan pesawat di apron dan kendaraan pemuat" />}
        overlay={
          <>
            <KepingMelayang ikon={MapPin} judul="Area Kargo CGK" teks="Tangerang, Banten" className="left-3 top-4 sm:-left-5 sm:top-10" />
            <KepingMelayang ikon={Headset} judul="Admin 24 jam" teks="via WhatsApp" animasi="cg-float-b" className="bottom-3 right-3 sm:-bottom-4 sm:right-10" />
          </>
        }
      />

      <div className="mx-auto max-w-6xl space-y-12 px-4 pt-10 sm:space-y-24 sm:px-6 sm:pt-20">
        {/* TENTANG BANDARA */}
        <section aria-labelledby="judul-bandara" className="grid items-start gap-8 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
          <Reveal className="space-y-4">
            <SectionHeading id="judul-bandara" rata="kiri" eyebrow="Tentang bandara" title="Gerbang Udara Utama dari Jakarta" />
            <p className={TEKS}>Bandara Soekarno-Hatta (CGK) berada di Tangerang, Banten, dan menjadi gerbang udara utama bagi Jakarta dan sekitarnya. Dari sini penerbangan menghubungkan ibu kota dengan kota-kota di Sumatra, Jawa, Kalimantan, Sulawesi, Bali, Nusa Tenggara, Maluku, hingga Papua.</p>
            <p className={TEKS}>Barang kargo ditangani lewat area dan terminal kargo tersendiri, terpisah dari terminal penumpang. Kantor Lion Cargo Ownsale berada di area kargo ini, sehingga barang Anda diproses di titik keberangkatan, bukan dioper antar gudang.</p>
            <p className={TEKS}>Kombinasi lokasi dan jaringan rute inilah yang membuat pengiriman antarkota lewat udara dari Soekarno-Hatta praktis untuk dokumen, paket usaha, produk elektronik, maupun muatan berat.</p>
          </Reveal>
          <Reveal delay={120} as="aside" className="rounded-3xl border border-blue-100 bg-linear-to-br from-blue-50 to-white p-6 shadow-lg shadow-blue-900/5 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950" aria-label="Info singkat">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600 dark:text-blue-400">Info singkat</p>
            <dl className="mt-4 divide-y divide-blue-100 dark:divide-slate-800">
              {infoSingkat.map(({ label, nilai }) => (
                <div key={label} className="flex items-baseline justify-between gap-4 py-3">
                  <dt className="text-sm text-slate-600 dark:text-slate-400">{label}</dt>
                  <dd className="text-right text-sm font-bold text-slate-900 dark:text-white">{nilai}</dd>
                </div>
              ))}
            </dl>
            {maskapai && <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">{`Tarif di situs ini mengacu pada pengiriman via ${maskapai}.`}</p>}
          </Reveal>
        </section>

        {/* PROSES PENGIRIMAN */}
        <section aria-labelledby="judul-proses">
          <SectionHeading id="judul-proses" eyebrow="Proses pengiriman" title="Perjalanan Barang Anda dari Terminal Cargo" description="Empat tahap dari barang diterima sampai tiba di kota tujuan." />
          <div className="mt-10">
            <FlowSteps steps={langkahProses} />
          </div>
        </section>

        {/* KEUNGGULAN: split layout */}
        <section aria-labelledby="judul-unggul" className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal className="mx-auto hidden w-full max-w-sm lg:block lg:max-w-none">
            <FeatureArt jenis="jangkauan" label="Ilustrasi rute dari satu titik ke beberapa kota" />
          </Reveal>
          <div className="space-y-6">
            <SectionHeading id="judul-unggul" rata="kiri" eyebrow="Keunggulan" title="Kenapa Kirim dari Soekarno-Hatta" />
            <ul className="relative space-y-5">
              <span className="absolute bottom-6 left-[19px] top-6 w-px bg-linear-to-b from-blue-400 to-transparent" aria-hidden="true" />
              {keunggulan.map(({ ikon: Ikon, judul, teks }, index) => (
                <Reveal as="li" key={judul} delay={index * 90} className="relative flex gap-4">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/25 ring-4 ring-white dark:ring-slate-950">
                    <Ikon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{judul}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{teks}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* KOTA TUJUAN */}
        <section aria-labelledby="judul-kota">
          <SectionHeading id="judul-kota" eyebrow="Kota tujuan" title="Jangkauan Cargo Udara dari CGK" description="Arahkan kursor atau fokus ke sebuah kota untuk melihat rutenya. Klik untuk membuka tarif dan rincian kota itu." />
          <div className="mt-8">
            <RouteMap />
          </div>
          <p className="mt-6 text-center">
            <Link to={ROUTES.tarif} className={`${LINK} inline-flex items-center gap-1.5 text-sm`}>
              {`Lihat tarif ke semua ${jumlahTujuan} tujuan`}
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </p>
        </section>

        {/* LOKASI */}
        <section aria-labelledby="judul-lokasi">
          <SectionHeading id="judul-lokasi" eyebrow="Lokasi" title="Temui Kami di Area Kargo Bandara" />
          <div className="mt-8 overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl shadow-blue-900/5 dark:border-slate-800 dark:bg-slate-900 md:grid md:grid-cols-2">
            <div className="h-64 w-full bg-slate-100 dark:bg-slate-800 md:h-full md:min-h-80">
              <iframe title="Peta lokasi Lion Cargo Ownsale di area kargo Bandara Soekarno-Hatta" src={SITE.mapsEmbedUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div className="space-y-5 p-6 sm:p-8">
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <address className="text-sm not-italic leading-relaxed text-slate-600 dark:text-slate-400">
                    <span className="block font-semibold text-slate-900 dark:text-white">{SITE.address.place}</span>
                    {SITE.address.street}
                  </address>
                </li>
                <li className="flex gap-3">
                  <Clock className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <p className="text-sm text-slate-600 dark:text-slate-400">{SITE.hours}</p>
                </li>
                <li className="flex gap-3">
                  <Mail className="mt-0.5 h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400" aria-hidden="true" />
                  <a href={`mailto:${SITE.email}`} className={`text-sm ${LINK}`}>
                    {SITE.email}
                  </a>
                </li>
              </ul>
              <div className="grid grid-cols-3 gap-2">
                <a href={whatsappLink(PESAN_WA)} target="_blank" rel="noopener noreferrer" className={`${TOMBOL_WA} flex-col gap-1 px-2 py-3 text-xs`}>
                  <MessageCircle className="h-5 w-5" aria-hidden="true" />
                  WhatsApp
                </a>
                <a href={SITE.phoneHref} className={`${TOMBOL_UTAMA} flex-col gap-1 px-2 py-3 text-xs`}>
                  <PhoneCall className="h-5 w-5" aria-hidden="true" />
                  Telepon
                </a>
                <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className={`${TOMBOL_OUTLINE} flex-col gap-1 px-2 py-3 text-xs`}>
                  <Navigation className="h-5 w-5" aria-hidden="true" />
                  Arah
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section aria-labelledby="judul-faq" className="mx-auto w-full max-w-3xl space-y-8">
          <SectionHeading id="judul-faq" eyebrow="FAQ" title="Pertanyaan tentang Lion Cargo di Bandara Soekarno-Hatta" />
          <FaqAccordion items={faq} />
        </section>

        <CtaBand judul="Cek layanan cargo udara sekarang" deskripsi="Hitung estimasi ongkir ke kota tujuan Anda, atau konsultasikan kebutuhan pengiriman dengan admin kami di area kargo Bandara Soekarno-Hatta." utama={{ label: "Cek Ongkir", to: ROUTES.cekOngkir }} sekunder={{ label: "Konsultasi", href: whatsappLink(PESAN_WA) }} />
      </div>
    </main>
  );
}
