import React from 'react';

import { Toaster } from '@/components/ui/sonner';
import Nav from './_components/nav';

function MainLayout({ children }: React.PropsWithChildren) {
  return (
    <div className="h-screen flex flex-col">
      <Nav />
      <main className="flex-1 overflow-auto flex flex-col gap-4 md:gap-8">{children}</main>
      <Toaster />
    </div>
  );
}

export default MainLayout;
