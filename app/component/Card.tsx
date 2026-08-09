import React from "react";
import Link from "next/link";
import Image from "next/image";
import ToteImg from "../../public/Totebag.png";
import JewelryImg from "../../public/Jewelery.png";
import CraftImg from "../../public/OurCraft.png";

// Import your new images here once available:
// import DiyImg from "../../public/DiyKits.png";
// import CustomizedImg from "../../public/CustomizedKits.png";

const Card = () => {
  const collections = [
    // ================= ROW 1 (3 ELEMENTS) =================
    {
      title: "Tote Bags",
      href: "/stack",
      image: ToteImg,
      gridClass: "md:col-span-1 md:h-[260px]",
    },
    {
      title: "Jewelry",
      href: "/stack",
      image: JewelryImg,
      gridClass: "md:col-span-1 md:h-[260px]",
    },
    {
      title: "DIY Kits",
      href: "/stack",
      image: null, // Placeholder image space
      isPlaceholder: true,
      gridClass: "md:col-span-1 md:h-[260px]",
    },

    // ================= ROW 2 (2 ELEMENTS) =================
    {
      title: "Customized Kits",
      href: "/bespoke",
      image: null, // Placeholder image space
      isPlaceholder: true,
      gridClass: "md:col-span-1 md:h-[280px]", // Smaller box (1 column)
    },
    {
      title: "Our Craft",
      href: "/craft",
      image: CraftImg,
      gridClass: "md:col-span-2 md:h-[280px]", // Bigger box (2 columns)
    },
  ];

  return (
    <section className="w-full px-4 py-12 md:px-16 md:py-16 bg-white">
      {/* HEADER BLOCK */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
        <div>
          <h2 className="font-serif text-3xl md:text-4xl text-[#111827] tracking-tight mb-3">
            The Mumburi Collections
          </h2>
          <p className="text-gray-600 max-w-xl text-sm md:text-base leading-relaxed">
            Explore our curated categories, each featuring products made with
            traditional techniques and modern sensibilities.
          </p>
        </div>
        <div>
          <Link
            href="/stack"
            className="text-xs font-sans font-bold tracking-widest text-[#111827] uppercase border-b border-[#111827] pb-1 hover:text-gray-600 hover:border-gray-600 transition-colors inline-block whitespace-nowrap"
          >
            View All Products
          </Link>
        </div>
      </div>

      {/* CAROUSEL (MOBILE) / 2-ROW GRID (DESKTOP: 3 COLS) */}
      <div
        className="
          flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 scrollbar-hide
          md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0
        "
      >
        {collections.map((item, index) => (
          <Link
            key={index}
            href={item.href}
            className={`
              relative flex-shrink-0 w-[85vw] h-[280px] rounded-2xl overflow-hidden group snap-start transition-all duration-300
              md:w-auto md:flex-shrink ${item.gridClass}
            `}
          >
            {/* Image or Placeholder Logic */}
            {item.isPlaceholder || !item.image ? (
              /* Dedicated Placeholder Container for DIY Kits & Customized Kits */
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
              /* Standard Background Image */
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 85vw, (max-width: 1200px) 66vw, 33vw"
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
              <span className="text-white opacity-0 transform translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-sm font-sans">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Card;
