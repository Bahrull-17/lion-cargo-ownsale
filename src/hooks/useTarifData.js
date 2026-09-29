import { useEffect, useState } from "react";
import Papa from "papaparse";
import { databaseTarif as tarifBawaan } from "../data/tarifData";
import { TARIF_CSV_URL, PENGATURAN_CSV_URL } from "../config/tarifSource";

// Nilai pengaturan bawaan, dipakai kalau sheet Pengaturan gagal diambil,
// kosong, atau isinya tidak valid.
const PENGATURAN_BAWAAN = {
  biayaAdmin: 30000,
  beratMinimum: 10,
  estimasiWaktu: "2-3 Hari",
};

function parseCsv(url) {
  return new Promise((resolve, reject) => {
    Papa.parse(url, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: (result) => resolve(result.data),
      error: (err) => reject(err),
    });
  });
}

// Satu baris tarif dianggap valid kalau kode tujuan diisi dan tarifnya
// berupa angka positif. Baris yang tidak valid (misalnya baris kosong
// atau salah ketik) dibuang, bukan membuat seluruh data gagal dimuat.
function validasiBarisTarif(rows) {
  const hasil = [];
  for (const row of rows) {
    const dest = (row.dest || "").trim().toUpperCase();
    const namaDest = (row.namaDest || "").trim();
    const maskapai = (row.maskapai || "").trim();
    const rateReguler = Number(String(row.rateReguler || "").replace(/[^0-9.-]/g, ""));

    if (!dest || !namaDest || !Number.isFinite(rateReguler) || rateReguler <= 0) continue;

    hasil.push({ dest, namaDest, maskapai, rateReguler });
  }
  return hasil;
}

function validasiPengaturan(rows) {
  const map = {};
  for (const row of rows) {
    const key = (row.key || "").trim();
    const value = (row.value || "").trim();
    if (key) map[key] = value;
  }

  const biayaAdmin = Number(String(map.biayaAdmin || "").replace(/[^0-9.-]/g, ""));
  const beratMinimum = Number(String(map.beratMinimum || "").replace(/[^0-9.-]/g, ""));
  const estimasiWaktu = map.estimasiWaktu;

  return {
    biayaAdmin: Number.isFinite(biayaAdmin) && biayaAdmin >= 0 ? biayaAdmin : PENGATURAN_BAWAAN.biayaAdmin,
    beratMinimum: Number.isFinite(beratMinimum) && beratMinimum > 0 ? beratMinimum : PENGATURAN_BAWAAN.beratMinimum,
    estimasiWaktu: estimasiWaktu || PENGATURAN_BAWAAN.estimasiWaktu,
  };
}

/**
 * Mengambil data tarif & pengaturan dari Google Sheets.
 * Kalau gagal (jaringan bermasalah, link belum di-publish, sheet kosong,
 * atau hasilnya tidak masuk akal), otomatis memakai data bawaan di
 * src/data/tarifData.js supaya halaman tetap bisa dipakai.
 */
export default function useTarifData() {
  const [state, setState] = useState({
    databaseTarif: tarifBawaan,
    pengaturan: PENGATURAN_BAWAAN,
    loading: true,
    isFallback: false,
  });

  useEffect(() => {
    let batal = false;

    async function muatData() {
      try {
        const [tarifRows, pengaturanRows] = await Promise.all([parseCsv(TARIF_CSV_URL), parseCsv(PENGATURAN_CSV_URL)]);

        const tarifValid = validasiBarisTarif(tarifRows);
        const pengaturanValid = validasiPengaturan(pengaturanRows);

        if (batal) return;

        if (tarifValid.length === 0) {
          setState({ databaseTarif: tarifBawaan, pengaturan: pengaturanValid, loading: false, isFallback: true });
          return;
        }

        setState({ databaseTarif: tarifValid, pengaturan: pengaturanValid, loading: false, isFallback: false });
      } catch (err) {
        if (batal) return;
        console.error("Gagal memuat data tarif dari Google Sheets, memakai data bawaan:", err);
        setState({ databaseTarif: tarifBawaan, pengaturan: PENGATURAN_BAWAAN, loading: false, isFallback: true });
      }
    }

    muatData();
    return () => {
      batal = true;
    };
  }, []);

  return state;
}
