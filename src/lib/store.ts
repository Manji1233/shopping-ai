"use client";

import { create } from "zustand";

import { products, type Product } from "@/lib/data/products";

export type ChatMessage = {
  id: string;
  role: "assistant" | "user";
  content: string;
};

export type CartItem = Product & {
  quantity: number;
};

type StoreState = {
  messages: ChatMessage[];
  cartItems: CartItem[];
  lastAddedId: number | null;
  sendMessage: (content: string) => void;
  addToCart: (product: Product) => void;
  clearLastAdded: () => void;
  cartCount: number;
};

const initialAssistantMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "你好，我是家采AI。你可以直接问我买什么、怎么凑单最省，或者把感兴趣的商品加入购物车。",
};

const buildReply = (question: string) => {
  const keywordMap = [
    { keyword: "抽纸", product: products[0] },
    { keyword: "耳机", product: products[1] },
    { keyword: "面膜", product: products[2] },
    { keyword: "香水", product: products[3] },
    { keyword: "纸尿裤", product: products[4] },
    { keyword: "婴儿", product: products[4] },
  ];

  const matched = keywordMap.find(({ keyword }) => question.includes(keyword))?.product;

  if (matched) {
    return `我建议你重点看看${matched.title}，当前价格 ¥${matched.price}。${matched.reason}如果要，我也可以继续帮你比较它的适用场景和注意点。`;
  }

  if (question.includes("凑单") || question.includes("省") || question.includes("优惠")) {
    return "如果你想更省钱，建议优先把抽纸和婴儿纸尿裤这类家庭刚需先加入购物车，再决定耳机和香水这类高客单商品。这样更容易形成稳定的家庭采购单。";
  }

  if (question.includes("家庭") || question.includes("日用品") || question.includes("补货")) {
    return "从家庭补货角度，我会优先推荐抽纸和婴儿纸尿裤，再结合面膜等复购型个护商品一起规划，这样更符合家庭服务型购物节奏。";
  }

  return "我已经理解你的需求。你可以继续问具体商品、预算、适用人群，或者直接把下方推荐商品加入购物车，我会按家庭采购思路继续帮你整理。";
};

export const useShoppingStore = create<StoreState>((set) => ({
  messages: [initialAssistantMessage],
  cartItems: [],
  lastAddedId: null,
  cartCount: 0,
  sendMessage: (content) => {
    const question = content.trim();

    if (!question) {
      return;
    }

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "user",
      content: question,
    };

    const assistantMessage: ChatMessage = {
      id: `assistant-${Date.now()}`,
      role: "assistant",
      content: buildReply(question),
    };

    set((state) => ({
      messages: [...state.messages, userMessage, assistantMessage],
    }));
  },
  addToCart: (product) => {
    set((state) => {
      const existing = state.cartItems.find((item) => item.id === product.id);
      const cartItems = existing
        ? state.cartItems.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        : [...state.cartItems, { ...product, quantity: 1 }];

      return {
        cartItems,
        lastAddedId: product.id,
        cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      };
    });
  },
  clearLastAdded: () => set({ lastAddedId: null }),
}));
