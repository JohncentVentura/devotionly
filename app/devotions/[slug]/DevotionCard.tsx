"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronRight, Calendar } from "lucide-react";
import { getDevotionById } from "@/actions/devotion.action";
import UpdateDevotionButton from "@/components/UpdateDevotionButton";
import { useRouter } from "next/navigation";
import DeleteDevotionButton from "@/components/DeleteDevotionButton";
import { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

type Devotion = Awaited<ReturnType<typeof getDevotionById>>;

interface DevotionCardProps {
  devotion: Devotion;
}

const DevotionCard = ({ devotion }: DevotionCardProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!devotion) {
      router.back();
    }
  }, [devotion, router]);

  if (!devotion) return <>Devotion is deleted</>;

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto ">
      <Card className="shadow-none overflow-hidden rounded-md py-0 border-primary border-2">
        <CardHeader>
          <h1 className="mt-4 text-center text-2xl md:text-3xl font-semibold tracking-tight">
            Daily Devotional
          </h1>
          <h3 className="mt-1 flex items-center justify-center gap-1 text-sm md:text-base font-medium text-muted-foreground">
            <Calendar className="h-4 w-4" />
            {devotion?.date?.toLocaleDateString()}
          </h3>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center flex-wrap gap-4">
            <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none text-sm px-2 py-0.5">
              Book:
            </Badge>
            <span className="font-medium text-sm text-muted-foreground">
              {devotion?.book}
            </span>
            <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none text-sm px-2 py-0.5">
              Chapter:
            </Badge>
            <span className="font-medium text-sm text-muted-foreground">
              {devotion?.chapter}
            </span>
            <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none text-sm px-2 py-0.5">
              Verses:
            </Badge>
            <span className="font-medium text-sm text-muted-foreground">
              {devotion?.fromVerse}
              {devotion.fromVerse !== devotion.toVerse &&
                `-${devotion.toVerse}`}
            </span>
          </div>
          <Separator className="my-6 md:my-8" />
          <h3 className="text-[1.4rem] font-semibold tracking-tight">
            Scripture
          </h3>
          <div className="mt-2 space-y-3 leading-relaxed text-muted-foreground">
            {devotion?.scripture
              ?.split(/(?<=[.!?])\s+/) // split by sentences
              .map((text, index) => {
                const verseNumber = devotion.fromVerse + index;

                return (
                  <p key={index} className={index === 0 ? "mt-4" : ""}>
                    <span className="mr-1 font-semibold text-foreground">
                      {verseNumber}
                    </span>
                    {text}
                  </p>
                );
              })}
          </div>
          <div className="flex flex-col gap-4">
            <div className="mt-4 flex flex-col">
              <h3 className="text-[1.4rem] font-semibold tracking-tight">
                Observation
              </h3>
              <p className="mt-2 text-muted-foreground wrap-break-word">
                {devotion?.observation}
              </p>
            </div>

            <div className="mt-4 flex flex-col">
              <h3 className="text-[1.4rem] font-semibold tracking-tight">
                Application
              </h3>
              <p className="mt-2 text-muted-foreground wrap-break-word">
                {devotion?.application}
              </p>
            </div>

            <div className="mt-4 flex flex-col">
              <h3 className="text-[1.4rem] font-semibold tracking-tight">
                Prayer
              </h3>
              <p className="mt-2 text-muted-foreground wrap-break-word">
                {devotion?.prayer}
              </p>
            </div>
          </div>

          <div className="mt-12 mb-8 flex justify-between items-center">
            <div className="flex gap-4">
              <UpdateDevotionButton devotion={devotion}>
                Edit
              </UpdateDevotionButton>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
              >
                Back
              </Button>
            </div>
            <DeleteDevotionButton devotion={devotion}>
              Delete
            </DeleteDevotionButton>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevotionCard;
