import Link from "next/link";

interface MaintenanceProps {
  badgeText?: string;
  title?: string;
  description?: string;
}

export default function MaintenanceNotice({
  badgeText = "System Update",
  title = "Page Under Maintenance",
  description = "We are currently updating this section to bring you an improved experience. Thank you for your patience—please check back shortly.",
}: MaintenanceProps) {
  return (
    <div className="min-h-[70vh] bg-stone-50 text-stone-900 flex flex-col justify-center items-center px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center space-y-6">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-200/60 text-amber-900 text-xs font-semibold uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-700 animate-pulse" />
          {badgeText}
        </div>

        {/* Title */}
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
          {title}
        </h1>

        {/* Divider */}
        <div className="w-12 h-0.5 bg-amber-800/40 mx-auto" />

        {/* Description */}
        <p className="text-stone-600 text-base sm:text-lg leading-relaxed font-sans max-w-lg mx-auto">
          {description}
        </p>

        {/* Navigation Buttons */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4 text-sm font-medium">
          <Link
            href="/stack"
            className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white rounded-xl transition-all duration-200 shadow-sm cursor-pointer"
          >
            Explore Store
          </Link>
          <Link
            href="/bespoke"
            className="px-6 py-3 bg-white text-stone-700 border border-stone-300 rounded-xl hover:bg-stone-100 transition-all duration-200 cursor-pointer"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
}
