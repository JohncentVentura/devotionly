"use client";

import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import BookCombobox from "@/components/BookCombobox";
import ChapterCombobox from "@/components/ChapterCombobox";
import { TranslationCombobox } from "@/components/TranslationCombobox";
import {
  BibleApiResponse,
  getNextChapter,
  getPrevChapter,
  getVerse,
} from "../api/bible/bibleAPI";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";

export default function Bible() {
  const searchParams = useSearchParams();
  const bookParam = searchParams.get("book");
  const chapterParam = searchParams.get("chapter");
  const fromVerseParam = searchParams.get("fromVerse");
  const toVerseParam = searchParams.get("toVerse");

  const [selectedBook, setSelectedBook] = useState<string>(
    bookParam || "Genesis",
  );
  const [selectedChapter, setSelectedChapter] = useState<number | null>(
    chapterParam ? Number(chapterParam) : 1,
  );
  const [word, setWord] = useState<BibleApiResponse | null>(null);
  const [translation, setTranslation] = useState<{
    value: string;
    label: string;
  } | null>({
    value: "WEB",
    label: "World English Bible",
  });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNext = () => {
    if (!selectedBook || !selectedChapter) return;

    const next = getNextChapter(selectedBook, selectedChapter);
    setSelectedBook(next.book);
    setSelectedChapter(next.chapter);

    scrollToTop();
  };

  const handlePrev = () => {
    if (!selectedBook || !selectedChapter) return;

    const prev = getPrevChapter(selectedBook, selectedChapter);
    setSelectedBook(prev.book);
    setSelectedChapter(prev.chapter);

    scrollToTop();
  };

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
        <h2 className="text-pretty font-semibold text-2xl md:text-4xl tracking-[-0.03em] sm:mx-auto sm:max-w-xl sm:text-center md:text-[2.75rem] md:leading-[1.2]">
          The Living Word
        </h2>
        <p className="mt-2 text-base md:text-lg text-muted-foreground sm:text-center sm:text-xl">
          Encounter the living Word of God. Let every verse speak to your heart,
          every chapter inspire your mind, and every passage illuminate your
          life.
        </p>
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12  gap-2">
          <div className="hidden lg:block col-span-3" />
          <BookCombobox
            className="col-span-2"
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
            className="col-span-3 w-full"
            variant="default"
            selected={translation}
            setSelected={(selected) => setTranslation(selected)}
          />
          <div className="hidden lg:block col-span-3" />
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
            <div className="mt-8 space-y-3 leading-relaxed text-muted-foreground">
              {word?.verses.map((v, index) => {
                const prev = word.verses[index - 1];

                // Simple paragraph logic (new paragraph every 3 verses or when sentence ends)
                const newParagraph =
                  index === 0 ||
                  v.text.trim().endsWith(":") ||
                  (prev && prev.text.trim().endsWith("."));

                return (
                  <p
                    id={`verse-${v.verse}`}
                    key={v.verse}
                    className={newParagraph ? "mt-4" : ""}
                  >
                    <span className="mr-1 font-semibold text-foreground">
                      {v.verse}
                    </span>
                    {v.text}
                  </p>
                );
              })}
            </div>
            <div className="mt-12 grid grid-cols-3 items-center">
              <div className="flex items-center justify-start">
                <Button onClick={handlePrev} className="gap-3 rounded-full">
                  <ArrowLeft /> Prev
                </Button>
              </div>

              <div className="text-center text-sm font-medium text-muted-foreground">
                {selectedBook} {selectedChapter}
              </div>

              <div className="flex items-center justify-end">
                <Button onClick={handleNext} className="gap-3 rounded-full">
                  Next <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
