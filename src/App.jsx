import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import AirlinePartners from "./components/AirlinePartners";
import Services from "./components/Services";
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
        {/* Contoh: <Hero /> */}
        {/* Contoh: <Tracking /> */}
      </main>
    </div>
  );
}
