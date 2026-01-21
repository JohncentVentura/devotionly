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
    <Field className={`${className} mx-auto `}>
      
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date-picker-range"
            className="bg-primary justify-center"
          >
            {selectedRange?.from ? (
              selectedRange.to ? (
                <>
                  {format(selectedRange.from, "yyyy-MM-dd")} - {format(selectedRange.to, "yyyy-MM-dd")}
                </>
              ) : (
                format(selectedRange.from, "yyyy-MM-dd")
              )
            ) : (
              <span>Filter Date</span>
            )}
            <CalendarIcon/>
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-2" align="start">
          <div className="flex gap-2">
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
