import Link from "next/link";
import ProductCard from "@/components/product-card";
import CategoryGrid from "@/components/category-grid";
import SeasonCarousel from "@/components/season-carousel";
import PairingRow from "@/components/pairing-row";
import {
  getAvailableProducts,
  getCategories,
  getFeaturedProducts,
} from "@/lib/menu-store";
import { formatVND } from "@/lib/format";

export const metadata = {
  title: "Trang chủ",
  description: "AROFine — xem thực đơn và đặt fine coffee & tea online trong 1 phút.",
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const categories = getCategories();
  const available = getAvailableProducts();
  const counts: Record<string, number> = {};
  for (const p of available) counts[p.categoryId] = (counts[p.categoryId] ?? 0) + 1;
  const heroPick = featured[0] ?? available[0];
  const pairings = available.filter((p) => p.categoryId === "banh-ngot");
  const catName = (id: string) => categories.find((c) => c.id === id)?.name ?? "";

  return (
    <div>
      {/* Hero bất đối xứng: editorial trái + thẻ món phải lệch */}
      <section className="overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-10 md:grid-cols-[1.15fr_0.85fr] md:items-center md:pt-16">
          <div className="reveal reveal-1">
            <p className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-ink-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Cà phê đặc sản · Mở 07:00 – 21:00
            </p>
            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.12] tracking-tight text-ink md:text-6xl">
              AROFine —
              <span className="italic text-primary"> fine coffee & tea</span>,
              đặt món trong 1 phút
            </h1>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-soft md:text-lg">
              Cà phê pha máy & phin truyền thống, trà, đá xay và bánh ngọt —
              mang đi, dùng tại bàn hoặc giao tận nơi.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                href="/thuc-don"
                className="rounded-full bg-primary px-7 py-3.5 text-[15px] font-bold text-white shadow-[0_4px_20px_rgba(84,87,214,0.35)] transition-colors hover:bg-primary-deep"
              >
                Xem thực đơn
              </Link>
              <Link
                href="/theo-doi-don"
                className="rounded-full border border-line bg-white px-7 py-3.5 text-[15px] font-bold text-ink transition-colors hover:border-primary hover:bg-paper"
              >
                Theo dõi đơn
              </Link>
            </div>
            <dl className="mt-8 flex gap-8 border-t border-line pt-5">
              {[
                ["15+", "món đặc sản"],
                ["1 phút", "đặt món"],
                ["150K", "miễn phí ship"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl font-bold text-ink">{v}</dt>
                  <dd className="text-[13px] font-medium text-ink-soft">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
          {heroPick && (
            <Link
              href={`/mon/${heroPick.slug}`}
              className="reveal reveal-3 group relative block md:rotate-2 md:transition-transform md:hover:rotate-0"
              aria-label={`Món nổi bật: ${heroPick.name}`}
            >
              <div className="overflow-hidden rounded-[28px] border border-line bg-white shadow-[0_24px_60px_-20px_rgba(28,30,44,0.25)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={heroPick.image}
                  alt={heroPick.name}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">
                      Món được yêu thích · {catName(heroPick.categoryId)}
                    </p>
                    <p className="mt-1 font-display text-xl font-bold text-ink">
                      {heroPick.name}
                    </p>
                  </div>
                  <p className="whitespace-nowrap rounded-full bg-primary px-4 py-2 text-sm font-extrabold text-white">
                    {formatVND(heroPick.basePrice)}
                  </p>
                </div>
              </div>
              <span className="absolute -left-3 top-6 -rotate-6 rounded-full bg-red-500 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-lg">
                Best seller
              </span>
            </Link>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10">
        <div className="reveal reveal-2 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Món theo mùa</p>
            <h2 className="mt-1 font-display text-2xl font-bold italic text-ink md:text-3xl">Uống gì hôm nay?</h2>
          </div>
          <Link href="/thuc-don" className="inline-flex shrink-0 items-center gap-1 text-[15px] font-bold text-ink-soft hover:text-ink">
            Xem tất cả
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
        <div className="mt-5">
          <SeasonCarousel products={featured} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-10">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Món ăn kèm</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-ink md:text-3xl">Thêm vào đơn của bạn</h2>
        <div className="mt-5">
          <PairingRow products={pairings} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-6">
        <div className="reveal reveal-2 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Tuyển chọn của quán</p>
            <h2 className="mt-1 font-display text-2xl font-bold text-ink md:text-3xl">Món nổi bật</h2>
          </div>
          <Link href="/thuc-don" className="inline-flex shrink-0 items-center gap-1 text-[15px] font-bold text-ink-soft hover:text-ink">
            Xem tất cả
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </Link>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
          {featured.map((p, i) => (
            <div key={p.id} className={`reveal reveal-${Math.min(i + 1, 5)}`}>
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Chọn theo gu</p>
        <h2 className="mt-1 font-display text-2xl font-bold text-ink md:text-3xl">Danh mục</h2>
        <div className="mt-5">
          <CategoryGrid categories={categories} counts={counts} />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-14">
        <div className="relative overflow-hidden rounded-[28px] bg-blush p-7 text-ink md:p-12">
          <div className="relative md:max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">Ưu đãi giao hàng</p>
            <p className="mt-2 font-display text-2xl font-bold leading-snug md:text-4xl">
              Đơn từ 150.000đ — quán mời bạn phí ship
            </p>
            <p className="mt-2 text-[15px] text-ink-soft">
              Thanh toán tiền mặt khi nhận hàng — không cần tài khoản, không chờ lâu.
            </p>
            <Link
              href="/thuc-don"
              className="mt-6 inline-block rounded-full bg-primary px-7 py-3.5 text-[15px] font-extrabold text-white transition-colors hover:bg-primary-deep"
            >
              Đặt món ngay
            </Link>
          </div>
          <span aria-hidden="true" className="pointer-events-none absolute -right-8 -top-10 select-none font-display text-[160px] font-bold leading-none text-ink/5 md:text-[240px]">
            150
          </span>
        </div>
      </section>
    </div>
  );
}
