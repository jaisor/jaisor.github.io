import { tagById, type TagId } from "../data/tags";

/**
 * Non-interactive tag labels. Rendered as spans, not links, because
 * cards wrap the whole tile in an <a> and anchors cannot nest.
 */
export function TagChips({ tags }: { tags: TagId[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map((id) => {
        const tag = tagById.get(id);
        if (!tag) return null;
        const { label, icon: Icon } = tag;
        return (
          <li
            key={id}
            className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950/60 px-2.5 py-1 text-xs font-medium text-neutral-400 [corner-shape:bevel]"
          >
            <Icon aria-hidden className="h-3 w-3 text-amber-500/70" />
            {label}
          </li>
        );
      })}
    </ul>
  );
}
