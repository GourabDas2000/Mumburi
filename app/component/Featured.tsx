import Image from "next/image";
import Link from "next/link";
import stackData from "../data/StackData.json";

const Featured = () => {
  // Dynamically retrieve the product where isFeatured is "Y"
  const featuredProduct =
    stackData.find((item) => item.isFeatured === "Y") || stackData[0];

  const currencySymbol = featuredProduct.currency === "INR" ? "₹" : "$";
  const formattedPrice = Number(featuredProduct.productPrice).toFixed(2);

  return (
    <section className="flex w-full min-h-screen md:h-screen bg-[var(--bg-color)] overflow-hidden">
      {/* LEFT SIDE: Full Screen on Mobile / Left Half on Laptop (Entire Card Clickable) */}
      <Link
        href={`/stack/${featuredProduct.id}`}
        className="group w-full min-h-screen md:min-h-0 md:w-1/2 md:h-full bg-gradient-to-b from-[#fbfbfa] to-[#f4f4f2] md:bg-[var(--surface-card)] flex flex-col items-center justify-center p-6 md:p-16 transition-colors duration-500 cursor-pointer"
      >
        {/* Product Image Container */}
        <div className="relative w-full h-[60vh] max-w-[95%] md:h-[55%] md:max-w-md flex items-center justify-center transition-transform duration-500 ease-out group-hover:scale-105 md:group-hover:scale-[1.02]">
          {/* Ambient Glow Backing Layer on Hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none" />

          {/* Product Image */}
          <div className="relative w-full h-full">
            <Image
              src={featuredProduct.cartImage}
              alt={featuredProduct.productName}
              fill
              priority
              className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.14)] md:drop-shadow-[0_25px_50px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>

        {/* Info Stack */}
        <div className="text-center mt-6 md:mt-8 flex flex-col gap-2">
          <h3 className="font-sans text-[1rem] md:text-[0.9rem] tracking-wide text-[var(--primary-color)] font-normal group-hover:text-[var(--accent-color)] transition-colors">
            {featuredProduct.productName}
          </h3>
          <p className="font-serif italic text-[1.15rem] md:text-[1.05rem] text-[var(--accent-color)]">
            {currencySymbol}
            {formattedPrice}
          </p>
        </div>
      </Link>

      {/* RIGHT SIDE: Restored Original Styling (bg-fixed, bg-right, bg-contain, bg-no-repeat) */}
      <div
        className="hidden md:block md:w-1/2 md:h-full relative bg-fixed bg-right bg-contain bg-no-repeat"
        style={{ backgroundImage: `url(${featuredProduct.coverPagePhoto})` }}
      >
        {/* Subtle overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-[var(--primary-color)]/20" />

        {/* Centered Underlined Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white font-sans font-bold text-xl lg:text-2xl tracking-[0.25em] uppercase border-b-2 border-white pb-1.5 px-2">
            {featuredProduct.coverPageTag}
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Featured;
