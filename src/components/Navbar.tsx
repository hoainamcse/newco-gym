'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { MouseEvent, useContext, useEffect, useState } from 'react';
import { AppContext } from '@/context/App.context';
import { Skeleton } from './ui/skeleton';

interface NavLink {
  id: string;
  title: string;
}

interface NavbarProps {
  navLinks: NavLink[];
}

const Navbar = (props: NavbarProps) => {
  const { user, isLoading } = useContext(AppContext);

  const { navLinks } = props;
  const [activeSection, setActiveSection] = useState<string>('home');

  const handleScroll = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();

    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust as needed
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900 bg-opacity-70 backdrop-blur-md shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            className="flex items-center focus:outline-none"
            onClick={(e) => handleScroll(e, 'home')}
          >
            <Image
              alt="logo"
              src="/foxmail-icon.png"
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="font-medium text-xl ml-2.5 text-white hidden md:block">NewCo Gym</h1>
          </button>
        </div>
        <div className="hidden md:flex md:space-x-12">
          {navLinks &&
            navLinks.map((nl) => (
              <div
                key={nl.id}
                className={`text-xl p-2 text-white ${
                  activeSection === nl.id ? 'border-b-2 border-white' : 'hover:text-gray-300'
                }`}
              >
                <button className="focus:outline-none px-2" onClick={(e) => handleScroll(e, nl.id)}>
                  {nl.title}
                </button>
              </div>
            ))}
        </div>
        <div className="flex items-center space-x-4">
          {isLoading ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-10 w-10 rounded-full bg-white" />
              <Skeleton className="h-4 w-[160px] bg-white hidden md:block" />
            </div>
          ) : user ? (
            <div className="flex items-center font-medium text-white">
              <Image
                alt="user"
                src={user.picture}
                width={40}
                height={40}
                unoptimized={true}
                className="rounded-full"
                onClick={() => {}}
              />
              <span className="ml-2 hidden md:block">{user.name}</span>
            </div>
          ) : (
            <Link
              href="/signin"
              className="border-2 bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300 transition duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
