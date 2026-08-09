'use client';
import React from "react";

const SayHello = () => {
  const handleWhatsApp = () => {
    window.open("https://wa.me/1234567890", "_blank");
  };

  const handleEmail = () => {
    window.location.href = "mailto:hello@mumburi.com";
  };

  return (
    <section className="w-full bg-[#FAF8F5] py-16 px-4 flex flex-col items-center justify-center font-sans space-y-16">
      {/* =========================================================================
          TOP CONTAINER: SAY HELLO (UNEVEN ORGANIC BLOB SHAPE + YELLOW THEME)
          ========================================================================= */}
      <div
        className="
          relative w-full max-w-4xl 
          bg-[#F8F0DE] hover:bg-[#F5EBDA] transition-colors duration-500
          px-8 py-12 md:px-20 md:py-16 text-center 
          flex flex-col items-center justify-center 
          shadow-xs border border-[#EFE3CF]
          /* Uneven, organic asymmetrical border-radius */
          rounded-[50px_80px_60px_40px/40px_70px_50px_35px]
          md:rounded-[180px_240px_200px_140px/110px_150px_130px_100px]
        "
      >
        {/* Sparkle Icon Top Right */}
        <div className="absolute top-6 right-8 md:top-10 md:right-16 text-[#8A4325] opacity-85">
          <svg
            className="w-6 h-6 md:w-8 md:h-8"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" />
            <path d="M19 16L19.9 19.1L23 20L19.9 20.9L19 24L18.1 20.9L15 20L18.1 19.1L19 16Z" />
          </svg>
        </div>

        {/* Heading */}
        <h2 className="font-serif text-3xl md:text-5xl text-[#8A4325] font-semibold mb-4 tracking-tight">
          Say Hello
        </h2>

        {/* Subtitle */}
        <p className="text-gray-700 text-sm md:text-base max-w-lg leading-relaxed mb-8 font-sans font-normal">
          Are you a fellow maker or small shop owner? Drop us a line. We'd love
          to hear what you're working on and how we might support each other.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xs sm:max-w-none">
          {/* Chat on WhatsApp (Rust Brown Solid) */}
          <button
            type="button"
            onClick={handleWhatsApp}
            className="w-full sm:w-auto bg-[#8A4325] hover:bg-[#72351C] text-white text-xs md:text-sm font-semibold py-3.5 px-8 rounded-full transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm active:scale-95"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
            </svg>
            <span>Chat on WhatsApp</span>
          </button>

          {/* Email Me (Outlined) */}
          <button
            type="button"
            onClick={handleEmail}
            className="w-full sm:w-auto bg-transparent border border-[#8A4325] hover:bg-[#8A4325]/10 text-[#8A4325] text-xs md:text-sm font-semibold py-3.5 px-8 rounded-full transition-all duration-200 flex items-center justify-center gap-2.5 active:scale-95"
          >
            <svg
              className="w-4 h-4 stroke-current fill-none"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>Email Me</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          BOTTOM CONTAINER: STAY IN OUR CIRCLE (TAPED WARM CARD)
          ========================================================================= */}
      <div className="relative max-w-md w-full bg-[#FFFDF9] p-8 rounded-2xl shadow-md border border-[#EAE3D2] text-center transform -rotate-1 transition-transform duration-300 hover:rotate-0">
        {/* Yellow/Amber Masking Tape Effect */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-[#FFECB3]/80 border border-[#E8D190]/60 shadow-xs backdrop-blur-xs"></div>

        {/* Heading */}
        <h3 className="font-serif text-2xl md:text-3xl text-[#8A4325] font-semibold mb-2">
          Stay in our circle
        </h3>

        {/* Subtitle */}
        <p className="font-serif italic text-gray-600 text-xs md:text-sm leading-relaxed mb-8">
          A peek behind the loom and into the kiln. Join our daily journey.
        </p>

        {/* Social Links */}
        <div className="flex items-center justify-center gap-10">
          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-[#E5D2BA] bg-[#FAF3E5] flex items-center justify-center text-[#8A4325] shadow-xs group-hover:scale-110 group-hover:bg-[#FFBC57]/20 transition-all duration-200 mb-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>
            <span className="text-[0.65rem] font-bold tracking-widest text-[#8A4325] uppercase">
              Instagram
            </span>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center group cursor-pointer"
          >
            <div className="w-12 h-12 rounded-full border border-[#E5D2BA] bg-[#FAF3E5] flex items-center justify-center text-[#8A4325] shadow-xs group-hover:scale-110 group-hover:bg-[#FFBC57]/20 transition-all duration-200 mb-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                />
                <circle cx="9" cy="7" r="4" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M23 21v-2a4 4 0 00-3-3.87"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 3.13a4 4 0 010 7.75"
                />
              </svg>
            </div>
            <span className="text-[0.65rem] font-bold tracking-widest text-[#8A4325] uppercase">
              Facebook
            </span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default SayHello;
