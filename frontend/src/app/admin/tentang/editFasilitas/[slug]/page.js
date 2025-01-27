"use client";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new"; // Updated import
import "react-quill-new/dist/quill.snow.css"; // Updated import
import { Form, Input, Button, Upload, Modal, message } from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { updateFasilitas } from "@/app/api/private";
import { getFasiliitasBasedOnId } from "@/app/api/public";
import { useRouter } from "next/navigation";

const { Dragger } = Upload;

const EditFasilitas = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const { slug } = params;

  const [fasilitas, setFasilitas] = useState(null);
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [existingImages, setExistingImages] = useState([]); // Existing images from the API
  const [newImages, setNewImages] = useState([]); // New images to be uploaded
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchFasilitas = async () => {
      const response = await getFasiliitasBasedOnId(parseInt(slug));
      setFasilitas(response);
      form.setFieldsValue({
        title: response.title,
        sinopsis: response.sinopsis,
      });
      setContent(response.content);
      setExistingImages(response.fasilitasImages || []); // Set existing images
    };

    fetchFasilitas();
  }, [slug, form]);

  const handleImageUpload = (files) => {
    setFilesToUpload(files);
  };

  const handleModalOk = () => {
    if (filesToUpload.length > 0) {
      setNewImages([...newImages, ...filesToUpload]); // Add new files to the newImages list
      setFilesToUpload([]); // Clear the files to upload
      setIsModalOpen(false); // Close the modal
      message.success("Files added successfully!");
    } else {
      message.error("No files selected!");
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setFilesToUpload([]); // Clear the files to upload
  };

  const handleRemoveExistingImage = (imageId) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId)); // Remove the image from the existing images list
    message.success("Image removed successfully!");
  };

  const handleRemoveNewImage = (fileIndex) => {
    setNewImages((prev) => prev.filter((_, index) => index !== fileIndex)); // Remove the image from the new images list
    message.success("Image removed successfully!");
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const hideLoadingMessage = message.loading({
      content: "Updating fasilitas...",
      duration: 0,
    });

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("sinopsis", values.sinopsis);
    formData.append("content", content);
    formData.append("categoryId", fasilitas.categoryId); // Ensure categoryId is a number

    // Append existing image IDs (for tracking deletions)
    existingImages.forEach((image) => {
      formData.append("existingImageIds", image.id);
    });

    // Append new images
    newImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await updateFasilitas(parseInt(slug), formData); // Call the update API
      hideLoadingMessage();
      setIsLoading(false);
      message.success("Fasilitas updated successfully!");
      setTimeout(() => {
        router.push(`/admin/tentang`); // Redirect after success
      }, 1000);
    } catch (err) {
      hideLoadingMessage();
      setIsLoading(false);
      message.error("Failed to update fasilitas.");
    }
  };

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
        Edit {fasilitas?.title}
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
              {/* Display existing images */}
              {existingImages.map((image) => (
                <div key={image.id} className="inline-block mr-2 relative">
                  <img
                    src={image.img}
                    alt={`Existing ${image.id}`}
                    className="w-20 h-20 object-cover"
                  />
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    className="absolute top-0 right-0"
                    onClick={() => handleRemoveExistingImage(image.id)}
                  />
                </div>
              ))}
              {/* Display new images */}
              {newImages.map((image, index) => (
                <div key={index} className="inline-block mr-2 relative">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Preview ${index}`}
                    className="w-20 h-20 object-cover"
                  />
                  <Button
                    type="link"
                    danger
                    icon={<DeleteOutlined />}
                    className="absolute top-0 right-0"
                    onClick={() => handleRemoveNewImage(index)}
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

export default EditFasilitas;