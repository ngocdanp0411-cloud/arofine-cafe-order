"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import type { Order } from "@/lib/types";
import { ORDERS_KEY, readJSON } from "@/lib/storage";
import { normalizeOrderCode, ORDER_STATUS_LABEL, ORDER_TYPE_LABEL } from "@/lib/orders";
import { formatDateTime, formatVND } from "@/lib/format";
import { getMenuProducts } from "@/lib/menu-store";
import OrderTimeline from "@/components/order-timeline";

export default function OrderLookup() {
  const params = useSearchParams();
  const [code, setCode] = useState(params.get("code") ?? "");
  const [result, setResult] = useState<Order | "not-found" | null>(() => {
    const initial = params.get("code");
    if (!initial) return null;
    return lookup(initial);
  });

  function lookup(input: string): Order | "not-found" {
    const orders = readJSON<Order[]>(ORDERS_KEY, []);
    const found = orders.find((o) => o.code === normalizeOrderCode(input));
    return found ?? "not-found";
  }

  const search = () => setResult(code.trim() ? lookup(code) : null);
  const menu = getMenuProducts();

  return (
    <div>
      <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); search(); }}>
        <label htmlFor="lookup-code" className="sr-only">Mã đơn hàng</label>
        <input id="lookup-code" value={code} onChange={(e) => setCode(e.target.value)}
          placeholder="Nhập mã đơn (vd: CF-ABC123)" autoComplete="off"
          className="flex-1 rounded-full border border-line bg-white px-5 py-3.5 font-bold uppercase text-ink outline-none placeholder:normal-case placeholder:font-normal placeholder:text-ink-soft/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
        />
        <button type="submit" className="shrink-0 rounded-full bg-primary px-6 py-3.5 text-sm font-bold text-white transition hover:bg-primary-deep">
          Tra cứu
        </button>
      </form>

      <div className="mt-4">
        {!result && (
          <div className="rounded-3xl border border-dashed border-line bg-white/70 p-8 text-center">
            <p className="font-display text-lg text-ink">Nhập mã để xem hành trình ly cà phê</p>
            <p className="mt-1 text-sm text-ink-soft">Mã đơn có trên màn hình xác nhận sau khi đặt món.</p>
          </div>
        )}
        {result === "not-found" && (
          <div className="rounded-3xl border border-dashed border-line bg-white p-8 text-center">
            <p className="font-bold text-ink">Không tìm thấy đơn {normalizeOrderCode(code)}</p>
            <p className="mt-1 text-sm text-ink-soft">Kiểm tra lại mã đơn trên màn hình xác nhận. Lưu ý: đơn chỉ lưu trên thiết bị đã đặt.</p>
          </div>
        )}
        {result && result !== "not-found" && (
          <div className="space-y-3">
            <article className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-lg font-bold tracking-wider text-ink">{result.code}</p>
                <span className="rounded-full bg-primary px-3 py-1 text-xs font-extrabold text-white">{ORDER_STATUS_LABEL[result.status]}</span>
              </div>
              <p className="mt-1.5 text-sm text-ink-soft">{ORDER_TYPE_LABEL[result.type]} · {formatDateTime(result.createdAt)}</p>
              <p className="text-sm font-semibold text-ink">{result.customerName} · {result.phone}</p>
              <div className="mt-3 border-t border-dashed border-line pt-3 text-sm">
                {result.items.map((item) => {
                  const p = menu.find((m) => m.id === item.productId);
                  return (
                    <div key={item.key} className="flex justify-between gap-3 py-1 text-ink">
                      <span>{p?.name ?? "Món"} <span className="font-bold text-ink-soft">× {item.quantity}</span></span>
                      <span className="font-bold text-ink">{formatVND(item.unitPrice * item.quantity)}</span>
                    </div>
                  );
                })}
                <div className="mt-2 flex justify-between border-t border-line pt-2.5 font-display text-base text-ink">
                  <span>Tổng cộng</span><span>{formatVND(result.total)}</span>
                </div>
              </div>
            </article>
            <div className="rounded-3xl border border-line bg-white p-5 shadow-sm sm:p-6">
              <h2 className="mb-4 font-display text-lg text-ink">Hành trình đơn hàng</h2>
              <OrderTimeline timeline={result.timeline} current={result.status} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
