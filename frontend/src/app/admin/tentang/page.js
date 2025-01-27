import BigImage from "@/components/admin/tentang/BigImage";
import Misi from "@/components/admin/tentang/Misi";
import SmallImage from "@/components/admin/tentang/SmallImage";
import Visi from "@/components/admin/tentang/Visi";
import Struktur from "@/components/admin/tentang/Struktur";
import FasilitasCategory from "@/components/admin/tentang/FasilitasCategory";

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
    </>
  );
};

export default AdminTentang;
