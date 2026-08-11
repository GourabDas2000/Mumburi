"use client";

import React, { createContext, useContext, useState } from "react";

const StackContext = createContext();

export function StackProvider({ children = null } = {}) {
  const [stackItems, setStackItems] = useState([]);

  const addToStack = (product = {}) => {
    if (!product.id) return;
    setStackItems((prev) => {
      if (prev.some((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const removeFromStack = (productId = "") => {
    setStackItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const isInStack = (productId = "") => {
    return stackItems.some((item) => item.id === productId);
  };

  const totalCount = stackItems.length;

  return (
    <StackContext.Provider
      value={{ stackItems, addToStack, removeFromStack, isInStack, totalCount }}
    >
      {children}
    </StackContext.Provider>
  );
}

export function useStack() {
  const context = useContext(StackContext);
  if (!context) {
    return {
      stackItems: [],
      addToStack: () => {},
      removeFromStack: () => {},
      isInStack: () => false,
      totalCount: 0,
    };
  }
  return context;
}
