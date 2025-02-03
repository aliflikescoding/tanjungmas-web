import React from "react";
import CustomLayout from "@/components/common/CustomLayout";
import Fasilitas from "@/components/section/Fasilitas";

const BeritaPage = () => {
  return (
    <CustomLayout blackText={true}>
      <div className="py-[10vh]">
        <Fasilitas />
      </div>
    </CustomLayout>
  );
};

export default BeritaPage;
