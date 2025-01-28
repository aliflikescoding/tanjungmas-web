"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import { getSarana } from "@/app/api/public";
import { createSarana, deleteSarana } from "@/app/api/private";
import { useState, useEffect } from "react";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const Sarana = () => {
  const [sarana, setSarana] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // Add this line to get the form instance

  useEffect(() => {
    const fetchSarana = async () => {
      try {
        const response = await getSarana();
        setSarana(response);
      } catch (err) {
        console.error("Failed to fetch sarana:", err);
      }
    };

    fetchSarana();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset the form fields when the modal is closed
  };

  const handleFormSubmit = async (values) => {
    const hideLoadingMessage = message.loading({
      content: "Adding sarana...",
      duration: 0,
    });

    try {
      await createSarana(values.title);
      hideLoadingMessage();
      message.success("Sarana added successfully!");

      const refreshedSarana = await getSarana();
      setSarana(refreshedSarana);

      form.resetFields(); // Reset the form fields after successful submission
      setIsModalOpen(false);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to add sarana.");
      console.error("Error while adding sarana:", err);
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this sarana?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDelete(id);
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const handleDelete = async (id) => {
    const hideLoadingMessage = message.loading({
      content: "Deleting sarana...",
      duration: 0,
    });

    try {
      await deleteSarana(id);
      hideLoadingMessage();
      message.success("Sarana deleted successfully!");
      const refreshedSarana = await getSarana();
      setSarana(refreshedSarana);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete sarana.");
      console.error("Error while deleting sarana:", err);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Sarana",
      dataIndex: "sarana",
      key: "sarana",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <Button
          onClick={() => showDeleteConfirm(record.id)}
          type="primary"
          danger
          icon={<DeleteOutlined />}
          size="medium"
        >
          Delete
        </Button>
      ),
    },
  ];

  const dataSource = sarana?.map((item) => ({
    key: item.id,
    id: item.id,
    sarana: item.title,
  }));

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-4">Sarana</h1>
      <Button type="primary" onClick={showModal} className="mb-4">
        Add New Sarana
      </Button>
      <Modal
        title="Add New Sarana"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form} // Pass the form instance to the Form component
          name="saranaForm"
          onFinish={handleFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your sarana!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="primary" className="ml-2" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

export default Sarana;
