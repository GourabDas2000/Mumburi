import React from "react";
import Link from "next/link";
import Image from "next/image";
import ToteImg from "../../public/Totebag.png";
import JewelryImg from "../../public/Jewelery.png";
import StoryImg from "../../public/story.png";
import CraftImg from "../../public/OurCraft.png";

const Card = () => {
  const collections = [
    {
      title: "Tote Bags",
      href: "/stack",
      image: ToteImg,
      gridClass: "md:col-span-2", // Wide landscape box on desktop
    },
    {
      title: "Jewelry",
      href: "/stack",
      image: JewelryImg,
      gridClass: "md:col-span-1", // Narrower box on desktop
    },
    {
      title: "Our Story",
      href: "/story",
      image: StoryImg,
      gridClass: "md:col-span-1", // Narrower box on desktop
    },
    {
      title: "Our Craft",
      href: "/craft",
      image: CraftImg,
      gridClass: "md:col-span-2", // Wide landscape box on desktop
    },
  ];

  return (
    <>
      <section className="w-full px-4 py-12 md:px-16 md:py-12 bg-white">
        {/* HEADER BLOCK */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
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

        {/* CAROUSEL (MOBILE) / FLAT LANDSCAPE GRID (LAPTOP) */}
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
                relative flex-shrink-0 w-[85vw] h-[280px] rounded-sm overflow-hidden group snap-start
                md:w-auto md:h-[250px] md:flex-shrink ${item.gridClass}
              `}
            >
              {/* Background Image */}
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-w-768px) 85vw, (max-w-1200px) 66vw, 33vw"
                className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Subtle bottom gradient shadow overlay for crisp text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

              {/* Floating Title Content */}
              <div className="absolute bottom-6 left-6 md:bottom-6 md:left-6">
                <h3 className="font-serif text-2xl md:text-2xl text-white font-medium tracking-wide">
                  {item.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Card;
