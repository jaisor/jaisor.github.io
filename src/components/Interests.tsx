import { buckets } from "../data/projects";

export function Interests() {
  return (
    <section
      id="hobbies"
      aria-label="Hobbies & Interests"
      className="min-h-screen snap-start px-6 py-24 lg:pr-32 xl:pr-40"
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Hobbies &amp; Interests
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-14 lg:grid-cols-3 lg:gap-6">
          {buckets.map(({ id, label, icon: Icon, description }) => (
            <div
              key={id}
              className="rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-left [corner-shape:bevel] lg:p-8"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
