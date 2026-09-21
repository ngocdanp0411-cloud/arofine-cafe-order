import AdminMenu from "@/components/admin-menu";

export const metadata = { title: "Quản lý thực đơn" };

export default function AdminMenuPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 pb-16 pt-8 sm:pt-10">
      <AdminMenu />
    </div>
  );
}
