import { ArrowUpRight, BookOpen, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { imagePaths } from "@/lib/paths";
import { stackServerApp } from "@/stack/server";

export default async function HomeHero() {
  const user = await stackServerApp.getUser();
  const urls = stackServerApp.urls;

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6">
      <Image
        src={imagePaths.homeHero}
        alt="Hero"
        className="absolute -z-10 object-cover"
        fill
      />
      <div className="text-center max-w-3xl">
        <Badge
          variant="outline"
          className="rounded-full py-1 border-border"
          asChild
        >
          {user ? (
            <Link href="/create"> Welcome back! Time to write in your...</Link>
          ) : (
            <Link href={urls.signUp}>
              Be a part of a community of +100 users in
            </Link>
          )}
        </Badge>
        <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
          Devo✟ionly
        </h1>
        <p className="mt-6 md:text-lg text-foreground/80">
          Write, organize, and track your personal Bible devotions in one
          meaningful digital space, designed to help you reflect, stay
          consistent, and grow deeper in your daily walk with God.
        </p>
        <div className="mt-12 flex items-center justify-center gap-4">
          <Button size="lg" className="rounded-full text-base">
            {user ? (
              <Link href="/create" className="flex items-center gap-2">
                Write Devotion <Pencil className="size-5" />
              </Link>
            ) : (
              <Link href={urls.signUp} className="flex items-center gap-2">
                Get Started <ArrowUpRight className="size-5" />
              </Link>
            )}
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base shadow-none"
          >
            <BookOpen className="size-5" /> Read Bible
          </Button>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
}
