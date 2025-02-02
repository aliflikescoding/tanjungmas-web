import CustomLayout from "@/components/common/CustomLayout";
import Hero from "@/components/section/Hero";
import InfoHeroImages from "@/components/section/InfoHeroImage";

export default function Home() {
  return (
    <CustomLayout>
      <Hero />
      <InfoHeroImages />
    </CustomLayout>
  );
}
