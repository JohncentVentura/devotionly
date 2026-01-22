"use client";

import * as React from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createDevotion } from "@/actions/devotion.action";
import { getVerse } from "@/app/api/bible/bibleAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BookCombobox from "@/components/BookCombobox";
import ChapterCombobox from "@/components/ChapterCombobox";
import VerseCombobox from "@/components/VerseCombobox";

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

  const handleChange = (field: string, value: string | number | Date | null) => {
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
        handleChange("scripture", data.text.trim());
      })
      .catch(() => {
        handleChange("scripture", "Error fetching scripture.");
      })
      .finally(() => {
        setScriptureLoading(false);
      });
  }, [formData.book, formData.chapter, formData.fromVerse, formData.toVerse]);

  return (
    <section>
      <h1 className="text-center text-xl md:text-3xl font-semibold">
        Create Devotion
      </h1>
      <p className="mt-2 md:text-lg text-foreground/80">
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
        <div className="mt-2 space-y-2">
          <p className="md:text-lg text-foreground/80">
            <strong>S - Scripture:</strong> Read a passage (often a chapter) slowly, then choose one or two verses that stand out to you and write them down verbatim in your journal.
          </p>

          <p className="md:text-lg text-foreground/80">
            <strong>O - Observation:</strong> Ask questions about the text (who, what, where, when, why) and note key words, repetition, or commands. Paraphrase the verse in your own words to understand its meaning.
          </p>

          <p className="md:text-lg text-foreground/80">
            <strong>A - Application:</strong> Reflect on how the verse applies to your life today. What changes do you need to make? What action can you take?
          </p>

          <p className="md:text-lg text-foreground/80">
            <strong>P - Prayer:</strong> Talk to God about what you have learned. Pray the scripture back to Him, confess any sins revealed, and ask for guidance to live it out.
          </p>
        </div>
      )}
      <form onSubmit={handleSubmit}>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <BookCombobox
            selected={formData.book}
            setSelected={(val) => handleChange("book", val || "")}
          >
            Select Book
          </BookCombobox>
          <ChapterCombobox
            book={formData.book}
            selected={formData.chapter}
            setSelected={(val) => handleChange("chapter", val)}
          >
            Select Chapter
          </ChapterCombobox>
          <VerseCombobox
            book={formData.book}
            chapter={formData.chapter}
            selected={formData.fromVerse}
            setSelected={(val) => handleChange("fromVerse", val)}
          >
            From Verse
          </VerseCombobox>
          <VerseCombobox
            book={formData.book}
            chapter={formData.chapter}
            selected={formData.toVerse}
            setSelected={(val) => handleChange("toVerse", val)}
          >
            To Verse
          </VerseCombobox>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4">
          <div>
            <Label className="mt-2" htmlFor="scripture">
              Scripture
            </Label>
            <Textarea
              id="scripture"
              placeholder="Waiting for the verse to show scripture here."
              disabled
              rows={5}
              value={scriptureLoading ? "Loading scripture…" : formData.scripture}
              onChange={(e) => handleChange("scripture", e.target.value)}
            />
          </div>
          <div>
            <Label className="mt-2" htmlFor="observation">
              Observation
            </Label>
            <Textarea
              id="observation"
              placeholder="Type your observation here."
              rows={5}
              value={formData.observation}
              onChange={(e) => handleChange("observation", e.target.value)}
            />
          </div>
          <div>
            <Label className="mt-2" htmlFor="application">
              Application
            </Label>
            <Textarea
              id="application"
              placeholder="Type your application here."
              rows={5}
              value={formData.application}
              onChange={(e) => handleChange("application", e.target.value)}
            />
          </div>
          <div>
            <Label className="mt-2" htmlFor="prayer">
              Prayer
            </Label>
            <Textarea
              id="prayer"
              placeholder="Type your prayer here."
              rows={5}
              value={formData.prayer}
              onChange={(e) => handleChange("prayer", e.target.value)}
            />
          </div>
        </div>
        <div className="mt-8 gap-4 flex justify-between">
          <div className="flex gap-4">
            <Button type="submit">Create</Button>
            <Button type="button" variant="outline" onClick={handleClear}>
              Clear
            </Button>
          </div>
          <Button type="button" variant="destructive" onClick={() => router.back()}>
            Cancel
          </Button>
        </div>
      </form> 
    </section>
  );
}
