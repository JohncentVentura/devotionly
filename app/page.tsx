import HomeDailyWord from "@/components/home/HomeDailyWord";
import HomeFAQ from "@/components/home/HomeFAQ";
import HomeFeatures from "@/components/home/HomeFeatures";
import HomeHero from "@/components/home/HomeHero";

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
