
"use client"; 

import * as React from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { FaCalendar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

interface DatePickerWithRangeProps {
  date: DateRange | undefined;
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}

export function DatePickerWithRange({ date, setDate }: DatePickerWithRangeProps) {
  return (
    <div className="grid gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={
              !date ? "text-muted-foreground text-sm" : "justify-start text-left font-normal"
            }
          >
            <FaCalendar className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <div className="flex flex-col text-xs">
                  Filter 
                  <span>
                    {format(date.from, "LLL dd, yy")} - {format(date.to, "LLL dd, yy")}
                  </span>
                </div>
              ) : (
                format(date.from, "LLL dd, yy")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
