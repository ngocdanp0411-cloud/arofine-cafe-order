"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { PRODUCTS } from "@/data/menu";
import { MENU_OVERRIDE_KEY, readJSON, writeJSON, removeKey } from "@/lib/storage";
import { formatVND } from "@/lib/format";
import AdminGate from "@/components/admin-gate";

export default function AdminMenu() {
  // Lazy-init: component chỉ render sau AdminGate (client-only) nên đọc localStorage ngay được.
  const [menu, setMenu] = useState<Product[]>(() => {
    const override = readJSON<Product[]>(MENU_OVERRIDE_KEY, []);
    if (override.length === 0) return PRODUCTS;
    const map = new Map(override.map((p) => [p.id, p]));
    return PRODUCTS.map((p) => map.get(p.id) ?? p);
  });

  const persist = (next: Product[]) => {
    setMenu(next);
    writeJSON(MENU_OVERRIDE_KEY, next);
  };

  const toggleAvailable = (id: string) =>
    persist(menu.map((p) => (p.id === id ? { ...p, isAvailable: !p.isAvailable } : p)));

  const toggleFeatured = (id: string) =>
    persist(menu.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p)));

  const changePrice = (id: string, price: number) => {
    if (!Number.isFinite(price) || price < 0) return;
    persist(menu.map((p) => (p.id === id ? { ...p, basePrice: Math.round(price) } : p)));
  };

  const reset = () => {
    removeKey(MENU_OVERRIDE_KEY);
    setMenu(PRODUCTS);
  };

  if (menu.length === 0) return <p className="text-sm font-medium text-ink-soft">Đang tải…</p>;

  return (
    <AdminGate>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Vận hành</p>
          <h1 className="mt-1 font-display text-3xl text-ink">Thực đơn</h1>
        </div>
        <button onClick={reset} className="shrink-0 text-xs font-bold text-ink-soft underline underline-offset-4 hover:text-ink">
          Khôi phục gốc
        </button>
      </div>
      <div className="mt-4 space-y-3">
        {menu.map((p) => (
          <article key={p.id} className="rounded-3xl border border-line bg-white p-4 shadow-sm sm:p-5">
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-lg text-ink">{p.name}</p>
              <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${p.isAvailable ? "bg-green-600 text-white" : "bg-paper text-ink-soft"}`}>
                {p.isAvailable ? "Đang bán" : "Tạm ẩn"}
              </span>
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2 border-t border-dashed border-line pt-3">
              <label className="flex items-center gap-2 text-sm font-semibold text-ink">
                Giá:
                <input type="number" defaultValue={p.basePrice} min={0} step={1000}
                  onBlur={(e) => changePrice(p.id, Number(e.target.value))}
                  aria-label={`Giá ${p.name}`}
                  className="w-28 rounded-xl border border-line bg-white px-2.5 py-2 font-bold text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/30"
                />
                <span className="text-xs font-medium text-ink-soft">{formatVND(p.basePrice)}</span>
              </label>
              <button onClick={() => toggleAvailable(p.id)} className="rounded-full border border-line px-3.5 py-2 text-xs font-bold text-ink transition hover:border-primary">
                {p.isAvailable ? "Ẩn món" : "Hiện món"}
              </button>
              <button onClick={() => toggleFeatured(p.id)}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold transition ${p.isFeatured ? "bg-primary text-white" : "border border-line text-ink hover:border-primary"}`}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill={p.isFeatured ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinejoin="round"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.8-5.4 2.8 1-6.1L3.2 9.5l6.1-.9z" /></svg>
                {p.isFeatured ? "Nổi bật" : "Gắn nổi bật"}
              </button>
            </div>
          </article>
        ))}
      </div>
    </AdminGate>
  );
}
