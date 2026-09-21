"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatVND } from "@/lib/format";
import { calcUnitPrice } from "@/lib/price";
import { useCart } from "@/hooks/use-cart";

function QuickAdd({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const sizeId = product.sizes[0]?.id ?? "";

  const add = () => {
    addItem({
      productId: product.id,
      sizeId,
      toppingIds: [],
      quantity: 1,
      unitPrice: calcUnitPrice(product, sizeId, []),
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      onClick={add}
      aria-label={`Thêm nhanh ${product.name} vào giỏ`}
      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg font-black backdrop-blur-md transition-transform active:scale-90 ${
        added ? "bg-primary text-white" : "bg-white/25 text-white"
      }`}
    >
      {added ? (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

export default function SeasonCarousel({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div
      className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2"
      style={{ scrollbarWidth: "none" }}
    >
      {products.map((p) => (
        <article
          key={p.id}
          className="relative w-64 shrink-0 snap-start overflow-hidden rounded-[28px] border border-line bg-ink md:w-72"
        >
          <Link href={`/mon/${p.slug}`} aria-label={p.name}>
            <span className="relative block aspect-[3/4] w-full">
              <Image
                src={p.image}
                alt=""
                fill
                sizes="280px"
                className="object-cover"
                loading="lazy"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/20" />
            </span>
          </Link>
          <p className="absolute left-4 top-4 text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/80">
            Món theo mùa
          </p>
          <div className="absolute inset-x-4 bottom-4">
            <Link href={`/mon/${p.slug}`}>
              <h3 className="font-display text-2xl font-bold italic leading-tight text-white drop-shadow-md">
                {p.name}
              </h3>
            </Link>
            <div className="mt-2 flex items-center justify-between">
              <span className="rounded-full bg-white/20 px-4 py-2 text-sm font-extrabold tabular-nums text-white backdrop-blur-md">
                {formatVND(p.basePrice)}
              </span>
              <QuickAdd product={p} />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
