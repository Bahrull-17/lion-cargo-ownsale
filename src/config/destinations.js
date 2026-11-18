// Kota tujuan yang punya halaman tarif sendiri (/cargo-udara-jakarta-<slug>).
// Urutan = urutan tampil di daftar; 8 pertama dipakai sebagai "rute populer" di footer.
// `code` harus ada di src/data/tarifData.js; build akan gagal (pageMeta.js) kalau tidak ditemukan.
// `koordinat` = [lintang, bujur] bandara tujuan, dipakai peta rute di halaman Lion Cargo Bandara Soekarno-Hatta.
// Menambah kota baru cukup menambah satu baris di sini.
const DESTINATIONS = [
  { code: "SUB", slug: "surabaya", kota: "Surabaya", provinsi: "Jawa Timur", wilayah: "Jawa", bandara: "Juanda", koordinat: [-7.38, 112.787] },
  { code: "UPG", slug: "makassar", kota: "Makassar", provinsi: "Sulawesi Selatan", wilayah: "Sulawesi", bandara: "Sultan Hasanuddin", koordinat: [-5.062, 119.554] },
  { code: "KNO", slug: "medan", kota: "Medan", provinsi: "Sumatera Utara", wilayah: "Sumatera", bandara: "Kualanamu", koordinat: [3.642, 98.885] },
  { code: "DPS", slug: "bali", kota: "Bali (Denpasar)", provinsi: "Bali", wilayah: "Bali & Nusa Tenggara", bandara: "I Gusti Ngurah Rai", koordinat: [-8.748, 115.167] },
  { code: "BPN", slug: "balikpapan", kota: "Balikpapan", provinsi: "Kalimantan Timur", wilayah: "Kalimantan", bandara: "Sultan Aji Muhammad Sulaiman Sepinggan", koordinat: [-1.268, 116.894] },
  { code: "BDJ", slug: "banjarmasin", kota: "Banjarmasin", provinsi: "Kalimantan Selatan", wilayah: "Kalimantan", bandara: "Syamsudin Noor", koordinat: [-3.442, 114.763] },
  { code: "PLM", slug: "palembang", kota: "Palembang", provinsi: "Sumatera Selatan", wilayah: "Sumatera", bandara: "Sultan Mahmud Badaruddin II", koordinat: [-2.898, 104.7] },
  { code: "PKU", slug: "pekanbaru", kota: "Pekanbaru", provinsi: "Riau", wilayah: "Sumatera", bandara: "Sultan Syarif Kasim II", koordinat: [0.461, 101.445] },
  { code: "PDG", slug: "padang", kota: "Padang", provinsi: "Sumatera Barat", wilayah: "Sumatera", bandara: "Minangkabau", koordinat: [-0.787, 100.281] },
  { code: "BTH", slug: "batam", kota: "Batam", provinsi: "Kepulauan Riau", wilayah: "Sumatera", bandara: "Hang Nadim", koordinat: [1.121, 104.119] },
  { code: "MDC", slug: "manado", kota: "Manado", provinsi: "Sulawesi Utara", wilayah: "Sulawesi", bandara: "Sam Ratulangi", koordinat: [1.549, 124.926] },
  { code: "PNK", slug: "pontianak", kota: "Pontianak", provinsi: "Kalimantan Barat", wilayah: "Kalimantan", bandara: "Supadio", koordinat: [-0.151, 109.404] },
  { code: "YIA", slug: "yogyakarta", kota: "Yogyakarta", provinsi: "DI Yogyakarta", wilayah: "Jawa", bandara: "Yogyakarta International", koordinat: [-7.9, 110.057] },
  { code: "SRG", slug: "semarang", kota: "Semarang", provinsi: "Jawa Tengah", wilayah: "Jawa", bandara: "Jenderal Ahmad Yani", koordinat: [-6.971, 110.374] },
  { code: "SOC", slug: "solo", kota: "Solo", provinsi: "Jawa Tengah", wilayah: "Jawa", bandara: "Adi Soemarmo", koordinat: [-7.516, 110.757] },
  { code: "MLG", slug: "malang", kota: "Malang", provinsi: "Jawa Timur", wilayah: "Jawa", bandara: "Abdul Rachman Saleh", koordinat: [-7.927, 112.714] },
  { code: "LOP", slug: "lombok", kota: "Lombok", provinsi: "Nusa Tenggara Barat", wilayah: "Bali & Nusa Tenggara", bandara: "Internasional Lombok", koordinat: [-8.757, 116.277] },
  { code: "KOE", slug: "kupang", kota: "Kupang", provinsi: "Nusa Tenggara Timur", wilayah: "Bali & Nusa Tenggara", bandara: "El Tari", koordinat: [-10.172, 123.671] },
  { code: "AAP", slug: "samarinda", kota: "Samarinda", provinsi: "Kalimantan Timur", wilayah: "Kalimantan", bandara: "APT Pranoto", koordinat: [-0.372, 117.254] },
  { code: "TKG", slug: "bandar-lampung", kota: "Bandar Lampung", provinsi: "Lampung", wilayah: "Sumatera", bandara: "Radin Inten II", koordinat: [-5.242, 105.179] },
  { code: "DJB", slug: "jambi", kota: "Jambi", provinsi: "Jambi", wilayah: "Sumatera", bandara: "Sultan Thaha", koordinat: [-1.638, 103.644] },
  { code: "BTJ", slug: "banda-aceh", kota: "Banda Aceh", provinsi: "Aceh", wilayah: "Sumatera", bandara: "Sultan Iskandar Muda", koordinat: [5.524, 95.42] },
  { code: "DJJ", slug: "jayapura", kota: "Jayapura", provinsi: "Papua", wilayah: "Maluku & Papua", bandara: "Sentani", koordinat: [-2.577, 140.516] },
  { code: "AMQ", slug: "ambon", kota: "Ambon", provinsi: "Maluku", wilayah: "Maluku & Papua", bandara: "Pattimura", koordinat: [-3.71, 128.089] },
];

const destinationPath = (slug) => `/cargo-udara-jakarta-${slug}`;

export const DESTINATION_PAGES = DESTINATIONS.map((destination) => ({ ...destination, path: destinationPath(destination.slug) }));

export const DESTINATION_PATHS = DESTINATION_PAGES.map((destination) => destination.path);

export const POPULAR_DESTINATIONS = DESTINATION_PAGES.slice(0, 8);

const DESTINATION_PATH_SET = new Set(DESTINATION_PATHS);

// Toleran terhadap garis miring di akhir ("/cargo-udara-jakarta-surabaya/").
export const isDestinationPath = (pathname) => DESTINATION_PATH_SET.has(pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname);

// Tujuan lain yang relevan: satu wilayah dulu, sisanya mengikuti urutan daftar.
export function relatedDestinations(code, limit = 6) {
  const current = DESTINATION_PAGES.find((destination) => destination.code === code);
  const others = DESTINATION_PAGES.filter((destination) => destination.code !== code);
  const sameRegion = others.filter((destination) => destination.wilayah === current?.wilayah);
  const rest = others.filter((destination) => destination.wilayah !== current?.wilayah);
  return [...sameRegion, ...rest].slice(0, limit);
}
