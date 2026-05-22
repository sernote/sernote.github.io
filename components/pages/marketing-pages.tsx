import Link from "next/link";
import { ArrowRight, ExternalLink, FileText, MessageSquare } from "lucide-react";
import type { ReactNode } from "react";

import { Badge } from "@/components/ui/badge";
import { FinalCta } from "@/components/marketing/final-cta";
import { FeaturedProjects } from "@/components/marketing/featured-projects";
import { Hero } from "@/components/marketing/hero";
import { MarketingPage } from "@/components/marketing/site-shell";
import { TalksPreview } from "@/components/marketing/talks-preview";
import { WritingPreview } from "@/components/marketing/writing-preview";
import { SectionCard } from "@/components/marketing/section-card";
import { Button } from "@/components/ui/button";
import {
  getDictionary,
  getExpertiseAreas,
  getPlatformLayers,
  getSiteConfig,
  localizedPath,
  type Locale
} from "@/lib/i18n";

type PageProps = {
  locale?: Locale;
  currentPath: string;
};

export function HomePageContent({ locale = "en", currentPath }: PageProps) {
  const dictionary = getDictionary(locale);
  const siteConfig = getSiteConfig(locale);
  const sections = dictionary.home.sections;
  const platformLayers = getPlatformLayers(locale);
  const expertiseAreas = getExpertiseAreas(locale);
  const projectLinks = dictionary.projects.slice(0, 3).map(([title, description, href]) => ({
    title,
    description,
    href: href.startsWith("http") ? href : localizedPath(href, locale)
  }));
  const mediaLinks = [
    {
      label: sections.writingTitle,
      title: locale === "ru" ? "Статьи на Habr и заметки в Telegram" : "Habr articles and Telegram notes",
      description: sections.writingCopy,
      href: localizedPath("/writing", locale)
    },
    {
      label: sections.talksTitle,
      title: locale === "ru" ? "Выступления и подкасты" : "Talks and podcasts",
      description: sections.talksCopy,
      href: localizedPath("/talks", locale)
    },
    {
      label: locale === "ru" ? "Открытый код" : "Open source",
      title: "audit-prompt-caching",
      description:
        locale === "ru"
          ? "Публичный пакет для аудита формы промпта и кешируемого префикса."
          : "A public package for auditing prompt shape and cacheable prefixes.",
      href: siteConfig.links.auditPromptCaching
    }
  ];

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <Hero locale={locale} />
      <section className="border-y border-border/70">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 md:grid-cols-4 lg:px-8">
          {dictionary.home.proof.map(([title, description]) => (
            <div key={title}>
              <p className="font-mono text-xs uppercase text-primary">{title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        <div className="max-w-xl">
          <p className="mb-3 font-mono text-xs uppercase text-primary">{sections.problemTitle}</p>
          <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">{sections.problemCopy}</h2>
          <p className="mt-5 text-lg leading-8 text-muted-foreground">
            {locale === "ru"
              ? "Главная сложность начинается после первого успешного вызова модели: стоимость, качество, задержка, ответственность и эксплуатация."
              : "The hard part starts after the first successful model call: cost, quality, latency, ownership and operations."}
          </p>
        </div>
        <div className="grid gap-0 border-t border-border/80">
          {dictionary.home.metrics.map((label, index) => (
            <div key={label} className="grid gap-4 border-b border-border/80 py-5 sm:grid-cols-[72px_1fr]">
              <span className="font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
              <p className="text-lg text-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="manual-surface overflow-hidden rounded-lg">
          <div className="grid gap-8 p-6 md:p-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="mb-3 font-mono text-xs uppercase text-primary">{sections.layersTitle}</p>
              <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">
                Production AI Platform Handbook
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground">{sections.layersCopy}</p>
              <Button asChild variant="outline" className="mt-7">
                <Link href={localizedPath("/handbook/platform-map", locale)}>
                  {locale === "ru" ? "Открыть карту" : "Open the map"}
                  <ArrowRight data-icon="inline-end" />
                </Link>
              </Button>
            </div>
            <div className="grid gap-0 border-t border-border/80 lg:border-t-0">
              {platformLayers.slice(0, 6).map((layer, index) => (
                <Link
                  key={layer.title}
                  href={localizedPath("/handbook/platform-map", locale)}
                  className="grid gap-3 border-b border-border/80 py-4 transition-colors hover:text-primary sm:grid-cols-[72px_0.75fr_1fr]"
                >
                  <span className="font-mono text-xs text-primary">L{String(index + 1).padStart(2, "0")}</span>
                  <span className="font-medium">{layer.title}</span>
                  <span className="text-sm leading-6 text-muted-foreground">{layer.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8">
        <div>
          <p className="mb-3 font-mono text-xs uppercase text-primary">{sections.projectsTitle}</p>
          <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">{sections.projectsCopy}</h2>
        </div>
        <div className="grid gap-0 border-t border-border/80">
          {projectLinks.map((project) => (
            <SmartLink key={project.title} href={project.href} className="group border-b border-border/80 py-6">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-xl font-semibold">{project.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">{project.description}</p>
                </div>
                <ArrowRight className="mt-1 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </SmartLink>
          ))}
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
        <div>
          <p className="mb-3 font-mono text-xs uppercase text-primary">{sections.expertiseTitle}</p>
          <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">{sections.expertiseCopy}</h2>
          <div className="mt-8 flex flex-wrap gap-2">
            {expertiseAreas.slice(0, 8).map((area) => (
              <Badge key={area} variant="muted" className="font-normal">
                {area}
              </Badge>
            ))}
          </div>
        </div>
        <div className="grid gap-4">
          {dictionary.home.engagements.map(([title, description]) => (
            <Link
              key={title}
              href={localizedPath("/contact", locale)}
              className="group border-t border-border/80 py-5 last:border-b"
            >
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h3 className="text-lg font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </div>
                <ArrowRight className="mt-1 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="mb-3 font-mono text-xs uppercase text-primary">
              {locale === "ru" ? "Публичный контур" : "Public work"}
            </p>
            <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">{siteConfig.author}</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">{dictionary.home.authorCopy}</p>
          </div>
          <div className="grid gap-0 border-t border-border/80">
            {mediaLinks.map((item) => (
              <SmartLink key={item.title} href={item.href} className="group border-b border-border/80 py-5">
                <p className="font-mono text-xs uppercase text-primary">{item.label}</p>
                <div className="mt-2 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                  </div>
                  <ArrowRight className="mt-1 size-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
                </div>
              </SmartLink>
            ))}
          </div>
        </div>
      </section>
      <FinalCta locale={locale} />
    </MarketingPage>
  );
}

export function AboutPageContent({ locale = "en", currentPath }: PageProps) {
  const page = getDictionary(locale).pages.about;

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="mb-3 font-mono text-xs uppercase text-primary">{page.label}</p>
          <h1 className="text-5xl font-semibold tracking-normal md:text-7xl">{page.title}</h1>
          <p className="mt-6 text-xl leading-9 text-muted-foreground">{page.copy}</p>
        </div>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {page.cards.map(([title, description]) => (
            <SectionCard key={title} title={title} description={description} />
          ))}
        </div>
      </main>
    </MarketingPage>
  );
}

export function ProjectsPageContent({ locale = "en", currentPath }: PageProps) {
  const page = getDictionary(locale).pages.projects;

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-xs uppercase text-primary">{page.label}</p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.copy}</p>
        <div className="mt-12">
          <FeaturedProjects locale={locale} />
        </div>
      </main>
    </MarketingPage>
  );
}

export function WritingPageContent({ locale = "en", currentPath }: PageProps) {
  const dictionary = getDictionary(locale);
  const page = dictionary.pages.writing;
  const siteConfig = getSiteConfig(locale);
  const topics =
    locale === "ru"
      ? ["Кеш префикса", "Стоимость инференса", "Агенты", "vLLM", "Контроль качества", "Наблюдаемость"]
      : ["Prefix cache", "Inference economics", "Agents", "vLLM", "Quality gates", "Observability"];
  const editorialSteps =
    locale === "ru"
      ? [
          "Habr: длинные разборы про кеш, стоимость, инференс и архитектурные компромиссы.",
          "Telegram: короткие заметки, наблюдения и черновики будущих глав.",
          "Хэндбук: очищенные выводы, чеклисты, карты и шаблоны."
        ]
      : [
          "Habr - long-form breakdowns on cache, cost, inference and architecture trade-offs.",
          "Telegram - short notes, observations and early drafts for future chapters.",
          "Handbook - distilled takeaways, checklists, maps and templates."
        ];
  const featuredTitle =
    locale === "ru" ? "Материалы, из которых собирается хэндбук." : "Writing that feeds the handbook.";
  const channels =
    locale === "ru"
      ? [
          {
            title: "Статьи на Habr",
            description: "Длинные технические разборы про кеш, стоимость, инференс и запуск ИИ-сценариев.",
            href: siteConfig.links.habr,
            Icon: FileText
          },
          {
            title: "Telegram-канал",
            description: "Короткие заметки, ссылки, наблюдения и черновые мысли про ИИ-платформы в боевой эксплуатации.",
            href: siteConfig.links.telegram,
            Icon: MessageSquare
          }
        ]
      : [
          {
            title: "Habr articles",
            description: "Long-form technical writing on cache, cost, inference and production AI scenarios.",
            href: siteConfig.links.habr,
            Icon: FileText
          },
          {
            title: "Telegram channel",
            description: "Short notes, links, observations and draft thinking about production AI platforms.",
            href: siteConfig.links.telegram,
            Icon: MessageSquare
          }
        ];

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-start">
          <div>
            <p className="mb-3 font-mono text-xs uppercase text-primary">{page.label}</p>
            <h1 className="max-w-4xl text-4xl font-semibold tracking-normal md:text-6xl">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.copy}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <a href={siteConfig.links.habr} target="_blank" rel="noreferrer">
                  {page.habr}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href={siteConfig.links.telegram} target="_blank" rel="noreferrer">
                  {page.telegram}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-2">
              {topics.map((topic) => (
                <span key={topic} className="rounded-full border border-border bg-card/60 px-3 py-1 text-sm text-muted-foreground">
                  {topic}
                </span>
              ))}
            </div>
          </div>
          <aside className="manual-surface rounded-lg p-6">
            <p className="font-mono text-xs uppercase text-primary">{page.verified}</p>
            <div className="mt-5 grid gap-4">
              {editorialSteps.map((step, index) => (
                <div key={step} className="flex gap-4">
                  <span className="mt-0.5 font-mono text-xs text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-6 text-muted-foreground">{step}</p>
                </div>
              ))}
            </div>
          </aside>
        </section>

        <section className="mt-16">
          <p className="mb-3 font-mono text-xs uppercase text-primary">
            {locale === "ru" ? "Ключевые тексты" : "Selected writing"}
          </p>
          <h2 className="mb-7 max-w-3xl text-3xl font-semibold tracking-normal md:text-5xl">{featuredTitle}</h2>
          <WritingPreview locale={locale} limit={9} />
        </section>

        <section className="mt-10 grid gap-4 md:grid-cols-2">
          {channels.map(({ title, description, href, Icon }) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="group rounded-lg border border-border/80 bg-card/60 p-5 transition-colors hover:border-primary/45"
            >
              <div className="flex items-start justify-between gap-4">
                <Icon className="h-5 w-5 text-primary" />
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
            </a>
          ))}
        </section>
      </main>
    </MarketingPage>
  );
}

export function TalksPageContent({ locale = "en", currentPath }: PageProps) {
  const page = getDictionary(locale).pages.talks;

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-xs uppercase text-primary">{page.label}</p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.copy}</p>
        <div className="mt-12">
          <TalksPreview locale={locale} />
        </div>
      </main>
    </MarketingPage>
  );
}

export function ContactPageContent({ locale = "en", currentPath }: PageProps) {
  const page = getDictionary(locale).pages.contact;
  const siteConfig = getSiteConfig(locale);
  const links = [siteConfig.links.telegram, siteConfig.links.habr];

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-xs uppercase text-primary">{page.label}</p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.copy}</p>
        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {page.cards.map(([title, description], index) => (
            <SectionCard key={title} title={title} description={description} href={links[index]} />
          ))}
        </div>
      </main>
    </MarketingPage>
  );
}

function SmartLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  if (href.startsWith("http")) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={className}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
