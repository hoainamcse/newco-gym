"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CircleUser, Menu, Package2, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useContext } from "react";
import { AppContext } from "@/context/App.context";

function Nav() {
  const { user } = useContext(AppContext);
  const pathname = usePathname();
  const path = ["/knowledge", "/mail", "/analytics", "/settings"];
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
          className="flex items-center gap-2 text-lg font-semibold md:text-base"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href={path[0]}
          className={`${
            pathname === path[0] ? "text-foreground" : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Knowledge Base
        </Link>
        <Link
          href={path[1]}
          className={`${
            pathname === path[1] ? "text-foreground" : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Email Automation
        </Link>
        <Link
          href={path[2]}
          className={`${
            pathname === path[2] ? "text-foreground" : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Analytics
        </Link>
        <Link
          href={path[3]}
          className={`${
            pathname === path[3] ? "text-foreground" : "text-muted-foreground"
          } transition-colors hover:text-foreground`}
        >
          Settings
        </Link>
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
            >
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href={path[0]}
              className={`${
                pathname === path[0] ? "" : "text-muted-foreground"
              } hover:text-foreground`}
            >
              Knowledge Base
            </Link>
            <Link
              href={path[1]}
              className={`${
                pathname === path[1] ? "" : "text-muted-foreground"
              } hover:text-foreground`}
            >
              Email Automation
            </Link>
            <Link
              href={path[2]}
              className={`${
                pathname === path[2] ? "" : "text-muted-foreground"
              } hover:text-foreground`}
            >
              Analytics
            </Link>
            <Link
              href={path[3]}
              className={`${
                pathname === path[3] ? "" : "text-muted-foreground"
              } hover:text-foreground`}
            >
              Settings
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              asChild
            >
              {/* <CircleUser className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span> */}
              <Avatar className="size-8">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Nav;
