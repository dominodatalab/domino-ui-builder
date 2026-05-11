# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This repository is **not** an application — it has no source to build, lint, or test. It is a distribution + knowledge bundle that pairs two artifacts:

1. **`domino-extensions-package/domino-extensions-v1.0.1.tgz`** — a pre-built NPM tarball of `@domino/extensions`, Domino's React component library implementing the Domino Design System.
2. **`.claude/skills/domino-extension/`** — a Claude Skill (auto-discovered when Claude Code starts here) that teaches Claude how to use every component in that library, with prop signatures verified from source and examples drawn from real storybook stories.

The live Storybook is hosted at https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/.

Treat this repo as a reference/distribution surface. The expected workflow is that someone installs the tarball + copies the skill into a **separate** downstream app (see `HOW_TO_START.md`), then asks Claude to build UI there.

## When you're asked to write Domino UI code

The `domino-extension` skill is the source of truth for component APIs. Use it — do not invent props or guess at component shapes. Each component has a dedicated reference file under `.claude/skills/domino-extension/references/<component>.md` with verified props and storybook-derived examples.

If the user has also configured the Storybook MCP, prefer cross-checking the skill against live story args/source for anything non-trivial (custom footers, table cell components, form validation patterns).

Imports are always named, from the root:

```tsx
import { Button, Modal, IconResolver } from '@domino/extensions';
```

The library requires React 18, React Router 5, and the app must be wrapped in `DominoThemeProviderDecorator` with `@domino/extensions/style.css` imported once at the entry point. For apps outside the Domino platform, pass a static `useStoreHook` to `DominoThemeProviderDecorator` to skip backend fetches (pattern shown in `README.md` and `HOW_TO_START.md`).

## Editing the skill

When the user asks you to update component knowledge:

- Each reference under `.claude/skills/domino-extension/references/` is self-contained: props table, real examples, AntD gotchas, when-to-use notes. Keep that shape.
- The skill index lives in `.claude/skills/domino-extension/SKILL.md`. Its `description` frontmatter is what Claude Code uses to decide when to auto-load the skill — keep the full component list there so trigger matching stays broad.
- The skill is also bundled inside the tarball (under `node_modules/@domino/extensions/.claude/skills/` post-install), so edits here will eventually need to flow into the next published tarball version to reach downstream consumers via the symlink path documented in `README.md`.

## Things that are not in this repo

- No `package.json`, no build/test/lint scripts. Do not invent them.
- No source for `@domino/extensions` itself — only the prebuilt tarball. To inspect the actual component implementations, extract the tarball or read it via `tar -tzf` / `tar -xzf`.
- No CI, no `.github/`, no cursor or copilot rules.
