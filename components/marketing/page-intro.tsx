type PageIntroProps = {
  overline: string;
  title: string;
  lead: string;
};

export function PageIntro({ overline, title, lead }: PageIntroProps) {
  return (
    <header className="max-w-3xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-primary">
        {overline}
      </p>
      <h1 className="mt-4 text-[2.5rem] font-semibold leading-[1.1] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      <p className="mt-6 max-w-[45rem] text-lg leading-8 text-muted-foreground sm:text-xl sm:leading-8">
        {lead}
      </p>
    </header>
  );
}
