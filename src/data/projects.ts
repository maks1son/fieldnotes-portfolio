export type ProjectCategory = "commerce" | "local" | "saas" | "app";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  kind: string;
  year: string;
  image: string;
  url: string;
  tagline: string;
  scope: string;
};

export type ProjectFilter = {
  label: string;
  value: "all" | ProjectCategory;
};

export const filters: ProjectFilter[] = [
  { label: "All", value: "all" },
  { label: "Commerce", value: "commerce" },
  { label: "Local business", value: "local" },
  { label: "SaaS", value: "saas" },
  { label: "Apps", value: "app" }
];

export const projects: Project[] = [
  {
    slug: "58coffee-shop",
    title: "58 Кофе: лендинг",
    category: "commerce",
    kind: "E-commerce",
    year: "2026",
    image: "58-coffee-shop.jpg",
    url: "https://58coffee-shop.expo.app",
    tagline: "Продающая витрина кофейного бренда с публичным deploy.",
    scope: "Design, frontend, deploy"
  },
  {
    slug: "58coffee-app",
    title: "58 Кофе: приложение",
    category: "app",
    kind: "PWA / App",
    year: "2026",
    image: "58-coffee-app.jpg",
    url: "https://58coffee.expo.app",
    tagline: "Веб-версия приложения как отдельный продуктовый кейс.",
    scope: "Product UI, web app"
  },
  {
    slug: "spelo",
    title: "СПЕЛО",
    category: "commerce",
    kind: "Farm shop",
    year: "2026",
    image: "spelo.jpg",
    url: "https://maks1son.github.io/spelo/",
    tagline: "Магазин фермерских ягод и фруктов с живой продуктовой подачей.",
    scope: "React, frontend, deploy"
  },
  {
    slug: "ro63",
    title: "РусОценка",
    category: "local",
    kind: "Service website",
    year: "2026",
    image: "ro63.jpg",
    url: "https://maks1son.github.io/ro63/",
    tagline: "Сайт оценочной компании: доверие, услуги, структура обращения.",
    scope: "React, content, deploy"
  },
  {
    slug: "mint-and-coffee",
    title: "Mint & Coffee",
    category: "local",
    kind: "Coffee shop",
    year: "2026",
    image: "mint-and-coffee.jpg",
    url: "https://maks1son.github.io/mint-and-coffee/",
    tagline: "Кофейня с мятным акцентом, меню и цельной визуальной системой.",
    scope: "Next.js, imagery, export"
  },
  {
    slug: "cigar",
    title: "CIGAR",
    category: "local",
    kind: "Barbershop",
    year: "2026",
    image: "cigar.jpg",
    url: "https://maks1son.github.io/cigar/",
    tagline: "Барбершоп и сигарный клуб с плотной премиальной атмосферой.",
    scope: "Next.js, design, export"
  },
  {
    slug: "chaika",
    title: "Чайка",
    category: "local",
    kind: "Hotel",
    year: "2026",
    image: "chaika.jpg",
    url: "https://maks1son.github.io/chaika/",
    tagline: "Сайт гостиницы в Сызрани: номера, доверие, локальный спрос.",
    scope: "Next.js, hospitality"
  },
  {
    slug: "pulsefeed",
    title: "Pulsefeed",
    category: "saas",
    kind: "SaaS landing",
    year: "2026",
    image: "pulsefeed.jpg",
    url: "https://maks1son.github.io/pulsefeed/",
    tagline: "Лендинг продукта для аналитики Telegram и соцмедиа.",
    scope: "Static, product story"
  }
];
