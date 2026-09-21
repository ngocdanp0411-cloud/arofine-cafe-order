import { Suspense } from "react";
import MenuBrowser from "@/components/menu-browser";
import { getAvailableProducts, getCategories } from "@/lib/menu-store";

export const metadata = {
  title: "Thực đơn",
  description: "Thực đơn AROFine: cà phê, trà, đá xay và bánh ngọt.",
};

export default function ThucDonPage() {
  const products = getAvailableProducts();
  const categories = getCategories();
  const featured = products.filter((p) => p.isFeatured).length;
  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 pt-8 md:pt-12">
      <p className="text-xs font-extrabold uppercase tracking-[0.12em] text-ink-soft">
        Thực đơn quán
      </p>
      <h1 className="font-display mt-2 max-w-xl text-balance text-3xl font-black leading-tight text-ink md:text-[2.75rem] md:leading-[1.15]">
        Chọn món hợp vị, quán pha tận tâm
      </h1>
      <div className="mt-4 border-t-2 border-primary pt-1">
        <div className="border-t border-line" />
      </div>
      <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-soft">
        {products.length} món đang bán, trong đó {featured} món nổi bật.
        Chọn món để tùy size và topping theo ý bạn.
      </p>
      <div className="mt-6">
        <Suspense fallback={<p className="text-sm text-ink-soft">Đang tải thực đơn…</p>}>
          <MenuBrowser products={products} categories={categories} />
        </Suspense>
      </div>
    </div>
  );
}
