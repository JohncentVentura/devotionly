import { getDevotions } from "@/actions/devotion.action";
import DevotionTable from "@/components/DevotionTable";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";

export default async function Devotions() {
  const user = await stackServerApp.getUser();
  const devotions = await getDevotions();

  //TEST CODE
  //const localDevotions = await prisma.devotions.findMany();

  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <DevotionTable devotions={devotions} />
          </div>
          {/* TEST CODE
          <ul>
            {localDevotions.map((p: any) => (
              <li key={p.id}>
                <div>{p.book}</div>
                <div>{p.chapter}</div>
                <div>{p.scripture}</div>
              </li>
            ))}
          </ul>
          */}
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <SignUp />
        </div>
      )}
    </>
  );
}
