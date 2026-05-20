type ChecklistProps = {
  items: string[];
};

export function Checklist({ items }: ChecklistProps) {
  return (
    <ul className="my-6 grid gap-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 rounded-md border border-border bg-card/55 p-3 text-sm">
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded border border-primary/40 font-mono text-[10px] text-primary">
            ✓
          </span>
          <span className="text-muted-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

