export const ROUTES = {
  home: "/",
  cekOngkir: "/cek-ongkir",
  tarif: "/tarif-cargo-udara",
  lionCargoBandara: "/lion-cargo-bandara-soekarno-hatta",
};

export const SECTION_IDS = {
  hero: "beranda",
  services: "layanan",
  routes: "rute-tarif",
  about: "tentang",
  features: "keunggulan",
  testimonials: "testimoni",
  faq: "faq",
  contact: "kontak",
};

export const sectionPath = (sectionId) => `${ROUTES.home}#${sectionId}`;
