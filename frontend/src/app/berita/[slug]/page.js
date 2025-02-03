"use client";

import React, { useState, useEffect } from "react";
import { getBeritaById } from "@/app/api/public";
import Image from "next/image";
import CustomLayout from "@/components/common/CustomLayout";
import CustomContainer from "@/components/custom/CustomContainer";
import { Carousel } from "antd";

const FasilitasBlogPage = ({ params: paramsPromise }) => {
  const params = React.use(paramsPromise);
  const { slug } = params;

  if (!slug || isNaN(parseInt(slug))) {
    return <div>Error: Invalid slug</div>;
  }

  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blogData = await getBeritaById(parseInt(slug));
        setBlog(blogData);
      } catch (error) {
        console.error("Error fetching blog data:", error);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    console.log("Blog data:", blog);
  }, [blog]);


  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <CustomLayout blackText={true}>
      <div className="mt-[100px]"></div>
      <CustomContainer>
        <div className="pb-20 sm:pb-[20vh]">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium mb-11 text-primary">
            {blog.title}
          </h1>
          {blog.images?.length > 1 ? (
            <div className="w-full">
              <Carousel arrows infinite={false} className="w-full">
                {blog.images?.map((image) => (
                  <div key={image.id} className="w-full">
                    <Image
                      src={image.img}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt="blog image"
                      className="w-full h-auto"
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          ) : (
            blog.images?.map((image) => (
              <Image
                key={image.id}
                src={image.img}
                width={0}
                height={0}
                sizes="100vw"
                alt="blog image"
                className="w-full h-auto"
              />
            ))
          )}
          <div className="mt-11">
            <div
              className="blog"
              dangerouslySetInnerHTML={{ __html: blog.beritaContent }}
            />
          </div>
        </div>
      </CustomContainer>
    </CustomLayout>
  );
};

export default FasilitasBlogPage;
