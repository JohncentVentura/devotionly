"use client";

import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { getDevotionById } from "@/actions/devotion.action";
import { Button } from "@/components/ui/button";

type Devotion = Awaited<ReturnType<typeof getDevotionById>>;

interface UpdateDevotionProps {
  variant?: "default" | "link" | "destructive" | "outline" | "secondary" | "ghost";
  devotion: Devotion;
  className?: string;
  children?: React.ReactNode;
}

export default function UpdateDevotionButton({
  variant,
  devotion,
  className,
  children,
}: UpdateDevotionProps) {
  const router = useRouter();

  return (
    <Button
      variant={variant || "default"}
      className={`text-base cursor-pointer ${className}`}
      onClick={() => router.push(`/devotions/${devotion?.id}/update`)}
    >
      {children ? children : <SquarePen className="w-4 h-4" />}
    </Button>
  );
}
