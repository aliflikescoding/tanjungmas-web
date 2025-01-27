"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import { getFasilitasCategory } from "@/app/api/public";
import {
  createFasilitasCategory,
  deleteFasilitasCategory,
  updateFasilitasCategory,
} from "@/app/api/private";
import { useState, useEffect } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import Link from "next/link";

const FasilitasCategory = () => {
  const [fasilitasCategories, setFasilitasCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Store the category being edited
  const [form] = Form.useForm(); // Form instance for adding
  const [editForm] = Form.useForm(); // Form instance for editing

  useEffect(() => {
    const fetchFasilitasCategories = async () => {
      try {
        const response = await getFasilitasCategory();
        setFasilitasCategories(response);
      } catch (err) {
        console.error("Failed to fetch fasilitas categories:", err);
      }
    };

    fetchFasilitasCategories();
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const showEditModal = (record) => {
    setEditingCategory(record); // Set the category being edited
    editForm.setFieldsValue({ title: record.fasilitasCategory }); // Pre-fill the form
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
      content: "Adding fasilitas category...",
      duration: 0,
    });

    try {
      await createFasilitasCategory(values.title);
      hideLoadingMessage();
      message.success("Fasilitas category added successfully!");

      const refreshedFasilitasCategories = await getFasilitasCategory();
      setFasilitasCategories(refreshedFasilitasCategories);

      form.resetFields(); // Reset the form fields after successful submission
      setIsModalOpen(false);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to add fasilitas category.");
      console.error("Error while adding fasilitas category:", err);
    }
  };

  const handleEditSubmit = async (values) => {
    const hideLoadingMessage = message.loading({
      content: "Updating fasilitas category...",
      duration: 0,
    });

    try {
      await updateFasilitasCategory(values.title, editingCategory.id);
      hideLoadingMessage();
      message.success("Fasilitas category updated successfully!");

      const refreshedFasilitasCategories = await getFasilitasCategory();
      setFasilitasCategories(refreshedFasilitasCategories);

      editForm.resetFields(); // Reset the edit form fields
      setIsEditModalOpen(false);
      setEditingCategory(null); // Clear the editing category
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to update fasilitas category.");
      console.error("Error while updating fasilitas category:", err);
    }
  };

  const handleDelete = (id) => {
    Modal.confirm({
      title: "Are you sure you want to delete this fasilitas category?",
      content: "This action cannot be undone.",
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk: async () => {
        const hideLoadingMessage = message.loading({
          content: "Deleting fasilitas category...",
          duration: 0,
        });

        try {
          await deleteFasilitasCategory(id);
          hideLoadingMessage();
          message.success("Fasilitas category deleted successfully!");
          const refreshedFasilitasCategories = await getFasilitasCategory();
          setFasilitasCategories(refreshedFasilitasCategories);
        } catch (err) {
          hideLoadingMessage();
          message.error("Failed to delete fasilitas category.");
          console.error("Error while deleting fasilitas category:", err);
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
      title: "Fasilitas Category",
      dataIndex: "fasilitasCategory",
      key: "fasilitasCategory",
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
          <Link href={`/admin/tentang/fasilitas-category/${record.id}`}>
            <Button type="default" size="medium">
              Go to Fasilitas
            </Button>
          </Link>
        </div>
      ),
    },
  ];

  const dataSource = fasilitasCategories.map((item) => ({
    key: item.id,
    id: item.id,
    fasilitasCategory: item.title,
  }));

  return (
    <div className="mt-4">
      <h1 className="text-2xl mb-4">Fasilitas Category</h1>
      <Button type="primary" onClick={showModal} className="mb-4">
        Add New Fasilitas Category
      </Button>
      <Modal
        title="Add New Fasilitas Category"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="fasilitasCategoryForm"
          onFinish={handleFormSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the fasilitas category!",
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
        title="Edit Fasilitas Category"
        open={isEditModalOpen}
        onCancel={handleEditCancel}
        footer={null}
      >
        <Form
          form={editForm}
          name="editFasilitasCategoryForm"
          onFinish={handleEditSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input the fasilitas category!",
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

export default FasilitasCategory;
