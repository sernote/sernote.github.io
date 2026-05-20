import Link from "next/link";
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
import {
  getDictionary,
  getExpertiseAreas,
  getPlatformLayers,
  getPublicWriting,
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
          {platformLayers.map((layer, index) => (
            <PlatformLayerCard key={layer.title} index={index} {...layer} />
          ))}
        </div>
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
  const publicWriting = getPublicWriting(locale);

  return (
    <MarketingPage locale={locale} currentPath={currentPath}>
      <main className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="mb-3 font-mono text-xs uppercase text-primary">{page.label}</p>
        <h1 className="max-w-4xl text-5xl font-semibold tracking-normal md:text-7xl">{page.title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground">{page.copy}</p>
        <div className="mt-12">
          <WritingPreview locale={locale} />
        </div>
        <div className="mt-8 rounded-lg border border-border bg-card/60 p-6">
          <p className="font-mono text-xs uppercase text-primary">{page.verified}</p>
          <div className="mt-4 grid gap-3 text-sm text-muted-foreground">
            <a href={siteConfig.links.telegram}>{page.telegram}</a>
            <a href={siteConfig.links.habr}>{page.habr}</a>
            {publicWriting.slice(0, 3).map((item) => (
              <a key={item.href} href={item.href}>
                {item.source}: {item.title}
              </a>
            ))}
          </div>
        </div>
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
        <div className="mt-12 grid gap-4 md:grid-cols-3">
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
