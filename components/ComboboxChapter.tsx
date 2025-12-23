"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const chapters = [
  { value: 0, label: "None" },
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
  { value: 5, label: "5" },
];

interface ComboboxProps {
  value: number;
  onChange: (value: number) => void;
}

export function ComboboxChapter({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value ? value : "Select Chapter..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search Chapter..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Chapter Found.</CommandEmpty>
            <CommandGroup>
              {chapters.map((chapter) => (
                <CommandItem
                  key={chapter.value}
                  value={chapter.value.toString()}
                  onSelect={(currentValue) => {
                    onChange(parseInt(currentValue));
                    setOpen(false);
                  }}
                >
                  {chapter.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === chapter.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
