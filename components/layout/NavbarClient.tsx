"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { NavMenu } from "@/components/layout/NavMenu";
import { NavigationSheet } from "@/components/layout/NavigationSheet";
import { Button } from "@/components/ui/button";
import Logo from "@/components/Logo";
import ThemeToggleButton from "./ThemeToggleButton";
import { UserButton } from "@stackframe/stack";

interface NavbarClientProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  urls: { signIn: string };
}

const NavbarClient = ({ user, urls }: NavbarClientProps) => {
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);

  //Hide navbar on scroll down and show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(
        !(currentScrollY > lastScrollY.current && currentScrollY > 50),
      );
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`z-50 fixed top-6 inset-x-4 h-16 bg-background/50 backdrop-blur-sm 
      max-w-(--breakpoint-xl) mx-auto rounded-full border-primary border-[3px] 
      ${showNavbar ? "translate-y-0" : "-translate-y-24"}
      transition-transform duration-300`}
    >
      <div className="h-full flex items-center justify-between mx-auto px-4">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:block" />

        <div className="flex items-center gap-3">
          <ThemeToggleButton />

          {user ? (
            <UserButton/>
          ) : (
            <Button className="rounded-full" asChild>
              <Link href={urls?.signIn || "/"}>Sign in</Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;
