import { readFile, writeFile, mkdir, copyFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { ROUTES } from "../src/config/routes.js";
import { PAGE_META_BY_PATH } from "../src/config/pageMeta.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.join(__dirname, "..", "dist");

const ROUTES_TO_PRERENDER = [ROUTES.cekOngkir];

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

async function main() {
  if (!existsSync(DIST_DIR)) throw new Error(`dist/ tidak ditemukan. Jalankan "vite build" dulu.`);

  const baseHtml = await readFile(path.join(DIST_DIR, "index.html"), "utf-8");

  for (const routePath of ROUTES_TO_PRERENDER) {
    const meta = PAGE_META_BY_PATH[routePath];
    if (!meta) throw new Error(`Tidak ada metadata untuk rute "${routePath}" di src/config/pageMeta.js`);

    const outDir = path.join(DIST_DIR, routePath.replace(/^\//, ""));
    await mkdir(outDir, { recursive: true });
    await writeFile(path.join(outDir, "index.html"), injectMeta(baseHtml, meta), "utf-8");
    console.log(`✓ ${routePath} -> dist${routePath}/index.html (title, canonical, OG sendiri)`);
  }

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
