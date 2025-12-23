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

const oldTestament = [
  { value: "Genesis", label: "Genesis" },
  { value: "Exodus", label: "Exodus" },
  { value: "Leviticus", label: "Leviticus" },
  { value: "Numbers", label: "Numbers" },
  { value: "Deuteronomy", label: "Deuteronomy" },
  { value: "Psalms", label: "Psalms" },
  { value: "Proverbs", label: "Proverbs" },
];

const newTestament = [
  { value: "Matthew", label: "Matthew" },
  { value: "Mark", label: "Mark" },
  { value: "Luke", label: "Luke" },
  { value: "John", label: "John" },
];

interface ComboboxProps {
  value: string;
  onChange: (value: string) => void;
}

export function ComboboxBook({ value, onChange }: ComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-50 justify-between"
        >
          {value ? value : "Select Book..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search Book..." className="h-9" />
          <CommandList>
            <CommandEmpty>No Book Found.</CommandEmpty>
           
            <CommandGroup>
              <CommandItem
                value=""
                onSelect={() => {
                  onChange("");
                  setOpen(false);
                }}
              >
                None
                <Check
                  className={cn(
                    "ml-auto",
                    value === "" ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            </CommandGroup>

            <div className="grid grid-cols-2 gap-2 p-2">
              <CommandGroup heading="Old Testament">
                {oldTestament.map((book) => (
                  <CommandItem
                    key={book.value}
                    value={book.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    {book.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === book.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>

              <CommandGroup heading="New Testament">
                {newTestament.map((book) => (
                  <CommandItem
                    key={book.value}
                    value={book.value}
                    onSelect={(currentValue) => {
                      onChange(currentValue);
                      setOpen(false);
                    }}
                  >
                    {book.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === book.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </div>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
