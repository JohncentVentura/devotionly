"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function CreateDevotionButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Button
      size="lg"
      className="rounded-full text-base"
      onClick={() => router.push("/create")}
    >
      {children ? children : "Create Devotion"}
    </Button>
  );
}
