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
            className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium 
            hover:bg-muted active:bg-muted focus:bg-primary focus:text-background
            disabled:pointer-events-none disabled:opacity-50 data-[state=open]:hover:bg-muted
            data-[state=open]:focus:bg-primary data-[state=open]:bg-muted focus-visible:ring-ring/50 outline-none 
            transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1"
            onClick={onNavigate} //CLOSE ON CLICK
          >
            <Link href={href}>{label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
