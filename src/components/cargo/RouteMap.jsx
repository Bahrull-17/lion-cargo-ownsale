import { useState } from "react";
import { Link } from "react-router-dom";
import { DESTINATION_PAGES } from "../../config/destinations";

const LEBAR = 800;
const TINGGI = 320;
const ASAL = { code: "CGK", koordinat: [-6.1256, 106.6559] };

// Proyeksi sederhana (lintang/bujur -> piksel) untuk kepulauan Indonesia.
const proyeksi = ([lintang, bujur]) => [(bujur - 93) * 16, (7 - lintang) * 17.5];

// Bentuk pulau disederhanakan menjadi elips titik-titik (gaya "dot map"): pusat [lintang, bujur], jari-jari dalam derajat, rotasi.
const PULAU = [
  { pusat: [-0.2, 100.5], rx: 7.4, ry: 2.1, rot: 47 },
  { pusat: [-7.6, 110.2], rx: 5.4, ry: 0.9, rot: 14 },
  { pusat: [0.3, 114], rx: 4.2, ry: 4.4, rot: 0 },
  { pusat: [-2.2, 121], rx: 1.2, ry: 4.6, rot: 0 },
  { pusat: [1.2, 124.4], rx: 2.2, ry: 0.8, rot: -20 },
  { pusat: [-9, 119], rx: 5, ry: 0.8, rot: 11 },
  { pusat: [-3.2, 128.2], rx: 1.3, ry: 1, rot: 0 },
  { pusat: [-4.3, 138], rx: 6.6, ry: 2.7, rot: 18 },
];

const [ASAL_X, ASAL_Y] = proyeksi(ASAL.koordinat);

const tujuanPeta = DESTINATION_PAGES.map((destination) => {
  const [x, y] = proyeksi(destination.koordinat);
  const tengahX = (ASAL_X + x) / 2;
  const tengahY = Math.min(ASAL_Y, y) - 28 - Math.abs(x - ASAL_X) * 0.12;
  return { ...destination, x, y, jalur: `M${ASAL_X} ${ASAL_Y} Q${tengahX} ${tengahY} ${x} ${y}` };
});

// Peta rute dari CGK dan daftar kota. Menyentuh/mengarahkan kursor ke kota menyorot rutenya di peta; setiap kota tetap tautan biasa.
export default function RouteMap() {
  const [aktif, setAktif] = useState(null);
  const terpilih = tujuanPeta.find((tujuan) => tujuan.code === aktif);

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[2rem] border border-blue-100 bg-linear-to-b from-blue-50 to-white p-2 shadow-xl shadow-blue-900/5 dark:border-slate-800 dark:from-slate-900 dark:to-slate-950 sm:p-4">
        <svg viewBox={`0 0 ${LEBAR} ${TINGGI}`} role="img" aria-label="Peta rute cargo udara dari Bandara Soekarno-Hatta ke kota-kota tujuan di Indonesia" className="block h-auto w-full">
          <defs>
            <pattern id="cg-peta-titik" width="11" height="11" patternUnits="userSpaceOnUse">
              <circle cx="5.5" cy="5.5" r="2" fill="#93c5fd" />
            </pattern>
          </defs>
          {PULAU.map(({ pusat, rx, ry, rot }) => {
            const [cx, cy] = proyeksi(pusat);
            return <ellipse key={pusat.join()} cx={cx} cy={cy} rx={rx * 16} ry={ry * 17.5} transform={`rotate(${rot} ${cx} ${cy})`} fill="url(#cg-peta-titik)" />;
          })}

          <g fill="none" strokeLinecap="round">
            {tujuanPeta.map(({ code, jalur }) => (
              <path key={code} d={jalur} className={code === aktif ? "" : "cg-dash"} stroke={code === aktif ? "#1d4ed8" : "#93c5fd"} strokeWidth={code === aktif ? 3 : 1.6} opacity={aktif && code !== aktif ? 0.25 : 0.9} />
            ))}
          </g>

          {tujuanPeta.map(({ code, x, y }) => (
            <g key={code}>
              {code === aktif && <circle cx={x} cy={y} r="14" fill="#2563eb" opacity="0.2" className="cg-pulse" />}
              <circle cx={x} cy={y} r={code === aktif ? 7 : 5} fill={code === aktif ? "#1d4ed8" : "#2563eb"} stroke="#ffffff" strokeWidth="2" />
            </g>
          ))}

          <circle cx={ASAL_X} cy={ASAL_Y} r="16" fill="#38bdf8" opacity="0.25" className="cg-pulse" />
          <circle cx={ASAL_X} cy={ASAL_Y} r="8" fill="#0f172a" stroke="#ffffff" strokeWidth="2.5" />
          <text x={ASAL_X + 14} y={ASAL_Y + 24} fill="#1e3a8a" fontSize="15" fontWeight="800" fontFamily="ui-monospace, monospace" letterSpacing="2">
            CGK
          </text>

          {terpilih && (
            <g>
              <rect x={Math.min(Math.max(terpilih.x - 52, 6), LEBAR - 112)} y={terpilih.y - 40} width="106" height="26" rx="13" fill="#1e3a8a" />
              <text x={Math.min(Math.max(terpilih.x, 59), LEBAR - 59)} y={terpilih.y - 22} textAnchor="middle" fill="#ffffff" fontSize="13" fontWeight="700" fontFamily="ui-sans-serif, system-ui">
                {terpilih.kota.replace(/ \(.*\)/, "")}
              </text>
            </g>
          )}
        </svg>
      </div>

      <ul className="flex flex-wrap justify-center gap-2" aria-label="Kota tujuan dengan halaman tarif">
        {tujuanPeta.map(({ code, kota, path }) => (
          <li key={code}>
            <Link
              to={path}
              onMouseEnter={() => setAktif(code)}
              onMouseLeave={() => setAktif(null)}
              onFocus={() => setAktif(code)}
              onBlur={() => setAktif(null)}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-[13px] font-semibold sm:min-h-11 sm:gap-2 sm:px-4 sm:text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 ${
                aktif === code
                  ? "-translate-y-0.5 border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                  : "border-slate-200 bg-white text-slate-700 hover:border-blue-400 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
              }`}
            >
              {kota}
              <span className={`font-mono text-[11px] font-bold ${aktif === code ? "text-blue-100" : "text-slate-500 dark:text-slate-400"}`}>{code}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
