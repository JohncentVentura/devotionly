import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookType, Sun } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { imagePaths } from "@/lib/paths";
import CreateDialogButton from "../CreateDialogButton";
import { stackServerApp } from "@/stack/server";

export default async function HomeDailyWord() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <section className="relative">
      <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-background to-transparent pointer-events-none" />

      <Image
        src={imagePaths.homeDailyWord}
        alt="Hero"
        className="absolute -z-10  object-cover"
        fill
      />

      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-(--breakpoint-xl) w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
          <div>
            <Badge
              variant="secondary"
              className="rounded-full py-1 border-border"
              asChild
            >
              <Link href="#">
                <Sun className="ml-1 size-4" /> VERSE OF THE DAY
              </Link>
            </Badge>

            <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-semibold leading-[1.2]! tracking-[-0.035em]">
              John 3:16
            </h1>
            <p className="mt-6 max-w-[60ch] sm:text-lg text-foreground/80">
              &quot;For God so loved the world, that He gave His only begotten
              Son, that whoever believes in Him shall not perish, but have
              eternal life&quot;
            </p>

            <div className="mt-12 flex items-center gap-4">
              {user ? (
                <CreateDialogButton />
              ) : (
                <Link href={app.signUp}>
                  <Button size="lg" className="rounded-full text-base">
                    Get Started <ArrowUpRight className="size-5" />
                  </Button>
                </Link>
              )}
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base shadow-none"
              >
                <BookType className="h-5! w-5!" />
                ESV Translate
              </Button>
            </div>
          </div>
          <div className="w-full aspect-video bg-accent rounded-xl" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
