"use client";

import React, { useState, useEffect } from "react";
import CustomContainer from "@/components/custom/CustomContainer";
import {
  getFasilitasPreview,
  getFasilitasCategory,
  getFasilitasPreviewBasedOnCategoryId,
} from "@/app/api/public";
import BlogCard from "@/components/ui/BlogCard.js";
import Link from "next/link.js";
import { FaArrowRightLong } from "react-icons/fa6";
import { Tabs } from "antd";

const Fasilitas = ({ limitedView = false }) => {
  const [featuredFasilitas, setFeaturedFasilitas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchFasilitas = async () => {
      try {
        const fasilitas = await getFasilitasPreview();
        setFeaturedFasilitas(fasilitas);
      } catch (error) {
        console.error("Failed to fetch fasilitas preview:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categories = await getFasilitasCategory();
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch fasilitas categories:", error);
      }
    };

    fetchFasilitas();
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchFasilitasByCategory = async () => {
      if (selectedCategory) {
        try {
          const fasilitas = await getFasilitasPreviewBasedOnCategoryId(
            selectedCategory
          );
          setFeaturedFasilitas(fasilitas);
        } catch (error) {
          console.error("Failed to fetch fasilitas by category:", error);
        }
      } else {
        const fetchFasilitas = async () => {
          try {
            const fasilitas = await getFasilitasPreview();
            setFeaturedFasilitas(fasilitas);
          } catch (error) {
            console.error("Failed to fetch fasilitas preview:", error);
          }
        };

        fetchFasilitas();
      }
    };

    fetchFasilitasByCategory();
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
    <div className={limitedView ? "py-20" : "pb-20"}>
      <CustomContainer>
        <h2 className="title2">Fasilitas</h2>
        <h1 className="title1">
          {limitedView ? "Fasilitas Terkini" : "Semua Fasilitas"}
        </h1>
        {!limitedView && (
          <div className="mt-4">
            <Tabs
              defaultActiveKey="all"
              items={items}
              onChange={handleCategoryChange}
            />
          </div>
        )}

        {featuredFasilitas.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-semibold my-10">
            Tidak ada fasilitas
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
            {(limitedView
              ? featuredFasilitas.slice(0, 3)
              : featuredFasilitas
            ).map((fasilitas) => (
              <BlogCard
                key={fasilitas.id}
                title={fasilitas.title}
                thumbnailSrc={
                  fasilitas.fasilitasImages?.[0]?.img || "/default-image.jpg"
                }
                previewText={fasilitas.sinopsis}
                link={`/fasilitas/${fasilitas.id}`}
              />
            ))}
          </div>
        )}

        {limitedView && featuredFasilitas.length > 0 && (
          <Link
            className="text-2xl font-normal text-primary mt-auto flex items-center group transition-all ease-in-out"
            href="/fasilitas"
          >
            <p className="relative">
              Lihat Semua Fasilitas
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </p>
            <FaArrowRightLong className="ml-2 transition-all group-hover:ml-4" />
          </Link>
        )}
      </CustomContainer>
    </div>
  );
};

export default Fasilitas;
