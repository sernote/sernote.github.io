import Link from "next/link";

import { getDictionary, type Locale } from "@/lib/i18n";
import { getActualAlternate } from "@/lib/site-routes";

export function LanguageSwitcher({ locale, currentPath }: { locale: Locale; currentPath: string }) {
  const dictionary = getDictionary(locale);
  const alternatePath = getActualAlternate(currentPath, locale);

  if (!alternatePath) {
    return null;
  }

  return (
    <Link
      href={alternatePath}
      className="mb-4 inline-flex rounded-md border border-border px-3 py-1.5 font-mono text-xs uppercase text-primary hover:bg-accent"
    >
      {dictionary.language.switchTo}
    </Link>
  );
}
