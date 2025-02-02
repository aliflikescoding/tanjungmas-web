"use client";

import React, { useState, useEffect } from "react";
import { FaArrowDown } from "react-icons/fa";
import Link from "next/link";
import { getHeroImage } from "@/app/api/public";

const Hero = () => {
  const [heroImage, setHeroImage] = useState("");

  useEffect(() => {
    const fetchHeroImage = async () => {
      try {
        const image = await getHeroImage();
        setHeroImage(image);
      } catch (error) {
        console.error("Failed to fetch hero image:", error);
      }
    };

    fetchHeroImage();
  }, []);


  return (
    <div
      className="pt-[80px] relative h-screen flex items-center justify-center text-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(
          180deg, 
          rgba(227,42,20,0.13657212885154064) 12%, 
          rgba(198,27,6,0.27942927170868344) 50%, 
          rgba(227,42,20, 0.5315301120448179) 100%
        ), url('${heroImage}')`,
      }}
    >
      <div className="relative z-10 text-white px-4 flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Kelurahan Tanjungmas
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Selamat Datang di Website Resmi Kelurahan Tanjung Mas Kecamatan
          Semarang Utara Jl. Ronggowarsito 42 a Semarang
        </p>
        <Link href="/#info_images">
          <FaArrowDown className="text-white up-down mt-7 transition-all ease-in-out duration-500 text-5xl cursor-pointer hover:text-primary" />
        </Link>
      </div>
    </div>
  );
};

export default Hero;
