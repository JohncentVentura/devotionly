"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDevotions } from "@/actions/devotion.action";
import { ComboboxBook } from "./ComboboxBook";
import { Skeleton } from "./ui/skeleton";
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

export default function DevotionTable({ devotions }: DevotionsTableProps) {
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
    <>
      <div className="w-full">
        <div className="flex items-center justify-between py-4">
          <div className="relative max-w-sm w-full">
            <input
              className="pl-10"
              placeholder="Filter title..."
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
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Devotion ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Book</TableHead>
            <TableHead>Chapter</TableHead>
            <TableHead>Scripture</TableHead>
            <TableHead>Reflection</TableHead>
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
                <TableCell>{devotion.id}</TableCell>
                <TableCell>{devotion.title}</TableCell>
                <TableCell>{devotion.date?.toLocaleDateString()}</TableCell>
                <TableCell>{devotion.book}</TableCell>
                <TableCell className="font-bold">{devotion.chapter}</TableCell>
                <TableCell>{devotion.scripture}</TableCell>
                <TableCell>{devotion.reflection}</TableCell>

                <TableCell className="text-right">
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
    </>
  );
}
