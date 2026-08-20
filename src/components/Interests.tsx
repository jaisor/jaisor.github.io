import { buckets } from "../data/projects";

export function Interests() {
  return (
    <section aria-label="Interests" className="mx-auto max-w-2xl text-center">
      <p className="text-neutral-400">
        Outside of work: FPV drones, embedded electronics and
        microcontrollers, 3D printing, guitars, motorcycles, and RV camping.
        Licensed amateur radio operator (FCC callsign KK6VYN) and AMA member.
      </p>

      <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        {buckets.map(({ id, label, icon: Icon }) => (
          <li
            key={id}
            className="flex items-center gap-1.5 text-sm text-neutral-500"
          >
            <Icon size={16} className="text-amber-500/70" />
            {label}
          </li>
        ))}
      </ul>
    </section>
  );
}
