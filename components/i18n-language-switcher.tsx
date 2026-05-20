import Link from "next/link";

import { alternateLocalePath, getDictionary, type Locale } from "@/lib/i18n";

export function LanguageSwitcher({ locale, currentPath }: { locale: Locale; currentPath: string }) {
  const dictionary = getDictionary(locale);

  return (
    <Link
      href={alternateLocalePath(currentPath, locale)}
      className="mb-4 inline-flex rounded-md border border-border px-3 py-1.5 font-mono text-xs uppercase text-primary hover:bg-accent"
    >
      {dictionary.language.switchTo}
    </Link>
  );
}
