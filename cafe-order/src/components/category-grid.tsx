import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/lib/types";

export default function CategoryGrid({
  categories,
  counts,
}: {
  categories: Category[];
  counts: Record<string, number>;
}) {
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4">
      {categories.map((cat, i) => (
        <Link
          key={cat.id}
          href={`/thuc-don?cat=${cat.slug}`}
          className="group overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(28,30,44,0.06),0_10px_24px_rgba(28,30,44,0.08)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(28,30,44,0.08),0_18px_36px_rgba(28,30,44,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-paper">
            <Image
              src={`/images/cat-${cat.slug}.svg`}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-xs font-extrabold tabular-nums text-white">
              {String(i + 1).padStart(2, "0")}
            </span>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between gap-2">
              <p className="font-display text-base font-bold text-ink">
                {cat.name}
              </p>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
                className="shrink-0 text-ink-soft transition-all duration-200 group-hover:translate-x-1 group-hover:text-primary"
              >
                <path
                  d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p className="mt-0.5 line-clamp-1 text-sm text-ink-soft">
              {cat.tagline}
            </p>
            <p className="mt-2 inline-block rounded-full bg-paper px-2.5 py-1 text-xs font-bold tabular-nums text-ink-soft">
              {counts[cat.id] ?? 0} món
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
