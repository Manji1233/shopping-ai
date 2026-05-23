import Link from "next/link";

const groups = [
  {
    name: "宠物",
    items: [
      { name: "猫粮 7kg", usage: "预计 5 天后用尽", tip: "建议本周补货" },
      { name: "猫砂 2 袋", usage: "预计 12 天后用尽", tip: "可等大促" },
    ],
  },
  {
    name: "母婴",
    items: [
      { name: "婴儿湿巾 6 包", usage: "预计 12 天后用尽", tip: "库存偏低" },
      { name: "宝宝面霜 2 支", usage: "替代款已上架", tip: "原常购款断货" },
    ],
  },
  {
    name: "清洁",
    items: [
      { name: "洗衣液 3kg", usage: "预计 18 天后用尽", tip: "可与抽纸凑单" },
      { name: "厨房湿巾 4 包", usage: "库存充足", tip: "下月再补" },
    ],
  },
];

export default function PantryPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#f6f7fb] pb-28">
      <section className="bg-white px-4 pb-4 pt-8 shadow-sm">
        <Link href="/" className="text-sm text-zinc-500">
          ← 返回 AI 管家
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-900">家庭 AI 仓库</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          按家庭成员和品类维护常购品，系统会根据消耗周期自动判断补货时机。
        </p>
      </section>

      <section className="space-y-4 px-4 pt-4">
        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="text-xl font-semibold text-zinc-900">12</div>
            <div className="mt-1 text-xs text-zinc-500">常购品</div>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="text-xl font-semibold text-amber-500">4</div>
            <div className="mt-1 text-xs text-zinc-500">待补货</div>
          </div>
          <div className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="text-xl font-semibold text-emerald-600">3</div>
            <div className="mt-1 text-xs text-zinc-500">降价中</div>
          </div>
        </div>

        {groups.map((group) => (
          <section key={group.name} className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">{group.name}</h2>
              <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-500">
                {group.items.length} 项
              </span>
            </div>
            <div className="mt-4 space-y-3">
              {group.items.map((item) => (
                <div key={item.name} className="rounded-2xl border border-zinc-200 p-3">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-sm font-medium text-zinc-900">{item.name}</h3>
                      <p className="mt-1 text-sm text-zinc-500">{item.usage}</p>
                    </div>
                    <button className="rounded-full bg-[var(--primary-soft)] px-3 py-1 text-xs font-medium text-[var(--primary)]">
                      生成补货建议
                    </button>
                  </div>
                  <div className="mt-2 rounded-2xl bg-zinc-50 px-3 py-2 text-sm text-zinc-700">
                    {item.tip}
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </section>

      <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-zinc-200 bg-white/95 px-3 py-3 backdrop-blur">
        <Link href="/" className="text-xs text-zinc-500">AI管家</Link>
        <Link href="/pantry" className="flex flex-col items-center gap-1 text-xs font-medium text-[var(--primary)]">
          <span>家庭仓库</span>
          <span className="h-1.5 w-6 rounded-full bg-[var(--primary)]" />
        </Link>
        <Link href="/cart" className="text-xs text-zinc-500">计划单</Link>
        <Link href="/alerts" className="text-xs text-zinc-500">消息</Link>
      </nav>
    </main>
  );
}
