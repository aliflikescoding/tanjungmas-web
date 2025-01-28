import BigImage from "@/components/admin/tentang/BigImage";
import Misi from "@/components/admin/tentang/Misi";
import SmallImage from "@/components/admin/tentang/SmallImage";
import Visi from "@/components/admin/tentang/Visi";
import Struktur from "@/components/admin/tentang/Struktur";
import FasilitasCategory from "@/components/admin/tentang/FasilitasCategory";
import Sarana from "@/components/admin/tentang/Sarana";
import Prasarana from "@/components/admin/tentang/Prasarana";
import DataMonografi from "@/components/admin/tentang/DataMonografi";
import SDM from "@/components/admin/tentang/SDM";
import Regulasi from "@/components/admin/tentang/Regulasi";

const AdminTentang = () => {
  return (
    <>
      <h1 className="text-3xl font-medium">Tentang Section</h1>
      <BigImage />
      <SmallImage />
      <Visi />
      <Misi />
      <Struktur />
      <FasilitasCategory />
      <Sarana />
      <Prasarana />
      <DataMonografi />
      <SDM />
      <Regulasi />
    </>
  );
};

export default AdminTentang;
