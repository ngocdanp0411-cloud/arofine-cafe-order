"use client";

import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { getMenuProducts } from "@/lib/menu-store";
import { calcCartSubtotal } from "@/lib/price";
import { formatVND } from "@/lib/format";

export default function CartLines() {
  const { items, isReady, setQty, removeLine } = useCart();
  const menu = getMenuProducts();
  const nameOf = (id: string) => menu.find((p) => p.id === id);

  if (!isReady) {
    return <p className="py-10 text-center text-sm font-semibold text-ink-soft">Đang tải giỏ hàng…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-line bg-white p-10 text-center shadow-sm">
        <p className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blush text-ink" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h15l-1.5 9h-12z" /><path d="M6 7l-1-3H2" /><circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" /></svg>
        </p>
        <p className="mt-3 font-display text-xl text-ink">Giỏ hàng đang trống</p>
        <p className="mt-1 text-sm text-ink-soft">Chọn vài món ngon từ thực đơn nhé.</p>
        <Link href="/thuc-don" className="mt-5 inline-block rounded-full bg-primary text-white transition hover:bg-primary-deep">
          Xem thực đơn
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-ink-soft">{items.length} món trong giỏ</p>
      {items.map((item) => {
        const product = nameOf(item.productId);
        const sizeLabel = product?.sizes.find((s) => s.id === item.sizeId)?.label ?? "";
        const toppingNames = item.toppingIds.map((id) => product?.toppings.find((t) => t.id === id)?.name ?? id);
        return (
          <article key={item.key} className="rounded-3xl border border-line bg-white p-4 shadow-[0_1px_0_rgba(51,32,22,0.06)] sm:p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-display text-lg leading-snug text-ink">{product?.name ?? "Món đã ngừng bán"}</h3>
                <p className="mt-1 text-[13px] font-medium text-ink-soft">{sizeLabel}{toppingNames.length > 0 ? ` · ${toppingNames.join(", ")}` : ""}</p>
                {item.note && <p className="mt-1.5 rounded-xl bg-paper px-3 py-1.5 text-[13px] italic text-ink">“{item.note}”</p>}
              </div>
              <button onClick={() => removeLine(item.key)} aria-label="Xóa món" className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-soft transition hover:border-red-500 hover:text-red-500">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M10 4h4M7 7l1 13h8l1-13" /></svg>
              </button>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-dashed border-line pt-3">
              <div className="flex items-center gap-1 rounded-full border border-line bg-paper p-1">
                <button onClick={() => setQty(item.key, item.quantity - 1)} className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-ink transition hover:bg-white" aria-label="Giảm số lượng">−</button>
                <span className="w-7 text-center text-sm font-extrabold text-ink" aria-live="polite">{item.quantity}</span>
                <button onClick={() => setQty(item.key, item.quantity + 1)} className="flex h-8 w-8 items-center justify-center rounded-full text-lg font-bold text-ink transition hover:bg-white" aria-label="Tăng số lượng">+</button>
              </div>
              <p className="text-[15px] font-extrabold text-ink">{formatVND(item.unitPrice * item.quantity)}</p>
            </div>
          </article>
        );
      })}
      <div className="flex items-center justify-between rounded-3xl border border-line bg-white px-5 py-4">
        <span className="text-sm font-semibold text-ink-soft">Tạm tính</span>
        <span className="font-display text-xl tracking-wide text-ink">{formatVND(calcCartSubtotal(items))}</span>
      </div>
    </div>
  );
}
