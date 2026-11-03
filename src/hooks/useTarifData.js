import { useEffect, useState } from "react";
import Papa from "papaparse";
import { databaseTarif as tarifBawaan, pengaturanBawaan } from "../data/tarifData";
import { validasiBarisTarif, validasiPengaturan } from "../utils/tarifSheet";
import { TARIF_CSV_URL, PENGATURAN_CSV_URL } from "../config/tarifSource";

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

// Saat build, scripts/inject-meta.mjs mengambil Sheet lalu menaruh hasilnya di window.__TARIF_DATA__ pada HTML
// (dan di globalThis saat prerender). Memakainya sebagai data awal membuat HTML hasil prerender, hasil hidrasi,
// dan tampilan pertama pengunjung sama-sama memuat tarif Sheet, tanpa menunggu unduhan.
function stateAwal() {
  const dariBuild = globalThis.__TARIF_DATA__;
  if (dariBuild) return { databaseTarif: dariBuild.databaseTarif, pengaturan: dariBuild.pengaturan, loading: false, isFallback: false };
  return { databaseTarif: tarifBawaan, pengaturan: pengaturanBawaan, loading: true, isFallback: false };
}

/**
 * Menyediakan data tarif & pengaturan. Data awal berasal dari Sheet saat build (kalau ada), lalu selalu
 * diperbarui dari Google Sheets di browser supaya perubahan tarif terbaru langsung terlihat.
 * Kalau pengambilan gagal (jaringan bermasalah, link belum di-publish, sheet kosong, atau hasilnya tidak
 * masuk akal), data yang sudah ada tetap dipakai; kalau belum ada sama sekali, dipakai data bawaan
 * di src/data/tarifData.js supaya halaman tetap bisa dipakai.
 */
export default function useTarifData() {
  const [state, setState] = useState(stateAwal);

  useEffect(() => {
    let batal = false;

    async function muatData() {
      try {
        const [tarifRows, pengaturanRows] = await Promise.all([parseCsv(TARIF_CSV_URL), parseCsv(PENGATURAN_CSV_URL)]);

        const tarifValid = validasiBarisTarif(tarifRows);
        const pengaturanValid = validasiPengaturan(pengaturanRows);

        if (batal) return;

        if (tarifValid.length === 0) {
          setState((sebelumnya) => (sebelumnya.loading ? { databaseTarif: tarifBawaan, pengaturan: pengaturanValid, loading: false, isFallback: true } : sebelumnya));
          return;
        }

        setState({ databaseTarif: tarifValid, pengaturan: pengaturanValid, loading: false, isFallback: false });
      } catch (err) {
        if (batal) return;
        console.error("Gagal memuat data tarif dari Google Sheets:", err);
        setState((sebelumnya) => (sebelumnya.loading ? { databaseTarif: tarifBawaan, pengaturan: pengaturanBawaan, loading: false, isFallback: true } : sebelumnya));
      }
    }

    muatData();
    return () => {
      batal = true;
    };
  }, []);

  return state;
}
