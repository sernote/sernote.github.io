"use client";

import { useCallback, useSyncExternalStore } from "react";

import type { Locale } from "@/lib/i18n";

export type HandbookLocalStateType = "progress" | "bookmarks";

const eventName = "production-ai-platform-handbook-storage";

export function storageKey(locale: Locale, type: HandbookLocalStateType) {
  return `production-ai-platform-handbook:${locale}:${type}`;
}

export function readSetFromStorage(locale: Locale, type: HandbookLocalStateType) {
  if (typeof window === "undefined") {
    return new Set<string>();
  }

  try {
    const raw = window.localStorage.getItem(storageKey(locale, type));
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return new Set(Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : []);
  } catch {
    return new Set<string>();
  }
}

export function writeSetToStorage(locale: Locale, type: HandbookLocalStateType, value: Set<string>) {
  window.localStorage.setItem(storageKey(locale, type), JSON.stringify([...value]));
  window.dispatchEvent(new CustomEvent(eventName));
}

export function toggleStoredSet(locale: Locale, type: HandbookLocalStateType, id: string) {
  const next = readSetFromStorage(locale, type);
  if (next.has(id)) {
    next.delete(id);
  } else {
    next.add(id);
  }
  writeSetToStorage(locale, type, next);
}

export function useHandbookLocalSet(locale: Locale, type: HandbookLocalStateType) {
  const subscribe = useCallback((callback: () => void) => {
    window.addEventListener("storage", callback);
    window.addEventListener(eventName, callback);

    return () => {
      window.removeEventListener("storage", callback);
      window.removeEventListener(eventName, callback);
    };
  }, []);

  const getSnapshot = useCallback(() => JSON.stringify([...readSetFromStorage(locale, type)]), [locale, type]);
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => "[]");

  return new Set(JSON.parse(snapshot) as string[]);
}
