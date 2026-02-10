import { getDevotions } from "@/actions/devotion.action";
import DevotionTable from "@/app/devotions/DevotionTable";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";
import PageSection from "@/components/PageSection";
import ParticlesBackground from "@/components/ParticlesBackground";
import { TopGradient } from "@/components/PageGradient";

export default async function Devotions() {
  const user = await stackServerApp.getUser();
  const devotions = await getDevotions();
  //TEST CODE
  //const localDevotions = await prisma.devotions.findMany();

  return (
    <PageSection>
      {user ? (
        <DevotionTable devotions={devotions} />
      ) : (
        <div className="relative flex justify-center items-center">
          <ParticlesBackground />
          <SignUp />
        </div>
      )}
    </PageSection>
  );
}
