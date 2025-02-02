"use client";

import { Button, Modal, message, Table } from "antd";
import {
  getBeritaCategoryById,
  getBeritaPreviewByCategory,
} from "@/app/api/public";
import { deleteBeritaBlog } from "@/app/api/private";
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

const Page = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const { slug } = params;

  const [name, setName] = useState("");
  const [beritaBlogs, setBeritaBlogs] = useState([]);

  useEffect(() => {
    const fetchCategoryName = async () => {
      try {
        const response = await getBeritaCategoryById(parseInt(slug));
        setName(response.title);
      } catch (error) {
        console.error("Error fetching category name:", error);
      }
    };

    fetchCategoryName();
  }, [slug]);

  useEffect(() => {
    const fetchBeritaBlogs = async () => {
      try {
        const response = await getBeritaPreviewByCategory(parseInt(slug));
        setBeritaBlogs(response);
      } catch (error) {
        console.error("Error fetching berita blogs:", error);
      }
    };

    fetchBeritaBlogs();
  }, [slug]);

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this blog?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        handleDeleteBlog(id);
      },
    });
  };

  const handleDeleteBlog = async (id) => {
    const hideLoadingMessage = message.loading({
      content: "Deleting blog...",
      duration: 0,
    });

    try {
      await deleteBeritaBlog(id);
      hideLoadingMessage();
      message.success("Blog deleted successfully!");
      const refreshedBlogs = await getBeritaPreviewByCategory(parseInt(slug));
      setBeritaBlogs(refreshedBlogs);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete blog.");
      console.error("Error while deleting blog:", err);
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
          <Link href={`/admin/berita/editBlog/${record.id}`}>
            <Button type="primary" size="medium" icon={<EditOutlined />}>
              Edit
            </Button>
          </Link>
          <Button
            onClick={() => showDeleteConfirm(record.id)}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="medium"
          >
            Delete
          </Button>
          <Link target="_blank" href={`/berita/${record.id}`}>
            <Button size="medium">See Blog</Button>
          </Link>
        </div>
      ),
    },
  ];

  const blogDataSource = beritaBlogs.map((item) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    sinopsis: item.sinopsis,
  }));

  return (
    <div>
      <Link
        href={`/admin/berita`}
        className="capitalize transition-all ease-in-out duration-150 flex gap-1 items-center font-medium mb-3 hover:text-blue-500"
      >
        <ArrowLeftOutlined className="text-2xl" />
        <p className="text-lg">Go Back</p>
      </Link>
      <h1 className="text-4xl font-medium mb-3">Berita Blog {name}</h1>
      <div className="flex gap-2">
        <Link href={`/admin/berita/category/${slug}/newBlog`}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="mb-4"
          >
            Create New Blog
          </Button>
        </Link>
      </div>
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
