"use client";

import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import BookCombobox from "@/components/BookCombobox";
import ChapterCombobox from "@/components/ChapterCombobox";
import { TranslationCombobox } from "@/components/TranslationCombobox";
import { BibleApiResponse, getVerse } from "../api/bible/bibleAPI";
import { Separator } from "@/components/ui/separator";

export default function Bible() {
  const [search, setSearch] = useState("");
  const [selectedBook, setSelectedBook] = useState<string>("Matthew");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(1);
  const [word, setWord] = useState<BibleApiResponse | null>(null);
  const [translation, setTranslation] = useState<{
    value: string;
    label: string;
  } | null>({
    value: "WEB",
    label: "World English Bible",
  });

  useEffect(() => {
    if (!selectedBook || !selectedChapter || !translation) return;

    const fetchChapter = async () => {
      try {
        const reference = `${selectedBook} ${selectedChapter}`;
        const data = await getVerse(reference, translation.value);
        setWord(data);
      } catch (err) {
        console.error("Failed to fetch chapter:", err);
        setWord(null);
      }
    };

    fetchChapter();
  }, [selectedBook, selectedChapter, translation]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-(--breakpoint-lg) px-6 py-10">
        <h2 className="text-pretty font-semibold text-4xl tracking-[-0.03em] sm:mx-auto sm:max-w-xl sm:text-center md:text-[2.75rem] md:leading-[1.2]">
          The Living Word
        </h2>
        <p className="mt-2 text-lg text-muted-foreground sm:text-center sm:text-xl">
          Encounter the living Word of God. Let every verse speak to your heart,
          every chapter inspire your mind, and every passage illuminate your
          path with faith, peace, and purpose.
        </p>
        <div className="mt-6 grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-14 gap-2">
          <div className="hidden sm:block  sm:col-span-2 lg:col-span-4" />
          <BookCombobox
            className="col-span-2  sm:col-span-2"
            selected={selectedBook}
            setSelected={(val) => setSelectedBook(val || selectedBook)}
          >
            Select Book
          </BookCombobox>
          <ChapterCombobox
            className="col-span-1"
            book={selectedBook}
            selected={selectedChapter}
            setSelected={(val) => setSelectedChapter(val || selectedChapter)}
          >
            Select Chapter
          </ChapterCombobox>
          <TranslationCombobox
            className="col-span-3  sm:col-span-3"
            variant="default"
            selected={translation}
            setSelected={(selected) => setTranslation(selected)}
          />
          <div className="sm:block hidden sm:col-span-2 lg:col-span-4" />
        </div>
        <Separator className="mt-6" />
        <div className="mx-auto w-full space-y-20 md:mt-16">
          <div className="shrink-0 basis-1/2">
            <h4 className="my-3 font-semibold text-3xl tracking-[-0.02em]">
              {selectedBook}
            </h4>
            <h6 className="font-bold text-sm uppercase">
              Chapter {selectedChapter && ` ${selectedChapter}`}
            </h6>
            <p className="mt-8 space-y-3 leading-relaxed text-muted-foreground">
              {word?.verses.map((v, index) => {
                const prev = word.verses[index - 1];

                // Simple paragraph logic (new paragraph every 3 verses or when sentence ends)
                const newParagraph =
                  index === 0 ||
                  v.text.trim().endsWith(":") ||
                  (prev && prev.text.trim().endsWith("."));

                return (
                  <p key={v.verse} className={newParagraph ? "mt-4" : ""}>
                    <span className="mr-1 font-semibold text-foreground">
                      {v.verse}
                    </span>
                    {v.text}
                  </p>
                );
              })}
            </p>

            <div className="mt-4 flex justify-between">
              <Button asChild className="mt-6 gap-3 rounded-full" size="lg">
                <Link href={"#"}>
                  <ArrowLeft /> Prev
                </Link>
              </Button>
              <Button asChild className="mt-6 gap-3 rounded-full" size="lg">
                <Link href={"#"}>
                  Next <ArrowRight />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
