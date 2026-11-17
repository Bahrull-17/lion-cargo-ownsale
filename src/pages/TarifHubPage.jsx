import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plane, ChevronRight, ChevronDown, Search, Calculator, MessageCircle } from "lucide-react";
import JsonLd from "../components/JsonLd";
import useDocumentMeta from "../hooks/useDocumentMeta";
import useTarifData from "../hooks/useTarifData";
import TarifDiperbarui from "../components/TarifDiperbarui";
import { TARIF_HUB_META } from "../config/pageMeta";
import { ROUTES } from "../config/routes";
import { SITE, whatsappLink } from "../config/site";
import { DESTINATION_PAGES } from "../config/destinations";
import { PEMBAGI_VOLUME, formatRupiah, hitungBiaya, tarifTermurahTujuan } from "../utils/tarif";

const CARD = "bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 space-y-4";
const H2 = "text-lg sm:text-xl font-bold text-slate-900 dark:text-white";
const BODY = "text-sm text-slate-600 dark:text-slate-400 leading-relaxed";
const GRADASI = "text-transparent bg-clip-text bg-linear-to-r from-blue-600 via-indigo-600 to-blue-800 dark:from-blue-400 dark:via-indigo-400 dark:to-blue-500";

const CONTOH_DUS = { panjang: 50, lebar: 40, tinggi: 30, beratAktual: 8 }; // cm dan kg
const HALAMAN_PER_KODE = new Map(DESTINATION_PAGES.map((destination) => [destination.code, destination]));

// Nama di Sheet berupa huruf kapital + kode ("GALELA-HALMAHERA UTARA (GLX)"): dibuang kodenya lalu dirapikan jadi "Galela-Halmahera Utara".
function rapikanNama(namaDest) {
  return namaDest
    .replace(/\s*\([^)]*\)/g, "")
    .trim()
    .toLowerCase()
    .replace(/(^|[\s-])(\p{L})/gu, (_, pemisah, huruf) => pemisah + huruf.toUpperCase());
}

function TabelTarif({ judul, baris, beratMinimum }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left">
        <caption className="sr-only">{judul}</caption>
        <thead>
          <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
            <th scope="col" className="py-2 pr-3 font-semibold">
              Tujuan
            </th>
            <th scope="col" className="py-2 px-2 font-semibold text-right whitespace-nowrap">
              Per kg
            </th>
            <th scope="col" className="hidden sm:table-cell py-2 pl-2 font-semibold text-right whitespace-nowrap">{`${beratMinimum} kg`}</th>
          </tr>
        </thead>
        <tbody className="text-slate-700 dark:text-slate-300">
          {baris.map((tujuan) => (
            <tr key={tujuan.code} className="border-b border-slate-100 dark:border-slate-800 last:border-0">
              <th scope="row" className="py-3 pr-2 align-middle font-semibold">
                {tujuan.path ? (
                  <Link to={tujuan.path} className="group flex items-start gap-1 text-slate-800 dark:text-slate-100 hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
                    {`Jakarta ke ${tujuan.nama}`}
                    <ChevronRight className="w-4 h-4 mt-0.5 shrink-0 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" aria-hidden="true" />
                  </Link>
                ) : (
                  `Jakarta ke ${tujuan.nama}`
                )}
                <span className="block text-xs font-normal text-slate-600 dark:text-slate-400">{tujuan.code}</span>
              </th>
              <td className="py-3 px-1 sm:px-2 text-right align-middle whitespace-nowrap">
                <span className="block font-bold text-blue-700 dark:text-blue-400">{formatRupiah(tujuan.rate)}</span>
                <span className="block sm:hidden text-xs text-slate-600 dark:text-slate-400">{`${beratMinimum} kg: ${formatRupiah(tujuan.total)}`}</span>
              </td>
              <td className="hidden sm:table-cell py-3 pl-2 text-right align-middle whitespace-nowrap">{formatRupiah(tujuan.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function TarifHubPage() {
  useDocumentMeta(TARIF_HUB_META);

  const { databaseTarif, pengaturan, diperbaruiPada } = useTarifData();
  const [kueri, setKueri] = useState("");
  const [bukaLainnya, setBukaLainnya] = useState(false);

  const { berHalaman, lainnya, termurah, termahal } = useMemo(() => {
    const semua = [...new Set(databaseTarif.map((baris) => baris.dest))].map((code) => {
      const tarif = tarifTermurahTujuan(databaseTarif, code);
      const halaman = HALAMAN_PER_KODE.get(code);
      return {
        code,
        nama: halaman ? halaman.kota : rapikanNama(tarif.namaDest),
        path: halaman ? halaman.path : null,
        rate: tarif.rateReguler,
        total: hitungBiaya(tarif.rateReguler, pengaturan.beratMinimum, pengaturan).total,
      };
    });
    // Kota yang punya halaman rincian tampil lebih dulu (urutan populer di destinations.js), sisanya urut abjad.
    const urutanHalaman = DESTINATION_PAGES.map((destination) => semua.find((tujuan) => tujuan.code === destination.code)).filter(Boolean);
    const sisanya = semua.filter((tujuan) => !tujuan.path).sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    const urutTarif = [...semua].sort((a, b) => a.rate - b.rate);
    return { berHalaman: urutanHalaman, lainnya: sisanya, termurah: urutTarif[0], termahal: urutTarif[urutTarif.length - 1] };
  }, [databaseTarif, pengaturan]);

  const jumlahTujuan = berHalaman.length + lainnya.length;
  const kata = kueri.trim().toLowerCase();
  const cocok = (tujuan) => !kata || tujuan.nama.toLowerCase().includes(kata) || tujuan.code.toLowerCase().includes(kata);
  const hasilHalaman = berHalaman.filter(cocok);
  const hasilLainnya = lainnya.filter(cocok);

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
      pertanyaan: "Kota mana saja yang bisa dikirimi cargo udara?",
      jawaban: `Daftar di halaman ini memuat ${jumlahTujuan} tujuan dari Bandara Soekarno-Hatta. Kota yang punya halaman rincian dapat dibuka untuk melihat contoh total ongkir dan estimasi. Jika kota Anda belum tercantum, hubungi admin untuk menanyakan ketersediaan rute.`,
    },
    {
      pertanyaan: "Bagaimana cara menghitung ongkir cargo udara?",
      jawaban: `Ongkir = berat yang ditagihkan x tarif per kg + biaya penanganan ${formatRupiah(pengaturan.biayaAdmin)}. Berat yang ditagihkan adalah yang lebih besar antara berat aktual dan berat volume, yaitu panjang x lebar x tinggi (cm) dibagi ${PEMBAGI_VOLUME}.`,
    },
    {
      pertanyaan: "Berapa lama cargo udara sampai ke tujuan?",
      jawaban: `Estimasi layanan reguler adalah ${pengaturan.estimasiWaktu}. Waktu pastinya mengikuti jadwal penerbangan dan proses di bandara, jadi konfirmasikan ke admin sebelum pengiriman.`,
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

  const stat = [
    { nilai: String(jumlahTujuan), label: "Kota tujuan" },
    { nilai: formatRupiah(termurah.rate), label: "Tarif mulai/kg" },
    { nilai: `${pengaturan.beratMinimum} kg`, label: "Berat minimum" },
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
              Tarif Cargo Udara
            </li>
          </ol>
        </nav>

        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-900 dark:text-blue-300 text-xs font-semibold tracking-wide uppercase border border-blue-200 dark:border-blue-800/50 shadow-xs">
            <Plane className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" aria-hidden="true" />
            <span>Rute dari Bandara CGK</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Tarif Cargo Udara Jakarta ke <span className={GRADASI}>Seluruh Indonesia</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto">
            {`Daftar tarif cargo udara Lion Cargo Ownsale dari Bandara Soekarno-Hatta (CGK) ke ${jumlahTujuan} kota tujuan: ${formatRupiah(termurah.rate)} sampai ${formatRupiah(termahal.rate)} per kg, minimal ${pengaturan.beratMinimum} kg, estimasi ${pengaturan.estimasiWaktu}.`}
          </p>
          <TarifDiperbarui tanggal={diperbaruiPada} className="justify-center" />
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
          <h2 className={H2}>Daftar Tarif Cargo Udara per Kota Tujuan</h2>
          <p className={BODY}>{`Tarif per kg dan total untuk berat minimum ${pengaturan.beratMinimum} kg (sudah termasuk biaya penanganan ${formatRupiah(pengaturan.biayaAdmin)}). Pilih kota untuk melihat rincian, contoh perhitungan, dan memesan via WhatsApp.`}</p>

          <div>
            <label htmlFor="cari-tujuan" className="sr-only">
              Cari kota tujuan atau kode bandara
            </label>
            <div className="flex items-center gap-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 focus-within:ring-2 focus-within:ring-blue-600 transition-all">
              <Search className="w-4 h-4 shrink-0 text-slate-400" aria-hidden="true" />
              <input
                id="cari-tujuan"
                type="search"
                inputMode="search"
                autoComplete="off"
                value={kueri}
                onChange={(e) => setKueri(e.target.value)}
                placeholder="Cari kota atau kode bandara"
                className="w-full min-h-12 bg-transparent text-base text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
              />
            </div>
          </div>

          {hasilHalaman.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{`Rute Utama dengan Halaman Rincian (${hasilHalaman.length})`}</h3>
              <TabelTarif judul="Tarif cargo udara Jakarta ke kota tujuan utama" baris={hasilHalaman} beratMinimum={pengaturan.beratMinimum} />
            </div>
          )}

          {hasilLainnya.length > 0 && (
            // Dilipat agar halaman tidak terlalu panjang di HP. Isinya tetap ada di HTML (terbaca mesin pencari) dan terbuka otomatis saat pengunjung mencari.
            <details className="group pt-2" open={bukaLainnya || kata !== ""} onToggle={(e) => setBukaLainnya(e.currentTarget.open)}>
              <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 px-4 text-sm font-bold text-slate-900 dark:text-white hover:border-blue-500/60 dark:hover:border-blue-400/60 transition-colors [&::-webkit-details-marker]:hidden">
                <span>{`Tujuan Lainnya (${hasilLainnya.length})`}</span>
                <ChevronDown className="w-4 h-4 shrink-0 text-slate-500 transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="pt-3 space-y-2">
                <p className="text-xs text-slate-600 dark:text-slate-400">Tujuan ini belum punya halaman rincian. Tarif di bawah tetap berlaku, hubungi admin untuk memesan.</p>
                <TabelTarif judul="Tarif cargo udara Jakarta ke tujuan lainnya" baris={hasilLainnya} beratMinimum={pengaturan.beratMinimum} />
              </div>
            </details>
          )}

          {hasilHalaman.length === 0 && hasilLainnya.length === 0 && (
            <div className="rounded-xl bg-slate-50 dark:bg-slate-800/40 p-4 text-center text-sm text-slate-600 dark:text-slate-400">
              {`Tidak ada tujuan yang cocok dengan "${kueri.trim()}". Coba nama kota lain atau tanyakan ketersediaan rute ke admin.`}
            </div>
          )}
        </section>

        <section className={CARD}>
          <h2 className={H2}>Cara Menghitung Ongkir Cargo Udara</h2>
          <p className={BODY}>{`Ongkir = berat yang ditagihkan x tarif per kg + biaya penanganan ${formatRupiah(pengaturan.biayaAdmin)}. Berat yang ditagihkan adalah yang lebih besar antara berat aktual dan berat volume, yaitu panjang x lebar x tinggi (cm) dibagi ${PEMBAGI_VOLUME}.`}</p>
          <p className={BODY}>{`Contoh: kardus ${CONTOH_DUS.panjang} x ${CONTOH_DUS.lebar} x ${CONTOH_DUS.tinggi} cm dengan berat aktual ${CONTOH_DUS.beratAktual} kg memiliki berat volume ${beratVolume} kg, sehingga ditagihkan ${contohHitung.berat} kg. Ke ${contohRef.nama}: ${contohHitung.berat} x ${formatRupiah(contohRef.rate)} + ${formatRupiah(contohHitung.biayaAdmin)} = ${formatRupiah(contohHitung.total)}.`}</p>
          <p className={BODY}>Ingin langsung menghitung dengan berat dan tujuan Anda sendiri?</p>
          <Link to={ROUTES.cekOngkir} className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-linear-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-xl shadow-lg shadow-blue-900/25 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300 border border-blue-500/30">
            <Calculator className="w-4 h-4" aria-hidden="true" />
            Cek Ongkir Cargo Udara
          </Link>
        </section>

        <section className={CARD}>
          <h2 className={H2}>Pertanyaan tentang Tarif Cargo Udara</h2>
          {faq.map(({ pertanyaan, jawaban }) => (
            <div key={pertanyaan} className="space-y-1">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{pertanyaan}</h3>
              <p className={BODY}>{jawaban}</p>
            </div>
          ))}
        </section>

        <section className="rounded-3xl bg-linear-to-br from-blue-900 via-blue-950 to-slate-900 border border-blue-800/40 shadow-2xl shadow-blue-950/20 p-6 sm:p-8 text-center space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-white">Kota Anda belum ada di daftar?</h2>
          <p className="text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">Tanyakan ketersediaan rute dan tarif terbaru langsung ke admin. Sertakan kota tujuan, berat, dan jenis barang agar jawabannya lebih cepat.</p>
          <a
            href={whatsappLink("Halo Admin, saya ingin tanya tarif dan ketersediaan rute cargo udara ke kota tujuan saya.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-lg active:scale-[0.98] transition-all"
          >
            <MessageCircle className="w-4 h-4" aria-hidden="true" />
            Tanya Admin via WhatsApp
          </a>
        </section>
      </div>
    </main>
  );
}
