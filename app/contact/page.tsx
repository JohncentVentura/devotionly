import { getDevotionById } from "@/actions/devotion.action";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";
import Contact from "./Contact";
import ParticlesBackground from "@/components/ParticlesBackground";
import PageSection from "@/components/PageSection";
import { TopGradient } from "@/components/PageGradient";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  //Slugified URL is created in DevotionTable component where we can change --
  //Extract the id from the slug by splitting on the delimiter
  //const { slug } = await props.params;
  //const [id] = slug.split("--");
  //const devotion = await getDevotionById(id);

  //Return what is based on app/layout.tsx metadata structure
  return {
    title: "Contact Devotionly",
    description: "Contact Devotionly for more information",
  };
}

export default async function page(props: {
  params: Promise<{ slug: string }>;
}) {
  //Slugified URL is created in DevotionTable component where we can change --
  //Extract the id from the slug by splitting on the delimiter
  const user = await stackServerApp.getUser();
  //const { slug } = await props.params;
  //const [id] = slug.split("--");
  //const devotion = await getDevotionById(id);

  return (
    <PageSection>
      {user ? (
        <>
          <ParticlesBackground />
          <Contact />
        </>
      ) : (
        <div className="relative px-4 flex justify-center items-center">
          <ParticlesBackground />
          <SignUp />
        </div>
      )}
    </PageSection>
  );
}
