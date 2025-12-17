import {
  BookOpen,
  PenLine,
  CalendarCheck,
  Sparkles,
  HeartHandshake,
  Clock
} from "lucide-react";

export const features = [
  {
    icon: PenLine,
    title: "Devotion Writing",
    description:
      "Write personal reflections, prayers, and insights with a peaceful, distraction-free editor.",
  },
  {
    icon: BookOpen,
    title: "Scripture Organization",
    description:
      "Attach Bible verses to your devotions and organize them by book, chapter, or topic.",
  },
  {
    icon: CalendarCheck,
    title: "Daily Devotion Tracking",
    description:
      "Build a consistent quiet time habit with streaks, reminders, and devotion history.",
  },
  {
    icon: Sparkles,
    title: "Guided Reflection Prompts",
    description:
      "Receive gentle prompts that help deepen understanding and personal application of Scripture.",
  },
  {
    icon: HeartHandshake,
    title: "Prayer Journal",
    description:
      "Record prayers, track answered prayers, and reflect on God’s faithfulness over time.",
  },
  {
    icon: Clock,
    title: "Devotion Timeline",
    description:
      "View your spiritual journey through a chronological timeline of past devotions.",
  },
];


const Features = () => {
  return (
    <div className="min-h-screen flex items-center justify-center py-12">
      <div>
        <h2 className="text-4xl sm:text-5xl font-semibold tracking-tight text-center">
          Unleash Your Creativity
        </h2>
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-(--breakpoint-lg) mx-auto px-6">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col border rounded-xl py-6 px-5"
            >
              <div className="mb-4 h-10 w-10 flex items-center justify-center bg-muted rounded-full">
                <feature.icon className="size-5" />
              </div>
              <span className="text-lg font-semibold">{feature.title}</span>
              <p className="mt-1 text-foreground/80 text-[15px]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
