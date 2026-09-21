export const metadata = {
  title: "Giới thiệu",
  description: "Câu chuyện AROFine — fine coffee & tea, rang mới mỗi tuần.",
};

const VALUES = [
  { t: "Rang mới mỗi tuần", d: "Hạt arabica Cầu Đất, pha máy và phin truyền thống." },
  { t: "Syrup tự nấu", d: "Ít ngọt, rõ vị — đường thốt nốt, caramel muối, vải hồng." },
  { t: "Bánh mỗi ngày", d: "Croissant, su kem và bánh chuối nướng từ bếp nhỏ." },
];

export default function GioiThieuPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:pt-10">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Câu chuyện quán</p>
      <h1 className="mt-1 font-display text-3xl text-ink sm:text-4xl">Fine coffee & tea, mỗi ngày</h1>
      <div className="mt-5 overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-8">
        <p className="font-display text-xl leading-relaxed">“Một ly cà phê ngon bắt đầu từ hạt tốt, nước chuẩn và người pha có tâm — đó là cách AROFine làm mỗi ngày.”</p>
        <p className="mt-3 text-sm text-white/70">— Người sáng lập, cựu kỹ sư công nghệ</p>
      </div>
      <div className="mt-4 space-y-4 rounded-3xl border border-line bg-white p-6 text-[15px] leading-relaxed text-ink sm:p-8">
        <p>AROFine bắt đầu từ một quầy cà phê nhỏ: mang cà phê đặc sản chất lượng và trà ngon đến với mọi người, mỗi ngày, với giá dễ chịu.</p>
        <div className="grid gap-3 sm:grid-cols-3">
          {VALUES.map((v) => (
            <div key={v.t} className="rounded-2xl bg-paper p-4">
              <p className="font-display text-base text-ink">{v.t}</p>
              <p className="mt-1 text-[13px] text-ink-soft">{v.d}</p>
            </div>
          ))}
        </div>
        <p className="rounded-2xl border border-dashed border-line px-4 py-3 text-sm font-semibold text-ink">Mở cửa 07:00 – 21:00, tất cả các ngày trong tuần.</p>
      </div>
    </div>
  );
}
