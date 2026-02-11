"use client";

import { ChevronsUpDown } from "lucide-react";
import * as React from "react";
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

const oldTestament = [
  { value: "Genesis", label: "Genesis" },
  { value: "Exodus", label: "Exodus" },
  { value: "Leviticus", label: "Leviticus" },
  { value: "Numbers", label: "Numbers" },
  { value: "Deuteronomy", label: "Deuteronomy" },
  { value: "Joshua", label: "Joshua" },
  { value: "Judges", label: "Judges" },
  { value: "Ruth", label: "Ruth" },
  { value: "1 Samuel", label: "1 Samuel" },
  { value: "2 Samuel", label: "2 Samuel" },
  { value: "1 Kings", label: "1 Kings" },
  { value: "2 Kings", label: "2 Kings" },
  { value: "1 Chronicles", label: "1 Chronicles" },
  { value: "2 Chronicles", label: "2 Chronicles" },
  { value: "Ezra", label: "Ezra" },
  { value: "Nehemiah", label: "Nehemiah" },
  { value: "Esther", label: "Esther" },
  { value: "Job", label: "Job" },
  { value: "Psalms", label: "Psalms" },
  { value: "Proverbs", label: "Proverbs" },
  { value: "Ecclesiastes", label: "Ecclesiastes" },
  { value: "Song of Solomon", label: "Song of Solomon" },
  { value: "Isaiah", label: "Isaiah" },
  { value: "Jeremiah", label: "Jeremiah" },
  { value: "Lamentations", label: "Lamentations" },
  { value: "Ezekiel", label: "Ezekiel" },
  { value: "Daniel", label: "Daniel" },
  { value: "Hosea", label: "Hosea" },
  { value: "Joel", label: "Joel" },
  { value: "Amos", label: "Amos" },
  { value: "Obadiah", label: "Obadiah" },
  { value: "Jonah", label: "Jonah" },
  { value: "Micah", label: "Micah" },
  { value: "Nahum", label: "Nahum" },
  { value: "Habakkuk", label: "Habakkuk" },
  { value: "Zephaniah", label: "Zephaniah" },
  { value: "Haggai", label: "Haggai" },
  { value: "Zechariah", label: "Zechariah" },
  { value: "Malachi", label: "Malachi" },
];

const newTestament = [
  { value: "Matthew", label: "Matthew" },
  { value: "Mark", label: "Mark" },
  { value: "Luke", label: "Luke" },
  { value: "John", label: "John" },
  { value: "Acts", label: "Acts" },
  { value: "Romans", label: "Romans" },
  { value: "1 Corinthians", label: "1 Corinthians" },
  { value: "2 Corinthians", label: "2 Corinthians" },
  { value: "Galatians", label: "Galatians" },
  { value: "Ephesians", label: "Ephesians" },
  { value: "Philippians", label: "Philippians" },
  { value: "Colossians", label: "Colossians" },
  { value: "1 Thessalonians", label: "1 Thessalonians" },
  { value: "2 Thessalonians", label: "2 Thessalonians" },
  { value: "1 Timothy", label: "1 Timothy" },
  { value: "2 Timothy", label: "2 Timothy" },
  { value: "Titus", label: "Titus" },
  { value: "Philemon", label: "Philemon" },
  { value: "Hebrews", label: "Hebrews" },
  { value: "James", label: "James" },
  { value: "1 Peter", label: "1 Peter" },
  { value: "2 Peter", label: "2 Peter" },
  { value: "1 John", label: "1 John" },
  { value: "2 John", label: "2 John" },
  { value: "3 John", label: "3 John" },
  { value: "Jude", label: "Jude" },
  { value: "Revelation", label: "Revelation" },
];

type BookComboboxProps = {
  selected: string | null;
  setSelected: (value: string | null) => void;
  className?: string;
  children?: React.ReactNode;
  noneSelectedText: string ;
};

export default function BookCombobox({
  selected,
  setSelected,
  className,
  children,
  noneSelectedText,
}: BookComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

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
            selected={selected || ""}
            setSelected={setSelected}
            noneSelectedText={noneSelectedText}
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
            selected={selected || ""}
            setSelected={setSelected}
            noneSelectedText={noneSelectedText}
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
  noneSelectedText,
}: {
  setOpen: (open: boolean) => void;
  selected: string;
  setSelected: (value: string) => void;
  noneSelectedText: string;
}) {
  //cmdk always focuses the first CommandItem on mount, so we need to reset the value
  const [value, setValue] = React.useState<string>("");
  React.useEffect(() => setValue(""), []);
  const isNoneSelected = selected === "";

  return (
    <Command value={value} onValueChange={setValue}>
      <CommandInput placeholder="Search Book..." />
      <CommandList>
        <CommandEmpty>No book found.</CommandEmpty>
        <CommandGroup>
          {noneSelectedText && (
            <CommandItem
              value=""
              onSelect={() => {
                setSelected("");
                setOpen(false);
              }}
              className={`
              cursor-pointer
              data-[selected=true]:bg-primary
              hover:bg-primary
              ${isNoneSelected ? "bg-secondary font-medium" : ""}
            `}
            >
              {noneSelectedText}
            </CommandItem>
          )}
        </CommandGroup>
        <div className="grid grid-cols-2 gap-4">
          <CommandGroup heading="Old Testament">
            {oldTestament.map((testament) => {
              const isSelected = selected === testament.value;

              return (
                <CommandItem
                  key={testament.value}
                  value={testament.value}
                  onSelect={(value) => {
                    setSelected(value);
                    setOpen(false);
                  }}
                  className={`
                  cursor-pointer
                  data-[selected=true]:bg-primary
                  ${isSelected ? "bg-secondary font-medium" : ""}
                `}
                >
                  {testament.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
          <CommandGroup heading="New Testament">
            {newTestament.map((testament) => {
              const isSelected = selected === testament.value;

              return (
                <CommandItem
                  key={testament.value}
                  value={testament.value}
                  onSelect={(value) => {
                    setSelected(value);
                    setOpen(false);
                  }}
                  className={`
                  cursor-pointer
                  data-[selected=true]:bg-primary
                  ${isSelected ? "bg-secondary font-medium" : ""}
                `}
                >
                  {testament.label}
                </CommandItem>
              );
            })}
          </CommandGroup>
        </div>
      </CommandList>
    </Command>
  );
}
