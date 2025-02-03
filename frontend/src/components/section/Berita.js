"use client";

import React, { useState, useEffect } from "react";
import CustomContainer from "@/components/custom/CustomContainer";
import {
  getBeritaPreview,
  getBeritaCategories,
  getBeritaPreviewByCategory,
} from "@/app/api/public";
import BlogCard from "@/components/ui/BlogCard.js";
import Link from "next/link.js";
import { FaArrowRightLong } from "react-icons/fa6";
import { Tabs } from "antd";

const Berita = ({ limitedView = false }) => {
  const [featuredNews, setFeaturedNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchBerita = async () => {
      try {
        const berita = await getBeritaPreview();
        setFeaturedNews(berita);
      } catch (error) {
        console.error("Failed to fetch berita preview:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categories = await getBeritaCategories();
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch berita categories:", error);
      }
    };

    fetchBerita();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchBeritaByCategory = async () => {
      if (selectedCategory) {
        try {
          const berita = await getBeritaPreviewByCategory(selectedCategory);
          setFeaturedNews(berita);
        } catch (error) {
          console.error("Failed to fetch berita by category:", error);
        }
      } else {
        const fetchBerita = async () => {
          try {
            const berita = await getBeritaPreview();
            setFeaturedNews(berita);
          } catch (error) {
            console.error("Failed to fetch berita preview:", error);
          }
        };

        fetchBerita();
      }
    };

    fetchBeritaByCategory();
  }, [selectedCategory]);

  const handleCategoryChange = (key) => {
    setSelectedCategory(key === "all" ? null : key);
  };

  const items = [
    {
      key: "all",
      label: "All",
    },
    ...categories.map((category) => ({
      key: category.id,
      label: category.title,
    })),
  ];

  return (
    <div className="py-20">
      <CustomContainer>
        <h2 className="title2">Berita</h2>
        <h1 className="title1">{limitedView ? "Berita Terkini" : "Semua Berita"}</h1>
        {!limitedView && (
          <div className="mt-4">
            <Tabs
              defaultActiveKey="all"
              items={items}
              onChange={handleCategoryChange}
            />
          </div>
        )}

        {featuredNews.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-semibold my-10">
            Tidak ada berita
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {(limitedView ? featuredNews.slice(0, 3) : featuredNews).map(
              (berita) => (
                <BlogCard
                  key={berita.id}
                  title={berita.title}
                  thumbnailSrc={berita.images?.[0]?.img || "/default-image.jpg"}
                  previewText={berita.sinopsis}
                  link={`/berita/${berita.id}`}
                />
              )
            )}
          </div>
        )}

        {limitedView && featuredNews.length > 0 && (
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
