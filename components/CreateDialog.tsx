import { BookPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { createDevotion } from "@/actions/devotion.action";
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

export default function CreateDialog() {
  const [formData, setFormData] = useState({
    title: "",
    date: new Date(),
    book: "",
    chapter: 1,
    scripture: "",
    reflection: "",
    createdAt: new Date(),
    updatedAt: new Date(),
    userId: "",
    imageUrl: "",
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
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto flex items-center gap-2"
          asChild
        >
          <span>
            <BookPlus className="w-4 h-4" />
            Add devotion
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Add a devotion?</AlertDialogTitle>
          <AlertDialogDescription>
            Fill out the form below to add a new devotion to your library.
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
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Submit</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
