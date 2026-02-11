"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { getVerseCount } from "@/app/api/bible/bibleAPI";
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

type VerseComboboxProps = {
  book: string | null;
  chapter: number | null;
  selected: number | null;
  setSelected: (value: number | null) => void;
  className?: string;
  children?: React.ReactNode;
};

export default function VerseCombobox({
  book,
  chapter,
  selected,
  setSelected,
  className,
  children,
}: VerseComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [verseCount, setVerseCount] = React.useState<number>(0);
  const [loading, setLoading] = React.useState(false);

  // Fetch verse count whenever book or chapter changes
  React.useEffect(() => {
    if (!book || !chapter) {
      setVerseCount(0);
      setSelected(0);
      return;
    }

    setLoading(true);
    getVerseCount(book, chapter)
      .then((count) => {
        setVerseCount(count);
        if (selected !== null && selected > count) setSelected(null); // reset invalid selection
      })
      .finally(() => setLoading(false));
  }, [book, chapter]);

  const verses = React.useMemo(() => {
    return Array.from({ length: verseCount }, (_, i) => ({
      value: i + 1,
      label: String(i + 1),
    }));
  }, [verseCount]);

  const hydrated = useHydrated();
  if (!hydrated) return null;

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button className={`cursor-pointer ${className}`}>
            {selected ? selected : children}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <SelectedList
            setOpen={setOpen}
            selected={selected}
            setSelected={setSelected}
            verses={verses}
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
            verses={verses}
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
  chapter,
  verses,
}: {
  setOpen: (open: boolean) => void;
  selected: number | null;
  setSelected: (value: number | null) => void;
  chapter: number | null;
  verses: { value: number; label: string }[];
}) {
  //cmdk always focuses the first CommandItem on mount, so we need to reset the value
  const [value, setValue] = React.useState<string>("");
  React.useEffect(() => setValue(""), []);

  return (
    <Command value={value} onValueChange={setValue}>
      <CommandList>
        <CommandInput placeholder="Search Book..." />
        <CommandEmpty className="p-4">No verses found.</CommandEmpty>
        <CommandGroup>
          {verses.map((verse) => (
            <CommandItem
              key={verse.value}
              value={verse.value.toString()}
              onSelect={(currentValue) => {
                setSelected(Number(currentValue));
                setOpen(false);
              }}
            >
              Verse {verse.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
