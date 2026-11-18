import { useEffect, useRef } from "react";

// Memunculkan elemen dengan halus saat masuk layar. Tanpa dependensi animasi.
// HTML prerender dan render pertama selalu terlihat penuh (aman untuk mesin pencari dan hidrasi); baru setelah dimuat,
// elemen yang masih di bawah layar disembunyikan sebentar lalu dimunculkan saat di-scroll. CSS-nya ada di index.css.
export default function Reveal({ as: Tag = "div", delay = 0, className = "", children, ...sisa }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (el.getBoundingClientRect().top < window.innerHeight) return undefined; // sudah terlihat: biarkan

    el.dataset.reveal = "hidden";
    const pengamat = new IntersectionObserver(
      ([entri]) => {
        if (entri.isIntersecting) {
          el.dataset.reveal = "shown";
          pengamat.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    pengamat.observe(el);
    return () => pengamat.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`cg-reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...sisa}>
      {children}
    </Tag>
  );
}
