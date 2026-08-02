import { EditorialLink } from "@/components/editorial/editorial-link";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  action?: {
    href: string;
    label: string;
  };
  className?: string;
};

export function SectionHeading({ title, action, className }: SectionHeadingProps) {
  return (
    <header
      className={cn(
        "flex min-h-16 items-center justify-between gap-4 border-b border-border py-3",
        className
      )}
    >
      <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-primary">{title}</h2>
      {action ? (
        <EditorialLink href={action.href} className="text-xs uppercase tracking-[0.08em]">
          {action.label}
        </EditorialLink>
      ) : null}
    </header>
  );
}
