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
import { ChevronRight } from "lucide-react";
import { getDevotionById } from "@/actions/devotion.action";
import UpdateDevotionButton from "@/components/UpdateDevotionButton";
import { useRouter } from "next/navigation";

type Devotion = Awaited<ReturnType<typeof getDevotionById>>;

interface DevotionCardProps {
  devotion: Devotion;
}

const DevotionCard = ({ devotion }: DevotionCardProps) => {
  const router = useRouter();

  return (
    <div className="max-w-(--breakpoint-xl) mx-auto px-6 xl:px-0">
      <h2 className="text-3xl font-semibold tracking-tight">
        {devotion?.date?.toLocaleDateString()}
      </h2>
      <Card className="mt-4 shadow-none overflow-hidden rounded-md py-0">
        <CardContent className="mt-4 pb-6">
          <div className="flex items-center gap-3">
            <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
              Book:
            </Badge>
            <span className="font-medium text-xs text-muted-foreground">
              {devotion?.book}
            </span>
            <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
              Chapter:
            </Badge>
            <span className="font-medium text-xs text-muted-foreground">
              {devotion?.chapter}
            </span>
            <Badge className="bg-primary/5 text-primary hover:bg-primary/5 shadow-none">
              Verses:
            </Badge>
            <span className="font-medium text-xs text-muted-foreground">
              {devotion?.fromVerse}-{devotion?.toVerse}
            </span>
          </div>

          <h3 className="mt-4 text-[1.4rem] font-semibold tracking-tight">
            Scripture
          </h3>
          <p className="mt-2 text-muted-foreground">
            {devotion?.scripture}
          </p>

          <h3 className="mt-4 text-[1.4rem] font-semibold tracking-tight">
            Observation
          </h3>
          <p className="mt-2 text-muted-foreground">
            {devotion?.observation}
          </p>

          <h3 className="mt-4 text-[1.4rem] font-semibold tracking-tight">
            Application
          </h3>
          <p className="mt-2 text-muted-foreground">
            {devotion?.application}
          </p>

          <h3 className="mt-4 text-[1.4rem] font-semibold tracking-tight">
            Prayer
          </h3>
          <p className="mt-2 text-muted-foreground">
            {devotion?.prayer}
          </p>

          <div className="mt-8 flex justify-between items-center">
            <UpdateDevotionButton devotion={devotion}  >
              Edit
            </UpdateDevotionButton>
            <Button type="button" size="lg" variant="destructive" onClick={() => router.back()}>
              Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DevotionCard;
