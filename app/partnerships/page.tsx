"use client";

import collabData from "../data/PartnershipsData.json";

const CollaborationPage = () => {
  const { hero, makers, wholesale } = collabData;

  const handleWhatsapp = () => {
    const rawWhatsapp =
      process.env.NEXT_PUBLIC_WHATSAPP_URL || "https://wa.me/918240033522";
    const baseUrl = rawWhatsapp.split("?")[0];
    const message = encodeURIComponent(
      "Hi Mumburi! I'd love to discuss a collaboration.",
    );
    window.open(`${baseUrl}?text=${message}`, "_blank");
  };

  const handleEmail = () => {
    const rawEmail =
      process.env.NEXT_PUBLIC_EMAIL_ADDRESS || "hello@mumburi.com";
    const cleanEmail = rawEmail.replace(/^mailto:/, "");
    const subject = encodeURIComponent("Collaboration Inquiry - Mumburi");
    window.location.href = `mailto:${cleanEmail}?subject=${subject}`;
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF8F5] text-[#0f3d4c] px-6 py-12 md:px-16 md:py-24 font-sans space-y-24 md:space-y-36">
      {/* =========================================================================
          SECTION 1: HERO / INTRO ("Handcrafted with love")
          ========================================================================= */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        {/* Left Column Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left relative">
          {/* "One of a kind" Pill Tag */}
          <div className="inline-flex items-center gap-1.5 bg-[#d8ecbd] text-[#2d5016] text-xs font-semibold px-3 py-1 rounded-md shadow-sm mb-6 -rotate-2">
            <span>{hero.badge}</span>
          </div>

          {/* Heading */}
          <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f3d4c] leading-[1.15] mb-6">
            Handcrafted with love in my{" "}
            <span className="underline decoration-[#c27b5e] decoration-2 underline-offset-8">
              studio.
            </span>
          </h1>

          {/* Body Text */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-lg font-sans">
            {hero.subtitle}
          </p>

          {/* Home Page Hero Button Style (Matches Pic 2 Exactly) */}
          <button
            type="button"
            className="bg-[#101828] hover:bg-[#1f2937] text-white text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-7 py-3.5 rounded-md transition-all duration-300 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
          >
            {hero.buttonText?.replace("→", "").trim()}
          </button>
        </div>

        {/* Right Column Blob Image Placeholder */}
        <div className="w-full md:w-1/2 flex justify-center relative">
          {/* Organic Blob Frame */}
          <div className="relative w-full aspect-[4/3] max-w-md bg-[#eaddcf] rounded-[30%_70%_70%_30%/_30%_30%_70%_70%] shadow-inner border border-black/5 flex flex-col items-center justify-center text-gray-400 overflow-hidden">
            <div className="flex flex-col items-center gap-2 opacity-60 select-none text-center px-6">
              <svg
                className="w-12 h-12 text-[#968270]"
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
              <span className="text-xs uppercase tracking-widest font-semibold text-[#827060]">
                Studio Workspace (Photo Space)
              </span>
            </div>
          </div>

          {/* Est. 2024 Floating Badge */}
          <div className="absolute -bottom-4 left-1/3 bg-white/90 backdrop-blur-sm border border-gray-200/80 px-4 py-2 rounded-2xl shadow-sm text-xs font-serif text-[#a84c32] font-semibold">
            {hero.estTag}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 2: MAKERS & DREAMERS ("Let's grow together, friend")
          ========================================================================= */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        {/* Left Column Text */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left">
          <h2 className="font-serif text-2xl md:text-3xl text-[#0f3d4c] font-medium mb-6">
            {makers.heading}
          </h2>
          <p className="font-serif italic text-gray-700 text-base md:text-lg leading-relaxed max-w-lg">
            {makers.description}
          </p>
        </div>

        {/* Right Column Photo Collage + Sticky Note Placeholder */}
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <div className="relative w-full max-w-md flex gap-4 items-end">
            {/* Main Polaroid Frame Placeholder */}
            <div className="relative w-3/4 aspect-[3/4] bg-white p-3 rounded-2xl shadow-md border border-gray-100 flex flex-col items-center justify-center text-gray-400">
              <div className="w-full h-full bg-[#f2ebd9] rounded-xl flex flex-col items-center justify-center p-4 text-center">
                <svg
                  className="w-10 h-10 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                  Makers Space Image
                </span>
              </div>

              {/* Floating Orange Studio Sticky Note */}
              <div className="absolute -bottom-6 -left-6 bg-[#ffbc57] text-[#4a2e00] p-4 rounded-xl shadow-lg max-w-[170px] transform -rotate-3 border border-amber-300">
                <span className="block text-[0.65rem] font-bold tracking-widest uppercase mb-1">
                  {makers.studioNote}
                </span>
                <p className="text-xs font-sans leading-snug font-medium">
                  {makers.studioNoteText}
                </p>
              </div>
            </div>

            {/* Secondary Small Image Placeholder */}
            <div className="w-1/3 aspect-square bg-white p-2 rounded-xl shadow-md border border-gray-100">
              <div className="w-full h-full bg-[#e8e0d5] rounded-lg flex items-center justify-center">
                <span className="text-[0.65rem] text-gray-400 uppercase font-bold text-center">
                  Crafting Detail
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION 3: SMALL BUSINESS ALLIANCES ("Let's stock your shelves")
          ========================================================================= */}
      <section className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
        {/* Left Column Image Container with "15+ Global Friends" Badge */}
        <div className="w-full md:w-1/2 flex justify-center relative order-2 md:order-1">
          <div className="relative w-full aspect-[4/5] max-w-sm bg-white p-4 rounded-3xl shadow-md border border-gray-100 flex flex-col items-center justify-center">
            {/* Main Shelf Image Placeholder */}
            <div className="w-full h-full bg-[#eee7de] rounded-2xl flex flex-col items-center justify-center text-gray-400 p-6 text-center">
              <svg
                className="w-12 h-12 text-gray-400 mb-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
              <span className="text-xs uppercase tracking-widest font-semibold text-gray-500">
                Boutique Shelf Image
              </span>
            </div>

            {/* Orange Badge Top Right */}
            <div className="absolute -top-4 -right-2 bg-[#ffbc57] text-[#4a2e00] px-4 py-3 rounded-2xl shadow-md transform rotate-6 border border-amber-300 text-center">
              <span className="block text-sm font-bold leading-tight">15+</span>
              <span className="text-[0.65rem] font-medium leading-none block">
                Global Friends
              </span>
            </div>
          </div>
        </div>

        {/* Right Column Wholesale Details */}
        <div className="w-full md:w-1/2 flex flex-col items-start text-left order-1 md:order-2">
          {/* Category Label */}
          <span className="text-[0.7rem] font-bold tracking-[0.2em] text-[#827060] uppercase mb-3">
            {wholesale.sublabel}
          </span>

          {/* Heading */}
          <h2 className="font-serif text-3xl md:text-4xl text-[#0f3d4c] font-medium mb-4">
            {wholesale.title}
          </h2>

          {/* Paragraph */}
          <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-8 max-w-lg">
            {wholesale.description}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-6 w-full">
            {/* WhatsApp CTA */}
            <button
              type="button"
              onClick={handleWhatsapp}
              className="flex-1 sm:flex-none min-w-[200px] py-4 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
              {wholesale.whatsappText}
            </button>

            {/* Email CTA */}
            <button
              type="button"
              onClick={handleEmail}
              className="flex-1 sm:flex-none min-w-[200px] py-4 px-8 bg-white hover:bg-[#0f3d4c] text-[#0f3d4c] hover:text-white border border-[#0f3d4c]/20 font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <svg
                className="w-5 h-5 fill-none stroke-current"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              {wholesale.emailText}
            </button>
          </div>

          {/* Muted Sub-note */}
          <span className="text-[0.65rem] font-bold tracking-widest text-gray-400 uppercase">
            {wholesale.footerNote}
          </span>
        </div>
      </section>
    </main>
  );
};

export default CollaborationPage;
