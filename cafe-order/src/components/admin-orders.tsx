"use client";

import { useState } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import { ORDERS_KEY, readJSON, writeJSON } from "@/lib/storage";
import { ORDER_STATUS_LABEL, ORDER_TYPE_LABEL } from "@/lib/orders";
import { formatDateTime, formatVND } from "@/lib/format";
import AdminGate from "@/components/admin-gate";

const NEXT_STATUS: Record<OrderStatus, OrderStatus | null> = {
  moi: "dang-chuan-bi",
  "dang-chuan-bi": "dang-giao",
  "dang-giao": "hoan-thanh",
  "hoan-thanh": null,
  "da-huy": null,
};

const STATUS_STYLE: Record<OrderStatus, string> = {
  moi: "bg-primary text-white",
  "dang-chuan-bi": "bg-sky-card text-white",
  "dang-giao": "bg-ink text-white",
  "hoan-thanh": "bg-green-600 text-white",
  "da-huy": "bg-red-500 text-white",
};

export default function AdminOrders() {
  // Lazy-init: component chỉ render sau AdminGate (client-only).
  const [orders, setOrders] = useState<Order[]>(() =>
    readJSON<Order[]>(ORDERS_KEY, []),
  );

  const persist = (next: Order[]) => {
    setOrders(next);
    writeJSON(ORDERS_KEY, next);
  };

  const setStatus = (code: string, status: OrderStatus) => {
    persist(
      orders.map((o) =>
        o.code === code
          ? { ...o, status, timeline: [...o.timeline, { status, at: new Date().toISOString() }] }
          : o,
      ),
    );
  };

  const sorted = [...orders].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <AdminGate>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Vận hành</p>
      <h1 className="mt-1 font-display text-3xl text-ink">Đơn hàng ({orders.length})</h1>
      {sorted.length === 0 ? (
        <p className="mt-4 rounded-3xl border border-dashed border-line bg-white p-8 text-center text-sm font-medium text-ink-soft">Chưa có đơn nào trên thiết bị này.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {sorted.map((o) => {
            const next = NEXT_STATUS[o.status];
            return (
              <article key={o.code} className="rounded-3xl border border-line bg-white p-4 shadow-sm sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-mono text-[15px] font-bold tracking-wider text-ink">{o.code}</p>
                  <span className={`rounded-full px-3 py-1 text-xs font-extrabold ${STATUS_STYLE[o.status]}`}>{ORDER_STATUS_LABEL[o.status]}</span>
                </div>
                <p className="mt-1.5 text-sm text-ink-soft">{o.customerName} · {o.phone} · {ORDER_TYPE_LABEL[o.type]} · {formatDateTime(o.createdAt)}</p>
                {o.address && <p className="text-sm text-ink-soft">Giao: {o.address}</p>}
                {o.tableNumber && <p className="text-sm text-ink-soft">Bàn: {o.tableNumber}</p>}
                <p className="mt-1.5 text-sm font-extrabold text-ink">Tổng: {formatVND(o.total)}</p>
                <div className="mt-3 flex flex-wrap gap-2 border-t border-dashed border-line pt-3">
                  {next && (
                    <button onClick={() => setStatus(o.code, next)} className="rounded-full bg-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary-deep">
                      → {ORDER_STATUS_LABEL[next]}
                    </button>
                  )}
                  {o.status !== "da-huy" && o.status !== "hoan-thanh" && (
                    <button onClick={() => setStatus(o.code, "da-huy")} className="rounded-full border border-red-500 px-4 py-2 text-xs font-bold text-red-500 transition hover:bg-paper">
                      Hủy đơn
                    </button>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </AdminGate>
  );
}
