"use client";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new"; // Rich text editor
import "react-quill-new/dist/quill.snow.css"; // Styles for the editor
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { getLayananTextBasedOnId } from "@/app/api/public"; // Fetch existing data
import { updateLayananText } from "@/app/api/private"; // Update function
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Page = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const { slug } = params; // Destructure slug (textId) from params

  const [form] = Form.useForm(); // Ant Design Form instance
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Use the useRouter hook at the top level
  const [categoryId, setCategoryId] = useState(null);

  // Fetch existing data based on ID
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getLayananTextBasedOnId(slug); // Use slug as the text ID
        if (response) {
          form.setFieldsValue({ title: response.title }); // Set title in the form
          setContent(response.content); // Set content in the ReactQuill editor
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
      // Validate content manually
      if (!content || content.trim() === "") {
        message.error("Please input the content!");
        return;
      }
      

      // Call the updateLayananText function
      const response = await updateLayananText(values.title, content, slug); // Use slug as the text ID
      message.success("Blog updated successfully!");
      router.push(`/admin/layanan/category/${categoryId}`); // Redirect to the main admin page after success
    } catch (err) {
      message.error(err.message); // Show error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <Link
        href={`/admin/layanan/category/${categoryId}`}
        className="capitalize transition-all ease-in-out duration-150 flex gap-1 items-center font-medium mb-3 hover:text-blue-500"
      >
        <ArrowLeftOutlined className="text-2xl" />{" "}
        <p className="text-lg">Go Back</p>
      </Link>
      <h1 className="text-4xl font-medium mb-3">Edit Layanan Blog</h1>
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
                  setContent(value); // Update content state
                  form.setFieldsValue({ content: value }); // Update form value
                }}
                theme="snow" // Use the snow theme for the editor
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
