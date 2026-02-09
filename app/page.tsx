import HomeDailyWord from "@/components/layout/HomeDailyWord";
import HomeFAQ from "@/components/layout/HomeFAQ";
import HomeFeatures from "@/components/layout/HomeFeatures";
import HomeHero from "@/components/layout/HomeHero";
import { stackServerApp } from "@/stack/server";
import ParticlesBackground from "@/components/ParticlesBackground";

export default async function Home() {
  const user = await stackServerApp.getUser();
  const urls = stackServerApp.urls;
  const plainUser = user ? user.toClientJson() : null;

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticlesBackground />
      <HomeHero />
      <HomeFeatures />
      <HomeDailyWord user={plainUser} urls={urls} />
      <HomeFAQ />
    </main>
  );
}
