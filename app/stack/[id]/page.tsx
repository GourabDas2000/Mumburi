"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStack } from "../../context/StackContext";
import stackData from "../../data/StackData.json";

export default function ProductDetailPage({ params }) {
  const router = useRouter();
  // Unwrap params if using Next.js 13/14 client components
  const resolvedParams = React.use(params);
  const productId = resolvedParams?.id;

  const product =
    stackData.find((item) => String(item.id) === String(productId)) ||
    stackData[0];

  const { addToStack, removeFromStack, updateQuantity, getItemQuantity } =
    useStack();

  const count = getItemQuantity ? getItemQuantity(product.id) : 0;
  const isAvailable = product.isAvailable !== false;

  const allImages =
    Array.isArray(product.images) && product.images.length > 0
      ? product.images
      : [product.cartImage || product.coverPagePhoto || "/placeholder.jpg"];

  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  const handleIncrement = () => {
    if (count === 0) {
      addToStack(product);
    } else if (updateQuantity) {
      updateQuantity(product.id, count + 1);
    }
  };

  const handleDecrement = () => {
    if (count <= 1) {
      removeFromStack(product.id);
    } else if (updateQuantity) {
      updateQuantity(product.id, count - 1);
    }
  };

  const handleRemoveCategory = () => {
    removeFromStack(product.id);
  };

  const handleBuyNow = () => {
    if (count === 0) {
      addToStack(product);
    }
    router.push("/order");
  };

  return (
    <main className="w-full min-h-screen bg-[#FAF8F5] text-[#111827] py-10 px-4 md:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <Link
          href="/stack"
          className="inline-flex items-center text-xs font-bold text-[#0f3d4c] hover:text-[#8C4327] mb-8 transition-colors"
        >
          ← Back to Stack
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-6 md:p-10 rounded-3xl border border-stone-200 shadow-sm">
          {/* Left Column: Main Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-square bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
              <img
                src={selectedImage}
                alt={product.productName || "Product photo"}
                className="w-full h-full object-cover"
              />

              {/* Out of Stock Sticker Badge */}
              {!isAvailable && (
                <div className="absolute top-4 left-4 bg-red-600 text-white font-sans text-xs font-extrabold uppercase tracking-widest px-3 py-1.5 rounded-md shadow-md transform -rotate-6">
                  Out of Stock
                </div>
              )}
            </div>

            {/* Thumbnail Gallery (Only shown if multiple images exist) */}
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all cursor-pointer flex-shrink-0 ${
                      selectedImage === img
                        ? "border-[#8C4327] scale-105"
                        : "border-stone-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-3">
              {/* Category Badges */}
              {Array.isArray(product.productCategory) &&
                product.productCategory.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {product.productCategory.map((cat, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-bold uppercase tracking-wider bg-[#3A4B28] text-white px-2.5 py-1 rounded-full"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

              {/* Product Title */}
              {product.productName && (
                <h1 className="font-serif font-bold text-2xl md:text-3xl text-[#0f3d4c]">
                  {product.productName}
                </h1>
              )}

              {/* Tagline */}
              {product.productTagline && (
                <p className="font-sans italic text-sm text-stone-500">
                  {product.productTagline}
                </p>
              )}

              {/* Price & Discount */}
              {(product.productPrice || product.price) && (
                <div className="flex items-center gap-3 my-1">
                  <span className="font-sans text-xl font-bold text-[#8C4327]">
                    {product.currency === "INR" ? "₹" : "$"}
                    {product.productPrice ?? product.price}
                  </span>
                  {product.productDiscount > 0 && (
                    <span className="text-xs font-bold text-green-700 bg-green-50 px-2 py-0.5 rounded-full border border-green-200">
                      {product.productDiscount}% OFF
                    </span>
                  )}
                </div>
              )}

              {/* Cover Page Tag */}
              {product.coverPageTag && (
                <div className="bg-[#FAF8F5] border-l-4 border-[#8C4327] p-3 text-xs italic text-stone-700 rounded-r-lg">
                  "{product.coverPageTag}"
                </div>
              )}

              {/* Description */}
              {product.productDescription && (
                <div className="mt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Description
                  </h4>
                  <p className="text-xs text-stone-700 leading-relaxed">
                    {product.productDescription}
                  </p>
                </div>
              )}

              {/* Story */}
              {product.productStory && (
                <div className="mt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                    Behind The Craft
                  </h4>
                  <p className="text-xs text-stone-600 italic leading-relaxed">
                    {product.productStory}
                  </p>
                </div>
              )}

              {/* Materials */}
              {Array.isArray(product.productMaterial) &&
                product.productMaterial.length > 0 && (
                  <div className="mt-2">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-1">
                      Materials
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {product.productMaterial.map((mat, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] bg-stone-100 text-stone-700 px-2 py-0.5 rounded border border-stone-200"
                        >
                          {mat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

              {/* Themes & Occasions */}
              {((Array.isArray(product.theme) && product.theme.length > 0) ||
                (Array.isArray(product.occasion) &&
                  product.occasion.length > 0)) && (
                <div className="flex flex-wrap gap-4 mt-2">
                  {Array.isArray(product.theme) && product.theme.length > 0 && (
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                        Theme
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {product.theme.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[10px] font-semibold bg-[#4B3B68]/10 text-[#4B3B68] px-2 py-0.5 rounded"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {Array.isArray(product.occasion) &&
                    product.occasion.length > 0 && (
                      <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-stone-400 mb-1">
                          Occasion
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {product.occasion.map((o, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold bg-amber-50 text-[#8C4327] px-2 py-0.5 rounded"
                            >
                              {o}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                </div>
              )}

              {/* Creator */}
              {Array.isArray(product.creator) && product.creator.length > 0 && (
                <p className="text-[11px] text-stone-500 mt-1">
                  Crafted by:{" "}
                  <span className="font-semibold text-stone-700">
                    {product.creator.join(", ")}
                  </span>
                </p>
              )}

              {/* Tags */}
              {Array.isArray(product.productTags) &&
                product.productTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {product.productTags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-semibold bg-stone-100 text-stone-600 px-2 py-0.5 rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

              {/* Social Link */}
              {product.productSocialMediaLink && (
                <a
                  href={product.productSocialMediaLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#0f3d4c] hover:underline mt-2 inline-block"
                >
                  View on Social Media →
                </a>
              )}

              {/* Others */}
              {product.others && (
                <p className="text-xs text-stone-500 mt-2">{product.others}</p>
              )}
            </div>

            {/* Actions: Add to Cart / Counter / Buy Now */}
            <div className="flex flex-col gap-3 pt-6 mt-6 border-t border-stone-200">
              {count === 0 ? (
                <button
                  type="button"
                  onClick={handleIncrement}
                  disabled={!isAvailable}
                  className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#0f3d4c] text-white hover:bg-[#8C4327] disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
                >
                  {isAvailable ? "Add to Stack" : "Currently Unavailable"}
                </button>
              ) : (
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between border border-[#0f3d4c] rounded-xl p-1 bg-[#FAF8F5]">
                    <button
                      type="button"
                      onClick={handleDecrement}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0f3d4c] text-white text-sm font-bold hover:bg-[#8C4327] cursor-pointer"
                    >
                      −
                    </button>
                    <span className="font-sans text-sm font-bold text-[#0f3d4c] px-4">
                      {count} in Stack
                    </span>
                    <button
                      type="button"
                      onClick={handleIncrement}
                      className="w-9 h-9 flex items-center justify-center rounded-lg bg-[#0f3d4c] text-white text-sm font-bold hover:bg-[#8C4327] cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveCategory}
                    className="w-full py-1 text-xs font-bold text-red-600 uppercase tracking-wider hover:underline cursor-pointer"
                  >
                    Remove Category
                  </button>
                </div>
              )}

              {/* Buy Now Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!isAvailable}
                className="w-full py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-[#8C4327] text-white hover:bg-[#72341d] disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-xs"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
