"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { countCartItems } from "@/lib/price";

const NAV = [
  { href: "/", label: "Trang chủ" },
  { href: "/thuc-don", label: "Thực đơn" },
  { href: "/theo-doi-don", label: "Theo dõi đơn" },
  { href: "/gioi-thieu", label: "Giới thiệu" },
  { href: "/lien-he", label: "Liên hệ" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const { items } = useCart();
  const count = countCartItems(items);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 md:h-[72px]">
        <Link href="/" className="group flex items-center gap-3" aria-label="AROFine — trang chủ">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary font-display text-lg font-bold text-white transition-transform group-hover:-rotate-6">
            A
          </span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight text-ink">
              AROFine
            </span>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-soft">
              Fine Coffee & Tea
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Điều hướng chính">
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`relative px-3 py-2 text-[15px] font-semibold transition-colors ${
                  active ? "text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {item.label}
                <span
                  className={`absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-primary transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>
        <Link
          href="/gio-hang"
          className="relative inline-flex items-center gap-2 rounded-full bg-primary py-2.5 pl-4 pr-5 text-sm font-bold text-white shadow-[0_2px_12px_rgba(84,87,214,0.35)] transition-colors hover:bg-primary-deep"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 7h15l-1.5 8.5a1 1 0 0 1-1 .5H8.7a1 1 0 0 1-1-.8L5 3.5A1 1 0 0 0 4 3H2" />
            <circle cx="9.5" cy="20" r="1.4" />
            <circle cx="17.5" cy="20" r="1.4" />
          </svg>
          Giỏ hàng
          {count > 0 && (
            <span
              key={count}
              className="badge-pop absolute -right-1.5 -top-1.5 flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 px-1 text-xs font-extrabold text-white"
              aria-label={`${count} món trong giỏ`}
            >
              {count}
            </span>
          )}
        </Link>
      </div>
      <nav className="flex gap-2 overflow-x-auto border-t border-line px-4 py-2.5 md:hidden" aria-label="Điều hướng di động">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              pathname === item.href
                ? "bg-primary text-white"
                : "bg-paper text-ink-soft"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
