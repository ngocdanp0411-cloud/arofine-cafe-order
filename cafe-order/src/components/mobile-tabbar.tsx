"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/hooks/use-cart";
import { countCartItems } from "@/lib/price";

const TABS = [
  {
    href: "/",
    label: "Trang chủ",
    icon: (
      <path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z M9 22V12h6v10" />
    ),
  },
  {
    href: "/thuc-don",
    label: "Thực đơn",
    icon: (
      <path d="M4 6h16M4 12h16M4 18h10" />
    ),
  },
  {
    href: "/gio-hang",
    label: "Giỏ",
    icon: (
      <path d="M6 7h15l-1.5 9h-12Z M6 7l-1-4H2 M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z M17 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    ),
  },
  {
    href: "/theo-doi-don",
    label: "Đơn",
    icon: (
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2Z M9 8h6M9 12h6" />
    ),
  },
];

export default function MobileTabbar() {
  const pathname = usePathname();
  const { items } = useCart();
  const count = countCartItems(items);

  return (
    <nav
      aria-label="Điều hướng chính"
      className="fixed inset-x-4 bottom-4 z-40 [margin-bottom:env(safe-area-inset-bottom)] md:hidden"
    >
      <div className="flex items-center justify-between gap-1 rounded-full border border-line bg-white/90 px-2 py-2 shadow-[0_12px_40px_rgba(28,30,44,0.14)] backdrop-blur-xl">
        {TABS.map((tab) => {
          const active =
            tab.href === "/" ? pathname === "/" : pathname.startsWith(tab.href);
          return (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={active ? "page" : undefined}
              className={`relative flex flex-1 flex-col items-center gap-0.5 rounded-full px-2 py-2 text-[11px] font-bold transition-colors ${
                active ? "bg-primary text-white" : "text-ink-soft"
              }`}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {tab.icon}
              </svg>
              {tab.label}
              {tab.href === "/gio-hang" && count > 0 && (
                <span className="absolute right-3 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-black text-white">
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
