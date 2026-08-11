"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import stackData from "../stack/stackData.json"; // Update import path as needed

// Specialized components imported from JS files
import ProductTotebags from "../component/ProductTotebags";
import ProductJewelery from "../component/ProductJewelery";
import ProductHandPaintedTextiles from "../component/ProductHandPaintedTextiles";
import ProductDiyKits from "../component/ProductDiyKits";
import ProductCustomizeKits from "../component/ProductCustomizeKits";

const ITEMS_PER_PAGE = 4;

export default function OurStackPage({ products = stackData } = {}) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedOccasion, setSelectedOccasion] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 1. Extract unique categories dynamically from JSON data
  const categories = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    const unique = Array.from(
      new Set(list.map((p = {}) => p.catagory).filter(Boolean)),
    );
    return ["All", ...unique];
  }, [products]);

  // 2. Extract unique occasions dynamically (ensuring Puja, Christmas, Valentine's Week exist)
  const occasions = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    const defaultOccasions = ["Puja", "Christmas", "Valentine's Week"];
    const extracted = list.map((p = {}) => p.occasion).filter(Boolean);
    const combined = Array.from(new Set([...defaultOccasions, ...extracted]));
    return ["All", ...combined];
  }, [products]);

  // 3. Multi-field Search & Filter Engine Logic
  const filteredProducts = useMemo(() => {
    const list = Array.isArray(products) ? products : [];
    const query = searchQuery.trim().toLowerCase();

    return list.filter((item = {}) => {
      // Category Filter
      const matchCategory =
        selectedCategory === "All" ||
        (item.catagory || "").toLowerCase() === selectedCategory.toLowerCase();

      // Occasion Filter
      const matchOccasion =
        selectedOccasion === "All" ||
        (item.occasion || "").toLowerCase() === selectedOccasion.toLowerCase();

      // Deep Multi-field Search Filter
      const matchSearch =
        !query ||
        [
          item.name,
          item.catagory,
          item.tagline,
          item.description,
          item.tags,
          item.occasion,
          item.price,
          item.currency,
        ]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(query));

      return matchCategory && matchOccasion && matchSearch;
    });
  }, [products, selectedCategory, selectedOccasion, searchQuery]);

  // 4. Pagination calculation logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE) || 1;

  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handleCategorySelect = (category = "All") => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleOccasionSelect = (occasion = "All") => {
    setSelectedOccasion(occasion);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage = 1) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 400, behavior: "smooth" });
      }
    }
  };

  // 5. Component Switcher to render specific component for each category
  const renderProductCard = (product = {}) => {
    const categoryKey = (product.catagory || "").toLowerCase().trim();

    switch (categoryKey) {
      case "tote bags":
      case "totebags":
        return <ProductTotebags key={product.id} product={product} />;
      case "jewelry":
      case "jewelery":
        return <ProductJewelery key={product.id} product={product} />;
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
        return (
          <div
            key={product.id}
            className="group flex flex-col items-start bg-white rounded-2xl p-4 border border-stone-200/60 shadow-xs hover:shadow-md transition-all"
          >
            <Link
              href={`/products/${product.id}`}
              className="w-full overflow-hidden rounded-xl mb-4 bg-[#F5F2EC] aspect-[4/3] block relative"
            >
              <img
                src={product.cartImage || "/placeholder.jpg"}
                alt={product.name || "Product"}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {product.occasion && (
                <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[#0f3d4c] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md shadow-xs">
                  {product.occasion}
                </span>
              )}
            </Link>

            <div className="flex justify-between items-start w-full mb-1">
              <Link
                href={`/products/${product.id}`}
                className="font-serif font-medium text-lg text-[#0f3d4c] hover:underline"
              >
                {product.name}
              </Link>
              {product.tags && (
                <span className="text-[10px] font-bold uppercase px-2 py-0.5 bg-[#8C4327]/10 text-[#8C4327] rounded-full">
                  {product.tags}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mb-3">{product.tagline}</p>
            <p className="text-sm font-semibold text-[#8C4327]">
              {product.currency === "INR" ? "₹" : "$"}
              {product.price}
            </p>
          </div>
        );
    }
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF8F5] text-[#111827] font-sans pb-20">
      <div className="max-w-6xl mx-auto px-4 md:px-8 pt-6">
        {/* ================= HERO SECTION ================= */}
        <div
          className="relative w-full h-[320px] md:h-[400px] rounded-3xl overflow-hidden mb-12 flex items-center justify-center bg-cover bg-center shadow-sm"
          style={{ backgroundImage: `url('/hero-bg.jpg')` }}
        >
          {/* Subtle warm overlay */}
          <div className="absolute inset-0 bg-black/25" />

          {/* Frosted Transparent Glass Box */}
          <div className="relative z-10 max-w-lg mx-4 px-6 py-8 md:px-10 md:py-10 bg-white/35 backdrop-blur-md rounded-2xl border border-white/50 shadow-xl text-center flex flex-col items-center">
            <h1 className="font-serif text-2xl md:text-4xl font-medium text-[#0f3d4c] mb-2 tracking-tight">
              Festive Collections
            </h1>
            <p className="text-xs md:text-sm text-[#0f3d4c] font-medium leading-relaxed mb-6 max-w-xs md:max-w-sm">
              Celebrate life's special moments with our curated Puja, Christmas,
              and Valentine's series.
            </p>

            {/* Match CTA Button Style with Partnership & Home Page */}
            <button
              type="button"
              onClick={() => handleOccasionSelect("Puja")}
              className="py-3.5 px-8 bg-[#8C4327] hover:bg-[#72341d] text-white font-sans text-xs md:text-sm font-bold uppercase tracking-[0.15em] rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              Shop Pujo Special
            </button>
          </div>
        </div>

        {/* ================= SEARCH ENGINE BAR ================= */}
        <div className="w-full max-w-2xl mx-auto mb-10">
          <div className="relative flex items-center">
            <svg
              className="absolute left-4 w-5 h-5 text-[#0f3d4c]/50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, occasion (Puja, Christmas), tags, price, details..."
              className="w-full pl-12 pr-10 py-3.5 bg-white border border-stone-200 rounded-2xl text-xs md:text-sm text-[#0f3d4c] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0f3d4c]/20 focus:border-[#0f3d4c] shadow-xs transition-all"
            />

            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-4 text-gray-400 hover:text-gray-600 text-sm font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* ================= OUR STACK HEADER & DYNAMIC FILTERS ================= */}
        <div className="flex flex-col gap-6 mb-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-md">
              <h2 className="font-serif text-3xl md:text-4xl text-[#0f3d4c] font-medium mb-1">
                Our Stack
              </h2>
              <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                A curated collection of handcrafted goods, made slowly and with
                intention in our small studio.
              </p>
            </div>

            {/* Result count indicator */}
            <span className="text-xs font-medium text-gray-500 font-sans">
              Showing {filteredProducts.length} product
              {filteredProducts.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Filter Row 1: Occasions (Puja, Christmas, Valentine's, etc.) */}
          <div className="flex flex-wrap gap-2 items-center pt-2 border-t border-stone-200/60">
            <span className="text-xs font-bold text-[#8C4327] uppercase tracking-wider mr-2">
              Occasion:
            </span>
            {occasions.map((occ) => {
              const isActive =
                selectedOccasion.toLowerCase() === occ.toLowerCase();
              return (
                <button
                  key={occ}
                  type="button"
                  onClick={() => handleOccasionSelect(occ)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#8C4327] text-white border-[#8C4327] shadow-xs"
                      : "bg-white hover:bg-[#F5EBE6] text-[#0f3d4c] border-stone-200"
                  }`}
                >
                  {occ === "All" ? "All Occasions" : occ}
                </button>
              );
            })}
          </div>

          {/* Filter Row 2: Categories */}
          <div className="flex flex-wrap gap-2 items-center">
            <span className="text-xs font-bold text-[#3A4B28] uppercase tracking-wider mr-2">
              Category:
            </span>
            {categories.map((cat = "") => {
              const isActive =
                selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategorySelect(cat)}
                  className={`text-xs font-medium px-4 py-1.5 rounded-full border transition-all duration-200 cursor-pointer ${
                    isActive
                      ? "bg-[#3A4B28] text-white border-[#3A4B28] shadow-xs"
                      : "bg-[#EFEAE1]/70 hover:bg-[#EFEAE1] text-[#0f3d4c] border-stone-200/80"
                  }`}
                >
                  {cat === "All" ? "All Categories" : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ================= PRODUCT GRID ================= */}
        {currentProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 mb-16">
            {currentProducts.map((product = {}) => renderProductCard(product))}
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
                setSelectedOccasion("All");
                setSearchQuery("");
              }}
              className="mt-4 text-xs font-bold text-[#8C4327] underline cursor-pointer"
            >
              Reset all filters
            </button>
          </div>
        )}

        {/* ================= PAGINATION SECTION ================= */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 text-xs font-sans text-gray-600">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="hover:text-[#0f3d4c] disabled:opacity-30 disabled:hover:text-gray-600 transition-colors cursor-pointer"
            >
              &lt; Previous
            </button>

            <div className="flex items-center gap-3">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum = 1) => (
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
              className="hover:text-[#0f3d4c] disabled:opacity-30 disabled:hover:text-gray-600 transition-colors cursor-pointer"
            >
              Next &gt;
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
