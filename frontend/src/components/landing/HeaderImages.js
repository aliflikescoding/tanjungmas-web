"use client";

import { useEffect, useState } from "react";
import { getNavbarImages } from "@/app/api/public";
import Image from "next/image";

const HeaderImages = () => {
  const [headerImages, setHeaderImages] = useState([]);

  useEffect(() => {
    const fetchNavbarImages = async () => {
      try {
        const response = await getNavbarImages();
        setHeaderImages(response);
      } catch (err) {
        console.error("Failed to fetch navbar images:", err);
      }
    };

    fetchNavbarImages();
  }, []);

  return (
    <div className="hidden md:flex gap-2">
      {headerImages.map((image) => (
        <Image
          key={image.id}
          src={`${image.image}`}
          alt="navbar image"
          width="0"
          height="0"
          sizes="100vw"
          className="w-auto max-h-[35px]"
        />
      ))}
    </div>
  );
};

export default HeaderImages;
