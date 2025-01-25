"use client";

import {  message } from "antd";
import { useEffect, useState } from "react";
import { auth } from "@/app/api/public.js"; // Adjust the import path as necessary
import { useRouter } from "next/navigation";
import Link from "next/link";

const AdminLayout = ({ children }) => {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  const loginWarning = () => {
    messageApi.open({
      type: "error",
      content: "Please log in to go to admin panel",
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      const authenticated = await auth();
      if (!authenticated) {
        loginWarning();
        router.push("/login");
      } else {
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, [router]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {contextHolder}
      <div className="flex">
        <div>
          <h1>Admin Panel</h1>
        </div>
        {children}
      </div>
    </>
  );
};

export default AdminLayout;
