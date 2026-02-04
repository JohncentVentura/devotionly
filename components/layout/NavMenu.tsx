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
            className={navigationMenuTriggerStyle()}
            onClick={onNavigate} // ⭐ CLOSE ON CLICK
          >
            <Link href={href}>{label}</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
      ))}
    </NavigationMenuList>
  </NavigationMenu>
);
