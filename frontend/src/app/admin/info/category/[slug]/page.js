"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import {
  getInfoCategoryBasedOnId,
  getInfoBlogPreviewBasedOnCategoryId,
  getInfoTextPreviewBasedOnCategoryId,
} from "@/app/api/public";
import { deleteInfoBlog, deleteInfoText } from "@/app/api/private"; // Import the new function
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
  const [infoBlog, setInfoBlog] = useState([]);
  const [infoText, setInfoText] = useState([]);

  useEffect(() => {
    const fetchInfoName = async () => {
      const response = await getInfoCategoryBasedOnId(parseInt(slug));
      setName(response.title);
    };

    fetchInfoName();
  }, [slug]);

  useEffect(() => {
    const fetchInfoBlog = async () => {
      const response = await getInfoBlogPreviewBasedOnCategoryId(
        parseInt(slug)
      );
      setInfoBlog(response);
    };

    fetchInfoBlog();
  }, [slug]);

  useEffect(() => {
    const fetchInfoText = async () => {
      const response = await getInfoTextPreviewBasedOnCategoryId(
        parseInt(slug)
      );
      console.log(response);
      setInfoText(response);
    };

    fetchInfoText();
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
      content: "Deleting info blog...",
      duration: 0,
    });

    try {
      await deleteInfoBlog(id);
      hideLoadingMessage();
      message.success("Info blog deleted successfully!");
      const refreshedInfoBlog = await getInfoBlogPreviewBasedOnCategoryId(
        parseInt(slug)
      );
      setInfoBlog(refreshedInfoBlog);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete info blog.");
      console.error("Error while deleting info blog:", err);
    }
  };

  const handleDeleteText = async (id) => {
    const hideLoadingMessage = message.loading({
      content: "Deleting info text...",
      duration: 0,
    });

    try {
      await deleteInfoText(id);
      hideLoadingMessage();
      message.success("Info text deleted successfully!");
      const refreshedInfoText = await getInfoTextPreviewBasedOnCategoryId(
        parseInt(slug)
      );
      setInfoText(refreshedInfoText);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete info text.");
      console.error("Error while deleting info text:", err);
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
          <Link href={`/admin/info/editBlog/${record.id}`}>
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
          <Link target="_" href={`/info-blog/${record.id}`}>
            <Button size="medium">See Info Blog</Button>
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
          <Link href={`/admin/info/editText/${record.id}`}>
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

  const blogDataSource = infoBlog.map((item) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    sinopsis: item.sinopsis,
  }));

  const textDataSource = infoText.map((item) => ({
    key: item.id,
    id: item.id,
    title: item.title,
  }));

  return (
    <div>
      <Link
        href={`/admin/info`}
        className="capitalize transition-all ease-in-out duration-150 flex gap-1 items-center font-medium mb-3 hover:text-blue-500"
      >
        <ArrowLeftOutlined className="text-2xl" />{" "}
        <p className="text-lg">Go Back</p>
      </Link>
      <h1 className="text-4xl font-medium mb-3">Info Blog {name}</h1>
      <div className="flex gap-2">
        <Link href={`/admin/info/category/${slug}/newBlog`}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="mb-4"
          >
            Create New Info Blog
          </Button>
        </Link>
        <Link href={`/admin/info/category/${slug}/newText`}>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            size="large"
            className="mb-4"
          >
            Create New Info Text
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
