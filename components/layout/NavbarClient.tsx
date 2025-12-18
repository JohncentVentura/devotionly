"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { NavMenu } from "@/components/layout/nav-menu";
import { NavigationSheet } from "@/components/layout/navigation-sheet";
import { Button } from "@/components/ui/button";
import { UserButton } from "@stackframe/stack";
import Logo from "../Logo";
import { ThemeToggle } from "../ThemeToggle";

interface NavbarClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  app: { signIn: string };
}

export default function NavbarClient({ user, app }: NavbarClientProps) {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  //Hide navbar on scroll down and show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(
        !(currentScrollY > lastScrollY.current && currentScrollY > 50)
      );
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`z-10 fixed top-3 md:top-6 inset-x-4 h-12 md:h-16 bg-background border max-w-(--breakpoint-xl) mx-auto rounded-full transition-transform duration-300
         ${showNavbar ? "translate-y-0" : "-translate-y-24"} `}
    >
      <div className="h-full flex items-center justify-between mx-auto px-6">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          {user ? (
            <UserButton />
          ) : (
            <Button variant="secondary" className="rounded-full" asChild>
              <Link href={app?.signIn || "/"}>Sign in</Link>
            </Button>
          )}

          <ThemeToggle />

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
}
