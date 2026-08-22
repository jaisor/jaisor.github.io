import { Fragment } from "react";

/**
 * The site's inline markup, shared by post bodies and hobby-card copy:
 *
 *   `backticks`        -> inline code
 *   [label](href)      -> a link
 *
 * Both are tokenised into React elements — no HTML is ever parsed out
 * of a string — so the no-unescaped-markup rule still holds.
 */
const TOKEN = /`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\)/g;

/** Fail closed: anything but http(s), mailto, or same-site is not a link. */
function isSafeHref(href: string) {
  return /^(https?:\/\/|mailto:|\/|#)/.test(href);
}

export function Inline({ text }: { text: string }) {
  const out = [];
  let last = 0;

  for (const match of text.matchAll(TOKEN)) {
    const [raw, code, label, href] = match;
    const at = match.index;

    if (at > last) {
      out.push(<Fragment key={last}>{text.slice(last, at)}</Fragment>);
    }
    last = at + raw.length;

    if (code !== undefined) {
      out.push(
        <code
          key={at}
          className="rounded border border-neutral-800 bg-neutral-950/80 px-1.5 py-0.5 font-mono text-[0.85em] text-amber-300/90"
        >
          {code}
        </code>,
      );
      continue;
    }

    if (!isSafeHref(href)) {
      out.push(<Fragment key={at}>{label}</Fragment>);
      continue;
    }

    // Underlined as well as amber: color alone shouldn't be the only
    // thing marking a link inside a run of prose.
    const external = /^https?:\/\//.test(href);
    out.push(
      <a
        key={at}
        href={href}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
        className="font-medium text-amber-500 underline decoration-amber-500/40 underline-offset-2 transition hover:text-amber-400 hover:decoration-amber-400"
      >
        {label}
      </a>,
    );
  }

  if (last < text.length) {
    out.push(<Fragment key={last}>{text.slice(last)}</Fragment>);
  }

  return <>{out}</>;
}
