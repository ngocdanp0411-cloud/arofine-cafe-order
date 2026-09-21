# AROFine — Fine Coffee & Tea (Website đặt món)

Next.js 16 App Router + TypeScript + Tailwind v4. Mobile-first, tiếng Việt.
Phạm vi: xem thực đơn → giỏ hàng → đặt món (mang đi / tại bàn / giao hàng,
tiền mặt) → theo dõi đơn → admin quản lý. Không thanh toán online.

## Chạy

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint && npm run build
```

## Cấu trúc

- `src/app/` — routes: `/`, `/thuc-don`, `/mon/[slug]`, `/gio-hang`,
  `/dat-mon`, `/theo-doi-don`, `/admin`, `/gioi-thieu`, `/lien-he`
- `src/components/` — UI theo tính năng (`menu-browser`, `product-options`,
  `cart-lines`, `checkout-form`, `order-lookup`, `admin-*`)
- `src/lib/` — `types`, `format`, `price` (tính giá single-source),
  `storage` (localStorage an toàn), `cart`, `orders`, `admin`, `menu-store`
- `src/data/menu.ts` — seed 13 món, 4 danh mục, size S/M/L, 6 topping
- `src/hooks/use-cart.tsx` — giỏ hàng + persist `cafe-cart-v1`

## Dữ liệu (localStorage, 1 thiết bị)

`cafe-cart-v1`, `cafe-orders-v1`, `cafe-menu-override-v1`, `cafe-admin-pin-ok`.

## Admin

`/admin` — PIN qua env `NEXT_PUBLIC_ADMIN_PIN` (mặc định `1234`, đổi khi deploy).
Quản lý đơn (đổi trạng thái + timeline) và menu (giá, ẩn/hiện, nổi bật).

## Quy ước

YAGNI/KISS/DRY · file <200 dòng · kebab-case · tiền tệ `formatVND`.
Ship giao hàng 15k, miễn phí đơn từ 150k (`src/lib/orders.ts`).
