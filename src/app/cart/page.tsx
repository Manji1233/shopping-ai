import Image from "next/image";
import Link from "next/link";

const cartItems = [
  { name: "抽纸", price: "¥40", tip: "适合作为家庭日用品优先凑单项", image: "/products/tissue.png" },
  { name: "婴儿纸尿裤", price: "¥180", tip: "母婴刚需，建议优先加入补货计划", image: "/products/diapers.jpg" },
  { name: "面膜", price: "¥120", tip: "可与个护商品一起形成月度采购单", image: "/products/mask.png" },
  { name: "香水", price: "¥1520", tip: "适合作为礼赠或个人消费单独决策", image: "/products/perfume.png" },
  { name: "耳机", price: "¥1625", tip: "高客单商品建议单独确认预算与需求", image: "/products/headphones.png" },
];

export default function CartPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#f6f7fb] pb-32">
      <section className="bg-white px-4 pb-4 pt-8 shadow-sm">
        <Link href="/" className="text-sm text-zinc-500">
          ← 返回 AI 管家
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-900">计划单 / 购物车</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          这里展示 AI 帮你整理好的购买计划、优惠建议与模拟下单流程。
        </p>
      </section>

      <section className="space-y-4 px-4 pt-4">
        <div className="rounded-3xl bg-[linear-gradient(135deg,#111827_0%,#374151_100%)] p-4 text-white shadow-sm">
          <p className="text-sm text-white/70">AI 优惠决策</p>
          <h2 className="mt-1 text-lg font-semibold">当前已整理 5 件候选商品</h2>
          <p className="mt-2 text-sm leading-6 text-white/80">
            可先处理抽纸和婴儿纸尿裤等家庭刚需，再单独确认耳机和香水这类高客单商品。
          </p>
        </div>

        <div className="space-y-3">
          {cartItems.map((item) => (
            <article key={item.name} className="rounded-3xl bg-white p-4 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex flex-1 items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-zinc-900">{item.name}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-500">{item.tip}</p>
                  </div>
                  <div className="text-base font-semibold text-zinc-900">{item.price}</div>
                </div>
              </div>
            </article>
          ))}
        </div>

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
          <button className="mt-4 w-full rounded-2xl bg-[var(--primary)] px-4 py-3 text-sm font-medium text-white">
            一步模拟下单
          </button>
        </div>
      </section>

      <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-zinc-200 bg-white/95 px-3 py-3 backdrop-blur">
        <Link href="/" className="text-xs text-zinc-500">AI管家</Link>
        <Link href="/pantry" className="text-xs text-zinc-500">家庭仓库</Link>
        <Link href="/cart" className="flex flex-col items-center gap-1 text-xs font-medium text-[var(--primary)]">
          <span>计划单</span>
          <span className="h-1.5 w-6 rounded-full bg-[var(--primary)]" />
        </Link>
        <Link href="/alerts" className="text-xs text-zinc-500">消息</Link>
      </nav>
    </main>
  );
}
