import { ArrowUpRight, BookOpenText, NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getDailyVerse } from "@/app/api/bible/bibleAPI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { imagePaths } from "@/lib/paths";
import { stackServerApp } from "@/stack/server";

export default async function HomeDailyWord() {
  const user = await stackServerApp.getUser();
  const urls = stackServerApp.urls;
  const word = await getDailyVerse();

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-background to-transparent pointer-events-none" />
      <Image
        src={imagePaths.homeDailyWord}
        alt="Hero"
        className="absolute -z-10  object-cover"
        fill
      />
      <div className="max-w-(--breakpoint-xl) w-full mx-auto grid lg:grid-cols-2 gap-12 px-6 py-12">
        <div>
          <Badge
            variant="outline"
            className="rounded-full py-1 border-border"
            asChild
          >
            <Link href="/bible">
              TODO: Turn me into a combobox with options of translation{" "}
            </Link>
          </Badge>
          <h1 className="mt-6 max-w-[17ch] text-4xl md:text-5xl lg:text-[2.75rem] xl:text-[3.25rem] font-semibold leading-[1.2]! tracking-[-0.035em]">
            {word.reference}
          </h1>
          {word.verses.map((verse) => (
            <p
              key={verse.verse}
              className="mt-6 max-w-[60ch] sm:text-lg text-foreground/80"
            >
              &quot;{verse.text}&quot;
            </p>
          ))}
          <div className="mt-12 flex items-center gap-4">
            <Button size="lg" className="rounded-full text-base">
              {user ? (
                <Link href="/create" className="flex items-center gap-2">
                  Make Devotion <NotebookPen className="size-5" />
                </Link>
              ) : (
                <Link href={urls.signUp} className="flex items-center gap-2">
                  Get Started <ArrowUpRight className="size-5" />
                </Link>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-base shadow-none"
            >
              <Link href={"bible"} className="flex items-center gap-2">
                <BookOpenText className="h-5! w-5!" /> Continue Reading
              </Link>
            </Button>
          </div>
        </div>
        <div className="w-full aspect-video bg-accent rounded-xl" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
