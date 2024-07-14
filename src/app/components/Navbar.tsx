"use client";
import React, { MouseEvent, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

interface NavLink {
  id: string;
  title: string;
}

interface NavbarProps {
  navLinks: NavLink[];
}

const Navbar = (props: NavbarProps) => {
  const { navLinks } = props;
  const [activeSection, setActiveSection] = useState<string>("home");

  const handleScroll = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();

    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="flex items-center right-14 left-14 fixed top-7 z-50">
      <div className="flex justify-between items center h-full w-full">
        <div className="space-x-4 flex items-center">
          <button
            className="flex items-center focus:outline-none"
            onClick={(e) => handleScroll(e, "home")}
          >
            <Image
              alt="logo"
              src={"https://placeholder.com/32x32"}
              width={32}
              height={32}
              className="rounded-full"
            />
            <h1 className="font-medium text-2xl ml-2.5">GymSync</h1>
          </button>
        </div>
        <div className="space-x-12 hidden md:flex md:justify-around md:items-center">
          {navLinks &&
            navLinks.map((nl) => (
              <div
                key={nl.id}
                // className="text-xl hover:text-gray-300"

                className={`text-xl p-2 text-white ${
                  activeSection === nl.id ? "border-b-2" : "hover:text-gray-300"
                }`}
              >
                <button
                  className="focus:outline-none px-2"
                  onClick={(e) => handleScroll(e, nl.id)}
                >
                  {nl.title}
                </button>
              </div>
            ))}
        </div>
        <div className="space-x-4">
          <Link
            href="/signin"
            className="border-2 bg-white text-black py-2 px-4 rounded-full hover:bg-gray-300"
          >
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
