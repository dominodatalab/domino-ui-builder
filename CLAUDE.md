# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A **Vite + React 18 + TypeScript seed project** preconfigured with Domino's design-system component library. The intent is that someone clones this and starts building UI immediately, asking Claude to compose screens with Domino components.

Two things make this seed Domino-specific:

1. **`domino-base-components-v1.0.0.tgz`** — a pre-built NPM tarball of `@domino/base-components`, Domino's React component library. It is installed via a `file:` dependency in `package.json`, so `yarn install` / `npm install` wires it up like any other package.
2. **Bundled Claude Skill** — the tarball ships a skill at `node_modules/@domino/base-components/.claude/skills/domino-extension/` (note: the skill directory is still named `domino-extension` for legacy reasons even though the package was renamed). Claude Code auto-discovers it from that path. It contains per-component reference files with verified props and storybook-derived examples.

The live Storybook is hosted at https://main--60c0de3f60dd96003bdcb1a1.chromatic.com/.

### Standard scripts

- `npm run dev` — start the Vite dev server
- `npm run build` — typecheck (`tsc -b`) and produce a production build
- `npm run lint` — ESLint
- `npm run preview` — preview the production build

## When you're asked to write Domino UI code

The bundled `domino-extension` skill is the source of truth for component APIs. Use it — do not invent props or guess at component shapes. Each component has a dedicated reference file under `node_modules/@domino/base-components/.claude/skills/domino-extension/references/<component>.md` with verified props and storybook-derived examples.

If the user has also configured the Storybook MCP, prefer cross-checking the skill against live story args/source for anything non-trivial (custom footers, table cell components, form validation patterns).

Imports are always named, from the root of the package:

```tsx
import { Button, Modal, IconResolver } from '@domino/base-components';
```

> Note: some files in this repo and inside the installed tarball's own docs still reference the old package name `@domino/extensions`. That name is **not** valid here — always import from `@domino/base-components`.

The library requires React 18, React Router 5, and the app must be wrapped in `DominoThemeProviderDecorator` with `@domino/base-components/style.css` imported once at the entry point. For apps outside the Domino platform, pass a static `useStoreHook` to `DominoThemeProviderDecorator` to skip backend fetches (pattern shown in `README.md`).

## Updating the bundled skill

The skill lives **inside the installed package** (`node_modules/@domino/base-components/.claude/skills/domino-extension/`), so it is replaced wholesale every time the tarball is reinstalled. You generally should not hand-edit files under `node_modules/`.

If the user wants to update component knowledge that ships with the package, the edit needs to happen in the upstream source that produces the tarball, then a new `domino-base-components-v<next>.tgz` needs to be dropped in and the `file:` dependency updated. Surface this to the user rather than editing the node_modules copy in place.

## Things that are not in this repo

- No source for `@domino/base-components` itself — only the prebuilt tarball. To inspect actual component implementations, look at `node_modules/@domino/base-components/dist/` or extract the tarball with `tar -xzf domino-base-components-v1.0.0.tgz`.
- No CI, no `.github/`.
