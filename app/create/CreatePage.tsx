"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { createDevotion } from "@/actions/devotion.action";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combo-box";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

export default function CreatePage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
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

  const handleChange = (field: string, value: string | number | Date) => {
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

      <Button variant="outline" className="ml-2">
        Clear
      </Button>
      <Button type="submit" className="ml-2">
        Create
      </Button>
    </form>
  );
}
