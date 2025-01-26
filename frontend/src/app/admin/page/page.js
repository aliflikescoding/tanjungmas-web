import LogoImage from "@/components/admin/page/LogoImage";
import HeroImage from "@/components/admin/page/HeroImage";
import NavbarImages from "@/components/admin/page/NavbarImages";

const AdminPage = () => {
  return (
    <>
      <h1 className="text-3xl font-medium">Admin Page Images</h1>
      <LogoImage />
      <NavbarImages />
      <HeroImage />
    </>
  );
};

export default AdminPage;
