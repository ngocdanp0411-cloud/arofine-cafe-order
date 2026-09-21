"use client";

import { useState } from "react";
import Image from "next/image";
import type { Product } from "@/lib/types";
import { formatVND } from "@/lib/format";
import { calcUnitPrice } from "@/lib/price";
import { useCart } from "@/hooks/use-cart";

function PairingAdd({ product }: { product: Product }) {
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
      aria-label={`Thêm ${product.name} vào giỏ`}
      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-transform active:scale-90 ${
        added ? "bg-primary text-white" : "bg-paper text-ink"
      }`}
    >
      {added ? (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="m4 10.5 4 4 8-9" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      )}
    </button>
  );
}

export default function PairingRow({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  return (
    <div
      className="-mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2"
      style={{ scrollbarWidth: "none" }}
    >
      {products.map((p) => (
        <div
          key={p.id}
          className="flex w-56 shrink-0 snap-start items-center gap-3 rounded-3xl border border-line bg-white p-3"
        >
          <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-paper">
            <Image src={p.image} alt="" fill sizes="56px" className="object-cover" loading="lazy" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="block truncate text-sm font-bold text-ink">{p.name}</span>
            <span className="text-sm font-extrabold tabular-nums text-ink-soft">
              {formatVND(p.basePrice)}
            </span>
          </span>
          <PairingAdd product={p} />
        </div>
      ))}
    </div>
  );
}
