import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Button, Modal, message } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { logout } from "@/app/api/public";

const AdminSidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    setIsModalOpen(false);
    try {
      const response = await logout();
      messageApi.open({
        type: "success",
        content: "Logout successful",
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/page", label: "Page" },
    { href: "/admin/tentang", label: "Tentang" },
    { href: "/admin/layanan", label: "Layanan" },
    { href: "/admin/info", label: "Info" },
    { href: "/admin/berita", label: "Berita" },
  ];

  return (
    <>
      {contextHolder}
      <div className="min-h-[100vh] px-5 border-r-2 py-5 min-w-fit flex flex-col items-center justify-between">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-2 mr-10 mb-12">
            <Image
              src="/icon-semarang.png"
              alt="semarang logo"
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto h-[45px]"
            />
            <p className="text-[25px] font-normal tracking-[2px]">
              Admin Panel
            </p>
          </div>
          <div className="flex flex-col gap-2 w-full">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`w-full text-center py-2 text-md rounded-md ${
                  pathname === link.href ? "bg-blue-500 text-white" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <Button
          onClick={showModal}
          type="primary"
          danger
          icon={<LogoutOutlined />}
          size={"large"}
        >
          Logout
        </Button>
      </div>
      <Modal title="Confirm Logout" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Are you sure you want to logout?</p>
      </Modal>
    </>
  );
};

export default AdminSidebar;
