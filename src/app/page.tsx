'use client';

import Contact from '@/components/Contact';
import Features from '@/components/Features';
import Introduction from '@/components/Introduction';
import Navbar from '@/components/Navbar';
import Pricing from '@/components/Pricing';

const navLinks = [
  { id: 'features', title: 'Features' },
  { id: 'pricing', title: 'Pricing' },
  { id: 'contact', title: 'Contact' },
];

export default function Home() {
  return (
    <main className="bg-gradient-bg min-h-screen overflow-auto scroll-snap-y no-scrollbar">
      <Navbar navLinks={navLinks} />
      <section
        id="home"
        className="min-h-screen flex items-center justify-center snap-start py-16 px-4 md:py-24 md:px-8"
      >
        <Introduction />
      </section>
      <section
        id="features"
        className="min-h-screen flex items-center justify-center snap-start py-16 px-4 md:py-24 md:px-8"
      >
        <Features />
      </section>
      <section
        id="pricing"
        className="min-h-screen flex items-center justify-center snap-start py-16 px-4 md:py-24 md:px-8"
      >
        <Pricing />
      </section>
      <section
        id="contact"
        className="min-h-screen flex items-center justify-center snap-start py-16 px-4 md:py-24 md:px-8"
      >
        <Contact />
      </section>
    </main>
  );
}
