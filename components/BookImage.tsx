"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { bookImagePaths, imagePaths } from "@/lib/paths";

interface BookImageProps {
  book: string;
  className?: string;
}

export default function BookImage({ book, className }: BookImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  const bookData = bookImagePaths.find((item) => item.book === book);
  const imageSrc = bookData?.path || imagePaths.homeHero;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
  }, [imageSrc]);

  return (
    <div className={`relative aspect-video w-[96%] ${className}`}>
      {/* Shadow layer */}
      <div className="absolute inset-0 translate-x-3 -translate-y-3 rounded-xl bg-secondary z-0" />

      <Link
        href={imageSrc}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 rounded-xl overflow-hidden z-10"
      >
        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted">
            <div className="w-12 h-12 md:w-20 md:h-20 rounded-full border-4 border-primary border-t-transparent animate-spin" />
          </div>
        )}

        <Image
          src={imageSrc}
          alt={book}
          fill
          className={`object-fill sm:object-cover lg:object-fill transition-opacity duration-500 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
          onLoadingComplete={() => setIsLoading(false)}
        />
      </Link>
    </div>
  );
}