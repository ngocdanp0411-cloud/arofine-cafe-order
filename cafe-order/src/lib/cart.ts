import type { CartItem } from "./types";

export function buildCartKey(
  productId: string,
  sizeId: string,
  toppingIds: string[],
): string {
  return [productId, sizeId, ...[...toppingIds].sort()].join("|");
}

export function addToCart(
  items: CartItem[],
  entry: Omit<CartItem, "key">,
): CartItem[] {
  const key = buildCartKey(entry.productId, entry.sizeId, entry.toppingIds);
  const existing = items.find((item) => item.key === key);
  if (existing) {
    return items.map((item) =>
      item.key === key
        ? { ...item, quantity: item.quantity + entry.quantity }
        : item,
    );
  }
  return [...items, { ...entry, key }];
}

export function updateCartQty(
  items: CartItem[],
  key: string,
  quantity: number,
): CartItem[] {
  if (quantity <= 0) return items.filter((item) => item.key !== key);
  return items.map((item) =>
    item.key === key ? { ...item, quantity } : item,
  );
}

export function removeCartLine(items: CartItem[], key: string): CartItem[] {
  return items.filter((item) => item.key !== key);
}
