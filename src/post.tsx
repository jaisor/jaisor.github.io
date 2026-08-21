import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { postBySlug } from "./data/posts";
import { PostNotFound, PostPage } from "./components/PostPage";

/**
 * Shared entry for every /posts/<slug>/ page. Each post's index.html
 * carries its own <title> and meta description (so crawlers and link
 * previews get a real page) plus a data-slug that selects the entry to
 * render from src/data/posts.ts.
 */
const container = document.getElementById("root")!;
const post = postBySlug.get(container.dataset.slug ?? "");

createRoot(container).render(
  <StrictMode>{post ? <PostPage post={post} /> : <PostNotFound />}</StrictMode>,
);
