import { getDevotionById } from "@/actions/devotion.action";
import { stackServerApp } from "@/stack/server";
import { SignIn } from "@stackframe/stack";
import DevotionCard from "./DevotionCard";

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}) {
  //Slugified URL is created in DevotionTable component where we can change --
  //Extract the id from the slug by splitting on the delimiter
  const { slug } = await props.params;
  const [id] = slug.split("--");
  const devotion = await getDevotionById(id);

  //Return what is based on app/layout.tsx metadata structure
  return {
    title: devotion ? devotion.book : "Devotion Book",
    description: devotion ? devotion.scripture : "Devotion Scripture",
  };
}

export default async function page(props: {
  params: Promise<{ slug: string }>;
}) {
  //Slugified URL is created in DevotionTable component where we can change --
  //Extract the id from the slug by splitting on the delimiter
  const user = await stackServerApp.getUser();
  const { slug } = await props.params;
  const [id] = slug.split("--");
  const devotion = await getDevotionById(id);

  if (!user) return <SignIn />;

  return (
    <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
      <div className="lg:col-span-full">
        <DevotionCard devotion={devotion} />
      </div>
    </div>
  );
}
