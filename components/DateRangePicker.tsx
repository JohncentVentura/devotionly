"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import type { DateRange } from "react-day-picker";

interface DatePickerWithRangeProps {
  selectedRange: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
  className?: string;
}

export function DateRangePicker({ selectedRange, onChange, className }: DatePickerWithRangeProps) {
  const [open, setOpen] = React.useState(false);

  // Each calendar has its own month state
  const [firstMonth, setFirstMonth] = React.useState(new Date());
  const [secondMonth, setSecondMonth] = React.useState(new Date(new Date().getFullYear(), new Date().getMonth() + 2, 1));

  const handleClear = () => {
    onChange(undefined); // reset selected range
    setOpen(false); // optionally close popover
    setFirstMonth(new Date()); // reset months
    setSecondMonth(new Date(new Date().getFullYear(), new Date().getMonth() + 2, 1));
  };

  return (
    <Field className={`mx-auto ${className}`}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker-range"
            className="cursor-pointer bg-primary w-full md:w-auto justify-center items-center gap-2 px-3"
          >
            <span className="truncate text-sm lg:text-base">
              {selectedRange?.from ? (
                selectedRange.to ? (
                  <>
                    {format(selectedRange.from, "yyyy-MM-dd")} -{" "}
                    {format(selectedRange.to, "yyyy-MM-dd")}
                  </>
                ) : (
                  format(selectedRange.from, "yyyy-MM-dd")
                )
              ) : (
                "Filter Date"
              )}
            </span>
            <CalendarIcon className="shrink-0" />
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-full max-w-[95vw] p-2 md:w-auto"
          align="center"
        >
          <div className="flex flex-col md:flex-row gap-2">
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={onChange}
              month={firstMonth}
              onMonthChange={setFirstMonth}
            />
            <Calendar
              mode="range"
              selected={selectedRange}
              onSelect={onChange}
              month={secondMonth}
              onMonthChange={setSecondMonth}
            />
          </div>
          <div className="mt-2 flex justify-end">
            <Button variant="ghost" size="sm" onClick={handleClear}>
              Clear
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </Field>
  );
}
