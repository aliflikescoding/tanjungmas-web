"use client";

import { getFasilitasCategoryBasedOnId } from "@/app/api/public";
import React, { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";

const Page = ({ params }) => {
  // Unwrap the params object using React.use()
  const unwrappedParams = React.use(params);
  const { slug } = unwrappedParams;

  const [name, setName] = useState("");

  useEffect(() => {
    const fetchFasilitasName = async () => {
      const response = await getFasilitasCategoryBasedOnId(parseInt(slug));
      setName(response.title);
    };

    fetchFasilitasName();
  }, [slug]);

  return (
    <div>
      <h1 className="text-4xl font-medium mb-3">Fasilitas {name}</h1>
      <Link href={`/admin/tentang/fasilitas-category/${slug}/newBlog`}>
        <Button type="primary" icon={<PlusOutlined />} size="large">
          Create New Fasilitas
        </Button>
      </Link>
    </div>
  );
};

export default Page;
