import { Radio, ScrollText } from "lucide-react";
import { patents } from "../data/patents";
import { Backdrop } from "./Backdrop";
import { Footer } from "./Footer";

export function AboutPage() {
  return (
    <div className="relative isolate min-h-screen bg-neutral-950">
      <Backdrop />

      <article className="mx-auto max-w-2xl px-6 py-16 lg:py-24">
        <a
          href="/"
          className="text-sm font-medium text-amber-500 transition hover:text-amber-400"
        >
          &larr; Back home
        </a>

        <h1 className="mt-8 text-3xl font-bold tracking-tight text-white lg:text-4xl">
          About Me
        </h1>

        <div className="mt-6 space-y-4 text-neutral-400 lg:text-lg">
          <p className="text-balance">
            Currently, I am an Engineering Director at PayPal, responsible
            for the Promotions Platform powering incentive campaigns and
            rewards across PayPal and Venmo. Previously, I led core
            technology teams at Honey, Atom Tickets, and Amazon.
          </p>
          <p className="text-balance">
            Personally, I continue to build and explore the latest tech.
            tools. I am fascinatged by the intersection of software and
            hardware, and I enjoy tinkering with IoT devices, robotics, and
            embedded systems. The current AI revolution is particularly
            exciting, with its potential to accelerate and transform
            innovation.
          </p>
        </div>

        <section className="mt-14" aria-label="Braggables">
          <h2 className="text-xl font-bold tracking-tight text-white lg:text-2xl">
            Braggables
          </h2>

          <ul className="mt-5 flex flex-col gap-3">
            {patents.map(({ number, title, url }) => (
              <li key={number}>
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm shadow-sm shadow-black/20 transition [corner-shape:bevel] hover:border-amber-500/40 hover:shadow-md hover:shadow-black/30"
                >
                  <ScrollText className="h-4 w-4 shrink-0 text-amber-500" />
                  <span className="text-neutral-300">
                    <span className="font-medium text-amber-500">
                      US {number}
                    </span>{" "}
                    &mdash; {title}
                  </span>
                </a>
              </li>
            ))}
            <li className="flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/50 px-4 py-3 text-sm text-neutral-300 shadow-sm shadow-black/20 [corner-shape:bevel]">
              <Radio className="h-4 w-4 shrink-0 text-amber-500" />
              FCC Amateur Radio (HAM) License holder &mdash; callsign KK6VYN
            </li>
          </ul>
        </section>
      </article>

      <Footer />
    </div>
  );
}
