"use client";
import React from "react";
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
  onClick?: () => void;
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Button
      variant={variant || "default"}
      className={`rounded-full text-sm lg:text-base border-border dark:border-muted-foreground cursor-pointer 
        hover:brightness-110 dark:hover:brightness-110 active:brightness-110 dark:active:brightness-110 transition duration-500
        ${className}`}
      onClick={onClick || (() => router.push("/create"))}
    >
      {children ? children : "Create Devotion"}
    </Button>
  );
}
