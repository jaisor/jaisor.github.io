# jaisor.github.io

Personal site, built with [Jekyll](https://jekyllrb.com/) and hosted on [GitHub Pages](https://pages.github.com/).

## One-time setup

1. Push this repo to GitHub as `jaisor.github.io` (the exact repo name matters for a user site).
2. In the repo settings → Pages, set the source to the `main` branch (root). GitHub will build and publish automatically on every push — no Actions workflow needed for a stock Jekyll site like this one.
3. Site will be live at `https://jaisor.github.io/`.

## Adding a new article

Create a new file in `_posts/` named `YYYY-MM-DD-title.md`:

```markdown
---
layout: post
title: "Your Title"
date: YYYY-MM-DD
categories: [diy, fpv, software]  # optional
---

Your content here, in Markdown.
```

Commit and push — GitHub Pages rebuilds automatically, and the new post shows up on the home page.

## Updating the Projects overview

Edit `projects.md` directly.

## Local preview

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000
