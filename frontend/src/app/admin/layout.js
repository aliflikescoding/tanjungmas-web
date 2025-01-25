import AdminLayout from "@/components/layouts/AdminLayout";

export const metadata = {
  title: "Admin Panel",
  description: "Tanjungmas web admin panel",
};

const layout = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
