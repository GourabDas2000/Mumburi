"use client";

import React from "react";
import Link from "next/link";
import { useStack } from "../context/StackContext";

export default function ProductHandPaintedTextiles({ product = {} } = {}) {
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
    <div className="group flex flex-col justify-between bg-[var(--surface-card)] rounded-xl p-5 border border-[var(--primary-color)]/10 shadow-xs hover:shadow-xl transition-all duration-300 hover:scale-[1.02]">
      <Link href={`/stack/${product.id || ""}`} className="block w-full">
        {/* Shape: Uneven Organic Morphing Circle */}
        <div className="w-full aspect-square bg-[var(--bg-color)] mb-4 overflow-hidden rounded-[42%_58%_70%_30%/45%_45%_55%_55%] border border-[var(--primary-color)]/10 group-hover:rounded-[55%_45%_35%_65%/60%_40%_60%_40%] transition-all duration-700">
          <img
            src={product.cartImage || "/placeholder.jpg"}
            alt={product.name || "Textile"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex flex-col mb-4">
          <h3 className="font-serif font-bold text-lg text-[var(--primary-color)] group-hover:text-[var(--mumburi-accent-vibrant)] transition-colors line-clamp-1">
            {product.name || "Painted Textile"}
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
