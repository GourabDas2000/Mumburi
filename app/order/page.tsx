"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useStack } from "../context/StackContext";
import orderData from "../data/OrderData.json";

interface StackItem {
  id: string;
  productName: string;
  category: string;
  price: number;
  currency: string;
  quantity: number;
  cartImage: string;
  tagline?: string;
  [key: string]: any;
}

export default function OrderPage() {
  const {
    stackItems,
    updateQuantity,
    removeFromStack,
    clearStack,
    totalPrice,
    totalCount,
  } = useStack();

  const [userNote, setUserNote] = useState<string>("");
  const [bespokeNote, setBespokeNote] = useState<string>("");
  const [isBespokeOpen, setIsBespokeOpen] = useState<boolean>(false);
  const [shouldClearCart, setShouldClearCart] = useState<boolean>(true);
  const [copiedAlert, setCopiedAlert] = useState<boolean>(false);

  // ----------------------------------------------------
  // Helper to generate formatted text payload
  // ----------------------------------------------------
  const buildOrderPayload = (): string => {
    let summary = orderData.payload.header;

    (stackItems as StackItem[]).forEach((item: StackItem, index: number) => {
      summary += `${index + 1}. *${item.productName}*\n`;
      summary += `   • Item ID: ${item.id}\n`;
      summary += `   • Category: ${item.category}\n`;
      if (item.tagline) summary += `   • Tagline: "${item.tagline}"\n`;
      summary += `   • Price: ${item.currency} ${item.price}\n`;
      summary += `   • Quantity: ${item.quantity}\n`;
      summary += `   • Subtotal: ${item.currency} ${item.price * item.quantity}\n`;
      if (item.cartImage) summary += `   • Image Link: ${item.cartImage}\n`;
      summary += `\n`;
    });

    summary += orderData.payload.divider;
    summary += `${orderData.payload.totalPrefix}${totalPrice}\n\n`;

    if (userNote.trim()) {
      summary += `${orderData.payload.addressHeader}${userNote.trim()}\n\n`;
    }

    if (isBespokeOpen && bespokeNote.trim()) {
      summary += `${orderData.payload.bespokeHeader}${bespokeNote.trim()}\n\n`;
    }

    summary += orderData.payload.footer;
    return summary;
  };

  // ----------------------------------------------------
  // Dispatch Handler (Clipboard Copy + Link Redirection)
  // ----------------------------------------------------
  const handlePlaceOrder = async (target: "whatsapp" | "email") => {
    const payload = buildOrderPayload();

    try {
      await navigator.clipboard.writeText(payload);
      setCopiedAlert(true);
      setTimeout(() => setCopiedAlert(false), 4000);
    } catch (err) {
      console.error("Failed to copy order details to clipboard", err);
    }

    const encodedPayload = encodeURIComponent(payload);
    let targetUrl = "";

    if (target === "whatsapp") {
      const { phoneNumber } = orderData.dispatch.whatsapp;
      targetUrl = `https://wa.me/${phoneNumber}?text=${encodedPayload}`;
    } else if (target === "email") {
      const { emailAddress, subject } = orderData.dispatch.email;
      const encodedSubject = encodeURIComponent(subject);
      targetUrl = `mailto:${emailAddress}?subject=${encodedSubject}&body=${encodedPayload}`;
    }

    if (shouldClearCart) {
      clearStack();
    }

    window.open(targetUrl, "_blank");
  };

  // ----------------------------------------------------
  // Empty Stack View
  // ----------------------------------------------------
  if (stackItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16">
        <div className="w-20 h-20 mb-6 rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
          <svg
            className="w-10 h-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-serif text-stone-800 mb-2">
          {orderData.emptyState.title}
        </h2>
        <p className="text-stone-500 max-w-sm mb-8">
          {orderData.emptyState.description}
        </p>
        <Link
          href={orderData.emptyState.buttonLink}
          className="px-6 py-3 bg-stone-900 text-white text-sm font-medium rounded-md hover:bg-stone-800 transition"
        >
          {orderData.emptyState.buttonText}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-serif text-stone-900 mb-8 border-b pb-4">
        {orderData.header.title}
      </h1>

      {copiedAlert && (
        <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-sm flex items-center justify-between">
          <span>{orderData.header.copiedAlert}</span>
          <button
            onClick={() => setCopiedAlert(false)}
            className="text-emerald-600 font-bold ml-4"
          >
            ✕
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* LEFT COLUMN: Cart Item List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between pb-2">
            <span className="text-sm font-semibold text-stone-500 uppercase tracking-wider">
              {orderData.itemsSection.title} ({totalCount})
            </span>
            <button
              onClick={clearStack}
              className="text-xs text-rose-600 hover:text-rose-800 underline"
            >
              {orderData.itemsSection.clearStackText}
            </button>
          </div>

          {(stackItems as StackItem[]).map((item: StackItem) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 bg-white border border-stone-200 rounded-xl shadow-sm"
            >
              {/* Product Thumbnail */}
              <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-stone-100 flex-shrink-0">
                <Image
                  src={item.cartImage}
                  alt={item.productName}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <span className="text-xs uppercase font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                  {item.category}
                </span>
                <h3 className="text-base font-semibold text-stone-900 truncate mt-1">
                  {item.productName}
                </h3>
                {item.tagline && (
                  <p className="text-xs text-stone-500 italic truncate">
                    {item.tagline}
                  </p>
                )}
                <p className="text-sm font-medium text-stone-800 mt-1">
                  {item.currency} {item.price}
                </p>
              </div>

              {/* Quantity Controls & Actions */}
              <div className="flex flex-col items-end gap-2">
                <div className="flex items-center border border-stone-300 rounded-md bg-stone-50">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded-l-md transition"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-semibold text-stone-800">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center text-stone-600 hover:bg-stone-200 rounded-r-md transition"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeFromStack(item.id)}
                  className="text-xs text-stone-400 hover:text-rose-600 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Bespoke Prompt Section */}
          <div className="mt-8 border border-dashed border-stone-300 rounded-xl p-4 bg-stone-50/50">
            <button
              onClick={() => setIsBespokeOpen(!isBespokeOpen)}
              className="w-full flex items-center justify-between text-left"
            >
              <div>
                <p className="text-sm font-semibold text-stone-800">
                  {orderData.bespokeSection.title}
                </p>
                <p className="text-xs text-stone-500">
                  {orderData.bespokeSection.description}
                </p>
              </div>
              <span className="text-lg font-mono text-stone-600">
                {isBespokeOpen ? "−" : "+"}
              </span>
            </button>

            {isBespokeOpen && (
              <div className="mt-4">
                <textarea
                  rows={3}
                  value={bespokeNote}
                  onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                    setBespokeNote(e.target.value)
                  }
                  placeholder={orderData.bespokeSection.placeholder}
                  className="w-full p-3 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:outline-none bg-white"
                />
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: Summary & Order Dispatch */}
        <div className="lg:col-span-5">
          <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm sticky top-6 space-y-6">
            <h2 className="text-lg font-serif font-bold text-stone-900 border-b pb-3">
              {orderData.summarySection.title}
            </h2>

            {/* Price Calculations */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-stone-600">
                <span>
                  {orderData.summarySection.subtotalLabel} ({totalCount} items)
                </span>
                <span>INR {totalPrice}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>{orderData.summarySection.deliveryLabel}</span>
                <span className="text-emerald-700 font-medium">
                  {orderData.summarySection.deliveryCalculationText}
                </span>
              </div>
              <div className="border-t pt-3 flex justify-between font-bold text-base text-stone-900">
                <span>{orderData.summarySection.totalLabel}</span>
                <span>INR {totalPrice}</span>
              </div>
            </div>

            {/* Optional Note / Address Box */}
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-2 uppercase tracking-wider">
                {orderData.summarySection.userNoteLabel}
              </label>
              <textarea
                rows={3}
                value={userNote}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setUserNote(e.target.value)
                }
                placeholder={orderData.summarySection.userNotePlaceholder}
                className="w-full p-3 text-sm border border-stone-300 rounded-lg focus:ring-2 focus:ring-stone-400 focus:outline-none"
              />
            </div>

            {/* Mandatory Cart Clear Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <input
                type="checkbox"
                id="clearCartCheck"
                checked={shouldClearCart}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setShouldClearCart(e.target.checked)
                }
                aria-required="true"
                className="mt-0.5 h-4 w-4 rounded border-stone-300 text-emerald-600 focus:ring-emerald-500"
              />
              <label
                htmlFor="clearCartCheck"
                className="text-xs text-stone-600 cursor-pointer"
              >
                {orderData.summarySection.clearCartCheckboxLabel}
              </label>
            </div>

            {/* Dispatch Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => handlePlaceOrder("whatsapp")}
                disabled={!shouldClearCart}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-sm transition"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>{orderData.dispatch.whatsapp.buttonText}</span>
              </button>

              <button
                onClick={() => handlePlaceOrder("email")}
                disabled={!shouldClearCart}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-stone-800 hover:bg-stone-900 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold rounded-lg shadow-sm transition"
              >
                <svg
                  className="w-5 h-5 fill-none stroke-current"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>{orderData.dispatch.email.buttonText}</span>
              </button>
            </div>

            {/* Reassurance & Expectation Note */}
            <div className="bg-stone-50 p-3 rounded-lg border border-stone-200">
              <p className="text-xs text-stone-600 text-center leading-relaxed">
                {orderData.reassurance.prefix}
                <strong>{orderData.reassurance.preferredChannelBold}</strong>
                {orderData.reassurance.middleText}
                <strong>{orderData.reassurance.timeframeBold}</strong>
                {orderData.reassurance.suffix}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
