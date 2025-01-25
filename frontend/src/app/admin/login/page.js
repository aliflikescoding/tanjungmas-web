"use client";
import { Button, Checkbox, Form, Input } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { login } from "@/app/api/private";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    
    try {
      const response = await login(values.username, values.password);

      setTimeout(() => {
        console.log(response);
        router.push("/admin/dashboard");
        setLoading(false);
      }, 1000);
    } catch (err) {
      
    }
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left side - Image */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: "url(/hero-image.jpg)" }}
      ></div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full p-8 flex flex-col items-center justify-center">
          <div className="w-14 h-14 sm:w-20 sm:h-20 mb-3 relative">
            <Image
              src="/icon-semarang.png"
              alt="Tanjungmas Logo"
              layout="fill"
              objectFit="contain"
            />
          </div>
          <div>
            <h2 className="text-2xl sm:text-4xl font-normal text-center">
              Selamat Datang! ke
            </h2>
            <h2 className="text-2xl sm:text-4xl capitalize font-normal text-center">
              tanjungmas Admin Panel
            </h2>
          </div>
          <p className="text-md text-center sm:text-lg font-light my-4 sm:mt-[20px] sm:mb-[35px]">
            Silahkan isi untuk ke admin panel
          </p>
          <Form
            name="basic"
            layout="vertical"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            className="min-w-[275px] sm:min-w-[400px]"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item label={null}>
              <div className="flex justify-center items-center">
                <Button size="large" type="primary" htmlType="submit" loading={loading}>
                  {loading ? "Loading" : "Submit"}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
