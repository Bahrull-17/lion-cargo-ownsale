import { ROUTES } from "./routes.js";
import { SITE } from "./site.js";
import { formatRupiah, tarifTermurahTujuan } from "../utils/tarif.js";

const OG_IMAGE = `${SITE.url}/Ownsalelogo.png`;
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large";

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
  title: "Lion Cargo Ownsale | Jasa Cargo Udara Bandara Soekarno-Hatta",
  description: "Agen resmi Lion Cargo di Bandara Soekarno-Hatta. Jasa cargo udara ke seluruh Indonesia, cek tarif per kg dan pesan via WhatsApp 24 jam.",
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

export const LION_CARGO_BANDARA_META = buildMeta({
  path: ROUTES.lionCargoBandara,
  title: "Agen Resmi Lion Cargo Bandara Soekarno-Hatta | Tarif",
  description: "Agen resmi Lion Cargo di kawasan kargo Bandara Soekarno-Hatta: lokasi, jam operasional 24 jam, tarif per kg, dan cara memesan cargo udara.",
  ogTitle: "Agen Resmi Lion Cargo Bandara Soekarno-Hatta | Lion Cargo Ownsale",
  ogDescription: "Lokasi, jam operasional, tarif per kg, dan cara memesan cargo udara dari kawasan kargo Bandara Soekarno-Hatta.",
});

export const TARIF_HUB_META = buildMeta({
  path: ROUTES.tarif,
  title: "Tarif Cargo Udara Jakarta ke Seluruh Indonesia | Lion Cargo",
  description: "Daftar tarif cargo udara per kg dari Bandara Soekarno-Hatta (CGK) ke kota-kota di Indonesia: tarif, minimal berat, estimasi, dan cara hitung ongkir.",
  ogTitle: "Tarif Cargo Udara Jakarta ke Seluruh Indonesia | Lion Cargo Ownsale",
  ogDescription: "Daftar tarif cargo udara per kg dari Bandara Soekarno-Hatta ke seluruh Indonesia. Cek tarif, estimasi, dan pesan via WhatsApp.",
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
  [ROUTES.tarif]: TARIF_HUB_META,
  [ROUTES.lionCargoBandara]: LION_CARGO_BANDARA_META,
};
