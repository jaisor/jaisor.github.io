import { useState } from "react";
import type { Block } from "../data/posts";
import { Inline } from "./Inline";
import { Lightbox } from "./Lightbox";

/**
 * Renders a post body. Everything here is plain text run through React,
 * so there is no unescaped-HTML surface — the only markup is the
 * backtick and link convention handled by <Inline>.
 */
type Zoom = { src: string; alt: string; caption?: string };

export function PostBody({ body }: { body: Block[] }) {
  const [zoom, setZoom] = useState<Zoom | null>(null);

  return (
    <div className="mt-10 space-y-5">
      {body.map((block, i) => (
        <BlockView key={i} block={block} onZoom={setZoom} />
      ))}

      {zoom && <Lightbox {...zoom} onClose={() => setZoom(null)} />}
    </div>
  );
}

function BlockView({
  block,
  onZoom,
}: {
  block: Block;
  onZoom: (zoom: Zoom) => void;
}) {
  if (typeof block === "string") {
    return (
      <p className="text-neutral-300 lg:text-lg">
        <Inline text={block} />
      </p>
    );
  }

  switch (block.kind) {
    case "heading":
      return (
        <h2 className="pt-6 text-xl font-bold tracking-tight text-white lg:text-2xl">
          {block.text}
        </h2>
      );

    case "code":
      return (
        <div>
          {block.label && (
            <p className="mb-2 font-mono text-xs tracking-wider text-neutral-500 uppercase">
              {block.label}
            </p>
          )}
          <pre className="overflow-x-auto rounded-xl border border-neutral-800 bg-neutral-950/70 p-4 text-sm shadow-sm shadow-black/20 [corner-shape:bevel] lg:p-5">
            <code className="font-mono text-neutral-300">{block.code}</code>
          </pre>
        </div>
      );

    case "list":
      return (
        <ul className="list-disc space-y-2 pl-5 text-neutral-300 marker:text-amber-500 lg:text-lg">
          {block.items.map((item, i) => (
            <li key={i}>
              <Inline text={item} />
            </li>
          ))}
        </ul>
      );

    case "note":
    case "warn":
      return (
        <aside
          className={`rounded-xl border border-neutral-800 border-l-2 bg-neutral-900/50 p-4 shadow-sm shadow-black/20 [corner-shape:bevel] lg:p-5 ${
            block.kind === "warn" ? "border-l-red-500/70" : "border-l-amber-500"
          }`}
        >
          <p
            className={`font-mono text-xs tracking-wider uppercase ${
              block.kind === "warn" ? "text-red-400" : "text-amber-500"
            }`}
          >
            {block.label}
          </p>
          <p className="mt-2 text-sm text-neutral-300 lg:text-base">
            <Inline text={block.text} />
          </p>
        </aside>
      );

    case "steps":
      return (
        <ol className="space-y-6">
          {block.items.map(({ title, text }, i) => (
            <li key={i} className="relative pl-12">
              <span
                aria-hidden
                className="absolute top-0 left-0 inline-flex h-7 w-8 items-center justify-center rounded border border-amber-500/30 bg-amber-500/10 font-mono text-sm text-amber-500 [corner-shape:bevel]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-semibold text-white lg:text-lg">{title}</h3>
              <p className="mt-1.5 text-neutral-300 lg:text-lg">
                <Inline text={text} />
              </p>
            </li>
          ))}
        </ol>
      );

    case "image": {
      const { src, alt, caption, full } = block;
      const image = (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto max-h-[36rem] w-auto max-w-full rounded-xl border border-neutral-800 object-contain shadow-sm shadow-black/20 [corner-shape:bevel]"
        />
      );

      return (
        <figure>
          {full ? (
            // A real link to the hi-res file, so it still works if the
            // JS never runs; the handler upgrades it to the Lightbox.
            <a
              href={full}
              onClick={(event) => {
                event.preventDefault();
                // Clicking an anchor doesn't focus it in every browser,
                // and the Lightbox restores focus to whatever was active
                // when it mounted — so put it here explicitly.
                event.currentTarget.focus();
                onZoom({ src: full, alt, caption });
              }}
              className="block cursor-zoom-in transition hover:opacity-90"
            >
              {image}
              <span className="sr-only">View full-size</span>
            </a>
          ) : (
            image
          )}
          {caption && (
            <figcaption className="mt-3 text-center text-sm text-neutral-500">
              <Inline text={caption} />
            </figcaption>
          )}
        </figure>
      );
    }

    case "table":
      return (
        <figure>
          <div className="overflow-x-auto rounded-xl border border-neutral-800 shadow-sm shadow-black/20 [corner-shape:bevel]">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-neutral-900/80">
                  {block.head.map((cell, i) => (
                    <th
                      key={i}
                      scope="col"
                      className="px-4 py-3 font-mono text-xs tracking-wider whitespace-nowrap text-neutral-500 uppercase"
                    >
                      {cell}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, r) => (
                  <tr
                    key={r}
                    className="border-t border-neutral-800 bg-neutral-900/40"
                  >
                    {row.map((cell, c) => (
                      <td
                        key={c}
                        className={`px-4 py-3 whitespace-nowrap ${
                          c === 0
                            ? "font-mono text-neutral-500"
                            : "text-neutral-300"
                        }`}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <figcaption className="mt-3 text-sm text-neutral-500">
              <Inline text={block.caption} />
            </figcaption>
          )}
        </figure>
      );
  }
}
