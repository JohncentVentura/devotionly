"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { getChapterCount } from "@/app/api/bible/bibleAPI";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import useMediaQuery from "@/hooks/use-media-query";
import useHydrated from "@/hooks/useHydrated";

type ChapterComboboxProps = {
  book: string | null;
  selected: number | null;
  setSelected: (status: number | null) => void;
  className?: string;
  children?: React.ReactNode;
};

export default function ChapterCombobox({
  book,
  selected,
  setSelected,
  className,
  children,
}: ChapterComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const chapters = React.useMemo(() => {
    if (!book) return [];

    const count = getChapterCount(book);
    return Array.from({ length: count }, (_, i) => ({
      value: i + 1,
      label: String(i + 1),
    }));
  }, [book]);

  // Reset chapter if book changes
  React.useEffect(() => {
    setSelected(null);
  }, [book]);

  const hydrated = useHydrated();
  if (!hydrated) return null;

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className={`cursor-pointer ${className}`}>
            {selected ? selected : children}
            <ChevronsUpDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <SelectedList
            setOpen={setOpen}
            selected={selected}
            setSelected={setSelected}
            chapters={chapters}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className={`cursor-pointer ${className}`}>
          {selected ? selected : children}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <SelectedList
            setOpen={setOpen}
            selected={selected}
            setSelected={setSelected}
            chapters={chapters}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SelectedList({
  setOpen,
  selected,
  setSelected,
  chapters,
}: {
  setOpen: (open: boolean) => void;
  selected: number | null;
  setSelected: (status: number | null) => void;
  chapters: { value: number; label: string }[];
}) {
  //cmdk always focuses the first CommandItem on mount, so we need to reset the value
  const [value, setValue] = React.useState<string>("");
  React.useEffect(() => setValue(""), []);
  const isNoneSelected = selected === null;

  return (
    <Command value={value} onValueChange={setValue}>
      <CommandInput placeholder="Search Chapter..." />
      <CommandList>
        <CommandEmpty>No chapter found.</CommandEmpty>
        <CommandGroup>
          <CommandItem
            value=""
            onSelect={() => {
              setSelected(null);
              setOpen(false);
            }}
            className={`
              cursor-pointer
              data-[selected=true]:bg-primary
              hover:bg-primary
              ${isNoneSelected ? "bg-secondary font-medium" : ""}
              `}
          >
            All
          </CommandItem>
        </CommandGroup>
        <CommandGroup>
          {chapters.map((chapter) => {
            const isSelected = selected === chapter.value;
            
            return (
              <CommandItem
                key={chapter.value}
                value={chapter.value.toString()}
                onSelect={(currentValue) => {
                  setSelected(Number(currentValue));
                  setOpen(false);
                }}
                className={`
                  cursor-pointer
                  data-[selected=true]:bg-primary
                  ${isSelected ? "bg-secondary font-medium" : ""}
                `}
              >
                {chapter.label}
              </CommandItem>
            )
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
