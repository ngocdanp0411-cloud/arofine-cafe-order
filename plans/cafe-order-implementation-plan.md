# Cafe Order — Implementation Plan

## 1. Outcome

Website đặt cafe mobile-first tiếng Việt theo mẫu lertermer.vn, phạm vi ĐẦY ĐỦ trừ thanh toán online: xem menu → tùy chọn size/topping → giỏ hàng (localStorage) → đặt món (mang đi / tại bàn / giao hàng, thanh toán tiền mặt) → tra cứu đơn bằng mã đơn → admin quản lý menu + đơn hàng. Không viết code app trong plan này.

## 2. Stack & scaffold hiện có (đã khảo sát)

- Root: `/Users/phamngocdan/Downloads/test opencode/cafe-order`, scaffold `create-next-app` nguyên bản.
- `package.json`: `next 16.3.5` (lưu ý: yêu cầu ghi Next 15 nhưng thực tế là 16 — giữ nguyên 16), `react 19.2.8`, `tailwindcss ^4` + `@tailwindcss/postcss`, `typescript ^5`, `eslint-config-next`.
- `src/` App Router + src-dir: chỉ có `src/app/layout.tsx` (Geist font, `lang="en"`), `src/app/page.tsx` (template demo), `src/app/globals.css` (`@import "tailwindcss"`, theme inline). Chưa có `components/`, `lib/`, `data/`. Alias `@/* → ./src/*`. `next.config.ts` rỗng, `postcss.config.mjs` chuẩn Tailwind v4.
- Kết luận: phải làm Phase 0 nền móng (i18n vi, layout chung, theme cafe, seed data) trước khi build tính năng.

## 3. IA / Sitemap (App Router)

| Route | Trang | Ghi chú |
|---|---|---|
| `/` | Trang chủ | hero, món nổi bật, categories, CTA đặt món |
| `/thuc-don` | Thực đơn | categories + search + filter (?cat=, ?q= searchParams) |
| `/mon/[slug]` | Chi tiết món | chọn size/topping, số lượng, thêm giỏ |
| `/gio-hang` | Giỏ hàng | đọc localStorage, sửa SL/xóa |
| `/dat-mon` | Đặt món (checkout) | form tên/SĐT/địa chỉ/notes + kiểu nhận món, COD |
| `/dat-mon/thanh-cong?code=` | Xác nhận đơn | hiện mã đơn + tổng tiền |
| `/theo-doi-don` | Theo dõi đơn | nhập mã đơn → trạng thái + timeline |
| `/gioi-thieu`, `/lien-he` | Giới thiệu / Liên hệ | tĩnh + form liên hệ (mailto/tel, không backend) |
| `/admin`, `/admin/menu`, `/admin/don-hang` | Admin | quản lý menu + đơn, gate PIN đơn giản (xem §6) |

Layout chung: `src/app/layout.tsx` (metadata vi + header/footer/sticky cart bar mobile). Style: Tailwind v4 mobile-first, breakpoint `md:` cho desktop.

## 4. Data model (TypeScript, lưu localStorage)

```ts
type Category = { id: string; slug: string; name: string; order: number };
type ProductSize = { id: string; label: string; priceDelta: number }; // S/M/L
type Topping = { id: string; name: string; price: number };
type Product = { id: string; slug: string; name: string; description: string;
  image: string; basePrice: number; categoryId: string;
  sizes: ProductSize[]; toppings: Topping[]; isAvailable: boolean; isFeatured: boolean };
type CartItem = { key: string; productId: string; sizeId: string;
  toppingIds: string[]; quantity: number; unitPrice: number; note?: string };
type OrderType = "mang-di" | "tai-ban" | "giao-hang";
type OrderStatus = "moi" | "dang-chuan-bi" | "dang-giao" | "hoan-thanh" | "da-huy";
type Order = { code: string; // VD CF-XXXXXX
  customerName: string; phone: string; address?: string; tableNumber?: string;
  notes?: string; type: OrderType; items: CartItem[];
  subtotal: number; deliveryFee: number; total: number;
  status: OrderStatus; createdAt: string; timeline: { status: OrderStatus; at: string }[] };
```

- Keys localStorage: `cafe-cart-v1: CartItem[]`, `cafe-orders-v1: Order[]`, `cafe-menu-override-v1: Product[]`, `cafe-admin-pin-ok: "1"` (session).
- Mã đơn: `CF-` + 6 ký tự base32, check trùng trong `cafe-orders-v1`. Giá = basePrice + priceDelta + Σ topping, tính ở `src/lib/price.ts` (single source).
- Seed: `src/data/menu.ts` (~12 món, 4 categories: ca-phe / tra / da-xay / banh-ngot) + sizes S/M/L + ~6 topping. Dữ liệu thật dùng được, ảnh `public/images/*`.

## 5. Phases (mỗi phase implement độc lập, file <200 dòng, kebab-case)

### Phase 0 — Nền móng + theme + seed
- Tạo/sửa: `src/app/layout.tsx` (lang vi, metadata SEO), `src/app/globals.css` (palette cafe), `src/lib/format.ts` (VND/phone), `src/lib/price.ts`, `src/lib/storage.ts`, `src/data/menu.ts`, `src/components/site-header.tsx`, `src/components/site-footer.tsx`, `src/components/cart-fab.tsx`.
- AC: `npm run build` + `lint` pass; `lang="vi"`; header/footer hiện mobile + desktop; format VND đúng.

### Phase 1 — Trang chủ `/`
- Tạo: `src/app/page.tsx`, `src/components/product-card.tsx`, `src/components/category-grid.tsx`.
- AC: hero + món nổi bật (`isFeatured`) + grid category + CTA → `/thuc-don`; ảnh `next/image`; responsive 1→4 cột.

### Phase 2 — Thực đơn `/thuc-don`
- Tạo: `src/app/thuc-don/page.tsx` (searchParams `cat/q/sort`), `src/components/menu-filters.tsx`, `src/components/menu-search.tsx`.
- AC: lọc category + search không dấu + sort giá/tên; empty-state; giữ filter khi reload qua URL.

### Phase 3 — Chi tiết món `/mon/[slug]`
- Tạo: `src/app/mon/[slug]/page.tsx` (+ `generateMetadata`), `src/components/product-options.tsx` (size/topping/SL), `src/lib/cart.ts`.
- AC: chọn size/topping cập nhật giá live; thêm giỏ → toast + badge header tăng; slug sai → `notFound()`.

### Phase 4 — Giỏ hàng `/gio-hang`
- Tạo: `src/app/gio-hang/page.tsx`, `src/components/cart-lines.tsx`, `src/hooks/use-cart.ts`.
- AC: CRUD dòng (key = product+size+topping), persist `cafe-cart-v1`, hydrate an toàn (tránh mismatch), tổng tiền đúng, CTA → `/dat-mon`.

### Phase 5 — Đặt món `/dat-mon` + xác nhận
- Tạo: `src/app/dat-mon/page.tsx`, `src/app/dat-mon/thanh-cong/page.tsx`, `src/components/checkout-form.tsx`, `src/lib/orders.ts` (sinh mã + fee ship).
- AC: validate tên/SĐT 10 số/bắt buộc địa chỉ khi giao hàng/số bàn khi tại bàn; tạo Order → lưu `cafe-orders-v1` → clear cart → redirect kèm `code`; tổng = subtotal + fee.

### Phase 6 — Theo dõi `/theo-doi-don`
- Tạo: `src/app/theo-doi-don/page.tsx`, `src/components/order-timeline.tsx`.
- AC: nhập mã (normalize hoa/thường, trim) → hiện items + timeline trạng thái; mã sai báo rõ; deep-link `?code=`.

### Phase 7 — Admin (không auth phức tạp)
- Tạo: `src/app/admin/page.tsx` (gate PIN), `src/app/admin/menu/page.tsx`, `src/app/admin/don-hang/page.tsx`, `src/components/admin-gate.tsx`, `src/lib/admin.ts`.
- AC: PIN (env `NEXT_PUBLIC_ADMIN_PIN`, default `1234`, cảnh báo đổi) mở session; CRUD menu → override localStorage; đổi trạng thái đơn cập nhật timeline; build sau không lộ PIN thật.

### Phase 8 — Giới thiệu / Liên hệ + SEO polish
- Tạo/sửa: `src/app/gioi-thieu/page.tsx`, `src/app/lien-he/page.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, `src/app/manifest.ts`, metadata OG mỗi trang.
- AC: Lighthouse mobile ≥90 cơ bản; sitemap/robots/manifest hợp lệ; tel:/maps links hoạt động.

## 6. Test plan

- `npm run lint && npm run build` sau mỗi phase (Definition of Done).
- Thủ công mobile-first (360px) + desktop: luồng đặt món end-to-end (menu → options → cart → checkout → tracking → admin đổi trạng thái → tracking lại).
- Case localStorage: reload giữ cart; cart rỗng chặn checkout; data cũ/méo không crash (try/catch + fallback `[]`).
- Validate form: SĐT sai, thiếu địa chỉ (giao hàng), thiếu số bàn (tại bàn) phải báo lỗi inline.
- Edge: slug/mã đơn sai → 404/empty-state; topping/size đổi giá đúng; fee ship 0 với mang đi/tại bàn.

## 7. Unresolved questions

1. Phí ship giao hàng: cố định (VD 15k, free >150k) hay theo khoảng cách? Tạm dùng cố định trong `orders.ts`.
2. PIN admin + danh sách bàn hợp lệ: dùng default `1234` chấp nhận được cho demo?
3. Ảnh món: dùng ảnh stock trong `public/images/` hay placeholder màu? Cần nguồn ảnh thật.
4. Có cần giữ đơn/tồn tại qua nhiều máy (backend thật) hay localStorage 1 máy là đủ (đúng non-goal)?
5. Giữ Next 16.3.5 thực tế hay hạ về Next 15 đúng yêu cầu (khuyến nghị giữ 16)?
