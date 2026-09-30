import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { MobileNavigation } from "@/components/site/mobile-navigation";
import { AUTHOR_PROFILE } from "@/lib/author-profile";
import { siteLinks } from "@/lib/i18n";
import { RU_PRIMARY_NAV, isActiveNavItem } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

type EditorialShellProps = {
  children: ReactNode;
  currentPath?: string;
  mainClassName?: string;
};

const frameClassName = "mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-[72px]";

const footerLinkClassName =
  "inline-flex min-h-10 items-center text-sm text-muted-foreground transition-colors hover:text-foreground";

export function EditorialShell({
  children,
  currentPath = "/",
  mainClassName
}: EditorialShellProps) {
  return (
    <div className="editorial-shell flex min-h-screen flex-col bg-background text-foreground">
      <a href="#main-content" className="skip-link">
        Перейти к содержанию
      </a>

      <header className="site-header">
        <div className={cn(frameClassName, "flex min-h-[60px] items-center justify-between gap-6 md:min-h-[68px]")}>
          <Link href="/" className="group inline-flex min-h-10 items-baseline gap-3">
            <span className="text-[0.95rem] font-semibold tracking-[-0.01em] text-foreground">
              {AUTHOR_PROFILE.name}
            </span>
            <span className="hidden font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted-foreground lg:inline">
              {AUTHOR_PROFILE.role}
            </span>
          </Link>
          <div className="editorial-desktop-nav">
            <nav aria-label="Основная навигация" className="flex items-center gap-7">
              {RU_PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActiveNavItem(currentPath, item.href) ? "page" : undefined}
                  className="inline-flex min-h-10 items-center border-b border-transparent text-sm text-muted-foreground transition-colors hover:text-foreground aria-[current=page]:border-primary aria-[current=page]:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href={siteLinks.telegram}
              className="inline-flex min-h-10 items-center gap-1.5 border border-[var(--border-strong)] px-3.5 text-sm font-medium text-foreground transition-colors hover:border-primary hover:text-primary"
            >
              Telegram-канал
              <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </a>
          </div>
          <MobileNavigation currentPath={currentPath} contactHref={siteLinks.telegram} />
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className={cn("content-safe min-w-0 flex-1", mainClassName)}>
        {children}
      </main>

      <footer className="border-t border-border bg-[var(--surface-subtle)]">
        <div className={cn(frameClassName, "grid gap-8 py-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end md:py-12")}>
          <div>
            <p className="text-base font-semibold tracking-[-0.01em] text-foreground">{AUTHOR_PROFILE.name}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {AUTHOR_PROFILE.role} в {AUTHOR_PROFILE.company}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-7 gap-y-1">
            <a href="/rss.xml" className={footerLinkClassName}>RSS</a>
            <a href={siteLinks.telegram} className={footerLinkClassName}>
              Telegram
            </a>
            <a href={siteLinks.habr} className={footerLinkClassName}>
              Хабр
            </a>
            <a href="https://github.com/sernote" className={footerLinkClassName}>
              GitHub
            </a>
          </div>
        </div>
        <div className="border-t border-border">
          <div className={cn(frameClassName, "flex min-h-14 items-center")}>
            <p className="font-mono text-xs text-muted-foreground">© 2026 Сергей Нотевский</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
