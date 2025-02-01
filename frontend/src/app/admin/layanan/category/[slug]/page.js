"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import {
  getLayananCategoryBasedOnId,
  getLayananBlogPreviewBasedOnCategoryId,
  getLayananTextBasedOnCategoryId,
} from "@/app/api/public";
import { deleteLayananBlog, deleteLayanantext } from "@/app/api/private"; // Import the new function
import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { confirm } = Modal;

const Page = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { slug } = unwrappedParams;

  const [name, setName] = useState("");
  const [layananBlog, setLayananBlog] = useState([]);
  const [layananText, setLayananText] = useState([]);

  useEffect(() => {
    const fetchLayananName = async () => {
      const response = await getLayananCategoryBasedOnId(parseInt(slug));
      setName(response.title);
    };

    fetchLayananName();
  }, [slug]);

  useEffect(() => {
    const fetchLayananBlog = async () => {
      const response = await getLayananBlogPreviewBasedOnCategoryId(
        parseInt(slug)
      );
      setLayananBlog(response);
    };

    fetchLayananBlog();
  }, [slug]);

  useEffect(() => {
    const fetchLayananText = async () => {
      const response = await getLayananTextBasedOnCategoryId(parseInt(slug));
      console.log(response);
      setLayananText(response);
    };

    fetchLayananText();
  }, [slug]);

  const showDeleteConfirm = (id, type) => {
    confirm({
      title: `Are you sure you want to delete this ${type}?`,
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        if (type === "blog") {
          handleDeleteBlog(id);
        } else if (type === "text") {
          handleDeleteText(id);
        }
      },
      onCancel() {
        console.log("Deletion cancelled");
      },
    });
  };

  const handleDeleteBlog = async (id) => {
    const hideLoadingMessage = message.loading({
      content: "Deleting layanan blog...",
      duration: 0,
    });

    try {
      await deleteLayananBlog(id);
      hideLoadingMessage();
      message.success("Layanan blog deleted successfully!");
      const refreshedLayananBlog = await getLayananBlogPreviewBasedOnCategoryId(
        parseInt(slug)
      );
      setLayananBlog(refreshedLayananBlog);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete layanan blog.");
      console.error("Error while deleting layanan blog:", err);
    }
  };

  const handleDeleteText = async (id) => {
    const hideLoadingMessage = message.loading({
      content: "Deleting layanan text...",
      duration: 0,
    });

    try {
      await deleteLayanantext(id);
      hideLoadingMessage();
      message.success("Layanan text deleted successfully!");
      const refreshedLayananText = await getLayananTextBasedOnCategoryId(
        parseInt(slug)
      );
      setLayananText(refreshedLayananText);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete layanan text.");
      console.error("Error while deleting layanan text:", err);
    }
  };

  const blogColumns = [
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
      title: "Sinopsis",
      dataIndex: "sinopsis",
      key: "sinopsis",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex gap-2">
          <Link href={`/admin/layanan/editBlog/${record.id}`}>
            <Button type="primary" size="medium" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => showDeleteConfirm(record.id, "blog")}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="medium"
          >
            Delete
          </Button>
          <Link target="_" href={`/layanan-blog/${record.id}`}>
            <Button size="medium">See Layanan Blog</Button>
          </Link>
        </div>
      ),
    },
  ];

  const textColumns = [
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
      title: "Action",
      key: "action",
      render: (record) => (
        <div className="flex gap-2">
          <Link href={`/admin/layanan/editText/${record.id}`}>
            <Button type="primary" size="medium" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => showDeleteConfirm(record.id, "text")}
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

  const blogDataSource = layananBlog.map((item) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    sinopsis: item.sinopsis,
  }));

  const textDataSource = layananText.map((item) => ({
    key: item.id,
    id: item.id,
    title: item.title,
  }));

  return (
    <div>
      <Link
        href={`/admin/layanan`}
        className="capitalize transition-all ease-in-out duration-150 flex gap-1 items-center font-medium mb-3 hover:text-blue-500"
      >
        <ArrowLeftOutlined className="text-2xl" />{" "}
        <p className="text-lg">Go Back</p>
      </Link>
      <h1 className="text-4xl font-medium mb-3">Layanan Blog {name}</h1>
      <div className="flex gap-2">
        <Link href={`/admin/layanan/category/${slug}/newBlog`}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="mb-4"
          >
            Create New Layanan Blog
          </Button>
        </Link>
        <Link href={`/admin/layanan/category/${slug}/newText`}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="mb-4"
          >
            Create New Layanan Text
          </Button>
        </Link>
      </div>
      <h1 className="text-2xl my-2">Texts</h1>
      <Table
        columns={textColumns}
        dataSource={textDataSource}
        pagination={false}
      />

      <h1 className="text-2xl my-2">Blogs</h1>
      <Table
        columns={blogColumns}
        dataSource={blogDataSource}
        pagination={false}
      />
    </div>
  );
};

export default Page;
