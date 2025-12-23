"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDevotions } from "@/actions/devotion.action";
import { ComboboxBook } from "./ComboboxBook";

import { Skeleton } from "./ui/skeleton";
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
import CreateDialogButton from "./CreateDialogButton";
import DeleteDialogButton from "./DeleteDialogButton";
import EditDialogButton from "./EditDialogButton";
import { ComboboxChapter } from "./ComboboxChapter";

type Devotions = Awaited<ReturnType<typeof getDevotions>>;

interface DevotionsTableProps {
  devotions: Devotions;
}

export default function DevotionTable({ devotions }: DevotionsTableProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState("");
  const [selectedChapter, setSelectedChapter] = useState<number>(0);

  const router = useRouter();
  const filteredDevotions = devotions?.userDevotions?.filter((devotion) => {
    const devotionDate = devotion.date
      ? new Date(devotion.date).toISOString().split("T")[0]
      : "";

    return (
      (selectedDate === "" || devotionDate === selectedDate) &&
      (selectedBook === "" || devotion.book === selectedBook) &&
      (selectedChapter === 0 || devotion.chapter === selectedChapter)
    );
  });

  /* if <input/> is using string
  const [searchTerm, setSearchTerm] = useState("");
  const filteredDevotions = devotions?.userDevotions?.filter(
    (devotion) =>
      devotion.date.toString().toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBook === "" || devotion.book === selectedBook)
  );
  */

  //Loading skeleton
  if (!devotions) {
    return (
      <div className="w-full space-y-4">
        <div className="flex items-center gap-2 py-4">
          <Skeleton className="h-10 w-full max-w-sm" />
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead>
                <Skeleton className="w-full h-4" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="w-full h-4" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell>
                  <Skeleton className="w-full h-4" />
                </TableCell>
                <TableCell className="text-right">
                  <Skeleton className="w-full h-4" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 justify-between items-center gap-2 ">
        <CreateDialogButton>
          <div className="text-sm md:text-base">Create Devotion</div>
        </CreateDialogButton>
        <input
          type="date"
          placeholder="Filter Date..."
          className="border rounded-2xl px-2 py-1 w-fit text-sm md:text-base"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <ComboboxBook
          value={selectedBook}
          onChange={(val) => setSelectedBook(val)}
        />
        <ComboboxChapter
          value={selectedChapter}
          onChange={(val) => setSelectedChapter(val)}
        />
      </div>

      <div className="mt-4 w-full bg-background/50 rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Chapter</TableHead>
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
                  <TableCell className="hidden md:table-cell">
                    {devotion.scripture}
                  </TableCell>

                  <TableCell>
                    <div
                      className="flex justify-end"
                      //e.stopPropagation to stop clicking the parent (because TableRow has onClick)
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EditDialogButton devotion={devotion} />
                      <DeleteDialogButton devotion={devotion} />
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
