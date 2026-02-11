"use client";

import * as React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createDevotion } from "@/actions/devotion.action";
import { BibleApiResponse, getVerse } from "@/app/api/bible/bibleAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BookCombobox from "@/components/BookCombobox";
import ChapterCombobox from "@/components/ChapterCombobox";
import VerseCombobox from "@/components/VerseCombobox";
import { Calendar } from "lucide-react";
import { useSearchParams } from "next/navigation";
import ScriptureRenderer from "@/components/ScriptureRenderer";
import { Separator } from "@/components/ui/separator";

export default function CreatePage() {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    userId: "",
    date: new Date(),
    book: "",
    chapter: 0,
    fromVerse: 0,
    toVerse: 0,
    scripture: "",
    observation: "",
    application: "",
    prayer: "",
    imageUrl: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  const [scriptureLoading, setScriptureLoading] = React.useState(false);

  const [showFull, setShowFull] = React.useState(false);

  const [scriptureData, setScriptureData] =
    React.useState<BibleApiResponse | null>(null);

  const handleChange = (
    field: string,
    value: string | number | Date | null,
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newDevotion = await createDevotion(formData);
      //console.log("newDevotion:", newDevotion);
      toast.success("Successfully created devotion");
    } catch (error) {
      toast.error("Failed to create devotion: " + error);
    }
    router.replace("/devotions");
  };

  const handleClear = () => {
    setFormData({
      userId: "",
      date: new Date(),
      book: "",
      chapter: 0,
      fromVerse: 0,
      toVerse: 0,
      scripture: "",
      observation: "",
      application: "",
      prayer: "",
      imageUrl: "",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  };

  React.useEffect(() => {
    if (
      !formData.book ||
      !formData.chapter ||
      !formData.fromVerse ||
      !formData.toVerse
    ) {
      handleChange("scripture", "");
      return;
    }

    const reference = `${formData.book} ${formData.chapter}:${formData.fromVerse}-${formData.toVerse}`;

    setScriptureLoading(true);

    getVerse(reference)
      .then((data) => {
        setScriptureData(data);
        handleChange("scripture", data.text.trim()); // still saved
      })
      .catch(() => {
        setScriptureData(null);
        handleChange("scripture", "Error fetching scripture.");
      })
      .finally(() => {
        setScriptureLoading(false);
      });
  }, [formData.book, formData.chapter, formData.fromVerse, formData.toVerse]);

  const searchParams = useSearchParams();

  React.useEffect(() => {
    const book = searchParams.get("book");
    const chapter = searchParams.get("chapter");
    const fromVerse = searchParams.get("fromVerse");
    const toVerse = searchParams.get("toVerse");

    if (book && chapter && fromVerse && toVerse) {
      setFormData((prev) => ({
        ...prev,
        book,
        chapter: Number(chapter),
        fromVerse: Number(fromVerse),
        toVerse: Number(toVerse),
      }));
    }
  }, [searchParams]);

  return (
    <section>
      <h1 className="text-center text-xl md:text-3xl font-semibold">
        Create Devotion
      </h1>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground">
        Devotion for the day of{" "}
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <Calendar className="h-4 w-4" />
      </div>
      <p className="mt-4 md:text-lg text-foreground/80">
        Create your personal Bible devotions using the SOAP method.{" "}
        {!showFull ? (
          <button
            className="text-primary font-medium underline ml-1 cursor-pointer"
            onClick={() => setShowFull(true)}
          >
            Read more...
          </button>
        ) : (
          <button
            className="text-primary font-medium underline ml-1 cursor-pointer"
            onClick={() => setShowFull(false)}
          >
            Read less
          </button>
        )}
      </p>
      {showFull && (
        <div className="mt-4 space-y-2">
          <p className="md:text-lg text-foreground/80">
            <strong>S - Scripture:</strong> Read a passage (often a chapter)
            slowly, then choose one or two verses that stand out to you and
            write them down verbatim in your journal.
          </p>

          <p className="md:text-lg text-foreground/80">
            <strong>O - Observation:</strong> Ask questions about the text (who,
            what, where, when, why) and note key words, repetition, or commands.
            Paraphrase the verse in your own words to understand its meaning.
          </p>

          <p className="md:text-lg text-foreground/80">
            <strong>A - Application:</strong> Reflect on how the verse applies
            to your life today. What changes do you need to make? What action
            can you take?
          </p>

          <p className="md:text-lg text-foreground/80">
            <strong>P - Prayer:</strong> Talk to God about what you have
            learned. Pray the scripture back to Him, confess any sins revealed,
            and ask for guidance to live it out.
          </p>
        </div>
      )}
      <Separator className="my-4 md:my-8" />
      <form className="" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-1">
            <Label htmlFor="book">Book</Label>
            <BookCombobox
              className="mt-2 w-full"
              selected={formData.book}
              setSelected={(val) => handleChange("book", val || "")}
              noneSelectedText = ""
            >
              Select Book
            </BookCombobox>
          </div>
          <div className="col-span-1">
            <Label htmlFor="chapter">Chapter</Label>
            <ChapterCombobox
              className="mt-2 w-full"
              book={formData.book}
              selected={formData.chapter}
              setSelected={(val) => handleChange("chapter", val)}
              noneSelectedText = ""
            >
              Select Chapter
            </ChapterCombobox>
          </div>
          <div className="col-span-1">
            <Label htmlFor="fromVerse">From Verse</Label>
            <VerseCombobox
              className="mt-2 w-full"
              book={formData.book}
              chapter={formData.chapter}
              selected={formData.fromVerse}
              setSelected={(val) => handleChange("fromVerse", val)}
            >
              From Verse
            </VerseCombobox>
          </div>
          <div className="col-span-1">
            <Label htmlFor="toVerse">To Verse</Label>
            <VerseCombobox
              className="mt-2 w-full"
              book={formData.book}
              chapter={formData.chapter}
              selected={formData.toVerse}
              setSelected={(val) => handleChange("toVerse", val)}
            >
              To Verse
            </VerseCombobox>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 gap-4">
          <div>
            <Label>Scripture</Label>
            <div className="mt-2">
              {scriptureLoading && (
                <p className="text-sm text-muted-foreground">
                  Loading scripture…
                </p>
              )}

              {!scriptureLoading && scriptureData && (
                <ScriptureRenderer data={scriptureData} />
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="observation">Observation</Label>
            <Textarea
              id="observation"
              className="mt-2"
              placeholder="Type your observation here."
              rows={5}
              value={formData.observation}
              onChange={(e) => handleChange("observation", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="application">Application</Label>
            <Textarea
              id="application"
              className="mt-2"
              placeholder="Type your application here."
              rows={5}
              value={formData.application}
              onChange={(e) => handleChange("application", e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="prayer">Prayer</Label>
            <Textarea
              id="prayer"
              className="mt-2"
              placeholder="Type your prayer here."
              rows={5}
              value={formData.prayer}
              onChange={(e) => handleChange("prayer", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 gap-4 flex justify-between">
          <Button type="submit" className="cursor-pointer">
            Create
          </Button>
          <div className="flex gap-4">
            <Button
              type="button"
              variant="outline"
              className="cursor-pointer"
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              type="button"
              className="cursor-pointer"
              variant="destructive"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </section>
  );
}
