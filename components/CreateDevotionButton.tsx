"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreateDevotionButton({
  variant,
  className,
  children,
}: {
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
  className?: string;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Button
      variant={variant || "default"}
      size="lg"
      className={`rounded-full text-base border-border dark:border-muted-foreground ${className}`}
      onClick={() => router.push("/create")}
    >
      {children ? children : "Create Devotion"}
    </Button>
  );
}
