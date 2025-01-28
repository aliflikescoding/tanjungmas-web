"use client";

import React, { useState, useEffect } from "react";
import { getRegulasi } from "@/app/api/public";
import { updateRegulasi } from "@/app/api/private";
import { Button, Modal, Form, Input, message } from "antd";

const Regulasi = () => {
  const [regulasi, setRegulasi] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRegulasi = async () => {
      try {
        const response = await getRegulasi();
        setRegulasi(response);
      } catch (err) {
        console.error("Failed to fetch Regulasi:", err);
      }
    };

    fetchRegulasi();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (values) => {
    const hideLoadingMessage = message.loading({
      content: "Uploading Regulasi...",
      duration: 0,
    });
    try {
      await updateRegulasi(values.regulasi);
      hideLoadingMessage();
      setRegulasi(values.regulasi);
      message.success("Regulasi updated successfully!");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Failed to update Regulasi:", err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="mt-4">
        <h1 className="text-2xl">Regulasi</h1>
        <div className="p-4 mt-2 bg-white w-fit rounded-md shadow-md flex items-center gap-4">
          <p>{regulasi === "" ? "no Regulasi currently" : regulasi}</p>
          <Button type="primary" onClick={showModal}>
            Update Regulasi
          </Button>
        </div>
      </div>
      <Modal
        title="Update Regulasi"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="regulasiForm"
          initialValues={{ regulasi }}
          onFinish={handleOk}
          autoComplete="off"
        >
          <Form.Item
            label="Regulasi"
            name="regulasi"
            rules={[
              {
                required: true,
                message: "Please input your Regulasi!",
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

export default Regulasi;
