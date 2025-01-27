"use client";

import React, { useState, useEffect } from "react";
import { getVisi } from "@/app/api/public";
import { updateVisi } from "@/app/api/private";
import { Button, Modal, Form, Input, message } from "antd";

const Visi = () => {
  const [visi, setVisi] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchVisi = async () => {
      try {
        const response = await getVisi();
        setVisi(response);
      } catch (err) {
        console.error("Failed to fetch visi:", err);
      }
    };

    fetchVisi();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (values) => {
    const hideLoadingMessage = message.loading({
      content: "Uploading visi...",
      duration: 0,
    });
    try {
      await updateVisi(values.visi);
      hideLoadingMessage();
      setVisi(values.visi);
      message.success("Visi updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update visi:", err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mt-4">
        <h1 className="text-2xl">Visi</h1>
        <div className="p-4 mt-2 bg-white w-fit rounded-md shadow-md flex items-center gap-4">
          <p>{visi === "" ? "no visi currently" : visi}</p>
          <Button type="primary" onClick={showModal}>
            Update Visi
          </Button>
        </div>
      </div>
      <Modal
        title="Update Visi"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="visiForm"
          initialValues={{ visi }}
          onFinish={handleOk}
          autoComplete="off"
        >
          <Form.Item
            label="Visi"
            name="visi"
            rules={[
              {
                required: true,
                message: "Please input your visi!",
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

export default Visi;
