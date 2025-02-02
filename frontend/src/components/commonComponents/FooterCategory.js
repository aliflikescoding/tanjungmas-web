"use client";

import React from "react";
import Link from "next/link";

const FooterCategory = ({ title, categories }) => {
  return (
    <div className="flex flex-col w-[210px]">
      <h3 className="text-2xl font-bold mb-2">{title}</h3>
      {categories.map((category) => (
        <Link
          key={category.id}
          className="hover:underline my-2 capitalize"
          href={`/${title.toLowerCase()}/${category.id}`}
        >
          {category.title}
        </Link>
      ))}
    </div>
  );
};

export default FooterCategory;
