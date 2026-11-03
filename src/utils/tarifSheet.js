// Validasi baris CSV dari Google Sheets. Dipakai bersama oleh hook di browser (useTarifData)
// dan oleh skrip build (scripts/fetch-tarif.mjs), jadi aturan "baris mana yang valid" selalu sama.
// Tanpa dependensi React/DOM supaya bisa diimpor langsung oleh Node.
import { pengaturanBawaan } from "../data/tarifData.js";

// Mengubah teks sel Sheet menjadi angka. Selain angka polos ("24760"), mengenali format Indonesia ("24.760",
// "Rp 24.760", "24.760,5") dan format Inggris ("24,760"). Tanpa ini, "24.760" terbaca 24,76 (titik dianggap desimal).
function parseAngka(teks) {
  const bersih = String(teks ?? "")
    .replace(/rp/i, "")
    .replace(/\s/g, "");
  if (/^\d{1,3}(\.\d{3})+(,\d+)?$/.test(bersih)) return Number(bersih.replace(/\./g, "").replace(",", "."));
  if (/^\d{1,3}(,\d{3})+(\.\d+)?$/.test(bersih)) return Number(bersih.replace(/,/g, ""));
  return Number(bersih.replace(/[^0-9.-]/g, ""));
}

// Satu baris tarif dianggap valid kalau kode tujuan diisi dan tarifnya
// berupa angka positif. Baris yang tidak valid (misalnya baris kosong
// atau salah ketik) dibuang, bukan membuat seluruh data gagal dimuat.
export function validasiBarisTarif(rows) {
  const hasil = [];
  for (const row of rows) {
    const dest = (row.dest || "").trim().toUpperCase();
    const namaDest = (row.namaDest || "").trim();
    const maskapai = (row.maskapai || "").trim();
    const rateReguler = parseAngka(row.rateReguler);

    if (!dest || !namaDest || !Number.isFinite(rateReguler) || rateReguler <= 0) continue;

    hasil.push({ dest, namaDest, maskapai, rateReguler });
  }
  return hasil;
}

export function validasiPengaturan(rows) {
  const map = {};
  for (const row of rows) {
    const key = (row.key || "").trim();
    const value = (row.value || "").trim();
    if (key) map[key] = value;
  }

  const biayaAdmin = parseAngka(map.biayaAdmin);
  const beratMinimum = parseAngka(map.beratMinimum);
  const estimasiWaktu = map.estimasiWaktu;

  return {
    biayaAdmin: Number.isFinite(biayaAdmin) && biayaAdmin >= 0 ? biayaAdmin : pengaturanBawaan.biayaAdmin,
    beratMinimum: Number.isFinite(beratMinimum) && beratMinimum > 0 ? beratMinimum : pengaturanBawaan.beratMinimum,
    estimasiWaktu: estimasiWaktu || pengaturanBawaan.estimasiWaktu,
  };
}
