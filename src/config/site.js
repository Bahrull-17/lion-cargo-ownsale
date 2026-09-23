export const SITE = {
  name: "Lion Cargo Ownsale",
  url: "https://lioncargoownsale.com",

  whatsapp: "6285285586828", // format internasional tanpa "+"
  phoneDisplay: "+62 852-8558-6828",
  phoneHref: "tel:+6285285586828",
  email: "admin@lioncargoownsale.com",

  address: {
    place: "Gedung PT Gatrans (Area Kargo Bandara Soekarno-Hatta)",
    street: "Jl. Cengkareng, Pajang, Kec. Benda, Kota Tangerang, Banten",
  },

  mapsUrl: "https://www.google.com/maps/place/GEDUNG+PT+GATRANS/@-6.125061,106.665276,19z/data=!4m6!3m5!1s0x2e6a036700943607:0xb4debe87ebce550c!8m2!3d-6.1252053!4d106.6651638!16s%2Fg%2F11hz6qk2vn?hl=id",
  mapsEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6976695276226!2d106.66258887483015!3d-6.125200060471243!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a036700943607%3A0xb4debe87ebce550c!2sGEDUNG%20PT%20GATRANS!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
};

export const whatsappLink = (customMessage = "Halo Admin, saya ingin informasi lebih lanjut mengenai pengiriman cargo.") => {
  const encodedMessage = encodeURIComponent(customMessage);
  return `https://wa.me/${SITE.whatsapp}?text=${encodedMessage}`;
};

export function mailtoLink(subject, body) {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);
  return `mailto:${SITE.email}${params.length ? `?${params.join("&")}` : ""}`;
}
