"use client";

import { useEffect, useState } from "react";
import { Button, Modal, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Image from "next/image";
import { getLogo } from "@/app/api/public";
import { updateLogo } from "@/app/api/private"; // Assuming updateLogo is correctly imported

const { Dragger } = Upload;

const LogoImage = () => {
  const [logoUrl, setLogoUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const response = await getLogo();
        setLogoUrl(response); // Assuming the response contains the logo URL
      } catch (err) {
        console.error("Failed to fetch logo:", err);
      }
    };

    fetchLogo();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (fileToUpload) {
      const hideLoadingMessage = message.loading({ content: "Uploading logo...", duration: 0 }); // Show loading message
      try {
        await updateLogo(fileToUpload); // Upload the file using the API function
        hideLoadingMessage(); // Hide loading message
        message.success("Logo updated successfully!");
        setFileToUpload(null); // Clear selected file
        setIsModalOpen(false); // Close the modal
        // Refresh the logo after successful upload
        const refreshedLogo = await getLogo();
        setLogoUrl(refreshedLogo);
      } catch (err) {
        hideLoadingMessage(); // Hide loading message
        message.error("Failed to update logo.");
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
    name: "logo",
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
        <h1 className="text-2xl">Page Logo</h1>
        <div className="p-4 mt-2 bg-white w-fit rounded-md shadow-md flex items-center gap-4">
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt="semarang logo"
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto h-[75px]"
            />
          ) : (
            <p>Loading...</p>
          )}
          <Button type="primary" onClick={showModal} className="mt-4">
            Update Logo
          </Button>
          <Modal
            title="Update Logo"
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

export default LogoImage;
