import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/Mumburi_logo.png";
import "../globals.css";

const Navber = () => {
  return (
    <>
      {/* =========================================================================
          1. LAPTOP & TABLET HEADER (All elements inline up top)
          ========================================================================= */}
      <header className="hidden md:flex w-full px-8 lg:px-12 py-6 items-center justify-between border-b border-gray-100 bg-[var(--bg-color)]">
        {/* Branding Logo */}
        <Link
          href="/"
          className="font-serif font-bold text-[var(--accent-color)] tracking-wide whitespace-nowrap text-[clamp(1.35rem,2.5vw,1.75rem)]"
        >
          Mumburi
        </Link>

        {/* Full Navigation Menu (6 Items) */}
        <ul className="flex items-center justify-center flex-1 mx-4 lg:mx-8 font-sans font-medium uppercase tracking-[0.15em] text-[var(--nav-text-color)] text-[clamp(0.7rem,1.1vw,0.8125rem)] gap-[clamp(1rem,2vw,1.5rem)]">
          <li className="transition-all duration-300 ease-in-out cursor-pointer hover:text-[var(--primary-color)]">
            <Link href="/">Home</Link>
          </li>
          <li className="transition-all duration-300 ease-in-out cursor-pointer text-[var(--accent-color)] border-b border-[var(--accent-color)] pb-1">
            <Link href="/stack">Our Stack</Link>
          </li>
          <li className="transition-all duration-300 ease-in-out cursor-pointer hover:text-[var(--primary-color)]">
            <Link href="/story">Our Story</Link>
          </li>
          <li className="transition-all duration-300 ease-in-out cursor-pointer hover:text-[var(--primary-color)]">
            <Link href="/craft">Our Craft</Link>
          </li>
          <li className="transition-all duration-300 ease-in-out cursor-pointer hover:text-[var(--primary-color)]">
            <Link href="/stories">Stories</Link>
          </li>
          <li className="transition-all duration-300 ease-in-out cursor-pointer hover:text-[var(--primary-color)]">
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>

        {/* Action Order Button */}
        <Link
          href="/order"
          className="font-sans font-medium tracking-[0.15em] uppercase text-[var(--nav-text-color)] hover:text-[var(--primary-color)] transition-colors flex items-center gap-2 whitespace-nowrap text-[clamp(0.7rem,1.1vw,0.8125rem)]"
        >
          <svg
            className="w-4 h-4"
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
        </Link>
      </header>

      {/* =========================================================================
          2. MOBILE TOP BAR (Logo Left + Order Right Up Top)
          ========================================================================= */}
      <header className="md:hidden w-full px-6 py-4 flex items-center justify-between border-b border-gray-100 bg-[var(--bg-color)]">
        <Link
          href="/"
          className="inline-flex items-center text-[clamp(1.2rem,5vw,1.4rem)]"
        >
          {/* Circular wrapper container for the logo asset */}
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
          className="font-sans font-medium tracking-[0.12em] uppercase text-[var(--nav-text-color)] hover:text-[var(--primary-color)] transition-colors flex items-center gap-1.5 text-[clamp(0.7rem,3.5vw,0.78rem)]"
        >
          <svg
            className="w-3.5 h-3.5"
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
        </Link>
      </header>

      {/* =========================================================================
          3. MOBILE FIXED BOTTOM MENU (4 Links Safe Bottom Navigation Row)
          ========================================================================= */}
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-[var(--bg-color)]/95 backdrop-blur-md border-t border-gray-100 py-4 px-6 z-50 shadow-lg pb-safe">
        <ul className="flex flex-nowrap justify-between items-center font-sans font-medium tracking-[0.12em] text-[var(--nav-text-color)] uppercase text-[clamp(0.68rem,3.2vw,0.75rem)]">
          <li className="transition-colors duration-200 cursor-pointer hover:text-[var(--primary-color)]">
            <Link href="/">Home</Link>
          </li>
          <li className="transition-colors duration-200 cursor-pointer text-[var(--accent-color)] border-b border-[var(--accent-color)] pb-0.5">
            <Link href="/stack">Our Stack</Link>
          </li>
          <li className="transition-colors duration-200 cursor-pointer hover:text-[var(--primary-color)]">
            <Link href="/craft">Our Craft</Link>
          </li>
          <li className="transition-colors duration-200 cursor-pointer hover:text-[var(--primary-color)]">
            <Link href="/contact">Contact</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navber;
