"use client";

import { useState, useEffect } from "react";
import { getFooterImages } from "@/app/api/public";
import Image from "next/image";

const FooterImageCommon = () => {
  const [footerImages, setFooterImages] = useState([]);

  useEffect(() => {
    const fetchFooterImages = async () => {
      try {
        const response = await getFooterImages();
        setFooterImages(response);
      } catch (err) {
        console.error("Failed to fetch navbar images:", err);
      }
    };

    fetchFooterImages();
  }, []);

  return (
    <div className="flex gap-8 flex-wrap justify-center sm:mb-0 mb-3">
      {footerImages.map((image) => (
        <Image
          key={image.id}
          src={`${image.image}`}
          alt={"footer image"}
          width="0"
          height="0"
          sizes="100vw"
          className="w-auto h-auto max-h-[35px]"
        />
      ))}
    </div>
  );
};

export default FooterImageCommon;
