'use client';
import Script from 'next/script';

export default function ProductSeo({ p }: { p: any }) {
  const data = {
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": p.title,
    "sku": p.sku,
    "image": p.images,
    "description": p.seoDescription || p.shortDescription || p.title,
    "brand": { "@type": "Brand", "name": p.brand || "Spectrum-F" },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "RUB",
      "price": (p.price/100).toFixed(2),
      "availability": p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      "url": `https://example.ru/katalog/${p.slug}`
    }
  };
  return <Script id="ld-product" type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(data)}} />;
}
