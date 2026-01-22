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
import { startOfDay, endOfDay, isWithinInterval, isSameDay } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

type Devotions = Awaited<ReturnType<typeof getDevotions>>;

interface DevotionsTableProps {
  devotions: Devotions;
}

export default function DevotionTable({ devotions }: DevotionsTableProps) {
  type SortKey = "date" | "citation" | null;
  type SortOrder = "asc" | "desc";
  const [sortKey, setSortKey] = useState<SortKey>("date");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");

  const router = useRouter();
  const [search, setSearch] = useState("");
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const searchLower = search.toLowerCase();

  const filteredDevotions = devotions?.filter((devotion) => {
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

  const sortedDevotions = [...(filteredDevotions ?? [])].sort((a, b) => {
    if (!sortKey) return 0;

    let compareValue = 0;

    if (sortKey === "date") {
      compareValue =
        new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    if (sortKey === "citation") {
      const citationA = `${a.book} ${a.chapter}:${a.fromVerse}`;
      const citationB = `${b.book} ${b.chapter}:${b.fromVerse}`;
      compareValue = citationA.localeCompare(citationB);
    }

    return sortOrder === "asc" ? compareValue : -compareValue;
  });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // toggle same column
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // switch column → reset old, new starts asc
      setSortKey(key);
      setSortOrder("asc");
    }
  };


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
              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("date")}
              >
                Date {sortKey === "date" ? (sortOrder === "asc" ? "↑" : "↓") : "↓"}
              </TableHead>


              <TableHead
                className="cursor-pointer select-none"
                onClick={() => handleSort("citation")}
              >
                Citation {sortKey === "citation" ? (sortOrder === "asc" ? "↑" : "↓") : "↓"}
              </TableHead>


              <TableHead>Scripture</TableHead>
              <TableHead>{/*Menu*/}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedDevotions?.map((devotion) => {
              const slugifiedName = devotion.book
                .toLowerCase()
                .replace(/\s+/g, "-");
              const slug = `${devotion.id}--${slugifiedName}`;
              const devotionUrl = `/devotions/${slug}`;

              return (
                <TableRow
                  key={devotion.id}
                  className="cursor-pointer hover:bg-primary"
                  onClick={() => router.push(devotionUrl)}
                >
                  <TableCell>{devotion.date
                    ? devotion.date.toLocaleDateString("en-US", {
                      month: "numeric",
                      day: "numeric",
                      year: "2-digit",
                    })
                    : ""}</TableCell>
                  <TableCell>
                    {devotion.book} {devotion.chapter}:
                    {devotion.fromVerse}
                    {devotion.fromVerse !== devotion.toVerse && `-${devotion.toVerse}`}
                  </TableCell>
                  <TableCell>
                    {devotion.scripture.length > 25
                      ? devotion.scripture.slice(0, 25) + "…"
                      : devotion.scripture}
                  </TableCell>
                  <TableCell>
                    <div
                      className="flex "
                    //e.stopPropagation to stop clicking the parent (because TableRow has onClick)
                    //onClick={(e) => e.stopPropagation()}
                    >
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <UpdateDevotionButton devotion={devotion} className="w-full" >Edit</UpdateDevotionButton>
                          <DeleteDevotionButton devotion={devotion} >Delete</DeleteDevotionButton>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
