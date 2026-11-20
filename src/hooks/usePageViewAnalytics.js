import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { kirimPageView } from "../lib/analytics";

// Mengirim page_view setiap pindah halaman (situs ini SPA, jadi browser tidak memuat ulang halaman).
// Dipanggil di App, sehingga efeknya berjalan setelah efek halaman anak yang memperbarui document.title: judul yang terkirim sudah benar.
// Perpindahan #hash di Beranda (mis. /#layanan) tidak dihitung sebagai halaman baru.
export default function usePageViewAnalytics() {
  const { pathname } = useLocation();
  useEffect(() => {
    kirimPageView();
  }, [pathname]);
}
