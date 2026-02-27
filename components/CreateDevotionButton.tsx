"use client";

import React, { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreateDevotionButton({
  variant,
  className,
  onClick,
  children,
}: {
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void | Promise<void>;
  children?: React.ReactNode;
}) {
  const router = useRouter();
  const clickedRef = useRef(false); // Ref to lock clicks
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    if (clickedRef.current) return; // Already clicked, ignore
    clickedRef.current = true; // Lock immediately
    setLoading(true);

    try {
      if (onClick) {
        await onClick(); // Wait for async handler
      } else {
        router.push("/create");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant || "default"}
      className={`rounded-full text-sm lg:text-base border-border dark:border-muted-foreground cursor-pointer 
        hover:brightness-110 dark:hover:brightness-110 active:brightness-110 dark:active:brightness-110 transition duration-500
        ${className}`}
      onClick={handleClick}
      disabled={loading}
    >
      {loading ? "Creating..." : children || "Create Devotion"}
    </Button>
  );
}
