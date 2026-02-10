import { ArrowUpRight, BookOpenText, Pencil } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { imagePaths } from "@/lib/paths";
import { stackServerApp } from "@/stack/server";
import {BottomGradient, TopGradient} from "../PageGradient";

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
      <div className="pb-32 text-center max-w-3xl">
        <Badge
          className="rounded-full px-4 py-1 border-primary bg-transparent
          hover:bg-primary dark:hover:bg-primary
          active:bg-primary dark:active:bg-primary
          transition-colors duration-500"
          asChild
        >
          {user ? (
            <Link
              href="/create"
              className="text-white hover:text-black active:text-black"
            >
              &quot;Ready to reflect? Start your devotion!&quot;
            </Link>
          ) : (
            <Link
              href={urls.signUp}
              className="text-white hover:text-black active:text-black"
            >
              &quot;Sign up to start your daily devotion!&quot;
            </Link>
          )}
        </Badge>
        <h1 className="mt-6 text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
          Welcome to Devo✟ionly
        </h1>
        <p className="mt-6 md:text-lg text-white/80">
          Write, organize, and track your personal Bible devotions in one
          meaningful digital space, designed to help you reflect, stay
          consistent, and grow deeper in your daily walk with God.
        </p>
        <div className=" mt-12 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-4">
          <Button
            size="lg"
            className="rounded-full text-base
            hover:bg-secondary dark:hover:bg-secondary
            active:bg-secondary dark:active:bg-secondary
            transition-colors duration-500"
          >
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
            className="rounded-full text-base shadow-none bg-muted/60
            hover:bg-muted dark:hover:bg-muted
            active:bg-muted dark:active:bg-muted
            transition-colors duration-500"
          >
            <Link href="/bible" className="flex items-center gap-2">
              <BookOpenText className="size-5" /> Read Bible
            </Link>
          </Button>
        </div>
      </div>
      <BottomGradient/>
    </div>
  );
}
