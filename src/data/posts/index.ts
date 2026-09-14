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
  | { kind: "table"; caption?: string; head: string[]; rows: string[][] }
  | { kind: "deviceCompare"; caption?: string; rows: DeviceCompareRow[] };

/**
 * One row of a `deviceCompare` block, rendered by `DeviceCompareTable`.
 * The two `*Tier` values are the comparable axes: they drive the filter
 * pills, the header sort, and a color-coded label in their own column.
 * The literal specs a tier flattens (`chip`, `rfPowerLabel`,
 * `features`) render as a detail line under the device name instead, so
 * the tier columns stay scannable without losing the real numbers. `price` is a plain number for sorting (the lower bound
 * of any quoted range) while `priceLabel` keeps the full text,
 * including "N/A".
 */
export interface DeviceCompareRow {
  device: string;
  /** External purchase/info link. */
  href: string;
  /** MCU family, e.g. "nRF52840", "ESP32-S3", "RP2040". */
  chip: string;
  rfPowerTier: "normal" | "high" | "very-high";
  /** Max TX power as the vendor states it. */
  rfPowerLabel: string;
  powerTier: "low" | "high";
  /**
   * Onboard auxiliary I/O only, e.g. "Screen", "GPS", "WiFi". Leave out
   * anything every row carries — it costs a column's attention without
   * telling the reader apart; say it in a note under the table instead.
   */
  features: string[];
  price: number | null;
  priceLabel: string;
}

interface PostFields {
  /** URL segment. The dedicated page is served at /posts/<slug>/. */
  slug: string;
  title: string;
  /** ISO date, used for sorting and rendered via toLocaleDateString. */
  date: string;
  /** One or two sentences. Shown on the card and as the page's lede. */
  excerpt: string;
  tags: TagId[];
  /** Body content. Bare strings are paragraphs; see `Block`. */
  body: Block[];
}

/**
 * A post's main photo, modelled as a union so a photo cannot be added
 * without its alt text: the compiler rejects `image` on its own. The
 * hero renders on the card *and* on the post page, so an empty `alt`
 * here was the site's largest accessibility hole — ten of twelve images
 * on the home page carried no description at all.
 */
export type PostPhoto =
  | {
      /**
       * Import the asset so Vite fingerprints it, e.g.
       * `import hero from "../../assets/posts/<slug>/hero.jpg"` — each
       * post keeps its photos in its own folder.
       */
      image: string;
      /**
       * What the photo shows, for screen readers and crawlers. Describe
       * the subject, not the post: "a carbon-fiber quadcopter on a
       * wooden floor", not "the finished build".
       */
      imageAlt: string;
    }
  | {
      /** No photo: cards and pages draw the generated placeholder. */
      image?: never;
      imageAlt?: never;
    };

export type Post = PostFields & PostPhoto;

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
