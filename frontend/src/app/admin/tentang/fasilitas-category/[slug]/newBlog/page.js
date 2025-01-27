"use client";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new"; // Updated import
import "react-quill-new/dist/quill.snow.css"; // Updated import
import { Form, Input, Button, Upload, Modal, message } from "antd";
import { UploadOutlined, InboxOutlined } from "@ant-design/icons";
import { getFasilitasCategoryBasedOnId } from "@/app/api/public";
import { createFasilitas } from "@/app/api/private";
import { useRouter } from "next/navigation";

const { Dragger } = Upload;

const Page = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { slug } = unwrappedParams;
  const [name, setName] = useState("");
  const [form] = Form.useForm(); // Ant Design Form instance
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [filesToUpload, setFilesToUpload] = useState([]); // Files to upload
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter(); // Use the useRouter hook at the top level

  useEffect(() => {
    const fetchFasilitasName = async () => {
      const response = await getFasilitasCategoryBasedOnId(parseInt(slug));
      setName(response.title);
    };

    fetchFasilitasName();
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
    formData.append("categoryid", slug);
    images.forEach((image) => {
      formData.append("images", image);
    });

    try {
      hideLoadingMessage();
      setIsLoading(false);
      await createFasilitas(formData); // Ensure the request is awaited
      message.success("Page added successfully!");
      setTimeout(() => {
        router.push(`/admin/tentang/fasilitas-category/${slug}`); // Use the router instance
      }, 1000);
    } catch (err) {
      hideLoadingMessage(); // Hide loading message
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
      <h1 className="text-4xl font-medium mb-3 capitalize">
        Create New Fasilitas for {name}
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
