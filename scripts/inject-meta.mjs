import { readFile, writeFile, copyFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROUTES } from "../src/config/routes.js";
import { PAGE_META_BY_PATH, getDestinationMeta } from "../src/config/pageMeta.js";
import { DESTINATION_PAGES, DESTINATION_PATHS } from "../src/config/destinations.js";
import { databaseTarif as tarifBawaan, pengaturanBawaan } from "../src/data/tarifData.js";
import { ambilDataSheet } from "./fetch-tarif.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");
const SSR_ENTRY = path.join(__dirname, "..", "dist-server", "entry-server.js");

// Semua rute yang dibuatkan file HTML sendiri berisi konten asli (bukan <div id="root"></div> kosong).
// Daftar ini juga menjadi isi sitemap.xml. Kota tujuan baru cukup ditambahkan di src/config/destinations.js;
// halaman statis baru ditambahkan di sini dan di src/config/routes.js + pageMeta.js.
const ROUTES_TO_PRERENDER = [ROUTES.home, ROUTES.cekOngkir, ROUTES.tarif, ROUTES.lionCargoBandara, ...DESTINATION_PATHS];

const ROOT_PLACEHOLDER = '<div id="root"></div>';

// Catatan tanggal perubahan isi tiap halaman. File ini DI-COMMIT ke Git (bukan hasil build) supaya server hosting,
// yang membangun situs dari nol, tahu halaman mana yang sebenarnya tidak berubah sejak build sebelumnya.
const MANIFEST_PATH = path.join(__dirname, "..", "seo", "lastmod.json");
const TANGGAL_CONTOH = "2000-01-01"; // dipakai saat menghitung sidik jari agar label "tarif diperbarui" tidak ikut dianggap perubahan isi

// Tanggal hari ini menurut WIB (bukan UTC), supaya build dini hari tidak tercatat sehari lebih awal.
const tanggalHariIni = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Jakarta" }).format(new Date());
const sidikJari = (teks) => createHash("sha256").update(teks.replace(/\r\n/g, "\n")).digest("hex").slice(0, 16);

async function bacaTeks(file) {
  try {
    return await readFile(file, "utf-8");
  } catch {
    return "";
  }
}

function escapeHtml(str) {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function injectMeta(html, meta) {
  const replacements = [
    [/<title>[^<]*<\/title>/, `<title>${escapeHtml(meta.title)}</title>`],
    [/(<meta name="description" content=")[^"]*(")/, `$1${escapeHtml(meta.description)}$2`],
    [/(<meta name="robots" content=")[^"]*(")/, `$1${escapeHtml(meta.robots)}$2`],
    [/(<link rel="canonical" href=")[^"]*(")/, `$1${meta.canonical}$2`],
    [/(<meta property="og:title" content=")[^"]*(")/, `$1${escapeHtml(meta.ogTitle)}$2`],
    [/(<meta property="og:description" content=")[^"]*(")/, `$1${escapeHtml(meta.ogDescription)}$2`],
    [/(<meta property="og:url" content=")[^"]*(")/, `$1${meta.ogUrl}$2`],
    [/(<meta name="twitter:title" content=")[^"]*(")/, `$1${escapeHtml(meta.ogTitle)}$2`],
    [/(<meta name="twitter:description" content=")[^"]*(")/, `$1${escapeHtml(meta.ogDescription)}$2`],
  ];
  let out = html;
  for (const [pattern, replacement] of replacements) {
    if (!pattern.test(out)) throw new Error(`Pola meta tidak ditemukan di HTML: ${pattern}`);
    out = out.replace(pattern, replacement);
  }
  return out;
}

// Menaruh data Sheet di window.__TARIF_DATA__ (dibaca useTarifData) supaya hidrasi di browser memakai data yang sama
// dengan HTML hasil prerender. "<" di-escape agar data tidak bisa menutup tag <script>.
// Skrip klasik ini selalu berjalan sebelum skrip modul aplikasi karena skrip modul ditunda sampai dokumen selesai dibaca.
function injectTarifData(html, data) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return html.replace("</head>", () => `<script>window.__TARIF_DATA__=${json}</script></head>`);
}

// Menyisipkan hasil render React ke dalam <div id="root">.
// Memakai fungsi (bukan string) supaya karakter "$" di dalam konten tidak ditafsirkan sebagai pola replace.
function injectAppHtml(html, appHtml) {
  if (!html.includes(ROOT_PLACEHOLDER)) {
    throw new Error(`${ROOT_PLACEHOLDER} tidak ditemukan di dist/index.html. Jalankan "vite build" ulang (file ini tidak bisa dijalankan dua kali berturut-turut).`);
  }
  return html.replace(ROOT_PLACEHOLDER, () => `<div id="root">${appHtml}</div>`);
}

// "/" -> index.html, "/cek-ongkir" -> cek-ongkir.html
function fileNameForRoute(routePath) {
  const name = routePath.replace(/^\//, "");
  return name === "" ? "index.html" : `${name}.html`;
}

// sitemap.xml dibuat dari daftar rute di atas supaya selalu sama dengan halaman yang benar-benar ada.
// <lastmod> diambil dari seo/lastmod.json: berubah hanya kalau isi halaman itu berubah.
// <changefreq> dan <priority> sengaja tidak dipakai karena diabaikan Google.
function buildSitemap(metaByRoute, tanggalPerRute) {
  const entries = [...metaByRoute].map(([routePath, meta]) => `  <url>\n    <loc>${meta.canonical}</loc>\n    <lastmod>${tanggalPerRute.get(routePath)}</lastmod>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries.join("\n")}\n</urlset>\n`;
}

async function main() {
  if (!existsSync(DIST_DIR)) throw new Error(`dist/ tidak ditemukan. Jalankan "vite build" dulu.`);
  if (!existsSync(SSR_ENTRY)) {
    throw new Error(`dist-server/entry-server.js tidak ditemukan. Jalankan dulu: vite build --ssr src/entry-server.jsx --outDir dist-server`);
  }

  // pathToFileURL wajib di Windows: import() tidak menerima path seperti D:\...
  const { render } = await import(pathToFileURL(SSR_ENTRY).href);

  const baseHtml = await readFile(path.join(DIST_DIR, "index.html"), "utf-8");

  // Tarif: Google Sheets adalah sumber utama. Kalau tidak bisa diambil, build tetap jalan dengan data bawaan
  // (tarifData.js) dan menampilkan peringatan jelas, supaya gangguan Google tidak menggagalkan deploy.
  const dataSheet = await ambilDataSheet();
  const tarifData = dataSheet ?? { databaseTarif: tarifBawaan, pengaturan: pengaturanBawaan };
  if (dataSheet) {
    console.log(`✓ Tarif dari Google Sheets: ${dataSheet.databaseTarif.length} baris, estimasi "${dataSheet.pengaturan.estimasiWaktu}"`);
  } else {
    console.warn("⚠⚠ Prerender memakai data BAWAAN (src/data/tarifData.js), bukan Sheet. Tarif di HTML bisa tertinggal dari Sheet sampai build berikutnya.");
  }

  // Build gagal (deploy lama tetap aktif) kalau ada kota yang punya halaman tetapi hilang dari data tarif.
  const kodeHilang = DESTINATION_PAGES.filter(({ code }) => !tarifData.databaseTarif.some((baris) => baris.dest === code)).map(({ code, kota }) => `${code} (${kota})`);
  if (kodeHilang.length > 0) {
    throw new Error(`Kode tujuan ini tidak ada di data tarif: ${kodeHilang.join(", ")}. Tambahkan barisnya di Google Sheet, atau hapus kotanya dari src/config/destinations.js.`);
  }

  // Tanggal "tarif diperbarui": berubah hanya kalau isi data Sheet berubah. Tanpa data Sheet tanggal tidak ditampilkan.
  const hariIni = tanggalHariIni();
  let manifestLama = {};
  const teksManifestLama = await bacaTeks(MANIFEST_PATH);
  try {
    manifestLama = teksManifestLama ? JSON.parse(teksManifestLama) : {};
  } catch {
    console.warn("⚠ seo/lastmod.json tidak bisa dibaca, dibuat ulang (semua tanggal dianggap hari ini).");
  }
  const halamanLama = manifestLama.halaman ?? {};
  const manifestBaru = { tarif: manifestLama.tarif, halaman: {} };

  let tarifDiubah = null;
  if (dataSheet) {
    const sidikTarif = sidikJari(JSON.stringify(dataSheet));
    tarifDiubah = manifestLama.tarif && manifestLama.tarif.hash === sidikTarif ? manifestLama.tarif.diubah : hariIni;
    manifestBaru.tarif = { hash: sidikTarif, diubah: tarifDiubah };
  }
  // Data yang dibaca useTarifData saat render dan saat hidrasi di browser.
  const dataBuild = (diperbaruiPada) => (dataSheet ? { ...dataSheet, diperbaruiPada } : undefined);
  const setDataBuild = (diperbaruiPada) => {
    globalThis.__TARIF_DATA__ = dataBuild(diperbaruiPada);
  };

  const destinationByPath = new Map(DESTINATION_PAGES.map((destination) => [destination.path, destination]));
  const metaByRoute = new Map(ROUTES_TO_PRERENDER.map((routePath) => [routePath, PAGE_META_BY_PATH[routePath] ?? getDestinationMeta(destinationByPath.get(routePath), tarifData)]));

  for (const routePath of ROUTES_TO_PRERENDER) {
    const meta = metaByRoute.get(routePath);
    if (!meta) throw new Error(`Tidak ada metadata untuk rute "${routePath}" di src/config/pageMeta.js`);

    // Sidik jari isi halaman dihitung dari render dengan tanggal contoh, supaya perubahan tarif di halaman lain tidak membuat halaman ini terlihat "baru".
    setDataBuild(TANGGAL_CONTOH);
    const sidikHalaman = sidikJari(JSON.stringify(meta) + render(routePath));
    const lama = halamanLama[routePath];
    // Tanpa data Sheet, halaman tarif dirender dari data bawaan: itu bukan perubahan isi, jadi catatan lama dipertahankan.
    const pakaiCatatanLama = !dataSheet && routePath !== ROUTES.home && lama;
    manifestBaru.halaman[routePath] = pakaiCatatanLama ? lama : { hash: sidikHalaman, diubah: lama && lama.hash === sidikHalaman ? lama.diubah : hariIni };

    setDataBuild(tarifDiubah);
    const appHtml = render(routePath);
    if (!appHtml.includes("<h1")) throw new Error(`Hasil render untuk "${routePath}" tidak berisi <h1>. Prerender gagal.`);

    const fileName = fileNameForRoute(routePath);
    const htmlDenganMeta = injectMeta(baseHtml, meta);
    // Beranda tidak memakai data tarif, jadi tidak perlu membawa datanya.
    const finalHtml = injectAppHtml(dataSheet && routePath !== ROUTES.home ? injectTarifData(htmlDenganMeta, dataBuild(tarifDiubah)) : htmlDenganMeta, appHtml);
    await writeFile(path.join(DIST_DIR, fileName), finalHtml, "utf-8");
    console.log(`✓ ${routePath} -> dist/${fileName} (meta sendiri + ${Math.round(appHtml.length / 1024)} KB konten prerender)`);
  }

  const tanggalPerRute = new Map(ROUTES_TO_PRERENDER.map((routePath) => [routePath, manifestBaru.halaman[routePath].diubah]));
  await writeFile(path.join(DIST_DIR, "sitemap.xml"), buildSitemap(metaByRoute, tanggalPerRute), "utf-8");
  const jumlahBerubah = [...tanggalPerRute.values()].filter((tanggal) => tanggal === hariIni).length;
  console.log(`✓ dist/sitemap.xml (${ROUTES_TO_PRERENDER.length} URL, ${jumlahBerubah} berlabel lastmod hari ini)`);

  const teksManifestBaru = `${JSON.stringify({ tarif: manifestBaru.tarif, halaman: manifestBaru.halaman }, null, 2)}\n`;
  if (teksManifestLama.replace(/\r\n/g, "\n") !== teksManifestBaru) {
    await mkdir(path.dirname(MANIFEST_PATH), { recursive: true });
    await writeFile(MANIFEST_PATH, teksManifestBaru, "utf-8");
    console.log("ℹ seo/lastmod.json diperbarui: ikut di-commit dan di-push bersama perubahan lain.");
  } else {
    console.log("✓ seo/lastmod.json tidak berubah");
  }

  // 404.html sengaja TIDAK diprerender: konten halaman 404 dirender di browser.
  const notFoundHtml = injectMeta(baseHtml, {
    title: "Halaman Tidak Ditemukan | Lion Cargo Ownsale",
    description: "Halaman yang Anda cari tidak ditemukan.",
    robots: "noindex, follow",
    canonical: PAGE_META_BY_PATH[ROUTES.home].canonical,
    ogTitle: "Halaman Tidak Ditemukan | Lion Cargo Ownsale",
    ogDescription: "Halaman yang Anda cari tidak ditemukan.",
    ogUrl: PAGE_META_BY_PATH[ROUTES.home].ogUrl,
  });
  await writeFile(path.join(DIST_DIR, "404.html"), notFoundHtml, "utf-8");
  console.log("✓ dist/404.html (status 404 asli untuk URL tak dikenal)");

  const logoSrc = path.join(DIST_DIR, "Ownsalelogo.png");
  if (existsSync(logoSrc)) {
    await copyFile(logoSrc, path.join(DIST_DIR, "favicon.ico"));
    console.log("✓ dist/favicon.ico (sementara disalin dari logo, ganti dengan .ico asli nanti)");
  }
}

main().catch((err) => {
  console.error("✗ inject-meta gagal:", err.message);
  process.exit(1);
});
