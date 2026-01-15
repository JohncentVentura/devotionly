"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { createDevotion, editDevotion } from "@/actions/devotion.action";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combo-box";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { getDevotionById } from "@/actions/devotion.action";

type Devotion = NonNullable<Awaited<ReturnType<typeof getDevotionById>>>;

interface EditDialogProps {
  devotion: Devotion;
}

export default function UpdatePage({ devotion }: EditDialogProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
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

  const handleChange = (field: string, value: string | number | Date) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const updatedDevotion = await editDevotion(devotion.id, formData);
      //console.log("updatedDevotion:", updatedDevotion);
      toast.success("Successfully updated devotion");
    } catch (error) {
      toast.error("Failed to update devotion: " + error);
    }
    router.replace("/devotions");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="book">Book</Label>
          <Combobox
            value={formData.book}
            onChange={(val) => handleChange("book", val)}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="chapter">Chapter</Label>
        <Input
          id="chapter"
          type="number"
          placeholder="Enter chapter"
          value={formData.chapter}
          onChange={(e) => handleChange("chapter", Number(e.target.value))}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Label htmlFor="scripture">Scripture</Label>
        <Textarea
          id="scripture"
          placeholder="Type your scripture here."
          rows={5}
          value={formData.scripture}
          onChange={(e) => handleChange("scripture", e.target.value)}
        />
        <Label htmlFor="reflection">Reflection</Label>
      </div>

      {/* 
          <div className="py-5">
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl ?? ""}
              onChange={(url) => {
                handleChange("imageUrl", url);
              }}
            />
          </div>
          */}

      <Button variant="outline" className="ml-2">
        Clear
      </Button>
      <Button type="submit" className="ml-2">
        Update
      </Button>
    </form>
  );
}
