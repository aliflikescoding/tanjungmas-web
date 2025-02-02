"use client";

import React, { useState, useEffect } from "react";
import CustomContainer from "@/components/custom/CustomContainer";
import { getBeritaPreview } from "@/app/api/public";
import BlogCard from "@/components/ui/BlogCard.js";
import Link from "next/link.js";
import { FaArrowRightLong } from "react-icons/fa6";

const Berita = ({ limitedView = false }) => {
  const [featuredNews, setFeaturedNews] = useState([]);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const berita = await getBeritaPreview();
        setFeaturedNews(berita);
      } catch (error) {
        console.error("Failed to fetch berita preview:", error);
      }
    };

    fetchBerita();
  }, []);

  useEffect(() => {
    console.log(featuredNews);
  }, [featuredNews]);

  return (
    <div className="py-20">
      <CustomContainer>
        <h2 className="title2">Berita</h2>
        <h1 className="title1">Berita Terkini</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          {(limitedView ? featuredNews.slice(0, 3) : featuredNews).map(
            (berita) => (
              <BlogCard
                key={berita.id}
                title={berita.title}
                thumbnailSrc={berita.images[0].img}
                previewText={berita.sinopsis}
                link={berita.link}
              />
            )
          )}
        </div>
        {limitedView && (
          <Link
            className="text-2xl font-normal text-primary mt-auto flex items-center group transition-all ease-in-out"
            href="/berita"
          >
            <p className="relative">
              Baca Semua Berita
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </p>
            <FaArrowRightLong className="ml-2 transition-all group-hover:ml-4" />
          </Link>
        )}
      </CustomContainer>
    </div>
  );
};

export default Berita;
