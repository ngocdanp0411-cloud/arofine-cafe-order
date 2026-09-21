import { Suspense } from "react";
import OrderLookup from "@/components/order-lookup";

export const metadata = {
  title: "Theo dõi đơn",
  description: "Tra cứu trạng thái đơn hàng bằng mã đơn.",
};

export default function TheoDoiDonPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:pt-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Cập nhật trực tiếp</p>
      <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Theo dõi đơn</h1>
      <p className="mt-2 text-[15px] text-ink-soft">Nhập mã đơn nhận được sau khi đặt món.</p>
      <div className="mt-5">
        <Suspense fallback={<p className="py-8 text-center text-sm font-semibold text-ink-soft">Đang tải…</p>}>
          <OrderLookup />
        </Suspense>
      </div>
    </div>
  );
}
