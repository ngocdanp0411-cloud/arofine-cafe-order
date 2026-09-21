import AdminOrders from "@/components/admin-orders";

export const metadata = { title: "Quản lý đơn hàng" };

export default function AdminDonHangPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:pt-10">
      <AdminOrders />
    </div>
  );
}
