import { tags } from "../data/tags";
import { ScrollCue } from "./ScrollCue";

export function Interests() {
  return (
    <section
      id="hobbies"
      aria-label="Hobbies & Interests"
      className="min-h-screen snap-start px-6 py-12 lg:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Hobbies &amp; Interests
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {tags.map(
            ({ id, label, icon: Icon, description, links, link, linkLabel }) => (
              <div
                key={id}
                className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-left shadow-sm shadow-black/20 transition [corner-shape:bevel] hover:border-amber-500/40 hover:shadow-md hover:shadow-black/30 lg:p-8"
              >
                <div className="flex items-center gap-3">
                  <Icon className="h-6 w-6 shrink-0 text-amber-500 lg:h-7 lg:w-7" />
                  <h3 className="font-semibold text-white lg:text-lg">
                    {label}
                  </h3>
                </div>
                <p className="mt-3 text-sm text-neutral-400 lg:text-base">
                  {description}
                </p>
                {links && (
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 marker:text-amber-500">
                    {links.map(({ label: linkText, href }) => (
                      <li key={href}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-amber-500 transition hover:text-amber-400"
                        >
                          {linkText}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
                {link && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-block text-sm font-medium text-amber-500 transition hover:text-amber-400"
                  >
                    {linkLabel ?? "Learn more →"}
                  </a>
                )}
              </div>
            )
          )}
        </div>

        <ScrollCue
          targetId="posts"
          label="Blog & Posts"
          className="mt-12 lg:mt-16"
        />
      </div>
    </section>
  );
}
