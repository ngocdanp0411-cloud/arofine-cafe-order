import Link from "next/link";
import CartLines from "@/components/cart-lines";

export const metadata = {
  title: "Giỏ hàng",
  description: "Xem lại món đã chọn trước khi đặt hàng.",
};

export default function GioHangPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:pt-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Bước 1 · Xem lại</p>
      <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Giỏ hàng của bạn</h1>
      <p className="mt-2 text-[15px] text-ink-soft">Kiểm tra món, chỉnh số lượng rồi sang bước đặt món.</p>
      <div className="mt-5">
        <CartLines />
      </div>
      <div className="sticky bottom-4 mt-6 flex gap-3 rounded-3xl border border-line bg-white/95 p-3 shadow-lg backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
        <Link href="/thuc-don" className="flex-1 rounded-full border border-line bg-white py-3.5 text-center text-sm font-bold text-ink transition hover:border-primary">
          Thêm món
        </Link>
        <Link href="/dat-mon" className="flex-1 rounded-full bg-primary py-3.5 text-center text-sm font-extrabold text-white transition hover:bg-primary-deep">
          Đặt món →
        </Link>
      </div>
    </div>
  );
}
