"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import { toast } from "react-hot-toast";
import { updateDevotion, getDevotionById } from "@/actions/devotion.action";
import { getVerse } from "@/app/api/bible/bibleAPI";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import BookCombobox from "@/components/BookCombobox";
import ChapterCombobox from "@/components/ChapterCombobox";
import VerseCombobox from "@/components/VerseCombobox";
import { Calendar } from "lucide-react";
import type { BibleApiResponse } from "@/app/api/bible/bibleAPI";
import ScriptureRenderer from "@/components/ScriptureRenderer";

type Devotion = NonNullable<Awaited<ReturnType<typeof getDevotionById>>>;

interface EditDialogProps {
  devotion: Devotion;
}

export default function UpdatePage({ devotion }: EditDialogProps) {
  const router = useRouter();

  const [formData, setFormData] = React.useState({
    userId: devotion.userId,
    date: devotion.date,
    book: devotion.book,
    chapter: devotion.chapter,
    fromVerse: devotion.fromVerse,
    toVerse: devotion.toVerse,
    scripture: devotion.scripture,
    observation: devotion.observation,
    application: devotion.application,
    prayer: devotion.prayer,
    imageUrl: devotion.imageUrl,
    createdAt: devotion.createdAt,
    updatedAt: devotion.updatedAt,
  });

  const [scriptureLoading, setScriptureLoading] = React.useState(false);

  const [scriptureData, setScriptureData] =
    React.useState<BibleApiResponse | null>(null);

  const handleChange = (field: string, value: string | number | Date) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updatedDevotion = await updateDevotion(devotion.id, formData);
      //console.log("updatedDevotion:", updatedDevotion);
      toast.success("Successfully updated devotion");
    } catch (error) {
      toast.error("Failed to update devotion: " + error);
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
        handleChange("scripture", data.text.trim());
      })
      .catch(() => {
        setScriptureData(null);
        handleChange("scripture", "Error fetching scripture.");
      })
      .finally(() => {
        setScriptureLoading(false);
      });
  }, [formData.book, formData.chapter, formData.fromVerse, formData.toVerse]);

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-center text-xl md:text-3xl font-semibold ">
        Update Devotion
      </h1>
      <div className="mt-4 flex items-center justify-center gap-2 text-sm md:text-base text-muted-foreground">
        Updating devotion of{" "}
        {devotion.date.toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
        <Calendar className="h-4 w-4" />
      </div>
      <p className="mt-4 md:text-lg text-foreground/80">
        Refine your Bible devotions using the SOAP method. Reflect on Scripture,
        Observation, Application, and Prayer to deepen your faith and grow in
        understanding.
      </p>

      <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
        <div>
          <Label className="mb-2" htmlFor="book">
            Book
          </Label>
          <BookCombobox
            className="w-full"
            selected={formData.book}
            setSelected={(val) => handleChange("book", val || "")}
          />
        </div>
        <div>
          <Label className="mb-2" htmlFor="chapter">
            Chapter
          </Label>
          <ChapterCombobox
            className="w-full"
            book={formData.book}
            selected={formData.chapter}
            setSelected={(val) => handleChange("chapter", val || 0)}
          />
        </div>
        <div>
          <Label className="mb-2" htmlFor="fromVerse">
            From Verse
          </Label>
          <VerseCombobox
            className="w-full"
            book={formData.book}
            chapter={formData.chapter}
            selected={formData.fromVerse}
            setSelected={(val) => handleChange("fromVerse", val || 0)}
          />
        </div>
        <div>
          <Label className="mb-2" htmlFor="toVerse">
            To Verse
          </Label>
          <VerseCombobox
            className="w-full"
            book={formData.book}
            chapter={formData.chapter}
            selected={formData.toVerse}
            setSelected={(val) => handleChange("toVerse", val || 0)}
          />
        </div>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <div>
          <Label className="mt-2">Scripture</Label>
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
          <Button type="submit">Update</Button>
          <Button type="button" variant="outline" onClick={handleClear}>
            Clear
          </Button>
        </div>
        <Button
          type="button"
          variant="destructive"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
