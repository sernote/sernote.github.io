import Link from "next/link";
import type { ReactNode } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet";
import {
  getDictionary,
  getNavItems,
  getSiteConfig,
  localizedPath,
  type Locale
} from "@/lib/i18n";
import { getActualAlternate, isActiveNavItem } from "@/lib/site-routes";

type LocalizedShellProps = {
  locale?: Locale;
  currentPath?: string;
};

export function SiteHeader({ locale = "en", currentPath = "/" }: LocalizedShellProps) {
  const siteConfig = getSiteConfig(locale);
  const navItems = getNavItems(locale);
  const dictionary = getDictionary(locale);
  const languageHref = getActualAlternate(currentPath, locale);
  const contactHref = localizedPath("/contact", locale);
  const isContactActive = isActiveNavItem(currentPath, contactHref);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/82 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href={localizedPath("/", locale)} className="flex items-center gap-3">
          <span className="flex size-8 items-center justify-center rounded-md border border-primary/40 bg-primary/10 font-mono text-xs font-semibold text-primary">
            SN
          </span>
          <span className="text-sm font-semibold tracking-normal max-sm:hidden">{siteConfig.author}</span>
        </Link>
        <nav aria-label={dictionary.shell.primaryNavigation} className="flex items-center gap-5 max-md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActiveNavItem(currentPath, item.href) ? "page" : undefined}
              className="text-sm text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 max-md:hidden">
          {languageHref ? (
            <Button asChild variant="ghost" size="sm">
              <Link href={languageHref} aria-label={dictionary.language.switchTo}>
                {dictionary.language.alternate}
              </Link>
            </Button>
          ) : null}
          <Button asChild variant="outline" size="sm">
            <Link href={contactHref} aria-current={isContactActive ? "page" : undefined}>
              {dictionary.shell.contact}
            </Link>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label={dictionary.shell.openNavigation}>
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent closeLabel={dictionary.shell.closeNavigation}>
            <SheetHeader>
              <SheetTitle>{dictionary.shell.navigation}</SheetTitle>
              <SheetDescription className="sr-only">
                {dictionary.shell.navigationDescription}
              </SheetDescription>
            </SheetHeader>
            <nav aria-label={dictionary.shell.mobileNavigation} className="mt-8 flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActiveNavItem(currentPath, item.href) ? "page" : undefined}
                  className="text-sm text-muted-foreground hover:text-foreground aria-[current=page]:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
              {languageHref ? (
                <Link href={languageHref} className="text-sm text-primary">
                  {dictionary.language.switchTo}
                </Link>
              ) : null}
              <Link
                href={contactHref}
                aria-current={isContactActive ? "page" : undefined}
                className="text-sm text-primary"
              >
                {dictionary.shell.contact}
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function SkipLink({ locale = "en" }: Pick<LocalizedShellProps, "locale">) {
  return (
    <a href="#main-content" className="skip-link">
      {locale === "ru" ? "Перейти к содержанию" : "Skip to content"}
    </a>
  );
}

export function SiteFooter({ locale = "en" }: Pick<LocalizedShellProps, "locale">) {
  const siteConfig = getSiteConfig(locale);
  const dictionary = getDictionary(locale);

  return (
    <footer className="border-t border-border/70">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-muted-foreground sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <p>{dictionary.shell.footerLine}.</p>
          <div className="flex flex-wrap gap-4">
            <a href={siteConfig.links.telegram} target="_blank" rel="noreferrer">Telegram</a>
            <a href={siteConfig.links.habr} target="_blank" rel="noreferrer">Habr</a>
            <Link href={localizedPath("/contact", locale)}>{dictionary.shell.contact}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function MarketingPage({ children, locale = "en", currentPath = "/" }: { children: ReactNode } & LocalizedShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SkipLink locale={locale} />
      <SiteHeader locale={locale} currentPath={currentPath} />
      <main id="main-content" tabIndex={-1} className="content-safe min-w-0 flex-1">
        {children}
      </main>
      <SiteFooter locale={locale} />
    </div>
  );
}
