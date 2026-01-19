"use client";

import { Search } from "lucide-react";
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
import CreateDevotionButton from "@/components/CreateDevotionButton";
import UpdateDevotionButton from "@/components/UpdateDevotionButton";
import DeleteDevotionButton from "@/components/DeleteDevotionButton";
import { BookCombobox } from "@/components/BookCombobox";
import { ChapterCombobox } from "@/components/ChapterCombobox";

type Devotions = Awaited<ReturnType<typeof getDevotions>>;
type book = {
  value: string;
  label: string;
};
interface DevotionsTableProps {
  devotions: Devotions;
}

export default function DevotionTable({ devotions }: DevotionsTableProps) {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedBook, setSelectedBook] = useState<book | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);

  const router = useRouter();
  const filteredDevotions = devotions?.userDevotions?.filter((devotion) => {
  const devotionDate = devotion.date
    ? new Date(devotion.date).toISOString().split("T")[0]
    : "";

  return (
    (selectedDate === "" || devotionDate === selectedDate) &&
    (!selectedBook || devotion.book === selectedBook.value) &&
    (selectedChapter === null || devotion.chapter === selectedChapter)
  );
});


  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 justify-between items-center gap-2 ">
        <CreateDevotionButton />
        <input
          type="date" 
          className="border rounded-2xl px-2 py-1 w-fit text-sm md:text-base"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <BookCombobox
          selected={selectedBook}
          setSelected={(val) => setSelectedBook(val)}
        />
         <ChapterCombobox
          book={selectedBook}
          selected={selectedChapter}
          setSelected={(val) => setSelectedChapter(val)}
        />
      </div>
      <div className="w-full border rounded-md overflow-hidden">
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
