"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomContainer from "../custom/CustomContainer";
import FooterImageCommon from "../commonComponents/FooterImageCommon";
import FooterCategory from "../commonComponents/FooterCategory";
import {
  getFasilitasCategory,
  getLayananCategory,
  getInfoCategory,
  getBeritaCategories,
} from "@/app/api/public";

export default function Footer() {
  const [fasilitasCategories, setFasilitasCategories] = useState([]);
  const [layananCategories, setLayananCategories] = useState([]);
  const [infoCategories, setInfoCategories] = useState([]);
  const [beritaCategories, setBeritaCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const [fasilitas, layanan, info, berita] = await Promise.all([
          getFasilitasCategory(),
          getLayananCategory(),
          getInfoCategory(),
          getBeritaCategories(),
        ]);

        setFasilitasCategories(fasilitas);
        setLayananCategories(layanan);
        setInfoCategories(info);
        setBeritaCategories(berita);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="py-14 md:py-20 bg-red-500 text-white">
      <CustomContainer>
        <div className="flex flex-wrap justify-between gap-8">
          <div className="mr-[40px]">
            <Image
              src="/icon-semarang.png"
              alt="semarang logo"
              width="0"
              height="0"
              sizes="100vw"
              className="w-auto h-[63px]"
            />
            <p className="text-md mt-2 capitalize">
              Kelurahan tanjungmas semarang
            </p>
          </div>

          {/* Categories Sections */}
          <FooterCategory title="Fasilitas" categories={fasilitasCategories} />
          <FooterCategory title="Layanan" categories={layananCategories} />
          <FooterCategory title="Info" categories={infoCategories} />
          <FooterCategory title="Berita" categories={beritaCategories} />
        </div>
        <div className="py-8 flex md:flex-row flex-col-reverse md:justify-between md:items-center">
          <p>© Copyright Diskominfo 2025</p>
          <FooterImageCommon />
        </div>
      </CustomContainer>
    </div>
  );
}
