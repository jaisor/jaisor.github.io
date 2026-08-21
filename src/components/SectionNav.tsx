import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "hobbies", label: "Hobbies" },
  { id: "posts", label: "Blog & Posts" },
];

export function SectionNav() {
  const [pastHero, setPastHero] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    // A center-line rootMargin (rather than a size-based threshold) so
    // "active" tracks correctly even for sections taller than the
    // viewport, like Posts.
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
      className={`fixed inset-x-0 top-0 z-20 hidden justify-center border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur transition-opacity duration-300 lg:flex ${
        pastHero ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="flex items-center gap-8 px-6 py-4">
        {sections.map(({ id, label }) => (
          <button
            key={id}
            type="button"
            onClick={() =>
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="group flex items-center gap-2"
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
      </div>
    </nav>
  );
}
