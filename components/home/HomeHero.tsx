import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, BookOpen, Pencil, Sparkles } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { stackServerApp } from "@/stack/server";
import { imagePaths } from "@/lib/paths";
import CreateDialog from "../CreateDialog";

export default async function HomeHero() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <section className="relative">
      <Image
        src={imagePaths.homeHero}
        alt="Hero"
        className="absolute -z-10 w-full h-full object-cover"
        fill
      />
      <div className="min-h-screen flex justify-center px-6 pt-[17.5vh]">
        <div className="text-center max-w-3xl">
          {!user ? (
            <Badge
              variant="secondary"
              className="rounded-full py-1 border-border"
              asChild
            >
              <Link href={app.signUp}>
                <Sparkles className="ml-1 size-4" /> Be a part of community of
                +100 users in
              </Link>
            </Badge>
          ) : (
            <Badge
              variant="secondary"
              className="rounded-full py-1 border-border"
              asChild
            >
              <Link href={app.signUp}>
                <Sparkles className="ml-1 size-4" /> Welcome back! Time to write
                in your
              </Link>
            </Badge>
          )}
          <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl md:leading-[1.2] font-semibold tracking-tighter">
            Devo✟ionly
          </h1>
          <p className="mt-6 md:text-lg text-foreground/80">
            Write, organize, and track your personal Bible devotions in one
            meaningful digital space, designed to help you reflect, stay
            consistent, and grow deeper in your daily walk with God.
          </p>
          <div className="mt-12 flex items-center justify-center gap-4">
            {!user ? (
              <Link href={app.signUp}>
                <Button size="lg" className="rounded-full text-base">
                  Get Started <ArrowUpRight className="size-5" />
                </Button>
              </Link>
            ) : (
              <CreateDialog />
            )}
            <Link href={app.signUp}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base shadow-none"
              >
                How to Devotion
                <BookOpen className="size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}
