"use client";

import { Bookmark, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { toggleStoredSet, useHandbookLocalSet } from "@/components/handbook/local-handbook-state";
import type { Locale } from "@/lib/i18n";

type ChapterActionsProps = {
  locale?: Locale;
  itemId: string;
};

const copy = {
  en: {
    markRead: "Mark read",
    read: "Read",
    bookmark: "Bookmark",
    bookmarked: "Bookmarked",
    note: "Saved only in this browser."
  },
  ru: {
    markRead: "Отметить",
    read: "Прочитано",
    bookmark: "В закладки",
    bookmarked: "В закладках",
    note: "Хранится только в этом браузере."
  }
} as const;

export function ChapterActions({ locale = "en", itemId }: ChapterActionsProps) {
  const t = copy[locale];
  const progress = useHandbookLocalSet(locale, "progress");
  const bookmarks = useHandbookLocalSet(locale, "bookmarks");
  const isRead = progress.has(itemId);
  const isBookmarked = bookmarks.has(itemId);

  return (
    <div className="mb-8 flex flex-wrap items-center gap-2 rounded-lg border border-border bg-card/45 p-3">
      <Button
        type="button"
        variant={isRead ? "secondary" : "outline"}
        size="sm"
        onClick={() => toggleStoredSet(locale, "progress", itemId)}
      >
        <CheckCircle2 data-icon="inline-start" />
        {isRead ? t.read : t.markRead}
      </Button>
      <Button
        type="button"
        variant={isBookmarked ? "secondary" : "outline"}
        size="sm"
        onClick={() => toggleStoredSet(locale, "bookmarks", itemId)}
      >
        <Bookmark data-icon="inline-start" />
        {isBookmarked ? t.bookmarked : t.bookmark}
      </Button>
      <span className="text-xs text-muted-foreground">{t.note}</span>
    </div>
  );
}
