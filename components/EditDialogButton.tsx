import { EditIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getDevotionById, updateDevotion } from "@/actions/devotion.action";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ComboboxBook } from "./ComboboxBook";
import { ComboboxChapter } from "./ComboboxChapter";
import { ComboboxVerse } from "./ComboboxVerse";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ImageUpload from "./ImageUpload";

type Devotion = NonNullable<Awaited<ReturnType<typeof getDevotionById>>>;

interface EditDialogProps {
  devotion: Devotion;
}

export default function EditDialogButton({ devotion }: EditDialogProps) {
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
      const newDevotion = await updateDevotion(devotion.id, formData);
      //console.log("newDevotion:", newDevotion);
      toast.success("Successfully edited devotion");
    } catch (error) {
      toast.error("Failed to edit devotion" + error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="secondary"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <EditIcon className="w-4 h-4" />
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Edit a devotion?</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to edit a devotion from your library.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2" htmlFor="book">
                Book
              </Label>
              <ComboboxBook
                value={formData.book}
                onChange={(val) => handleChange("book", val)}
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="chapter">
                Chapter
              </Label>
              <ComboboxChapter
                value={formData.chapter}
                onChange={(val) => handleChange("chapter", val)}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-2" htmlFor="fromVerse">
                From Verse
              </Label>
              <ComboboxVerse
                value={formData.fromVerse}
                onChange={(val) => handleChange("fromVerse", val)}
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="toVerse">
                To Verse
              </Label>
              <ComboboxVerse
                value={formData.toVerse}
                onChange={(val) => handleChange("toVerse", val)}
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="mb-2" htmlFor="scripture">
                Scripture
              </Label>
              <Textarea
                id="scripture"
                placeholder="Type your scripture here."
                disabled
                rows={5}
                value={formData.scripture}
                onChange={(e) => handleChange("scripture", e.target.value)}
              />
            </div>
            <div>
              <Label className="mb-2" htmlFor="observation">
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
              <Label className="mb-2" htmlFor="application">
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
              <Label className="mb-2" htmlFor="prayer">
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

          {/*
                  <div className="py-4">
                    <ImageUpload
                      endpoint="postImage"
                      value={formData.imageUrl ?? ""}
                      onChange={(url) => handleChange("imageUrl", url)}
                    />
                  </div>
                  */}

          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
