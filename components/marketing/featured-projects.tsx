import { SectionCard } from "@/components/marketing/section-card";
import { getDictionary, localizedPath, type Locale } from "@/lib/i18n";

export function FeaturedProjects({ locale = "en" }: { locale?: Locale }) {
  const projects = getDictionary(locale).projects.map(([title, description, href]) => ({
    title,
    description,
    href: localizedPath(href, locale)
  }));

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {projects.map((project) => (
        <SectionCard key={project.title} {...project} />
      ))}
    </div>
  );
}
