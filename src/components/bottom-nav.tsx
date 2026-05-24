"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useShoppingStore } from "@/lib/store";

const items = [
  { href: "/", label: "AI管家" },
  { href: "/pantry", label: "家庭仓库" },
  { href: "/cart", label: "购物车" },
  { href: "/alerts", label: "消息" },
];

export function BottomNav() {
  const pathname = usePathname();
  const cartCount = useShoppingStore((state) => state.cartCount);

  return (
    <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-zinc-200 bg-white/95 px-3 py-3 backdrop-blur md:max-w-3xl md:rounded-t-[28px]">
      {items.map((item) => {
        const active = pathname === item.href;
        const isCart = item.href === "/cart";

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-col items-center gap-1 text-xs ${active ? "font-medium text-[var(--primary)]" : "text-zinc-500"}`}
          >
            <span className="relative">
              {item.label}
              {isCart && cartCount > 0 ? (
                <span className="absolute -right-4 -top-2 rounded-full bg-[var(--primary)] px-1.5 py-0.5 text-[10px] text-white">
                  {cartCount}
                </span>
              ) : null}
            </span>
            {active ? <span className="h-1.5 w-6 rounded-full bg-[var(--primary)]" /> : null}
          </Link>
        );
      })}
    </nav>
  );
}
