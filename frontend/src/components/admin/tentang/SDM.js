"use client";

import React, { useState, useEffect } from "react";
import { getSdm } from "@/app/api/public";
import { updateSdm } from "@/app/api/private";
import { Button, Modal, Form, Input, message } from "antd";

const SDM = () => {
  const [sdm, setSdm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchSdm = async () => {
      try {
        const response = await getSdm();
        setSdm(response);
      } catch (err) {
        console.error("Failed to fetch SDM:", err);
      }
    };

    fetchSdm();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (values) => {
    const hideLoadingMessage = message.loading({
      content: "Uploading SDM...",
      duration: 0,
    });
    try {
      await updateSdm(values.sdm);
      hideLoadingMessage();
      setSdm(values.sdm);
      message.success("SDM updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update SDM:", err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mt-4">
        <h1 className="text-2xl">SDM</h1>
        <div className="p-4 mt-2 bg-white w-fit rounded-md shadow-md flex items-center gap-4">
          <p>{sdm === "" ? "no SDM currently" : sdm}</p>
          <Button type="primary" onClick={showModal}>
            Update SDM
          </Button>
        </div>
      </div>
      <Modal
        title="Update SDM"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="sdmForm"
          initialValues={{ sdm }}
          onFinish={handleOk}
          autoComplete="off"
        >
          <Form.Item
            label="SDM"
            name="sdm"
            rules={[
              {
                required: true,
                message: "Please input your SDM!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" className="ml-2" htmlType="submit">
              Ok
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default SDM;
