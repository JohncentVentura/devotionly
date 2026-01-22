"use client";

import { Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { deleteDevotion, getDevotionById } from "@/actions/devotion.action";
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

type Devotion = NonNullable<Awaited<ReturnType<typeof getDevotionById>>>;

interface DeleteDevotionProps {
  devotion: Devotion;
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
  className?: string;
  children?: React.ReactNode;
}

export default function DeleteDevotionButton({ devotion, variant, className, children }: DeleteDevotionProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await deleteDevotion(devotion.id);
      toast.success("devotion deleted successfully");
    } catch (error) {
      console.error("Error deleting devotion:", error);
      toast.error("Failed to delete devotion");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant ? variant : "destructive"}
          className={`flex items-center gap-2 cursor-pointer ${className}`}
          asChild
        >
          <span>
            {children ? children : <Trash2 className="w-4 h-4" />}
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="text-[15px]">
            This action cannot be undone. This will permanently delete the devotion
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={handleSubmit}>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit">Confirm Delete</AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
