import BigImage from "@/components/admin/tentang/BigImage";
import Misi from "@/components/admin/tentang/Misi";
import SmallImage from "@/components/admin/tentang/SmallImage";
import Visi from "@/components/admin/tentang/Visi";


const AdminTentang = () => {
  return (
    <>
      <h1 className="text-3xl font-medium">Tentang Section</h1>
      <BigImage />
      <SmallImage />
      <Visi />
      <Misi />
    </>
  );
};

export default AdminTentang;
