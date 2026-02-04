"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Menu } from "lucide-react";
import Logo from "@/components/Logo";
import { NavMenu } from "@/components/layout/NavMenu";

export const NavigationSheet = () => {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <VisuallyHidden>
        <SheetTitle>Navigation Menu</SheetTitle>
      </VisuallyHidden>

      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Menu />
        </Button>
      </SheetTrigger>

      <SheetContent className="px-6 py-3">
        <Logo />

        <div onClick={() => setOpen(false)}>
          <NavMenu
            orientation="vertical"
            className="mt-6 [&>div]:h-full"
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
