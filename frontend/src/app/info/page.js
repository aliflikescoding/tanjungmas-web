import React from "react";
import CustomLayout from "@/components/common/CustomLayout";
import InfoBlogs from "@/components/section/InfoBlogs";

const Info = () => {
  return (
    <CustomLayout blackText={true}>
      <div className="py-20">
        <InfoBlogs />
      </div>
    </CustomLayout>
  );
};

export default Info;
