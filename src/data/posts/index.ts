import type { TagId } from "../tags";

/**
 * A body block. A bare string is a paragraph — the common case — so
 * simple posts stay readable as a plain list of strings.
 *
 * Inline `backticks` render as inline code and [label](href) as a link
 * inside any text field. That is the only markup: everything else is
 * plain text that React escapes, so there is still no unescaped-HTML
 * surface anywhere on the site.
 *
 * An `image` block's `src` is an imported asset, same as `Post.image`,
 * so Vite fingerprints it. `alt` is required — write what the photo
 * shows; `caption` is the visible line under it. Add `full` (a second,
 * larger import) to make the photo open full-screen when clicked.
 */
export type Block =
  | string
  | { kind: "heading"; text: string }
  | { kind: "code"; label?: string; code: string }
  | { kind: "list"; items: string[] }
  | { kind: "note" | "warn"; label: string; text: string }
  | { kind: "steps"; items: { title: string; text: string }[] }
  | {
      kind: "image";
      src: string;
      alt: string;
      caption?: string;
      /** Hi-res version; when present the image opens in a Lightbox. */
      full?: string;
    }
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] };

export interface Post {
  /** URL segment. The dedicated page is served at /posts/<slug>/. */
  slug: string;
  title: string;
  /** ISO date, used for sorting and rendered via toLocaleDateString. */
  date: string;
  /** One or two sentences. Shown on the card and as the page's lede. */
  excerpt: string;
  tags: TagId[];
  /**
   * Main photo. Import the asset so Vite fingerprints it, e.g.
   * `import hero from "../../assets/posts/<slug>/hero.jpg"` — each post
   * keeps its photos in its own folder. Cards and post
   * pages fall back to a generated placeholder when this is absent.
   */
  image?: string;
  /** Body content. Bare strings are paragraphs; see `Block`. */
  body: Block[];
}

/**
 * Every other file in this folder default-exports one `Post`. Adding a
 * post is now one step here: drop a new `<slug>.ts` file in and it is
 * picked up automatically, ordered by date — nothing to register.
 * (A `posts/<slug>/index.html` at the repo root is still required so
 * Vite builds a real page for it; see CLAUDE.md.)
 *
 * `eager: true` gives synchronous, statically-analyzable imports rather
 * than lazy dynamic ones — this is a fully static site, so there is no
 * benefit to code-splitting post data, and every consumer here (the
 * card grid, the tag filter) wants the whole list synchronously anyway.
 */
const modules = import.meta.glob<{ default: Post }>("./*.ts", {
  eager: true,
});

export const posts: Post[] = Object.entries(modules)
  .filter(([path]) => !path.endsWith("/index.ts"))
  .map(([, mod]) => mod.default);

/** Newest first. */
export const postsByDate = [...posts].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export const postBySlug = new Map(posts.map((p) => [p.slug, p]));

export function postHref(slug: string) {
  return `/posts/${slug}/`;
}

export function formatPostDate(date: string) {
  return new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
