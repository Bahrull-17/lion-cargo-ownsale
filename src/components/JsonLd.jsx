// Menyisipkan data terstruktur (JSON-LD) ke dalam halaman. Google membaca JSON-LD di <head> maupun <body>.
// "<" di-escape agar teks di dalam data tidak bisa menutup tag <script> lebih awal.
export default function JsonLd({ data }) {
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
