import Link from "next/link";
import { ArrowRight, ExternalLink, FileText, MessageSquare } from "lucide-react";
import type { ReactNode } from "react";

import { FinalCta } from "@/components/marketing/final-cta";
import { FeaturedProjects } from "@/components/marketing/featured-projects";
import { Hero } from "@/components/marketing/hero";
import { MarketingPage } from "@/components/marketing/site-shell";
import { TalksPreview } from "@/components/marketing/talks-preview";
import { WritingPreview } from "@/components/marketing/writing-preview";
import { MetricGrid } from "@/components/marketing/metric-grid";
import { PlatformLayerCard } from "@/components/marketing/platform-layer-card";
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

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <Hero locale={locale} />
      <Section title={sections.proofTitle} copy={sections.proofCopy}>
        <div className="grid gap-4 md:grid-cols-4">
          {dictionary.home.proof.map(([title, description]) => (
            <div key={title} className="rounded-lg border border-border bg-card/60 p-4">
              <p className="font-mono text-xs uppercase text-primary">{title}</p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section title={sections.problemTitle} copy={sections.problemCopy}>
        <MetricGrid
          items={dictionary.home.metrics.map((label, index) => ({
            value: String(index + 1).padStart(2, "0"),
            label
          }))}
        />
      </Section>
      <Section title={sections.layersTitle} copy={sections.layersCopy}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {platformLayers.slice(0, 4).map((layer, index) => (
            <PlatformLayerCard key={layer.title} index={index} {...layer} />
          ))}
        </div>
        <Link href={localizedPath("/handbook/platform-map", locale)} className="mt-5 inline-block text-sm text-primary">
          {locale === "ru" ? "Открыть полную карту из 12 слоёв" : "Open the full 12-layer map"}
        </Link>
      </Section>
      <Section title={sections.expertiseTitle} copy={sections.expertiseCopy}>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {expertiseAreas.map((area) => (
            <div key={area} className="rounded-lg border border-border bg-card/55 p-4 text-sm text-muted-foreground">
              {area}
            </div>
          ))}
        </div>
      </Section>
      <Section title={sections.projectsTitle} copy={sections.projectsCopy}>
        <FeaturedProjects locale={locale} />
      </Section>
      <Section title={sections.writingTitle} copy={sections.writingCopy}>
        <WritingPreview locale={locale} />
      </Section>
      <Section title={sections.talksTitle} copy={sections.talksCopy}>
        <TalksPreview locale={locale} />
      </Section>
      <Section title={sections.engagementTitle} copy={sections.engagementCopy}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dictionary.home.engagements.map(([title, description]) => (
            <SectionCard key={title} title={title} description={description} href={localizedPath("/contact", locale)} />
          ))}
        </div>
      </Section>
      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <p className="mb-3 font-mono text-xs uppercase text-primary">{sections.authorLabel}</p>
            <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">{siteConfig.author}</h2>
            <p className="mt-4 max-w-2xl text-muted-foreground">{dictionary.home.authorCopy}</p>
          </div>
          <div className="manual-surface rounded-lg p-6">
            <p className="font-mono text-xs uppercase text-primary">{sections.centralSentenceLabel}</p>
            <p className="mt-3 text-xl leading-8">{dictionary.home.centralSentence}</p>
            <Link href={localizedPath("/about", locale)} className="mt-5 inline-block text-sm text-primary">
              {sections.readMore}
            </Link>
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

function Section({ title, copy, children }: { title: string; copy: string; children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-8 max-w-3xl">
        <p className="mb-3 font-mono text-xs uppercase text-primary">{title}</p>
        <h2 className="text-3xl font-semibold tracking-normal md:text-5xl">{copy}</h2>
      </div>
      {children}
    </section>
  );
}
