"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import { getPrasarana } from "@/app/api/public";
import { createPrasarana, deletePrasarana } from "@/app/api/private";
import { useState, useEffect } from "react";
import { DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const Prasarana = () => {
  const [prasarana, setPrasarana] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm(); // Add this line to get the form instance

  useEffect(() => {
    const fetchPrasarana = async () => {
      try {
        const response = await getPrasarana();
        setPrasarana(response);
      } catch (err) {
        console.error("Failed to fetch prasarana:", err);
      }
    };

    fetchPrasarana();
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
      content: "Adding prasarana...",
      duration: 0,
    });

    try {
      await createPrasarana(values.title);
      hideLoadingMessage();
      message.success("Prasarana added successfully!");

      const refreshedPrasarana = await getPrasarana();
      setPrasarana(refreshedPrasarana);

      form.resetFields(); // Reset the form fields after successful submission
      setIsModalOpen(false);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to add prasarana.");
      console.error("Error while adding prasarana:", err);
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this prasarana?",
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
      content: "Deleting prasarana...",
      duration: 0,
    });

    try {
      await deletePrasarana(id);
      hideLoadingMessage();
      message.success("Prasarana deleted successfully!");
      const refreshedPrasarana = await getPrasarana();
      setPrasarana(refreshedPrasarana);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete prasarana.");
      console.error("Error while deleting prasarana:", err);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Prasarana",
      dataIndex: "prasarana",
      key: "prasarana",
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

  const dataSource = prasarana?.map((item) => ({
    key: item.id,
    id: item.id,
    prasarana: item.title,
  }));

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-4">Prasarana</h1>
      <Button type="primary" onClick={showModal} className="mb-4">
        Add New Prasarana
      </Button>
      <Modal
        title="Add New Prasarana"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form} // Pass the form instance to the Form component
          name="prasaranaForm"
          onFinish={handleFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              { required: true, message: "Please input your prasarana!" },
            ]}
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

export default Prasarana;
