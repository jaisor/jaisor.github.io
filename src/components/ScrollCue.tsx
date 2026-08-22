import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

/**
 * Clickable "there's more below" affordance, rendered under a section's
 * content. Scrolls to the next section on click. The last section has
 * nothing to point at, so it doesn't get one.
 *
 * The chevron bounces inside a stationary button so the hit target
 * doesn't move away from the cursor.
 *
 * It only shows when its section fits the viewport. Once the content
 * overflows, the cue sits below the fold where nobody sees it, and the
 * overflow is itself the scroll affordance. Hidden with `visibility`
 * rather than `display` so the space stays reserved — dropping it out of
 * flow would shrink the section back under the viewport and the
 * measurement would oscillate. `visibility: hidden` also takes it out of
 * the tab order and the accessibility tree.
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
  const ref = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(true);

  useEffect(() => {
    const section = ref.current?.closest("section");
    const root = section?.parentElement;
    if (!section || !root) return;

    // Measure against the scroll container, not window.innerHeight: the
    // container is `h-screen`, and on mobile browsers 100vh and
    // innerHeight disagree while the URL bar is showing.
    const measure = () =>
      setFits(section.getBoundingClientRect().height <= root.clientHeight + 1);

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`flex justify-center ${fits ? "" : "invisible"} ${className}`}
    >
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
