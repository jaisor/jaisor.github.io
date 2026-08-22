import { useEffect, useRef } from "react";
import { X } from "lucide-react";

/**
 * Full-screen viewer for a post photo. Opened by clicking an `image`
 * block that carries a `full` asset; closed with Escape, the close
 * button, or a click on the backdrop.
 *
 * `fixed inset-0` is safe inside PostPage's `isolate` wrapper —
 * isolation creates a stacking context but not a containing block, so
 * the overlay still measures against the viewport.
 */
export function Lightbox({
  src,
  alt,
  caption,
  onClose,
}: {
  src: string;
  alt: string;
  caption?: string;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    // Stop the page behind from scrolling under the overlay.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
      opener?.focus?.();
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-neutral-950/95 p-4 backdrop-blur lg:p-10"
    >
      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 rounded-xl border border-neutral-800 bg-neutral-900/80 p-2 text-neutral-300 transition [corner-shape:bevel] hover:border-amber-500/40 hover:text-white"
      >
        <X aria-hidden className="h-5 w-5" />
        <span className="sr-only">Close image</span>
      </button>

      <img
        src={src}
        alt={alt}
        onClick={(event) => event.stopPropagation()}
        className="min-h-0 max-w-full flex-1 object-contain"
      />

      {caption && (
        <p className="shrink-0 text-center text-sm text-neutral-400">
          {caption}
        </p>
      )}
    </div>
  );
}
