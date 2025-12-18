import { getDevotions } from "@/actions/devotion.action";
import DevotionTable from "@/components/DevotionTable";
import prisma from "@/lib/prisma";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";
import TableWithPaginationDemo from "@/components/table-05";
import Image from "next/image";
import { imagePaths } from "@/lib/paths";

export default async function Devotions() {
  const user = await stackServerApp.getUser();
  const devotions = await getDevotions();

  //TEST CODE
  //const localDevotions = await prisma.devotions.findMany();

  return (
    <section className="relative pt-20 pb-32">
      <Image
        src={imagePaths.devotionsBackground}
        alt="Hero"
        className="absolute -z-10 w-full h-full object-cover"
        fill
      />

      {!user ? (
        <div className="flex justify-center mt-20 items-center">
          <SignUp />
        </div>
      ) : (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <TableWithPaginationDemo devotions={devotions} />
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
      )}
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    
    </section>
  );
}
