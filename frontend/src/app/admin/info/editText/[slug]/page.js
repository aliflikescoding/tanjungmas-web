"use client";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { getInfoTextBasedOnId } from "@/app/api/public"; // Changed to info API
import { updateInfoText } from "@/app/api/private"; // Changed to info API
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Page = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const { slug } = params;

  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [categoryId, setCategoryId] = useState(null);

  // Fetch existing data based on ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getInfoTextBasedOnId(slug);
        if (response) {
          form.setFieldsValue({ title: response.title });
          setContent(response.content);
          setCategoryId(response.categoryId);
        }
      } catch (err) {
        message.error("Failed to fetch data.");
      }
    };

    fetchData();
  }, [slug, form]);

  // Handle form submission
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      if (!content || content.trim() === "") {
        message.error("Please input the content!");
        return;
      }

      // Call the updateInfoText function
      await updateInfoText(values.title, content, slug);
      message.success("Info content updated successfully!");
      router.push(`/admin/info/category/${categoryId}`);
    } catch (err) {
      message.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Link
        href={`/admin/info/category/${categoryId}`}
        className="capitalize transition-all ease-in-out duration-150 flex gap-1 items-center font-medium mb-3 hover:text-blue-500"
      >
        <ArrowLeftOutlined className="text-2xl" />{" "}
        <p className="text-lg">Go Back</p>
      </Link>
      <h1 className="text-4xl font-medium mb-3">Edit Info Content</h1>
      <div className="max-w-[1500px] mx-auto bg-white border-2 shadow-md px-4 py-6 rounded-md">
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: "Please input the content!" }]}
          >
            <div className="bg-white rounded-md">
              <ReactQuill
                value={content}
                onChange={(value) => {
                  setContent(value);
                  form.setFieldsValue({ content: value });
                }}
                theme="snow"
              />
            </div>
          </Form.Item>
          <Form.Item>
            <div className="flex justify-center items-center">
              <Button
                size="large"
                type="primary"
                htmlType="submit"
                loading={isLoading}
              >
                {isLoading ? "Loading" : "Update"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Page;
