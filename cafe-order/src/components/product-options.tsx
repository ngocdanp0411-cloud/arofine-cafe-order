"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { calcUnitPrice } from "@/lib/price";
import { formatVND } from "@/lib/format";
import { useCart } from "@/hooks/use-cart";

const SIZE_ML: Record<string, string> = {
  s: "250 ml",
  m: "400 ml",
  l: "550 ml",
};

function sizeHint(sizeId: string, label: string): string {
  if (SIZE_ML[sizeId]) return `${label} (${SIZE_ML[sizeId]})`;
  return label;
}

function sizeTotal(product: Product, sizeId: string): number {
  const size = product.sizes.find((s) => s.id === sizeId);
  return product.basePrice + (size?.priceDelta ?? 0);
}

export default function ProductOptions({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [sizeId, setSizeId] = useState(product.sizes[0]?.id ?? "");
  const [toppingIds, setToppingIds] = useState<string[]>([]);
  const [qty, setQty] = useState(1);
  const [note, setNote] = useState("");
  const [added, setAdded] = useState(false);

  const unitPrice = useMemo(
    () => calcUnitPrice(product, sizeId, toppingIds),
    [product, sizeId, toppingIds],
  );

  const toggleTopping = (id: string) => {
    setToppingIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id],
    );
    setAdded(false);
  };

  const handleAdd = () => {
    addItem({
      productId: product.id,
      sizeId,
      toppingIds,
      quantity: qty,
      unitPrice,
      note: note.trim() || undefined,
    });
    setAdded(true);
  };

  return (
    <div className="mt-5">
      <fieldset>
        <legend className="sr-only">Chọn size</legend>
        <div className="space-y-2.5">
          {product.sizes.map((s) => {
            const selected = sizeId === s.id;
            return (
              <button
                key={s.id}
                onClick={() => { setSizeId(s.id); setAdded(false); }}
                aria-pressed={selected}
                className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border-2 px-4 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                  selected
                    ? "border-primary bg-white"
                    : "border-line bg-white hover:border-primary"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    selected ? "border-primary" : "border-line"
                  }`}
                >
                  {selected && <span className="h-2.5 w-2.5 rounded-full bg-primary" />}
                </span>
                <span className="flex-1 text-[15px] font-bold text-ink">
                  {sizeHint(s.id, s.label)}
                </span>
                <span className="text-[15px] font-extrabold tabular-nums text-ink">
                  {formatVND(sizeTotal(product, s.id))}
                </span>
              </button>
            );
          })}
        </div>
      </fieldset>

      {product.toppings.length > 0 && (
        <div className="mt-5">
          <p className="text-sm font-extrabold text-ink">
            Thêm topping
            {toppingIds.length > 0 && (
              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-extrabold tabular-nums text-white">
                {toppingIds.length}
              </span>
            )}
          </p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            {product.toppings.map((t) => {
              const on = toppingIds.includes(t.id);
              return (
                <button
                  key={t.id}
                  onClick={() => toggleTopping(t.id)}
                  aria-pressed={on}
                  className={`min-h-11 rounded-full border px-4 py-2 text-sm font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                    on
                      ? "border-primary bg-primary text-white"
                      : "border-line bg-white text-ink-soft"
                  }`}
                >
                  {t.name} · <span className="tabular-nums">+{formatVND(t.price)}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <input
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Ghi chú (ít đá, ít đường…)"
        maxLength={120}
        aria-label="Ghi chú cho món"
        className="mt-5 w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-base text-ink outline-none placeholder:text-ink-soft focus:border-primary focus:ring-2 focus:ring-primary/20"
      />

      {added && (
        <p className="mt-3 rounded-2xl border border-line bg-white px-4 py-3 text-sm font-bold text-green-600">
          Đã thêm vào giỏ — mở tab Giỏ để đặt món.
        </p>
      )}

      <div className="sticky bottom-24 z-30 mt-5 flex items-center gap-3 md:static">
        <div className="flex items-center rounded-full border border-line bg-white px-1 py-1">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full text-xl font-black text-ink active:bg-paper"
            aria-label="Giảm số lượng"
          >−</button>
          <span className="w-8 text-center text-base font-extrabold tabular-nums text-ink" aria-live="polite">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(20, q + 1))}
            className="flex h-11 w-11 items-center justify-center rounded-full text-xl font-black text-ink active:bg-paper"
            aria-label="Tăng số lượng"
          >+</button>
        </div>
        <button
          onClick={handleAdd}
          className="flex min-h-14 flex-1 items-center justify-between rounded-full bg-primary px-6 text-base font-extrabold text-white shadow-lg transition-colors hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.98]"
        >
          <span className="uppercase tracking-wide">Thêm vào giỏ</span>
          <span className="tabular-nums">{formatVND(unitPrice * qty)}</span>
        </button>
      </div>
    </div>
  );
}
