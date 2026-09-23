import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { HOME_SECTIONS } from "../config/navigation";
import { ROUTES } from "../config/routes";

const ACTIVE_LINE = 120;

export default function useActiveMenu() {
  const { pathname } = useLocation();
  const [homeMenu, setHomeMenu] = useState(HOME_SECTIONS[0].menu);

  useEffect(() => {
    if (pathname !== ROUTES.home) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      let current = HOME_SECTIONS[0].menu;
      for (const { id, menu } of HOME_SECTIONS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) current = menu;
      }
      setHomeMenu(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  if (pathname === ROUTES.home) return homeMenu;
  if (pathname === ROUTES.cekOngkir) return ROUTES.cekOngkir;
  return null;
}
