import React from "react";
import CustomLayout from "@/components/common/CustomLayout";
import Berita from "@/components/section/Berita";

const BeritaPage = () => {
  return (
    <CustomLayout blackText={true}>
      <div className="py-[10vh]">
        <Berita />
      </div>
    </CustomLayout>
  );
};

export default BeritaPage;
