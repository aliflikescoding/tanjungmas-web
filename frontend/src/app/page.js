import CustomLayout from "@/components/common/CustomLayout";
import Hero from "@/components/section/Hero";
import InfoHeroImages from "@/components/section/InfoHeroImage";
import Berita from "@/components/section/Berita";

export default function Home() {
  return (
    <CustomLayout>
      <Hero />
      <InfoHeroImages />
      <Berita limitedView={true}/>
    </CustomLayout>
  );
}
