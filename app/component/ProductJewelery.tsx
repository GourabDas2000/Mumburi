"use client";

import React from "react";
import Link from "next/link";
import { useStack } from "../context/StackContext";

interface Product {
  id?: string;
  productName?: string;
  productCategory?: string[];
  productTagline?: string;
  productStory?: string;
  productTags?: string[];
  productPrice?: number;
  price?: number;
  currency?: string;
  cartImage?: string;
  [key: string]: any;
}

interface ProductJeweleryProps {
  product?: Product;
}

export default function ProductJewelery({
  product = {},
}: ProductJeweleryProps) {
  const { addToStack, removeFromStack, updateQuantity, getItemQuantity } =
    useStack();

  const productId = product.id || "";
  const count = getItemQuantity && productId ? getItemQuantity(productId) : 0;
  const mainCategory = product.productCategory?.[0] || "Jewellery";

  const handleIncrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (count === 0) {
      addToStack(product);
    } else if (updateQuantity && productId) {
      updateQuantity(productId, count + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (count <= 1) {
      if (productId) removeFromStack(productId);
    } else if (updateQuantity && productId) {
      updateQuantity(productId, count - 1);
    }
  };

  const handleRemoveCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (productId) removeFromStack(productId);
  };

  return (
    <div className="group flex flex-col justify-between items-center text-center bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300">
      <Link
        href={`/stack/${productId}`}
        className="block w-full flex flex-col items-center"
      >
        {/* Shape: Rounded / Circle Image Frame */}
        <div className="relative w-28 h-28 rounded-full p-1 border-2 border-dashed border-[#8C4327]/40 group-hover:border-[#8C4327] transition-colors mb-3">
          <div className="w-full h-full rounded-full overflow-hidden bg-stone-100">
            <img
              src={product.cartImage || "/placeholder.jpg"}
              alt={product.productName || "Jewelry Item"}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        </div>

        <span className="text-[9px] font-bold uppercase tracking-wider bg-amber-50 text-[#8C4327] px-2 py-0.5 rounded-full mb-1">
          {mainCategory}
        </span>

        {/* Details */}
        <div className="flex flex-col items-center mb-3">
          <h3 className="font-serif font-bold text-sm text-[#0f3d4c] group-hover:text-[#8C4327] transition-colors line-clamp-1">
            {product.productName || "Artisan Jewellery"}
          </h3>
          {product.productTagline && (
            <p className="font-sans text-[11px] italic text-stone-500 mt-0.5 line-clamp-1">
              {product.productTagline}
            </p>
          )}
          {product.productStory && (
            <p className="font-sans text-[11px] text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
              {product.productStory}
            </p>
          )}

          {/* Tags */}
          {Array.isArray(product.productTags) &&
            product.productTags.length > 0 && (
              <div className="flex flex-wrap justify-center gap-1 mt-2">
                {product.productTags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-semibold bg-stone-100 text-stone-600 px-1.5 py-0.5 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

          <p className="font-sans text-xs font-bold text-[#8C4327] mt-2.5">
            {product.currency === "INR" ? "₹" : "$"}
            {product.productPrice ?? product.price}
          </p>
        </div>
      </Link>

      {/* Cart Controls */}
      {count === 0 ? (
        <button
          type="button"
          onClick={handleIncrement}
          className="w-full py-2 px-3 rounded text-[10px] font-bold uppercase tracking-wider bg-[#0f3d4c] text-white hover:bg-[#8C4327] transition-colors cursor-pointer"
        >
          Add to Stack
        </button>
      ) : (
        <div className="flex flex-col gap-1.5 w-full">
          <div className="flex items-center justify-between border border-[#0f3d4c] rounded p-0.5 bg-[#FAF8F5]">
            <button
              type="button"
              onClick={handleDecrement}
              className="w-7 h-7 flex items-center justify-center rounded bg-[#0f3d4c] text-white text-xs font-bold hover:bg-[#8C4327] cursor-pointer"
            >
              −
            </button>
            <span className="font-sans text-xs font-bold text-[#0f3d4c] px-2">
              {count}
            </span>
            <button
              type="button"
              onClick={handleIncrement}
              className="w-7 h-7 flex items-center justify-center rounded bg-[#0f3d4c] text-white text-xs font-bold hover:bg-[#8C4327] cursor-pointer"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleRemoveCategory}
            className="w-full py-1 text-[9px] font-bold text-red-600 uppercase tracking-wider hover:underline cursor-pointer"
          >
            Remove Category
          </button>
        </div>
      )}
    </div>
  );
}
