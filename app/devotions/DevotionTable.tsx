"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDevotions } from "@/actions/devotion.action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import BookCombobox from "@/components/BookCombobox";
import ChapterCombobox from "@/components/ChapterCombobox";
import CreateDevotionButton from "@/components/CreateDevotionButton";
import DeleteDevotionButton from "@/components/DeleteDevotionButton";
import UpdateDevotionButton from "@/components/UpdateDevotionButton";
import { Input } from "@/components/ui/input"
import { DateRangePicker } from "@/components/DateRangePicker";
import type { DateRange } from "react-day-picker";

// <-- Add this import for date-fns helpers
import { startOfDay, endOfDay, isWithinInterval, isSameDay } from "date-fns";

type Devotions = Awaited<ReturnType<typeof getDevotions>>;

interface DevotionsTableProps {
  devotions: Devotions;
}

export default function DevotionTable({ devotions }: DevotionsTableProps) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const searchLower = search.toLowerCase();

  const filteredDevotions = devotions?.userDevotions?.filter((devotion) => {
    const devotionDate = new Date(devotion.date);
    let matchesDate = true;

    if (selectedDateRange?.from && selectedDateRange?.to) {
      const start = startOfDay(selectedDateRange.from);
      const end = endOfDay(selectedDateRange.to);
      matchesDate = isWithinInterval(devotionDate, { start, end });
    } else if (selectedDateRange?.from) {
      matchesDate = isSameDay(devotionDate, selectedDateRange.from);
    }

    return (
      matchesDate &&
      (selectedBook === "" || devotion.book === selectedBook) &&
      (selectedChapter === null || devotion.chapter === selectedChapter) &&
      (
        devotion.scripture.toLowerCase().includes(searchLower) ||
        devotion.book.toLowerCase().includes(searchLower) ||
        devotion.chapter.toString().includes(searchLower)
      )
    );
  });

  return (
    <div className="w-full">
      <div className="grid grid-cols-3 md:grid-cols-6 justify-between items-center gap-2 ">
        <Input
          type="search"
          placeholder="Search book, chapter, scripture..."
          className="order-2 md:order-1 col-span-3 rounded-2xl px-2 py-1 text-sm md:text-base border-border dark:border-muted-foreground"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="order-1 col-span-2 " />
        <CreateDevotionButton className="order-1 col-span-1 md:col-span-1" />
        <DateRangePicker
          className="order-2 md:order-3"
          selectedRange={selectedDateRange}
          onChange={setSelectedDateRange}
        />
        <BookCombobox
          className="order-2 md:order-3"
          selected={selectedBook}
          setSelected={(val) => setSelectedBook(val || "")}
        >
          Filter Book
        </BookCombobox>
        <ChapterCombobox
          className="order-2 md:order-3"
          book={selectedBook}
          selected={selectedChapter}
          setSelected={(val) => setSelectedChapter(val)}
        >
          Filter Chapter
        </ChapterCombobox>
      </div>

      <div className="mt-6 w-full border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Chapter</TableHead>
              <TableHead>Verse(s)</TableHead>
              <TableHead className="hidden md:table-cell">Scripture</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevotions?.map((devotion) => {
              const slugifiedName = devotion.book
                .toLowerCase()
                .replace(/\s+/g, "-");
              const slug = `${devotion.id}--${slugifiedName}`;
              const devotionUrl = `/devotions/${slug}`;

              return (
                <TableRow
                  key={devotion.id}
                  onClick={() => router.push(devotionUrl)}
                >
                  <TableCell>{devotion.date?.toLocaleDateString()}</TableCell>
                  <TableCell>{devotion.book}</TableCell>
                  <TableCell className="font-bold">
                    {devotion.chapter}
                  </TableCell>
                  <TableCell className="font-bold">
                    {devotion.fromVerse}
                    {devotion.toVerse && `-${devotion.toVerse}`}
                  </TableCell>
                  <TableCell>
                    {devotion.scripture.length > 25
                      ? devotion.scripture.slice(0, 25) + "…"
                      : devotion.scripture}
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex justify-end"
                      //e.stopPropagation to stop clicking the parent (because TableRow has onClick)
                      onClick={(e) => e.stopPropagation()}
                    >
                      <UpdateDevotionButton devotion={devotion} />
                      <DeleteDevotionButton devotion={devotion} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
