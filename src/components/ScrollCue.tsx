import { ChevronDown } from "lucide-react";

/**
 * Clickable "there's more below" affordance, rendered under a section's
 * content. Scrolls to the next section on click. The last section has
 * nothing to point at, so it doesn't get one.
 *
 * The chevron bounces inside a stationary button so the hit target
 * doesn't move away from the cursor.
 */
export function ScrollCue({
  targetId,
  label,
  className = "",
}: {
  targetId: string;
  label: string;
  className?: string;
}) {
  return (
    <div className={`flex justify-center ${className}`}>
      <button
        type="button"
        onClick={() =>
          document
            .getElementById(targetId)
            ?.scrollIntoView({ behavior: "smooth" })
        }
        className="rounded-full p-3 text-amber-500 transition hover:bg-neutral-900 hover:text-amber-400"
      >
        <ChevronDown
          aria-hidden
          className="h-7 w-7 animate-bounce lg:h-8 lg:w-8"
        />
        <span className="sr-only">Scroll to {label}</span>
      </button>
    </div>
  );
}
