export const RU_PRIMARY_NAV = [
  { label: "Блог", href: "/blog" },
  { label: "Материалы", href: "/materials" },
  { label: "AI Platform", href: "/ai-platform" },
  { label: "Обо мне", href: "/about" }
] as const;

const CANONICAL_STATIC_ROUTES = [
  "/",
  "/blog",
  "/work",
  "/talks",
  "/projects",
  "/ai-platform",
  "/ai-platform/map",
  "/about",
  "/contact",
  "/tools",
  "/tools/prefix-cache-auditor",
  "/tools/llm-cost-calculator",
  "/tools/ai-quality-gate-checklist",
  "/writing",
  "/handbook",
  "/en",
  "/en/about",
  "/en/contact",
  "/en/projects",
  "/en/talks",
  "/en/writing",
  "/en/tools",
  "/en/tools/prefix-cache-auditor",
  "/en/tools/llm-cost-calculator",
  "/en/tools/ai-quality-gate-checklist",
  "/en/handbook",
  "/ru",
  "/ru/about",
  "/ru/contact",
  "/ru/projects",
  "/ru/talks",
  "/ru/writing",
  "/ru/tools",
  "/ru/tools/prefix-cache-auditor",
  "/ru/tools/llm-cost-calculator",
  "/ru/tools/ai-quality-gate-checklist",
  "/ru/handbook"
] as const;

type Locale = "en" | "ru";

type ActualLocalePair = Readonly<Record<Locale, string>>;

const ACTUAL_LOCALE_PAIRS: readonly ActualLocalePair[] = [
  { ru: "/", en: "/en" },
  { ru: "/about", en: "/en/about" },
  { ru: "/contact", en: "/en/contact" },
  { ru: "/tools", en: "/en/tools" },
  {
    ru: "/tools/prefix-cache-auditor",
    en: "/en/tools/prefix-cache-auditor"
  },
  {
    ru: "/tools/llm-cost-calculator",
    en: "/en/tools/llm-cost-calculator"
  },
  {
    ru: "/tools/ai-quality-gate-checklist",
    en: "/en/tools/ai-quality-gate-checklist"
  }
];

function normalizePath(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0] || "/";
  const withLeadingSlash = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return withLeadingSlash === "/" ? "/" : withLeadingSlash.replace(/\/+$/, "");
}

function isPathWithin(currentPath: string, sectionPath: string): boolean {
  return currentPath === sectionPath || currentPath.startsWith(`${sectionPath}/`);
}

export function getCanonicalStaticRoutes(): string[] {
  return [...CANONICAL_STATIC_ROUTES];
}

export function getActualAlternate(path: string, locale: Locale): string | null {
  const normalized = normalizePath(path);
  const pair = ACTUAL_LOCALE_PAIRS.find((candidate) => candidate[locale] === normalized);

  return pair?.[locale === "ru" ? "en" : "ru"] ?? null;
}

export function isActiveNavItem(currentPath: string, href: string): boolean {
  let current = normalizePath(currentPath);
  const target = normalizePath(href);

  if (target === "/en" || target === "/ru") {
    return current === target;
  }

  if (current === "/ru" || current.startsWith("/ru/")) {
    current = current.slice(3) || "/";
  }

  if (target === "/") {
    return current === "/";
  }

  if (target === "/materials") {
    return ["/materials", "/work", "/talks", "/projects"].some((section) =>
      isPathWithin(current, section)
    );
  }

  return isPathWithin(current, target);
}
