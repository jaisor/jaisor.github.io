import { formatPostDate, postHref, type Post } from "../data/posts";
import { PostImage } from "./PostImage";
import { TagChips } from "./TagChips";

export function PostCard({ slug, title, date, excerpt, tags, image }: Post) {
  return (
    <a
      href={postHref(slug)}
      className="group flex flex-col overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900/50 text-left shadow-sm shadow-black/20 transition [corner-shape:bevel] hover:border-amber-500/40 hover:shadow-md hover:shadow-black/30"
    >
      <PostImage image={image} tags={tags} className="h-40 shrink-0" />

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <time
          dateTime={date}
          className="text-xs font-medium tracking-wide text-neutral-500 uppercase"
        >
          {formatPostDate(date)}
        </time>
        <h3 className="mt-2 font-semibold text-white transition group-hover:text-amber-400 lg:text-lg">
          {title}
        </h3>
        <p className="mt-1.5 flex-1 text-sm text-neutral-400 lg:mt-2">
          {excerpt}
        </p>

        <div className="mt-4">
          <TagChips tags={tags} />
        </div>

        <span className="mt-4 text-sm font-medium text-amber-500 transition group-hover:text-amber-400">
          Read post &rarr;
        </span>
      </div>
    </a>
  );
}
