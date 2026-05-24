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
  cartCount: number;
  sendMessage: (content: string) => void;
  addToCart: (product: Product) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearLastAdded: () => void;
};

const initialAssistantMessage: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "你好，我是家采AI。你可以告诉我想给谁买、预算多少、主要用途是什么，我会按家庭采购思路给你更像导购的建议。",
};

const getMatchedProducts = (question: string) => {
  const keywords = [
    { keyword: "抽纸", product: products[0] },
    { keyword: "耳机", product: products[1] },
    { keyword: "面膜", product: products[2] },
    { keyword: "香水", product: products[3] },
    { keyword: "纸尿裤", product: products[4] },
    { keyword: "婴儿", product: products[4] },
    { keyword: "母婴", product: products[4] },
  ];

  return keywords
    .filter(({ keyword }) => question.includes(keyword))
    .map(({ product }) => product)
    .filter((product, index, list) => list.findIndex((item) => item.id === product.id) === index);
};

const buildReply = (question: string) => {
  const matchedProducts = getMatchedProducts(question);
  const mentionsBudget = question.includes("预算") || question.includes("元") || question.includes("块");
  const mentionsSavings = question.includes("省") || question.includes("凑单") || question.includes("优惠");
  const mentionsFamily = question.includes("家庭") || question.includes("日用品") || question.includes("补货");
  const mentionsElder = question.includes("老人");
  const mentionsBaby = question.includes("母婴") || question.includes("婴儿") || question.includes("宝宝");

  if (matchedProducts.length > 0) {
    const [primary, secondary] = matchedProducts;
    let reply = `如果你现在重点在看${primary.title}，我会先把它当作这次采购的主推荐。当前价格是 ¥${primary.price}，${primary.reason}`;

    if (mentionsBudget) {
      reply += " 从预算角度看，这样更方便你先判断是否值得加入购物车，再和其他商品一起做取舍。";
    } else {
      reply += " 先加入购物车会更方便你后面继续比较和组合采购。";
    }

    reply += ` 需要留意的是：${primary.caution}`;

    if (secondary) {
      reply += ` 如果你愿意，我下一步也可以把${secondary.title}一起帮你做对比，给你一份更完整的采购建议。`;
    } else if (mentionsBaby) {
      reply += " 如果这是母婴场景，我还可以继续帮你搭配纸尿裤这类高频刚需，做成更完整的补货单。";
    } else if (mentionsElder) {
      reply += " 如果是给老人使用，我也可以继续按易用性、舒适度和踩坑点帮你细化建议。";
    } else {
      reply += " 如果你愿意，我还可以继续帮你从适用人群、场景和价格带再细化一轮。";
    }

    return reply;
  }

  if (mentionsSavings) {
    return "如果你这次重点是省钱和凑单，我会建议你先把抽纸、纸尿裤这类家庭高频刚需加入购物车，再决定耳机、香水这类高客单商品。这样不仅更容易看清总预算，也更方便后面做满减和取舍。你如果愿意，我下一步可以直接按‘刚需优先’帮你整理一份采购顺序。";
  }

  if (mentionsBaby) {
    return "如果这次是母婴采购，我会优先关注纸尿裤这类高频刚需，因为它更适合先锁定数量和预算。后面再补充其他母婴或个护商品，会比一次性全买更好控制总价。你如果愿意，我可以继续按‘200 元内’或‘一周补货’的思路帮你细化。";
  }

  if (mentionsElder) {
    return "如果是给老人选商品，我通常会先看使用门槛、舒适度和稳定口碑，而不是只看参数。你可以继续告诉我更在意价格、操作难度还是使用体验，我会按真实导购的方式帮你缩小范围。";
  }

  if (mentionsFamily) {
    return "如果你现在是在做家庭补货，我建议先从高频刚需开始，比如抽纸、纸尿裤，再补面膜这类复购型个护商品。这样更符合家庭采购顺序，也更容易控制预算。如果你愿意，我可以下一步直接按‘一周补货’或‘本月补货’帮你列一个推荐清单。";
  }

  return "我已经理解你的需求了。你可以继续告诉我更具体的预算、使用人群或想解决的场景，我会按导购的方式帮你一步步缩小选择范围；也可以直接把你觉得合适的商品先加入购物车，再一起比较。";
};

const summarizeCount = (cartItems: CartItem[]) =>
  cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
        cartCount: summarizeCount(cartItems),
      };
    });
  },
  increaseQuantity: (id) => {
    set((state) => {
      const cartItems = state.cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      );

      return {
        cartItems,
        cartCount: summarizeCount(cartItems),
      };
    });
  },
  decreaseQuantity: (id) => {
    set((state) => {
      const cartItems = state.cartItems
        .map((item) => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter((item) => item.quantity > 0);

      return {
        cartItems,
        cartCount: summarizeCount(cartItems),
      };
    });
  },
  removeFromCart: (id) => {
    set((state) => {
      const cartItems = state.cartItems.filter((item) => item.id !== id);

      return {
        cartItems,
        cartCount: summarizeCount(cartItems),
      };
    });
  },
  clearLastAdded: () => set({ lastAddedId: null }),
}));
