"use client";

import React, { useState } from "react";
import ReactQuill from "react-quill-new"; // Rich text editor
import "react-quill-new/dist/quill.snow.css"; // Styles for the editor
import { Form, Input, Button, message } from "antd";
import { useRouter } from "next/navigation";
import { postLayananText } from "@/app/api/private"; // Import the postLayananText function

const Page = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const { slug } = params; // Destructure slug from unwrapped params

  const [form] = Form.useForm(); // Ant Design Form instance
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Use the useRouter hook at the top level

  // Handle form submission
  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      // Validate content manually
      if (!content || content.trim() === "") {
        message.error("Please input the content!");
        return;
      }

      // Call the postLayananText function
      await postLayananText(values.title, content, parseInt(slug));
      message.success("Blog created successfully!");
      router.push(`/admin/layanan/category/${slug}`); // Redirect after success
    } catch (err) {
      message.error(err.message); // Show error message
    } finally {
      setIsLoading(false); // Reset loading state
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-medium mb-3">Create New Layanan Blog</h1>
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
                {isLoading ? "Loading" : "Submit"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Page;
