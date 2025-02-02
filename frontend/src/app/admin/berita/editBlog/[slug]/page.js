"use client";

import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Form, Input, Button, Upload, Modal, message } from "antd";
import {
  UploadOutlined,
  InboxOutlined,
  DeleteOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import { updateBeritaBlog } from "@/app/api/private";
import { getBeritaById } from "@/app/api/public";
import { useRouter } from "next/navigation";
import Link from "next/link";

const { Dragger } = Upload;

const EditBeritaBlog = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const { slug } = params;

  const [berita, setBerita] = useState(null);
  const [form] = Form.useForm();
  const [content, setContent] = useState("");
  const [existingImages, setExistingImages] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filesToUpload, setFilesToUpload] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchBerita = async () => {
      const response = await getBeritaById(parseInt(slug));
      console.log(response);
      setBerita(response);
      form.setFieldsValue({
        title: response.title,
        sinopsis: response.sinopsis,
      });
      setContent(response.beritaContent);
      setExistingImages(response.images || []);
    };
    fetchBerita();
  }, [slug, form]);

  const handleImageUpload = (files) => {
    setFilesToUpload(files);
  };

  const handleModalOk = () => {
    if (filesToUpload.length > 0) {
      setNewImages((prev) => [...prev, ...filesToUpload]);
      setFilesToUpload([]);
      setIsModalOpen(false);
      message.success("Files added successfully!");
    } else {
      message.error("No files selected!");
    }
  };

  const handleModalCancel = () => {
    setIsModalOpen(false);
    setFilesToUpload([]);
  };

  const handleRemoveExistingImage = (imageId) => {
    setExistingImages((prev) => prev.filter((img) => img.id !== imageId));
    message.success("Image removed successfully!");
  };

  const handleRemoveNewImage = (fileIndex) => {
    setNewImages((prev) => prev.filter((_, index) => index !== fileIndex));
    message.success("Image removed successfully!");
  };

  const handleSubmit = async (values) => {
    setIsLoading(true);
    const hideLoadingMessage = message.loading({
      content: "Updating berita blog...",
      duration: 0,
    });

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("sinopsis", values.sinopsis);
    formData.append("beritaContent", content);
    formData.append("categoryId", berita.categoryId);

    existingImages.forEach((image) => {
      formData.append("existingImageIds", image.id);
    });

    newImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      await updateBeritaBlog(parseInt(slug), formData);
      hideLoadingMessage();
      setIsLoading(false);
      message.success("Berita blog updated successfully!");
      setTimeout(() => {
        router.push(`/admin/berita/category/${berita.categoryId}`);
      }, 1000);
    } catch (err) {
      hideLoadingMessage();
      setIsLoading(false);
      message.error("Failed to update berita blog.");
    }
  };

  const uploadProps = {
    name: "file",
    multiple: true,
    beforeUpload(file, fileList) {
      handleImageUpload(fileList);
      return false;
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <div>
      <Link
        href={`/admin/berita/category/${berita?.categoryId}`}
        className="capitalize transition-all ease-in-out duration-150 flex gap-1 items-center font-medium mb-3 hover:text-blue-500"
      >
        <ArrowLeftOutlined className="text-2xl" />
        <p className="text-lg">Go Back</p>
      </Link>
      <h1 className="text-4xl font-medium mb-3 capitalize">
        Edit {berita?.title}
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
              {newImages.map((file, index) => (
                <div key={index} className="inline-block mr-2 relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`New ${index}`}
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
            <Button
              size="large"
              type="primary"
              htmlType="submit"
              loading={isLoading}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
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
        </Dragger>
      </Modal>
    </div>
  );
};

export default EditBeritaBlog;
