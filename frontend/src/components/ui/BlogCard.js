import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const BlogCard = ({ title, thumbnailSrc, previewText, link }) => {
  return (
    <Link
      href={`${link}`}
      className="flex flex-col h-full bg-white overflow-hidden shadow-md cursor-pointer group relative"
    >
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={`${thumbnailSrc}`}
          alt="Featured News"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(227,42,20,0.13657212885154064)] via-[rgba(198,27,6,0.27942927170868344)] to-[rgba(227,42,20,0.5315301120448179)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold capitalize mb-3 line-clamp-2">
          {title}
        </h3>
        <p className="border-l-2 pl-2 mb-4 flex-grow line-clamp-3">
          {previewText.slice(0, 100)}
          {previewText.length > 100 ? "..." : ""}
        </p>
        <div className="text-primary mt-auto flex items-center group transition-all ease-in-out">
          Baca Lebih Lanjut
          <FaArrowRightLong className="ml-1 transition-all group-hover:ml-3" />
        </div>
      </div>
      <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );
};

export default BlogCard;
