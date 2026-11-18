import { Link } from "react-router-dom";
import { Plane, Calculator, MessageCircle, MapPin, Clock, Receipt, Ruler, Scale, Package, ClipboardList, Weight } from "lucide-react";
import JsonLd from "../components/JsonLd";
import TarifDiperbarui from "../components/TarifDiperbarui";
import Breadcrumb from "../components/cargo/Breadcrumb";
import CargoHero, { KepingMelayang } from "../components/cargo/CargoHero";
import CtaBand from "../components/cargo/CtaBand";
import FaqAccordion from "../components/cargo/FaqAccordion";
import FeatureRow from "../components/cargo/FeatureRow";
import FlowSteps from "../components/cargo/FlowSteps";
import Reveal from "../components/cargo/Reveal";
import { FeatureArt, SkyScene } from "../components/cargo/Scenes";
import SectionHeading from "../components/cargo/SectionHeading";
import TarifExplorer from "../components/cargo/TarifExplorer";
import { TOMBOL_OUTLINE, TOMBOL_UTAMA, TEKS } from "../components/cargo/gaya";
import useDocumentMeta from "../hooks/useDocumentMeta";
import useRingkasanTarif from "../hooks/useRingkasanTarif";
import { TARIF_HUB_META } from "../config/pageMeta";
import { ROUTES } from "../config/routes";
import { SITE, whatsappLink } from "../config/site";
import { PEMBAGI_VOLUME, formatRupiah, hitungBiaya } from "../utils/tarif";

const CONTOH_DUS = { panjang: 50, lebar: 40, tinggi: 30, beratAktual: 8 }; // cm dan kg
const PESAN_WA = "Halo Admin, saya ingin tanya tarif cargo udara dari Bandara Soekarno-Hatta.";

export default function TarifHubPage() {
  useDocumentMeta(TARIF_HUB_META);

  const { pengaturan, diperbaruiPada, berHalaman, lainnya, termurah, termahal, jumlahTujuan } = useRingkasanTarif();
  if (!termurah) return null;

  const contohRef = berHalaman[0] ?? termurah;
  const beratVolume = (CONTOH_DUS.panjang * CONTOH_DUS.lebar * CONTOH_DUS.tinggi) / PEMBAGI_VOLUME;
  const contohHitung = hitungBiaya(contohRef.rate, Math.max(beratVolume, CONTOH_DUS.beratAktual), pengaturan);

  const faq = [
    {
      pertanyaan: "Berapa tarif cargo udara dari Jakarta per kg?",
      jawaban: `Tarif cargo udara dari Bandara Soekarno-Hatta (CGK) ke ${jumlahTujuan} kota tujuan berkisar ${formatRupiah(termurah.rate)} sampai ${formatRupiah(termahal.rate)} per kg, tergantung kota tujuan. Minimal ${pengaturan.beratMinimum} kg per pengiriman, ditambah biaya penanganan ${formatRupiah(pengaturan.biayaAdmin)}.`,
    },
    {
      pertanyaan: "Bagaimana cara menghitung ongkir cargo udara?",
      jawaban: `Ongkir = berat yang ditagihkan x tarif per kg + biaya penanganan ${formatRupiah(pengaturan.biayaAdmin)}. Berat yang ditagihkan adalah yang lebih besar antara berat aktual dan berat volume, yaitu panjang x lebar x tinggi (cm) dibagi ${PEMBAGI_VOLUME}.`,
    },
    {
      pertanyaan: "Berapa minimal berat pengiriman cargo udara?",
      jawaban: `Minimal berat pengiriman adalah ${pengaturan.beratMinimum} kg per pengiriman. Untuk barang yang lebih ringan, hubungi admin agar bisa dicarikan solusi terbaik.`,
    },
    {
      pertanyaan: "Berapa lama pengiriman cargo udara sampai ke tujuan?",
      jawaban: `Estimasi layanan reguler adalah ${pengaturan.estimasiWaktu}. Waktu pastinya mengikuti jadwal penerbangan dan proses di bandara, jadi konfirmasikan ke admin sebelum pengiriman.`,
    },
    {
      pertanyaan: "Kota mana saja yang bisa dikirimi cargo udara?",
      jawaban: `Daftar tarif di halaman ini memuat ${jumlahTujuan} tujuan dari Bandara Soekarno-Hatta. Kota yang punya halaman rincian dapat dibuka untuk melihat contoh total ongkir dan estimasi. Jika kota Anda belum tercantum, hubungi admin untuk menanyakan ketersediaan rute.`,
    },
    {
      pertanyaan: "Apakah tarif bisa berubah?",
      jawaban: "Ya. Tarif dapat berubah mengikuti ketentuan maskapai dan kondisi operasional. Hubungi admin untuk konfirmasi tarif terbaru sebelum Anda mengirim.",
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Tarif Cargo Udara", item: `${SITE.url}${ROUTES.tarif}` },
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

  const langkahHitung = [
    { ikon: Package, judul: "Input barang", teks: "Catat panjang, lebar, tinggi (cm) dan berat barang yang sudah dikemas." },
    { ikon: Scale, judul: "Hitung berat dan volume", teks: "Bandingkan berat aktual dengan berat volume. Yang lebih besar menjadi berat ditagihkan." },
    { ikon: MapPin, judul: "Pilih kota tujuan", teks: "Tarif per kg berbeda di tiap kota. Temukan kota Anda di daftar tarif." },
    { ikon: Receipt, judul: "Dapatkan estimasi tarif", teks: "Berat ditagihkan x tarif per kg, ditambah biaya penanganan, jadi estimasi ongkir Anda." },
  ];

  const faktorHarga = [
    { ikon: MapPin, judul: "Kota tujuan", teks: "Setiap kota punya tarif per kg sendiri." },
    { ikon: Weight, judul: "Berat yang ditagihkan", teks: "Berat aktual atau berat volume, mana yang lebih besar." },
    { ikon: Receipt, judul: "Biaya penanganan", teks: `${formatRupiah(pengaturan.biayaAdmin)} ditambahkan pada setiap perhitungan.` },
    { ikon: ClipboardList, judul: "Ketentuan maskapai", teks: "Tarif dapat berubah mengikuti kebijakan maskapai dan kondisi operasional." },
  ];

  return (
    <main className="bg-white pb-16 transition-colors dark:bg-slate-950">
      <JsonLd data={jsonLd} />

      <CargoHero
        breadcrumb={<Breadcrumb items={[{ label: "Beranda", to: ROUTES.home }, { label: "Tarif Cargo Udara" }]} />}
        badge={
          <>
            <Plane className="h-3.5 w-3.5" aria-hidden="true" />
            Tarif dari Bandara CGK
          </>
        }
        judul="Tarif Cargo Udara"
        judulSorot="Terjangkau dan Transparan"
        deskripsi={`Lihat tarif cargo udara Lion Cargo Ownsale dari Bandara Soekarno-Hatta (CGK) ke ${jumlahTujuan} kota di Indonesia: ${formatRupiah(termurah.rate)} sampai ${formatRupiah(termahal.rate)} per kg, minimal ${pengaturan.beratMinimum} kg. Semua komponen biaya ditampilkan jelas, dari tarif per kg sampai biaya penanganan.`}
        tambahan={<TarifDiperbarui tanggal={diperbaruiPada} />}
        aksi={
          <>
            <Link to={ROUTES.cekOngkir} className={TOMBOL_UTAMA}>
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Cek Ongkir
            </Link>
            <a href={whatsappLink(PESAN_WA)} target="_blank" rel="noopener noreferrer" className={TOMBOL_OUTLINE}>
              <MessageCircle className="h-4 w-4 text-emerald-600" aria-hidden="true" />
              Hubungi Kami
            </a>
          </>
        }
        adegan={<SkyScene label="Ilustrasi pesawat kargo terbang di atas kawasan bandara" />}
        overlay={
          <>
            <KepingMelayang ikon={Receipt} judul={`${formatRupiah(termurah.rate)}/kg`} teks="tarif termurah" className="left-3 top-4 sm:-left-5 sm:top-10" />
            <KepingMelayang ikon={MapPin} judul={`${jumlahTujuan} kota`} teks="tujuan dari CGK" animasi="cg-float-b" className="bottom-3 right-3 sm:-right-5 sm:bottom-auto sm:top-[42%]" />
            <KepingMelayang ikon={Clock} judul={pengaturan.estimasiWaktu} teks="estimasi reguler" className="hidden sm:flex sm:-bottom-4 sm:left-12" />
          </>
        }
      />

      <div className="mx-auto max-w-6xl space-y-12 px-4 pt-10 sm:space-y-24 sm:px-6 sm:pt-20">
        {/* INFORMASI TARIF */}
        <section aria-labelledby="judul-info">
          <SectionHeading id="judul-info" eyebrow="Informasi tarif" title="Memahami Tarif Cargo Udara" description="Empat hal yang menentukan biaya pengiriman Anda, dijelaskan singkat." />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-6">
            <Reveal className="relative col-span-2 overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 text-white shadow-xl shadow-blue-700/20 sm:p-8 md:col-span-4">
              <Plane className="absolute -bottom-6 -right-6 h-40 w-40 -rotate-12 text-white/10" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-200">Tarif per kilogram</p>
              <p className="mt-2 text-4xl font-black tracking-tight sm:text-5xl">
                {formatRupiah(termurah.rate)}
                <span className="text-lg font-semibold text-blue-200">/kg</span>
              </p>
              <p className="relative mt-2 max-w-md text-sm leading-relaxed text-blue-100">{`Tarif dihitung per kilogram dan berbeda di tiap kota tujuan. Ini tarif terendah kami; tarif tertinggi ${formatRupiah(termahal.rate)}/kg.`}</p>
            </Reveal>
            <Reveal delay={80} className="col-span-1 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 md:col-span-2">
              <Weight className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Minimal berat</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{`${pengaturan.beratMinimum} kg`}</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Batas minimum per pengiriman.</p>
            </Reveal>
            <Reveal delay={120} className="col-span-1 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-5 md:col-span-2">
              <Ruler className="h-6 w-6 text-blue-600 dark:text-blue-400" aria-hidden="true" />
              <p className="mt-3 text-xs font-semibold text-slate-500 dark:text-slate-400">Berat volume</p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">{`÷ ${PEMBAGI_VOLUME}`}</p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">Panjang x lebar x tinggi (cm).</p>
            </Reveal>
            <Reveal delay={160} className="col-span-2 flex items-center gap-4 rounded-3xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-900/50 dark:bg-blue-950/30 sm:p-6 md:col-span-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300">
                <Calculator className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700 dark:text-blue-300">Contoh estimasi biaya</p>
                <p className="text-2xl font-black text-slate-900 dark:text-white sm:text-3xl">{formatRupiah(contohHitung.total)}</p>
                <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400">{`Kardus ${CONTOH_DUS.panjang} x ${CONTOH_DUS.lebar} x ${CONTOH_DUS.tinggi} cm, ${CONTOH_DUS.beratAktual} kg, ke ${contohRef.nama}: ${contohHitung.berat} kg ditagihkan, sudah termasuk biaya penanganan.`}</p>
              </div>
            </Reveal>
          </div>

          <div className="mt-10">
            <h3 className="text-sm font-bold uppercase tracking-[0.15em] text-slate-900 dark:text-white">Faktor yang memengaruhi harga</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-5 sm:gap-x-10">
              {faktorHarga.map(({ ikon: Ikon, judul, teks }) => (
                <li key={judul} className="flex flex-col gap-2.5 sm:flex-row sm:gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                    <Ikon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{judul}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 sm:text-sm">{teks}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* CARA MENGHITUNG */}
        <section aria-labelledby="judul-hitung">
          <SectionHeading id="judul-hitung" eyebrow="Cara menghitung" title="Dari Barang Anda sampai Estimasi Tarif" description="Empat langkah sederhana. Tidak perlu menebak-nebak biaya sebelum memesan." />
          <div className="mt-10">
            <FlowSteps steps={langkahHitung} />
          </div>
          <div className="mt-8 text-center">
            <Link to={ROUTES.cekOngkir} className={TOMBOL_UTAMA}>
              <Calculator className="h-4 w-4" aria-hidden="true" />
              Hitung Otomatis di Cek Ongkir
            </Link>
          </div>
        </section>

        {/* TARIF PER KOTA */}
        <section aria-labelledby="judul-daftar" className="scroll-mt-24">
          <SectionHeading id="judul-daftar" eyebrow="Tarif per kota" title="Tarif Cargo Udara ke Kota Tujuan" description={`Bar menunjukkan tarif per kg dibanding tujuan termahal. Total untuk ${pengaturan.beratMinimum} kg sudah termasuk biaya penanganan.`} />
          <div className="mx-auto mt-8 max-w-3xl">
            <TarifExplorer berHalaman={berHalaman} lainnya={lainnya} beratMinimum={pengaturan.beratMinimum} rateTertinggi={termahal.rate} />
          </div>
        </section>

        {/* KEUNGGULAN */}
        <section aria-labelledby="judul-unggul" className="space-y-7 sm:space-y-14">
          <SectionHeading id="judul-unggul" eyebrow="Kenapa cargo udara" title="Keunggulan Cargo Udara" />
          <FeatureRow nomor="01" judul="Pengiriman lebih cepat" isi={`Cargo udara memangkas waktu tempuh antarpulau. Estimasi layanan reguler kami ${pengaturan.estimasiWaktu}, mengikuti jadwal penerbangan.`} seni={<FeatureArt jenis="cepat" label="Ilustrasi pesawat melaju dengan jam di sudut" />} />
          <FeatureRow nomor="02" judul="Jangkauan kota luas" isi={`${jumlahTujuan} kota tujuan dari Bandara Soekarno-Hatta, dari Banda Aceh sampai Jayapura. Tarif tiap kota bisa dilihat langsung di halaman ini.`} seni={<FeatureArt jenis="jangkauan" label="Ilustrasi rute dari satu titik ke beberapa kota" />} balik />
          <FeatureRow nomor="03" judul="Cocok untuk bisnis" isi="Dokumen penting, paket online shop, produk elektronik, sampai muatan berat. Tarif per kg yang jelas memudahkan Anda menghitung biaya pengiriman sebelum memesan." seni={<FeatureArt jenis="bisnis" label="Ilustrasi tumpukan paket dengan tanda centang" />} />
        </section>

        {/* FAQ */}
        <section aria-labelledby="judul-faq" className="mx-auto w-full max-w-3xl space-y-8">
          <SectionHeading id="judul-faq" eyebrow="FAQ" title="Pertanyaan tentang Tarif Cargo Udara" />
          <FaqAccordion items={faq} />
          <p className={`${TEKS} text-center`}>
            Butuh alamat dan jam operasional? Lihat{" "}
            <Link to={ROUTES.lionCargoBandara} className="font-semibold text-blue-700 hover:underline dark:text-blue-400">
              Lion Cargo Bandara Soekarno-Hatta
            </Link>
            .
          </p>
        </section>

        <CtaBand judul="Ayo cek tarif cargo udara sekarang" deskripsi="Masukkan berat dan kota tujuan, dapatkan estimasi ongkir dalam hitungan detik. Ada pertanyaan? Admin kami siap membantu." utama={{ label: "Cek Ongkir", to: ROUTES.cekOngkir }} sekunder={{ label: "WhatsApp", href: whatsappLink(PESAN_WA) }} />
      </div>
    </main>
  );
}
