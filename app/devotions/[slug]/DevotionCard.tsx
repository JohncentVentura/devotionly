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

type Devotion = Awaited<ReturnType<typeof getDevotionById>>;

interface DevotionCardProps {
  devotion: Devotion;
}

export default function DevotionCard({ devotion }: DevotionCardProps) {
  if (!devotion) return <div>Devotion data is not available</div>;

  return (
    <Card className="max-w">
      <div className="flex flex-row">
        <div className="basis-2/4">
          <CardHeader>
            {devotion.imageUrl && (
              <div className="rounded-lg overflow-hidden">
                <Image
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
              {devotion.book}
            </CardTitle>
            <CardTitle className="text-3xl font-bold">
              {devotion.date?.toLocaleDateString()}
            </CardTitle>
            <Badge>{devotion.book}</Badge>
            <CardDescription>Chapter: {devotion.chapter}</CardDescription>
            <CardDescription className="text-white">
              {devotion.scripture}
            </CardDescription>
            <CardDescription className="text-white">
              {devotion.reflection}
            </CardDescription>
          </CardContent>
        </div>
      </div>
    </Card>
  );
}
