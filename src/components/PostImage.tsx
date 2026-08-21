import { tagById, type TagId } from "../data/tags";

/**
 * A post's main photo. Falls back to a generated gradient carrying the
 * first tag's icon, so a post without a photo still has a hero without
 * shipping a placeholder image or hitting a third-party host.
 */
export function PostImage({
  image,
  tags,
  className = "",
}: {
  image?: string;
  tags: TagId[];
  className?: string;
}) {
  if (image) {
    return (
      <img
        src={image}
        alt=""
        loading="lazy"
        className={`w-full object-cover ${className}`}
      />
    );
  }

  const Icon = tagById.get(tags[0])?.icon;

  return (
    <div
      aria-hidden
      className={`flex w-full items-center justify-center bg-gradient-to-br from-neutral-800 via-neutral-900 to-neutral-950 ${className}`}
    >
      {Icon && <Icon className="h-10 w-10 text-amber-500/40" />}
    </div>
  );
}
