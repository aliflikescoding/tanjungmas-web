"use client";

import React, { useEffect, useState } from "react";
import { getInfoBlogPreview } from "@/app/api/public";
import CustomContainer from "../custom/CustomContainer";
import BlogCard from "../ui/BlogCard";

const InfoBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await getInfoBlogPreview();
        setBlogs(response);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="py-20">
      <CustomContainer>
        <h2 className="title2">Info</h2>
        <h1 className="title1">Info Artikel</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {blogs?.map((berita) => (
            <BlogCard
              key={berita.id}
              title={berita.title}
              thumbnailSrc={berita.images?.[0]?.img || "/default-image.jpg"}
              previewText={berita.sinopsis}
              link={`/berita/${berita.id}`}
            />
          ))}
        </div>
      </CustomContainer>
    </div>
  );
};

export default InfoBlogs;
