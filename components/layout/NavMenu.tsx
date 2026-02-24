"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { ComponentProps } from "react";

interface NavMenuProps extends ComponentProps<typeof NavigationMenu> {
  onNavigate?: () => void;
}

export const NavMenu = ({ onNavigate, ...props }: NavMenuProps) => (
  <NavigationMenu {...props}>
    <NavigationMenuList className="space-x-0 data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-start data-[orientation=vertical]:justify-start">
      {[
        { href: "/", label: "Home" },
        { href: "/devotions", label: "Devotions" },
        { href: "/bible", label: "Bible" },
        { href: "/contact", label: "Contact" },
      ].map(({ href, label }) => (
        <NavigationMenuItem key={href}>
          <NavigationMenuLink
            asChild
            className="group inline-flex items-center justify-center h-9 w-max px-4 py-2 rounded-md
              text-sm font-medium border-2 border-transparent bg-transparent outline-none
              hover:bg-transparent active:bg-transparent data-[state=open]:bg-transparent
              hover:border-primary active:border-primary data-[state=open]:border-primary
              focus:bg-primary focus:text-background
              focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1
              disabled:pointer-events-none disabled:opacity-50
              transition-[color,box-shadow,border-color,background-color]"
            onClick={onNavigate} //CLOSE ON CLICK
          >
            <Link href={href}>{label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
