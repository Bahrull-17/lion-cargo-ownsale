import { ROUTES, SECTION_IDS, sectionPath } from "./routes";

export const NAV_ITEMS = [
  { key: SECTION_IDS.hero, label: "Beranda", to: ROUTES.home },
  { key: SECTION_IDS.services, label: "Layanan", to: sectionPath(SECTION_IDS.services) },
  { key: SECTION_IDS.about, label: "Tentang Kami", to: sectionPath(SECTION_IDS.about) },
  { key: ROUTES.cekOngkir, label: "Cek Ongkir", to: ROUTES.cekOngkir },
  { key: SECTION_IDS.contact, label: "Kontak", to: sectionPath(SECTION_IDS.contact) },
];

export const FOOTER_LINKS = [
  { label: "Beranda", to: ROUTES.home },
  { label: "Layanan Kargo", to: sectionPath(SECTION_IDS.services) },
  { label: "Cek Ongkir", to: ROUTES.cekOngkir },
  { label: "Tentang Kami", to: sectionPath(SECTION_IDS.about) },
  { label: "Lokasi & Kontak", to: sectionPath(SECTION_IDS.contact) },
];

export const HOME_SECTIONS = [
  { id: SECTION_IDS.hero, menu: SECTION_IDS.hero },
  { id: SECTION_IDS.services, menu: SECTION_IDS.services },
  { id: SECTION_IDS.about, menu: SECTION_IDS.about },
  { id: SECTION_IDS.features, menu: SECTION_IDS.features },
  { id: SECTION_IDS.testimonials, menu: SECTION_IDS.testimonials },
  { id: SECTION_IDS.faq, menu: SECTION_IDS.faq },
  { id: SECTION_IDS.contact, menu: SECTION_IDS.contact },
];
