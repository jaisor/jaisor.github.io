import type { Project } from "../data/projects";

export function ProjectCard({ title, description, link }: Project) {
  const Wrapper = link ? "a" : "div";

  return (
    <Wrapper
      {...(link ? { href: link, target: "_blank", rel: "noreferrer" } : {})}
      className="block rounded-xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:border-slate-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-slate-700"
    >
      <h3 className="font-medium text-slate-900 dark:text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-slate-600 dark:text-slate-400">
        {description}
      </p>
    </Wrapper>
  );
}
