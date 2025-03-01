"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { SVGProps } from "react";
import { ThemeSwitcher } from "@/components/app-navbar/theme-switcher";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { NavMenuItemProps } from "@/types/types";

import { IconPackages } from "@tabler/icons-react";

const menuItems: NavMenuItemProps[] = [
  {
    label: "Home",
    href: "/",
  },
];

export default function NavBar() {


  const pagePath = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="#" className="flex items-center gap-2" prefetch={false}>
          <IconPackages />
          <p className="font-bold text-inherit">SnipLog</p>
          <span className="sr-only">SnipLog</span>
        </Link>
        <nav className="hidden items-center gap-6 text-xl font-medium md:flex">
          {menuItems.map((item, index) => {
            return (
              <Link
                href={item.href}
                key={index}
                className={`text-2xl ${
                  pagePath === item.href ? "font-bold" : "font-light"
                } underline-offset-4 hover:underline`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="flex items-center gap-4">

          <ThemeSwitcher />
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full md:hidden"
              >
                <MenuIcon className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="md:hidden"
              aria-describedby="mobile-navigation-menu"
            >
              <SheetTitle
                className="invisible"
                aria-labelledby="Mobile Navigation Menu"
              >
                Mobile Navigation Menu
              </SheetTitle>

            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
