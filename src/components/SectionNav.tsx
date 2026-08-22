import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "hobbies", label: "Hobbies" },
  { id: "posts", label: "Blog & Posts" },
];

export function SectionNav() {
  const [pastHero, setPastHero] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

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

  // Scrolling back to the hero fades the control out; don't leave an
  // open menu floating behind it.
  useEffect(() => {
    if (!pastHero) setOpen(false);
  }, [pastHero]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const fade = pastHero ? "opacity-100" : "pointer-events-none opacity-0";

  return (
    <>
      {/* Desktop: a full-width bar across the top. */}
      <nav
        aria-label="Section navigation"
        className={`fixed inset-x-0 top-0 z-20 hidden justify-center border-b border-neutral-800/60 bg-neutral-950/80 backdrop-blur transition-opacity duration-300 lg:flex ${fade}`}
      >
        <div className="flex items-center gap-8 px-6 py-4">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              className="group flex items-center gap-2"
            >
              <Dot active={active === id} />
              <Label active={active === id}>{label}</Label>
            </button>
          ))}
        </div>
      </nav>

      {/* Phones and tablets: a menu button tucked above the section
          heading (which starts at 48px), so nothing overlaps. */}
      <nav aria-label="Section navigation" className="lg:hidden">
        {open && (
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-20 cursor-default"
          />
        )}

        <button
          type="button"
          aria-expanded={open}
          aria-controls="section-menu"
          onClick={() => setOpen((v) => !v)}
          className={`fixed top-2 right-2 z-30 rounded-xl border border-neutral-800 bg-neutral-950/80 p-2 text-neutral-300 shadow-sm shadow-black/20 backdrop-blur transition [corner-shape:bevel] hover:border-amber-500/40 hover:text-white ${fade}`}
        >
          {open ? (
            <X aria-hidden className="h-5 w-5" />
          ) : (
            <Menu aria-hidden className="h-5 w-5" />
          )}
          <span className="sr-only">
            {open ? "Close section menu" : "Open section menu"}
          </span>
        </button>

        {open && (
          <ul
            id="section-menu"
            className="fixed top-14 right-2 z-30 w-48 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/95 shadow-lg shadow-black/40 backdrop-blur [corner-shape:bevel]"
          >
            {sections.map(({ id, label }) => (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => go(id)}
                  className="group flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-neutral-900"
                >
                  <Dot active={active === id} />
                  <Label active={active === id}>{label}</Label>
                </button>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </>
  );
}

function Dot({ active }: { active: boolean }) {
  return (
    <span
      className={`h-2.5 w-2.5 shrink-0 rounded-full border transition ${
        active
          ? "border-amber-400 bg-amber-400"
          : "border-neutral-600 bg-transparent group-hover:border-neutral-400"
      }`}
    />
  );
}

function Label({
  active,
  children,
}: {
  active: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`text-sm font-medium transition ${
        active ? "text-white" : "text-neutral-500 group-hover:text-neutral-300"
      }`}
    >
      {children}
    </span>
  );
}
