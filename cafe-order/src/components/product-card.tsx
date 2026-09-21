import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatVND } from "@/lib/format";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/mon/${product.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-[0_1px_2px_rgba(28,30,44,0.06),0_10px_24px_rgba(28,30,44,0.08)] transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-[0_2px_4px_rgba(28,30,44,0.08),0_18px_36px_rgba(28,30,44,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white active:translate-y-0"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-paper">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
        />
        {product.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-extrabold tracking-tight text-white shadow-sm">
            Nổi bật
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-display line-clamp-1 text-base font-bold text-ink">
          {product.name}
        </h3>
        <p className="mt-1 line-clamp-2 min-h-8 text-sm leading-relaxed text-ink-soft">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
          <span className="text-base font-extrabold tabular-nums text-ink">
            {formatVND(product.basePrice)}
          </span>
          <span className="inline-flex min-h-9 items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-bold text-white transition-colors duration-200 group-hover:bg-primary-deep">
            Chọn
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            >
              <path
                d="M3 8h9M8.5 4.5 12 8l-3.5 3.5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
