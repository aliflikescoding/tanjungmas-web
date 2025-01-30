"use client";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new"; // Updated import
import "react-quill-new/dist/quill.snow.css"; // Updated import
import { Form, Input, Button, Upload, Modal, message } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { getLayananCategoryBasedOnId } from "@/app/api/public";
import { createLayananBlog } from "@/app/api/private";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const Page = ({ params: paramsPromise }) => {
  // Unwrap params using React.use()
  const params = React.use(paramsPromise);
  const { slug } = params; // Destructure slug from unwrapped params

  const [name, setName] = useState("");
  const [form] = Form.useForm(); // Ant Design Form instance
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [filesToUpload, setFilesToUpload] = useState([]); // Files to upload
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Use the useRouter hook at the top level

  useEffect(() => {
    const fetchLayananName = async () => {
      try {
        const response = await getLayananCategoryBasedOnId(parseInt(slug));
        if (response && response.title) {
          setName(response.title);
        } else {
          console.error("No data returned from API");
          setName("Unknown Category"); // Fallback name
        }
      } catch (error) {
        console.error("Error fetching category name:", error);
        setName("Unknown Category"); // Fallback name
      }
    };

    fetchLayananName();
  }, [slug]);

  // Handle image upload via modal
  const handleImageUpload = (files) => {
    setFilesToUpload(files);
  };

  // Handle modal OK button (add files to images list)
  const handleModalOk = () => {
    if (filesToUpload.length > 0) {
      setImages([...images, ...filesToUpload]); // Add the files to the images list
      setFilesToUpload([]); // Clear the files to upload
      setIsModalOpen(false); // Close the modal
      message.success("Files added successfully!");
    } else {
      message.error("No files selected!");
    }
  };

  // Handle modal cancel
  const handleModalCancel = () => {
    setIsModalOpen(false);
    setFilesToUpload([]); // Clear the files to upload
  };

  // Handle form submission
  const handleSubmit = async (values) => {
    setIsLoading(true);
    const hideLoadingMessage = message.loading({
      content: "Uploading big image...",
      duration: 0,
    });
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("sinopsis", values.sinopsis);
    formData.append("content", content);
    formData.append("categoryId", parseInt(slug)); // Ensure categoryId is a number
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await createLayananBlog(formData); // Ensure the request is awaited
      hideLoadingMessage();
      setIsLoading(false);
      message.success("Page added successfully!");
      setTimeout(() => {
        router.push(`/admin/layanan/category/${slug}`); // Use the router instance
      }, 1000);
    } catch (err) {
      hideLoadingMessage(); // Hide loading message
      setIsLoading(false);
      message.error("Failed to update big image.");
    }
  };

  // Upload props for the Dragger component
  const uploadProps = {
    name: "file",
    multiple: true, // Allow multiple files
    beforeUpload(file, fileList) {
      handleImageUpload(fileList); // Handle file selection
      return false; // Prevent automatic upload
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <Link
        href={`/admin/layanan/category/${slug}`}
        className="capitalize transition-all ease-in-out duration-150 flex gap-1 items-center font-medium mb-3 hover:text-blue-500"
      >
        <ArrowLeftOutlined className="text-2xl" />{" "}
        <p className="text-lg">Go Back</p>
      </Link>
      <h1 className="text-4xl font-medium mb-3 capitalize">
        Create New Layanan for {name}
      </h1>
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
            label="Sinopsis"
            name="sinopsis"
            rules={[{ required: true, message: "Please input the sinopsis!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Content">
            <div className="bg-white rounded-md">
              <ReactQuill value={content} onChange={setContent} />
            </div>
          </Form.Item>
          <Form.Item label="Images">
            <Button
              type="primary"
              onClick={() => setIsModalOpen(true)}
              icon={<UploadOutlined />}
            >
              Add Images
            </Button>
            <div className="mt-2">
              {images.map((image, index) => (
                <div key={index} className="inline-block mr-2">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover"
                  />
                </div>
              ))}
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

      {/* Modal for uploading images */}
      <Modal
        title="Upload Images"
        open={isModalOpen}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag files to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for multiple uploads. Drag or select multiple files.
          </p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default Page;
