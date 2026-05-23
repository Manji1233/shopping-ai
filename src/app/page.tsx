import Image from "next/image";
import Link from "next/link";

type Recommendation = {
  id: number;
  title: string;
  price: string;
  fit: string;
  reason: string;
  caution: string;
  badge: string;
  image: string;
};

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

const recommendations: Recommendation[] = [
  {
    id: 1,
    title: "抽纸",
    price: "¥40",
    fit: "家庭日用 / 高频消耗",
    reason: "适合放入家庭常购清单，补货频次高，适合作为日用品优先项。",
    caution: "建议结合家庭仓储空间决定一次性购买数量。",
    badge: "刚需必备",
    image: "/products/tissue.png",
  },
  {
    id: 2,
    title: "耳机",
    price: "¥1625",
    fit: "个人数码 / 品质消费",
    reason: "适合作为高客单商品单独决策，重点比较佩戴体验与音质口碑。",
    caution: "建议结合佩戴习惯和降噪需求再做最终选择。",
    badge: "品质优先",
    image: "/products/headphones.png",
  },
  {
    id: 3,
    title: "面膜",
    price: "¥120",
    fit: "个人护理 / 日常复购",
    reason: "适合纳入家庭个护分组，方便和其他日用品一起规划采购。",
    caution: "敏感肌建议优先确认成分和适用肤质。",
    badge: "日常复购",
    image: "/products/mask.png",
  },
  {
    id: 4,
    title: "香水",
    price: "¥1520",
    fit: "个护香氛 / 礼赠场景",
    reason: "适合在礼物或个人消费场景中单独推荐，强调风格和品牌偏好。",
    caution: "香型主观差异大，建议增加试香或同香调替代建议。",
    badge: "礼赠场景",
    image: "/products/perfume.png",
  },
  {
    id: 5,
    title: "婴儿纸尿裤",
    price: "¥180",
    fit: "母婴家庭 / 刚需补货",
    reason: "适合作为家庭 AI 仓库重点关注品类，便于做周期补货提醒。",
    caution: "需结合尺码、体重区间和夜用需求做更细分推荐。",
    badge: "母婴刚需",
    image: "/products/diapers.jpg",
  },
];

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
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm/6 text-white/85">家庭服务型 AI 购物管家</p>
            <h1 className="text-2xl font-semibold">家采AI</h1>
          </div>
          <div className="rounded-full bg-white/20 px-3 py-1 text-xs">演示级 MVP</div>
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
        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-2xl bg-[var(--primary-soft)] text-lg text-[var(--primary)]">
              AI
            </div>
            <div className="flex-1">
              <p className="text-sm text-zinc-500">对话入口</p>
              <h2 className="text-lg font-semibold text-zinc-900">你可以直接说需求</h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                例如：帮三口之家补一周生活用品，优先性价比高、配送快、评价稳定。
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button className="flex-1 rounded-2xl bg-[var(--foreground)] px-4 py-3 text-sm font-medium text-white">
              文字提问
            </button>
            <button className="rounded-2xl bg-[var(--primary-soft)] px-4 py-3 text-sm font-medium text-[var(--primary)]">
              语音输入
            </button>
            <button className="rounded-2xl bg-[var(--primary-soft)] px-4 py-3 text-sm font-medium text-[var(--primary)]">
              拍照提问
            </button>
          </div>

          <div className="mt-3 rounded-2xl bg-zinc-50 p-3 text-sm leading-6 text-zinc-600">
            当前为演示版：语音与拍照入口已按手机交互预留，后续可接入语音识别和图片理解服务。
          </div>

          <div className="mt-4 grid gap-2">
            {quickPrompts.map((prompt) => (
              <div key={prompt} className="rounded-2xl border border-[var(--line)] bg-zinc-50 px-3 py-3 text-sm text-zinc-700">
                {prompt}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">多模态体验</p>
              <h2 className="text-lg font-semibold">手机端输入方式</h2>
            </div>
            <span className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-500">
              App 风格 H5
            </span>
          </div>
          <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
            <div className="rounded-2xl border border-zinc-200 p-3">
              <p className="text-sm font-medium text-zinc-900">文字</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">适合复杂家庭采购需求描述与追问。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-3">
              <p className="text-sm font-medium text-zinc-900">语音</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">适合老人、宝妈、做家务时的免打字输入。</p>
            </div>
            <div className="rounded-2xl border border-zinc-200 p-3">
              <p className="text-sm font-medium text-zinc-900">拍照</p>
              <p className="mt-2 text-xs leading-5 text-zinc-500">适合拍空瓶、货架、现有商品后直接提问。</p>
            </div>
          </div>

        </div>

        <div className="rounded-3xl bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-zinc-500">AI 推荐结果</p>
              <h2 className="text-lg font-semibold">本次推荐的 5 件商品</h2>
            </div>
            <Link href="/cart" className="text-sm font-medium text-[var(--primary)]">
              去计划单
            </Link>
          </div>
          <div className="mt-4 space-y-3">
            {recommendations.map((item) => (
              <article key={item.id} className="rounded-3xl border border-[var(--line)] bg-white p-4">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-zinc-100">
                    <Image src={item.image} alt={item.title} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="inline-flex rounded-full bg-[var(--primary-soft)] px-2.5 py-1 text-xs font-medium text-[var(--primary)]">
                          {item.badge}
                        </div>
                        <h3 className="mt-2 text-base font-semibold text-zinc-900">{item.title}</h3>
                        <p className="mt-1 text-sm text-zinc-500">{item.fit}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold text-zinc-900">{item.price}</div>
                        <div className="text-xs text-emerald-600">可加入家庭计划</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 rounded-2xl bg-zinc-50 p-3 text-sm leading-6 text-zinc-700">
                  <p><span className="font-medium text-zinc-900">推荐理由：</span>{item.reason}</p>
                  <p className="mt-2"><span className="font-medium text-zinc-900">注意点：</span>{item.caution}</p>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-2xl bg-[var(--foreground)] px-3 py-2.5 text-sm font-medium text-white">
                    加入计划单
                  </button>
                  <button className="rounded-2xl border border-[var(--line)] px-3 py-2.5 text-sm font-medium text-zinc-700">
                    查看替代
                  </button>
                </div>
              </article>
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

      <nav className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-zinc-200 bg-white/95 px-3 py-3 backdrop-blur md:max-w-3xl md:rounded-t-[28px]">
        <Link href="/" className="flex flex-col items-center gap-1 text-xs font-medium text-[var(--primary)]">
          <span>AI管家</span>
          <span className="h-1.5 w-6 rounded-full bg-[var(--primary)]" />
        </Link>
        <Link href="/pantry" className="text-xs text-zinc-500">家庭仓库</Link>
        <Link href="/cart" className="text-xs text-zinc-500">计划单</Link>
        <Link href="/alerts" className="text-xs text-zinc-500">消息</Link>
      </nav>
    </main>
  );
}
