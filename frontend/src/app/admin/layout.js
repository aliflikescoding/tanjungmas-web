import AdminLayout from "@/components/layouts/AdminLayout";
import "@ant-design/v5-patch-for-react-19";

export const metadata = {
  title: "Admin Panel",
  description: "Tanjungmas web admin panel",
};

const layout = ({ children }) => {
  return <AdminLayout>{children}</AdminLayout>;
};

export default layout;
