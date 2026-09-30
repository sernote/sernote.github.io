import type { ContentToc as Toc } from "@/lib/content-v3/source-core";

function TocLinks({ headings, columns = false }: { headings: Toc; columns?: boolean }) {
  return (
    <ol className={`m-0 mt-3 grid list-none gap-x-8 p-0 ${columns ? "sm:grid-cols-2" : ""}`}>
      {headings.map((heading, index) => (
        <li key={heading.url} className="m-0 p-0">
          <a href={heading.url} className="group inline-flex min-h-11 items-baseline gap-3 py-2 text-sm text-foreground hover:text-primary">
            <span aria-hidden="true" className="font-mono text-[0.6875rem] text-muted-foreground group-hover:text-primary">{String(index + 1).padStart(2, "0")}</span>
            {heading.title}
          </a>
        </li>
      ))}
    </ol>
  );
}

/** Links come from the MDX compiler, including its duplicate-heading handling. */
export function ContentToc({ toc = [], variant = "inline" }: { toc?: Toc; variant?: "inline" | "reference" }) {
  const headings = toc.filter((item) => item.depth === 2);
  if (headings.length === 0) return null;
  if (variant === "reference") {
    return (
      <>
        <details className="group border-y border-border lg:hidden">
          <summary className="min-h-11 cursor-pointer py-4 text-sm font-semibold marker:text-primary">Содержание</summary>
          <nav aria-label="Содержание главы" className="pb-4"><TocLinks headings={headings} /></nav>
        </details>
        <nav aria-label="Содержание главы" className="max-h-[calc(100dvh-8rem)] overflow-y-auto border-l border-border pl-6 max-lg:hidden">
          <p className="section-kicker">Содержание</p>
          <TocLinks headings={headings} />
        </nav>
      </>
    );
  }
  return (
    <nav aria-label="В этой статье" className="not-prose panel my-8 max-w-[760px] px-5 py-5 md:px-7">
      <p className="section-kicker">Содержание</p>
      <TocLinks headings={headings} columns />
    </nav>
  );
}
