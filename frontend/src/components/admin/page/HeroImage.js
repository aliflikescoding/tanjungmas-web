"use client";

import { useEffect, useState } from "react";
import { Button, Modal, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Image from "next/image";
import { getHeroImage } from "@/app/api/public";
import { updateHeroImage } from "@/app/api/private"; // Assuming updateHeroImage is correctly imported

const { Dragger } = Upload;

const HeroImage = () => {
  const [HeroImageUrl, setHeroImageUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const response = await getHeroImage();
        setHeroImageUrl(response);
      } catch (err) {
        console.error("Failed to fetch hero image:", err);
      }
    };

    fetchHeroImage();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async () => {
    if (fileToUpload) {
      const hideLoadingMessage = message.loading({
        content: "Uploading hero image...",
        duration: 0,
      }); // Show loading message
      try {
        await updateHeroImage(fileToUpload); // Upload the file using the API function
        hideLoadingMessage(); // Hide loading message
        message.success("Hero image updated successfully!");
        setFileToUpload(null); // Clear selected file
        setIsModalOpen(false); // Close the modal
        // Refresh the hero image after successful upload
        const refreshedHeroImage = await getHeroImage();
        setHeroImageUrl(refreshedHeroImage);
      } catch (err) {
        hideLoadingMessage(); // Hide loading message
        message.error("Failed to update hero image.");
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
    name: "heroImage",
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
        <h1 className="text-2xl">Hero Image</h1>
        <div className="p-4 mt-2 bg-white w-fit rounded-md shadow-md flex items-center gap-4">
          {HeroImageUrl ? (
            <Image
              src={HeroImageUrl}
              alt="Hero Image"
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto h-[75px]"
            />
          ) : (
            <p>Loading...</p>
          )}
          <Button type="primary" onClick={showModal} className="mt-4">
            Update Hero Image
          </Button>
          <Modal
            title="Update Hero Image"
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

export default HeroImage;
