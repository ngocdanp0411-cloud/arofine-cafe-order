"use client";

import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Category, Product } from "@/lib/types";
import { stripDiacritics } from "@/lib/format";
import ProductCard from "@/components/product-card";

type SortKey = "popular" | "price-asc" | "price-desc" | "name";

const SORTS: { id: SortKey; label: string }[] = [
  { id: "popular", label: "Nổi bật" },
  { id: "price-asc", label: "Giá tăng dần" },
  { id: "price-desc", label: "Giá giảm dần" },
  { id: "name", label: "Tên A–Z" },
];

export default function MenuBrowser({
  products,
  categories,
}: {
  products: Product[];
  categories: Category[];
}) {
  const router = useRouter();
  const params = useSearchParams();
  const [cat, setCat] = useState(params.get("cat") ?? "all");
  const [query, setQuery] = useState(params.get("q") ?? "");
  const [sort, setSort] = useState<SortKey>(
    (params.get("sort") as SortKey) || "popular",
  );

  const syncUrl = (next: { cat: string; q: string; sort: SortKey }) => {
    const sp = new URLSearchParams();
    if (next.cat !== "all") sp.set("cat", next.cat);
    if (next.q) sp.set("q", next.q);
    if (next.sort !== "popular") sp.set("sort", next.sort);
    router.replace(`/thuc-don${sp.size ? `?${sp}` : ""}`, { scroll: false });
  };

  const resetAll = () => {
    setCat("all");
    setQuery("");
    setSort("popular");
    router.replace("/thuc-don", { scroll: false });
  };

  const filtered = useMemo(() => {
    const q = stripDiacritics(query.trim());
    let list = products.filter((p) => {
      if (cat !== "all" && p.categoryId !== cat) return false;
      if (!q) return true;
      const hay = stripDiacritics(`${p.name} ${p.description}`);
      return hay.includes(q);
    });
    list = [...list].sort((a, b) => {
      if (sort === "price-asc") return a.basePrice - b.basePrice;
      if (sort === "price-desc") return b.basePrice - a.basePrice;
      if (sort === "name") return a.name.localeCompare(b.name, "vi");
      return Number(b.isFeatured) - Number(a.isFeatured);
    });
    return list;
  }, [products, cat, query, sort]);

  return (
    <div>
      <style>{`
        @keyframes menu-rise {
          from { opacity: 0; transform: translateY(14px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .menu-grid > * { animation: menu-rise 450ms cubic-bezier(0.22,1,0.36,1) both; }
        .menu-grid > *:nth-child(2) { animation-delay: 40ms; }
        .menu-grid > *:nth-child(3) { animation-delay: 80ms; }
        .menu-grid > *:nth-child(4) { animation-delay: 120ms; }
        .menu-grid > *:nth-child(5) { animation-delay: 160ms; }
        .menu-grid > *:nth-child(6) { animation-delay: 200ms; }
        .menu-grid > *:nth-child(7) { animation-delay: 240ms; }
        .menu-grid > *:nth-child(n+8) { animation-delay: 280ms; }
        @media (prefers-reduced-motion: reduce) {
          .menu-grid > * { animation: none; }
        }
      `}</style>

      <div className="rounded-2xl border border-line bg-white p-3 shadow-[0_1px_2px_rgba(28,30,44,0.06)] md:p-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <label className="relative block flex-1">
            <span className="sr-only">Tìm món</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft"
            >
              <circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="m13.5 13.5 3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                syncUrl({ cat, q: e.target.value, sort });
              }}
              placeholder="Tìm món… (vd: bạc xỉu)"
              className="w-full rounded-full border border-line bg-paper py-3 pl-11 pr-4 text-base text-ink outline-none placeholder:text-ink-soft focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </label>
          <label className="flex items-center gap-2">
            <span className="whitespace-nowrap text-sm font-bold text-ink">
              Sắp xếp
            </span>
            <select
              value={sort}
              onChange={(e) => {
                const next = e.target.value as SortKey;
                setSort(next);
                syncUrl({ cat, q: query, sort: next });
              }}
              className="min-h-11 flex-1 cursor-pointer rounded-full border border-line bg-paper px-4 py-2.5 text-base font-semibold text-ink outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 md:flex-none"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>{s.label}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Danh mục món">
          <button
            onClick={() => { setCat("all"); syncUrl({ cat: "all", q: query, sort }); }}
            aria-pressed={cat === "all"}
            className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${cat === "all" ? "bg-primary text-white" : "border border-line bg-white text-ink-soft hover:border-primary hover:bg-paper"}`}
          >
            Tất cả
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => { setCat(c.slug); syncUrl({ cat: c.slug, q: query, sort }); }}
              aria-pressed={cat === c.slug}
              className={`min-h-11 shrink-0 whitespace-nowrap rounded-full px-5 py-2 text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${cat === c.slug ? "bg-primary text-white" : "border border-line bg-white text-ink-soft hover:border-primary hover:bg-paper"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold tabular-nums text-ink-soft" aria-live="polite">
        {filtered.length} món{query.trim() && ` cho “${query.trim()}”`}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-line bg-white p-10 text-center">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="mx-auto text-ink-soft">
            <path d="M14 22h26v10a12 12 0 0 1-12 12h-2a12 12 0 0 1-12-12V22Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
            <path d="M40 24h2.5a5.5 5.5 0 0 1 0 11H40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M21 14c0-2 1.5-2.5 1.5-4.5M28 14c0-2 1.5-2.5 1.5-4.5M35 14c0-2 1.5-2.5 1.5-4.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
          <p className="font-display mt-4 text-lg font-bold text-ink">Quán chưa pha món này</p>
          <p className="mx-auto mt-1 max-w-80 text-sm leading-relaxed text-ink-soft">
            Thử từ khóa khác, hoặc xem lại toàn bộ thực đơn của quán.
          </p>
          <button
            onClick={resetAll}
            className="mt-5 min-h-11 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            Xem tất cả món
          </button>
        </div>
      ) : (
        <div className="menu-grid mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
