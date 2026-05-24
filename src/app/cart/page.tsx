"use client";

import Image from "next/image";
import Link from "next/link";

import { BottomNav } from "@/components/bottom-nav";
import { useShoppingStore } from "@/lib/store";

export default function CartPage() {
  const cartItems = useShoppingStore((state) => state.cartItems);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#f6f7fb] pb-32 md:my-8 md:min-h-[calc(100vh-4rem)] md:max-w-3xl md:rounded-[32px] md:bg-white md:shadow-[0_12px_48px_rgba(15,23,42,0.08)]">
      <section className="bg-white px-4 pb-4 pt-8 shadow-sm md:px-8 md:pt-10">
        <Link href="/" className="text-sm text-zinc-500">
          ← 返回 AI 管家
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-900">购物车</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          这里展示你刚刚加入的商品，方便继续确认家庭采购顺序与模拟下单。
        </p>
      </section>

      <section className="space-y-4 px-4 pt-4 md:px-8 md:pb-32 md:pt-6">
        <div className="rounded-3xl bg-[linear-gradient(135deg,#111827_0%,#374151_100%)] p-4 text-white shadow-sm">
          <p className="text-sm text-white/70">购物车概览</p>
          <h2 className="mt-1 text-lg font-semibold">当前共 {cartItems.reduce((sum, item) => sum + item.quantity, 0)} 件商品</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">
            当前合计金额 ¥{total}。你可以继续返回首页提问，或继续加入更多家庭采购商品。
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="rounded-3xl bg-white p-6 text-center shadow-sm">
            <h2 className="text-lg font-semibold text-zinc-900">购物车还是空的</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              先去首页提问，或者把感兴趣的商品加入购物车，这里就会实时同步展示。
            </p>
            <Link
              href="/"
              className="mt-4 inline-flex rounded-2xl bg-[var(--foreground)] px-4 py-3 text-sm font-medium text-white"
            >
              去首页加购
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {cartItems.map((item) => (
              <article key={item.id} className="rounded-3xl bg-white p-4 shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex flex-1 items-start justify-between gap-3">
                    <div>
                      <h3 className="text-base font-semibold text-zinc-900">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-500">{item.reason}</p>
                      <p className="mt-2 text-xs text-zinc-500">数量：{item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-semibold text-zinc-900">¥{item.price}</div>
                      <div className="text-xs text-emerald-600">小计 ¥{item.price * item.quantity}</div>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <h2 className="text-lg font-semibold text-zinc-900">模拟确认下单</h2>
          <div className="mt-4 space-y-3 text-sm text-zinc-700">
            <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-3 py-3">
              <span>收货人</span>
              <span>王女士 · 家庭默认地址</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-3 py-3">
              <span>配送偏好</span>
              <span>今晚前送达优先</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-zinc-50 px-3 py-3">
              <span>支付方式</span>
              <span>模拟支付</span>
            </div>
          </div>
          <button
            disabled={cartItems.length === 0}
            className="mt-4 w-full rounded-2xl bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {cartItems.length === 0 ? "请先加入商品" : "一步模拟下单"}
          </button>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
