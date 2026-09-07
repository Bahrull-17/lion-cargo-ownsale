import React from "react";
import { PlaneTakeoff, PlaneLanding, Plane, PackageCheck, Radar } from "lucide-react";

export default function CargoFlightBanner() {
  return (
    <section className="relative py-8 sm:py-12 bg-linear-to-b from-[#050914] via-[#0A1330] to-[#050914] overflow-hidden border-y border-slate-800/60">
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .cargo-anim, .cargo-anim * { animation: none !important; }
        }

        .instrument-grid {
          background-image:
            linear-gradient(rgba(45, 212, 191, 0.06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(45, 212, 191, 0.06) 1px, transparent 1px);
          background-size: 42px 42px;
          -webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%);
          mask-image: radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 90%);
        }

        @keyframes blip {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50% { opacity: 0.6; transform: scale(1); }
        }

        @keyframes radarSpin { to { transform: rotate(360deg); } }
        @keyframes radarPing {
          0% { transform: scale(0.6); opacity: 0.5; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        .radar-sweep {
          background: conic-gradient(from 0deg, rgba(45,212,191,0.55), transparent 40%);
          animation: radarSpin 3.2s linear infinite;
        }
        .radar-ping { animation: radarPing 2.6s cubic-bezier(0.2, 0.6, 0.4, 1) infinite; }
        .radar-ping-delay { animation-delay: 1.3s; }

        .flight-path-desktop { offset-path: path("M 25,110 C 300,35 680,155 975,70"); offset-rotate: auto; }
        .flight-path-mobile  { offset-path: path("M 15,85 C 165,25 435,115 585,50"); offset-rotate: auto; }

        @keyframes flyCargo {
          0%   { offset-distance: 0%;  opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }
        .plane-fly { animation: flyCargo 9s ease-in-out infinite; }
        .plane-fly.trail-1 { animation-delay: -0.55s; }
        .plane-fly.trail-2 { animation-delay: -1.05s; }
        .plane-fly.trail-3 { animation-delay: -1.55s; }

        .plane-fly-mobile { animation: flyCargo 7s ease-in-out infinite; }
        .plane-fly-mobile.trail-1 { animation-delay: -0.45s; }
        .plane-fly-mobile.trail-2 { animation-delay: -0.85s; }

        .plane-icon { transform: rotate(45deg); }

        @keyframes telemetryFade {
          0%, 100% { opacity: 0; transform: translateY(4px); }
          15%, 45% { opacity: 1; transform: translateY(0); }
          60% { opacity: 0; transform: translateY(-4px); }
        }
        .telemetry-a { animation: telemetryFade 9s ease-in-out infinite; }
        .telemetry-b { animation: telemetryFade 9s ease-in-out infinite; animation-delay: 3s; }
        .telemetry-c { animation: telemetryFade 9s ease-in-out infinite; animation-delay: 6s; }

        .float-marker { animation: markerFloat 4.5s ease-in-out infinite; }
        @keyframes markerFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
      `}</style>

      <div className="cargo-anim max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ============= DESKTOP ============= */}
        <div className="hidden sm:block relative w-full h-40">
          <div className="instrument-grid absolute inset-0" />

          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 1000 160" preserveAspectRatio="none">
            <path d="M 25,110 C 300,35 680,155 975,70" fill="none" stroke="rgba(45,212,191,0.35)" strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" />
            {[120, 260, 400, 540, 680, 820].map((cx, i) => (
              <circle key={i} cx={cx} cy={i % 2 === 0 ? 45 : 135} r="1.6" fill="rgba(45,212,191,0.5)" style={{ animation: `blip 3s ease-in-out ${i * 0.4}s infinite` }} />
            ))}
          </svg>

          <div className="absolute left-2 z-20 flex flex-col items-start" style={{ top: "68%", transform: "translateY(-50%)" }}>
            <div className="relative w-14 h-14 flex items-center justify-center">
              <div className="radar-sweep absolute inset-0 rounded-full" />
              <div className="radar-ping absolute inset-2 rounded-full border border-teal-400/40" />
              <div className="radar-ping radar-ping-delay absolute inset-2 rounded-full border border-teal-400/40" />
              <div className="relative z-10 p-2 rounded-full bg-[#0A1330] border border-teal-400/60">
                <PlaneTakeoff className="w-4 h-4 text-teal-300" />
              </div>
            </div>
            <div className="mt-0.5 font-mono text-[10px] tracking-tight text-teal-300/80">CGK · -6.21, 106.85</div>
          </div>

          <div className="absolute right-2 z-20 flex flex-col items-end" style={{ top: "44%", transform: "translateY(-50%)" }}>
            <div className="float-marker p-2 rounded-full bg-[#0A1330] border border-amber-400/60 shadow-[0_0_15px_rgba(245,166,35,0.25)]">
              <PlaneLanding className="w-4 h-4 text-amber-300" />
            </div>
            <div className="mt-0.5 font-mono text-[10px] tracking-tight text-amber-300/80">ETA 02:14:07</div>
          </div>

          <div className="absolute inset-0 pointer-events-none z-30">
            {["trail-3", "trail-2", "trail-1"].map((cls, i) => (
              <div key={cls} className={`flight-path-desktop plane-fly ${cls} absolute top-0 left-0`}>
                <div className="plane-icon -translate-x-1/2 -translate-y-1/2 rounded-full" style={{ opacity: 0.28 + i * 0.05, transform: `translate(-50%,-50%) scale(${0.5 + i * 0.1}) rotate(45deg)` }}>
                  <Plane className="w-6 h-6 text-amber-300" />
                </div>
              </div>
            ))}
            <div className="flight-path-desktop plane-fly absolute top-0 left-0">
              <div className="plane-icon relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-amber-500 shadow-[0_0_18px_rgba(245,166,35,0.75)]">
                <Plane className="w-4 h-4 text-[#0A1330]" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="telemetry-a absolute left-[30%] top-[14%] font-mono text-[10px] text-slate-400 bg-[#0A1330]/80 border border-slate-700/60 rounded px-1.5 py-0.5">FLT GA-CGO 481</div>
          <div className="telemetry-b absolute left-[52%] top-[80%] font-mono text-[10px] text-slate-400 bg-[#0A1330]/80 border border-slate-700/60 rounded px-1.5 py-0.5">MUATAN 2.450 KG</div>
          <div className="telemetry-c absolute left-[72%] top-[10%] font-mono text-[10px] text-slate-400 bg-[#0A1330]/80 border border-slate-700/60 rounded px-1.5 py-0.5">KETINGGIAN 35.000 FT</div>
        </div>

        {/* ============= MOBILE ============= */}
        <div className="block sm:hidden relative w-full h-28">
          <div className="instrument-grid absolute inset-0" />

          <svg className="absolute inset-0 w-full h-full overflow-visible" viewBox="0 0 600 120" preserveAspectRatio="none">
            <path d="M 15,85 C 165,25 435,115 585,50" fill="none" stroke="rgba(45,212,191,0.35)" strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" />
          </svg>

          <div className="absolute left-1 z-20 flex flex-col items-start" style={{ top: "70%", transform: "translateY(-50%)" }}>
            <div className="relative w-9 h-9 flex items-center justify-center">
              <div className="radar-sweep absolute inset-0 rounded-full" />
              <div className="relative z-10 p-1 rounded-full bg-[#0A1330] border border-teal-400/60">
                <PlaneTakeoff className="w-3.5 h-3.5 text-teal-300" />
              </div>
            </div>
          </div>

          <div className="absolute right-1 z-20" style={{ top: "45%", transform: "translateY(-50%)" }}>
            <div className="float-marker p-1 rounded-full bg-[#0A1330] border border-amber-400/60 shadow-[0_0_12px_rgba(245,166,35,0.25)]">
              <PlaneLanding className="w-3.5 h-3.5 text-amber-300" />
            </div>
          </div>

          <div className="absolute inset-0 pointer-events-none z-30">
            {["trail-2", "trail-1"].map((cls, i) => (
              <div key={cls} className={`flight-path-mobile plane-fly-mobile ${cls} absolute top-0 left-0`}>
                <div className="plane-icon -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.3 + i * 0.08, transform: `translate(-50%,-50%) scale(${0.5 + i * 0.12}) rotate(45deg)` }}>
                  <Plane className="w-4 h-4 text-amber-300" />
                </div>
              </div>
            ))}
            <div className="flight-path-mobile plane-fly-mobile absolute top-0 left-0">
              <div className="plane-icon relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-amber-500 shadow-[0_0_14px_rgba(245,166,35,0.75)]">
                <Plane className="w-3.5 h-3.5 text-[#0A1330]" strokeWidth={2.5} />
              </div>
            </div>
          </div>

          <div className="telemetry-a absolute left-[26%] top-[8%] font-mono text-[9px] text-slate-400 bg-[#0A1330]/80 border border-slate-700/60 rounded px-1 py-0.5">GA-CGO 481</div>
          <div className="telemetry-b absolute left-[54%] top-[84%] font-mono text-[9px] text-slate-400 bg-[#0A1330]/80 border border-slate-700/60 rounded px-1 py-0.5">2.450 KG</div>
        </div>

        {/* ============= Baris statistik instrumen ============= */}
        <div className="mt-5 sm:mt-6 flex items-center justify-center divide-x divide-slate-700/60">
          <div className="flex flex-col items-center px-4 sm:px-8">
            <div className="flex items-center gap-1.5 font-mono text-lg sm:text-xl text-teal-300">
              <Radar className="w-4 h-4" strokeWidth={2} />
              24/7
            </div>
            <div className="mt-0.5 text-[10px] sm:text-xs text-slate-400">pelacakan kargo real-time</div>
          </div>
          <div className="flex flex-col items-center px-4 sm:px-8">
            <div className="font-mono text-lg sm:text-xl text-amber-300">98,7%</div>
            <div className="mt-0.5 text-[10px] sm:text-xs text-slate-400">pengiriman tepat waktu</div>
          </div>
          <div className="flex flex-col items-center px-4 sm:px-8">
            <div className="flex items-center gap-1.5 font-mono text-lg sm:text-xl text-teal-300">
              <PackageCheck className="w-4 h-4" strokeWidth={2} />
              45+
            </div>
            <div className="mt-0.5 text-[10px] sm:text-xs text-slate-400">rute kargo udara</div>
          </div>
        </div>
      </div>
    </section>
  );
}
