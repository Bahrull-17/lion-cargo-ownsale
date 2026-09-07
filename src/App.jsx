import React from "react";
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

export default function App() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Navbar Utama */}
      <Navbar />

      {/* Area Konten Lainnya (Akan diisi komponen terpisah nanti) */}
      <main>
        {<Hero />}
        {<AirlinePartners />}
        {<Services />}
        {<FlyingPlaneBanner />}
        {<AboutUs />}
        {<Features />}
        {<Testimoni />}
        {<FaQ />}
        {<Contact />}
        {<Footer />}

        {/* Contoh: <Tracking /> */}
      </main>
    </div>
  );
}
