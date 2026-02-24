import React from "react";
import Image from "next/image";
import { bookImagePaths, imagePaths } from "@/lib/paths";
import Link from "next/link";

interface BookImageProps {
  book: string;
  className?: string;
}

export default function BookImage({ book, className }: BookImageProps) {
  const bookData = bookImagePaths.find((item) => item.book === book);

  const imageSrc = bookData?.path || imagePaths.homeHero;

  return (
    <div className={`relative aspect-video w-[96%] lg:w-[96%] ${className}`}>
      {/* Shadow layer */}
      <div className="absolute inset-0 translate-x-3 -translate-y-3 rounded-xl bg-primary z-0" />

      {/* Image layer */}
      <Link
        href={imageSrc}
        title={"Image courtesy of freebibleimages.org"}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 rounded-xl overflow-hidden z-10"
      >
        <Image
          src={imageSrc}
          alt={imageSrc}
          className="object-fill sm:object-cover lg:object-fill"
          fill
        />
      </Link>
    </div>
  );
}
