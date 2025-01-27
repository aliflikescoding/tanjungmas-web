"use client";

import { message } from "antd";
import { useEffect, useState } from "react";
import { auth } from "@/app/api/public.js"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import LoadingPage from "../pages/LoadingPage";
import AdminSidebar from "../common/AdminSidebar";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await auth();
      if (!authenticated) {
        messageApi.open({
          type: "error",
          content: "Please log in to go to admin panel",
        });
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <>
        {contextHolder}
        <LoadingPage />
      </>
    );
  }

  return (
    <>
      {contextHolder}
      <div className="flex min-h-[100vh]">
        <AdminSidebar />
        <div className="bg-slate-100 p-5 w-full">{children}</div>
      </div>
    </>
  );
};

export default AdminLayout;
