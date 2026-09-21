import CheckoutForm from "@/components/checkout-form";

export const metadata = {
  title: "Đặt món",
  description: "Xác nhận thông tin và đặt món — thanh toán tiền mặt.",
};

export default function DatMonPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:pt-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Bước 2 · Xác nhận</p>
      <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Đặt món</h1>
      <p className="mt-2 text-[15px] text-ink-soft">Điền thông tin nhận món — quán sẽ chuẩn bị ngay.</p>
      <div className="mt-5">
        <CheckoutForm />
      </div>
    </div>
  );
}
