import { buckets } from "../data/projects";

export function Interests() {
  return (
    <section
      id="hobbies"
      aria-label="Hobbies"
      className="flex min-h-screen snap-start flex-col items-center justify-center gap-10 px-6 py-24 text-center lg:gap-14"
    >
      <div className="mx-auto max-w-xl lg:max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl lg:text-4xl">
          Hobbies
        </h2>
        <p className="mt-4 text-neutral-400 lg:mt-6 lg:text-lg">
          Outside of work: FPV drones, embedded electronics and
          microcontrollers, 3D printing, guitars, motorcycles, and RV
          camping. Licensed amateur radio operator (FCC callsign KK6VYN) and
          AMA member.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
        {buckets.map(({ id, label, icon: Icon }) => (
          <li
            key={id}
            className="flex flex-col items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-6 py-5 text-sm font-medium text-neutral-300 lg:gap-3 lg:px-8 lg:py-7 lg:text-base"
          >
            <Icon className="h-6 w-6 text-amber-500 lg:h-8 lg:w-8" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
