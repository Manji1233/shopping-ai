"use client";

import Image from "next/image";

import { type Product } from "@/lib/data/products";
import { useShoppingStore } from "@/lib/store";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useShoppingStore((state) => state.addToCart);
  const lastAddedId = useShoppingStore((state) => state.lastAddedId);

  return (
    <article className="rounded-3xl border border-[var(--line)] bg-white p-4">
      <div className="flex items-start gap-3 md:gap-4">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
          <Image src={product.image} alt={product.title} fill className="object-cover" sizes="96px" />
        </div>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="inline-flex rounded-full bg-[var(--primary-soft)] px-2.5 py-1 text-xs font-medium text-[var(--primary)]">
                {product.badge}
              </div>
              <h3 className="mt-2 text-base font-semibold text-zinc-900">{product.title}</h3>
              <p className="mt-1 text-sm text-zinc-500">{product.fit}</p>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-zinc-900">¥{product.price}</div>
              <div className="text-xs text-emerald-600">可加入购物车</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3 rounded-2xl bg-zinc-50 p-3 text-sm leading-6 text-zinc-700">
        <p>
          <span className="font-medium text-zinc-900">推荐理由：</span>
          {product.reason}
        </p>
        <p className="mt-2">
          <span className="font-medium text-zinc-900">注意点：</span>
          {product.caution}
        </p>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={() => addToCart(product)}
          className="flex-1 rounded-2xl bg-[var(--foreground)] px-3 py-2.5 text-sm font-medium text-white"
        >
          {lastAddedId === product.id ? "已加入购物车" : "加入购物车"}
        </button>
        <button className="rounded-2xl border border-[var(--line)] px-3 py-2.5 text-sm font-medium text-zinc-700">
          查看替代
        </button>
      </div>
    </article>
  );
}
