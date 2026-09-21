import type { CartItem, Product } from "./types";

export function calcUnitPrice(
  product: Product,
  sizeId: string,
  toppingIds: string[],
): number {
  const size = product.sizes.find((s) => s.id === sizeId) ?? product.sizes[0];
  const toppingsTotal = toppingIds.reduce((sum, id) => {
    const t = product.toppings.find((topping) => topping.id === id);
    return sum + (t?.price ?? 0);
  }, 0);
  return product.basePrice + (size?.priceDelta ?? 0) + toppingsTotal;
}

export function calcCartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

export function countCartItems(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}
