import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductOptions from "@/components/product-options";
import FavoriteButton from "@/components/favorite-button";
import { getCategories, getMenuProducts } from "@/lib/menu-store";
import { formatVND } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getMenuProducts().find((p) => p.slug === slug);
  if (!product) return { title: "Không tìm thấy món" };
  return {
    title: product.name,
    description: `${product.name} — ${formatVND(product.basePrice)}. ${product.description}`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getMenuProducts().find((p) => p.slug === slug);
  if (!product || !product.isAvailable) notFound();
  const category = getCategories().find((c) => c.id === product.categoryId);

  return (
    <div className="mx-auto max-w-md px-4 pb-8 pt-4 md:max-w-5xl md:pt-8">
      <div className="flex items-center justify-between gap-2">
        <Link
          href="/thuc-don"
          aria-label="Về thực đơn"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M13 8H3M7.5 4.5 4 8l3.5 3.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-ink-soft">
          {category?.name ?? "Thực đơn"}
        </p>
        <Link
          href="/gio-hang"
          aria-label="Xem giỏ hàng"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M6 7h15l-1.5 9h-12Z M6 7l-1-4H2 M9 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z M17 20a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
          </svg>
        </Link>
      </div>

      <div className="relative mt-3 overflow-hidden rounded-[28px] bg-ink md:grid md:grid-cols-2">
        <div className="relative aspect-[4/5] w-full md:aspect-auto md:min-h-[480px]">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />
        </div>
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3 md:static md:bg-white md:p-8">
          <div className="md:hidden">
            <h1 className="font-display text-3xl font-bold italic leading-tight text-white drop-shadow-md">
              {product.name}
            </h1>
            <p className="mt-1 text-sm text-white/85">{product.description}</p>
          </div>
          <div className="hidden md:block">
            <h1 className="font-display text-4xl font-black text-ink">
              {product.name}
            </h1>
            <p className="mt-2 text-ink-soft">{product.description}</p>
            <p className="mt-3 text-xl font-extrabold tabular-nums text-ink">
              Từ {formatVND(product.basePrice)}
            </p>
          </div>
          <div className="shrink-0">
            <FavoriteButton productId={product.id} />
          </div>
        </div>
        {product.isFeatured && (
          <span className="absolute left-4 top-4 rounded-full bg-primary px-3.5 py-1.5 text-xs font-extrabold text-white">
            Nổi bật
          </span>
        )}
      </div>

      <ProductOptions product={product} />
    </div>
  );
}
