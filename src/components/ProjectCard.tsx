import type { Project } from "../data/projects";

export function ProjectCard({ title, description, link }: Project) {
  const Wrapper = link ? "a" : "div";

  return (
    <Wrapper
      {...(link ? { href: link, target: "_blank", rel: "noreferrer" } : {})}
      className="block rounded-xl border border-neutral-800 bg-neutral-900 p-5 text-left shadow-sm shadow-black/20 transition hover:border-amber-500/40 hover:shadow-md hover:shadow-black/30"
    >
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="mt-1.5 text-sm text-neutral-400">{description}</p>
    </Wrapper>
  );
}
