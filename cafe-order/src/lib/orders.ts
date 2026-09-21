import type {
  CartItem,
  Order,
  OrderStatus,
  OrderType,
} from "./types";
import { calcCartSubtotal } from "./price";

export const ORDER_TYPE_LABEL: Record<OrderType, string> = {
  "mang-di": "Mang đi",
  "tai-ban": "Dùng tại bàn",
  "giao-hang": "Giao hàng",
};

export const ORDER_STATUS_LABEL: Record<OrderStatus, string> = {
  moi: "Mới đặt",
  "dang-chuan-bi": "Đang chuẩn bị",
  "dang-giao": "Đang giao",
  "hoan-thanh": "Hoàn thành",
  "da-huy": "Đã hủy",
};

export const FREE_SHIP_THRESHOLD = 150_000;
export const SHIP_FEE = 15_000;

export function calcDeliveryFee(type: OrderType, subtotal: number): number {
  if (type !== "giao-hang") return 0;
  return subtotal >= FREE_SHIP_THRESHOLD ? 0 : SHIP_FEE;
}

const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function genOrderCode(existingCodes: Set<string>): string {
  for (let attempt = 0; attempt < 50; attempt++) {
    let suffix = "";
    for (let i = 0; i < 6; i++) {
      suffix += CODE_ALPHABET[Math.floor(Math.random() * CODE_ALPHABET.length)];
    }
    const code = `CF-${suffix}`;
    if (!existingCodes.has(code)) return code;
  }
  return `CF-${Date.now().toString(36).toUpperCase().slice(-6)}`;
}

export type CreateOrderInput = {
  customerName: string;
  phone: string;
  address?: string;
  tableNumber?: string;
  notes?: string;
  type: OrderType;
  items: CartItem[];
  existingCodes: Set<string>;
};

export function createOrder(input: CreateOrderInput): Order {
  const subtotal = calcCartSubtotal(input.items);
  const deliveryFee = calcDeliveryFee(input.type, subtotal);
  const now = new Date().toISOString();
  return {
    code: genOrderCode(input.existingCodes),
    customerName: input.customerName,
    phone: input.phone,
    address: input.address,
    tableNumber: input.tableNumber,
    notes: input.notes,
    type: input.type,
    items: input.items,
    subtotal,
    deliveryFee,
    total: subtotal + deliveryFee,
    status: "moi",
    createdAt: now,
    timeline: [{ status: "moi", at: now }],
  };
}

export function normalizeOrderCode(code: string): string {
  return code.trim().toUpperCase().replace(/\s+/g, "");
}
