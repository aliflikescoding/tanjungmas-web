"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import {
  getLayananCategoryBasedOnId,
  getLayananBlogPreviewBasedOnCategoryId,
} from "@/app/api/public";
import { deleteLayananBlog } from "@/app/api/private";
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

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this layanan blog?",
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
            onClick={() => showDeleteConfirm(record.id)}
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

  const dataSource = layananBlog.map((item) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    sinopsis: item.sinopsis,
  }));

  return (
    <div>
      <Link
        href={`/admin/tentang`}
        className="capitalize transition-all ease-in-out duration-150 flex gap-1 items-center font-medium mb-3 hover:text-blue-500"
      >
        <ArrowLeftOutlined className="text-2xl" />{" "}
        <p className="text-lg">Go Back</p>
      </Link>
      <h1 className="text-4xl font-medium mb-3">Layanan Blog {name}</h1>
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
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

export default Page;
