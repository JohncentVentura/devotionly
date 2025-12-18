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
import CreateDialog from "./CreateDialog";
import DeleteDialog from "./DeleteDialog";
import EditDialog from "./EditDialog";

type Devotions = Awaited<ReturnType<typeof getDevotions>>;

interface DevotionsTableProps {
  devotions: Devotions;
}

export default function TableWithPaginationDemo({
  devotions,
}: DevotionsTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBook, setSelectedBook] = useState("");
  const router = useRouter();
  const filteredDevotions = devotions?.userDevotions?.filter(
    (devotion) =>
      devotion.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (selectedBook === "" || devotion.book === selectedBook)
  );

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
      <div className="flex items-center justify-start gap-4 py-4">
        <div className="relative">
          <input
            className="pl-9 py-1 rounded-2xl"
            placeholder="Filter Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
        </div>
        <ComboboxBook
          value={selectedBook}
          onChange={(val) => setSelectedBook(val)}
        />
        <CreateDialog />
      </div>

      <div className="w-full bg-background/50 rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Book</TableHead>
              <TableHead>Chapter</TableHead>
              <TableHead>Scripture</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDevotions?.map((devotion) => {
              const slugifiedName = devotion.title
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
                  <TableCell>{devotion.title}</TableCell>
                  <TableCell>{devotion.book}</TableCell>
                  <TableCell className="font-bold">
                    {devotion.chapter}
                  </TableCell>
                  <TableCell>{devotion.scripture}</TableCell>

                  <TableCell>
                    <div
                      className="flex justify-end space-x-4"
                      //e.stopPropagation to stop clicking the parent (because TableRow has onClick)
                      onClick={(e) => e.stopPropagation()}
                    >
                      <EditDialog devotion={devotion} />
                      <DeleteDialog devotion={devotion} />
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
