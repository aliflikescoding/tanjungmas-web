"use client";

import { Button, Modal, Form, Input, message, Table } from "antd";
import {
  getFasilitasCategoryBasedOnId,
  getFasilitasPreviewBasedOnCategoryId,
  deleteFasilitas,
} from "@/app/api/public";
import React, { useEffect, useState } from "react";
import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import Link from "next/link";

const { confirm } = Modal;

const Page = ({ params }) => {
  const unwrappedParams = React.use(params);
  const { slug } = unwrappedParams;

  const [name, setName] = useState("");
  const [fasilitas, setFasilitas] = useState([]);

  useEffect(() => {
    const fetchFasilitasName = async () => {
      const response = await getFasilitasCategoryBasedOnId(parseInt(slug));
      setName(response.title);
    };

    fetchFasilitasName();
  }, [slug]);

  useEffect(() => {
    const fetchFasilitas = async () => {
      const response = await getFasilitasPreviewBasedOnCategoryId(
        parseInt(slug)
      );
      setFasilitas(response);
    };

    fetchFasilitas();
  }, [slug]);

  const showDeleteConfirm = (id) => {
    confirm({
      title: "Are you sure you want to delete this fasilitas?",
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
      content: "Deleting fasilitas...",
      duration: 0,
    });

    try {
      await deleteFasilitas(id);
      hideLoadingMessage();
      message.success("Fasilitas deleted successfully!");
      const refreshedFasilitas = await getFasilitasPreviewBasedOnCategoryId(
        parseInt(slug)
      );
      setFasilitas(refreshedFasilitas);
    } catch (err) {
      hideLoadingMessage();
      message.error("Failed to delete fasilitas.");
      console.error("Error while deleting fasilitas:", err);
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
          <Link
            href={`/admin/tentang/editFasilitas/${record.id}`}
          >
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
          <Link target="_" href={`/fasilitas/${record.id}`}>
            <Button size="medium">See Fasilitas</Button>
          </Link>
        </div>
      ),
    },
  ];

  const dataSource = fasilitas.map((item) => ({
    key: item.id,
    id: item.id,
    title: item.title,
    sinopsis: item.sinopsis,
  }));

  return (
    <div>
      <h1 className="text-4xl font-medium mb-3">Fasilitas {name}</h1>
      <Link href={`/admin/tentang/fasilitas-category/${slug}/newBlog`}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          size="large"
          className="mb-4"
        >
          Create New Fasilitas
        </Button>
      </Link>
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

export default Page;
