import { ROUTES } from "./routes.js";
import { SITE } from "./site.js";
import { formatRupiah, tarifTermurahTujuan } from "../utils/tarif.js";

const OG_IMAGE = `${SITE.url}/Ownsalelogo.png`;
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large";

// Tanggal terakhir teks Beranda berubah (dipakai sebagai <lastmod> Beranda di sitemap.xml yang dibuat saat build).
// Perbarui manual saat isi Beranda berubah. Halaman yang bergantung pada tarif memakai tanggal build.
export const LAST_MODIFIED = "2026-11-03";

function buildMeta({ path, title, description, ogTitle = title, ogDescription = description }) {
  return {
    title,
    description,
    robots: DEFAULT_ROBOTS,
    canonical: `${SITE.url}${path}`,
    ogTitle,
    ogDescription,
    ogUrl: `${SITE.url}${path}`,
    ogImage: OG_IMAGE,
  };
}

export const HOME_META = buildMeta({
  path: ROUTES.home,
  title: "Lion Cargo Ownsale | Jasa Cargo Udara Bandara Soekarno Hatta & Cek Ongkir",
  description: "Lion Cargo Ownsale melayani jasa cargo udara resmi dari Bandara Soekarno Hatta ke seluruh Indonesia. Cek ongkir cepat, pengiriman via pesawat, aman, dan terpercaya.",
  ogTitle: "Lion Cargo Ownsale | Jasa Cargo Udara Bandara Soekarno Hatta",
  ogDescription: "Jasa cargo udara dari Bandara Soekarno Hatta ke seluruh Indonesia. Cek ongkir cepat dan pengiriman aman.",
});

export const CEK_ONGKIR_META = buildMeta({
  path: ROUTES.cekOngkir,
  title: "Cek Ongkir Cargo Udara Soekarno Hatta | Lion Cargo Ownsale",
  description: "Hitung estimasi ongkos kirim cargo udara dari Bandara Soekarno Hatta ke berbagai kota se-Indonesia. Masukkan tujuan dan berat, tarif langsung tampil.",
  ogTitle: "Cek Ongkir Cargo Udara | Lion Cargo Ownsale",
  ogDescription: "Hitung estimasi ongkos kirim cargo udara dari Bandara Soekarno Hatta ke seluruh Indonesia.",
});

// Metadata halaman tarif per kota, dibuat dari data tarif yang diberikan (Sheet saat build, Sheet/bawaan di browser)
// sehingga deskripsi selalu sama dengan isi halaman. Mengembalikan null kalau kota tujuan tidak ada di data.
export function getDestinationMeta({ path, code, kota }, { databaseTarif, pengaturan }) {
  const tarif = tarifTermurahTujuan(databaseTarif, code);
  if (!tarif) return null;

  return buildMeta({
    path,
    title: `Cargo Udara Jakarta ke ${kota}: Ongkir & Tarif per Kg`,
    description: `Ongkir cargo udara Jakarta (CGK) ke ${kota}: ${formatRupiah(tarif.rateReguler)}/kg via ${tarif.maskapai}, min. ${pengaturan.beratMinimum} kg, estimasi ${pengaturan.estimasiWaktu}. Hitung total dan pesan via WhatsApp.`,
  });
}

export const PAGE_META_BY_PATH = {
  [ROUTES.home]: HOME_META,
  [ROUTES.cekOngkir]: CEK_ONGKIR_META,
};
