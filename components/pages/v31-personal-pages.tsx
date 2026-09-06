import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { EditorialLink } from "@/components/editorial/editorial-link";
import { SelectedReadingCards } from "@/components/editorial/selected-reading";
import { EditorialShell } from "@/components/site/editorial-shell";
import { AUTHOR_PROFILE } from "@/lib/author-profile";
import type {
  AboutViewModel,
  BlogListItemViewModel,
  BlogViewModel,
  HomeViewModel,
  SelectedReading,
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

function HomeReading({ item }: { item: SelectedReading }) {
  const linkClassName = "block min-h-11 underline-offset-4 hover:text-primary hover:underline";
  return (
    <article className="border-b border-border py-6 first:pt-[19px] last:border-0 last:pb-0">
      <h3 className="text-[23px] font-medium leading-[1.3] tracking-[-0.55px] [text-wrap:pretty]">
        {item.linkKind === "external" ? (
          <a href={item.href} target="_blank" rel="noreferrer" className={linkClassName}>
            {item.displayTitle ?? item.title}
            <ArrowUpRight aria-hidden="true" className="ml-1 inline size-4 align-baseline" />
            <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
          </a>
        ) : (
          <Link href={item.href} className={linkClassName}>{item.displayTitle ?? item.title}</Link>
        )}
      </h3>
      <p className="mt-2.5 text-lg leading-[1.6] text-foreground/80">{item.reason}</p>
      {item.publishedLabel || item.sourceName ? (
        <p className="mt-3 flex flex-wrap gap-x-3 text-[13px] leading-5 text-muted-foreground">
          {item.publishedLabel ? <span>{item.publishedLabel}</span> : null}
          {item.sourceName ? <span>{item.sourceName}</span> : null}
        </p>
      ) : null}
    </article>
  );
}

export function HomePageContent({ model }: { model: HomeViewModel }) {
  const selected = model.readingPath?.find((step) => step.contentType === "article");
  const latest = model.featured.find((entry) => entry.surface === "blog");
  const lead = selected ?? latest?.item;
  const isCacheLead = lead?.entityId === "cache-locality-is-a-routing-problem";
  const project = model.readingPath?.find((step) =>
    step.contentType === "project" && step.entityId === "audit-prompt-caching"
  );
  const otherReading = (model.selected ?? []).filter((item) =>
    item.entityId !== lead?.entityId || item.contentType !== lead?.contentType
  );
  const hasReading = lead !== undefined || otherReading.length > 0;
  return (
    <EditorialShell currentPath="/">
      <div className="mx-auto w-full max-w-[1024px] px-[19px] min-[441px]:px-[22px] min-[641px]:px-[25px] min-[761px]:px-9">
        <header className="border-b border-border py-[27px] min-[641px]:pb-[34px] min-[641px]:pt-[37px]">
          <h1 className="text-[30px] font-medium leading-[1.2] tracking-[-0.8px] min-[641px]:text-[35px] min-[641px]:tracking-[-1.2px]">{AUTHOR_PROFILE.name}</h1>
          <p className="mt-[9px] text-[15px] leading-6 text-primary">{AUTHOR_PROFILE.role} в {AUTHOR_PROFILE.company}</p>
          <p className="mt-[15px] max-w-[660px] text-lg leading-[1.6] text-foreground/80">Здесь разбираю, как работают модели под нагрузкой, где теряется время и из чего складывается стоимость.</p>
        </header>
        <div className={`grid items-start gap-[31px] pb-[30px] pt-[25px] min-[641px]:gap-[27px] min-[641px]:pb-10 min-[641px]:pt-8 min-[761px]:gap-[46px] ${hasReading ? "min-[641px]:grid-cols-[minmax(0,1.48fr)_minmax(235px,1fr)] min-[761px]:grid-cols-[minmax(0,1.72fr)_minmax(265px,1fr)]" : ""}`}>
          {hasReading ? (
            <section aria-labelledby="home-articles-heading" className="min-w-0">
              <h2 id="home-articles-heading" className="text-xl font-medium leading-[1.3] tracking-[-0.3px]">Статьи</h2>
              <div>
                {lead ? (
                  <article className="border-b border-border pb-6 pt-[19px] last:border-0 last:pb-0">
                    <p className="mb-3 text-[13px] font-medium leading-5 text-primary">{isCacheLead ? "Кэш и маршрутизация" : latest?.label}</p>
                    <h3 className="text-[27px] font-medium leading-[1.2] tracking-[-0.9px] [text-wrap:pretty] min-[761px]:text-[30px]">
                      <Link href={lead.href} className="block min-h-11 underline-offset-4 hover:text-primary hover:underline">{lead.title}</Link>
                    </h3>
                    <p className="mt-2.5 text-lg leading-[1.6] text-foreground/80">{isCacheLead ? "Почему запросу иногда выгоднее пересчитать префикс, чем ждать реплику с готовым кэшем." : lead.description}</p>
                    <EditorialLink href={lead.href} className="mt-2 min-h-11 text-[15px]">{isCacheLead ? "Читать разбор" : selected?.action ?? (latest?.label === "Заметка" ? "Читать заметку" : "Читать статью")}</EditorialLink>
                  </article>
                ) : null}
                {otherReading.map((item) => <HomeReading key={item.entityId} item={item} />)}
              </div>
            </section>
          ) : null}
          <aside aria-label="Хэндбук и открытые проекты" className="grid min-w-0 gap-[25px] min-[441px]:max-[640px]:grid-cols-2 min-[641px]:gap-0">
            <section aria-labelledby="home-handbook-heading" className="bg-accent p-5 min-[761px]:p-6">
              <p className="mb-3 text-[13px] font-medium leading-5 text-primary">Хэндбук</p>
              <h2 id="home-handbook-heading" className="text-[25px] font-medium leading-[1.25] tracking-[-0.6px]">Как устроена AI‑платформа</h2>
              <p className="mt-[13px] text-[17px] leading-[1.6] text-foreground/80">Исполнение моделей, кэш и выбор реплики.</p>
              <EditorialLink href="/ai-platform/map" className="mb-[15px] mt-[19px] flex min-h-11 justify-between bg-primary px-3.5 py-2.5 text-[15px] text-primary-foreground">Карта платформы</EditorialLink>
              {(model.handbookLinks?.length ?? 0) > 0 ? (
                <ul className="m-0 list-none p-0">
                  {model.handbookLinks?.map((item) => (
                    <li key={item.entityId} className="border-t border-border">
                      <Link href={item.href} className="flex min-h-11 items-center py-2.5 text-[15px] leading-6 underline-offset-4 hover:text-primary hover:underline">{item.title}</Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
            {project ? (
              <section aria-labelledby="home-project-heading" className="px-0.5 min-[641px]:mt-[27px]">
                <p className="mb-3 text-[13px] font-medium leading-5 text-primary">Открытый проект</p>
                <h2 id="home-project-heading" className="text-[23px] font-medium leading-[1.3] tracking-[-0.4px]">Проверить кэш в своём проекте</h2>
                <p className="mt-3 text-[17px] leading-[1.6] text-foreground/80">Скилл для Codex помогает найти изменения в начале запроса.</p>
                <EditorialLink href={project.href} className="mt-2.5 min-h-11 text-[15px]">Как запустить аудит</EditorialLink>
              </section>
            ) : null}
            <section aria-labelledby="home-materials-heading" className="border-t border-border pt-[23px] min-[441px]:max-[640px]:col-span-2 min-[641px]:mt-[23px]">
              <h2 id="home-materials-heading" className="text-[19px] font-medium leading-[1.35]">Выступления и подкасты</h2>
              <p className="mt-2 text-[15px] leading-6 text-foreground/80">Разговоры про AI-платформы и инженерную работу.</p>
              <EditorialLink href="/materials" className="min-h-11 text-[15px]">Все материалы</EditorialLink>
            </section>
          </aside>
        </div>
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
