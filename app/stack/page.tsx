"use client";

import React, { useMemo, useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import stackData from "../data/StackData.json";

import ProductCustomizeKits from "../component/ProductCustomizeKits";
import ProductDiyKits from "../component/ProductDiyKits";
import ProductHandPaintedTextiles from "../component/ProductHandPaintedTextiles";
import ProductJewelery from "../component/ProductJewelery";
import ProductTotebags from "../component/ProductTotebags";

import Coverphot_Stack from "../../public/CoverPhoto_Stack.jpg";

export interface Product {
  id: string;
  productName?: string;
  productCategory?: string[];
  theme?: string | string[];
  productTheme?: string | string[];
  themes?: string[];
  productTagline?: string;
  productDescription?: string;
  productTags?: string[];
  productPrice?: number | string;
  currency?: string;
  productStory?: string;
  [key: string]: any;
}

interface StackContentProps {
  products: Product[];
}

interface OurStackPageProps {
  products?: Product[];
}

const ITEMS_PER_PAGE = 6;

// Helper to reliably normalize string | string[] into string[]
const normalizeArray = (val?: string | string[]): string[] => {
  if (!val) return [];
  return Array.isArray(val) ? val : [val];
};

function StackContent({ products }: StackContentProps) {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");

  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [selectedTheme, setSelectedTheme] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Sync category filter with URL search param
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  // Safely extract unique categories
  const categories = useMemo<string[]>(() => {
    const list = Array.isArray(products) ? products : [];
    const extracted = list.flatMap((item) => item.productCategory || []);
    return ["All", ...Array.from(new Set(extracted))];
  }, [products]);

  // Safely extract unique themes
  const themes = useMemo<string[]>(() => {
    const list = Array.isArray(products) ? products : [];
    const extracted = list.flatMap((item) => [
      ...normalizeArray(item.theme),
      ...normalizeArray(item.productTheme),
      ...normalizeArray(item.themes),
    ]);

    const defaultThemes = ["Friends", "How I Met Your Mother"];
    const excludedThemes = ["creative", "floral", "nature"];

    const combined = new Set<string>([...defaultThemes, ...extracted]);

    const filteredThemes = Array.from(combined).filter((thm) => {
      if (!thm || typeof thm !== "string") return false;
      return !excludedThemes.includes(thm.trim().toLowerCase());
    });

    return ["All", ...filteredThemes];
  }, [products]);

  // Filtering Logic
  const filteredProducts = useMemo<Product[]>(() => {
    const list = Array.isArray(products) ? products : [];
    const query = searchQuery.trim().toLowerCase();
    const selCatLower = selectedCategory.toLowerCase();
    const isJewelleryFilter =
      selCatLower.includes("jewel") || selCatLower === "jewellery";

    return list.filter((item) => {
      const categoriesList = item.productCategory || [];
      const itemThemes = [
        ...normalizeArray(item.theme),
        ...normalizeArray(item.productTheme),
        ...normalizeArray(item.themes),
      ];

      const matchesCategory =
        selectedCategory === "All" ||
        categoriesList.some((c) => {
          const itemCatLower = String(c).toLowerCase();
          return isJewelleryFilter
            ? itemCatLower.includes("jewel")
            : itemCatLower === selCatLower;
        });

      const matchesTheme =
        selectedTheme === "All" ||
        itemThemes.some(
          (t) => String(t).toLowerCase() === selectedTheme.toLowerCase(),
        );

      const matchesSearch =
        !query ||
        [
          item.productName,
          ...categoriesList,
          item.productTagline,
          item.productDescription,
          ...(item.productTags || []),
          ...itemThemes,
          item.productPrice,
          item.currency,
          item.productStory,
        ]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(query));

      return matchesCategory && matchesTheme && matchesSearch;
    });
  }, [products, selectedCategory, selectedTheme, searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  const currentProducts = useMemo<Product[]>(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategorySelect = (category: string = "All"): void => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleThemeSelect = (theme: string = "All"): void => {
    setSelectedTheme(theme);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number = 1): void => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 400, behavior: "smooth" });
      }
    }
  };

  const renderProductCard = (product: Product): React.ReactNode => {
    const mainCategory = product.productCategory?.[0] || "";
    const categoryKey = mainCategory.toLowerCase().trim();

    if (categoryKey.includes("jewel")) {
      return <ProductJewelery key={product.id} product={product} />;
    }

    switch (categoryKey) {
      case "tote bags":
      case "totebags":
        return <ProductTotebags key={product.id} product={product} />;
      case "hand painted textiles":
      case "textiles":
        return (
          <ProductHandPaintedTextiles key={product.id} product={product} />
        );
      case "diy kits":
        return <ProductDiyKits key={product.id} product={product} />;
      case "customized kits":
      case "customize kits":
        return <ProductCustomizeKits key={product.id} product={product} />;
      default:
        return <ProductCustomizeKits key={product.id} product={product} />;
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF8F5] text-[#111827] font-sans pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        {/* Hero Banner with Full Image Cover */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[220px] max-h-[420px] rounded-3xl overflow-hidden mb-12 flex items-center justify-center shadow-xs">
          <Image
            src={Coverphot_Stack}
            alt="Festive Collections Cover"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
            className="object-cover object-center pointer-events-none"
          />
          <div className="absolute inset-0 bg-black/25 pointer-events-none" />

          {/* Floating Glassmorphism Box with Hover Lift & Blur */}
          <div className="relative z-10 max-w-[260px] sm:max-w-md md:max-w-lg mx-2 px-4 py-5 md:px-10 md:py-8 bg-white/20 hover:bg-white/35 backdrop-blur-xs hover:backdrop-blur-md rounded-2xl md:rounded-3xl border border-white/40 hover:border-white/80 shadow-lg hover:shadow-2xl hover:shadow-black/20 text-center flex flex-col items-center transform transition-all duration-300 ease-out hover:-translate-y-2 hover:scale-[1.02] cursor-default">
            <h1 className="font-serif text-lg sm:text-2xl md:text-4xl font-medium text-[#0f3d4c] mb-1 md:mb-2 tracking-tight">
              Festive Collections
            </h1>
            <p className="text-[11px] sm:text-xs md:text-sm text-[#0f3d4c] font-medium leading-snug md:leading-relaxed mb-3 md:mb-5 max-w-[210px] sm:max-w-xs md:max-w-sm">
              Celebrate life's special moments with our curated Puja, Christmas,
              and Valentine's series.
            </p>
            <button
              type="button"
              onClick={() => handleThemeSelect("Puja")}
              className="py-2 px-5 md:py-3 md:px-8 bg-[#8C4327] hover:bg-[#72341d] text-white font-sans text-[10px] md:text-xs font-bold uppercase tracking-[0.12em] md:tracking-[0.15em] rounded-lg md:rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              Shop Pujo Special
            </button>
          </div>
        </div>

        {/* Search Field */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, theme, tags, price, details..."
              className="w-full pl-4 pr-10 py-3.5 bg-white border border-stone-200 rounded-2xl text-xs md:text-sm text-[#0f3d4c] placeholder-gray-400 focus:outline-hidden focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c] shadow-xs transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-gray-400 hover:text-gray-600 text-sm font-bold cursor-pointer"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col gap-5 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-md">
              <h2 className="font-serif text-3xl md:text-4xl text-[#0f3d4c] font-medium mb-1">
                Our Stack
              </h2>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                A curated collection of handcrafted goods, made slowly and with
                intention.
              </p>
            </div>
            <span className="text-xs font-medium text-gray-500 font-sans">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Theme Filters */}
          <div className="flex flex-wrap gap-2 items-center pt-3 border-t border-stone-200/60">
            <span className="text-xs font-bold text-[#4B3B68] uppercase tracking-wider mr-2">
              Theme:
            </span>
            {themes.map((thm) => {
              const isActive =
                selectedTheme.toLowerCase() === thm.toLowerCase();
              return (
                <button
                  key={thm}
                  type="button"
                  onClick={() => handleThemeSelect(thm)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#4B3B68] text-white border-[#4B3B68] shadow-xs font-bold"
                      : "bg-white hover:bg-[#F2EEF8] text-[#4B3B68] border-stone-200"
                  }`}
                >
                  {thm === "All" ? "All Themes" : thm}
                </button>
              );
            })}
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-[#3A4B28] uppercase tracking-wider mr-2">
              Category:
            </span>
            {categories.map((cat) => {
              const isActive =
                selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#3A4B28] text-white border-[#3A4B28] shadow-xs font-bold"
                      : "bg-[#EFEAE1]/70 hover:bg-[#EFEAE1] text-[#0f3d4c] border-stone-200/80"
                  }`}
                >
                  {cat === "All" ? "All Categories" : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Product Grid */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-16">
            {currentProducts.map((product) => renderProductCard(product))}
          </div>
        ) : (
          <div className="w-full text-center py-20 bg-white/60 rounded-3xl border border-dashed border-gray-200 mb-16">
            <p className="text-sm text-gray-500 font-serif">
              No products found matching your search and filter criteria.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("All");
                setSelectedTheme("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-bold text-[#8C4327] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 text-xs font-sans text-gray-600">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="hover:text-[#0f3d4c] disabled:opacity-30 cursor-pointer"
            >
              &lt; Previous
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    type="button"
                    onClick={() => handlePageChange(pageNum)}
                    className={`font-semibold cursor-pointer transition-all ${
                      currentPage === pageNum
                        ? "text-[#8C4327] border-b-2 border-[#8C4327] pb-0.5 text-sm"
                        : "text-gray-500 hover:text-[#0f3d4c]"
                    }`}
                  >
                    {pageNum}
                  </button>
                ),
              )}
            </div>

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="hover:text-[#0f3d4c] disabled:opacity-30 cursor-pointer"
            >
              Next &gt;
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default function OurStackPage({
  products = stackData as unknown as Product[],
}: OurStackPageProps) {
  return (
    <Suspense fallback={<div className="p-10 text-center">Loading...</div>}>
      <StackContent products={products} />
    </Suspense>
  );
}
