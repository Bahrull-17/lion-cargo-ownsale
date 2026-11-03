import { useMemo } from "react";
import { Link } from "react-router-dom";
import { Plane, ChevronRight, ArrowRight } from "lucide-react";
import JsonLd from "../components/JsonLd";
import useDocumentMeta from "../hooks/useDocumentMeta";
import useTarifData from "../hooks/useTarifData";
import { getDestinationMeta } from "../config/pageMeta";
import { ROUTES } from "../config/routes";
import { SITE, whatsappLink } from "../config/site";
import { relatedDestinations } from "../config/destinations";
import { PEMBAGI_VOLUME, formatRupiah, hitungBiaya, tarifTermurahTujuan } from "../utils/tarif";

const CONTOH_BERAT = [10, 20, 50, 100];
const CONTOH_DUS = { panjang: 60, lebar: 50, tinggi: 40, beratAktual: 15 }; // cm dan kg

const CARD = "bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl shadow-xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 md:p-8 space-y-4";
const H2 = "text-base sm:text-lg font-bold text-slate-900 dark:text-white";
const BODY = "text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed";

function buatFaq({ kota, tarif, pengaturan }) {
  const termurah = hitungBiaya(tarif.rateReguler, pengaturan.beratMinimum, pengaturan);
  return [
    {
      pertanyaan: `Berapa ongkir cargo udara Jakarta ke ${kota}?`,
      jawaban: `Tarif dasar cargo udara Jakarta ke ${kota} adalah ${formatRupiah(tarif.rateReguler)} per kg. Untuk ${termurah.berat} kg, total ${formatRupiah(termurah.total)} sudah termasuk biaya penanganan ${formatRupiah(termurah.biayaAdmin)}. Tarif dapat berubah, hubungi admin untuk konfirmasi sebelum pengiriman.`,
    },
    {
      pertanyaan: `Berapa lama cargo udara Jakarta ke ${kota} sampai?`,
      jawaban: `Estimasi pengiriman layanan reguler Jakarta ke ${kota} adalah ${pengaturan.estimasiWaktu}. Waktu pastinya mengikuti jadwal penerbangan dan proses di bandara.`,
    },
    {
      pertanyaan: `Berapa minimal berat kirim cargo udara ke ${kota}?`,
      jawaban: `Minimal ${pengaturan.beratMinimum} kg per pengiriman. Berat yang dihitung adalah yang lebih besar antara berat aktual dan berat volume (panjang x lebar x tinggi dalam cm dibagi ${PEMBAGI_VOLUME}).`,
    },
  ];
}

export default function RuteCargoPage({ destination }) {
  const { kota, code, provinsi, wilayah, bandara, path } = destination;
  const { databaseTarif, pengaturan } = useTarifData();
  const meta = useMemo(() => getDestinationMeta(destination, { databaseTarif, pengaturan }), [destination, databaseTarif, pengaturan]);
  useDocumentMeta(meta);

  const tarif = tarifTermurahTujuan(databaseTarif, code);
  const url = `${SITE.url}${path}`;
  const namaBandara = bandara ? `Bandara ${bandara}, ${code}` : `Bandara ${code}`;

  const breadcrumb = (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
        <li className="flex items-center gap-1">
          <Link to={ROUTES.home} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Beranda
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
        </li>
        <li className="flex items-center gap-1">
          <Link to={ROUTES.cekOngkir} className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            Cek Ongkir
          </Link>
          <ChevronRight className="w-3 h-3 shrink-0" aria-hidden="true" />
        </li>
        <li aria-current="page" className="font-semibold text-slate-700 dark:text-slate-300">
          {`Jakarta ke ${kota}`}
        </li>
      </ol>
    </nav>
  );

  // Tarif untuk tujuan ini hilang dari data (mis. sheet diubah): tampilkan jalur kontak, bukan angka kosong.
  if (!tarif) {
    return (
      <main className="bg-slate-50 dark:bg-slate-950 pt-6 pb-16 px-4 sm:px-6 transition-colors">
        <div className="max-w-xl lg:max-w-2xl mx-auto space-y-6">
          {breadcrumb}
          <div className={CARD}>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">{`Cargo Udara Jakarta ke ${kota}`}</h1>
            <p className={BODY}>Tarif untuk tujuan ini sedang diperbarui. Hubungi admin untuk mengetahui ongkir terbaru.</p>
            <a href={whatsappLink(`Halo Admin, saya ingin tanya tarif cargo udara Jakarta ke ${kota} (${code}).`)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all">
              Tanya Tarif via WhatsApp
            </a>
          </div>
        </div>
      </main>
    );
  }

  const rate = tarif.rateReguler;
  const beratTabel = [...new Set(CONTOH_BERAT.map((berat) => hitungBiaya(rate, berat, pengaturan).berat))];
  const beratVolume = (CONTOH_DUS.panjang * CONTOH_DUS.lebar * CONTOH_DUS.tinggi) / PEMBAGI_VOLUME;
  const contohDus = hitungBiaya(rate, Math.max(beratVolume, CONTOH_DUS.beratAktual), pengaturan);
  const faq = buatFaq({ kota, tarif, pengaturan });
  const terkait = relatedDestinations(code);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: `${SITE.url}/` },
          { "@type": "ListItem", position: 2, name: "Cek Ongkir", item: `${SITE.url}${ROUTES.cekOngkir}` },
          { "@type": "ListItem", position: 3, name: `Jakarta ke ${kota}`, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#layanan`,
        name: `Cargo Udara Jakarta ke ${kota}`,
        serviceType: "Cargo udara",
        url,
        provider: { "@id": `${SITE.url}/#business` },
        areaServed: { "@type": "City", name: kota },
        offers: {
          "@type": "Offer",
          priceCurrency: "IDR",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: rate,
            priceCurrency: "IDR",
            referenceQuantity: { "@type": "QuantitativeValue", value: 1, unitCode: "KGM" },
          },
        },
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

  return (
    <main className="bg-slate-50 dark:bg-slate-950 pt-6 pb-16 px-4 sm:px-6 transition-colors">
      <JsonLd data={jsonLd} />
      <div className="max-w-xl lg:max-w-2xl mx-auto space-y-6">
        {breadcrumb}

        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-600/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 mb-1">
            <Plane className="w-6 h-6" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Cargo Udara Jakarta ke <span className="text-blue-600 dark:text-blue-400">{kota}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            {`Ongkir cargo udara dari Bandara Soekarno-Hatta (CGK), Jakarta ke ${kota} (${namaBandara}), ${provinsi}: ${formatRupiah(rate)} per kg via ${tarif.maskapai}. Minimal ${pengaturan.beratMinimum} kg, estimasi ${pengaturan.estimasiWaktu}.`}
          </p>
        </div>

        <section className={CARD}>
          <h2 className={H2}>{`Tarif Cargo Udara Jakarta ke ${kota} per Berat`}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-xs sm:text-sm text-left">
              <caption className="sr-only">{`Contoh total ongkir cargo udara Jakarta ke ${kota} untuk beberapa berat barang`}</caption>
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400">
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Berat
                  </th>
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Tarif dasar
                  </th>
                  <th scope="col" className="py-2 pr-3 font-semibold">
                    Biaya penanganan
                  </th>
                  <th scope="col" className="py-2 font-semibold text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="text-slate-700 dark:text-slate-300">
                {beratTabel.map((berat) => {
                  const biaya = hitungBiaya(rate, berat, pengaturan);
                  return (
                    <tr key={berat} className="border-b border-slate-100 dark:border-slate-800">
                      <th scope="row" className="py-2.5 pr-3 font-semibold">
                        {`${berat} kg`}
                      </th>
                      <td className="py-2.5 pr-3">{formatRupiah(biaya.subtotal)}</td>
                      <td className="py-2.5 pr-3">{formatRupiah(biaya.biayaAdmin)}</td>
                      <td className="py-2.5 text-right font-bold text-blue-700 dark:text-blue-400">{formatRupiah(biaya.total)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
            {`Tarif dasar ${formatRupiah(rate)} per kg, minimal ${pengaturan.beratMinimum} kg. Tarif dapat berubah sewaktu-waktu; hubungi admin untuk konfirmasi.`}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            <a
              href={whatsappLink(`Halo Admin, saya ingin kirim cargo udara Jakarta ke ${kota} (${code}). Mohon info tarif dan prosesnya.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center cursor-pointer"
            >
              Pesan via WhatsApp
            </a>
            <Link to={ROUTES.cekOngkir} className="px-4 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5">
              Hitung dengan berat Anda
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </section>

        <section className={CARD}>
          <h2 className={H2}>{`Cara Menghitung Ongkir ke ${kota}`}</h2>
          <p className={BODY}>
            {`Ongkir = berat yang ditagihkan x ${formatRupiah(rate)} + biaya penanganan ${formatRupiah(pengaturan.biayaAdmin)}. Berat yang ditagihkan adalah yang lebih besar antara berat aktual dan berat volume, yaitu panjang x lebar x tinggi (cm) dibagi ${PEMBAGI_VOLUME}.`}
          </p>
          <p className={BODY}>
            {`Contoh: kardus ${CONTOH_DUS.panjang} x ${CONTOH_DUS.lebar} x ${CONTOH_DUS.tinggi} cm dengan berat aktual ${CONTOH_DUS.beratAktual} kg memiliki berat volume ${beratVolume} kg, sehingga ditagihkan ${contohDus.berat} kg. Total ke ${kota}: ${contohDus.berat} x ${formatRupiah(rate)} + ${formatRupiah(contohDus.biayaAdmin)} = ${formatRupiah(contohDus.total)}.`}
          </p>
          <p className={BODY}>
            {`Pengiriman ke ${kota}, ${provinsi}, diproses dari hub Bandara Soekarno-Hatta (CGK) dengan rute udara menuju ${namaBandara}.`}
          </p>
        </section>

        <section className={CARD}>
          <h2 className={H2}>{`Pertanyaan tentang Cargo Udara ke ${kota}`}</h2>
          {faq.map(({ pertanyaan, jawaban }) => (
            <div key={pertanyaan} className="space-y-1">
              <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">{pertanyaan}</h3>
              <p className={BODY}>{jawaban}</p>
            </div>
          ))}
        </section>

        <section className={CARD}>
          <h2 className={H2}>Tarif Cargo Udara ke Kota Lain</h2>
          <p className={BODY}>{`Tujuan lain dari Jakarta, dimulai dari wilayah ${wilayah}.`}</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {terkait.map((tujuan) => {
              const tarifTujuan = tarifTermurahTujuan(databaseTarif, tujuan.code);
              return (
                <li key={tujuan.code}>
                  <Link to={tujuan.path} className="flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500 text-xs sm:text-sm transition-colors">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{`Jakarta ke ${tujuan.kota}`}</span>
                    {tarifTujuan && <span className="text-blue-700 dark:text-blue-400 font-bold shrink-0">{formatRupiah(tarifTujuan.rateReguler)}/kg</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
