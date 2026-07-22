import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { ContentListItem } from "@/components/marketing/content-list-item";
import { PageIntro } from "@/components/marketing/page-intro";
import { MarketingPage } from "@/components/marketing/site-shell";
import { siteLinks } from "@/lib/i18n";
import type {
  BlogViewModel,
  HomeViewModel,
  ProjectsViewModel,
  TalksViewModel,
  WorkViewModel
} from "@/lib/content-v3/view-models";

type HomePageContentProps = {
  model: HomeViewModel;
};

type WorkPageContentProps = {
  model: WorkViewModel;
};

type BlogPageContentProps = {
  model: BlogViewModel;
};

type TalksPageContentProps = {
  model: TalksViewModel;
};

type ProjectsPageContentProps = {
  model: ProjectsViewModel;
};

const professionalContext = [
  {
    index: "01",
    title: "Архитектура платформы",
    description: "Границы платформы, control plane, путь исполнения и контракты с продуктовыми командами."
  },
  {
    index: "02",
    title: "Инференс и эксплуатация",
    description: "MaaS, self-hosted и гибридные схемы: запуск моделей, наблюдаемость и эксплуатационные решения."
  },
  {
    index: "03",
    title: "Качество и ответственность",
    description: "Оценка качества, релизный контроль, стоимость сценария и понятное распределение ответственности."
  }
] as const;

const aboutAreas = [
  {
    index: "01",
    title: "Архитектура платформы",
    description: "Проектирую границы платформы, control plane, маршрутизацию и контракты для продуктовых сценариев."
  },
  {
    index: "02",
    title: "Инференс и эксплуатация",
    description: "Работаю с MaaS, self-hosted и гибридными схемами: инференсом, кешем, планированием мощности и наблюдаемостью."
  },
  {
    index: "03",
    title: "Качество, экономика и ответственность",
    description: "Связываю оценку качества, релизный контроль, стоимость и ответственность в единый эксплуатационный контур."
  }
] as const;

const contactContexts = [
  {
    index: "01",
    title: "Архитектура ИИ-платформы",
    description: "Разобрать границы платформы, control plane, inference plane или конкретный production-сценарий."
  },
  {
    index: "02",
    title: "Стратегическая сессия",
    description: "Сравнить MaaS, self-hosted и гибридный подход, определить ответственность команды и ближайшие решения."
  },
  {
    index: "03",
    title: "Выступление",
    description: "Обсудить доклад, подкаст или технический разбор о production AI-платформах."
  },
  {
    index: "04",
    title: "Совместный публичный проект",
    description: "Предложить совместный материал, открытый проект или профессиональное исследование."
  }
] as const;

function EntranceRow({ entrance }: { entrance: HomeViewModel["entrances"][number] }) {
  return (
    <Link
      href={entrance.href}
      className="group grid min-h-11 grid-cols-[2.5rem_minmax(0,1fr)_2rem] gap-4 border-b border-border/80 py-5 transition-colors first:border-t hover:bg-muted/25 focus-visible:bg-muted/25 sm:py-6"
    >
      <span className="pt-1 font-mono text-[0.6875rem] tracking-[0.1em] text-primary">
        {entrance.index}
      </span>
      <span>
        <span className="block text-xl font-semibold tracking-[-0.02em] text-foreground sm:text-2xl">
          {entrance.label}
        </span>
        <span className="mt-2 block text-sm leading-6 text-muted-foreground">
          {entrance.description}
        </span>
      </span>
      <ArrowRight
        aria-hidden="true"
        className="mt-1 size-5 text-primary transition-transform group-hover:translate-x-1 group-focus-visible:translate-x-1"
      />
    </Link>
  );
}

function ExternalChannel({ href, children }: { href: string; children: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-foreground hover:text-primary"
    >
      {children}
      <ArrowUpRight
        aria-hidden="true"
        className="size-4 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
      />
      <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
    </a>
  );
}

export function HomePageContent({ model }: HomePageContentProps) {
  return (
    <MarketingPage locale="ru" currentPath="/">
      <section className="mx-auto grid w-full max-w-7xl gap-14 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,7fr)_minmax(22rem,5fr)] lg:gap-[4.5rem] lg:px-8 lg:py-24">
        <div className="max-w-3xl self-center">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary">
            AI Platform Lead в Битрикс24
          </p>
          <h1 className="mt-5 text-[2.75rem] font-semibold leading-[3rem] tracking-[-0.045em] text-foreground sm:text-[3.5rem] sm:leading-[3.75rem] lg:text-[4.5rem] lg:leading-[4.875rem]">
            Сергей Нотевский
          </h1>
          <p className="mt-7 max-w-[42rem] text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-8">
            Отвечаю за инференс, качество ответов, стоимость запроса и надёжность ИИ-сервисов под реальной нагрузкой.
          </p>
        </div>

        <nav aria-label="Основные разделы" className="self-center">
          {model.entrances.map((entrance) => (
            <EntranceRow key={entrance.id} entrance={entrance} />
          ))}
        </nav>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        <div className="mb-10 max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
            Главное
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
            По одному материалу из каждого раздела
          </h2>
        </div>
        <div className="border-t border-border/80">
          {model.featured.map(({ surface, label, item }) => (
            <div key={surface} data-surface={surface} aria-label={label}>
              <ContentListItem item={item} eyebrow={label} />
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70">
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[minmax(16rem,0.7fr)_minmax(0,1.3fr)] lg:gap-20 lg:px-8 lg:py-24">
          <div className="max-w-md">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
              Профессиональный контекст
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              Production AI как инженерная система
            </h2>
          </div>
          <div className="border-t border-border/80">
            {professionalContext.map((area) => (
              <div
                key={area.index}
                className="grid gap-3 border-b border-border/80 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6"
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-primary">
                  {area.index}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{area.title}</h3>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-6 border-y border-border/80 py-8 sm:flex-row sm:items-center sm:justify-between sm:py-10">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">Контакт</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground sm:text-3xl">
              Обсудить архитектуру, выступление или публичный проект
            </h2>
          </div>
          <Link
            href="/contact"
            className="group inline-flex min-h-11 shrink-0 items-center gap-3 py-2 text-sm font-semibold text-foreground hover:text-primary"
          >
            Начать разговор
            <ArrowRight
              aria-hidden="true"
              className="size-4 text-primary transition-transform group-hover:translate-x-1"
            />
          </Link>
        </div>
      </section>
    </MarketingPage>
  );
}

export function WorkPageContent({ model }: WorkPageContentProps) {
  return (
    <MarketingPage locale="ru" currentPath="/work">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <PageIntro
          overline="Материалы"
          title="Публичная работа"
          lead="Выступления, открытые проекты и внешние публикации о production AI-платформах — по одному выбранному материалу в каждом формате."
        />

        <div className="mt-16 sm:mt-20 lg:mt-24">
          {model.groups.map((group) => (
            <section
              key={group.id}
              data-group-id={group.id}
              className="grid gap-6 border-t border-border/80 py-10 first:pt-0 lg:grid-cols-[minmax(12rem,0.36fr)_minmax(0,1fr)] lg:gap-16 lg:py-14"
            >
              <div className="pt-1">
                <p className="font-mono text-[0.6875rem] tracking-[0.1em] text-primary">
                  {group.index}
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-[-0.02em] text-foreground">
                  {group.title}
                </h2>
                <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                  {group.description}
                </p>
                {group.indexHref !== null && group.indexLabel !== null ? (
                  <Link
                    href={group.indexHref}
                    className="group mt-5 inline-flex min-h-11 items-center gap-2 py-2 text-sm font-medium text-foreground hover:text-primary"
                  >
                    {group.indexLabel}
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 text-primary transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                ) : null}
              </div>
              <div className="border-t border-border/80">
                <ContentListItem item={group.item} />
              </div>
            </section>
          ))}
        </div>
      </div>
    </MarketingPage>
  );
}

export function BlogPageContent({ model }: BlogPageContentProps) {
  return (
    <MarketingPage locale="ru" currentPath="/blog">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <PageIntro
          overline="Блог"
          title="Статьи и заметки"
          lead="Авторские разборы и короткие инженерные заметки о production AI-платформах. Внешние материалы ведут прямо на исходную площадку."
        />

        <section aria-label="Статьи и заметки" className="mt-16 border-t border-border/80 sm:mt-20 lg:mt-24">
          {model.items.map((item) => (
            <ContentListItem
              key={item.entityId}
              item={item}
              eyebrow={`${item.meta} · ${item.publishedLabel}`}
            />
          ))}
        </section>
      </div>
    </MarketingPage>
  );
}

export function TalksPageContent({ model }: TalksPageContentProps) {
  return (
    <MarketingPage locale="ru" currentPath="/talks">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <PageIntro
          overline="Выступления"
          title="Доклады и разговоры"
          lead="Записи выступлений о production AI-платформах с краткими выжимками, таймкодами и ссылками на связанные материалы."
        />

        <section
          aria-label="Записи выступлений"
          className="mt-16 border-t border-border/80 sm:mt-20 lg:mt-24"
        >
          {model.items.map((item) => (
            <ContentListItem key={item.entityId} item={item} eyebrow={item.eyebrow} />
          ))}
        </section>

        <aside className="mt-12 flex flex-col gap-4 border-y border-border/80 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            Новые выступления и короткие заметки о production AI-платформах публикую в Telegram.
          </p>
          <ExternalChannel href={siteLinks.telegram}>Открыть Telegram-канал</ExternalChannel>
        </aside>
      </div>
    </MarketingPage>
  );
}

export function ProjectsPageContent({ model }: ProjectsPageContentProps) {
  return (
    <MarketingPage locale="ru" currentPath="/projects">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <PageIntro
          overline="Projects"
          title="Открытые инженерные проекты"
          lead="Открытые инструменты для production AI-платформ: назначение, быстрый старт, ограничения и проверенные публичные источники."
        />

        <section
          aria-label="Открытые инженерные проекты"
          className="mt-16 border-t border-border/80 sm:mt-20 lg:mt-24"
        >
          {model.items.map((item) => (
            <ContentListItem key={item.entityId} item={item} eyebrow={item.eyebrow} />
          ))}
        </section>
      </div>
    </MarketingPage>
  );
}

export function AboutPageContent() {
  return (
    <MarketingPage locale="ru" currentPath="/about">
      <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <PageIntro
          overline="Обо мне"
          title="Сергей Нотевский"
          lead="AI Platform Lead в Битрикс24. Работаю с архитектурой, инференсом, качеством и эксплуатацией production AI-платформ."
        />

        <section className="mt-16 grid gap-8 sm:mt-20 lg:mt-24 lg:grid-cols-[minmax(12rem,0.36fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
              Области работы
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground">
              От границ платформы до эксплуатации
            </h2>
          </div>
          <div className="border-t border-border/80">
            {aboutAreas.map((area) => (
              <div
                key={area.index}
                data-work-area={area.index}
                className="grid gap-3 border-b border-border/80 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 sm:py-8"
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-primary">
                  {area.index}
                </span>
                <div>
                  <h3 className="text-xl font-semibold tracking-[-0.015em] text-foreground">
                    {area.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="border-y border-border/70">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="max-w-[45rem]">
            <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
              Редакционные принципы
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
              Практика, доказательства и честные границы
            </h2>
            <p className="mt-6 text-base leading-7 text-muted-foreground">
              Пишу о задачах, которые разбирал сам. Отделяю проверенные факты от выводов, указываю применимость рекомендаций и не публикую внутренние детали рабочих систем.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="flex flex-col gap-5 border-y border-border/80 py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-xs uppercase tracking-[0.12em] text-primary">
            Публичные каналы
          </p>
          <div className="flex flex-wrap gap-x-7 gap-y-1">
            <ExternalChannel href={siteLinks.telegram}>Telegram</ExternalChannel>
            <ExternalChannel href={siteLinks.habr}>Habr</ExternalChannel>
            <ExternalChannel href="https://github.com/sernote">GitHub</ExternalChannel>
          </div>
        </div>
      </section>
    </MarketingPage>
  );
}

export function ContactPageContent() {
  return (
    <MarketingPage locale="ru" currentPath="/contact">
      <div className="mx-auto w-full max-w-[45rem] px-4 py-16 sm:px-6 sm:py-20 lg:px-0 lg:py-24">
        <PageIntro
          overline="Контакт"
          title="Начать разговор"
          lead="Напишите в Telegram и сразу обозначьте задачу. Ниже — четыре повода для разговора."
        />

        <a
          href={siteLinks.telegramDm}
          target="_blank"
          rel="noreferrer"
          data-primary-action="telegram"
          className="group mt-10 inline-flex min-h-11 items-center gap-3 border-b border-primary/60 py-3 text-base font-semibold text-foreground hover:text-primary sm:mt-12"
        >
          Написать в Telegram
          <ArrowUpRight
            aria-hidden="true"
            className="size-5 text-primary transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
          <span className="sr-only">Внешняя ссылка, откроется в новой вкладке</span>
        </a>

        <section className="mt-16 sm:mt-20" aria-labelledby="contact-contexts-heading">
          <h2
            id="contact-contexts-heading"
            className="font-mono text-xs uppercase tracking-[0.12em] text-primary"
          >
            С чем можно обратиться
          </h2>
          <div className="mt-5 border-t border-border/80">
            {contactContexts.map((context) => (
              <div
                key={context.index}
                data-contact-context={context.index}
                className="grid gap-3 border-b border-border/80 py-6 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-6 sm:py-8"
              >
                <span className="font-mono text-[0.6875rem] tracking-[0.1em] text-primary">
                  {context.index}
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{context.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {context.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </MarketingPage>
  );
}
