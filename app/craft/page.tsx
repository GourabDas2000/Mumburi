import React from "react";
import craftData from "../craft/craftData.json"; // Adjust the import path to match your folder structure

export default function OurCraft() {
  const { header, sections } = craftData;

  return (
    <main className="w-full min-h-screen bg-[var(--bg-color,#FAF8F5)] text-[var(--primary-color,#111827)] px-6 py-16 md:px-16 md:py-24">
      {/* HEADER SECTION */}
      <div className="max-w-3xl mx-auto text-center mb-20 md:mb-28">
        <h1 className="font-serif text-4xl md:text-5xl font-medium tracking-tight text-[#0f3d4c] mb-6">
          {header.title}
        </h1>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed max-w-xl mx-auto font-sans">
          {header.description}
        </p>
      </div>

      {/* CRAFT SECTIONS GRID */}
      <div className="max-w-6xl mx-auto flex flex-col gap-24 md:gap-32">
        {sections.map((item, index) => {
          const isImageLeft = item.imagePosition === "left";

          return (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-12 md:gap-16 ${
                isImageLeft ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* TEXT CONTENT */}
              <div className="w-full md:w-1/2 flex flex-col items-start gap-3">
                {/* Category Badge */}
                <span className="inline-block bg-[#fceecb] text-[#8a6316] text-[0.7rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm">
                  {item.badge}
                </span>

                {/* Section Title */}
                <h2 className="font-serif text-2xl md:text-3xl text-[#0f3d4c] font-medium mt-1">
                  {item.title}
                </h2>

                {/* Section Description */}
                <p className="text-gray-600 text-sm md:text-base leading-relaxed mt-2 font-sans">
                  {item.description}
                </p>
              </div>

              {/* IMAGE CONTAINER WITH OVERLAY STICKER */}
              <div className="w-full md:w-1/2 relative flex justify-center items-center">
                {/* Blank Organic Frame Container */}
                <div
                  style={{ borderRadius: item.borderRadius }}
                  className="relative w-full aspect-[4/3] max-w-md bg-[#eeebe5] border border-black/5 shadow-inner flex flex-col items-center justify-center text-gray-400 overflow-hidden group transition-all duration-300 hover:shadow-md"
                >
                  {/* Visual Placeholder Indicator */}
                  <div className="flex flex-col items-center gap-2 select-none opacity-60">
                    <svg
                      className="w-10 h-10 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs uppercase tracking-widest font-sans">
                      Image Placeholder
                    </span>
                  </div>
                </div>

                {/* STICKER NOTE (Positioned Over the Image Container) */}
                {item.fact && (
                  <div
                    className={`absolute z-20 max-w-[210px] p-4 bg-[#fbf9f4] border border-gray-200/80 shadow-[0_10px_25px_rgba(0,0,0,0.08)] rounded-sm rotate-[-2deg] transition-transform duration-300 hover:rotate-0 hover:scale-105 ${
                      isImageLeft
                        ? "-top-4 -right-2 md:top-6 md:-right-6"
                        : "-bottom-4 -left-2 md:bottom-6 md:-left-6"
                    }`}
                  >
                    <div className="flex items-start gap-2">
                      {item.factIcon && (
                        <span className="text-base leading-none">
                          {item.factIcon}
                        </span>
                      )}
                      <p className="font-sans text-[0.75rem] text-gray-700 leading-snug">
                        <strong className="font-bold text-gray-900">
                          {item.fact.split(":")[0]}:
                        </strong>
                        {item.fact.substring(item.fact.indexOf(":") + 1)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
