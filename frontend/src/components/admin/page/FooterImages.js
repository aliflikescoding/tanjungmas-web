"use client";

import { useEffect, useState } from "react";
import { Table } from "antd";
import { getFooterImages } from "@/app/api/public";
import { Button, Modal, message, Upload } from "antd";
import { DeleteOutlined, InboxOutlined } from "@ant-design/icons";
import { deleteFooterImage, createFooterImage } from "@/app/api/private";

const { Dragger } = Upload;

const FooterImages = () => {
  const [footerImages, setFooterImages] = useState([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);

  const showDeleteModal = (id) => {
    setSelectedImageId(id);
    setIsDeleteModalOpen(true);
  };

  useEffect(() => {
    const fetchFooterImages = async () => {
      try {
        const response = await getFooterImages();
        setFooterImages(response);
      } catch (err) {
        console.error("Failed to fetch footer images:", err);
      }
    };

    fetchFooterImages();
  }, []);

  const handleDeleteOk = async () => {
    await deleteFooterImage(selectedImageId);
    message.success(`Footer image ${selectedImageId} deleted successfully!`);
    setSelectedImageId(null);
    const refreshedFooterImages = await getFooterImages();
    setFooterImages(refreshedFooterImages);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
  };

  const handleUploadOk = async () => {
    if (fileToUpload) {
      const hideLoadingMessage = message.loading({
        content: "Uploading footer image...",
        duration: 0,
      });
      try {
        await createFooterImage(fileToUpload);
        hideLoadingMessage();
        message.success("Footer image updated successfully!");
        setFileToUpload(null);
        setIsUploadModalOpen(false);
        const refreshedFooterImages = await getFooterImages();
        setFooterImages(refreshedFooterImages);
      } catch (err) {
        hideLoadingMessage();
        message.error("Failed to upload footer image.");
      }
    } else {
      message.error("No file selected!");
    }
  };

  const handleUploadCancel = () => {
    setIsUploadModalOpen(false);
  };

  const uploadProps = {
    name: "footerImage",
    multiple: false,
    beforeUpload(file) {
      if (fileToUpload) {
        message.error("You can only upload one file at a time.");
        return false; // Prevent further file selection if a file is already chosen
      }
      setFileToUpload(file); // Store the first file selected
      return false; // Prevent automatic upload
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text) =>
        text ? (
          <img
            src={text.replace("./public", "")}
            alt="Footer"
            style={{ width: "100px", height: "auto" }}
          />
        ) : (
          "No Image"
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button
          onClick={() => showDeleteModal(record.id)}
          type="primary"
          danger
          icon={<DeleteOutlined />}
          size={"medium"}
        >
          Delete
        </Button>
      ),
    },
  ];

  const dataSource = footerImages.map((item) => ({
    key: item.id,
    id: item.id,
    image: item.image,
  }));

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-4">Footer Images</h1>
      <Button
        type="primary"
        onClick={() => setIsUploadModalOpen(true)}
        className="mb-4"
      >
        Upload New Footer Image
      </Button>
      <Modal
        title="Upload New Footer Image"
        open={isUploadModalOpen}
        onOk={handleUploadOk}
        onCancel={handleUploadCancel}
      >
        <Dragger {...uploadProps}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single upload. Only one file is allowed.
          </p>
        </Dragger>
      </Modal>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
      <Modal
        title="Confirm Delete"
        open={isDeleteModalOpen}
        onOk={handleDeleteOk}
        onCancel={handleDeleteCancel}
      >
        <p>
          Are you sure you want to delete the image with ID: {selectedImageId}?
        </p>
      </Modal>
    </div>
  );
};

export default FooterImages;
