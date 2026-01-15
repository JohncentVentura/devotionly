import HomeDailyWord from "@/components/layout/HomeDailyWord";
import HomeFAQ from "@/components/layout/HomeFAQ";
import HomeFeatures from "@/components/layout/HomeFeatures";
import HomeHero from "@/components/layout/HomeHero";

export default function Home() {
  return (
    <>
      <HomeHero />
      <HomeFeatures />
      <HomeDailyWord />
      <HomeFAQ />
    </>
  );
}
