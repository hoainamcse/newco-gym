'use client';

import Contact from '@/components/Contact';
import Features from '@/components/Features';
import Introduction from '@/components/Introduction';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';
import { AppProvider } from '@/context/App.context';

const navLinks = [
  {
    id: 'features',
    title: 'Features',
  },
  {
    id: 'pricing',
    title: 'Pricing',
  },
  {
    id: 'contact',
    title: 'Contact',
  },
];

export default function Home() {
  return (
    <AppProvider>
      <main className="bg-gradient-bg h-screen overflow-auto scroll-snap-y no-scrollbar">
        <Navbar navLinks={navLinks} />
        <section id="home" className="h-full flex items-center justify-center snap-start">
          <Introduction />
        </section>
        <section id="features" className="h-full flex items-center justify-center snap-start">
          <Features />
        </section>
        <section id="pricing" className="h-full flex items-center justify-center snap-start">
          <Pricing />
        </section>
        <section id="contact" className="h-full flex items-center justify-center snap-start">
          <Contact />
        </section>
      </main>
    </AppProvider>
  );
}
