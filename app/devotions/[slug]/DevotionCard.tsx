"use client";

import Image from "next/image";
import { getDevotionById } from "@/actions/devotion.action";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  //CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Devotion = Awaited<ReturnType<typeof getDevotionById>>;

interface DevotionCardProps {
  devotion: Devotion;
}

export default function DevotionCard({ devotion }: DevotionCardProps) {
  const router = useRouter();
  if (!devotion) return <div>Devotion data is not available</div>;

  return (
    <Card className="max-w">
      <div className="flex flex-row">
        <div className="basis-2/4">
          <CardHeader>
            {devotion.imageUrl && (
              <div className="rounded-lg overflow-hidden">
                <img
                  src={devotion.imageUrl}
                  alt="Post content"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </CardHeader>
        </div>
        <div className="basis-2/4 flex flex-col justify-between">
          <CardContent className="mt-8 space-y-3">
            <CardTitle className="text-5xl font-bold">
              {devotion.date?.toLocaleDateString()}
            </CardTitle>
            <CardTitle className="text-3xl font-bold">
              {devotion.date?.toLocaleDateString()}
            </CardTitle>
            <Badge>{devotion.book}</Badge>
            <CardDescription>Chapter: {devotion.chapter}</CardDescription>
            <CardDescription>Scripture</CardDescription>
            <CardDescription>{devotion.scripture}</CardDescription>
          </CardContent>
        </div>
        <Button
                      size="lg"
                      className="rounded-full text-base"
                      onClick={() => router.push(`/devotions/${devotion.id}/update`)}
                    >
                      {/*TODO: Create a client component that returns a button that pushes in /update */}
                      Update Devotion
                    </Button>
      </div>
    </Card>
  );
}
