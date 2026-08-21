import { useMemo, useState, type ReactNode } from "react";
import { buckets, projects, type BucketId } from "../data/projects";
import { ProjectCard } from "./ProjectCard";

type Filter = BucketId | "all";

export function Projects() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all" ? projects : projects.filter((p) => p.bucket === filter),
    [filter],
  );

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="min-h-screen snap-start px-6 py-24 lg:pr-32 xl:pr-40"
    >
      <div className="mx-auto max-w-4xl lg:max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Projects
        </h2>

        <div className="mt-5 flex flex-wrap justify-center gap-2 lg:mt-8 lg:gap-3">
          <FilterPill
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All
          </FilterPill>
          {buckets.map(({ id, label, icon: Icon }) => (
            <FilterPill
              key={id}
              active={filter === id}
              onClick={() => setFilter(id)}
            >
              <Icon className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              {label}
            </FilterPill>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {visible.map((project) => (
            <ProjectCard
              key={`${project.bucket}-${project.title}`}
              {...project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition [corner-shape:bevel] lg:gap-2 lg:px-5 lg:py-2 lg:text-base ${
        active
          ? "border-amber-400 bg-amber-400 text-neutral-950"
          : "border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}
