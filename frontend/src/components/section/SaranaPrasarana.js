"use client";

import React, { useState, useEffect } from "react";
import CustomContainer from "../custom/CustomContainer";
import { getSarana, getPrasarana } from "@/app/api/public";
import { Table } from "antd";

const SaranaPrasarana = () => {
  const [sarana, setSarana] = useState([]);
  const [prasarana, setPrasarana] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const saranaData = await getSarana();
        const prasaranaData = await getPrasarana();
        setSarana(saranaData);
        setPrasarana(prasaranaData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const saranaColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
  ];

  const prasaranaColumns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
  ];

  return (
    <div className="py-[5vh] sm:py-[15vh]">
      <CustomContainer>
        <div className="mb-3">
          <h2 className="title2">Pendukung</h2>
          <h1 className="title1 mb-8">Sarana dan Prasarana</h1>
          <p className="text-lg sm:text-xl">
            Fasilitas pendukung di Kelurahan Tanjung Mas sebagai sarana
            mempermudah aktivitas pegawai dalam bekerja dan kegiatan
            kemasyarakatan.
          </p>
        </div>

        {/* Responsive Flex Layout */}
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-1">
            <h2 className="title2 mb-4">Sarana</h2>
            <Table dataSource={sarana} columns={saranaColumns} rowKey="id" />
          </div>

          <div className="flex-1">
            <h2 className="title2 mb-4">Prasarana</h2>
            <Table
              dataSource={prasarana}
              columns={prasaranaColumns}
              rowKey="id"
            />
          </div>
        </div>
      </CustomContainer>
    </div>
  );
};

export default SaranaPrasarana;
