"use client";

import { useEffect, useState } from "react";
import { Button, Modal, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Image from "next/image";
import { getBigImage } from "@/app/api/public";
import { updateBigImage } from "@/app/api/private"; // Assuming updateBigImage is correctly imported

const { Dragger } = Upload;

const BigImage = () => {
  const [BigImageUrl, setBigImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    const fetchBigImage = async () => {
      try {
        const response = await getBigImage();
        setBigImageUrl(response);
      } catch (err) {
        console.error("Failed to fetch big image:", err);
      }
    };

    fetchBigImage();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (fileToUpload) {
      const hideLoadingMessage = message.loading({
        content: "Uploading big image...",
        duration: 0,
      }); // Show loading message
      try {
        await updateBigImage(fileToUpload); // Upload the file using the API function
        hideLoadingMessage(); // Hide loading message
        message.success("Big image updated successfully!");
        setFileToUpload(null); // Clear selected file
        setIsModalOpen(false); // Close the modal
        // Refresh the big image after successful upload
        const refreshedBigImage = await getBigImage();
        setBigImageUrl(refreshedBigImage);
      } catch (err) {
        hideLoadingMessage(); // Hide loading message
        message.error("Failed to update big image.");
      }
    } else {
      message.error("No file selected!");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setFileToUpload(null); // Clear selected file on cancel
  };

  const uploadProps = {
    name: "bigImage",
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

  return (
    <>
      <div className="mt-4">
        <h1 className="text-2xl">Big Image</h1>
        <div className="p-4 mt-2 bg-white w-fit rounded-md shadow-md flex items-center gap-4">
          {BigImageUrl ? (
            <Image
              src={BigImageUrl}
              alt="Big Image"
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto h-[75px]"
              priority
            />
          ) : (
            <p>Loading...</p>
          )}
          <Button type="primary" onClick={showModal} className="mt-4">
            Update Big Image
          </Button>
          <Modal
            title="Update Big Image"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
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
        </div>
      </div>
    </>
  );
};

export default BigImage;
