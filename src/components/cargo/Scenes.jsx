// Ilustrasi vektor orisinal untuk halaman cargo. Bukan logo, livery, atau aset resmi maskapai mana pun: pesawat kargo bergaya
// berwarna putih-biru. Semua dekoratif kecuali yang diberi `label`; animasi memakai kelas cg-* di index.css.

// Pesawat kargo tampak samping, menghadap kanan. Ukuran lokal sekitar 310 x 110.
export function CargoPlane() {
  return (
    <g>
      <path d="M26 46 L8 6 L46 6 L76 46 Z" fill="#1d4ed8" />
      <path d="M28 52 L72 52 L56 66 L20 66 Z" fill="#bfdbfe" />
      <path d="M14 54 C14 40 34 30 70 30 H236 C272 30 298 42 308 56 C298 70 272 76 236 76 H70 C34 76 14 68 14 54 Z" fill="#ffffff" stroke="#bfdbfe" strokeWidth="2" />
      <path d="M30 70 C60 78 250 78 292 66 L300 60 C280 72 250 74 236 74 H70 C50 74 36 72 30 70 Z" fill="#dbeafe" />
      <rect x="40" y="58" width="226" height="6" rx="3" fill="#2563eb" />
      <rect x="40" y="67" width="190" height="2" rx="1" fill="#60a5fa" />
      <path d="M268 44 L292 50 L286 54 L266 52 Z" fill="#1e3a8a" />
      <rect x="128" y="40" width="54" height="16" rx="3" fill="none" stroke="#93c5fd" strokeWidth="1.6" strokeDasharray="4 3" />
      <path d="M130 62 L214 62 L168 108 L112 108 Z" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.6" />
      <rect x="146" y="88" width="54" height="20" rx="10" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.4" />
      <ellipse cx="198" cy="98" rx="4" ry="8" fill="#1e3a8a" />
    </g>
  );
}

function Awan({ x, y, skala = 1, kelas }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${skala})`}>
      <g className={kelas} fill="#ffffff" opacity="0.92">
        <ellipse cx="0" cy="12" rx="46" ry="13" />
        <ellipse cx="22" cy="2" rx="28" ry="14" />
        <ellipse cx="-20" cy="4" rx="24" ry="11" />
      </g>
    </g>
  );
}

function Paket({ x, y, w = 26, h = 22 }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="2" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.5" />
      <rect x={x + w / 2 - 2} y={y} width="4" height={h} fill="#60a5fa" opacity="0.7" />
    </g>
  );
}

// Pesawat terbang di atas kawasan bandara: dipakai di hero halaman tarif.
export function SkyScene({ label }) {
  return (
    <svg viewBox="0 0 560 400" role="img" aria-label={label} className="block h-auto w-full">
      <defs>
        <linearGradient id="cg-langit" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#93c5fd" />
          <stop offset="0.6" stopColor="#dbeafe" />
          <stop offset="1" stopColor="#f8fafc" />
        </linearGradient>
      </defs>
      <rect width="560" height="400" fill="url(#cg-langit)" />
      <circle cx="450" cy="96" r="64" fill="#fef9c3" opacity="0.28" />
      <circle cx="450" cy="96" r="40" fill="#fef9c3" opacity="0.9" />
      <Awan x={92} y={84} kelas="cg-drift" />
      <Awan x={440} y={188} skala={0.8} kelas="cg-drift-b" />
      <Awan x={250} y={52} skala={0.6} kelas="cg-drift-b" />
      <g stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.75">
        <path d="M26 150 H96" />
        <path d="M44 172 H104" />
        <path d="M18 194 H80" />
      </g>
      <g transform="translate(118 112)">
        <g className="cg-float">
          <CargoPlane />
        </g>
      </g>
      <rect y="322" width="560" height="78" fill="#e2e8f0" />
      <rect y="346" width="560" height="22" fill="#94a3b8" />
      <path d="M0 357 H560" stroke="#f8fafc" strokeWidth="3" strokeDasharray="22 16" />
      <rect x="36" y="276" width="170" height="46" rx="4" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.6" />
      <path d="M36 276 Q121 246 206 276" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.6" />
      <rect x="62" y="296" width="118" height="26" fill="#eff6ff" />
      <path d="M92 296 V322 M122 296 V322 M152 296 V322" stroke="#93c5fd" strokeWidth="2" />
      <rect x="456" y="252" width="14" height="70" fill="#cbd5e1" />
      <rect x="446" y="238" width="34" height="18" rx="5" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.5" />
      <Paket x={236} y={300} />
      <Paket x={266} y={306} w={22} h={16} />
      <Paket x={300} y={298} w={30} h={24} />
    </svg>
  );
}

// Terminal kargo dengan pesawat di apron: dipakai di hero halaman Lion Cargo Bandara Soekarno-Hatta.
export function TerminalScene({ label }) {
  return (
    <svg viewBox="0 0 560 400" role="img" aria-label={label} className="block h-auto w-full">
      <defs>
        <linearGradient id="cg-langit-terminal" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#bfdbfe" />
          <stop offset="0.7" stopColor="#eff6ff" />
          <stop offset="1" stopColor="#ffffff" />
        </linearGradient>
      </defs>
      <rect width="560" height="400" fill="url(#cg-langit-terminal)" />
      <circle cx="94" cy="82" r="34" fill="#fef9c3" opacity="0.85" />
      <Awan x={300} y={66} kelas="cg-drift" />
      <Awan x={90} y={150} skala={0.7} kelas="cg-drift-b" />
      {/* menara */}
      <rect x="470" y="104" width="16" height="216" fill="#cbd5e1" />
      <rect x="454" y="84" width="48" height="26" rx="7" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.6" />
      <path d="M462 97 H494" stroke="#eff6ff" strokeWidth="2" />
      {/* terminal */}
      <rect x="24" y="168" width="318" height="152" rx="6" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.8" />
      <rect x="14" y="154" width="338" height="18" rx="5" fill="#1d4ed8" />
      <text x="34" y="167" fill="#ffffff" fontSize="11" fontWeight="700" fontFamily="ui-monospace, monospace" letterSpacing="3">
        CGK CARGO
      </text>
      <rect x="40" y="192" width="286" height="62" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.4" />
      <path d="M88 192 V254 M136 192 V254 M184 192 V254 M232 192 V254 M280 192 V254" stroke="#93c5fd" strokeWidth="1.6" />
      <path d="M40 223 H326" stroke="#bfdbfe" strokeWidth="1.4" />
      <rect x="40" y="268" width="62" height="52" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.4" />
      <rect x="116" y="268" width="62" height="52" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.4" />
      <rect x="192" y="268" width="62" height="52" fill="#93c5fd" stroke="#60a5fa" strokeWidth="1.4" />
      <path d="M71 268 V320 M147 268 V320 M223 268 V320" stroke="#eff6ff" strokeWidth="1.6" />
      {/* apron */}
      <rect y="320" width="560" height="80" fill="#e2e8f0" />
      <path d="M0 372 H560" stroke="#94a3b8" strokeWidth="2.5" strokeDasharray="20 14" />
      {/* pesawat di apron */}
      <g transform="translate(292 244) scale(0.66)">
        <g className="cg-float-b">
          <CargoPlane />
        </g>
      </g>
      {/* kontainer kargo dan kendaraan pemuat */}
      <path d="M268 346 h40 v-28 l-9 -9 h-31 z" fill="#dbeafe" stroke="#60a5fa" strokeWidth="1.6" />
      <path d="M318 346 h40 v-28 l-9 -9 h-31 z" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.6" />
      <g>
        <rect x="52" y="334" width="84" height="22" rx="4" fill="#2563eb" />
        <rect x="136" y="342" width="30" height="14" rx="3" fill="#1d4ed8" />
        <circle cx="72" cy="360" r="7" fill="#1e293b" />
        <circle cx="118" cy="360" r="7" fill="#1e293b" />
        <circle cx="152" cy="360" r="6" fill="#1e293b" />
      </g>
      <Paket x={198} y={330} />
      <Paket x={226} y={336} w={22} h={16} />
    </svg>
  );
}

// Ilustrasi kecil untuk baris keunggulan. jenis: "cepat" | "jangkauan" | "bisnis"
export function FeatureArt({ jenis, label }) {
  return (
    <svg viewBox="0 0 280 200" role="img" aria-label={label} className="block h-auto w-full">
      <rect width="280" height="200" rx="28" fill="#eff6ff" />
      <circle cx="226" cy="40" r="46" fill="#dbeafe" opacity="0.7" />
      {jenis === "cepat" && (
        <g>
          <g stroke="#93c5fd" strokeWidth="4" strokeLinecap="round">
            <path d="M22 96 H78" />
            <path d="M36 118 H88" />
            <path d="M16 140 H66" />
          </g>
          <g transform="translate(70 70) scale(0.62)">
            <g className="cg-float">
              <CargoPlane />
            </g>
          </g>
          <circle cx="226" cy="44" r="24" fill="#ffffff" stroke="#60a5fa" strokeWidth="3" />
          <path d="M226 44 V30 M226 44 L238 50" stroke="#2563eb" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )}
      {jenis === "jangkauan" && (
        <g>
          <g fill="none" stroke="#60a5fa" strokeWidth="2.4" className="cg-dash">
            <path d="M60 140 Q100 50 150 70" />
            <path d="M60 140 Q150 150 210 110" />
            <path d="M60 140 Q80 60 70 36" />
            <path d="M60 140 Q170 30 240 60" />
          </g>
          <g fill="#2563eb">
            <circle cx="150" cy="70" r="7" />
            <circle cx="210" cy="110" r="7" />
            <circle cx="70" cy="36" r="7" />
            <circle cx="240" cy="60" r="7" />
          </g>
          <circle cx="60" cy="140" r="10" fill="#1d4ed8" />
          <circle cx="60" cy="140" r="18" fill="none" stroke="#93c5fd" strokeWidth="2" />
        </g>
      )}
      {jenis === "bisnis" && (
        <g>
          <rect x="40" y="118" width="84" height="56" rx="4" fill="#dbeafe" stroke="#60a5fa" strokeWidth="2.4" />
          <rect x="130" y="130" width="70" height="44" rx="4" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="2.4" />
          <rect x="72" y="66" width="76" height="52" rx="4" fill="#eff6ff" stroke="#60a5fa" strokeWidth="2.4" />
          <path d="M82 118 V174 M160 130 V174 M108 66 V118" stroke="#60a5fa" strokeWidth="2.4" opacity="0.6" />
          <rect x="196" y="76" width="54" height="36" rx="8" fill="#2563eb" />
          <path d="M213 94 L221 102 L235 86" fill="none" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}
    </svg>
  );
}

// Pesawat kecil dekoratif untuk pita CTA (tanpa teks).
export function PesawatHiasan({ className = "" }) {
  return (
    <svg viewBox="0 0 330 130" className={className} aria-hidden="true">
      <g transform="translate(10 8)">
        <CargoPlane />
      </g>
    </svg>
  );
}
