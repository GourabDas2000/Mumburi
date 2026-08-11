"use client";

import React from "react";
import Link from "next/link";
import { useStack } from "../context/StackContext";

export default function ProductJewelery({ product = {} } = {}) {
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
    <div className="group flex flex-col justify-between items-center text-center bg-[var(--surface-card)] rounded-xl p-5 border border-[var(--primary-color)]/10 shadow-xs hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <Link
        href={`/stack/${product.id || ""}`}
        className="block w-full flex flex-col items-center"
      >
        {/* Shape: Circle */}
        <div className="w-40 h-40 rounded-full p-1.5 border-2 border-dashed border-[var(--mumburi-accent-vibrant)]/50 group-hover:border-[var(--mumburi-accent-vibrant)] transition-colors mb-4">
          <div className="w-full h-full rounded-full overflow-hidden bg-[var(--bg-color)]">
            <img
              src={product.cartImage || "/placeholder.jpg"}
              alt={product.name || "Jewelry Item"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        <h3 className="font-serif font-bold text-lg text-[var(--primary-color)] group-hover:text-[var(--mumburi-accent-vibrant)] transition-colors line-clamp-1">
          {product.name || "Artisan Jewelry"}
        </h3>
        {product.tagline && (
          <p className="font-sans text-xs italic text-[var(--secondary-color)] mt-0.5 line-clamp-1">
            {product.tagline}
          </p>
        )}
        {product.smallDescription && (
          <p className="font-sans text-xs text-[var(--secondary-color)]/80 line-clamp-2 mt-2 leading-relaxed max-w-xs">
            {product.smallDescription}
          </p>
        )}
        <p className="font-sans text-sm font-bold text-[var(--primary-color)] mt-3 mb-4">
          {product.currency === "INR" ? "₹" : "$"}
          {product.price}
        </p>
      </Link>

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
