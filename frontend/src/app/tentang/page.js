import CustomLayout from "@/components/common/CustomLayout";
import TentangTanjungmas from "@/components/section/TentangTanjungmas";
import VisiMisi from "@/components/section/VisiMisi";

const Tentang = () => {
  return (
    <CustomLayout blackText={true}>
      <div className="pt-[100px]"></div>
      <TentangTanjungmas />
      <VisiMisi />
    </CustomLayout>
  );
};

export default Tentang;
