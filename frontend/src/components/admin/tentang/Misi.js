"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import { getMisi } from "@/app/api/public";
import { createMisi, deleteMisi } from "@/app/api/private";
import { useState, useEffect } from "react";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const Misi = () => {
  const [misi, setMisi] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // Add this line to get the form instance

  useEffect(() => {
    const fetchMisi = async () => {
      try {
        const response = await getMisi();
        setMisi(response);
      } catch (err) {
        console.error("Failed to fetch misi:", err);
      }
    };

    fetchMisi();
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
      content: "Adding misi...",
      duration: 0,
    });

    try {
      await createMisi(values.title);
      hideLoadingMessage();
      message.success("Misi added successfully!");

      const refreshedMisi = await getMisi();
      setMisi(refreshedMisi);

      form.resetFields(); // Reset the form fields after successful submission
      setIsModalOpen(false);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to add misi.");
      console.error("Error while adding misi:", err);
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this misi?",
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
      content: "Deleting misi...",
      duration: 0,
    });

    try {
      await deleteMisi(id);
      hideLoadingMessage();
      message.success("Misi deleted successfully!");
      const refreshedMisi = await getMisi();
      setMisi(refreshedMisi);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete misi.");
      console.error("Error while deleting misi:", err);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Misi",
      dataIndex: "misi",
      key: "misi",
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

  const dataSource = misi.map((item) => ({
    key: item.id,
    id: item.id,
    misi: item.title,
  }));

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-4">Misi</h1>
      <Button type="primary" onClick={showModal} className="mb-4">
        Add New Misi
      </Button>
      <Modal
        title="Add New Misi"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form} // Pass the form instance to the Form component
          name="misiForm"
          onFinish={handleFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input your misi!" }]}
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

export default Misi;
