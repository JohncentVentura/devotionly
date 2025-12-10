"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { Combobox } from "./ui/combo-box";
import { useState } from "react";

const devotions = [
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

export default function DevotionTable() {
  const [selectedBook, setSelectedBook] = useState("");

  return (
    <>
      <div className="w-full">
        <div className="flex items-center gap-2 py-4">
          <div className="relative max-w-sm w-full">
            <input className="pl-10" placeholder="Filter devotions..." />
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
          {devotions.map((devotion) => (
            <TableRow key={devotion.id}>
              <TableCell>{devotion.id}</TableCell>
              <TableCell>{devotion.date}</TableCell>
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
          ))}
        </TableBody>
      </Table>
    </>
  );
}
