"use client";

import React, { useState, useEffect } from "react";
import CustomContainer from "@/components/custom/CustomContainer";
import {
  getInfoCategory,
  getInfoTextBasedOnCategoryId,
} from "@/app/api/public";
import { Tabs } from "antd";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";

const InfoTextPage = ({ limitedView = false }) => {
  const [infoTexts, setInfoTexts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchInfoCategories = async () => {
      try {
        const categories = await getInfoCategory();
        setCategories(categories);
      } catch (error) {
        console.error("Failed to fetch info categories:", error);
      }
    };

    fetchInfoCategories();
  }, []);

  useEffect(() => {
    const fetchInfoTextsByCategory = async () => {
      if (selectedCategory) {
        try {
          const texts = await getInfoTextBasedOnCategoryId(selectedCategory);
          setInfoTexts(texts);
        } catch (error) {
          console.error("Failed to fetch info texts by category:", error);
        }
      } else {
        setInfoTexts([]);
      }
    };

    fetchInfoTextsByCategory();
  }, [selectedCategory]);

  useEffect(() => {
    console.log("infoTexts:", infoTexts);
  }, [infoTexts]);

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
        <h2 className="title2">Info</h2>
        <h1 className="title1">
          {limitedView ? "Info Terkini" : "Semua Info"}
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

        {infoTexts.length === 0 ? (
          <p className="text-center text-gray-500 text-lg font-semibold my-10">
            Tidak ada info
          </p>
        ) : (
          <div className="">
            {(limitedView ? infoTexts.slice(0, 3) : infoTexts).map((info) => (
              <div key={info.id} className="border p-4 rounded-lg shadow-sm">
                <h3 className="text-xl font-semibold">{info.title}</h3>
                <div
                  dangerouslySetInnerHTML={{ __html: info.content }}
                />
              </div>
            ))}
          </div>
        )}

        {limitedView && infoTexts.length > 0 && (
          <Link
            className="text-2xl font-normal text-primary mt-auto flex items-center group transition-all ease-in-out"
            href="/info"
          >
            <p className="relative">
              Baca Semua Info
              <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </p>
            <FaArrowRightLong className="ml-2 transition-all group-hover:ml-4" />
          </Link>
        )}
      </CustomContainer>
    </div>
  );
};

export default InfoTextPage;
