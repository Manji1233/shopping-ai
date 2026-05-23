import Link from "next/link";

const alerts = [
  {
    title: "降价提醒",
    detail: "常买猫粮直降 12%，今晚 24:00 前可下单。",
    action: "去比价",
  },
  {
    title: "补货提醒",
    detail: "婴儿湿巾预计 12 天后用尽，建议这周内补 1 次。",
    action: "生成补货单",
  },
  {
    title: "凑单提醒",
    detail: "再加 1 件抽纸可达满减门槛，预计额外省 ¥8。",
    action: "加入计划单",
  },
  {
    title: "母婴补货提醒",
    detail: "婴儿纸尿裤已进入建议补货周期，可直接加入家庭计划单。",
    action: "去补货",
  },
];

export default function AlertsPage() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#f6f7fb] pb-28">
      <section className="bg-white px-4 pb-4 pt-8 shadow-sm">
        <Link href="/" className="text-sm text-zinc-500">
          ← 返回 AI 管家
        </Link>
        <h1 className="mt-3 text-2xl font-semibold text-zinc-900">消息中心</h1>
        <p className="mt-2 text-sm leading-6 text-zinc-600">
          由 AI 主动推送高价值家庭采购信息，而不是等你再次搜索。
        </p>
      </section>

      <section className="space-y-4 px-4 pt-4">
        {alerts.map((alert) => (
          <article key={alert.title} className="rounded-3xl bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-zinc-900">{alert.title}</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{alert.detail}</p>
              </div>
              <button className="rounded-full bg-[var(--primary-soft)] px-3 py-1.5 text-xs font-medium text-[var(--primary)]">
                {alert.action}
              </button>
            </div>
          </article>
        ))}
      </section>

      <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-zinc-200 bg-white/95 px-3 py-3 backdrop-blur">
        <Link href="/" className="text-xs text-zinc-500">AI管家</Link>
        <Link href="/pantry" className="text-xs text-zinc-500">家庭仓库</Link>
        <Link href="/cart" className="text-xs text-zinc-500">计划单</Link>
        <Link href="/alerts" className="flex flex-col items-center gap-1 text-xs font-medium text-[var(--primary)]">
          <span>消息</span>
          <span className="h-1.5 w-6 rounded-full bg-[var(--primary)]" />
        </Link>
      </nav>
    </main>
  );
}
