import background from "../assets/background.jpg";

/**
 * Fixed (not scrolling) background layers, pinned behind all content.
 * Shared by the main page and the per-post pages so they read as one site.
 */
export function Backdrop() {
  return (
    <>
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage: `url(${background})`,
          filter: "brightness(1.8) contrast(1.1)",
        }}
      />
      <div aria-hidden className="fixed inset-0 -z-10 bg-neutral-950/80" />
      <div
        aria-hidden
        className="pointer-events-none fixed -top-40 -right-40 -z-10 h-96 w-96 rounded-full bg-amber-500/15 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none fixed top-1/2 -left-40 -z-10 h-80 w-80 rounded-full bg-orange-600/10 blur-3xl"
      />
    </>
  );
}
