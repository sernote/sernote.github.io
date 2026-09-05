import type { ContentToc as Toc } from "@/lib/content-v3/source-core";

/** Links come from the MDX compiler, including its duplicate-heading handling. */
export function ContentToc({ toc = [] }: { toc?: Toc }) {
  const headings = toc.filter((item) => item.depth === 2);
  if (headings.length === 0) return null;
  return (
    <nav aria-label="В этой статье" className="my-8 max-w-[760px] border-y border-border py-5">
      <p className="text-sm font-semibold">Содержание</p>
      <ol className="mt-3 grid list-none gap-x-8 p-0 sm:grid-cols-2">
        {headings.map((heading) => (
          <li key={heading.url}>
            <a href={heading.url} className="inline-flex min-h-11 items-center py-2 text-sm text-primary underline-offset-4 hover:underline">{heading.title}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
