import { useMemo } from "react";
import useTarifData from "./useTarifData";
import { DESTINATION_PAGES } from "../config/destinations";
import { hitungBiaya, tarifTermurahTujuan } from "../utils/tarif";

const HALAMAN_PER_KODE = new Map(DESTINATION_PAGES.map((destination) => [destination.code, destination]));

// Nama di Sheet berupa huruf kapital + kode ("GALELA-HALMAHERA UTARA (GLX)"): dibuang kodenya lalu dirapikan jadi "Galela-Halmahera Utara".
function rapikanNama(namaDest) {
  return namaDest
    .replace(/\s*\([^)]*\)/g, "")
    .trim()
    .toLowerCase()
    .replace(/(^|[\s-])(\p{L})/gu, (_, pemisah, huruf) => pemisah + huruf.toUpperCase());
}

// Ringkasan tarif untuk halaman cargo (tarif termurah per tujuan, dipisah antara kota yang punya halaman rincian dan sisanya).
export default function useRingkasanTarif() {
  const { databaseTarif, pengaturan, diperbaruiPada } = useTarifData();

  const ringkasan = useMemo(() => {
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
    const berHalaman = DESTINATION_PAGES.map((destination) => semua.find((tujuan) => tujuan.code === destination.code)).filter(Boolean);
    const lainnya = semua.filter((tujuan) => !tujuan.path).sort((a, b) => a.nama.localeCompare(b.nama, "id"));
    const urutTarif = [...semua].sort((a, b) => a.rate - b.rate);
    const maskapai = [...new Set(databaseTarif.map((baris) => baris.maskapai).filter(Boolean))].join(" dan ");
    return { berHalaman, lainnya, termurah: urutTarif[0], termahal: urutTarif[urutTarif.length - 1], jumlahTujuan: semua.length, maskapai };
  }, [databaseTarif, pengaturan]);

  return { pengaturan, diperbaruiPada, ...ringkasan };
}
