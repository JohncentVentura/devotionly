import DevotionTable from "@/components/DevotionTable";
import { stackServerApp } from "@/stack/server";
import { SignUp } from "@stackframe/stack";

import prisma from "@/lib/prisma";

export default async function Devotions() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  const devotions = await prisma.devotions.findMany();

  return (
    <>
      {user ? (
        <div className="mt-7 max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-10 gap-6">
          <div className="lg:col-span-full">
            <DevotionTable />
          </div>
          <ul>
            {devotions.map((p: any) => (
              <li key={p.id}>
                <div>{p.book}</div>
                <div>{p.chapter}</div>
                <div>{p.scripture}</div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex justify-center mt-20 items-center">
          <SignUp />
        </div>
      )}
    </>
  );
}
