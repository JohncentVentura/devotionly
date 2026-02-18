"use client";

import { ArrowLeft, ArrowRight, BookHeart, Search } from "lucide-react";
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
      <div className="w-full max-w-(--breakpoint-lg) px-6">
        <div className="flex justify-center items-center gap-2">
          <h2 className="text-pretty font-semibold text-3xl sm:text-4xl tracking-[-0.03em]">
            Digital Bible
          </h2>
          <BookHeart className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
        </div>
        <p className="mt-4 text-base sm:text-lg text-muted-foreground text-center ">
          Encounter the living Word of God anytime, anywhere. Let Scripture
          guide you on-screen, yet remember to treasure the quiet depth found in
          reading from a traditional (physical) Bible.
        </p>
        <div className="mt-6 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-12  gap-2">
          <div className="hidden lg:block col-span-3" />
          <BookCombobox
            className="col-span-2"
            selected={selectedBook}
            setSelected={(val) => setSelectedBook(val || selectedBook)}
            noneSelectedText=""
          >
            Select Book
          </BookCombobox>
          <ChapterCombobox
            className="col-span-1"
            book={selectedBook}
            selected={selectedChapter}
            setSelected={(val) => setSelectedChapter(val || selectedChapter)}
            noneSelectedText=""
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
        <div className="mx-auto w-full space-y-20 mt-6 md:mt-10">
          <div className="shrink-0 basis-1/2">
            <div className="w-full flex justify-between items-center">
              <Button
                onClick={handlePrev}
                className="gap-3 rounded-full cursor-pointer"
              >
                <ArrowLeft /> <span className="hidden md:block">Prev</span>
              </Button>
              <div>
                <h4 className="font-semibold text-xl md:text-3xl text-center">
                  {selectedBook}
                </h4>
                <h6 className="mt-2 text-sm md:text-lg text-center">
                  Chapter {selectedChapter && ` ${selectedChapter}`}
                </h6>
              </div>
              <Button
                onClick={handleNext}
                className="gap-3 rounded-full cursor-pointer"
              >
                <span className="hidden md:block">Next</span> <ArrowRight />
              </Button>
            </div>

            <div className="mt-8 md:mt-14 space-y-3 leading-relaxed text-muted-foreground">
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
                <Button
                  onClick={handlePrev}
                  className="gap-3 rounded-full cursor-pointer"
                >
                  <ArrowLeft /> <span className="hidden md:block">Prev</span>
                </Button>
              </div>

              <div className="text-center text-sm font-medium text-muted-foreground">
                {selectedBook} {selectedChapter}
              </div>

              <div className="flex items-center justify-end">
                <Button
                  onClick={handleNext}
                  className="gap-3 rounded-full cursor-pointer"
                >
                  <span className="hidden md:block">Next</span> <ArrowRight />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
