import CustomLayout from "@/components/common/CustomLayout";
import DataMono from "@/components/section/DataMono";
import Fasilitas from "@/components/section/Fasilitas";
import SaranaPrasarana from "@/components/section/SaranaPrasarana";
import TentangTanjungmas from "@/components/section/TentangTanjungmas";
import VisiMisi from "@/components/section/VisiMisi";

const Tentang = () => {
  return (
    <CustomLayout blackText={true}>
      <div className="pt-[100px]"></div>
      <TentangTanjungmas />
      <VisiMisi />
      <Fasilitas />
      <SaranaPrasarana />
      <DataMono />
    </CustomLayout>
  );
};

export default Tentang;
