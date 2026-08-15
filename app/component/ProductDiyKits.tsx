"use client";

import React from "react";
import Link from "next/link";
import { useStack } from "../context/StackContext";

interface Product {
  id?: string;
  productName?: string;
  productCategory?: string[];
  productTagline?: string;
  productPrice?: number;
  price?: number;
  currency?: string;
  cartImage?: string;
  productStory?: string;
  productTags?: string[];
  [key: string]: any;
}

interface ProductDiyKitsProps {
  product?: Product;
}

export default function ProductDiyKits({ product = {} }: ProductDiyKitsProps) {
  const { addToStack, removeFromStack, updateQuantity, getItemQuantity } =
    useStack();

  const productId = product.id || "";
  const count = getItemQuantity && productId ? getItemQuantity(productId) : 0;
  const mainCategory = product.productCategory?.[0] || "DIY Kits";

  const handleIncrement = (e: React.MouseEvent) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (count === 0) {
      addToStack(product);
    } else if (updateQuantity && productId) {
      updateQuantity(productId, count + 1);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (count <= 1) {
      if (productId) removeFromStack(productId);
    } else if (updateQuantity && productId) {
      updateQuantity(productId, count - 1);
    }
  };

  const handleRemoveCategory = (e: React.MouseEvent) => {
    if (e?.stopPropagation) e.stopPropagation();
    if (productId) removeFromStack(productId);
  };

  return (
    <div className="group flex flex-col justify-between bg-white rounded-xl p-3.5 border border-stone-200 shadow-xs hover:shadow-lg transition-all duration-300">
      <Link href={`/stack/${productId}`} className="block w-full">
        {/* Shape: Uneven Organic Circle */}
        <div className="w-full aspect-square bg-[#FAF8F5] mb-3 overflow-hidden rounded-[48%_52%_68%_32%/42%_42%_58%_58%] border border-stone-200 relative group-hover:rounded-[55%_45%_35%_65%/60%_40%_60%_40%] transition-all duration-500">
          <img
            src={product.cartImage || "/placeholder.jpg"}
            alt={product.productName || "DIY Kit"}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <span className="absolute top-2 left-2 bg-[#3A4B28] text-white font-sans text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs">
            {mainCategory}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col mb-3">
          <h3 className="font-serif font-bold text-sm text-[#0f3d4c] group-hover:text-[#8C4327] transition-colors line-clamp-1">
            {product.productName || "DIY Kit"}
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
              <div className="flex flex-wrap gap-1 mt-2">
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
