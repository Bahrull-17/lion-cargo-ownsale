import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AirlinePartners from "./components/AirlinePartners";
import Services from "./components/Services";
import FlyingPlaneBanner from "./components/FlyingPlaneBanner";
import AboutUs from "./components/AboutUs";
import Features from "./components/Features";
import Testimoni from "./components/Testimoni";
import FaQ from "./components/FaQ";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import CekOngkirSection from "./components/CekOngkirSection";

export default function App() {
  const [isCekOngkirOpen, setIsCekOngkirOpen] = useState(false);

  const handleOpenOngkir = () => setIsCekOngkirOpen(true);
  const handleCloseOngkir = () => setIsCekOngkirOpen(false);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navbar Utama (Terhubung ke modal global) */}
      <Navbar onOpenCekOngkir={handleOpenOngkir} />

      {/* Area Konten */}
      <main>
        <Hero onOpenCekOngkir={handleOpenOngkir} />
        <AirlinePartners />
        <Services />
        <FlyingPlaneBanner />
        <AboutUs />
        <Features />
        <Testimoni />
        <FaQ />
        <Contact />
        <Footer onOpenCekOngkir={handleOpenOngkir} />

        {/* Modal Cek Ongkir Global */}
        <CekOngkirSection isOpen={isCekOngkirOpen} onClose={handleCloseOngkir} />
      </main>
    </div>
  );
}
