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
  getVerseCount,
} from "../api/bible/bibleAPI";
import { Separator } from "@/components/ui/separator";
import { useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";

interface BibleProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  urls: { signUp: string };
}

export default function Bible({ user, urls }: BibleProps) {
  const searchParams = useSearchParams();
  const bookParam = searchParams.get("book");
  const chapterParam = searchParams.get("chapter");
  const [verseCount, setVerseCount] = useState<number | null>(null);

  const scrollRef = useRef<HTMLDivElement | null>(null);

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

  const scrollToRef = () => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleNext = () => {
    if (!selectedBook || !selectedChapter) return;

    const next = getNextChapter(selectedBook, selectedChapter);
    setSelectedBook(next.book);
    setSelectedChapter(next.chapter);

    scrollToRef();
  };

  const handlePrev = () => {
    if (!selectedBook || !selectedChapter) return;

    const prev = getPrevChapter(selectedBook, selectedChapter);
    setSelectedBook(prev.book);
    setSelectedChapter(prev.chapter);

    scrollToRef();
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

  useEffect(() => {
    if (!selectedBook || !selectedChapter) return;

    const fetchVerseCount = async () => {
      try {
        const count = await getVerseCount(selectedBook, selectedChapter);
        setVerseCount(count);
      } catch (err) {
        console.error("Failed to fetch verse count:", err);
        setVerseCount(null);
      }
    };

    fetchVerseCount();
  }, [selectedBook, selectedChapter]);

  return (
    <div className="flex flex-col items-center justify-center px-6">
      <div className="mx-auto grid w-full max-w-(--breakpoint-xl) gap-6 lg:gap-12 pt-6 px-0 lg:px-6 lg:grid-cols-2">
        <div>
          <Badge
            className="rounded-full px-4 py-1 border-primary bg-transparent
                hover:bg-primary dark:hover:bg-primary
                active:bg-primary dark:active:bg-primary
                transition-colors duration-500"
            asChild
          >
            {user ? (
              <Link
                href={`/create?book=${selectedBook}&chapter=${selectedChapter}&fromVerse=${1}&toVerse=${verseCount ?? 1}`}
                className="text-foreground hover:text-background active:text-background
                    dark:text-foreground dark:hover:text-background dark:active:text-background"
              >
                &quot;Feeling Blessed? Make this your devotion!&quot;
              </Link>
            ) : (
              <Link
                href={urls.signUp}
                className="text-foreground hover:text-background active:text-background
                    dark:text-foreground dark:hover:text-background dark:active:text-background"
              >
                &quot;Sign up to start your daily devotion!&quot;
              </Link>
            )}
          </Badge>
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
            Digital Bible
          </h1>
          <p className="mt-6 md:text-lg">
            Encounter the living Word of God anytime, anywhere. Let Scripture
            guide you on-screen, yet remember to treasure the quiet depth found
            in reading from a traditional (physical) Bible.
          </p>
          <div ref={scrollRef} className="hidden mt-6 lg:grid grid-cols-6 gap-2" >
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
              className="col-span-3 w-full justify-center"
              variant="default"
              selected={translation}
              setSelected={(selected) => setTranslation(selected)}
            />
          </div>
        </div>
        <div className="aspect-video w-full rounded-xl bg-accent" />
        
        <div ref={scrollRef} className="grid lg:hidden grid-cols-3 gap-2" >
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
              className="col-span-3 w-full justify-center"
              variant="default"
              selected={translation}
              setSelected={(selected) => setTranslation(selected)}
            />
          </div>
      </div>

      <Separator className="mt-6 lg:mt-12 mb-6 w-full max-w-(--breakpoint-xl)" />
      <div className="mx-auto w-full max-w-(--breakpoint-lg)">
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
  );
}
