import Link from "next/link";
import GraffitiBg from "../../public/Wallart_Grafiti.jpeg";

const Footer = () => {
  // Read environment variables (with fallback defaults)
  const facebookUrl = process.env.NEXT_PUBLIC_FACEBOOK_URL || "#";
  const instagramUrl = process.env.NEXT_PUBLIC_INSTAGRAM_URL || "#";
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL || "support@mumburi.com";

  return (
    <footer
      className="relative w-full bg-cover bg-center bg-no-repeat text-white overflow-hidden"
      style={{ backgroundImage: `url(${GraffitiBg.src})` }}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-[2px]" />

      {/* Added pb-24 on mobile to prevent bottom menu overlap */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-12 pb-24 md:px-16 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12">
          {/* BRAND COLUMN */}
          <div className="col-span-2 md:col-span-1 flex flex-col justify-between">
            <Link href="/" className="inline-block">
              <h2 className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-white hover:opacity-90 transition-opacity">
                Mumburi
              </h2>
            </Link>
          </div>

          {/* COLUMN 1: PAGES */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs tracking-[0.2em] font-bold uppercase text-gray-400 mb-1">
              PAGES
            </h4>
            <Link
              href="/stack"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Store
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              href="/craft"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              About Our Product
            </Link>
            <Link
              href="/bespoke"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Contact Us
            </Link>
          </div>

          {/* COLUMN 2: COMMUNITY */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs tracking-[0.2em] font-bold uppercase text-gray-400 mb-1">
              COMMUNITY
            </h4>
            <Link
              href="/bespoke"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Make your Own
            </Link>
            <Link
              href="/partnerships"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Collaboration
            </Link>
          </div>

          {/* COLUMN 3: SOCIAL & CONTACT */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs tracking-[0.2em] font-bold uppercase text-gray-400 mb-1">
              SOCIAL
            </h4>
            <a
              href={facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Facebook
            </a>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Instagram
            </a>
            <a
              href={`mailto:${contactEmail}`}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Email Us
            </a>
          </div>

          {/* COLUMN 4: SUPPORT */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans text-xs tracking-[0.2em] font-bold uppercase text-gray-400 mb-1">
              SUPPORT
            </h4>
            <Link
              href="/returnpolicy"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Shipping & Returns
            </Link>
            <Link
              href="/privacypolicy"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              Privacy Policy
            </Link>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT LINE */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400 font-sans">
          <p>© {new Date().getFullYear()} Mumburi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
