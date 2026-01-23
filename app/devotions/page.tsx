import { getDevotions } from "@/actions/devotion.action";
import DevotionTable from "@/app/devotions/DevotionTable";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";

export default async function Devotions() {
  const user = await stackServerApp.getUser();
  const devotions = await getDevotions();
  //TEST CODE
  //const localDevotions = await prisma.devotions.findMany();

  return (
    <section className="relative pt-28 pb-24  lg:px-24 bg-muted">
      {user ? (
        <DevotionTable devotions={devotions} />
      ) : (
        <div className="flex justify-center items-center">
          <SignUp />
        </div>
      )}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
