import Link from "next/link";
import AdminGate from "@/components/admin-gate";

export const metadata = { title: "Quản lý" };

const CARDS = [
  { href: "/admin/don-hang", title: "Đơn hàng", desc: "Xem và cập nhật trạng thái đơn.", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M6 7h15l-1.5 9h-12z" /><path d="M6 7l-1-3H2" /><circle cx="9" cy="20" r="1.6" /><circle cx="17" cy="20" r="1.6" /></svg>) },
  { href: "/admin/menu", title: "Thực đơn", desc: "Bật/tắt món, sửa giá, món nổi bật.", icon: (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M4 6h16M4 12h16M4 18h10" /></svg>) },
];

export default function AdminPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:pt-10">
      <AdminGate>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Nội bộ</p>
        <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Quản lý quán</h1>
        <p className="mt-2 text-[15px] text-ink-soft">Mọi thao tác lưu ngay trên thiết bị này.</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          {CARDS.map((c) => (
            <Link key={c.href} href={c.href} className="group rounded-3xl border border-line bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary text-white">{c.icon}</span>
              <p className="mt-3 font-display text-xl text-ink">{c.title}</p>
              <p className="mt-1 text-sm text-ink-soft">{c.desc}</p>
            </Link>
          ))}
        </div>
      </AdminGate>
    </div>
  );
}
