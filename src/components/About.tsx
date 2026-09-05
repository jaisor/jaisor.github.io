import { Radio, ScrollText } from "lucide-react";
import jaisorLogo from "../assets/jaisor-logo.svg";
import { patents } from "../data/patents";
import { ScrollCue } from "./ScrollCue";

export function About() {
  return (
    <section
      id="about"
      aria-label="About Me"
      className="min-h-screen snap-start px-6 py-12 lg:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          About Me
        </h2>

        <div className="mt-10 space-y-4 text-neutral-400 lg:mt-14 lg:text-lg">
          <p>
            Currently, I am an Engineering Director at PayPal, responsible
            for the Promotions Platform powering incentive campaigns and
            rewards across PayPal and Venmo. Previously, I led core
            technology teams at Honey, Atom Tickets, and Amazon.
          </p>
          <p>
            Personally, I continue to pursue and experiment with the latest tech.
            I am fascinated by the intersection of software and
            hardware, and I enjoy tinkering with IoT devices, robotics, and
            embedded systems. The recent AI revolution is particularly
            exciting, with its potential to accelerate and transform
            how we innovate.
          </p>
        </div>

        <h3 className="mt-12 text-lg font-semibold text-white lg:mt-16 lg:text-xl">
          Patents & Braggables
        </h3>

        <ul className="mt-4 flex flex-col gap-3">
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

        <h3 className="mt-12 text-lg font-semibold text-white lg:mt-16 lg:text-xl">
          Who is Jaisor?
        </h3>

        <p className="mt-4 text-neutral-400 lg:mt-6 lg:text-lg">
          I picked the handle "Jaisor" back in the 90s, in the days of
          ICQ, BBS and dial-up modems. As the internet grew, it
          turned out to be available on almost every new e-place
          that popped-up, so I kept picking it until it became my online identity.
          These days, if you spot "Jaisor" somewhere online, chances are
          it's connected to me. I even designed a logo for it &mdash;
          originally for my guitar builds &mdash; but it came out
          stylized and techie enough to use across all my hobbies.
        </p>

        <img
          src={jaisorLogo}
          alt="The Jaisor logo: a hexagon icon flanked by chevrons around a stylized letter J, next to the JAISOR wordmark"
          className="mx-auto mt-4 h-auto w-1/2 lg:mt-6"
        />

        <ScrollCue
          targetId="hobbies"
          label="Hobbies & Interests"
          className="mt-12 lg:mt-16"
        />
      </div>
    </section>
  );
}
