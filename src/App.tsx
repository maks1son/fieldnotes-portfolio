import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform
} from "motion/react";
import { filters, projects, type Project, type ProjectCategory } from "./data/projects";

const asset = (file: string) => `${import.meta.env.BASE_URL}assets/${file}`;
const ease = [0.22, 1, 0.36, 1] as const;

type FilterValue = "all" | ProjectCategory;

function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reducedMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.72, ease }}
    >
      {children}
    </motion.div>
  );
}

function IntroScroll() {
  const ref = useRef<HTMLElement | null>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const imageY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -72]);
  const imageScale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.92, 1.04]);
  const titleY = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -28]);
  const opacity = useTransform(scrollYProgress, [0, 0.84, 1], [1, 1, 0]);

  return (
    <section className="intro-scroll" ref={ref} aria-label="Начало портфолио">
      <div className="intro-scroll__stage">
        <motion.div className="intro-scroll__title" style={{ y: titleY, opacity }}>
          <p>Максим</p>
          <span>Сайты, лендинги, интерфейсы</span>
        </motion.div>
        <motion.figure className="intro-scroll__frame" style={{ y: imageY, scale: imageScale, opacity }}>
          <img src={asset("portfolio-studio.jpg")} alt="" />
        </motion.figure>
        <motion.div className="intro-scroll__cue" style={{ opacity }}>
          <span>Scroll</span>
          <span aria-hidden="true">↓</span>
        </motion.div>
      </div>
    </section>
  );
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [count, setCount] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setCount(Math.round(latest * 100));
  });

  return (
    <>
      <div className="progress" aria-hidden="true">
        <motion.div className="progress__bar" style={{ scaleX: scrollYProgress }} />
      </div>
      <div className="scroll-count" aria-hidden="true">
        {count}%
      </div>
    </>
  );
}

function Header({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="В начало">
        <span>M.</span>
        <span>Portfolio</span>
      </a>
      <nav className="nav-pills" aria-label="Основная навигация">
        <a href="#work">Work<sup>{projects.length}</sup></a>
        <a href="#services">Services<sup>4</sup></a>
        <a href="#contact">Contact</a>
      </nav>
      <button className="menu-button" type="button" onClick={onMenuOpen}>
        Menu
      </button>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <Reveal>
          <div className="hero__kicker">
            <span>Portfolio index</span>
            <span>Deployed work</span>
            <span>Design, frontend, deploy</span>
          </div>
          <h1>
            Сайты, которые уже можно <em>показывать клиентам.</em>
          </h1>
          <p className="hero__text">
            Портфолио из живых проектов: лендинги, локальный бизнес, e-commerce и SaaS.
            Каждый кейс открывается по публичной ссылке, чтобы работу можно было
            проверить без длинных пояснений.
          </p>
          <div className="hero__actions">
            <a className="button button--dark" href="#work">Смотреть работы</a>
            <a className="button" href="https://github.com/maks1son" target="_blank" rel="noopener">
              GitHub maks1son
            </a>
          </div>
        </Reveal>

        <Reveal className="hero-card" >
          <div className="hero-card__media">
            <img src={asset("58-coffee-shop.jpg")} alt="Скриншот лендинга 58 Кофе" />
          </div>
          <div className="hero-card__caption">
            <strong>Живой кейс: 58 Кофе</strong>
            <span>Публичный лендинг, который можно открыть и проверить.</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Marquee() {
  const items = [
    "Landing pages",
    "Local business",
    "Product UI",
    "Static deploys",
    "Next.js exports",
    "Design systems"
  ];

  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track">
        {[...items, ...items].map((item, index) => (
          <span key={`${item}-${index}`}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectRow({
  project,
  index,
  active,
  onActivate
}: {
  project: Project;
  index: number;
  active: boolean;
  onActivate: () => void;
}) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.a
      className={`project-row ${active ? "is-active" : ""}`}
      href={project.url}
      target="_blank"
      rel="noopener"
      aria-label={`Открыть ${project.title}`}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      layout
    >
      <span className="project-row__number">{number}</span>
      <span>
        <span className="project-row__title">{project.title}</span>
        <span className="project-row__tagline">{project.tagline}</span>
      </span>
      <span className="project-row__meta">
        {project.kind}
        <br />
        {project.scope}
        <br />
        {project.year}
      </span>
      <span className="project-row__open">Live</span>
      <span className="project-row__mobile-image">
        <img src={asset(project.image)} alt={`Скриншот проекта ${project.title}`} loading="lazy" />
      </span>
    </motion.a>
  );
}

function WorkSection() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [activeSlug, setActiveSlug] = useState(projects[0].slug);

  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "all" || project.category === filter),
    [filter]
  );

  useEffect(() => {
    if (!visibleProjects.some((project) => project.slug === activeSlug)) {
      setActiveSlug(visibleProjects[0]?.slug ?? projects[0].slug);
    }
  }, [activeSlug, visibleProjects]);

  const activeProject = projects.find((project) => project.slug === activeSlug) ?? projects[0];
  const activeIndex = projects.findIndex((project) => project.slug === activeProject.slug);

  return (
    <section className="section section--work" id="work">
      <Reveal className="section-head">
        <div className="section-label">01 / Index</div>
        <div>
          <h2 className="section-title">Живые работы, сгруппированные как портфолио.</h2>
          <p className="section-copy">
            Сетка построена вокруг быстрых решений для клиента: открыть сайт, увидеть
            визуальный уровень, понять нишу и роль работы.
          </p>
        </div>
      </Reveal>

      <Reveal className="filters">
        {filters.map((item) => (
          <button
            className={`filter ${filter === item.value ? "is-active" : ""}`}
            type="button"
            key={item.value}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </button>
        ))}
      </Reveal>

      <div className="work-grid">
        <Reveal className="project-list">
          {visibleProjects.map((project) => {
            const index = projects.findIndex((item) => item.slug === project.slug);
            return (
              <ProjectRow
                key={project.slug}
                project={project}
                index={index}
                active={project.slug === activeSlug}
                onActivate={() => setActiveSlug(project.slug)}
              />
            );
          })}
        </Reveal>

        <Reveal className="preview-pane">
          <div className="preview-pane__image">
            <motion.img
              key={activeProject.slug}
              src={asset(activeProject.image)}
              alt={`Превью проекта ${activeProject.title}`}
              initial={{ opacity: 0.2, scale: 1.07 }}
              animate={{ opacity: 1, scale: 1.03 }}
              transition={{ duration: 0.48, ease }}
            />
          </div>
          <div className="preview-pane__caption">
            <div>
              <strong>{activeProject.title}</strong>
              <span>{activeProject.tagline}</span>
            </div>
            <span className="preview-pane__count">
              {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Capabilities() {
  const rows = [
    {
      title: "Лендинг под услугу",
      text: "Первый экран, структура, визуал, блоки доверия и понятный следующий шаг для заявки или покупки."
    },
    {
      title: "Редизайн витрины",
      text: "Если сайт уже есть, можно собрать более сильную подачу: типографика, сетка, изображения, адаптив и микроанимации."
    },
    {
      title: "Сайт для локального бизнеса",
      text: "Страницы услуг, доверие, адреса, преимущества и аккуратная подача без лишней сложности."
    },
    {
      title: "Публичный запуск",
      text: "Проект собирается, проверяется на экранах и публикуется по ссылке, которую удобно отправлять клиентам и партнерам."
    }
  ];

  return (
    <section className="section" id="services">
      <Reveal className="section-head">
        <div className="section-label">02 / Services</div>
        <div>
          <h2 className="section-title">Форматы работы.</h2>
          <p className="section-copy">
            Коротко о том, что можно заказать, если нужен сайт, который выглядит
            собранно и работает по публичной ссылке.
          </p>
        </div>
      </Reveal>

      <div className="capabilities">
        {rows.map((row, index) => (
          <Reveal className="capability" key={row.title}>
            <div className="capability__number">{String(index + 1).padStart(2, "0")}</div>
            <h3>{row.title}</h3>
            <p>{row.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <Reveal className="contact" >
      <section id="contact" className="contact__grid">
        <div>
          <p className="contact__eyebrow">03 / Contact</p>
          <h2>Нужен аккуратный сайт под задачу?</h2>
        </div>
        <div>
          <p>
            Подойдет для локального бизнеса, услуги, портфолио, продуктовой страницы
            или небольшой витрины. Можно начать с текущей идеи, ссылок на примеры
            и желаемого срока.
          </p>
          <div className="contact__actions">
            <a className="button button--dark" href="https://github.com/maks1son" target="_blank" rel="noopener">
              GitHub
            </a>
            <a className="button" href="#work">Смотреть работы</a>
          </div>
          <p className="contact__meta">Живые ссылки, дизайн, frontend и deploy в одном рабочем процессе.</p>
        </div>
      </section>
    </Reveal>
  );
}

function MenuOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  const links = [
    { href: "#work", number: "01", title: "Work", hint: `${projects.length} deployed works` },
    { href: "#services", number: "02", title: "Services", hint: "Site formats" },
    { href: "#contact", number: "03", title: "Contact", hint: "Project discussion" }
  ];

  return (
    <div className={`menu-overlay ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <div className="menu-overlay__top">
        <a className="brand" href="#top" onClick={onClose}>
          <span>M.</span>
          <span>Portfolio</span>
        </a>
        <button className="menu-close" type="button" onClick={onClose}>
          Close
        </button>
      </div>
      <div className="menu-overlay__body">
        {links.map((link) => (
          <a className="menu-link" href={link.href} onClick={onClose} key={link.href}>
            <span className="menu-link__num">{link.number}</span>
            <span className="menu-link__title">{link.title}</span>
            <span className="menu-link__hint">{link.hint}</span>
          </a>
        ))}
      </div>
      <div className="menu-overlay__foot">
        <span>Selected deployed websites</span>
        <span>Scroll, hover, open live work</span>
      </div>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <ScrollProgress />
      <Header onMenuOpen={() => setMenuOpen(true)} />
      <main id="top">
        <IntroScroll />
        <Hero />
        <Marquee />
        <WorkSection />
        <Capabilities />
        <Contact />
      </main>
      <footer className="site-footer">
        <span>Максим: portfolio</span>
        <span>Selected deployed websites</span>
      </footer>
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
