"use client";

import { SquarePen } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { getDevotionById } from "@/actions/devotion.action";
import { Button } from "@/components/ui/button";

type Devotion = Awaited<ReturnType<typeof getDevotionById>>;

interface UpdateDevotionProps {
  devotion: Devotion;
  className?: string;
  children?: React.ReactNode;
}

export default function UpdateDevotionButton({
  devotion,
  className,
  children,
}: UpdateDevotionProps) {
  const router = useRouter();

  return (
    <Button
      size="lg"
      className={`rounded-full text-base ${className}`}
      onClick={() => router.push(`/devotions/${devotion?.id}/update`)}
    >
      {children ? children : <SquarePen className="w-4 h-4" />}
    </Button>
  );
}
