"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import { getLayananCategory } from "@/app/api/public";
import {
  createLayananCategory,
  deleteLayananCategory,
  updateLayananCategory,
} from "@/app/api/private";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";

const LayananCategory = () => {
  const [layananCategories, setLayananCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Store the category being edited
  const [form] = Form.useForm(); // Form instance for adding
  const [editForm] = Form.useForm(); // Form instance for editing

  useEffect(() => {
    const fetchLayananCategories = async () => {
      try {
        const response = await getLayananCategory();
        setLayananCategories(response);
      } catch (err) {
        console.error("Failed to fetch layanan categories:", err);
      }
    };

    fetchLayananCategories();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (record) => {
    setEditingCategory(record); // Set the category being edited
    editForm.setFieldsValue({ title: record.layananCategory }); // Pre-fill the form
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
      content: "Adding layanan category...",
      duration: 0,
    });

    try {
      await createLayananCategory(values.title);
      hideLoadingMessage();
      message.success("Layanan category added successfully!");

      const refreshedLayananCategories = await getLayananCategory();
      setLayananCategories(refreshedLayananCategories);

      form.resetFields(); // Reset the form fields after successful submission
      setIsModalOpen(false);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to add layanan category.");
      console.error("Error while adding layanan category:", err);
    }
  };

  const handleEditSubmit = async (values) => {
    const hideLoadingMessage = message.loading({
      content: "Updating layanan category...",
      duration: 0,
    });

    try {
      await updateLayananCategory(values.title, editingCategory.id);
      hideLoadingMessage();
      message.success("Layanan category updated successfully!");

      const refreshedLayananCategories = await getLayananCategory();
      setLayananCategories(refreshedLayananCategories);

      editForm.resetFields(); // Reset the edit form fields
      setIsEditModalOpen(false);
      setEditingCategory(null); // Clear the editing category
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to update layanan category.");
      console.error("Error while updating layanan category:", err);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this layanan category?",
      content:
        "This action cannot be undone, this will also delete all layanan with this category.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        const hideLoadingMessage = message.loading({
          content: "Deleting layanan category...",
          duration: 0,
        });

        try {
          await deleteLayananCategory(id);
          hideLoadingMessage();
          message.success("Layanan category deleted successfully!");
          const refreshedLayananCategories = await getLayananCategory();
          setLayananCategories(refreshedLayananCategories);
        } catch (err) {
          hideLoadingMessage();
          message.error("Failed to delete layanan category.");
          console.error("Error while deleting layanan category:", err);
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
      title: "Layanan Category",
      dataIndex: "layananCategory",
      key: "layananCategory",
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
          <Link href={`/admin/layanan/category/${record.id}`}>
            <Button type="default" size="medium">
              Go to Layanan
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const dataSource = layananCategories.map((item) => ({
    key: item.id,
    id: item.id,
    layananCategory: item.title,
  }));

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-4">Layanan Category</h1>
      <Button type="primary" onClick={showModal} className="mb-4">
        Add New Layanan Category
      </Button>
      <Modal
        title="Add New Layanan Category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="layananCategoryForm"
          onFinish={handleFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the layanan category!",
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
        title="Edit Layanan Category"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          form={editForm}
          name="editLayananCategoryForm"
          onFinish={handleEditSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the layanan category!",
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

export default LayananCategory;
