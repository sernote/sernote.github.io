import { EditorialLink } from "@/components/editorial/editorial-link";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  index?: string;
  action?: {
    href: string;
    label: string;
  };
  className?: string;
};

export function SectionHeading({ title, index, action, className }: SectionHeadingProps) {
  return (
    <header className={cn("flex min-h-12 items-center justify-between gap-6", className)}>
      <h2 className="section-kicker flex-1">
        {index ? <span data-kicker-index="">{index}</span> : null}
        <span>{title}</span>
      </h2>
      {action ? (
        <EditorialLink href={action.href} className="shrink-0 text-sm">
          {action.label}
        </EditorialLink>
      ) : null}
    </header>
  );
}
