import CustomLayout from "@/components/common/CustomLayout";
import TentangTanjungmas from "@/components/section/TentangTanjungmas";

const Tentang = () => {
  return (
    <CustomLayout blackText={true}>
      <div className="pt-[100px]"></div>
      <TentangTanjungmas />
    </CustomLayout>
  );
};

export default Tentang;
