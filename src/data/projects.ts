export type ProjectCategory = "commerce" | "local" | "saas";

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
  { label: "Все", value: "all" },
  { label: "Витрины", value: "commerce" },
  { label: "Бизнес", value: "local" },
  { label: "Продукты", value: "saas" }
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
    tagline: "Лендинг кофейного бренда: визуал, навигация, товары и заявка.",
    scope: "Design, frontend, deploy"
  },
  {
    slug: "spelo",
    title: "СПЕЛО",
    category: "commerce",
    kind: "Farm shop",
    year: "2026",
    image: "spelo.jpg",
    url: "https://maks1son.github.io/spelo/",
    tagline: "Фермерская витрина с продуктовой подачей, каталогом и доверием.",
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
    tagline: "Сайт услуги: доверие, направления работы и понятный путь к заявке.",
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
    tagline: "Сайт кофейни с меню, атмосферой и цельной визуальной системой.",
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
    tagline: "Премиальный сайт для барбершопа и клуба с плотной атмосферой.",
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
    tagline: "Сайт гостиницы: номера, доверие, локальный спрос и бронирование.",
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
    tagline: "Продуктовый лендинг для аналитики Telegram и соцмедиа.",
    scope: "Static, product story"
  }
];
