'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { BookKey, Cable, Mails, Menu, Package2, PlugZap, Search } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useContext } from 'react';
import { AppContext } from '@/context/App.context';
import { cn } from '@/lib/utils';

function Nav() {
  const { user, setUser } = useContext(AppContext);
  const pathname = usePathname();
  const router = useRouter();
  const path = ['/connectors', '/knowledge', '/mail'];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    window.location.href = '/';
  }

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link href="#" className="flex items-center gap-2 text-lg font-semibold md:text-base">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <Link
          href={path[0]}
          className={cn(
            pathname === path[0] ? 'text-foreground' : 'text-muted-foreground',
            'transition-colors hover:text-foreground flex gap-2 items-center'
          )}
        >
          <Cable className="size-5" /> Connectors
        </Link>
        <Link
          href={path[1]}
          className={cn(
            pathname === path[1] ? 'text-foreground' : 'text-muted-foreground',
            'transition-colors hover:text-foreground flex gap-2 items-center'
          )}
        >
          <BookKey className="size-5" /> Knowledge Base
        </Link>
        <Link
          href={path[2]}
          className={cn(
            pathname === path[2] ? 'text-foreground' : 'text-muted-foreground',
            'transition-colors hover:text-foreground flex gap-2 items-center'
          )}
        >
          <Mails className="size-5" /> Email Automation
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
            <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="sr-only">Acme Inc</span>
            </Link>
            <Link
              href={path[0]}
              className={cn(
                pathname !== path[0] && 'text-muted-foreground',
                'hover:text-foreground flex gap-2 items-center'
              )}
            >
              <Cable className="size-5" /> Connectors
            </Link>
            <Link
              href={path[1]}
              className={cn(
                pathname !== path[1] && 'text-muted-foreground',
                'hover:text-foreground flex gap-2 items-center'
              )}
            >
              <BookKey className="size-5" /> Knowledge Base
            </Link>
            <Link
              href={path[2]}
              className={cn(
                pathname !== path[2] && 'text-muted-foreground',
                'hover:text-foreground flex gap-2 items-center'
              )}
            >
              <Mails className="size-5" /> Email Automation
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex-1 flex items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          {/* <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div> */}
        </form>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user?.picture} alt="@shadcn" />
                <AvatarFallback>SC</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel className="font-normal">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">{user?.name}</p>
                <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {/* <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem> */}
              <DropdownMenuItem onClick={() => router.push('/settings')}>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              {/* <DropdownMenuItem>New Team</DropdownMenuItem> */}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default Nav;
