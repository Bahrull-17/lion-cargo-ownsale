import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { mulaiAnalytics } from "./lib/analytics";

const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);

mulaiAnalytics(); // no-op kalau Measurement ID belum diisi (config/site.js)

const rootElement = document.getElementById("root");

// Kalau HTML sudah berisi hasil prerender, "hidupkan" (hydrate) HTML itu.
// Kalau kosong (mode dev, atau halaman yang belum diprerender), render biasa seperti sebelumnya.
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
