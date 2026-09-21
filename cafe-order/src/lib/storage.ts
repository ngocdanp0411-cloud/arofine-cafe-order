export const CART_KEY = "cafe-cart-v1";
export const ORDERS_KEY = "cafe-orders-v1";
export const MENU_OVERRIDE_KEY = "cafe-menu-override-v1";
export const ADMIN_PIN_OK_KEY = "cafe-admin-pin-ok";

export function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function writeJSON(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage đầy hoặc bị chặn: bỏ qua, app vẫn chạy với state memory
  }
}

export function removeKey(key: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    // bỏ qua
  }
}
