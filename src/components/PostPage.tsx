import { formatPostDate, type Post } from "../data/posts";
import { Backdrop } from "./Backdrop";
import { Footer } from "./Footer";
import { PostImage } from "./PostImage";
import { TagChips } from "./TagChips";

/**
 * A post's dedicated page. Rendered standalone at /posts/<slug>/ by
 * src/post.tsx — deliberately not inside the main page's scroll-snap
 * container, so it scrolls normally.
 */
export function PostPage({ post }: { post: Post }) {
  const { title, date, excerpt, tags, image, body } = post;

  return (
    <div className="relative isolate min-h-screen bg-neutral-950">
      <Backdrop />

      <article className="mx-auto max-w-3xl px-6 py-16 lg:py-24">
        <a
          href="/#posts"
          className="text-sm font-medium text-amber-500 transition hover:text-amber-400"
        >
          &larr; All posts
        </a>

        <header className="mt-8">
          <time
            dateTime={date}
            className="text-xs font-medium tracking-wide text-neutral-500 uppercase"
          >
            {formatPostDate(date)}
          </time>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
            {title}
          </h1>
          <p className="mt-4 text-lg text-neutral-400">{excerpt}</p>
          <div className="mt-5">
            <TagChips tags={tags} />
          </div>
        </header>

        <PostImage
          image={image}
          tags={tags}
          className="mt-10 h-64 rounded-xl border border-neutral-800 [corner-shape:bevel] lg:h-80"
        />

        <div className="mt-10 space-y-5 text-neutral-300">
          {body.map((paragraph, i) => (
            <p key={i} className="lg:text-lg">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <Footer />
    </div>
  );
}

/** Shown when a page's data-slug has no matching entry in posts.ts. */
export function PostNotFound() {
  return (
    <div className="relative isolate flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-6 text-center">
      <Backdrop />
      <h1 className="text-2xl font-bold text-white lg:text-3xl">
        Post not found
      </h1>
      <p className="mt-3 text-neutral-400">
        This page has no matching entry in the site&rsquo;s post data.
      </p>
      <a
        href="/#posts"
        className="mt-6 text-sm font-medium text-amber-500 transition hover:text-amber-400"
      >
        &larr; All posts
      </a>
    </div>
  );
}
