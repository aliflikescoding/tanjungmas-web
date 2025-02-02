import CustomLayout from "@/components/common/CustomLayout";
import Hero from "@/components/section/Hero";
import InfoHeroImages from "@/components/section/InfoHeroImage";
import Berita from "@/components/section/Berita";
import Fasilitas from "@/components/section/Fasilitas";

export default function Home() {
  return (
    <CustomLayout>
      <Hero />
      <InfoHeroImages />
      <Berita limitedView={true} /> {/* limitedView is passed correctly */}
      <Fasilitas limitedView={true} /> {/* limitedView is passed correctly */}
    </CustomLayout>
  );
}
