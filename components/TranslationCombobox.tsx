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
  variant?: "default" | "ghost" | "link" | "destructive" | "outline";
  className?: string;
  selected: Translations | null;
  setSelected: (status: Translations | null) => void;
};

export function TranslationCombobox({
  variant,
  className,
  selected,
  setSelected,
}: TranslationComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const hydrated = useHydrated();
  if (!hydrated) return null;

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={variant || "ghost"}
            className={`justify-between border border-transparent
              hover:border-border
              hover:bg-transparent
              active:border-border
              ${className}`}
          >
            {selected ? <>{selected.label}</> : <>Select Translation</>}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" align="start">
          <SelectedList
            setOpen={setOpen}
            selected={selected}
            setSelected={setSelected}
          />
        </PopoverContent>
      </Popover>
    );
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant={variant || "ghost"}
          className={`justify-between border border-transparent
              hover:border-border
              hover:bg-transparent
              active:border-border
              ${className}`}
        >
          {selected ? selected.label : "Select Translation"}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <SelectedList
            setOpen={setOpen}
            selected={selected}
            setSelected={setSelected}
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
}: {
  setOpen: (open: boolean) => void;
  selected: Translations | null;
  setSelected: (status: Translations | null) => void;
}) {
  //cmdk always focuses the first CommandItem on mount, so we need to reset the value
  const [value, setValue] = React.useState<string>("");
  React.useEffect(() => setValue(""), []);

  return (
    <Command value={value} onValueChange={setValue}>
      <CommandInput placeholder="Filter translation..." />
      <CommandList>
        <CommandEmpty>No translation found.</CommandEmpty>
        <CommandGroup>
          {translations.map((translation) => {
            const isSelected = selected?.value === translation.value;

            return (
              <CommandItem
                key={translation.value}
                value={translation.value}
                onSelect={(value) => {
                  setSelected(
                    translations.find((priority) => priority.value === value) ||
                      null,
                  );
                  setOpen(false);
                }}
                className={`
                  cursor-pointer
                  data-[selected=true]:bg-primary
                  ${isSelected ? "bg-secondary font-medium" : ""}
                `}
              >
                {translation.label}
              </CommandItem>
            );
          })}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
