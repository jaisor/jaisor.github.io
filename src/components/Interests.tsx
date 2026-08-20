import { buckets } from "../data/projects";

export function Interests() {
  return (
    <section
      id="hobbies"
      aria-label="Hobbies"
      className="flex min-h-screen snap-start flex-col items-center justify-center gap-10 px-6 py-24 text-center"
    >
      <div className="mx-auto max-w-xl">
        <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
          Hobbies
        </h2>
        <p className="mt-4 text-neutral-400">
          Outside of work: FPV drones, embedded electronics and
          microcontrollers, 3D printing, guitars, motorcycles, and RV
          camping. Licensed amateur radio operator (FCC callsign KK6VYN) and
          AMA member.
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {buckets.map(({ id, label, icon: Icon }) => (
          <li
            key={id}
            className="flex flex-col items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900 px-6 py-5 text-sm font-medium text-neutral-300"
          >
            <Icon size={24} className="text-amber-500" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
