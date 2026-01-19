"use client";

import * as React from "react";
import { ArrowUpRight, BookMarked, NotebookPen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getDailyVerse } from "@/app/api/bible/bibleAPI";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { imagePaths } from "@/lib/paths";
import { stackServerApp } from "@/stack/server";
import { TranslationCombobox } from "../TranslationCombobox";
import { BibleApiResponse } from "@/app/api/bible/bibleAPI";

interface HomeDailyWordProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  urls: { signUp: string };
}

export default function HomeDailyWord({ user, urls }: HomeDailyWordProps) {
  const [word, setWord] = React.useState<BibleApiResponse | null>(null);
  const [translation, setTranslation] = React.useState<{
    value: string;
    label: string;
  } | null>({
    value: "WEB",
    label: "World English Bible",
  });

  React.useEffect(() => {
    if (!translation) return;

    const fetchWord = async () => {
      const word = await getDailyVerse(translation.value); // use selected value
      setWord(word);
    };

    fetchWord();
  }, [translation]);

  if (!word) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/60 text-lg">Loading Daily Word...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-40 bg-linear-to-b from-background to-transparent pointer-events-none" />
      <Image
        src={imagePaths.homeDailyWord}
        alt="Hero"
        className="absolute -z-10  object-cover"
        fill
      />
      <div className="max-w-(--breakpoint-xl) w-full mx-auto px-6 py-16">
        <div>
          <TranslationCombobox
            selected={translation}
            setSelected={(selected) => {
              setTranslation(selected);
            }}
          />

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
                <BookMarked className="h-5! w-5!" /> Read Book
              </Link>
            </Button>
          </div>
        </div>
        
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
