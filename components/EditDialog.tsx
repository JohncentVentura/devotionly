import { EditIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { getDevotionById, editDevotion } from "@/actions/devotion.action";
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
import { Combobox } from "./ui/combo-box";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import ImageUpload from "./ImageUpload";

type Devotion = NonNullable<Awaited<ReturnType<typeof getDevotionById>>>;

interface EditDialogProps {
  devotion: Devotion;
}

export default function EditDialog({ devotion }: EditDialogProps) {
  const [formData, setFormData] = useState({
    title: devotion.title,
    date: devotion.date,
    book: devotion.book,
    chapter: devotion.chapter,
    scripture: devotion.scripture,
    reflection: devotion.reflection,
    createdAt: devotion.createdAt,
    updatedAt: devotion.updatedAt,
    userId: devotion.userId,
    imageUrl: devotion.imageUrl,
  });

  const handleChange = (field: string, value: string | number | Date) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const newDevotion = await editDevotion(devotion.id, formData);
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
            Edit devotion
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
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
            </div>
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
            <Textarea
              id="reflection"
              placeholder="Type your reflection here."
              rows={5}
              value={formData.reflection}
              onChange={(e) => handleChange("reflection", e.target.value)}
            />
          </div>

          <div className="py-5">
            <ImageUpload
              endpoint="postImage"
              value={formData.imageUrl ?? ""}
              onChange={(url) => {
                handleChange("imageUrl", url);
              }}
            />
          </div>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
