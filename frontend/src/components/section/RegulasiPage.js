"use client";

import React, { useState, useEffect } from "react";
import CustomContainer from "../custom/CustomContainer";
import { getRegulasi } from "@/app/api/public";
import Link from "next/link";

const RegulasiPage = () => {
  const [data, setData] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getRegulasi();
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
        <h2 className="title2">Regulasi</h2>
        <h1 className="title1 mb-8">Kabupaten Tanjungmas</h1>
        <Link className="text-xl sm:text-3xl text-primary underline" target="_" href={data}>Liat Regulasi</Link>
      </CustomContainer>
    </div>
  );
};

export default RegulasiPage;
