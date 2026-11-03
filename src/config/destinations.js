// Kota tujuan yang punya halaman tarif sendiri (/cargo-udara-jakarta-<slug>).
// Urutan = urutan tampil di daftar; 8 pertama dipakai sebagai "rute populer" di footer.
// `code` harus ada di src/data/tarifData.js; build akan gagal (pageMeta.js) kalau tidak ditemukan.
// Menambah kota baru cukup menambah satu baris di sini.
const DESTINATIONS = [
  { code: "SUB", slug: "surabaya", kota: "Surabaya", provinsi: "Jawa Timur", wilayah: "Jawa", bandara: "Juanda" },
  { code: "UPG", slug: "makassar", kota: "Makassar", provinsi: "Sulawesi Selatan", wilayah: "Sulawesi", bandara: "Sultan Hasanuddin" },
  { code: "KNO", slug: "medan", kota: "Medan", provinsi: "Sumatera Utara", wilayah: "Sumatera", bandara: "Kualanamu" },
  { code: "DPS", slug: "bali", kota: "Bali (Denpasar)", provinsi: "Bali", wilayah: "Bali & Nusa Tenggara", bandara: "I Gusti Ngurah Rai" },
  { code: "BPN", slug: "balikpapan", kota: "Balikpapan", provinsi: "Kalimantan Timur", wilayah: "Kalimantan", bandara: "Sultan Aji Muhammad Sulaiman Sepinggan" },
  { code: "BDJ", slug: "banjarmasin", kota: "Banjarmasin", provinsi: "Kalimantan Selatan", wilayah: "Kalimantan", bandara: "Syamsudin Noor" },
  { code: "PLM", slug: "palembang", kota: "Palembang", provinsi: "Sumatera Selatan", wilayah: "Sumatera", bandara: "Sultan Mahmud Badaruddin II" },
  { code: "PKU", slug: "pekanbaru", kota: "Pekanbaru", provinsi: "Riau", wilayah: "Sumatera", bandara: "Sultan Syarif Kasim II" },
  { code: "PDG", slug: "padang", kota: "Padang", provinsi: "Sumatera Barat", wilayah: "Sumatera", bandara: "Minangkabau" },
  { code: "BTH", slug: "batam", kota: "Batam", provinsi: "Kepulauan Riau", wilayah: "Sumatera", bandara: "Hang Nadim" },
  { code: "MDC", slug: "manado", kota: "Manado", provinsi: "Sulawesi Utara", wilayah: "Sulawesi", bandara: "Sam Ratulangi" },
  { code: "PNK", slug: "pontianak", kota: "Pontianak", provinsi: "Kalimantan Barat", wilayah: "Kalimantan", bandara: "Supadio" },
  { code: "YIA", slug: "yogyakarta", kota: "Yogyakarta", provinsi: "DI Yogyakarta", wilayah: "Jawa", bandara: "Yogyakarta International" },
  { code: "SRG", slug: "semarang", kota: "Semarang", provinsi: "Jawa Tengah", wilayah: "Jawa", bandara: "Jenderal Ahmad Yani" },
  { code: "SOC", slug: "solo", kota: "Solo", provinsi: "Jawa Tengah", wilayah: "Jawa", bandara: "Adi Soemarmo" },
  { code: "MLG", slug: "malang", kota: "Malang", provinsi: "Jawa Timur", wilayah: "Jawa", bandara: "Abdul Rachman Saleh" },
  { code: "LOP", slug: "lombok", kota: "Lombok", provinsi: "Nusa Tenggara Barat", wilayah: "Bali & Nusa Tenggara", bandara: "Internasional Lombok" },
  { code: "KOE", slug: "kupang", kota: "Kupang", provinsi: "Nusa Tenggara Timur", wilayah: "Bali & Nusa Tenggara", bandara: "El Tari" },
  { code: "AAP", slug: "samarinda", kota: "Samarinda", provinsi: "Kalimantan Timur", wilayah: "Kalimantan", bandara: "APT Pranoto" },
  { code: "TKG", slug: "bandar-lampung", kota: "Bandar Lampung", provinsi: "Lampung", wilayah: "Sumatera", bandara: "Radin Inten II" },
  { code: "DJB", slug: "jambi", kota: "Jambi", provinsi: "Jambi", wilayah: "Sumatera", bandara: "Sultan Thaha" },
  { code: "BTJ", slug: "banda-aceh", kota: "Banda Aceh", provinsi: "Aceh", wilayah: "Sumatera", bandara: "Sultan Iskandar Muda" },
  { code: "DJJ", slug: "jayapura", kota: "Jayapura", provinsi: "Papua", wilayah: "Maluku & Papua", bandara: "Sentani" },
  { code: "AMQ", slug: "ambon", kota: "Ambon", provinsi: "Maluku", wilayah: "Maluku & Papua", bandara: "Pattimura" },
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
