import Link from "next/link";
import type { ReactNode } from "react";

import { MobileNavigation } from "@/components/site/mobile-navigation";
import { siteLinks } from "@/lib/i18n";
import { RU_PRIMARY_NAV, isActiveNavItem } from "@/lib/site-routes";
import { cn } from "@/lib/utils";

type EditorialShellProps = {
  children: ReactNode;
  currentPath?: string;
  mainClassName?: string;
};

const frameClassName = "mx-auto w-full max-w-[1440px] px-5 md:px-10 lg:px-[72px]";

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

      <header className="border-b border-border bg-background">
        <div className={cn(frameClassName, "flex min-h-[60px] items-center justify-between md:min-h-[72px]")}>
          <Link href="/" className="inline-flex min-h-10 items-center text-sm font-semibold">
            Сергей Нотевский
          </Link>
          <div className="editorial-desktop-nav">
            <nav aria-label="Основная навигация" className="flex items-center gap-8">
              {RU_PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActiveNavItem(currentPath, item.href) ? "page" : undefined}
                  className="inline-flex min-h-10 items-center border-b border-transparent text-sm text-foreground hover:text-primary aria-[current=page]:border-primary aria-[current=page]:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <a
              href={siteLinks.telegramDm}
              className="inline-flex min-h-10 items-center text-sm font-medium text-primary hover:underline"
            >
              Написать в Telegram
            </a>
          </div>
          <MobileNavigation currentPath={currentPath} contactHref={siteLinks.telegramDm} />
        </div>
      </header>

      <main id="main-content" tabIndex={-1} className={cn("content-safe min-w-0 flex-1", mainClassName)}>
        {children}
      </main>

      <footer className="border-t border-border bg-[var(--surface-subtle)]">
        <div
          className={cn(
            frameClassName,
            "flex min-h-24 flex-col justify-center gap-4 py-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
          )}
        >
          <p>© 2026 Сергей Нотевский</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <a href="/rss.xml" className="inline-flex min-h-10 items-center hover:text-primary">RSS</a>
            <a href={siteLinks.telegram} className="inline-flex min-h-10 items-center hover:text-primary">
              Telegram
            </a>
            <a href={siteLinks.habr} className="inline-flex min-h-10 items-center hover:text-primary">
              Хабр
            </a>
            <a href="https://github.com/sernote" className="inline-flex min-h-10 items-center hover:text-primary">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
