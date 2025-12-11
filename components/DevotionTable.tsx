"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getDevotions } from "@/actions/devotion.action";
import { Combobox } from "./ui/combo-box";
import { Skeleton } from "./ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const localDevotions = [
  {
    id: "000001",
    date: "2026-01-01",
    book: "Genesis",
    chapter: 1,
    scripture: "In the beginning, God created the heavens and the earth.",
    reflection: "Reflect on the power of creation and new beginnings.",
  },
  {
    id: "000002",
    date: "2026-01-02",
    book: "Exodus",
    chapter: 2,
    scripture: "The Lord is my shepherd; I shall not want.",
    reflection: "Consider the guidance and provision of God in your life.",
  },
  {
    id: "000003",
    date: "2026-01-03",
    book: "Psalms",
    chapter: 3,
    scripture: "The Lord is my light and my salvation; whom shall I fear?",
    reflection: "Find courage in the presence of God during challenging times.",
  },
];

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
      devotion.book.toLowerCase().includes(searchTerm.toLowerCase()) &&
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
        <div className="flex items-center gap-2 py-4">
          <div className="relative max-w-sm w-full">
            <input
              className="pl-10"
              placeholder="Filter book..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute h-4 w-4 left-3 top-1/2 transform -translate-y-1/2" />
          </div>
          <Combobox
            value={selectedBook}
            onChange={(val) => setSelectedBook(val)}
          />
        </div>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Devotion ID</TableHead>
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
                <TableCell>{devotion.id}</TableCell>
                <TableCell>{devotion.date?.toLocaleDateString()}</TableCell>
                <TableCell>{devotion.book}</TableCell>
                <TableCell className="font-bold">{devotion.chapter}</TableCell>
                <TableCell>{devotion.scripture}</TableCell>
                <TableCell>{devotion.reflection}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end space-x-4">
                    <h1>Edit</h1>
                    <h1>Delete</h1>
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
