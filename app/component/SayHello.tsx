"use client";

import homeData from "../data/HomeData.json";

interface SayHelloMain {
  title: string;
  description: string;
  whatsappButtonText: string;
  emailButtonText: string;
  whatsappUrl?: string;
  emailAddress?: string;
}

interface SocialLink {
  id: string;
  name: string;
  url: string;
}

interface SayHelloSocial {
  title: string;
  subtitle: string;
  links: SocialLink[];
}

interface SayHelloData {
  main: SayHelloMain;
  social: SayHelloSocial;
}

interface SayHelloProps {
  data?: SayHelloData;
}

const SayHello = ({
  data = homeData.sayHelloSection as SayHelloData,
}: SayHelloProps) => {
  const { main, social } = data;

  // Environment variable overrides with fallbacks
  const whatsappUrl =
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    main?.whatsappUrl ||
    "https://wa.me/918240033522?text=Hello!";

  const rawEmail =
    process.env.NEXT_PUBLIC_EMAIL_ADDRESS ||
    main?.emailAddress ||
    "somagnidhar@gmail.com";

  const emailUrl = rawEmail.startsWith("mailto:")
    ? rawEmail
    : `mailto:${rawEmail}`;

  const defaultInstaUrl =
    "https://www.instagram.com/mumburi.in?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";

  return (
    <section className="w-full bg-[#FAF8F5] py-16 px-4 flex flex-col items-center justify-center font-sans space-y-16">
      {/* Contact Card */}
      <div
        className="
          relative w-full max-w-4xl 
          bg-[#F8F0DE] hover:bg-[#F5EBDA] transition-colors duration-500
          px-8 py-12 md:px-20 md:py-16 text-center 
          flex flex-col items-center justify-center 
          shadow-xs border border-[#EFE3CF]
          rounded-[50px_80px_60px_40px/40px_70px_50px_35px]
          md:rounded-[180px_240px_200px_140px/110px_150px_130px_100px]
        "
      >
        {/* Sparkle Icon */}
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
          {main.title}
        </h2>

        {/* Subtitle / Description */}
        <p className="text-gray-700 text-sm md:text-base max-w-lg leading-relaxed mb-8 font-sans font-normal">
          {main.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 w-full max-w-xl">
          {/* WhatsApp Anchor */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none min-w-50 py-4 px-8 bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer text-center"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
            </svg>
            {main.whatsappButtonText}
          </a>

          {/* Email Anchor */}
          <a
            href={emailUrl}
            className="flex-1 sm:flex-none min-w-50 py-4 px-8 bg-white hover:bg-[#0f3d4c] text-[#0f3d4c] hover:text-white border border-[#0f3d4c]/20 font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md active:scale-95 cursor-pointer text-center"
          >
            <svg
              className="w-5 h-5 fill-none stroke-current"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 00-2-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            {main.emailButtonText}
          </a>
        </div>
      </div>

      {/* Social Links Card */}
      <div className="relative max-w-md w-full bg-[#FFFDF9] p-8 rounded-2xl shadow-md border border-[#EAE3D2] text-center transform -rotate-1 transition-transform duration-300 hover:rotate-0">
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-6 bg-[#FFECB3]/80 border border-[#E8D190]/60 shadow-xs backdrop-blur-xs"></div>

        <h3 className="font-serif text-2xl md:text-3xl text-[#8A4325] font-semibold mb-2">
          {social.title}
        </h3>

        <p className="font-serif italic text-gray-600 text-xs md:text-sm leading-relaxed mb-8">
          {social.subtitle}
        </p>

        <div className="flex items-center justify-center gap-10">
          {social.links.map((link) => {
            // Resolve Instagram URL dynamically via env variable or fallback
            const targetUrl =
              link.id === "instagram"
                ? process.env.NEXT_PUBLIC_INSTA_URL ||
                  link.url ||
                  defaultInstaUrl
                : link.url;

            return (
              <a
                key={link.id}
                href={targetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full border border-[#E5D2BA] bg-[#FAF3E5] flex items-center justify-center text-[#8A4325] shadow-xs group-hover:scale-110 group-hover:bg-[#FFBC57]/20 transition-all duration-200 mb-2">
                  {link.id === "instagram" ? (
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
                  ) : (
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
                  )}
                </div>
                <span className="text-[0.65rem] font-bold tracking-widest text-[#8A4325] uppercase">
                  {link.name}
                </span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SayHello;
