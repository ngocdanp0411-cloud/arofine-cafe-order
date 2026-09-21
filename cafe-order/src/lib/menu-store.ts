import { CATEGORIES, PRODUCTS } from "@/data/menu";
import type { Category, Product } from "@/lib/types";
import { MENU_OVERRIDE_KEY, readJSON } from "./storage";

export function getCategories(): Category[] {
  return [...CATEGORIES].sort((a, b) => a.order - b.order);
}

/** Menu đang áp dụng = seed + override của admin (nếu có). */
export function getMenuProducts(): Product[] {
  const override = readJSON<Product[]>(MENU_OVERRIDE_KEY, []);
  if (override.length === 0) return PRODUCTS;
  const map = new Map(override.map((p) => [p.id, p]));
  return PRODUCTS.map((p) => map.get(p.id) ?? p);
}

export function getAvailableProducts(): Product[] {
  return getMenuProducts().filter((p) => p.isAvailable);
}

export function getFeaturedProducts(): Product[] {
  return getMenuProducts().filter((p) => p.isAvailable && p.isFeatured);
}

export function getProduct(slug: string): Product | undefined {
  return getMenuProducts().find((p) => p.slug === slug);
}
