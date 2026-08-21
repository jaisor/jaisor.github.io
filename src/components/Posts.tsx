import { useMemo, useState, type ReactNode } from "react";
import { postsByDate } from "../data/posts";
import { tags, type TagId } from "../data/tags";
import { PostCard } from "./PostCard";

type Filter = TagId | "all";

export function Posts() {
  const [filter, setFilter] = useState<Filter>("all");

  const visible = useMemo(
    () =>
      filter === "all"
        ? postsByDate
        : postsByDate.filter((p) => p.tags.includes(filter)),
    [filter],
  );

  return (
    <section
      id="posts"
      aria-label="Blog & Posts"
      className="min-h-screen snap-start px-6 py-12 lg:py-24"
    >
      <div className="mx-auto max-w-4xl lg:max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Blog &amp; Posts
        </h2>

        <div className="mt-5 flex flex-wrap justify-center gap-2 lg:mt-8 lg:gap-3">
          <FilterPill
            active={filter === "all"}
            onClick={() => setFilter("all")}
          >
            All
          </FilterPill>
          {tags.map(({ id, label, icon: Icon }) => (
            <FilterPill
              key={id}
              active={filter === id}
              onClick={() => setFilter(id)}
            >
              <Icon aria-hidden className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
              {label}
            </FilterPill>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-12 lg:grid-cols-3 lg:gap-6">
          {visible.map((post) => (
            <PostCard key={post.slug} {...post} />
          ))}
        </div>

        {visible.length === 0 && (
          <p className="mt-12 text-center text-sm text-neutral-500">
            Nothing here yet — check back soon.
          </p>
        )}
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
      aria-pressed={active}
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
