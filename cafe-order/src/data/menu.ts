import type {
  Category,
  Product,
  ProductSize,
  Topping,
} from "@/lib/types";

export const CATEGORIES: Category[] = [
  { id: "ca-phe", slug: "ca-phe", name: "Cà phê", tagline: "Pha máy & phin truyền thống", order: 1 },
  { id: "tra", slug: "tra", name: "Trà & Matcha", tagline: "Thanh mát mỗi ngày", order: 2 },
  { id: "da-xay", slug: "da-xay", name: "Đá xay & Sinh tố", tagline: "Béo ngậy, mát lạnh", order: 3 },
  { id: "banh-ngot", slug: "banh-ngot", name: "Bánh ngọt", tagline: "Ăn kèm cực hợp", order: 4 },
];

export const DRINK_SIZES: ProductSize[] = [
  { id: "s", label: "Size S", priceDelta: 0 },
  { id: "m", label: "Size M", priceDelta: 5000 },
  { id: "l", label: "Size L", priceDelta: 10000 },
];

export const CAKE_SIZES: ProductSize[] = [
  { id: "std", label: "1 phần", priceDelta: 0 },
];

export const TOPPINGS: Topping[] = [
  { id: "tc-den", name: "Trân châu đen", price: 8000 },
  { id: "tc-trang", name: "Trân châu trắng", price: 8000 },
  { id: "thach-ca-phe", name: "Thạch cà phê", price: 7000 },
  { id: "kem-cheese", name: "Kem cheese", price: 10000 },
  { id: "espresso-shot", name: "Thêm shot espresso", price: 10000 },
  { id: "sua-yen-mach", name: "Sữa yến mạch", price: 8000 },
];

function drink(
  p: Omit<Product, "sizes" | "toppings">,
  opts?: { sizes?: ProductSize[]; toppings?: Topping[] },
): Product {
  return {
    ...p,
    sizes: opts?.sizes ?? DRINK_SIZES,
    toppings: opts?.toppings ?? TOPPINGS,
  };
}

export const PRODUCTS: Product[] = [
  drink({
    id: "ca-phe-den-da", slug: "ca-phe-den-da", name: "Cà phê đen đá",
    description: "Robusta nguyên chất pha phin, đậm đà, hậu đắng êm.",
    image: "/images/cat-ca-phe.svg", basePrice: 25000, categoryId: "ca-phe",
    isAvailable: true, isFeatured: true,
  }),
  drink({
    id: "ca-phe-sua-da", slug: "ca-phe-sua-da", name: "Cà phê sữa đá",
    description: "Cà phê phin hoà quyện sữa đặc, béo ngậy đúng vị Sài Gòn.",
    image: "/images/cat-ca-phe.svg", basePrice: 29000, categoryId: "ca-phe",
    isAvailable: true, isFeatured: true,
  }),
  drink({
    id: "bac-xiu", slug: "bac-xiu", name: "Bạc xỉu",
    description: "Nhiều sữa tươi, ít cà phê — nhẹ nhàng cho người mới uống.",
    image: "/images/cat-ca-phe.svg", basePrice: 32000, categoryId: "ca-phe",
    isAvailable: true, isFeatured: false,
  }),
  drink({
    id: "cold-brew-cam-que", slug: "cold-brew-cam-que", name: "Cold Brew cam quế",
    description: "Cà phê ủ lạnh 18 giờ, thêm cam tươi và quế thơm dịu.",
    image: "/images/cat-ca-phe.svg", basePrice: 45000, categoryId: "ca-phe",
    isAvailable: true, isFeatured: true,
  }),
  drink({
    id: "tra-dao-cam-sa", slug: "tra-dao-cam-sa", name: "Trà đào cam sả",
    description: "Trà đen thơm, đào giòn, cam sả tươi mát.",
    image: "/images/cat-tra.svg", basePrice: 35000, categoryId: "tra",
    isAvailable: true, isFeatured: false,
  }),
  drink({
    id: "tra-vai-hoa-hong", slug: "tra-vai-hoa-hong", name: "Trà vải hoa hồng",
    description: "Vải ngọt thanh, hương hoa hồng nhẹ, hậu vị dịu.",
    image: "/images/cat-tra.svg", basePrice: 38000, categoryId: "tra",
    isAvailable: true, isFeatured: false,
  }),
  drink({
    id: "matcha-latte", slug: "matcha-latte", name: "Matcha latte",
    description: "Matcha Nhật nguyên chất đánh cùng sữa tươi nóng/lạnh.",
    image: "/images/cat-tra.svg", basePrice: 42000, categoryId: "tra",
    isAvailable: true, isFeatured: true,
  }),
  drink({
    id: "chocolate-da-xay", slug: "chocolate-da-xay", name: "Chocolate đá xay",
    description: "Socola Bỉ xay đá, phủ kem tươi — món khoái khẩu mọi lứa tuổi.",
    image: "/images/cat-da-xay.svg", basePrice: 45000, categoryId: "da-xay",
    isAvailable: true, isFeatured: false,
  }),
  drink({
    id: "matcha-da-xay", slug: "matcha-da-xay", name: "Matcha đá xay",
    description: "Matcha xay đá cùng sữa, mát lạnh, thơm đậm.",
    image: "/images/cat-da-xay.svg", basePrice: 48000, categoryId: "da-xay",
    isAvailable: true, isFeatured: false,
  }),
  drink({
    id: "sinh-to-bo", slug: "sinh-to-bo", name: "Sinh tố bơ",
    description: "Bơ sáp xay cùng sữa đặc, sánh mịn, béo tự nhiên.",
    image: "/images/cat-da-xay.svg", basePrice: 40000, categoryId: "da-xay",
    isAvailable: true, isFeatured: false,
  }),
  drink(
    {
      id: "croissant-trung-muoi", slug: "croissant-trung-muoi",
      name: "Croissant trứng muối",
      description: "Vỏ ngàn lớp giòn rụm, nhân trứng muối tan chảy.",
      image: "/images/cat-banh-ngot.svg", basePrice: 28000, categoryId: "banh-ngot",
      isAvailable: true, isFeatured: false,
    },
    { sizes: CAKE_SIZES, toppings: [] },
  ),
  drink(
    {
      id: "mousse-chanh-day", slug: "mousse-chanh-day", name: "Mousse chanh dây",
      description: "Chua nhẹ, ngọt dịu — giải ngán tuyệt vời sau cà phê sữa.",
      image: "/images/cat-banh-ngot.svg", basePrice: 32000, categoryId: "banh-ngot",
      isAvailable: true, isFeatured: true,
    },
    { sizes: CAKE_SIZES, toppings: [] },
  ),
  drink(
    {
      id: "tiramisu", slug: "tiramisu", name: "Tiramisu",
      description: "Mascarpone Ý, cà phê espresso, phủ cacao nguyên chất.",
      image: "/images/cat-banh-ngot.svg", basePrice: 38000, categoryId: "banh-ngot",
      isAvailable: true, isFeatured: false,
    },
    { sizes: CAKE_SIZES, toppings: [] },
  ),
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}
