import Link from "next/link";

export const metadata = { title: "Đặt món thành công" };

export default async function ThanhCongPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  return (
    <div className="mx-auto max-w-md px-4 pb-16 pt-12 text-center">
      <div className="rounded-3xl border border-line bg-white p-8 shadow-sm">
        <p className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5" /></svg>
        </p>
        <p className="mt-4 text-xs font-bold uppercase tracking-[0.2em] text-green-600">Thành công</p>
        <h1 className="mt-1 font-display text-3xl text-ink">Đặt món thành công!</h1>
        <p className="mt-2 text-sm text-ink-soft">Quán đang chuẩn bị món cho bạn. Lưu mã đơn để theo dõi:</p>
        <p className="mt-4 rounded-2xl bg-ink py-4 font-mono text-2xl font-bold tracking-[0.2em] text-white" aria-live="polite">{code ?? "—"}</p>
        <div className="mt-6 flex flex-col gap-2">
          <Link href={code ? `/theo-doi-don?code=${code}` : "/theo-doi-don"} className="rounded-full bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primary-deep">
            Theo dõi đơn hàng
          </Link>
          <Link href="/thuc-don" className="rounded-full border border-line bg-white py-3.5 text-sm font-bold text-ink transition hover:border-primary">
            Đặt thêm món
          </Link>
        </div>
      </div>
    </div>
  );
}
