export const DEFAULT_ADMIN_PIN = "1234";

export function getAdminPin(): string {
  return process.env.NEXT_PUBLIC_ADMIN_PIN || DEFAULT_ADMIN_PIN;
}

export function verifyPin(pin: string): boolean {
  return pin.trim() === getAdminPin();
}

export function isDefaultPin(): boolean {
  return getAdminPin() === DEFAULT_ADMIN_PIN;
}
