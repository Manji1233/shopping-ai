export type Product = {
  id: number;
  title: string;
  price: number;
  fit: string;
  reason: string;
  caution: string;
  badge: string;
  image: string;
};

export const products: Product[] = [
  {
    id: 1,
    title: "抽纸",
    price: 40,
    fit: "家庭日用 / 高频消耗",
    reason: "适合放入家庭常购清单，补货频次高，适合作为日用品优先项。",
    caution: "建议结合家庭仓储空间决定一次性购买数量。",
    badge: "刚需必备",
    image: "/products/tissue.png",
  },
  {
    id: 2,
    title: "耳机",
    price: 1625,
    fit: "个人数码 / 品质消费",
    reason: "适合作为高客单商品单独决策，重点比较佩戴体验与音质口碑。",
    caution: "建议结合佩戴习惯和降噪需求再做最终选择。",
    badge: "品质优先",
    image: "/products/headphones.png",
  },
  {
    id: 3,
    title: "面膜",
    price: 120,
    fit: "个人护理 / 日常复购",
    reason: "适合纳入家庭个护分组，方便和其他日用品一起规划采购。",
    caution: "敏感肌建议优先确认成分和适用肤质。",
    badge: "日常复购",
    image: "/products/mask.png",
  },
  {
    id: 4,
    title: "香水",
    price: 1520,
    fit: "个护香氛 / 礼赠场景",
    reason: "适合在礼物或个人消费场景中单独推荐，强调风格和品牌偏好。",
    caution: "香型主观差异大，建议增加试香或同香调替代建议。",
    badge: "礼赠场景",
    image: "/products/perfume.png",
  },
  {
    id: 5,
    title: "婴儿纸尿裤",
    price: 180,
    fit: "母婴家庭 / 刚需补货",
    reason: "适合作为家庭 AI 仓库重点关注品类，便于做周期补货提醒。",
    caution: "需结合尺码、体重区间和夜用需求做更细分推荐。",
    badge: "母婴刚需",
    image: "/products/diapers.jpg",
  },
];
