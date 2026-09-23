import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, MessageCircle } from "lucide-react";
import logoImage from "../assets/images/logoownsale.png";
import { NAV_ITEMS } from "../config/navigation";
import { ROUTES } from "../config/routes";
import { whatsappLink } from "../config/site";
import useTheme from "../hooks/useTheme";
import useActiveMenu from "../hooks/useActiveMenu";

const WHATSAPP_URL = whatsappLink("Halo, saya ingin bertanya mengenai layanan pengiriman kargo udara.");

function ThemeToggle({ isDark, onToggle, className }) {
  return (
    <button type="button" onClick={onToggle} className={className} aria-label={isDark ? "Ganti ke mode terang" : "Ganti ke mode gelap"} aria-pressed={isDark}>
      {isDark ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
    </button>
  );
}

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const activeMenu = useActiveMenu();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const closeMenu = () => setIsMobileMenuOpen(false);

  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKeyDown = (e) => e.key === "Escape" && setIsMobileMenuOpen(false);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50 shadow-lg shadow-slate-900/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <Link to={ROUTES.home} onClick={closeMenu} aria-label="Lion Cargo Ownsale - ke Beranda" className="flex items-center">
            <img src={logoImage} alt="Logo Lion Cargo Ownsale" className="h-10 sm:h-16 w-auto object-contain rounded-xl sm:rounded-2xl shadow-md transition-transform hover:scale-105" />
          </Link>

          {/* Menu Desktop */}
          <nav className="hidden md:flex items-center space-x-8" aria-label="Menu utama">
            {NAV_ITEMS.map((item) => {
              const isActive = activeMenu === item.key;
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  aria-current={isActive ? "page" : undefined}
                  className={`group py-2 text-[15px] font-semibold transition-colors ${isActive ? "text-blue-900 dark:text-blue-400" : "text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400"}`}
                >
                  <span className="relative pb-1">
                    {item.label}
                    <span
                      className={`absolute bottom-0 left-0 w-full h-0.75 bg-blue-900 dark:bg-blue-400 rounded-full shadow-sm transition-all duration-300 origin-left ${isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100"}`}
                    />
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center space-x-3">
            <ThemeToggle
              isDark={isDark}
              onToggle={toggle}
              className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-sm cursor-pointer"
            />

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="h-11 px-5 flex items-center gap-2 text-sm font-semibold text-white bg-linear-to-r from-blue-900 to-blue-800 dark:from-blue-800 dark:to-blue-700 rounded-xl hover:opacity-95 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-blue-900/25 active:scale-95"
            >
              <span>Hubungi Kami</span>
            </a>
          </div>

          <div className="flex md:hidden items-center space-x-2.5">
            <ThemeToggle
              isDark={isDark}
              onToggle={toggle}
              className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-sm transition-transform active:scale-90 flex items-center justify-center cursor-pointer"
            />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((open) => !open)}
              aria-label={isMobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              className="w-11 h-11 rounded-xl bg-blue-900/10 dark:bg-blue-900/30 border border-blue-900/20 dark:border-blue-700/30 text-blue-900 dark:text-blue-400 focus:outline-none shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center cursor-pointer"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <span className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? "rotate-90 opacity-0 scale-50" : "rotate-0 opacity-100 scale-100"}`}>
                  <Menu className="w-6 h-6" />
                </span>
                <span className={`absolute transition-all duration-300 transform ${isMobileMenuOpen ? "rotate-0 opacity-100 scale-100" : "-rotate-90 opacity-0 scale-50"}`}>
                  <X className="w-6 h-6" />
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div id="mobile-menu" className="md:hidden bg-white/90 dark:bg-slate-950/90 backdrop-blur-2xl border-b border-white/20 dark:border-slate-800/50 px-4 pt-3 pb-6 space-y-2 transition-colors shadow-2xl">
          <nav aria-label="Menu utama (mobile)" className="space-y-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeMenu === item.key;
              return (
                <Link
                  key={item.key}
                  to={item.to}
                  onClick={closeMenu}
                  aria-current={isActive ? "page" : undefined}
                  className={`block w-full text-left px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                    isActive ? "bg-blue-50 dark:bg-slate-900 text-blue-900 dark:text-blue-400 font-semibold border-l-4 border-blue-900 dark:border-blue-500" : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-3">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 w-full text-center px-4 py-3 text-sm font-semibold text-white bg-linear-to-r from-blue-900 to-blue-800 dark:from-blue-800 dark:to-blue-700 rounded-xl hover:opacity-95 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-blue-900/25 active:scale-95"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>Hubungi Kami</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
