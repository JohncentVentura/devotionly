import { getDevotionById } from "@/actions/devotion.action";
import { stackServerApp } from "@/stack/server";
import { SignIn } from "@stackframe/stack";
import Contact from "./Contact";
import ParticlesBackground from "@/components/ParticlesBackground";

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

  if (!user) return <SignIn />;

  return (
    <div className="relative pt-16 pb-8 mx-auto px-auto grid grid-cols-1 lg:grid-cols-10 gap-6 bg-muted">
      <ParticlesBackground />
      <div className="lg:col-span-full">
        <Contact />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
