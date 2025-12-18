import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { imagePaths } from "@/lib/paths";
import { BookOpen, PenLine, CalendarCheck } from "lucide-react";
import Image from "next/image";

const features = [
  {
    icon: PenLine,
    title: "Devotion Writing",
    description:
      "Write personal reflections, prayers, and insights with a peaceful, distraction-free editor.",
    src: imagePaths.homeFeature1,
  },
  {
    icon: BookOpen,
    title: "Scripture Organization",
    description:
      "Attach Bible verses to your devotions and organize them by book, chapter, or topic.",
    src: imagePaths.homeFeature2,
  },
  {
    icon: CalendarCheck,
    title: "Devotion Timeline",
    description:
      "View your spiritual journey through a chronological timeline of past devotions.",
    src: imagePaths.homeFeature3,
  },
];

export default function HomeFeatures() {
  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-(--breakpoint-lg) w-full py-10 px-6">
        <h2 className="text-4xl md:text-[2.5rem] md:leading-[1.2] font-semibold tracking-[-0.03em] sm:max-w-xl text-pretty">
          Deepen Your Devotions
        </h2>
        <p className="mt-2 text-muted-foreground text-lg sm:text-xl">
          Build a meaningful devotion rhythm with simple tools that guide
          reflection, prayer, and faithfulness.
        </p>
        <div className="mt-10 w-full mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="flex flex-col border rounded-xl overflow-hidden shadow-none pb-0"
            >
              <CardHeader>
                <feature.icon />
                <h4 className="mt-3! text-xl font-semibold tracking-tight">
                  {feature.title}
                </h4>
                <p className="mt-1 text-muted-foreground text-[17px]">
                  {feature.description}
                </p>
              </CardHeader>
              <CardContent className="relative mt-auto px-0 pb-0">
                <div className="bg-muted h-40 ml-6 rounded-tl-xl" />
                <Image
                  src={feature.src}
                  alt="Hero"
                  className="object-cover h-40 ml-6 rounded-tl-xl"
                  fill
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
