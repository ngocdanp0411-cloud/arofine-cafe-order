export const metadata = {
  title: "Liên hệ",
  description: "Địa chỉ, hotline và giờ mở cửa AROFine.",
};

export default function LienHePage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:pt-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Ghé chơi</p>
      <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Liên hệ quán</h1>
      <div className="mt-5 rounded-3xl border border-line bg-white p-6 shadow-sm sm:p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-paper text-ink" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>
          </span>
          <div>
            <p className="font-bold text-ink">2 Ngõ 248 Hoàng Ngân, Cầu Giấy, Hà Nội</p>
            <p className="mt-1 text-sm text-ink-soft">Mở cửa 07:00 – 21:00 mỗi ngày</p>
          </div>
        </div>
        <a href="tel:0900000000" className="mt-4 flex items-center gap-3 rounded-2xl bg-primary px-5 py-4 text-white transition hover:bg-primary-deep">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 4h4l2 5-2.5 1.5a12 12 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
          <span className="font-mono text-xl font-bold tracking-wider">0900 000 000</span>
        </a>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <a href="https://maps.google.com/?q=2+Ngo+248+Hoang+Ngan+Cau+Giay+Ha+Noi" target="_blank" rel="noopener noreferrer"
            className="flex-1 rounded-full border border-line bg-white py-3.5 text-center text-sm font-bold text-ink transition hover:border-primary">
            Chỉ đường (Google Maps)
          </a>
          <a href="tel:0900000000" className="flex-1 rounded-full bg-primary py-3.5 text-center text-sm font-extrabold text-white transition hover:bg-primary-deep">
            Gọi đặt món
          </a>
        </div>
      </div>
    </div>
  );
}
