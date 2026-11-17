// Perhitungan & pencarian tarif yang dipakai bersama oleh kalkulator (CekOngkirPage),
// halaman tarif per kota (RuteCargoPage), daftar tujuan, dan pembuat metadata saat build.
// File ini sengaja tanpa dependensi React/DOM supaya bisa diimpor langsung oleh Node (scripts/inject-meta.mjs).

// Pembagi rumus berat volume: P x L x T (cm) / 5000 = kg.
export const PEMBAGI_VOLUME = 5000;

const NAMA_BULAN = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

// "2026-11-17" -> "17 November 2026". Ditulis manual (bukan toLocaleDateString) agar hasilnya sama di Node dan di semua browser,
// jadi HTML prerender dan hasil hidrasi tidak berbeda.
export function formatTanggal(iso) {
  const [tahun, bulan, hari] = iso.split("-").map(Number);
  return `${hari} ${NAMA_BULAN[bulan - 1]} ${tahun}`;
}

export const formatRupiah = (angka) => `Rp ${Number(angka).toLocaleString("id-ID")}`;

// Berat yang ditagihkan: berat yang diisi (atau minimum bila kosong/tidak valid), tidak pernah di bawah minimum.
export const beratDihitung = (berat, pengaturan) => Math.max(Number(berat) || pengaturan.beratMinimum, pengaturan.beratMinimum);

export function hitungBiaya(rateReguler, berat, pengaturan) {
  const kg = beratDihitung(berat, pengaturan);
  const subtotal = rateReguler * kg;
  return { berat: kg, subtotal, biayaAdmin: pengaturan.biayaAdmin, total: subtotal + pengaturan.biayaAdmin };
}

export const tarifUntukTujuan = (data, kodeTujuan) => data.filter((item) => item.dest === kodeTujuan);

// Baris dengan tarif per kg terendah dari sekumpulan baris (undefined bila kosong).
const tarifTermurah = (rows) => rows.reduce((termurah, row) => (!termurah || row.rateReguler < termurah.rateReguler ? row : termurah), undefined);

export const tarifTermurahTujuan = (data, kodeTujuan) => tarifTermurah(tarifUntukTujuan(data, kodeTujuan));
