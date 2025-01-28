// components/DataMonografi.jsx
"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import { getDataMonografi } from "@/app/api/public";
import {
  createDataMonografi,
  deleteDataMonografi,
  updateDataMonografi,
} from "@/app/api/private";
import { useState, useEffect } from "react";
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

const DataMonografi = () => {
  const [dataMonografi, setDataMonografi] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRecord, setEditingRecord] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchDataMonografi();
  }, []);

  const fetchDataMonografi = async () => {
    try {
      const response = await getDataMonografi();
      setDataMonografi(response);
    } catch (err) {
      console.error("Failed to fetch data monografi:", err);
      message.error("Failed to fetch data.");
    }
  };

  const showModal = (record = null) => {
    setIsEditMode(!!record);
    setEditingRecord(record);
    if (record) {
      form.setFieldsValue({
        title: record.title,
        link: record.link,
      });
    }
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
    setEditingRecord(null);
    form.resetFields();
  };

  const handleFormSubmit = async (values) => {
    const hideLoadingMessage = message.loading({
      content: isEditMode ? "Updating data..." : "Adding data...",
      duration: 0,
    });

    try {
      if (isEditMode) {
        await updateDataMonografi(editingRecord.id, values.title, values.link);
        message.success("Data updated successfully!");
      } else {
        await createDataMonografi(values.title, values.link);
        message.success("Data added successfully!");
      }

      const refreshedData = await getDataMonografi();
      setDataMonografi(refreshedData);
      handleCancel();
    } catch (err) {
      message.error(
        isEditMode ? "Failed to update data." : "Failed to add data."
      );
      console.error("Error:", err);
    } finally {
      hideLoadingMessage();
    }
  };

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this data?",
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
      content: "Deleting data...",
      duration: 0,
    });

    try {
      await deleteDataMonografi(id);
      hideLoadingMessage();
      message.success("Data deleted successfully!");
      const refreshedData = await getDataMonografi();
      setDataMonografi(refreshedData);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete data.");
      console.error("Error while deleting data:", err);
    }
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <div className="space-x-2">
          <Button
            onClick={() => showModal(record)}
            type="primary"
            icon={<EditOutlined />}
            size="medium"
          >
            Edit
          </Button>
          <Button
            onClick={() => showDeleteConfirm(record.id)}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="medium"
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-4">Data Monografi</h1>
      <Button type="primary" onClick={() => showModal()} className="mb-4">
        Add New Data
      </Button>
      <Modal
        title={isEditMode ? "Edit Data Monografi" : "Add New Data Monografi"}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="dataMonografiForm"
          onFinish={handleFormSubmit}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Please input the title!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            rules={[{ required: true, message: "Please input the link!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item className="flex justify-end">
            <Button type="default" onClick={handleCancel} className="mr-2">
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              {isEditMode ? "Update" : "Submit"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table columns={columns} dataSource={dataMonografi} pagination={false} />
    </div>
  );
};

export default DataMonografi;
