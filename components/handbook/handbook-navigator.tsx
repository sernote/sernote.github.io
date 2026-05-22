"use client";

import Link from "next/link";
import { Bookmark, CheckCircle2, Filter, Route } from "lucide-react";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toggleStoredSet, useHandbookLocalSet } from "@/components/handbook/local-handbook-state";
import {
  handbookCatalog,
  handbookFormats,
  handbookTracks,
  localizeCatalogItem,
  type HandbookFormat,
  type HandbookTrack
} from "@/lib/handbook-catalog";
import type { Locale } from "@/lib/i18n";

type FilterFormat = HandbookFormat | "all";
type FilterTrack = HandbookTrack | "all";

const copy = {
  en: {
    title: "Handbook navigator",
    copy: "Filter the first release by format or role, then mark what you have read. Progress stays in this browser only.",
    formats: "Formats",
    tracks: "Role tracks",
    progress: "Progress",
    read: "read",
    bookmarked: "bookmarked",
    planned: "Planned",
    markRead: "Mark read",
    unread: "Read",
    bookmark: "Bookmark",
    bookmarkedAction: "Bookmarked",
    open: "Open",
    localOnly: "Local progress only. No account, tracking or backend."
  },
  ru: {
    title: "Навигатор хэндбука",
    copy: "Фильтруйте первый релиз по формату или роли и отмечайте прочитанное. Прогресс хранится только в этом браузере.",
    formats: "Форматы",
    tracks: "Роли",
    progress: "Прогресс",
    read: "прочитано",
    bookmarked: "в закладках",
    planned: "Запланировано",
    markRead: "Отметить",
    unread: "Прочитано",
    bookmark: "В закладки",
    bookmarkedAction: "В закладках",
    open: "Открыть",
    localOnly: "Только локальное состояние. Без аккаунта, слежки и backend."
  }
} as const;

export function HandbookNavigator({ locale = "en" }: { locale?: Locale }) {
  const t = copy[locale];
  const [format, setFormat] = useState<FilterFormat>("all");
  const [track, setTrack] = useState<FilterTrack>("all");
  const progress = useHandbookLocalSet(locale, "progress");
  const bookmarks = useHandbookLocalSet(locale, "bookmarks");

  const items = useMemo(
    () =>
      handbookCatalog
        .map((item) => localizeCatalogItem(item, locale))
        .filter((item) => (format === "all" ? true : item.format === format))
        .filter((item) => (track === "all" ? true : item.tracks.includes(track))),
    [format, locale, track]
  );

  const availableIds = useMemo(
    () =>
      handbookCatalog
        .filter((item) => item.status === "available")
        .map((item) => localizeCatalogItem(item, locale).storageId),
    [locale]
  );
  const readCount = availableIds.filter((id) => progress.has(id)).length;
  const bookmarkCount = availableIds.filter((id) => bookmarks.has(id)).length;

  return (
    <section className="mt-20 rounded-lg border border-border bg-card/45 p-5 sm:p-6">
      <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">
        <div>
          <div className="flex items-center gap-2">
            <Route className="h-4 w-4 text-primary" />
            <p className="font-mono text-xs uppercase text-primary">{t.title}</p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold tracking-normal md:text-5xl">{t.copy}</h2>

          <div className="mt-6 rounded-lg border border-border/80 bg-background/50 p-4">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <p className="font-mono text-xs uppercase text-muted-foreground">{t.progress}</p>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md border border-border/80 bg-card/70 p-3">
                <p className="text-2xl font-semibold">
                  {readCount}/{availableIds.length}
                </p>
                <p className="mt-1 text-muted-foreground">{t.read}</p>
              </div>
              <div className="rounded-md border border-border/80 bg-card/70 p-3">
                <p className="text-2xl font-semibold">{bookmarkCount}</p>
                <p className="mt-1 text-muted-foreground">{t.bookmarked}</p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-muted-foreground">{t.localOnly}</p>
          </div>
        </div>

        <div>
          <div className="grid gap-4">
            <FilterGroup title={t.formats}>
              {handbookFormats.map((item) => (
                <FilterButton
                  key={item.id}
                  active={format === item.id}
                  onClick={() => setFormat(item.id)}
                  label={item.label[locale]}
                />
              ))}
            </FilterGroup>

            <FilterGroup title={t.tracks}>
              {handbookTracks.map((item) => (
                <FilterButton
                  key={item.id}
                  active={track === item.id}
                  onClick={() => setTrack(item.id)}
                  label={item.label[locale]}
                />
              ))}
            </FilterGroup>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {items.map((item) => {
              const isRead = progress.has(item.storageId);
              const isBookmarked = bookmarks.has(item.storageId);
              const body = (
                <div className="h-full rounded-lg border border-border bg-background/55 p-4 transition-colors hover:border-primary/45">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{handbookFormats.find((formatItem) => formatItem.id === item.format)?.label[locale]}</Badge>
                        {item.status === "planned" ? <Badge variant="muted">{t.planned}</Badge> : null}
                      </div>
                      <h3 className="mt-3 text-lg font-semibold">{item.title}</h3>
                    </div>
                    {isBookmarked ? <Bookmark className="h-4 w-4 fill-primary text-primary" /> : null}
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
                </div>
              );

              return (
                <article key={item.id} className="grid gap-2">
                  {item.href ? (
                    <Link href={item.href} className="block h-full">
                      {body}
                    </Link>
                  ) : (
                    body
                  )}
                  {item.status === "available" ? (
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant={isRead ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => toggleStoredSet(locale, "progress", item.storageId)}
                      >
                        {isRead ? t.unread : t.markRead}
                      </Button>
                      <Button
                        type="button"
                        variant={isBookmarked ? "secondary" : "outline"}
                        size="sm"
                        onClick={() => toggleStoredSet(locale, "bookmarks", item.storageId)}
                      >
                        {isBookmarked ? t.bookmarkedAction : t.bookmark}
                      </Button>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function FilterGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <Filter className="h-3.5 w-3.5 text-primary" />
        <p className="font-mono text-xs uppercase text-muted-foreground">{title}</p>
      </div>
      <div className="flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

function FilterButton({ active, label, onClick }: { active: boolean; label: string; onClick: () => void }) {
  return (
    <Button type="button" variant={active ? "secondary" : "outline"} size="sm" onClick={onClick}>
      {label}
    </Button>
  );
}
