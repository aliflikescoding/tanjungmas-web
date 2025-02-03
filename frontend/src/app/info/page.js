import React from "react";
import CustomLayout from "@/components/common/CustomLayout";
import InfoBlogs from "@/components/section/InfoBlogs";
import InfoTextPage from "@/components/section/InfoPage";

const Info = () => {
  return (
    <CustomLayout blackText={true}>
      <div className="py-20">
        <InfoTextPage />
        <InfoBlogs />
      </div>
    </CustomLayout>
  );
};

export default Info;
