export type Category = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  order: number;
};

export type ProductSize = { id: string; label: string; priceDelta: number };

export type Topping = { id: string; name: string; price: number };

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  basePrice: number;
  categoryId: string;
  sizes: ProductSize[];
  toppings: Topping[];
  isAvailable: boolean;
  isFeatured: boolean;
};

export type CartItem = {
  key: string;
  productId: string;
  sizeId: string;
  toppingIds: string[];
  quantity: number;
  unitPrice: number;
  note?: string;
};

export type OrderType = "mang-di" | "tai-ban" | "giao-hang";

export type OrderStatus =
  | "moi"
  | "dang-chuan-bi"
  | "dang-giao"
  | "hoan-thanh"
  | "da-huy";

export type OrderTimelineEntry = { status: OrderStatus; at: string };

export type Order = {
  code: string;
  customerName: string;
  phone: string;
  address?: string;
  tableNumber?: string;
  notes?: string;
  type: OrderType;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  timeline: OrderTimelineEntry[];
};
