import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "AROFine — Fine Coffee & Tea | Đặt món online",
    short_name: "AROFine",
    description: "Xem thực đơn và đặt cà phê, trà, bánh ngọt online.",
    start_url: "/",
    display: "standalone",
    background_color: "#F6F6F3",
    theme_color: "#5457D6",
    lang: "vi",
    icons: [
      { src: "/favicon.ico", sizes: "any", type: "image/x-icon" },
    ],
  };
}
