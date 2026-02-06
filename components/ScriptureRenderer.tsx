"use client";

import * as React from "react";
import { BibleApiResponse } from "@/app/api/bible/bibleAPI";

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
      className={`
        w-full
        min-h-36      /* match textarea rows=5 */
        max-h-[80vh]      /* optional max height */
        resize-y           /* allow vertical */
        rounded-md
        border
        bg-background
        px-3
        py-2
        text-sm
        leading-relaxed
        text-muted-foreground
        whitespace-pre-wrap
        overflow-y-${scrollEnabled ? "auto" : "hidden"}
      `}
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
