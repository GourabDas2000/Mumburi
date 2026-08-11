"use client";

import React from "react";
import Link from "next/link";
import { useStack } from "../context/StackContext";

export default function ProductTotebags({ product = {} } = {}) {
  const { addToStack, removeFromStack, isInStack } = useStack();
  const added = isInStack(product.id);

  const handleToggleStack = (e = { stopPropagation: () => {} }) => {
    if (e && typeof e.stopPropagation === "function") e.stopPropagation();
    if (added) {
      removeFromStack(product.id);
    } else {
      addToStack(product);
    }
  };

  return (
    <div className="group flex flex-col justify-between bg-[var(--surface-card)] rounded-xl p-4 border border-[var(--primary-color)]/10 shadow-xs hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      {/* Clickable Card Content to Detail Page */}
      <Link href={`/stack/${product.id || ""}`} className="block w-full">
        {/* Shape: Vertical Rectangle (3:4 Ratio) */}
        <div className="w-full aspect-[3/4] rounded-lg overflow-hidden mb-4 relative bg-[var(--bg-color)]">
          <img
            src={product.cartImage || "/placeholder.jpg"}
            alt={product.name || "Tote Bag"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {product.tags && (
            <span className="absolute top-3 left-3 bg-[var(--mumburi-accent-vibrant)] text-[var(--mumburi-p-pop)] font-sans text-[0.65rem] font-bold uppercase tracking-[0.15em] px-2.5 py-1 rounded shadow-xs">
              {product.tags}
            </span>
          )}
        </div>

        {/* Content Info */}
        <div className="flex flex-col mb-4">
          <h3 className="font-serif font-bold text-lg text-[var(--primary-color)] group-hover:text-[var(--mumburi-accent-vibrant)] transition-colors line-clamp-1">
            {product.name || "Handcrafted Tote"}
          </h3>
          {product.tagline && (
            <p className="font-sans text-xs italic text-[var(--secondary-color)] mt-0.5 line-clamp-1">
              {product.tagline}
            </p>
          )}
          {product.smallDescription && (
            <p className="font-sans text-xs text-[var(--secondary-color)]/80 line-clamp-2 mt-2 leading-relaxed">
              {product.smallDescription}
            </p>
          )}
          <p className="font-sans text-sm font-bold text-[var(--primary-color)] mt-3">
            {product.currency === "INR" ? "₹" : "$"}
            {product.price}
          </p>
        </div>
      </Link>

      {/* Unified Button Styling */}
      <button
        type="button"
        onClick={handleToggleStack}
        className={`w-full py-3 px-4 rounded font-sans text-[var(--fs-btn)] font-bold uppercase tracking-[0.15em] shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98] ${
          added
            ? "border border-[var(--primary-color)] text-[var(--primary-color)] bg-transparent hover:bg-[var(--primary-color)] hover:text-[var(--mumburi-p-pop)]"
            : "bg-[var(--mumburi-dark-deep)] text-[var(--mumburi-p-pop)] hover:bg-[var(--mumburi-accent-vibrant)]"
        }`}
      >
        {added ? "Remove from Stack" : "Add to Stack"}
      </button>
    </div>
  );
}
