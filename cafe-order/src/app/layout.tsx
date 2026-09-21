import type { Metadata, Viewport } from "next";
import { Be_Vietnam_Pro, Playfair_Display } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/hooks/use-cart";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
import MobileTabbar from "@/components/mobile-tabbar";

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-bevn",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const playfairDisplay = Playfair_Display({
  variable: "--font-display",
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#F6F6F3",
};
export const metadata: Metadata = {
  title: {
    default: "AROFine — Fine Coffee & Tea | Đặt món online",
    template: "%s · AROFine",
  },
  description:
    "AROFine — fine coffee & tea. Xem thực đơn, đặt mang đi, dùng tại bàn hoặc giao hàng.",
  openGraph: {
    title: "AROFine — Fine Coffee & Tea | Đặt món online",
    description: "Thực đơn cà phê đặc sản, trà, đá xay & bánh ngọt. Đặt món trong 1 phút.",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${beVietnamPro.variable} ${playfairDisplay.variable} h-full antialiased`}
    >
      <body className="paper-grain min-h-full bg-paper font-sans text-ink">
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <SiteHeader />
            <main className="flex-1 pb-24 md:pb-0">{children}</main>
            <SiteFooter />
            <MobileTabbar />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
