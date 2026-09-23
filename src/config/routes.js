export const ROUTES = {
  home: "/",
  cekOngkir: "/cek-ongkir",
};

export const SECTION_IDS = {
  hero: "beranda",
  services: "layanan",
  about: "tentang",
  features: "keunggulan",
  testimonials: "testimoni",
  faq: "faq",
  contact: "kontak",
};

export const sectionPath = (sectionId) => `${ROUTES.home}#${sectionId}`;
