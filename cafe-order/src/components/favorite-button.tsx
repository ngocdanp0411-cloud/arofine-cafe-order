"use client";

import { useEffect, useState } from "react";
import { readJSON, writeJSON } from "@/lib/storage";

const FAV_KEY = "cafe-fav-v1";

export default function FavoriteButton({ productId }: { productId: string }) {
  const [fav, setFav] = useState(false);

  // Đọc sau mount để tránh hydration mismatch (SSR không có localStorage).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFav(readJSON<string[]>(FAV_KEY, []).includes(productId));
  }, [productId]);

  const toggle = () => {
    const list = readJSON<string[]>(FAV_KEY, []);
    const next = list.includes(productId)
      ? list.filter((id) => id !== productId)
      : [...list, productId];
    writeJSON(FAV_KEY, next);
    setFav(!fav);
  };

  return (
    <button
      onClick={toggle}
      aria-pressed={fav}
      aria-label={fav ? "Bỏ yêu thích" : "Yêu thích món này"}
      className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 backdrop-blur-md transition-transform active:scale-90"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill={fav ? "#ef4444" : "none"}
        stroke={fav ? "#ef4444" : "#fff"}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    </button>
  );
}
