"use client";
import { useState } from "react";
import bespokeData from "../bespoke/bespokeData.json";

const BespokeJourney = () => {
  const { hero, dialogue, testimonial } = bespokeData;
  const [visionText, setVisionText] = useState("");

  // Arrow function to handle chip prompts
  const handleChipClick = (prompt) => {
    setVisionText((prevText) => {
      if (prevText.includes(prompt)) return prevText;
      return prevText ? `${prevText}\n${prompt}` : prompt;
    });
  };

  // Arrow function for email submission
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (!visionText) return;
    const subject = encodeURIComponent(
      "New Bespoke Commission Request - Mumburi",
    );
    const body = encodeURIComponent(visionText);
    window.location.href = `mailto:hello@mumburi.com?subject=${subject}&body=${body}`;
  };

  // Arrow function for WhatsApp submission
  const handleWhatsappSubmit = () => {
    if (!visionText) return;
    const message = encodeURIComponent(
      `Hi Mumburi team! I'd like to discuss a custom piece:\n\n${visionText}`,
    );
    window.open(`https://wa.me/1234567890?text=${message}`, "_blank");
  };

  return (
    <main className="w-full min-h-screen bg-[var(--bg-color,#FAF8F5)] text-[var(--primary-color,#111827)] px-6 py-12 md:px-16 md:py-20 font-sans">
      <div className="max-w-6xl mx-auto flex flex-col gap-16 md:gap-24">
        {/* ================= HERO SECTION ================= */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">
          {/* Left Text Column */}
          <div className="w-full md:w-1/2 flex flex-col items-start text-left">
            <h1 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-[#0f3d4c] leading-[1.15] mb-6">
              {hero.title}
            </h1>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 max-w-lg font-sans">
              {hero.subtitle}
            </p>
            {/* Golden Accent Line */}
            <div className="w-16 h-[3px] bg-[#d9a24a] rounded-full" />
          </div>

          {/* Right Image Container (Blank Placeholder) */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full aspect-[4/3] max-w-lg bg-[#eeebe5] rounded-2xl md:rounded-[2rem] border border-black/5 shadow-sm flex flex-col items-center justify-center text-gray-400 overflow-hidden group transition-all duration-300 hover:shadow-md">
              <div className="flex flex-col items-center gap-3 select-none opacity-60">
                <svg
                  className="w-12 h-12 text-gray-400"
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
                <span className="text-xs uppercase tracking-widest font-bold text-gray-500">
                  Artisan Studio Showcase (Image Space)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ================= FORM SECTION ("BEGIN THE DIALOGUE") ================= */}
        <section className="w-full bg-white/80 backdrop-blur-sm border border-gray-100 rounded-3xl p-6 md:p-12 shadow-[0_10px_40px_rgba(0,0,0,0.03)]">
          <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
            {/* Form Header */}
            <h2 className="font-serif text-2xl md:text-3xl text-[#0f3d4c] font-medium mb-3">
              {dialogue.title}
            </h2>
            <p className="text-gray-600 text-xs md:text-sm max-w-xl leading-relaxed mb-8">
              {dialogue.subtitle}
            </p>

            {/* Interactive Prompt Chips */}
            <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6">
              {dialogue.chips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => handleChipClick(chip.prompt)}
                  className="bg-[#faf6ee] hover:bg-[#f3ead8] text-[#0f3d4c] text-xs font-medium px-4 py-2 rounded-full border border-amber-200/60 transition-all duration-200 active:scale-95 cursor-pointer"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Vision Textarea Input */}
            <div className="w-full mb-8">
              <textarea
                rows={5}
                value={visionText}
                onChange={(e) => setVisionText(e.target.value)}
                placeholder={dialogue.placeholder}
                className="w-full p-4 md:p-5 bg-[#FAF8F5] border border-amber-200/50 rounded-2xl text-sm text-[#0f3d4c] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c] transition-all resize-y"
              />
            </div>

            {/* Action Buttons */}
            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
              {/* Send Via Email */}
              <button
                type="button"
                onClick={handleEmailSubmit}
                className="w-full sm:w-auto flex-1 max-w-xs cursor-pointer bg-[#0f3d4c] hover:bg-[#0a2a35] text-white text-xs tracking-wider font-bold uppercase py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                {dialogue.emailButton}
              </button>

              {/* Discuss Via WhatsApp */}
              <button
                type="button"
                onClick={handleWhatsappSubmit}
                className="w-full sm:w-auto flex-1 max-w-xs bg-[#FAF8F5] cursor-pointer hover:bg-[#f2efe9] text-[#0f3d4c] border border-amber-300 text-xs tracking-wider font-bold uppercase py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-4 h-4 text-emerald-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
                </svg>
                {dialogue.whatsappButton}
              </button>
            </div>

            {/* Testimonial Quote */}
            <div className="flex flex-col items-center gap-2 pt-6 border-t border-gray-100 w-full max-w-lg">
              <span className="text-amber-500 text-lg">🎖️</span>
              <p className="font-serif italic text-xs md:text-sm text-gray-600">
                {testimonial.quote}
              </p>
              <span className="text-[0.68rem] font-bold tracking-widest text-[#0f3d4c] uppercase">
                {testimonial.author}
              </span>
            </div>
          </div>
        </section>

        {/* ================= SOCIAL MEDIA SECTION ================= */}
        <div className="flex flex-col items-center justify-center text-center gap-4 py-6 border-t border-amber-200/40">
          <p className="text-xs font-sans font-bold tracking-widest text-[#0f3d4c]/70 uppercase">
            Follow Our Craft & Behind The Scenes
          </p>
          <div className="flex items-center justify-center gap-4">
            {/* Instagram Link */}
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full border border-amber-200/80 shadow-xs hover:border-[#0f3d4c] hover:bg-[#FAF8F5] transition-all duration-200 text-[#0f3d4c] text-xs font-semibold group"
            >
              <svg
                className="w-4 h-4 text-[#8A4325] group-hover:scale-110 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.75"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
              <span>Instagram</span>
            </a>

            {/* Facebook Link */}
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 px-5 py-2.5 bg-white rounded-full border border-amber-200/80 shadow-xs hover:border-[#0f3d4c] hover:bg-[#FAF8F5] transition-all duration-200 text-[#0f3d4c] text-xs font-semibold group"
            >
              <svg
                className="w-4 h-4 text-[#8A4325] group-hover:scale-110 transition-transform"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BespokeJourney;
