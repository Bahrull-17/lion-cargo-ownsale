import { SITE } from "../config/site";

// Google Analytics 4 tanpa dependensi. Aktif hanya di build produksi dan hanya jika Measurement ID diisi di config/site.js,
// jadi `npm run dev` tidak mengotori data dan situs tanpa ID tidak memuat skrip apa pun dari Google.
const ID = SITE.gaMeasurementId;
const AKTIF = import.meta.env.PROD && /^G-[A-Z0-9]+$/i.test(ID ?? "");

// Jenis klik yang dihitung. Menambah jenis baru cukup menambah satu baris di sini; berlaku untuk semua tautan di situs,
// termasuk tombol yang ditambahkan kelak, tanpa mengubah komponennya.
const JENIS_KLIK = [
  { nama: "whatsapp_click", cocok: (href) => /^https?:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)\//i.test(href) },
  { nama: "phone_click", cocok: (href) => href.startsWith("tel:") },
  { nama: "email_click", cocok: (href) => href.startsWith("mailto:") },
  { nama: "maps_click", cocok: (href) => /google\.[a-z.]+\/maps|maps\.app\.goo\.gl|goo\.gl\/maps/i.test(href) },
];

let sudahMulai = false;

export function kirimEvent(nama, parameter = {}) {
  if (!AKTIF || typeof window.gtag !== "function") return;
  window.gtag("event", nama, parameter);
}

export function kirimPageView() {
  kirimEvent("page_view", { page_path: window.location.pathname, page_location: window.location.href, page_title: document.title });
}

// Posisi tombol di halaman, ditebak dari struktur HTML. Bisa ditimpa dengan atribut data-lokasi="..." pada elemen pembungkus.
function tentukanLokasi(tautan) {
  const eksplisit = tautan.closest("[data-lokasi]");
  if (eksplisit) return eksplisit.dataset.lokasi;
  if (tautan.closest("header")) return "navbar";
  if (tautan.closest(".fixed")) return "tombol-melayang";
  if (tautan.closest("footer")) return "footer";
  const bagian = tautan.closest("section");
  if (bagian) return bagian.id || (bagian.getAttribute("aria-labelledby") ?? "bagian-halaman");
  return "konten";
}

function tanganiKlik(event) {
  if (event.type === "auxclick" && event.button !== 1) return; // klik tengah (tab baru) dihitung, klik kanan tidak
  const tautan = event.target instanceof Element ? event.target.closest("a[href]") : null;
  if (!tautan) return;
  const href = tautan.getAttribute("href") ?? "";
  const jenis = JENIS_KLIK.find((item) => item.cocok(href));
  if (!jenis) return;
  kirimEvent(jenis.nama, {
    lokasi: tentukanLokasi(tautan),
    teks_tombol: (tautan.textContent || tautan.getAttribute("aria-label") || "").replace(/\s+/g, " ").trim().slice(0, 60),
    halaman: window.location.pathname,
    transport_type: "beacon", // tetap terkirim walau halaman langsung berpindah
  });
}

// Memuat gtag.js setelah halaman selesai dimuat dan browser menganggur, supaya tidak menahan tampilan pertama.
function muatSkripGoogle() {
  const muat = () => {
    const skrip = document.createElement("script");
    skrip.async = true;
    skrip.src = `https://www.googletagmanager.com/gtag/js?id=${ID}`;
    document.head.appendChild(skrip);
  };
  const jadwalkan = () => ("requestIdleCallback" in window ? window.requestIdleCallback(muat, { timeout: 3000 }) : setTimeout(muat, 1500));
  if (document.readyState === "complete") jadwalkan();
  else window.addEventListener("load", jadwalkan, { once: true });
}

export function mulaiAnalytics() {
  if (!AKTIF || sudahMulai) return;
  sudahMulai = true;

  window.dataLayer = window.dataLayer || [];
  // gtag.js mewajibkan objek `arguments` (bukan array), jadi fungsi ini tidak boleh diganti dengan rest parameter.
  // oxlint-disable-next-line prefer-rest-params
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", ID, { send_page_view: false }); // page_view dikirim manual per perpindahan halaman (usePageViewAnalytics)

  document.addEventListener("click", tanganiKlik, true);
  document.addEventListener("auxclick", tanganiKlik, true);
  muatSkripGoogle();
}
