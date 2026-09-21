"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { OrderType } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { isValidPhone, formatVND } from "@/lib/format";
import { calcCartSubtotal } from "@/lib/price";
import {
  FREE_SHIP_THRESHOLD,
  ORDER_TYPE_LABEL,
  SHIP_FEE,
  calcDeliveryFee,
  createOrder,
} from "@/lib/orders";
import { ORDERS_KEY, readJSON, writeJSON } from "@/lib/storage";
import type { Order } from "@/lib/types";

const TYPES: OrderType[] = ["mang-di", "tai-ban", "giao-hang"];

const TYPE_ICON: Record<OrderType, React.ReactNode> = {
  "mang-di": (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 8h12l-1 12H7z" /><path d="M9 8V6a3 3 0 0 1 6 0v2" /></svg>),
  "tai-ban": (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 10h16M6 10V6h12v4M6 10l-1 10M18 10l1 10M9 14h6" /></svg>),
  "giao-hang": (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M1 8h13v9H1zM14 11h4l3 3v3h-7z" /><circle cx="6" cy="19" r="1.8" /><circle cx="17" cy="19" r="1.8" /></svg>),
};

function fieldError(errors: string[], keys: string[]): string | undefined {
  return errors.find((e) => keys.some((k) => e.toLowerCase().includes(k)));
}

const inputCls = (bad?: string) => `w-full rounded-2xl border bg-white px-4 py-3.5 outline-none transition placeholder:text-ink-soft/60 focus:border-primary focus:ring-2 focus:ring-primary/30 ${bad ? "border-red-500" : "border-line"}`;

export default function CheckoutForm() {
  const router = useRouter();
  const { items, isReady, clear } = useCart();
  const [type, setType] = useState<OrderType>("mang-di");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [table, setTable] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const subtotal = useMemo(() => calcCartSubtotal(items), [items]);
  const fee = calcDeliveryFee(type, subtotal);

  const submit = () => {
    const errs: string[] = [];
    if (name.trim().length < 2) errs.push("Vui lòng nhập tên của bạn.");
    if (!isValidPhone(phone)) errs.push("Số điện thoại phải có 10 số, bắt đầu bằng 0.");
    if (type === "giao-hang" && address.trim().length < 5) {
      errs.push("Vui lòng nhập địa chỉ giao hàng chi tiết.");
    }
    if (type === "tai-ban" && table.trim().length === 0) {
      errs.push("Vui lòng nhập số bàn.");
    }
    if (items.length === 0) errs.push("Giỏ hàng đang trống.");
    setErrors(errs);
    if (errs.length > 0) return;

    const existing = readJSON<Order[]>(ORDERS_KEY, []);
    const order = createOrder({
      customerName: name.trim(),
      phone: phone.trim(),
      address: type === "giao-hang" ? address.trim() : undefined,
      tableNumber: type === "tai-ban" ? table.trim() : undefined,
      notes: notes.trim() || undefined,
      type,
      items,
      existingCodes: new Set(existing.map((o) => o.code)),
    });
    writeJSON(ORDERS_KEY, [...existing, order]);
    clear();
    router.push(`/dat-mon/thanh-cong?code=${order.code}`);
  };

  if (!isReady) {
    return <p className="py-10 text-center text-sm font-semibold text-ink-soft">Đang tải…</p>;
  }

  const nameErr = fieldError(errors, ["tên"]);
  const phoneErr = fieldError(errors, ["điện thoại", "10 số"]);
  const addrErr = fieldError(errors, ["địa chỉ"]);
  const tableErr = fieldError(errors, ["số bàn"]);
  const cartErr = fieldError(errors, ["giỏ hàng"]);

  return (
    <div className="space-y-5">
      <section aria-label="Hình thức nhận món">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-soft">Hình thức nhận món</p>
        <div className="mt-2 grid grid-cols-3 gap-2" role="radiogroup">
          {TYPES.map((t) => (
            <button key={t} role="radio" aria-checked={type === t} onClick={() => setType(t)}
              className={`flex flex-col items-center gap-1.5 rounded-2xl border px-2 py-3.5 text-[13px] font-bold transition ${type === t ? "border-primary bg-primary text-white shadow-md" : "border-line bg-white text-ink hover:border-primary"}`}>
              {TYPE_ICON[t]}
              {ORDER_TYPE_LABEL[t]}
            </button>
          ))}
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5 shadow-sm">
        <h2 className="font-display text-lg text-ink">Thông tin liên hệ</h2>
        <div className="mt-4 grid gap-4">
          <div>
            <label htmlFor="co-name" className="mb-1.5 block text-sm font-bold text-ink">Tên của bạn <span className="text-red-500">*</span></label>
            <input id="co-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="VD: Minh Anh" autoComplete="name" className={inputCls(nameErr)} />
            {nameErr && <p className="mt-1.5 text-[13px] font-semibold text-red-500">{nameErr}</p>}
          </div>
          <div>
            <label htmlFor="co-phone" className="mb-1.5 block text-sm font-bold text-ink">Số điện thoại <span className="text-red-500">*</span></label>
            <input id="co-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="10 số, bắt đầu bằng 0" inputMode="tel" autoComplete="tel" className={inputCls(phoneErr)} />
            {phoneErr && <p className="mt-1.5 text-[13px] font-semibold text-red-500">{phoneErr}</p>}
          </div>
          {type === "giao-hang" && (
            <div>
              <label htmlFor="co-addr" className="mb-1.5 block text-sm font-bold text-ink">Địa chỉ giao hàng <span className="text-red-500">*</span></label>
              <input id="co-addr" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Số nhà, đường, phường…" autoComplete="street-address" className={inputCls(addrErr)} />
              {addrErr && <p className="mt-1.5 text-[13px] font-semibold text-red-500">{addrErr}</p>}
            </div>
          )}
          {type === "tai-ban" && (
            <div>
              <label htmlFor="co-table" className="mb-1.5 block text-sm font-bold text-ink">Số bàn <span className="text-red-500">*</span></label>
              <input id="co-table" value={table} onChange={(e) => setTable(e.target.value)} placeholder="VD: B12" className={inputCls(tableErr)} />
              {tableErr && <p className="mt-1.5 text-[13px] font-semibold text-red-500">{tableErr}</p>}
            </div>
          )}
          <div>
            <label htmlFor="co-notes" className="mb-1.5 block text-sm font-bold text-ink">Ghi chú <span className="font-medium text-ink-soft">(không bắt buộc)</span></label>
            <textarea id="co-notes" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Ít đá, ít đường…" rows={2} className={`${inputCls()} resize-none`} />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-line bg-white p-5 text-sm text-ink" aria-label="Tóm tắt đơn">
        <div className="flex justify-between text-ink-soft"><span>Tạm tính ({items.length} dòng)</span><span className="font-bold text-ink">{formatVND(subtotal)}</span></div>
        <div className="mt-1.5 flex justify-between text-ink-soft"><span>Phí giao hàng</span><span className="font-bold text-ink">{fee === 0 ? "Miễn phí" : formatVND(fee)}</span></div>
        {type === "giao-hang" && subtotal < FREE_SHIP_THRESHOLD && (
          <p className="mt-2 rounded-xl bg-blush px-3 py-2 text-[13px] font-semibold text-ink">Đơn từ {formatVND(FREE_SHIP_THRESHOLD)} được miễn phí ship (còn thiếu {formatVND(FREE_SHIP_THRESHOLD - subtotal)}).</p>
        )}
        <div className="mt-3 flex justify-between border-t border-line pt-3 font-display text-lg text-ink"><span>Tổng cộng</span><span>{formatVND(subtotal + fee)}</span></div>
        <p className="mt-1.5 text-xs text-ink-soft">Thanh toán tiền mặt khi nhận món (phí ship nếu có: {formatVND(SHIP_FEE)}).</p>
      </section>

      {cartErr && <p className="rounded-2xl border border-red-500 bg-white px-4 py-3 text-sm font-semibold text-red-500">{cartErr}</p>}

      <button onClick={submit} className="w-full rounded-full bg-primary py-4 text-base font-extrabold text-white transition hover:bg-primary-deep active:scale-[0.99]">
        Xác nhận đặt món · {formatVND(subtotal + fee)}
      </button>
    </div>
  );
}
