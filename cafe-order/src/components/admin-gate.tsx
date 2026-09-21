"use client";

import { useEffect, useState } from "react";
import { verifyPin, isDefaultPin } from "@/lib/admin";
import { ADMIN_PIN_OK_KEY, readJSON, writeJSON, removeKey } from "@/lib/storage";

export function useAdminAuth() {
  const [authed, setAuthed] = useState(false);
  const [ready, setReady] = useState(false);

  // Đọc session PIN sau mount để tránh hydration mismatch.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAuthed(readJSON<string | null>(ADMIN_PIN_OK_KEY, null) === "1");
    setReady(true);
  }, []);

  const login = (pin: string) => {
    if (!verifyPin(pin)) return false;
    writeJSON(ADMIN_PIN_OK_KEY, "1");
    setAuthed(true);
    return true;
  };

  const logout = () => {
    removeKey(ADMIN_PIN_OK_KEY);
    setAuthed(false);
  };

  return { authed, ready, login, logout };
}

export default function AdminGate({ children }: { children: React.ReactNode }) {
  const { authed, ready, login } = useAdminAuth();
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  if (!ready) {
    return <p className="py-10 text-center text-sm font-semibold text-ink-soft">Đang kiểm tra…</p>;
  }

  if (!authed) {
    return (
      <div className="mx-auto mt-10 max-w-sm rounded-3xl border border-line bg-white p-8 text-center shadow-sm">
        <p className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></svg>
        </p>
        <h1 className="mt-3 font-display text-2xl text-ink">Khu vực quản lý</h1>
        <p className="mt-1 text-sm text-ink-soft">Nhập mã PIN để tiếp tục.</p>
        <form onSubmit={(e) => { e.preventDefault(); if (!login(pin)) setError("PIN không đúng, thử lại."); }}>
          <label htmlFor="admin-pin" className="sr-only">Mã PIN quản lý</label>
          <input id="admin-pin" value={pin} onChange={(e) => setPin(e.target.value)}
            placeholder="····" inputMode="numeric" type="password" autoComplete="off"
            className="mt-5 w-full rounded-2xl border border-line bg-white px-4 py-3.5 text-center text-lg font-bold tracking-[0.4em] text-ink outline-none placeholder:text-ink-soft/60 focus:border-primary focus:ring-2 focus:ring-primary/30"
          />
          {error && <p className="mt-2 text-sm font-semibold text-red-500" role="alert">{error}</p>}
          <button type="submit" className="mt-3 w-full rounded-full bg-primary py-3.5 text-sm font-bold text-white transition hover:bg-primary-deep">
            Mở khóa
          </button>
        </form>
        {isDefaultPin() && (
          <p className="mt-4 rounded-xl bg-blush px-3 py-2 text-xs font-semibold text-ink">Đang dùng PIN mặc định 1234 — hãy đặt NEXT_PUBLIC_ADMIN_PIN khi deploy.</p>
        )}
      </div>
    );
  }

  return <>{children}</>;
}
