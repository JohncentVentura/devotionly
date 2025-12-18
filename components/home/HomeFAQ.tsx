import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { Accordion as AccordionPrimitive } from "radix-ui";
import { PlusIcon } from "lucide-react";

const faq = [
  {
    question: "What are daily devotions?",
    answer:
      "Daily devotions are intentional moments set aside to read Scripture, pray, and reflect on God’s Word. “Your word is a lamp to my feet and a light to my path.” (Psalm 119:105)",
  },
  {
    question: "Why are devotions important?",
    answer:
      "Devotions help strengthen faith and deepen your relationship with God through consistent time with Him. “Draw near to God, and he will draw near to you.” (James 4:8)",
  },
  {
    question: "When and where is the best time or place?",
    answer:
      "The best time and place is where you can be still and focused, whether morning, evening, or anywhere quiet. “This Book of the Law shall not depart from your mouth, but you shall meditate on it day and night, so that you may be careful to do according to all that is written in it.” (Joshua 1:8)",
  },
  {
    question: "How does this apply to my life today?",
    answer:
      "God’s Word guides daily decisions, offers peace, and provides wisdom for everyday life. “Do not merely listen to the word… Do what it says.” (James 1:22)",
  },
];

export default function HomeFAQ() {
  return (
    <section className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-2xl">
        <h2 className="text-4xl leading-[1.15]! font-semibold tracking-[-0.03em]">
          Frequently Asked Questions
        </h2>
        <p className="mt-2 text-xl text-muted-foreground">
          Helpful answers to common questions about daily devotions and faith
          practices.
        </p>

        <Accordion
          type="single"
          collapsible
          className="mt-8 sm:mt-10 space-y-4"
          defaultValue="question-0"
        >
          {faq.map(({ question, answer }, index) => (
            <AccordionItem
              key={question}
              value={`question-${index}`}
              className="bg-accent py-1 px-4 rounded-xl border-none"
            >
              <AccordionPrimitive.Header className="flex">
                <AccordionPrimitive.Trigger
                  className={cn(
                    "flex flex-1 items-center justify-between pt-4 pb-3 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
                    "text-start text-lg"
                  )}
                >
                  {question}
                  <PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
                </AccordionPrimitive.Trigger>
              </AccordionPrimitive.Header>
              <AccordionContent className="text-base text-muted-foreground">
                {answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
