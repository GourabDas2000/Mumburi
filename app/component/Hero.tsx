import Image from "next/image";
import DesktopBackgroundHome from "../../public/DesktopBackgroundHome.png";
import MobileBackgroundHome from "../../public/MobileBackgroundHome.png";

export default function Hero() {
  return (
    <>
      <div className="flex flex-col w-full">
        {/* --- SECTION 1: MAIN HERO VISUAL --- */}
        <section className="relative w-full min-h-[85vh] md:min-h-[75vh] flex items-center overflow-hidden">
          {/* 1.1 DESKTOP & TABLET BACKGROUND */}
          <div className="hidden md:block absolute inset-0 z-0">
            <Image
              src={DesktopBackgroundHome}
              alt="Artisanal craft workspace"
              fill
              priority
              placeholder="blur"
              className="object-cover object-center"
            />
            {/* Contrast Lock Overlay for Desktop */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/35 to-transparent" />
          </div>

          {/* 1.2 MOBILE BACKGROUND (With Bottom Gradient Fade) */}
          <div className="block md:hidden absolute inset-0 z-0">
            <Image
              src={MobileBackgroundHome}
              alt="Artisanal craft workspace"
              fill
              priority
              placeholder="blur"
              className="object-cover object-center"
            />
            {/* Fades to white at the bottom for mobile */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
          </div>

          {/* 1.3 HERO CONTENT CONTAINER */}
          <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 pt-12 pb-20 md:py-24">
            {/* Mobile Text (Visible on Small Screens only) */}
            <div className="flex md:hidden flex-col items-center text-center max-w-sm mx-auto mt-20">
              <h1 className="font-serif font-extrabold text-[clamp(2.2rem,8vw,3rem)] leading-tight text-[#111827] mb-4 drop-shadow-md">
                Crafted by Hand,
                <br />
                Curated for You
              </h1>
              <p className="font-sans font-medium text-[clamp(0.95rem,3.8vw,1.05rem)] leading-relaxed text-[#1f2937] mb-8 tracking-wide drop-shadow-sm">
                Explore a collection where every piece tells a story of
                tradition, patience, and the touch of a master artisan.
              </p>
              <div className="w-full flex flex-col gap-3.5">
                <button className="w-full py-4 px-6 rounded bg-[#b48845] text-white font-sans text-[0.85rem] font-bold uppercase tracking-[0.15em] shadow-lg active:scale-[0.98]">
                  Shop Collections
                </button>
                <button className="w-full py-4 px-6 rounded border border-[#111827] text-[#111827] font-sans text-[0.85rem] font-bold uppercase tracking-[0.15em]">
                  Meet the Makers
                </button>
              </div>
            </div>

            {/* Desktop Text (Visible on Laptop/Tab only) */}
            <div className="hidden md:flex flex-col items-start text-left max-w-xl lg:max-w-2xl">
              <span className="font-sans text-[0.7rem] font-bold uppercase tracking-[0.2em] text-white mb-4 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-sm border border-white/20">
                Locally Crafted & Sustainably Sourced
              </span>
              <h1 className="font-serif font-bold text-[clamp(2.5rem,4.5vw,4rem)] leading-[1.15] text-white mb-6 tracking-tight drop-shadow-lg">
                Crafted by Hand,
                <br />
                Curated for You
              </h1>
              <p className="font-sans font-normal text-[clamp(1rem,1.2vw,1.1rem)] leading-relaxed text-white mb-10 max-w-lg tracking-wide drop-shadow-md">
                Discover a collection of artisanal treasures that celebrate the
                slow-living spirit. Each piece tells a unique story of heritage
                and heart.
              </p>
              <button className="py-4 px-8 bg-[#111827] text-white font-sans text-[0.85rem] font-bold uppercase tracking-[0.2em] rounded shadow-xl hover:bg-[#2d3748] transition-all">
                Explore Collection
              </button>
            </div>
          </div>
        </section>

        {/* --- SECTION 2: PHILOSOPHY (Visible on Tablet/Laptop only) --- */}
        <div className="hidden md:flex w-full bg-[#F9F9F9] py-24 px-6 flex-col items-center text-center">
          {/* Decorative Star Icon */}
          <div className="text-[#b48845] mb-8">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </div>

          {/* Philosophy Quote */}
          <blockquote className="max-w-4xl font-serif italic text-[clamp(1.6rem,2.8vw,2.4rem)] leading-snug text-[#111827] mb-8">
            "The beauty of the handmade lies in the imperfections that tell the
            story of the artisan's hands."
          </blockquote>

          {/* Bottom Label */}
          <span className="font-sans font-bold text-[0.7rem] uppercase tracking-[0.35em] text-[#9CA3AF]">
            The Mumburi Philosophy
          </span>
        </div>
      </div>
    </>
  );
}
