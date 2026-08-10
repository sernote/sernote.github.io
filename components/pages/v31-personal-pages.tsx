import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { EditorialLink } from "@/components/editorial/editorial-link";
import { SectionHeading } from "@/components/editorial/section-heading";
import { EditorialShell } from "@/components/site/editorial-shell";
import { AUTHOR_PROFILE } from "@/lib/author-profile";
import type {
  AboutViewModel,
  BlogListItemViewModel,
  BlogViewModel,
  HomeViewModel,
  MaterialsViewModel
} from "@/lib/content-v3/view-models";
import { siteLinks } from "@/lib/i18n";

const frameClassName = "mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-[72px]";

function ExternalEditorialLink({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-primary underline-offset-4 hover:underline"
    >
      {children}
      <ArrowUpRight aria-hidden="true" className="size-4 shrink-0" />
      <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
    </a>
  );
}

function HomeEntrance({ entrance }: { entrance: HomeViewModel["entrances"][number] }) {
  return (
    <Link
      href={entrance.href}
      data-home-entrance={entrance.id}
      className="group grid min-h-28 grid-cols-[2rem_minmax(0,1fr)_1.5rem] gap-4 border-b border-border py-6 md:min-h-36 md:grid-cols-[2rem_minmax(0,1fr)_1.5rem] md:gap-5 md:border-b-0 md:py-8"
    >
      <span className="pt-1 font-mono text-xs text-muted-foreground">{entrance.index}</span>
      <span>
        <span className="block text-[1.35rem] font-semibold tracking-[-0.025em] md:text-2xl">{entrance.label}</span>
        <span className="mt-2 block max-w-sm text-sm leading-6 text-muted-foreground md:text-base">
          {entrance.description}
        </span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="mt-0.5 size-4 justify-self-end text-primary transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

export function HomePageContent({ model }: { model: HomeViewModel }) {
  const [article, talk, project] = model.featured;

  return (
    <EditorialShell currentPath="/">
      <section className="bg-[var(--surface-subtle)]">
        <div className={`${frameClassName} pt-10 md:pt-16 lg:pt-20`}>
          <div className="pb-10 md:pb-12 lg:pb-14">
            <h1 className="text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.055em] md:text-[3.75rem] lg:text-[4.5rem]">
              Сергей Нотевский
            </h1>
            <p className="mt-4 text-sm font-semibold text-primary md:text-base">
              AI Platform Lead в Битрикс24
            </p>
          </div>
          <nav
            aria-label="Основные разделы"
            className="grid border-t border-border md:grid-cols-3 md:gap-12"
          >
            {model.entrances.map((entrance) => (
              <HomeEntrance key={entrance.id} entrance={entrance} />
            ))}
          </nav>
        </div>
      </section>

      <section className={`${frameClassName} pb-16 pt-8 md:pb-20 md:pt-10 lg:pb-24 lg:pt-12`}>
        <SectionHeading
          title="Сейчас"
          action={{ href: "/materials", label: "Все материалы" }}
        />
        <div className="grid gap-2 lg:grid-cols-[minmax(0,1.55fr)_minmax(22rem,0.95fr)] lg:gap-16">
          <article className="border-b border-border py-8 lg:border-b-0 lg:py-10">
            <p className="text-sm text-muted-foreground">Статья · Блог</p>
            <h2 className="mt-3 max-w-3xl text-[1.75rem] font-semibold leading-[1.12] tracking-[-0.035em] md:text-[2rem]">
              {article.item.title}
            </h2>
            <p className="mt-4 max-w-[46rem] text-base leading-7 text-muted-foreground md:text-lg">
              {article.item.description}
            </p>
            <EditorialLink href={article.item.href} className="mt-4 min-h-11">
              Читать статью
            </EditorialLink>
          </article>
          <div className="border-t border-border lg:mt-10">
            {[talk, project].map((entry) => (
              <article key={entry.item.entityId} className="border-b border-border py-6">
                <p className="text-sm text-muted-foreground">{entry.label}</p>
                <h2 className="mt-2 text-xl font-semibold tracking-[-0.025em]">
                  <Link href={entry.item.href} className="hover:text-primary">
                    {entry.item.title}
                  </Link>
                </h2>
                <p className="mt-2 text-base leading-6 text-muted-foreground">
                  {entry.item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}

function BlogEntry({ item }: { item: BlogListItemViewModel }) {
  const isArticle = item.editorialFormat === "article";
  return (
    <article className={isArticle ? "border-b border-border py-10 md:py-12" : "border-b border-border py-7 md:py-8"}>
      <p className="text-sm text-muted-foreground">
        {isArticle ? "Статья" : "Короткая заметка"} · {item.publishedLabel}
      </p>
      <h2
        className={
          isArticle
            ? "mt-4 max-w-4xl text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.035em] md:text-[2.1rem]"
            : "mt-3 max-w-3xl text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.025em] md:text-[1.55rem]"
        }
      >
        {item.title}
      </h2>
      <p className={`mt-4 max-w-[48rem] text-base leading-7 text-muted-foreground ${isArticle ? "md:text-lg" : ""}`}>
        {item.description}
      </p>
      {item.topics?.length ? (
        <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.topics.join(" · ")}</p>
      ) : null}
      <EditorialLink href={item.href} className="mt-3 min-h-11">
        {isArticle ? "Читать статью" : "Читать заметку"}
      </EditorialLink>
    </article>
  );
}

export function BlogPageContent({ model }: { model: BlogViewModel }) {
  return (
    <EditorialShell currentPath="/blog">
      <div className={`${frameClassName} py-10 md:py-16 lg:py-16`}>
        <header className="grid gap-5 border-b border-border pb-10 md:grid-cols-2 md:gap-12 md:pb-12">
          <h1 className="text-[2.25rem] font-semibold leading-none tracking-[-0.045em] md:text-[2.75rem]">
            Блог
          </h1>
          <p className="max-w-[40rem] text-base leading-7 text-muted-foreground md:text-lg">
            Собственные статьи и короткие заметки о production AI-платформах: архитектуре, инференсе, качестве и эксплуатации.
          </p>
        </header>
        <div>
          {model.items.map((item) => (
            <BlogEntry key={item.entityId} item={item} />
          ))}
        </div>
      </div>
    </EditorialShell>
  );
}

export function MaterialsPageContent({ model }: { model: MaterialsViewModel }) {
  return (
    <EditorialShell currentPath="/materials">
      <div className={`${frameClassName} py-10 md:py-16 lg:py-16`}>
        <header className="grid gap-5 border-b border-border pb-10 md:grid-cols-2 md:gap-12 md:pb-12">
          <h1 className="text-[2.25rem] font-semibold leading-none tracking-[-0.045em] md:text-[2.75rem]">
            Материалы
          </h1>
          <p className="max-w-[40rem] text-base leading-7 text-muted-foreground md:text-lg">
            Выступления, записанные интервью, открытые проекты и публикации на внешних площадках.
          </p>
        </header>

        <section className="border-b border-border py-10 md:py-12">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            Выступления, интервью и подкасты
          </h2>
          <div className="mt-7 space-y-12">
            {model.talks.map((talk) => (
              <article key={talk.entityId} className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(24rem,1.25fr)] lg:gap-12">
                {talk.thumbnail ? (
                  <Link href={talk.href} className="block min-h-11">
                    <Image
                      src={talk.thumbnail.path}
                      alt={talk.thumbnail.alt}
                      width={1280}
                      height={720}
                      sizes="(max-width: 1023px) 100vw, 45vw"
                      className="aspect-video h-auto w-full object-cover"
                      priority
                    />
                  </Link>
                ) : null}
                <div className="self-start">
                  <p className="text-sm text-muted-foreground">
                    {talk.formatLabel} · {talk.venue} · {talk.eventDateLabel}
                  </p>
                  <h3 className="mt-3 text-[1.75rem] font-semibold leading-[1.15] tracking-[-0.035em]">
                    {talk.title}
                  </h3>
                  <p className="mt-4 max-w-[44rem] text-base leading-7 text-muted-foreground md:text-lg">
                    {talk.description}
                  </p>
                  {talk.recordingLabel ? (
                    <p className="mt-3 text-sm text-muted-foreground">58:10 · YouTube</p>
                  ) : null}
                  <EditorialLink href={talk.href} className="mt-3 min-h-11">
                    Открыть выступление
                  </EditorialLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="border-b border-border py-10 md:py-12">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Открытые проекты</h2>
          <div className="mt-6 border-t border-border">
            {model.projects.map((project) => (
              <article key={project.entityId} className="grid gap-5 border-b border-border py-6 lg:grid-cols-[minmax(13rem,0.7fr)_minmax(20rem,1.15fr)_minmax(10rem,0.45fr)] lg:gap-10">
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {project.typeLabel}{project.releaseLabel ? ` · ${project.releaseLabel}` : ""}
                  </p>
                </div>
                <div>
                  <p className="text-base leading-7">{project.description}</p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{project.evidenceBoundary}</p>
                </div>
                <div className="flex flex-col items-start">
                  <EditorialLink href={project.href} className="min-h-11">Открыть проект</EditorialLink>
                  <ExternalEditorialLink href={project.repositoryUrl}>GitHub</ExternalEditorialLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="py-10 md:py-12">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            Публикации на внешних площадках
          </h2>
          <div className="mt-6 border-t border-border">
            {model.publications.map((publication) => (
              <article
                key={publication.entityId}
                data-publication={publication.entityId}
                className="grid gap-4 border-b border-border py-6 lg:grid-cols-[minmax(10rem,0.5fr)_minmax(0,1.5fr)] lg:gap-10"
              >
                <p className="text-sm leading-6 text-muted-foreground">
                  {publication.externalTypeLabel}<br />
                  {publication.sourceName}<br />
                  {publication.publishedLabel}
                </p>
                <div>
                  <h3 className="text-xl font-semibold leading-7 tracking-[-0.025em]">
                    {publication.title}
                  </h3>
                  <p className="mt-3 max-w-3xl text-base leading-7 text-muted-foreground">
                    {publication.excerpt}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {publication.participationLabel}
                  </p>
                  <ExternalEditorialLink href={publication.href}>Открыть публикацию</ExternalEditorialLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-4 border-t border-border py-8 md:flex md:items-center md:justify-between md:gap-8">
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Для приглашения на выступление, интервью или разговора о совместном материале.
          </p>
          <a
            href={siteLinks.telegramDm}
            className="mt-4 inline-flex min-h-11 shrink-0 items-center gap-2 py-2 text-sm font-medium text-primary hover:underline md:mt-0"
          >
            Написать в Telegram <ArrowUpRight aria-hidden="true" className="size-4" />
          </a>
        </section>
      </div>
    </EditorialShell>
  );
}

const aboutSectionClassName =
  "grid gap-8 border-t border-border py-12 md:grid-cols-[minmax(12rem,0.55fr)_minmax(0,1.45fr)] md:gap-12 md:py-14";

function AboutEvidenceRow({ item }: { item: AboutViewModel["evidence"][number] }) {
  const content = (
    <>
      <span>
        <span className="block font-medium group-hover:text-primary">{item.title}</span>
        <span className="mt-1 block max-w-3xl text-base leading-6 text-muted-foreground">
          {item.description}
        </span>
      </span>
      <span className="text-sm text-muted-foreground md:whitespace-nowrap md:text-right">
        {item.meta}
      </span>
    </>
  );
  const rowClassName =
    "group grid gap-2 border-b border-border py-5 md:grid-cols-[minmax(0,1fr)_auto] md:gap-8";

  if (item.linkKind === "external") {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer"
        data-about-evidence={item.entityId}
        className={rowClassName}
      >
        {content}
        <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
      </a>
    );
  }

  return (
    <Link href={item.href} data-about-evidence={item.entityId} className={rowClassName}>
      {content}
    </Link>
  );
}

export function AboutPageContent({ model }: { model: AboutViewModel }) {
  return (
    <EditorialShell currentPath="/about">
      <div className={`${frameClassName} py-10 md:py-16 lg:py-16`}>
        <header className="grid gap-9 pb-12 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-10 md:pb-16 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(24rem,1.3fr)] lg:gap-16">
          <div>
            <h1 className="text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.055em] md:text-[3.5rem]">
              {AUTHOR_PROFILE.name}
            </h1>
            <p className="mt-4 text-base font-semibold text-primary">
              {AUTHOR_PROFILE.role} в {AUTHOR_PROFILE.company}
            </p>
          </div>
          <div>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              {AUTHOR_PROFILE.aboutIntro}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
              {AUTHOR_PROFILE.currentWork}
            </p>
          </div>
        </header>

        <section className={aboutSectionClassName}>
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Как я пришёл к AI Platform</h2>
          <div>
            <p className="max-w-3xl text-base leading-7 text-muted-foreground">
              {AUTHOR_PROFILE.career}
            </p>
          </div>
        </section>

        <section className={aboutSectionClassName}>
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Что я здесь собираю</h2>
          <div className="space-y-4">
            {AUTHOR_PROFILE.sitePurpose.map((paragraph) => (
              <p key={paragraph} className="max-w-3xl text-base leading-7 text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className={aboutSectionClassName}>
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            Что почитать и посмотреть
          </h2>
          <div>
            <div className="border-t border-border">
              {model.evidence.map((item) => (
                <AboutEvidenceRow key={item.entityId} item={item} />
              ))}
            </div>
            <EditorialLink href="/materials" className="mt-5 min-h-11">
              Все материалы
            </EditorialLink>
          </div>
        </section>

        <section className="mt-6 border-y border-border bg-[var(--surface-subtle)] px-5 py-8 md:px-8 md:py-10">
          <h2 className="text-sm font-semibold text-primary">
            Telegram-канал «{AUTHOR_PROFILE.channelName}»
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-7 text-foreground">
            {AUTHOR_PROFILE.channelPitch}
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-7">
            <ExternalEditorialLink href={siteLinks.telegram}>Читать канал</ExternalEditorialLink>
            <a
              href={siteLinks.telegramDm}
              className="inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-primary hover:underline"
            >
              Написать в Telegram <ArrowUpRight aria-hidden="true" className="size-4" />
            </a>
          </div>
          <p className="mt-5 max-w-3xl border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
            {AUTHOR_PROFILE.organizerNote}
          </p>
        </section>
      </div>
    </EditorialShell>
  );
}
