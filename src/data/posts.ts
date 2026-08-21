import type { TagId } from "./tags";

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
   * `import hero from "../assets/posts/my-post.jpg"`. Cards and post
   * pages fall back to a generated placeholder when this is absent.
   */
  image?: string;
  /** Body paragraphs. Plain strings — React escapes them. No HTML. */
  body: string[];
}

/**
 * Every entry below is placeholder content, one per tag, so the section
 * and the per-post pages have something to render. Replace the copy;
 * keep the shape.
 *
 * Adding a post takes two steps:
 *   1. append here with a unique `slug`
 *   2. create `posts/<slug>/index.html` (copy an existing one, update
 *      the title, description and data-slug)
 * Vite picks the new HTML file up as a build entry automatically.
 */
export const posts: Post[] = [
  {
    slug: "esp32-climate-sensor",
    title: "A WiFi climate sensor that actually stays online",
    date: "2026-07-14",
    excerpt:
      "Placeholder post. What it took to get a battery-powered ESP32 reporting temperature and humidity for months at a time instead of days.",
    tags: ["electronics", "software-engineering"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
      "Add as many paragraphs as the post needs; the page layout handles the rest.",
    ],
  },
  {
    slug: "bambu-h2d-first-month",
    title: "First month with the Bambu H2D",
    date: "2026-06-02",
    excerpt:
      "Placeholder post. Moving from a heavily modded Ender 3 to a machine that mostly just works, and what I stopped having to think about.",
    tags: ["3d-printing"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
  {
    slug: "fpv-build-log-shrieka-130",
    title: "Build log: Shrieka 130",
    date: "2026-04-28",
    excerpt:
      "Placeholder post. Frame, stack and motor choices for a small quad, and the bench numbers behind each of them.",
    tags: ["fpv-drones", "3d-printing"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
  {
    slug: "parametric-cad-for-enclosures",
    title: "Parametric CAD is worth the learning curve",
    date: "2026-03-11",
    excerpt:
      "Placeholder post. Why I stopped modelling enclosures in Blender and moved the whole workflow to Autodesk Fusion.",
    tags: ["software-engineering", "3d-printing"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
  {
    slug: "first-season-on-two-wheels",
    title: "First season on two wheels",
    date: "2026-02-19",
    excerpt:
      "Placeholder post. Notes from a beginner rider — the gear that mattered, the habits that stuck, and the maintenance I learned to do myself.",
    tags: ["motorcycles"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
  {
    slug: "practising-with-a-metronome",
    title: "The metronome is not optional",
    date: "2026-01-23",
    excerpt:
      "Placeholder post. A few months of deliberate practice, and what finally made timing click.",
    tags: ["guitars"],
    body: [
      "This is placeholder copy for an example post. Replace it with the real write-up.",
      "Body paragraphs are plain strings in src/data/posts.ts. Each string becomes its own paragraph, so there is no markup to escape and no HTML to sanitise.",
    ],
  },
];

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
