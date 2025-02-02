"use client";

import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import CustomContainer from "../custom/CustomContainer";
import { getInfoImages } from "@/app/api/public";
import Image from "next/image";

const InfoHeroImages = () => {
  const [infoImages, setInfoImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const images = await getInfoImages();
        setInfoImages(images);
      } catch (error) {
        console.error("Failed to fetch images", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="py-[12.5vh]">
      <CustomContainer className="h-full">
        <div className="mb-3">
          {" "}
          <h2 className="title2">Info</h2>
          <h1 className="title1">Konten Informasi</h1>
        </div>
        <Carousel arrows infinite={true} autoplay>
          {infoImages.map((image) => (
            <div
              className="bg-slate-400 flex justify-center items-center"
              key={image.id}
            >
              <Image
                src={image.image}
                height={0}
                width={0}
                sizes="100vw"
                alt="info image"
                className="h-auto sm:h-[500px] w-full"
              />
            </div>
          ))}
        </Carousel>
      </CustomContainer>
    </div>
  );
};

export default InfoHeroImages;
