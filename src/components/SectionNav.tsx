import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "About Me" },
  { id: "hobbies", label: "Hobbies" },
  { id: "patents", label: "Patents" },
  { id: "projects", label: "Projects" },
];

export function SectionNav() {
  const [pastHero, setPastHero] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    // A center-line rootMargin (rather than a size-based threshold) so
    // "active" tracks correctly even for sections taller than the
    // viewport, like Projects.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target.id === "home") {
            setPastHero(!entry.isIntersecting);
          }
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 },
    );

    for (const { id } of sections) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Section navigation"
      className={`fixed top-1/2 right-10 z-10 hidden -translate-y-1/2 flex-col gap-4 transition-opacity duration-300 lg:flex ${
        pastHero ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          onClick={() =>
            document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
          }
          className="group flex items-center gap-3"
        >
          <span
            className={`h-2.5 w-2.5 shrink-0 rounded-full border transition ${
              active === id
                ? "border-amber-400 bg-amber-400"
                : "border-neutral-600 bg-transparent group-hover:border-neutral-400"
            }`}
          />
          <span
            className={`text-sm font-medium transition ${
              active === id
                ? "text-white"
                : "text-neutral-500 group-hover:text-neutral-300"
            }`}
          >
            {label}
          </span>
        </button>
      ))}
    </nav>
  );
}
