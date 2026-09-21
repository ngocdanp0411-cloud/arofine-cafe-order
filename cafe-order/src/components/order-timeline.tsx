import type { OrderStatus } from "@/lib/types";
import { ORDER_STATUS_LABEL } from "@/lib/orders";
import { formatDateTime } from "@/lib/format";
import type { OrderTimelineEntry } from "@/lib/types";

const STEPS: OrderStatus[] = [
  "moi",
  "dang-chuan-bi",
  "dang-giao",
  "hoan-thanh",
];

export default function OrderTimeline({
  timeline,
  current,
}: {
  timeline: OrderTimelineEntry[];
  current: OrderStatus;
}) {
  if (current === "da-huy") {
    return (
      <div className="rounded-2xl border border-red-500 bg-white px-4 py-3.5 text-sm font-semibold text-red-500">
        Đơn hàng đã bị hủy. Liên hệ quán qua hotline để được hỗ trợ.
      </div>
    );
  }
  const reached = new Map(timeline.map((t) => [t.status, t.at]));
  return (
    <ol>
      {STEPS.map((step, i) => {
        const at = reached.get(step);
        const done = !!at;
        const isLast = i === STEPS.length - 1;
        return (
          <li key={step} className="flex gap-3">
            <div className="flex flex-col items-center">
              <span className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-extrabold ${done ? "bg-green-600 text-white" : "bg-paper text-ink-soft"}`} aria-hidden="true">
                {done ? (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12.5l5 5L20 6.5" /></svg>) : (i + 1)}
              </span>
              {!isLast && <span className={`w-0.5 flex-1 rounded ${done ? "bg-green-600" : "bg-line"}`} aria-hidden="true" />}
            </div>
            <div className="pb-5">
              <p className={`text-sm font-bold ${done ? "text-ink" : "text-ink-soft"}`}>{ORDER_STATUS_LABEL[step]}</p>
              {at && <p className="mt-0.5 text-xs text-ink-soft">{formatDateTime(at)}</p>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
