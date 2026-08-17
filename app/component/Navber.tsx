"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "../../public/Mumburi_logo.png";
import "../globals.css";
import { useStack } from "../context/StackContext";

const Navbar = () => {
  const pathname = usePathname();
  const { totalCount } = useStack();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Dynamic environment variable overrides with fallback URLs
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://wa.me/918240033522?text=Hello!";

  const rawEmail =
    process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "contact@mumburi.com";

  const emailUrl = rawEmail.startsWith("mailto:")
    ? rawEmail
    : `mailto:${rawEmail}`;

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Stack", href: "/stack" },
    { name: "Our Craft", href: "/craft" },
    { name: "Bespoke", href: "/bespoke" },
    { name: "Partnerships", href: "/partnerships" },
  ];

  const isActive = (path = "") => pathname === path;

  return (
    <>
      {/* 1. LAPTOP & TABLET HEADER */}
      <header className="sticky top-0 z-50 hidden md:flex w-full px-8 lg:px-12 py-6 items-center justify-between border-b border-gray-100 bg-[var(--bg-color)]">
        <Link
          href="/"
          className="font-serif font-bold text-[var(--accent-color)] tracking-wide whitespace-nowrap text-[clamp(1.35rem,2.5vw,1.75rem)]"
        >
          Mumburi
        </Link>

        <ul className="flex items-center justify-center flex-1 mx-4 lg:mx-8 font-sans font-medium uppercase tracking-[0.15em] text-[var(--nav-text-color)] text-[clamp(0.7rem,1.1vw,0.8125rem)] gap-[clamp(1rem,2vw,1.5rem)]">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <li
                key={link.href}
                className={`transition-all duration-300 ease-in-out cursor-pointer ${
                  active
                    ? "text-[var(--accent-color)] border-b border-[var(--accent-color)] pb-1"
                    : "hover:text-[var(--primary-color)]"
                }`}
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4 lg:gap-6">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#10D864] hover:bg-[#0ebf58] text-white font-sans font-bold text-[clamp(0.65rem,0.9vw,0.75rem)] uppercase tracking-[0.12em] px-3.5 py-2 flex items-center gap-1.5 transition-all duration-200 shadow-xs hover:shadow-md cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            WHATSAPP
          </a>

          <a
            href={emailUrl}
            className="font-sans font-semibold tracking-[0.15em] uppercase text-[var(--nav-text-color)] hover:text-[var(--primary-color)] transition-colors text-[clamp(0.68rem,1vw,0.78rem)] whitespace-nowrap cursor-pointer"
          >
            EMAIL ME
          </a>

          <Link
            href="/order"
            className="relative p-1 text-[var(--nav-text-color)] hover:text-[var(--primary-color)] transition-colors flex items-center"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
            {isMounted && totalCount > 0 && (
              <span className="absolute top-1.5 -right-2 bg-[#8C4327] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none shadow-xs">
                {totalCount}
              </span>
            )}
          </Link>
        </div>
      </header>

      {/* 2. MOBILE TOP BAR */}
      <header className="sticky top-0 z-50 md:hidden w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-[var(--bg-color)]">
        <Link
          href="/"
          className="inline-flex items-center text-[clamp(1.2rem,5vw,1.4rem)]"
        >
          <div className="relative h-[2.2em] w-[2.2em] rounded-full overflow-hidden border border-gray-100 shadow-sm">
            <Image
              src={Logo}
              alt="Mumburi Logo"
              fill
              priority
              sizes="40px"
              className="object-cover"
            />
          </div>
        </Link>

        <Link
          href="/order"
          className="relative p-1 text-[var(--nav-text-color)] flex items-center"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          {isMounted && totalCount > 0 && (
            <span className="absolute -top-1 -right-1.5 bg-[#8C4327] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
              {totalCount}
            </span>
          )}
        </Link>
      </header>

      {/* 3. MOBILE FIXED BOTTOM MENU */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--bg-color)]/95 backdrop-blur-md border-t border-gray-100 py-3 px-3 z-40 shadow-lg">
        <ul className="flex items-center justify-around font-sans font-medium tracking-wider text-[var(--nav-text-color)] uppercase text-[clamp(0.6rem,2.5vw,0.7rem)] gap-1">
          {navLinks.map((link) => {
            const active = isActive(link.href);

            return (
              <li
                key={link.href}
                className={`transition-colors duration-200 cursor-pointer whitespace-nowrap ${
                  active
                    ? "text-[var(--accent-color)] border-b border-[var(--accent-color)] pb-0.5"
                    : "hover:text-[var(--primary-color)]"
                }`}
              >
                <Link href={link.href}>{link.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
