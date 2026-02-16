"use client";

import * as React from "react";
import { BibleApiResponse } from "@/app/api/bible/bibleAPI";
import { cn } from "@/lib/utils";


interface Props {
  data: BibleApiResponse | null;
}

export default function ScriptureRenderer({ data }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [scrollEnabled, setScrollEnabled] = React.useState(false);

  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleResize = () => {
      // Enable scroll if content overflows the visible height
      setScrollEnabled(el.scrollHeight > el.clientHeight);
    };

    handleResize();

    el.addEventListener("mouseup", handleResize); // when user stops resizing
    window.addEventListener("resize", handleResize); // window resize

    return () => {
      el.removeEventListener("mouseup", handleResize);
      window.removeEventListener("resize", handleResize);
    };
  }, [data]);

  if (!data) return null;

  return (
    <div
  ref={containerRef}
  className={cn(
    "w-full",
    "min-h-30",          // same visual height as rows={5}
    "max-h-[80vh]",
    "resize-y",
    "rounded-md",
    "border border-input",
    "bg-background",
    "px-4 pb-4",
    "text-sm leading-relaxed",
    "text-muted-foreground",
    "whitespace-pre-wrap",
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    scrollEnabled ? "overflow-y-auto" : "overflow-y-hidden"
  )}
>

      <div className="space-y-3">
        {data.verses.map((v, index) => {
          const prev = data.verses[index - 1];

          const newParagraph =
            index === 0 ||
            v.text.trim().endsWith(":") ||
            (prev && prev.text.trim().endsWith("."));

          return (
            <p key={v.verse} className={newParagraph ? "mt-4" : ""}>
              <span className="mr-1 font-semibold text-foreground">
                {v.verse}
              </span>
              {v.text}
            </p>
          );
        })}
      </div>
    </div>
  );
}
