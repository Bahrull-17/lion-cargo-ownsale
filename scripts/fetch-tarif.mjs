import Papa from "papaparse";
import { TARIF_CSV_URL, PENGATURAN_CSV_URL } from "../src/config/tarifSource.js";
import { validasiBarisTarif, validasiPengaturan } from "../src/utils/tarifSheet.js";

const TIMEOUT_MS = 20000;
const PERCOBAAN = 2;

async function ambilBaris(url) {
  const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT_MS) });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const text = await response.text();
  return Papa.parse(text, { header: true, skipEmptyLines: true }).data;
}

async function ambilDenganUlang(url) {
  let kesalahan;
  for (let percobaan = 1; percobaan <= PERCOBAAN; percobaan++) {
    try {
      return await ambilBaris(url);
    } catch (err) {
      kesalahan = err;
    }
  }
  throw kesalahan;
}

/**
 * Mengambil tarif & pengaturan dari Google Sheets saat build, dengan aturan validasi yang sama seperti di browser.
 * Mengembalikan { databaseTarif, pengaturan }, atau null kalau Sheet tidak bisa diambil / tidak berisi tarif valid
 * (pemanggil lalu memakai data bawaan di src/data/tarifData.js dan menampilkan peringatan).
 */
export async function ambilDataSheet() {
  try {
    const [tarifRows, pengaturanRows] = await Promise.all([ambilDenganUlang(TARIF_CSV_URL), ambilDenganUlang(PENGATURAN_CSV_URL)]);
    const databaseTarif = validasiBarisTarif(tarifRows);
    if (databaseTarif.length === 0) {
      console.warn("⚠ Sheet tarif terbaca tetapi tidak berisi baris valid.");
      return null;
    }
    return { databaseTarif, pengaturan: validasiPengaturan(pengaturanRows) };
  } catch (err) {
    console.warn(`⚠ Gagal mengambil Sheet tarif: ${err.message}`);
    return null;
  }
}
