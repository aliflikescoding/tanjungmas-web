"use client";

import React, { useState, useEffect } from "react";
import CustomContainer from "../custom/CustomContainer";
import { getDataMonografi } from "@/app/api/public";
import Link from "next/link";

const DataMono = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataMonografi();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pb-20">
      <CustomContainer>
        <h2 className="title2">Data Monografi</h2>
        <h1 className="title1 mb-8">Kabupaten Tanjungmas</h1>
        <div className="flex flex-col gap-4">
          {data.length > 0 ? (
            data.map((item) => (
              <Link href={item.link} key={item.id} className="text-2xl underline text-primary">
                {item.title}
              </Link>
            ))
          ) : (
            <p className="mb-2">No misi available</p>
          )}
        </div>
      </CustomContainer>
    </div>
  );
};

export default DataMono;
