import { useEffect } from "react";

// Daftar tag <meta>/<link> di <head> yang bisa diganti per halaman, dan cara mencari/membuatnya.
const META_FIELDS = [
  { key: "description", selector: 'meta[name="description"]', attr: "content", make: () => setAttrs(document.createElement("meta"), { name: "description" }) },
  { key: "robots", selector: 'meta[name="robots"]', attr: "content", make: () => setAttrs(document.createElement("meta"), { name: "robots" }) },
  { key: "canonical", selector: 'link[rel="canonical"]', attr: "href", make: () => setAttrs(document.createElement("link"), { rel: "canonical" }) },
  { key: "ogTitle", selector: 'meta[property="og:title"]', attr: "content", make: () => setAttrs(document.createElement("meta"), { property: "og:title" }) },
  { key: "ogDescription", selector: 'meta[property="og:description"]', attr: "content", make: () => setAttrs(document.createElement("meta"), { property: "og:description" }) },
  { key: "ogUrl", selector: 'meta[property="og:url"]', attr: "content", make: () => setAttrs(document.createElement("meta"), { property: "og:url" }) },
  { key: "ogImage", selector: 'meta[property="og:image"]', attr: "content", make: () => setAttrs(document.createElement("meta"), { property: "og:image" }) },
  { key: "ogTitle", selector: 'meta[name="twitter:title"]', attr: "content", make: () => setAttrs(document.createElement("meta"), { name: "twitter:title" }) },
  { key: "ogDescription", selector: 'meta[name="twitter:description"]', attr: "content", make: () => setAttrs(document.createElement("meta"), { name: "twitter:description" }) },
  { key: "ogImage", selector: 'meta[name="twitter:image"]', attr: "content", make: () => setAttrs(document.createElement("meta"), { name: "twitter:image" }) },
];

function setAttrs(el, attrs) {
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
}

export default function useDocumentMeta(meta) {
  useEffect(() => {
    if (!meta) return;

    const previousTitle = document.title;
    if (meta.title) document.title = meta.title;

    const restoreFns = [];
    for (const field of META_FIELDS) {
      const value = meta[field.key];
      if (value == null) continue;

      let el = document.head.querySelector(field.selector);
      const created = !el;
      if (created) {
        el = field.make();
        document.head.appendChild(el);
      }
      const previousValue = created ? null : el.getAttribute(field.attr);
      el.setAttribute(field.attr, value);

      restoreFns.push(() => {
        if (created) el.remove();
        else el.setAttribute(field.attr, previousValue ?? "");
      });
    }

    return () => {
      document.title = previousTitle;
      for (let i = restoreFns.length - 1; i >= 0; i--) restoreFns[i]();
    };
  }, [meta]);
}
