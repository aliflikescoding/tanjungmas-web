"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import { getBeritaCategories } from "@/app/api/public";
import {
  createBeritaCategory,
  deleteBeritaCategory,
  updateBeritaCategory,
} from "@/app/api/private";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";

const BeritaCategory = () => {
  const [beritaCategories, setBeritaCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Store the category being edited
  const [form] = Form.useForm(); // Form instance for adding
  const [editForm] = Form.useForm(); // Form instance for editing

  useEffect(() => {
    const fetchBeritaCategories = async () => {
      try {
        const response = await getBeritaCategories();
        setBeritaCategories(response);
      } catch (err) {
        console.error("Failed to fetch berita categories:", err);
      }
    };

    fetchBeritaCategories();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (record) => {
    setEditingCategory(record); // Set the category being edited
    editForm.setFieldsValue({ title: record.beritaCategory }); // Pre-fill the form
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
      content: "Adding berita category...",
      duration: 0,
    });

    try {
      await createBeritaCategory(values.title);
      hideLoadingMessage();
      message.success("Berita category added successfully!");

      const refreshedBeritaCategories = await getBeritaCategories();
      setBeritaCategories(refreshedBeritaCategories);

      form.resetFields(); // Reset the form fields after successful submission
      setIsModalOpen(false);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to add berita category.");
      console.error("Error while adding berita category:", err);
    }
  };

  const handleEditSubmit = async (values) => {
    const hideLoadingMessage = message.loading({
      content: "Updating berita category...",
      duration: 0,
    });

    try {
      await updateBeritaCategory(editingCategory.id, values.title);
      hideLoadingMessage();
      message.success("Berita category updated successfully!");

      const refreshedBeritaCategories = await getBeritaCategories();
      setBeritaCategories(refreshedBeritaCategories);

      editForm.resetFields(); // Reset the edit form fields
      setIsEditModalOpen(false);
      setEditingCategory(null); // Clear the editing category
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to update berita category.");
      console.error("Error while updating berita category:", err);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this berita category?",
      content:
        "This action cannot be undone, this will also delete all berita with this category.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        const hideLoadingMessage = message.loading({
          content: "Deleting berita category...",
          duration: 0,
        });

        try {
          await deleteBeritaCategory(id);
          hideLoadingMessage();
          message.success("Berita category deleted successfully!");
          const refreshedBeritaCategories = await getBeritaCategories();
          setBeritaCategories(refreshedBeritaCategories);
        } catch (err) {
          hideLoadingMessage();
          message.error("Failed to delete berita category.");
          console.error("Error while deleting berita category:", err);
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
      title: "Berita Category",
      dataIndex: "beritaCategory",
      key: "beritaCategory",
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
          <Link href={`/admin/berita/category/${record.id}`}>
            <Button type="default" size="medium">
              Go to Berita
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const dataSource = beritaCategories.map((item) => ({
    key: item.id,
    id: item.id,
    beritaCategory: item.title,
  }));

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-4">Berita Category</h1>
      <Button type="primary" onClick={showModal} className="mb-4">
        Add New Berita Category
      </Button>
      <Modal
        title="Add New Berita Category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="beritaCategoryForm"
          onFinish={handleFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the berita category!",
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
        title="Edit Berita Category"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          form={editForm}
          name="editBeritaCategoryForm"
          onFinish={handleEditSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the berita category!",
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

export default BeritaCategory;
