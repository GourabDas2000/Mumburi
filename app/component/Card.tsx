import React from "react";
import Link from "next/link";
import Image from "next/image";
import homeData from "../data/HomeData.json";

import ToteImg from "../../public/Totebag.png";
import JewelryImg from "../../public/Jewelery.png";
import CraftImg from "../../public/OurCraft.png";

const imageMap = {
  ToteImg,
  JewelryImg,
  CraftImg,
};

const Card = () => {
  const { title, description, viewAllText, viewAllHref, items } =
    homeData.collectionsSection;

  return (
    <section className="w-full px-4 py-12 md:px-16 md:py-16 bg-white">
      {/* HEADER BLOCK */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#111827] tracking-tight mb-3">
            {title}
          </h2>
          <p className="text-gray-600 max-w-xl text-sm md:text-base leading-relaxed">
            {description}
          </p>
        </div>
        <div>
          <Link
            href={viewAllHref}
            className="text-xs font-sans font-bold tracking-widest text-[#111827] uppercase border-b border-[#111827] pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors inline-block whitespace-nowrap"
          >
            {viewAllText}
          </Link>
        </div>
      </div>

      {/* ASYMMETRICAL BENTO GRID (12-COL DESKTOP) */}
      <div
        className="
          flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide
          md:grid md:grid-cols-12 md:gap-6 md:overflow-visible md:pb-0
        "
      >
        {items.map((item) => {
          const cardImage = item.imageKey ? imageMap[item.imageKey] : null;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`
                relative flex-shrink-0 w-[85vw] h-[280px] rounded-2xl overflow-hidden group snap-start transition-all duration-300
                md:w-auto md:flex-shrink-0 ${item.gridClass}
              `}
            >
              {/* Image or Placeholder Logic */}
              {item.isPlaceholder || !cardImage ? (
                <div className="w-full h-full bg-[#f4ebd0]/60 border-2 border-dashed border-[#d9a24a]/40 flex flex-col items-center justify-center p-6 text-center group-hover:bg-[#f4ebd0] transition-colors">
                  <div className="w-12 h-12 rounded-full bg-[#0f3d4c]/10 flex items-center justify-center mb-3 text-[#0f3d4c]">
                    <svg
                      className="w-6 h-6"
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
                  </div>
                  <span className="text-xs uppercase font-bold tracking-widest text-[#0f3d4c]/60">
                    {item.title} Image Space
                  </span>
                </div>
              ) : (
                <Image
                  src={cardImage}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 85vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              )}

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Floating Title Content */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <h3 className="font-serif text-xl md:text-2xl text-white font-medium tracking-wide">
                  {item.title}
                </h3>
                <span className="text-white opacity-0 transform -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm font-sans">
                  →
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Card;
