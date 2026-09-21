import Link from "next/link";

function ClockIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 2 .7 2.9a2 2 0 0 1-.5 2.1L8 10a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.9.6 2.9.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-line bg-white text-ink-soft">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.3fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-2xl font-bold text-ink">AROFine</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-ink-soft">
            Fine Coffee & Tea
          </p>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            Góc nhỏ ấm cúng giữa lòng Hà Nội — hạt arabica & robusta rang vừa,
            pha phin chậm rãi như cách người Việt thưởng thức mỗi sáng.
          </p>
        </div>
        <nav aria-label="Liên kết footer">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            Khám phá
          </p>
          <ul className="mt-4 space-y-2.5 text-[15px] font-medium">
            <li><Link href="/thuc-don" className="text-ink-soft transition-colors hover:text-ink">Thực đơn</Link></li>
            <li><Link href="/theo-doi-don" className="text-ink-soft transition-colors hover:text-ink">Theo dõi đơn</Link></li>
            <li><Link href="/gioi-thieu" className="text-ink-soft transition-colors hover:text-ink">Câu chuyện quán</Link></li>
            <li><Link href="/lien-he" className="text-ink-soft transition-colors hover:text-ink">Liên hệ</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-ink-soft">
            Ghé quán
          </p>
          <ul className="mt-4 space-y-3 text-[15px]">
            <li className="flex items-start gap-2.5 text-ink-soft">
              <span className="mt-0.5 text-primary"><ClockIcon /></span>
              Mở cửa 07:00 – 21:00 mỗi ngày, kể cả cuối tuần
            </li>
            <li className="flex items-start gap-2.5 text-ink-soft">
              <span className="mt-0.5 text-primary"><PinIcon /></span>
              2 Ngõ 248 Hoàng Ngân, Cầu Giấy, Hà Nội
            </li>
            <li>
              <a href="tel:0900000000" className="inline-flex items-center gap-2.5 font-display text-2xl font-bold text-ink transition-colors hover:text-primary">
                <span className="text-primary"><PhoneIcon /></span>
                0900 000 000
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line py-5 text-center text-[13px] text-ink-soft">
        AROFine — đặt món online, thanh toán tiền mặt khi nhận hàng.
      </div>
    </footer>
  );
}
