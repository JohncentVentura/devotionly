"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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
import { Input } from "@/components/ui/input";
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
import {
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ChevronRightIcon,
  ChevronLeftIcon,
  Search,
  BookPlus,
  BookMarked,
} from "lucide-react";
import { getNextBibleReference } from "@/app/api/bible/bibleAPI";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

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
  const searchLower = search.toLowerCase();
  const [selectedDateRange, setSelectedDateRange] = useState<
    DateRange | undefined
  >(undefined);
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const handleResumeDevotion = async () => {
    if (!devotions || devotions.length === 0) {
      router.push("/create");
      return;
    }

    // 1️⃣ Get latest devotion by date
    const latestDevotion = [...devotions].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    )[0];

    // 2️⃣ Calculate next verse
    const next = await getNextBibleReference(
      latestDevotion.book,
      latestDevotion.chapter,
      latestDevotion.toVerse,
    );

    // 3️⃣ Redirect to CreatePage with params
    router.push(
      `/create?book=${next.book}&chapter=${next.chapter}&fromVerse=${next.fromVerse}&toVerse=${next.toVerse}`,
    );
  };

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
      (devotion.scripture.toLowerCase().includes(searchLower) ||
        devotion.book.toLowerCase().includes(searchLower) ||
        devotion.chapter.toString().includes(searchLower))
    );
  });

  const sortedDevotions = [...(filteredDevotions ?? [])].sort((a, b) => {
    if (!sortKey) return 0;

    let compareValue = 0;

    if (sortKey === "date") {
      compareValue = new Date(a.date).getTime() - new Date(b.date).getTime();
    }

    if (sortKey === "citation") {
      const citationA = `${a.book} ${a.chapter}:${a.fromVerse}`;
      const citationB = `${b.book} ${b.chapter}:${b.fromVerse}`;
      compareValue = citationA.localeCompare(citationB);
    }

    return sortOrder === "asc" ? compareValue : -compareValue;
  });

  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [page, setPage] = useState(1);

  const TOTAL_ITEMS = sortedDevotions.length;
  const totalPages = Math.ceil(TOTAL_ITEMS / rowsPerPage);

  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  const paginatedDevotions = sortedDevotions.slice(startIndex, endIndex);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [page]);

  return (
    <div className="px-4 md:px-8 xl:px-28 w-full">
      <div className="grid grid-cols-6 md:grid-cols-18 items-center gap-2">
        <div className="col-span-4 md:col-span-9 flex flex-col lg:flex-row justify-start items-start lg:items-center gap-2 lg:gap-6">
          <h1 className="text-3xl md:text-4xl font-bold">
            Devotions Table
          </h1>
          {/* Desktop date */}
          <div className="text-sm text-muted-foreground">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
        <div className="hidden md:block md:col-span-1 lg:col-span-3" />
        <CreateDevotionButton className="col-span-1 md:col-span-4 lg:col-span-3
         flex items-center justify-center text-xs xl:text-sm gap-2">
          <span className="hidden md:block">New Devotion</span>
          <BookPlus className="h-8 w-8" />
        </CreateDevotionButton>
        <CreateDevotionButton
          variant="outline"
          className="col-span-1 md:col-span-4 lg:col-span-3
           flex items-center justify-center text-xs xl:text-sm gap-2 
          hover:bg-foreground hover:text-background hover:dark:bg-foreground hover:dark:text-background
          active:bg-foreground active:text-background active:dark:bg-foreground active:dark:text-background"
          onClick={handleResumeDevotion}
        >
          <span className="hidden md:block">Resume Devotion</span>
          <BookMarked className="h-8 w-8" />
        </CreateDevotionButton>

        <Separator className="my-2 col-span-6 md:col-span-18 flex h-8" />
        <div className="col-span-6 md:col-span-8 relative">
          <Search className="absolute right-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search book, chapter, scripture..."
            className="pl-8 rounded-2xl px-2 py-1 text-sm md:text-base border-border dark:border-muted-foreground"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DateRangePicker
          className="col-span-6 md:col-span-4"
          selectedRange={selectedDateRange}
          onChange={setSelectedDateRange}
        />
        <BookCombobox
          className="col-span-4 md:col-span-3 text-xs lg:text-base"
          selected={selectedBook}
          setSelected={(val) => setSelectedBook(val || "")}
          noneSelectedText="All"
        >
          Filter Book
        </BookCombobox>
        <ChapterCombobox
          className="col-span-2 md:col-span-3 text-xs lg:text-base"
          book={selectedBook}
          selected={selectedChapter}
          setSelected={(val) => setSelectedChapter(val)}
          noneSelectedText="All"
        >
          Filter Chapter
        </ChapterCombobox>
      </div>

      <div className="mt-6 w-full">
        <Table
          className="
          w-full table-fixed
          [&_tr]:border-foreground 
          [&_th]:border-foreground 
          [&_td]:border-foreground 
          dark:[&_tr]:border-foreground/20 
          dark:[&_th]:border-foreground/20 
          dark:[&_td]:border-foreground/20"
        >
          <TableHeader className="border-t border-foreground">
            <TableRow>
              <TableHead
                className="w-[20%] md:w-[10%] font-bold cursor-pointer select-none"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-1 justify-start">
                  <span>Date</span>
                  {sortKey === "date" ? (
                    sortOrder === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </TableHead>

              <TableHead
                className="w-[30%] sm:w-auto font-bold cursor-pointer select-none"
                onClick={() => handleSort("citation")}
              >
                <div className="flex items-center gap-1 justify-start">
                  <span>Passage</span>
                  {sortKey === "citation" ? (
                    sortOrder === "asc" ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </div>
              </TableHead>

              <TableHead className="w-[20%] sm:w-auto font-bold">
                Scripture
              </TableHead>
              <TableHead className="hidden md:table-cell font-bold">
                Observation
              </TableHead>
              <TableHead className="hidden lg:table-cell font-bold">
                Application
              </TableHead>
              <TableHead className="hidden xl:table-cell font-bold">
                Prayer
              </TableHead>
              <TableHead className="w-[20%] sm:w-auto text-right">
                {/*Menu*/}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedDevotions?.map((devotion) => {
              const slugifiedName = devotion.book
                .toLowerCase()
                .replace(/\s+/g, "-");
              const slug = `${devotion.id}--${slugifiedName}`;
              const devotionUrl = `/devotions/${slug}`;

              return (
                <TableRow key={devotion.id}>
                  <TableCell className="text-xs sm:text-sm font-semibold">
                    {devotion.date
                      ? devotion.date.toLocaleDateString("en-US", {
                          month: "numeric",
                          day: "numeric",
                          year: "2-digit",
                        })
                      : ""}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    {devotion.book} {devotion.chapter}:{devotion.fromVerse}
                    {devotion.fromVerse !== devotion.toVerse &&
                      `-${devotion.toVerse}`}
                  </TableCell>
                  <TableCell className="text-xs sm:text-sm">
                    {devotion.scripture.length > 12
                      ? devotion.scripture.slice(0, 12) + "…"
                      : devotion.scripture}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {devotion.observation.length > 12
                      ? devotion.observation.slice(0, 12) + "…"
                      : devotion.observation}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {devotion.application.length > 12
                      ? devotion.application.slice(0, 12) + "…"
                      : devotion.application}
                  </TableCell>
                  <TableCell className="hidden xl:table-cell">
                    {devotion.prayer.length > 12
                      ? devotion.prayer.slice(0, 12) + "…"
                      : devotion.prayer}
                  </TableCell>
                  <TableCell>
                    {/* Desktop (md+): show buttons */}
                    <div className="hidden md:flex justify-end gap-2">
                      <Button
                        className="cursor-pointer"
                        onClick={() => router.push(devotionUrl)}
                      >
                        View
                      </Button>
                      <UpdateDevotionButton
                        variant="secondary"
                        devotion={devotion}
                      >
                        Edit
                      </UpdateDevotionButton>
                      <DeleteDevotionButton devotion={devotion}>
                        Delete
                      </DeleteDevotionButton>
                    </div>
                    {/* Mobile: show dropdown */}
                    <div className="flex justify-end md:hidden">
                      <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                          <Button
                            className="
                            h-8 w-8 p-0
                            cursor-pointer
                            border
                            border-primary
                            bg-transparent
                            text-foreground
                            hover:text-muted
                            hover:bg-primary dark:hover:bg-primary
                            active:bg-primary dark:active:bg-primary
                            transition-colors duration-500"
                          >
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal />
                          </Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent
                          align="end"
                          sideOffset={4}
                          className="flex flex-col gap-2 p-2"
                        >
                          <Button
                            className="w-full"
                            onClick={() => router.push(devotionUrl)}
                          >
                            View
                          </Button>
                          <UpdateDevotionButton
                            variant="secondary"
                            className="w-full"
                            devotion={devotion}
                          >
                            Edit
                          </UpdateDevotionButton>
                          <DeleteDevotionButton devotion={devotion}>
                            Delete
                          </DeleteDevotionButton>
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

      <div className="mt-6 flex w-full items-center justify-between gap-2 ">
        <div className="flex items-center gap-2">
          <Label className="whitespace-nowrap text-xs md:text-sm">
            Rows per page:
          </Label>
          <Select
            onValueChange={(value) => {
              setRowsPerPage(+value);
              setPage(1); // reset to first page
            }}
            value={rowsPerPage.toString()}
          >
            <SelectTrigger className="cursor-pointer">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="20">20</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <span className="whitespace-nowrap  text-xs md:text-sm">
            Showing {startIndex + 1}-{Math.min(endIndex, TOTAL_ITEMS)} of{" "}
            {TOTAL_ITEMS}
          </span>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <Button
                  className="cursor-pointer"
                  aria-label="Go to previous page"
                  disabled={page === 1}
                  size="icon"
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button
                  className="cursor-pointer"
                  aria-label="Go to next page"
                  disabled={page === totalPages}
                  size="icon"
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
