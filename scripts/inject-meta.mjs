import { readFile, writeFile, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { ROUTES } from "../src/config/routes.js";
import { PAGE_META_BY_PATH } from "../src/config/pageMeta.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");
const SSR_ENTRY = path.join(__dirname, "..", "dist-server", "entry-server.js");

// Semua rute yang dibuatkan file HTML sendiri berisi konten asli (bukan <div id="root"></div> kosong).
// Rute baru cukup ditambahkan di sini dan di src/config/routes.js + pageMeta.js.
const ROUTES_TO_PRERENDER = [ROUTES.home, ROUTES.cekOngkir];

const ROOT_PLACEHOLDER = '<div id="root"></div>';

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

async function main() {
  if (!existsSync(DIST_DIR)) throw new Error(`dist/ tidak ditemukan. Jalankan "vite build" dulu.`);
  if (!existsSync(SSR_ENTRY)) {
    throw new Error(`dist-server/entry-server.js tidak ditemukan. Jalankan dulu: vite build --ssr src/entry-server.jsx --outDir dist-server`);
  }

  // pathToFileURL wajib di Windows: import() tidak menerima path seperti D:\...
  const { render } = await import(pathToFileURL(SSR_ENTRY).href);

  const baseHtml = await readFile(path.join(DIST_DIR, "index.html"), "utf-8");

  for (const routePath of ROUTES_TO_PRERENDER) {
    const meta = PAGE_META_BY_PATH[routePath];
    if (!meta) throw new Error(`Tidak ada metadata untuk rute "${routePath}" di src/config/pageMeta.js`);

    const appHtml = render(routePath);
    if (!appHtml.includes("<h1")) throw new Error(`Hasil render untuk "${routePath}" tidak berisi <h1>. Prerender gagal.`);

    const fileName = fileNameForRoute(routePath);
    const finalHtml = injectAppHtml(injectMeta(baseHtml, meta), appHtml);
    await writeFile(path.join(DIST_DIR, fileName), finalHtml, "utf-8");
    console.log(`✓ ${routePath} -> dist/${fileName} (meta sendiri + ${Math.round(appHtml.length / 1024)} KB konten prerender)`);
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
