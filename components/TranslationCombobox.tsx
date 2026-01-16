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
import { useMediaQuery } from "@/hooks/use-media-query";

type Translations = {
  value: string;
  label: string;
};

const translations: Translations[] = [
  {
    value: "WEB",
    label: "World English Bible",
  },
  {
    value: "KJV",
    label: "King James Version",
  },
  {
    value: "ASV",
    label: "American Standard Version",
  },
  { value: "BBE", label: "Bible in Basic English" },
];

type TranslationComboboxProps = {
  selected: Translations | null;
  onChange: (status: Translations | null) => void;
};

export function TranslationCombobox({
  selected,
  onChange,
}: TranslationComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="w-56 justify-start">
            {selected ? <>{selected.label}</> : <>Select Translation</>}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-0" align="start">
          <SelectedList setOpen={setOpen} setSelected={onChange} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="w-56 justify-start">
          {selected ? <>{selected.label}</> : <>Select Translation</>}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <SelectedList setOpen={setOpen} setSelected={onChange} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function SelectedList({
  setOpen,
  setSelected,
}: {
  setOpen: (open: boolean) => void;
  setSelected: (status: Translations | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Filter translation..." />
      <CommandList>
        <CommandEmpty>No translation found.</CommandEmpty>
        <CommandGroup>
          {translations.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                setSelected(
                  translations.find((priority) => priority.value === value) || null
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
