import { useCallback, useEffect, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const root = () => document.documentElement;

function readStoredTheme() {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null; // mis. mode privat Safari / storage diblokir
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* abaikan */
  }
}

function subscribe(onChange) {
  const observer = new MutationObserver(onChange);
  observer.observe(root(), { attributes: true, attributeFilter: ["class"] });
  return () => observer.disconnect();
}
const getSnapshot = () => root().classList.contains("dark");
const getServerSnapshot = () => false; // sama di server & klien saat hydration

export default function useTheme() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemChange = (e) => {
      if (!readStoredTheme()) root().classList.toggle("dark", e.matches);
    };
    media.addEventListener("change", onSystemChange);
    return () => media.removeEventListener("change", onSystemChange);
  }, []);

  const toggle = useCallback(() => {
    const next = !getSnapshot();
    root().classList.toggle("dark", next);
    storeTheme(next ? "dark" : "light");
  }, []);

  return { isDark, toggle };
}
