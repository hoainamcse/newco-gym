'use client';

import React, { useContext } from 'react';

import { Toaster } from '@/components/ui/sonner';
import Nav from './_components/nav';
import { AppContext } from '@/context/App.context';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

function MainLayout({ children }: React.PropsWithChildren) {
  const { user, isLoading } = useContext(AppContext);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ReloadIcon className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen max-h-screen flex justify-center items-center">
        <Button asChild>
          <Link href="/signin">Login to access</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-screen">
      <Nav />
      <main style={{ height: 'calc(100dvh - 64px)' }}>{children}</main>
      <Toaster />
    </div>
  );
}

export default MainLayout;
