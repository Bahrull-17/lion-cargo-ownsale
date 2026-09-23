import { useEffect, useRef } from "react";
import { Routes, Route, useLocation, useNavigationType } from "react-router-dom";

// Layout utama
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Bagian halaman Beranda
import Hero from "./components/Hero";
import AirlinePartners from "./components/AirlinePartners";
import Services from "./components/Services";
import FlyingPlaneBanner from "./components/FlyingPlaneBanner";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import Testimoni from "./components/Testimoni";
import FaQ from "./components/FaQ";
import Contact from "./components/Contact";

// Halaman terpisah
import CekOngkirPage from "./pages/CekOngkirPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ROUTES } from "./config/routes";

/**
 * Mengatur posisi scroll setiap kali lokasi berubah:
 * - ada #hash  -> gulir ke elemen tersebut (offset navbar diatur lewat scroll-padding-top di index.css)
 * - tanpa hash -> gulir ke atas
 * - pindah halaman / pertama kali dibuka -> langsung (tanpa animasi); klik menu di halaman yang sama -> halus
 * - tombol Back/Forward browser -> dibiarkan, browser memulihkan posisi sendiri
 */
function ScrollManager() {
  const { pathname, hash, key } = useLocation();
  const navigationType = useNavigationType();
  const previousPath = useRef(null);

  useEffect(() => {
    const isFirstRender = previousPath.current === null;
    const pathChanged = previousPath.current !== pathname;
    previousPath.current = pathname;

    const behavior = isFirstRender || pathChanged ? "instant" : "smooth";

    if (hash) {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
        return;
      }
    }
    if (navigationType === "POP" && !isFirstRender) return;
    window.scrollTo({ top: 0, left: 0, behavior });
  }, [pathname, hash, key, navigationType]);

  return null;
}

function HomePage() {
  return (
    <main>
      <Hero />
      <AirlinePartners />
      <Services />
      <FlyingPlaneBanner />
      <AboutUs />
      <Features />
      <Testimoni />
      <FaQ />
      <Contact />
    </main>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <ScrollManager />
      <Navbar />

      <Routes>
        <Route path={ROUTES.home} element={<HomePage />} />
        <Route path={ROUTES.cekOngkir} element={<CekOngkirPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}
