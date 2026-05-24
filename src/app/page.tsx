import Link from "next/link";

import { BottomNav } from "@/components/bottom-nav";
import { ChatPanel } from "@/components/chat-panel";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/data/products";

type PantryItem = {
  id: number;
  name: string;
  leftDays: number;
  status: string;
  tag: string;
};

type AlertItem = {
  id: number;
  title: string;
  detail: string;
  tone: string;
};

const pantry: PantryItem[] = [
  { id: 1, name: "猫粮 7kg", leftDays: 5, status: "即将用尽", tag: "宠物" },
  { id: 2, name: "婴儿湿巾 6 包", leftDays: 12, status: "建议补货", tag: "母婴" },
  { id: 3, name: "洗洁精 2 瓶", leftDays: 18, status: "库存充足", tag: "厨房" },
];

const alerts: AlertItem[] = [
  {
    id: 1,
    title: "猫粮降价提醒",
    detail: "常买品牌直降 12%，今晚 24:00 前有效。",
    tone: "bg-emerald-50 text-emerald-700",
  },
  {
    id: 2,
    title: "纸品可凑单",
    detail: "再加 1 件抽纸可触发满减，预计多省 ¥8。",
    tone: "bg-amber-50 text-amber-700",
  },
  {
    id: 3,
    title: "替代品推荐",
    detail: "你拍过的那款宝宝面霜断货，可替换为低敏同类款。",
    tone: "bg-blue-50 text-blue-700",
  },
];

const quickPrompts = [
  "帮三口之家补一周日用品",
  "适合老人用的静音破壁机，预算 500 内",
  "拍一下家里快用完的东西，帮我列补货单",
  "帮我看看购物车怎么凑单最省钱",
];

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col bg-white shadow-[0_12px_48px_rgba(15,23,42,0.08)] md:my-8 md:min-h-[calc(100vh-4rem)] md:max-w-3xl md:rounded-[32px]">
      <section className="bg-[linear-gradient(135deg,#ff835d_0%,#ffb38b_100%)] px-5 pb-6 pt-8 text-white md:px-8 md:pt-10">
        <div>
          <p className="text-sm/6 text-white/85">家庭服务型 AI 购物管家</p>
          <h1 className="text-2xl font-semibold">家采AI</h1>
        </div>
        <div className="mt-5 rounded-3xl bg-white/16 p-4 backdrop-blur">
          <p className="text-sm text-white/85">今天适合处理</p>
          <div className="mt-3 grid grid-cols-3 gap-3 text-center text-xs">
            <div className="rounded-2xl bg-white/15 px-3 py-3">
              <div className="text-lg font-semibold">3</div>
              <div>补货提醒</div>
            </div>
            <div className="rounded-2xl bg-white/15 px-3 py-3">
              <div className="text-lg font-semibold">2</div>
              <div>降价机会</div>
            </div>
            <div className="rounded-2xl bg-white/15 px-3 py-3">
              <div className="text-lg font-semibold">1</div>
              <div>待确认订单</div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 space-y-5 bg-[#f6f7fb] px-4 pb-28 pt-4 md:px-8 md:pb-32 md:pt-6">
        <ChatPanel quickPrompts={quickPrompts} />


        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">AI 推荐结果</p>
              <h2 className="text-lg font-semibold">本次推荐的 5 件商品</h2>
            </div>
            <Link href="/cart" className="text-sm font-medium text-[var(--primary)]">
              去购物车
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <Link href="/pantry" className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-500">家庭 AI 仓库</p>
            <h3 className="mt-1 text-lg font-semibold">{pantry.length} 项常购品</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">记录家庭成员偏好、库存周期、常买分组与补货建议。</p>
          </Link>
          <Link href="/alerts" className="rounded-3xl bg-white p-4 shadow-sm">
            <p className="text-sm text-zinc-500">主动提醒</p>
            <h3 className="mt-1 text-lg font-semibold">4 类高价值消息</h3>
            <p className="mt-3 text-sm leading-6 text-zinc-600">包括降价提醒、补货提醒、凑单提醒和替代品提醒。</p>
          </Link>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">今日消息</p>
              <h2 className="text-lg font-semibold">AI 主动服务</h2>
            </div>
            <Link href="/alerts" className="text-sm font-medium text-[var(--primary)]">
              全部消息
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {alerts.map((item) => (
              <div key={item.id} className="rounded-2xl border border-[var(--line)] bg-zinc-50 p-3">
                <div className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${item.tone}`}>
                  {item.title}
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-700">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}
