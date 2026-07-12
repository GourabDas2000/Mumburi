import Image from "next/image";
import KamadoEarings from "../../public/KamadoEarings.png";
import Kamado from "../../public/Kamado.jpg";

const Featured = () => {
  return (
    <section className="flex w-full min-h-screen md:h-screen bg-[var(--bg-color)] overflow-hidden">
      {/* LEFT SIDE: Full Screen on Mobile / Left Half on Laptop */}
      <div className="w-full min-h-screen md:min-h-0 md:w-1/2 md:h-full bg-gradient-to-b from-[#fbfbfa] to-[#f4f4f2] md:bg-[var(--surface-card)] flex flex-col items-center justify-center p-6 md:p-16 transition-colors duration-500">
        {/* Product Image Container (Bigger on Mobile + Higher Scaling Hover Effect) */}
        <div className="relative w-full h-[60vh] max-w-[95%] md:h-[55%] md:max-w-md flex items-center justify-center group cursor-pointer transition-transform duration-500 ease-out hover:scale-105 md:hover:scale-[1.02]">
          {/* Ambient Glow Backing Layer on Hover */}
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 rounded-full blur-3xl transition-opacity duration-500 pointer-events-none" />

          {/* Product Image */}
          <div className="relative w-full h-full">
            <Image
              src={KamadoEarings}
              alt="Kamado Hanafuda Earrings"
              fill
              priority
              className="object-contain drop-shadow-[0_25px_40px_rgba(0,0,0,0.14)] md:drop-shadow-[0_25px_50px_rgba(0,0,0,0.08)]"
            />
          </div>
        </div>

        {/* Info Stack */}
        <div className="text-center mt-6 md:mt-8 flex flex-col gap-2">
          <h3 className="font-sans text-[1rem] md:text-[0.9rem] tracking-wide text-[var(--primary-color)] font-normal">
            Kamado Hanafuda Earrings
          </h3>
          <p className="font-serif italic text-[1.15rem] md:text-[1.05rem] text-[var(--accent-color)]">
            $100.00
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Completely Hidden on Mobile / Original Structure Restored on Laptop */}
      <div
        className="hidden md:block md:w-1/2 md:h-full relative md:bg-fixed md:bg-right md:bg-contain md:bg-no-repeat border-2 lg:bg-right"
        style={{ backgroundImage: `url(${Kamado.src})` }}
      >
        {/* Subtle overlay to ensure text contrast */}
        <div className="absolute inset-0 bg-[var(--primary-color)]/20" />

        {/* Centered Underlined Text Overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h2 className="text-white font-sans font-bold text-xl lg:text-2xl tracking-[0.25em] uppercase border-b-2 border-white pb-1.5 px-2">
            Kamado Collection
          </h2>
        </div>
      </div>
    </section>
  );
};

export default Featured;
