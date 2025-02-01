"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import { getInfoCategory } from "@/app/api/public";
import {
  createInfoCategory,
  deleteInfoCategory,
  updateInfoCategory,
} from "@/app/api/private";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";

const InfoCategory = () => {
  const [infoCategories, setInfoCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Store the category being edited
  const [form] = Form.useForm(); // Form instance for adding
  const [editForm] = Form.useForm(); // Form instance for editing

  useEffect(() => {
    const fetchInfoCategories = async () => {
      try {
        const response = await getInfoCategory();
        setInfoCategories(response);
      } catch (err) {
        console.error("Failed to fetch info categories:", err);
      }
    };

    fetchInfoCategories();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (record) => {
    setEditingCategory(record); // Set the category being edited
    editForm.setFieldsValue({ title: record.infoCategory }); // Pre-fill the form
    setIsEditModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); // Reset the form fields when the modal is closed
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    editForm.resetFields(); // Reset the edit form fields
    setEditingCategory(null); // Clear the editing category
  };

  const handleFormSubmit = async (values) => {
    const hideLoadingMessage = message.loading({
      content: "Adding info category...",
      duration: 0,
    });

    try {
      await createInfoCategory(values.title);
      hideLoadingMessage();
      message.success("Info category added successfully!");

      const refreshedInfoCategories = await getInfoCategory();
      setInfoCategories(refreshedInfoCategories);

      form.resetFields(); // Reset the form fields after successful submission
      setIsModalOpen(false);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to add info category.");
      console.error("Error while adding info category:", err);
    }
  };

  const handleEditSubmit = async (values) => {
    const hideLoadingMessage = message.loading({
      content: "Updating info category...",
      duration: 0,
    });

    try {
      await updateInfoCategory(values.title, editingCategory.id);
      hideLoadingMessage();
      message.success("Info category updated successfully!");

      const refreshedInfoCategories = await getInfoCategory();
      setInfoCategories(refreshedInfoCategories);

      editForm.resetFields(); // Reset the edit form fields
      setIsEditModalOpen(false);
      setEditingCategory(null); // Clear the editing category
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to update info category.");
      console.error("Error while updating info category:", err);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this info category?",
      content:
        "This action cannot be undone, this will also delete all info with this category.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        const hideLoadingMessage = message.loading({
          content: "Deleting info category...",
          duration: 0,
        });

        try {
          await deleteInfoCategory(id);
          hideLoadingMessage();
          message.success("Info category deleted successfully!");
          const refreshedInfoCategories = await getInfoCategory();
          setInfoCategories(refreshedInfoCategories);
        } catch (err) {
          hideLoadingMessage();
          message.error("Failed to delete info category.");
          console.error("Error while deleting info category:", err);
        }
      },
      onCancel: () => {
        console.log("Deletion cancelled");
      },
    });
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Info Category",
      dataIndex: "infoCategory",
      key: "infoCategory",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex gap-2">
          <Button
            onClick={() => showEditModal(record)}
            type="primary"
            icon={<EditOutlined />}
            size="medium"
          >
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="medium"
          >
            Delete
          </Button>
          <Link href={`/admin/info/category/${record.id}`}>
            <Button type="default" size="medium">
              Go to Info
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const dataSource = infoCategories.map((item) => ({
    key: item.id,
    id: item.id,
    infoCategory: item.title,
  }));

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-4">Info Category</h1>
      <Button type="primary" onClick={showModal} className="mb-4">
        Add New Info Category
      </Button>
      <Modal
        title="Add New Info Category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="infoCategoryForm"
          onFinish={handleFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the info category!",
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title="Edit Info Category"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          form={editForm}
          name="editInfoCategoryForm"
          onFinish={handleEditSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the info category!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type="default" onClick={handleEditCancel}>
              Cancel
            </Button>
            <Button type="primary" className="ml-2" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

export default InfoCategory;
