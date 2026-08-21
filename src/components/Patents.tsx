import { ScrollText } from "lucide-react";
import { patents } from "../data/patents";

export function Patents() {
  return (
    <section
      id="patents"
      aria-label="Patents"
      className="min-h-screen snap-start px-6 py-24 lg:pr-32 xl:pr-40"
    >
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Patents
        </h2>

        <div className="mt-10 flex flex-col gap-4 lg:mt-14 lg:gap-6">
          {patents.map(({ number, title, url }) => (
            <a
              key={number}
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-xl border border-neutral-800 bg-neutral-900/50 p-6 text-left transition [corner-shape:bevel] hover:border-amber-500/40 lg:gap-5 lg:p-7"
            >
              <ScrollText className="h-6 w-6 shrink-0 text-amber-500 lg:h-7 lg:w-7" />
              <div>
                <p className="text-sm font-medium text-amber-500 lg:text-base">
                  US {number}
                </p>
                <h3 className="mt-1 font-semibold text-white lg:text-lg">
                  {title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
