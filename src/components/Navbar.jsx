import React, { useEffect, useState } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";

export default function Navbar() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || document.documentElement.classList.contains("dark");
    }
    return false;
  });

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState("#beranda");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const navItems = [
    { label: "Beranda", href: "#beranda" },
    { label: "Layanan", href: "#layanan" },
    { label: "Tentang Kami", href: "#tentang" },
    { label: "Cek Ongkir", href: "#ongkir" },
    { label: "Kontak", href: "#kontak" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-b border-white/20 dark:border-slate-800/50 shadow-lg shadow-slate-900/5 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-900 dark:bg-blue-800 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-blue-900/20">✈️</div>
            <div>
              <span className="text-lg font-black tracking-tight text-slate-900 dark:text-white">LION CARGO</span>
              <span className="block text-[10px] font-bold tracking-widest text-blue-700 dark:text-blue-400 uppercase">Ownsale Partner</span>
            </div>
          </div>

          {/* Menu Navigasi (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = activeMenu === item.href;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setActiveMenu(item.href)}
                  className={`group py-2 text-[15px] font-semibold transition-colors ${isActive ? "text-blue-900 dark:text-blue-400" : "text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-400"}`}
                >
                  <span className="relative pb-1">
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.75 bg-blue-900 dark:bg-blue-400 rounded-full shadow-sm transition-all duration-300 origin-left scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-100" />
                  </span>
                </a>
              );
            })}
          </nav>

          {/* Tombol Kanan Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <button
              onClick={toggleDarkMode}
              className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center justify-center shadow-sm cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </button>

            <a
              href="#kontak"
              className="h-11 px-5 flex items-center text-sm font-semibold text-white bg-linear-to-r from-blue-900 to-blue-800 dark:from-blue-800 dark:to-blue-700 rounded-xl hover:opacity-95 hover:scale-105 hover:-translate-y-0.5 transition-all duration-200 shadow-lg shadow-blue-900/25 active:scale-95"
            >
              Hubungi Kami
            </a>
          </div>

          {/* Tombol Kanan Mobile */}
          <div className="flex md:hidden items-center space-x-2.5">
            <button
              onClick={toggleDarkMode}
              className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-200 shadow-sm transition-transform active:scale-90 flex items-center justify-center cursor-pointer"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Moon className="w-5 h-5 text-blue-400" /> : <Sun className="w-5 h-5 text-amber-500" />}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-11 h-11 rounded-xl bg-blue-900/10 dark:bg-blue-900/30 border border-blue-900/20 dark:border-blue-700/30 text-blue-900 dark:text-blue-400 focus:outline-none shadow-sm transition-all duration-200 active:scale-90 flex items-center justify-center"
              aria-label="Toggle Menu"
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

      {/* Menu Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/80 dark:bg-slate-950/80 backdrop-blur-2xl border-b border-white/20 dark:border-slate-800/50 px-4 pt-3 pb-6 space-y-2 transition-colors shadow-2xl animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeMenu === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={() => {
                  setActiveMenu(item.href);
                  setIsMobileMenuOpen(false);
                }}
                className={`block px-4 py-2.5 rounded-xl text-base font-medium transition-colors ${
                  isActive ? "bg-blue-50 dark:bg-slate-900 text-blue-900 dark:text-blue-400 font-semibold border-l-4 border-blue-900 dark:border-blue-500" : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-900"
                }`}
              >
                {item.label}
              </a>
            );
          })}
          <div className="pt-3">
            <a
              href="#kontak"
              onClick={() => {
                setActiveMenu("#kontak");
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-center px-4 py-3 text-sm font-semibold text-white bg-linear-to-r from-blue-900 to-blue-800 dark:from-blue-800 dark:to-blue-700 rounded-xl hover:opacity-95 hover:scale-[1.02] transition-all duration-200 shadow-lg shadow-blue-900/25 active:scale-95"
            >
              Hubungi Kami
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
