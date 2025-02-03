"use client";

import React, { useState, useEffect } from "react";
import { getBigImage, getSmallImage } from "@/app/api/public";
import CustomContainer from "../custom/CustomContainer";
import Image from "next/image";

const TentangTanjungmas = () => {
  const [smallImage, setSmallImage] = useState(null);
  const [bigImage, setBigImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const smallImg = await getSmallImage();
        const bigImg = await getBigImage();
        setSmallImage(smallImg);
        setBigImage(bigImg);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div>
      <CustomContainer className="pt-[15vh] pb-[25vh]">
        <div className="flex justify-center items-center relative">
          <div className="relative min-w-[50%]">
            <div className="w-full h-full"></div>
          </div>

          <div className="absolute top-[-35px] left-[-325px]">
            <Image
              src={bigImage}
              width={0}
              height={0}
              sizes="100vw"
              className="w-[900px] h-auto "
              alt="big image"
            />
            <Image
              src={smallImage}
              width={0}
              height={0}
              sizes="100vw"
              className="w-auto h-auto absolute max-w-[300px] bottom-[-25%] left-[15%]"
              alt="big image"
            />
          </div>

          <div className="">
            <div className="mb-[55px]">
              <h2 className="title2">Tentang</h2>
              <h1 className="title1">Kelurahan Tanjungmas</h1>
            </div>
            <p className="text-xl">
              Tanjung Mas merupakan sebuah nama kelurahan di wilayah Kecamatan
              Semarang Utara, Kota Semarang, Provinsi Jawa Tengah. Di kelurahan
              ini terdapat Pelabuhan Tanjung Emas yang merupakan satu-satunya
              pelabuhan di Semarang. Kelurahan Tanjungmas memiliki jumah
              penduduk sekitar 29.073 jiwa dengan jumlah RT sebanyak 129 buah
              dan jumlah RW sebanyak 12 buah. Kelurahan Tanjungmas berbatasan
              dengan Laut Jawa disebelah Utara
            </p>
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default TentangTanjungmas;
