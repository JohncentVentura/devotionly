import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/nav-menu";
import { NavigationSheet } from "@/components/navigation-sheet";
import { SunIcon } from "lucide-react";
import Link from "next/link";
import { stackServerApp } from "@/stack/server";
import { BookOpenText, Church, LogIn, LogOut } from "lucide-react";
import { ModeToggle } from "./ModeToggle";
import { UserButton } from "@stackframe/stack";

const Navbar = async () => {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;

  return (
    <nav className="h-16 bg-background border-b">
      <div className="h-full flex items-center justify-between max-w-(--breakpoint-xl) mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-12">
          <Link
            href="/"
            className="text-xl font-bold text-primary font-mono tracking-wider"
          >
            Devo✟ionly
          </Link>

          {/* Desktop Menu */}
          <NavMenu className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="hidden sm:inline-flex">
            Sign In
          </Button>
          <Button>Sign Up</Button>

          {!user ? (
            <Button
              variant="secondary"
              className="flex items-center gap-2"
              asChild
            >
              <Link href={app.signIn}>
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Sign in</span>
              </Link>
            </Button>
          ) : (
            <>
              <Button className="flex items-center gap-2" asChild>
                <Link href={app.signOut}>
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Sign out</span>
                </Link>
              </Button>
              <UserButton />
            </>
          )}
          <Button size="icon" variant="outline">
            <SunIcon />
          </Button>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <NavigationSheet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
