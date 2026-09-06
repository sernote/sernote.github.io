import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { EditorialLink } from "@/components/editorial/editorial-link";
import { SelectedReadingCards } from "@/components/editorial/selected-reading";
import { EditorialShell } from "@/components/site/editorial-shell";
import { AUTHOR_PROFILE } from "@/lib/author-profile";
import type {
  AboutViewModel,
  BlogListItemViewModel,
  BlogViewModel,
  HomeViewModel,
  ReadingStep,
  MaterialsViewModel,
  TalkSummaryViewModel,
  ExternalPublicationViewModel
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

function CacheReadingPath({ steps }: { steps: readonly ReadingStep[] }) {
  if (!steps.length) return null;
  return (
    <nav aria-label="Разобраться с префиксным кэшем" className="mt-8 border-t border-border pt-5">
      <p className="text-sm font-semibold">От разбора к проверке</p>
      <ol className="mt-4 grid list-none gap-6 p-0 md:grid-cols-2">
        {steps.map((step, index) => (
          <li key={step.entityId}>
            <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
            <Link href={step.href} className="mt-1 flex min-h-11 items-center gap-2 font-semibold text-primary hover:underline">{step.action}<ArrowRight aria-hidden="true" className="size-4" /></Link>
            <p className="text-sm leading-6 text-muted-foreground">{step.outcome}</p>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function HomePageContent({ model }: { model: HomeViewModel }) {
  const selected = model.readingPath?.find((step) => step.contentType === "article");
  const latest = model.featured.find((entry) => entry.surface === "blog");
  const lead = selected ?? latest?.item;
  const continuation = (model.readingPath ?? []).filter((step) =>
    step.entityId !== lead?.entityId || step.contentType !== lead?.contentType
  );
  const otherReading = (model.selected ?? []).filter((item) =>
    item.entityId !== lead?.entityId || item.contentType !== lead?.contentType
  );
  return (
    <EditorialShell currentPath="/">
      <section className="bg-[var(--surface-subtle)]">
        <div className={`${frameClassName} py-10 md:py-16`}>
          <header className="grid gap-7 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <h1 className="text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.055em] md:text-[3.75rem]">{AUTHOR_PROFILE.name}</h1>
              <p className="mt-4 text-sm font-semibold text-primary md:text-base">{AUTHOR_PROFILE.role} в {AUTHOR_PROFILE.company}</p>
            </div>
            <div className="max-w-2xl self-end">
              <p className="text-base leading-7 md:text-lg">{AUTHOR_PROFILE.aboutIntro}</p>
              <EditorialLink href="/about" className="mt-3 min-h-11">Подробнее обо мне</EditorialLink>
            </div>
          </header>
        </div>
      </section>
      <section className={`${frameClassName} py-10 md:py-16`}>
        {lead ? (
          <article className="border-l-2 border-primary pl-5 md:pl-8">
            <p className="text-sm font-medium text-primary">{selected ? "Начните с этого разбора" : latest?.label}</p>
            <h2 className="mt-4 max-w-4xl text-[2.2rem] font-semibold leading-[1.08] tracking-[-0.045em] md:text-[3.5rem]">
              <Link href={lead.href} className="hover:text-primary">{lead.title}</Link>
            </h2>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted-foreground">{lead.description}</p>
            <EditorialLink href={lead.href} className="mt-4 min-h-11">Читать {latest?.label === "Заметка" && !selected ? "заметку" : "статью"}</EditorialLink>
          </article>
        ) : null}
        <CacheReadingPath steps={continuation} />
      </section>
      {otherReading.length > 0 ? (
        <div className={`${frameClassName} pb-8 md:pb-10`}>
          <SelectedReadingCards items={otherReading} title="Ещё почитать" />
        </div>
      ) : null}
      <div className={`${frameClassName} pb-10`}>
        <nav aria-label="Основные разделы" className="grid border-y border-border md:grid-cols-3 md:gap-12">
          {model.entrances.map((entrance) => <HomeEntrance key={entrance.id} entrance={entrance} />)}
        </nav>
      </div>
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
      <h3
        className={
          isArticle
            ? "mt-4 max-w-4xl text-[1.8rem] font-semibold leading-[1.12] tracking-[-0.035em] md:text-[2.1rem]"
            : "mt-3 max-w-3xl text-[1.35rem] font-semibold leading-[1.2] tracking-[-0.025em] md:text-[1.55rem]"
        }
      >
        <Link href={item.href} className="hover:text-primary hover:underline underline-offset-4">{item.title}</Link>
      </h3>
      <p className={`mt-4 max-w-[48rem] text-base leading-7 text-muted-foreground ${isArticle ? "md:text-lg" : ""}`}>
        {item.description}
      </p>
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
          <div>
            <p className="max-w-[40rem] text-base leading-7 text-muted-foreground md:text-lg">
              Пишу о том, как устроены AI-платформы: что происходит с запросами, где теряется время и как меняется стоимость. Здесь собрал несколько текстов, с которых можно начать.
            </p>
            <EditorialLink href="#blog-archive-heading" className="mt-3 min-h-11">Все тексты</EditorialLink>
          </div>
        </header>
        <SelectedReadingCards items={model.selected ?? []} />
        <section aria-labelledby="blog-archive-heading" className="pt-10 md:pt-12">
          <h2 id="blog-archive-heading" className="scroll-mt-28 text-2xl font-semibold tracking-[-0.03em]">Все тексты на сайте</h2>
          {model.items.map((item) => (
            <BlogEntry key={item.entityId} item={item} />
          ))}
        </section>
        <div className="pt-8 md:pt-10">
          <p className="text-base leading-7 text-muted-foreground">Новые тексты и короткие заметки — в Telegram. Статьи с сайта можно читать через RSS.</p>
          <div className="mt-3 flex flex-wrap items-center gap-x-7">
            <ExternalEditorialLink href={siteLinks.telegram}>Читать Telegram</ExternalEditorialLink>
            <EditorialLink href="/rss.xml" className="min-h-11">Подписаться на RSS</EditorialLink>
          </div>
        </div>
      </div>
    </EditorialShell>
  );
}

function TalkSummary({ talk, featured = false }: { talk: TalkSummaryViewModel; featured?: boolean }) {
  const layout = !talk.thumbnail
    ? ""
    : featured
      ? "md:grid-cols-2 md:gap-10 lg:gap-12"
      : "grid-cols-[7rem_minmax(0,1fr)] sm:grid-cols-[9rem_minmax(0,1fr)]";
  return (
    <article
      data-talk={talk.entityId}
      data-featured-talk={featured ? "true" : undefined}
      className={`grid min-w-0 gap-5 ${layout} ${featured ? "" : "border-t border-border pt-6"}`}
    >
      {talk.thumbnail ? (
        <Link href={talk.href} className="block min-h-11 self-start">
          <Image
            src={talk.thumbnail.path}
            alt={talk.thumbnail.alt}
            width={featured ? 1280 : 320}
            height={featured ? 720 : 180}
            sizes={featured ? "(max-width: 767px) 100vw, 50vw" : "(max-width: 639px) 112px, 144px"}
            className="aspect-video h-auto w-full object-cover"
            priority={featured}
            loading={featured ? undefined : "lazy"}
          />
        </Link>
      ) : null}
      <div className={`min-w-0 self-start ${!featured && talk.thumbnail ? "max-sm:contents sm:block" : ""}`}>
        {featured ? <p className="mb-3 text-sm font-medium leading-6 text-primary">Разговор о платформе и работе команды</p> : null}
        <p className="text-sm leading-6 text-muted-foreground">
          {talk.formatLabel} · {talk.venue} · {talk.eventDateLabel}
        </p>
        <div className={!featured && talk.thumbnail ? "col-span-2 sm:col-span-1" : undefined}>
          <h3 className={`font-semibold tracking-[-0.03em] ${!featured && talk.thumbnail ? "sm:mt-3" : "mt-3"} ${featured ? "text-[1.75rem] leading-[1.15] lg:text-[2rem]" : "text-xl leading-7"}`}>
            <Link href={talk.href} className="hover:text-primary hover:underline underline-offset-4">{talk.title}</Link>
          </h3>
          <p className={`mt-3 max-w-[44rem] leading-7 text-muted-foreground ${featured ? "text-base lg:text-lg" : "text-sm sm:text-base"}`}>
            {talk.description}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-x-5">
            <EditorialLink href={talk.href} className="min-h-11">
              {`Открыть ${talk.formatLabel.toLocaleLowerCase("ru-RU")}`}
            </EditorialLink>
            {talk.recordingUrl ? <ExternalEditorialLink href={talk.recordingUrl}>Смотреть запись</ExternalEditorialLink> : null}
          </div>
        </div>
      </div>
    </article>
  );
}

function PublicationGroup({ id, title, publications }: {
  id: string;
  title: string;
  publications: readonly ExternalPublicationViewModel[];
}) {
  if (publications.length === 0) return null;
  return (
    <div role="group" aria-labelledby={id} className="mt-8">
      <h3 id={id} className="text-lg font-semibold tracking-[-0.02em]">{title}</h3>
      <div className="mt-4 border-t border-border">
        {publications.map((publication) => (
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
              <h4 className="text-xl font-semibold leading-7 tracking-[-0.025em]">
                {publication.title}
              </h4>
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
    </div>
  );
}

export function MaterialsPageContent({ model }: { model: MaterialsViewModel }) {
  const otherTalks = model.talks.filter((talk) => talk.entityId !== model.featuredTalk?.entityId);
  const authoredPublications = model.publications.filter((publication) => publication.externalTypeLabel === "Авторская статья");
  const otherPublications = model.publications.filter((publication) => publication.externalTypeLabel !== "Авторская статья");
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

        <nav aria-label="Разделы материалов" className="flex flex-wrap gap-x-8 border-b border-border py-3">
          <EditorialLink href="#watching" className="min-h-11">Смотреть</EditorialLink>
          <EditorialLink href="#reading" className="min-h-11">Читать</EditorialLink>
          <EditorialLink href="#projects" className="min-h-11">Попробовать</EditorialLink>
        </nav>
        <section id="watching" className="scroll-mt-24 border-b border-border py-10 md:py-12">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            Выступления, интервью и подкасты
          </h2>
          {model.featuredTalk ? (
            <div className="mt-7"><TalkSummary talk={model.featuredTalk} featured /></div>
          ) : null}
          <div className="mt-8 grid gap-x-10 gap-y-7 lg:grid-cols-2 lg:gap-x-12">
            {otherTalks.map((talk) => <TalkSummary key={talk.entityId} talk={talk} />)}
          </div>
        </section>

        <section id="reading" className="scroll-mt-24 border-b border-border py-10 md:py-12">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">
            Публикации на внешних площадках
          </h2>
          <PublicationGroup id="authored-publications-heading" title="Авторские статьи" publications={authoredPublications} />
          <PublicationGroup id="comment-publications-heading" title="Комментарии и интервью" publications={otherPublications} />
        </section>

        <section id="projects" className="scroll-mt-24 border-b border-border py-10 md:py-12">
          <h2 className="text-2xl font-semibold tracking-[-0.03em]">Открытые проекты</h2>
          <div className="mt-6 border-t border-border">
            {model.projects.map((project, index) => (
              <article
                key={project.entityId}
                data-project-separator={index < model.projects.length - 1 ? "true" : undefined}
                className={`grid gap-5 py-6 lg:grid-cols-[minmax(13rem,0.7fr)_minmax(20rem,1.15fr)_minmax(10rem,0.45fr)] lg:gap-10 ${index < model.projects.length - 1 ? "border-b border-border" : ""}`}
              >
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.025em]">{project.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {project.typeLabel}{project.releaseLabel ? ` · ${project.releaseLabel}` : ""}
                  </p>
                </div>
                <div>
                  <p className="text-base leading-7">{project.description}</p>
                </div>
                <div className="flex flex-col items-start">
                  <EditorialLink href={project.href} className="min-h-11">Открыть проект</EditorialLink>
                  <ExternalEditorialLink href={project.repositoryUrl}>GitHub</ExternalEditorialLink>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-4 border-t border-border py-8 md:flex md:items-center md:justify-between md:gap-8">
          <p className="max-w-2xl text-base leading-7 text-muted-foreground">
            Новые разборы и наблюдения из работы — в канале «{AUTHOR_PROFILE.channelName}».
          </p>
          <a
            href={siteLinks.telegram}
            className="mt-4 inline-flex min-h-11 shrink-0 items-center gap-2 py-2 text-sm font-medium text-primary hover:underline md:mt-0"
          >
            Читать канал <ArrowUpRight aria-hidden="true" className="size-4" />
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
        <header
          data-about-intro
          className={`grid gap-9 pb-12 md:gap-10 md:pb-16 lg:gap-16 ${model.photo ? "md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : ""}`}
        >
          <div>
            <h1 className="text-[2.75rem] font-semibold leading-[0.98] tracking-[-0.055em] md:text-[3.5rem]">
              {AUTHOR_PROFILE.name}
            </h1>
            <p className="mt-4 text-base font-semibold text-primary">
              {AUTHOR_PROFILE.role} в {AUTHOR_PROFILE.company}
            </p>
            <p className="mt-7 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {AUTHOR_PROFILE.aboutIntro}
            </p>
            <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg md:leading-8">
              {AUTHOR_PROFILE.currentWork}
            </p>
          </div>
          {model.photo ? (
            <figure className="w-full max-w-md md:justify-self-end">
              <Link href={model.photo.href} className="block aspect-[4/5] overflow-hidden">
                <Image
                  src={model.photo.path}
                  alt={model.photo.alt}
                  width={1280}
                  height={720}
                  sizes="(max-width: 767px) 100vw, 40vw"
                  className="h-full w-full object-cover object-[40%_center]"
                  priority
                />
              </Link>
              <figcaption className="mt-3 text-sm leading-6 text-muted-foreground">
                <Link href={model.photo.href} className="hover:text-primary hover:underline underline-offset-4">{model.photo.caption}</Link>
              </figcaption>
            </figure>
          ) : null}
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
          </div>
          <p className="mt-5 max-w-3xl border-t border-border pt-5 text-sm leading-6 text-muted-foreground">
            {AUTHOR_PROFILE.organizerNote}
          </p>
        </section>
      </div>
    </EditorialShell>
  );
}
