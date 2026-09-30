"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import { useRef, useState } from "react";

import { RU_PRIMARY_NAV, isActiveNavItem } from "@/lib/site-routes";

type MobileNavigationProps = {
  currentPath: string;
  contactHref: string;
};

export function MobileNavigation({ currentPath, contactHref }: MobileNavigationProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          className="editorial-mobile-nav-trigger min-h-11 min-w-11 items-center justify-center border border-[var(--border-strong)] px-3.5 text-sm font-medium text-foreground"
        >
          Меню
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[rgb(3_5_8/0.72)]" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex min-h-dvh flex-col overflow-y-auto bg-background px-5 pb-8 text-foreground"
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            closeRef.current?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            triggerRef.current?.focus();
          }}
        >
          <div className="flex min-h-[60px] items-center justify-between border-b border-border">
            <Link href="/" onClick={() => setOpen(false)} className="inline-flex min-h-11 items-center font-semibold">
              Сергей Нотевский
            </Link>
            <Dialog.Close asChild>
              <button
                ref={closeRef}
                type="button"
                className="inline-flex min-h-11 min-w-11 items-center justify-center border border-[var(--border-strong)] px-3.5 text-sm font-medium text-foreground"
              >
                Закрыть
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Title className="sr-only">Навигация</Dialog.Title>
          <Dialog.Description className="sr-only">
            Основные разделы сайта и Telegram-канал автора.
          </Dialog.Description>

          <p className="section-kicker mt-8" aria-hidden="true">Разделы</p>
          <nav aria-label="Мобильная навигация" className="mt-3 flex flex-col border-t border-border">
            {RU_PRIMARY_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActiveNavItem(currentPath, item.href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="flex min-h-16 items-center justify-between border-b border-border text-2xl font-semibold tracking-[-0.025em] text-foreground aria-[current=page]:text-primary"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={contactHref}
              onClick={() => setOpen(false)}
              className="mt-8 flex min-h-14 items-center justify-center border border-primary text-base font-medium text-primary"
            >
              Telegram-канал
            </a>
          </nav>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
