"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";

const StackContext = createContext();

export function StackProvider({ children }) {
  // State storing cart items: [{ id, productName, category, price, currency, quantity, cartImage, tagline }]
  const [stackItems, setStackItems] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("mumburi_stack_cart");
        return saved ? JSON.parse(saved) : [];
      } catch (e) {
        console.error("Failed to load stack cart from localStorage:", e);
        return [];
      }
    }
    return [];
  });

  // Sync to localStorage whenever stackItems change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("mumburi_stack_cart", JSON.stringify(stackItems));
      } catch (e) {
        console.error("Failed to save stack cart to localStorage:", e);
      }
    }
  }, [stackItems]);

  // ----------------------------------------------------
  // Helper to extract clean category string from product
  // ----------------------------------------------------
  const getProductCategory = (product) => {
    if (
      Array.isArray(product.productCategory) &&
      product.productCategory.length > 0
    ) {
      return product.productCategory[0];
    }
    if (
      typeof product.productCategory === "string" &&
      product.productCategory.trim()
    ) {
      return product.productCategory.trim();
    }
    if (typeof product.category === "string" && product.category.trim()) {
      return product.category.trim();
    }
    return "General";
  };

  // ----------------------------------------------------
  // Add product to stack (Increments quantity if existing)
  // ----------------------------------------------------
  const addToStack = (product) => {
    if (!product || !product.id) return;

    setStackItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id,
      );

      if (existingIndex > -1) {
        // Increment quantity of existing product
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      // Add new product item
      const category = getProductCategory(product);
      const rawPrice = product.price ?? product.productPrice ?? 0;
      const parsedPrice =
        typeof rawPrice === "number" ? rawPrice : parseFloat(rawPrice) || 0;

      const newItem = {
        id: product.id,
        productName: product.name || product.productName || "Handcrafted Item",
        category: category,
        price: parsedPrice,
        currency: product.currency || "INR",
        quantity: 1,
        cartImage: product.cartImage || product.image || "/placeholder.jpg",
        tagline: product.tagline || product.productTagline || "",
      };

      return [...prevItems, newItem];
    });
  };

  // ----------------------------------------------------
  // Remove product completely from stack
  // ----------------------------------------------------
  const removeFromStack = (productId) => {
    setStackItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  };

  // ----------------------------------------------------
  // Update exact quantity of a product
  // ----------------------------------------------------
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromStack(productId);
      return;
    }

    setStackItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item,
      ),
    );
  };

  // ----------------------------------------------------
  // Clear all items in stack
  // ----------------------------------------------------
  const clearStack = () => {
    setStackItems([]);
  };

  // ----------------------------------------------------
  // Helper getters
  // ----------------------------------------------------
  const getItemQuantity = (productId) => {
    const item = stackItems.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  const isInStack = (productId) => {
    return stackItems.some((item) => item.id === productId);
  };

  // ====================================================
  // CALCULATED VALUES & DERIVED METRICS
  // ====================================================

  // 1. Total Count (Sum of all product quantities)
  const totalCount = useMemo(() => {
    return stackItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [stackItems]);

  // 2. Distinct Product Count based on Categories
  // (Calculates the count of unique categories currently present in stack)
  const distinctProductCount = useMemo(() => {
    const uniqueCategories = new Set(
      stackItems.map((item) => item.category.toLowerCase().trim()),
    );
    return uniqueCategories.size;
  }, [stackItems]);

  // 3. Total Price (Sum of price * quantity for all products)
  const totalPrice = useMemo(() => {
    return stackItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
  }, [stackItems]);

  // 4. Order Dictionary for '/order' page
  // Structure:
  // {
  //    "Tote Bags": {
  //       categoryName: "Tote Bags",
  //       totalCategoryQuantity: 3,
  //       totalCategoryPrice: 1497,
  //       items: [
  //         { id, productName, price, quantity, subtotal, cartImage }
  //       ]
  //    },
  //    ...
  // }
  const orderDictionary = useMemo(() => {
    const dictionary = {};

    stackItems.forEach((item) => {
      const catKey = item.category;

      if (!dictionary[catKey]) {
        dictionary[catKey] = {
          categoryName: catKey,
          totalCategoryQuantity: 0,
          totalCategoryPrice: 0,
          items: [],
        };
      }

      const itemSubtotal = item.price * item.quantity;

      dictionary[catKey].totalCategoryQuantity += item.quantity;
      dictionary[catKey].totalCategoryPrice += itemSubtotal;

      dictionary[catKey].items.push({
        id: item.id,
        productName: item.productName,
        category: item.category,
        price: item.price,
        currency: item.currency,
        quantity: item.quantity,
        subtotal: itemSubtotal,
        cartImage: item.cartImage,
        tagline: item.tagline,
      });
    });

    return dictionary;
  }, [stackItems]);

  const value = {
    stackItems,
    addToStack,
    removeFromStack,
    updateQuantity,
    clearStack,
    getItemQuantity,
    isInStack,
    // Calculated Metrics
    totalCount,
    distinctProductCount, // Count of unique categories in cart
    distinctItemCount: stackItems.length, // Count of unique individual products
    totalPrice,
    orderDictionary, // Category-grouped dictionary for /order page
  };

  return (
    <StackContext.Provider value={value}>{children}</StackContext.Provider>
  );
}

export function useStack() {
  const context = useContext(StackContext);
  if (!context) {
    throw new Error("useStack must be used within a StackProvider");
  }
  return context;
}
