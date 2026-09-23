import { ROUTES } from "./routes.js";
import { SITE } from "./site.js";

const OG_IMAGE = `${SITE.url}/Ownsalelogo.png`;
const DEFAULT_ROBOTS = "index, follow, max-image-preview:large";

function buildMeta({ path, title, description, ogTitle, ogDescription }) {
  return {
    title,
    description,
    robots: DEFAULT_ROBOTS,
    canonical: `${SITE.url}${path}`,
    ogTitle: ogTitle ?? title,
    ogDescription: ogDescription ?? description,
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

export const PAGE_META_BY_PATH = {
  [ROUTES.home]: HOME_META,
  [ROUTES.cekOngkir]: CEK_ONGKIR_META,
};
