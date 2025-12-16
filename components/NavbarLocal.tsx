import { BookOpenText, Church, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { getUserDetails } from "@/actions/user.action";
import { Button } from "@/components/ui/button";
import { stackServerApp } from "@/stack/server";
import { UserButton } from "@stackframe/stack";
import { ModeToggle } from "./ModeToggle";

export default async function NavbarLocal() {
  const user = await stackServerApp.getUser();
  const app = stackServerApp.urls;
  const userProfile = await getUserDetails(user?.id);

  return (
    <div className="sticky top-0 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center h-16 justify-between">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-primary font-mono tracking-wider"
            >
              Devo✟ionly
            </Link>
          </div>

          {/*Testing user*/}
          {userProfile?.name && (
            <span className="text-[14px] text-gray-600 dark:text-gray-300">
              {`Hello, ${userProfile?.name.split(" ")[0]}`}
            </span>
          )}

          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/">
                <Church className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
            <Button variant="ghost" className="flex items-center gap-2" asChild>
              <Link href="/devotions">
                <BookOpenText className="w-4 h-4" />
                <span className="hidden sm:inline">Devotions</span>
              </Link>
            </Button>
            <ModeToggle />
            {!user ? (
              <Button
                variant="ghost"
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
                <Button
                  variant="secondary"
                  className="flex items-center gap-2"
                  asChild
                >
                  <Link href={app.signOut}>
                    <LogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign out</span>
                  </Link>
                </Button>
                <UserButton />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
